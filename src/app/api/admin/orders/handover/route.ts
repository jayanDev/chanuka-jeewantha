import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { isAllowedFileType, saveUploadedFile } from "@/lib/upload-storage";
import { notifyOrderHandoverReady, notifyOrderStatusChanged } from "@/lib/notifications";
import { createUserNotification } from "@/lib/user-notifications";

const ORDERS_COLLECTION = "orders";

const HANDOVER_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed",
];
const HANDOVER_ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "zip"];

type OrderProgressStatus =
  | "pending_payment"
  | "payment_submitted"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

type HandoverDocument = {
  id: string;
  fileName: string;
  url: string;
  uploadedAtMs: number;
  uploadedBy: string;
};

type OrderUpdate = {
  id: string;
  atMs: number;
  type: "order_created" | "status_updated" | "handover_uploaded" | "order_warning";
  title: string;
  details: string | null;
  actorRole: "system" | "admin" | "customer";
  status: OrderProgressStatus;
};

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

function parseHandoverDocuments(value: unknown): HandoverDocument[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as {
        id?: unknown;
        fileName?: unknown;
        url?: unknown;
        uploadedAtMs?: unknown;
        uploadedBy?: unknown;
      };

      if (
        typeof row.id !== "string" ||
        typeof row.fileName !== "string" ||
        typeof row.url !== "string" ||
        typeof row.uploadedAtMs !== "number" ||
        typeof row.uploadedBy !== "string"
      ) {
        return null;
      }

      return {
        id: row.id,
        fileName: row.fileName,
        url: row.url,
        uploadedAtMs: row.uploadedAtMs,
        uploadedBy: row.uploadedBy,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

function parseOrderUpdates(value: unknown): OrderUpdate[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as {
        id?: unknown;
        atMs?: unknown;
        type?: unknown;
        title?: unknown;
        details?: unknown;
        actorRole?: unknown;
        status?: unknown;
      };

      if (
        typeof row.id !== "string" ||
        typeof row.atMs !== "number" ||
        typeof row.type !== "string" ||
        typeof row.title !== "string" ||
        typeof row.actorRole !== "string" ||
        typeof row.status !== "string"
      ) {
        return null;
      }

      const type: OrderUpdate["type"] =
        row.type === "status_updated" || row.type === "handover_uploaded" || row.type === "order_warning"
          ? row.type
          : "order_created";

      const actorRole: OrderUpdate["actorRole"] =
        row.actorRole === "admin" ? "admin" : row.actorRole === "customer" ? "customer" : "system";

      const status: OrderProgressStatus =
        row.status === "pending_payment" ||
        row.status === "payment_submitted" ||
        row.status === "confirmed" ||
        row.status === "in_progress" ||
        row.status === "completed" ||
        row.status === "cancelled"
          ? row.status
          : "payment_submitted";

      return {
        id: row.id,
        atMs: row.atMs,
        type,
        title: row.title,
        details: typeof row.details === "string" ? row.details : null,
        actorRole,
        status,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => a.atMs - b.atMs);
}

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const orderId = String(formData.get("orderId") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const files = formData
      .getAll("documents")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (files.length === 0) {
      return NextResponse.json({ error: "At least one document is required" }, { status: 400 });
    }

    for (const file of files) {
      const allowed = isAllowedFileType(file, {
        mimeTypes: HANDOVER_ALLOWED_MIME_TYPES,
        extensions: HANDOVER_ALLOWED_EXTENSIONS,
      });
      if (!allowed) {
        return NextResponse.json({ error: `Unsupported handover file type: ${file.name}` }, { status: 400 });
      }
      if (file.size > 15 * 1024 * 1024) {
        return NextResponse.json({ error: `File is too large: ${file.name}. Max 15MB each.` }, { status: 400 });
      }
    }

    const db = getFirebaseDb();
    const ref = db.collection(ORDERS_COLLECTION).doc(orderId);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const data = snap.data() as {
      status?: unknown;
      userName?: unknown;
      userEmail?: unknown;
      paymentRef?: unknown;
      totalLkr?: unknown;
      handoverDocuments?: unknown;
      updates?: unknown;
      items?: unknown;
      userId?: unknown;
    };

    const uploadedAtMs = Date.now();
    const uploadedDocs: HandoverDocument[] = [];

    for (const file of files) {
      const url = await saveUploadedFile({
        file,
        folder: "handover-documents",
      });

      uploadedDocs.push({
        id: randomUUID(),
        fileName: file.name,
        url,
        uploadedAtMs,
        uploadedBy: admin.email,
      });
    }

    const existingDocs = parseHandoverDocuments(data.handoverDocuments);
    const existingUpdates = parseOrderUpdates(data.updates);
    const previousStatus: OrderProgressStatus =
      data.status === "pending_payment" ||
      data.status === "payment_submitted" ||
      data.status === "confirmed" ||
      data.status === "in_progress" ||
      data.status === "completed" ||
      data.status === "cancelled"
        ? data.status
        : "payment_submitted";

    const nextStatus: OrderProgressStatus = previousStatus === "cancelled" ? "cancelled" : "completed";

    const updates: OrderUpdate[] = [
      ...existingUpdates,
      {
        id: randomUUID(),
        atMs: uploadedAtMs,
        type: "handover_uploaded",
        title: "Handover documents uploaded",
        details: note || `Uploaded ${uploadedDocs.length} document(s) for customer delivery.`,
        actorRole: "admin",
        status: nextStatus,
      },
    ];

    if (previousStatus !== nextStatus) {
      updates.push({
        id: randomUUID(),
        atMs: uploadedAtMs,
        type: "status_updated",
        title: `Status changed to ${nextStatus}`,
        details: `Automatically updated after handover upload by ${admin.name}`,
        actorRole: "admin",
        status: nextStatus,
      });
    }

    await ref.set(
      {
        handoverDocuments: [...existingDocs, ...uploadedDocs],
        status: nextStatus,
        updatedAtMs: uploadedAtMs,
        updates,
      },
      { merge: true }
    );

    const customerName = typeof data.userName === "string" ? data.userName : "Customer";
    const customerEmail = typeof data.userEmail === "string" ? data.userEmail : "";
    const paymentRef = typeof data.paymentRef === "string" ? data.paymentRef : "";
    const totalLkr = typeof data.totalLkr === "number" ? data.totalLkr : 0;
    const items = Array.isArray(data.items)
      ? data.items
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const entry = item as { productName?: unknown; quantity?: unknown; priceLkr?: unknown };
            if (
              typeof entry.productName !== "string" ||
              typeof entry.quantity !== "number" ||
              typeof entry.priceLkr !== "number"
            ) {
              return null;
            }

            return {
              productName: entry.productName,
              quantity: entry.quantity,
              priceLkr: entry.priceLkr,
            };
          })
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
      : [];

    if (previousStatus !== nextStatus) {
      try {
        await notifyOrderStatusChanged({
          orderId,
          customerName,
          customerEmail,
          paymentRef,
          totalLkr,
          status: nextStatus,
          items,
        });
      } catch (error) {
        console.error("Order status notify failed after handover:", error);
      }
    }

    try {
      await notifyOrderHandoverReady({
        orderId,
        customerName,
        customerEmail,
        documents: uploadedDocs.map((doc) => ({
          fileName: doc.fileName,
          url: doc.url,
        })),
        note,
      });
    } catch (error) {
      console.error("Order handover notify failed:", error);
    }

    if (typeof data.userId === "string" && data.userId) {
      try {
        await createUserNotification({
          userId: data.userId,
          orderId,
          type: "handover_ready",
          title: "Handover documents are ready",
          message: `Your deliverables for order ${orderId.slice(0, 8)} are now available in your order timeline.`,
        });
      } catch (error) {
        console.error("In-app handover notification failed:", error);
      }
    }

    return NextResponse.json({
      ok: true,
      orderId,
      uploadedCount: uploadedDocs.length,
      status: nextStatus,
    });
  } catch (error) {
    console.error("Order handover upload failed:", error);
    return NextResponse.json({ error: "Failed to upload handover documents" }, { status: 500 });
  }
}
