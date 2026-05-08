import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { orderStatusUpdateSchema } from "@/lib/validation";
import { notifyOrderStatusChanged } from "@/lib/notifications";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { createUserNotification } from "@/lib/user-notifications";

const ORDERS_COLLECTION = "orders";

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

type OrderRevision = {
  id: string;
  message: string;
  status: "open" | "in_review" | "resolved";
  requestedAtMs: number;
  requestedByUserId: string;
  resolvedAtMs: number | null;
  resolvedBy: string | null;
  adminResponse: string | null;
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
        source?: unknown;
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

function parseOrderRevisions(value: unknown): OrderRevision[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as {
        id?: unknown;
        message?: unknown;
        status?: unknown;
        requestedAtMs?: unknown;
        requestedByUserId?: unknown;
        resolvedAtMs?: unknown;
        resolvedBy?: unknown;
        adminResponse?: unknown;
      };

      if (
        typeof row.id !== "string" ||
        typeof row.message !== "string" ||
        typeof row.requestedAtMs !== "number" ||
        typeof row.requestedByUserId !== "string"
      ) {
        return null;
      }

      const status: OrderRevision["status"] =
        row.status === "in_review" || row.status === "resolved" ? row.status : "open";

      return {
        id: row.id,
        message: row.message,
        status,
        requestedAtMs: row.requestedAtMs,
        requestedByUserId: row.requestedByUserId,
        resolvedAtMs: typeof row.resolvedAtMs === "number" ? row.resolvedAtMs : null,
        resolvedBy: typeof row.resolvedBy === "string" ? row.resolvedBy : null,
        adminResponse: typeof row.adminResponse === "string" ? row.adminResponse : null,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => b.requestedAtMs - a.requestedAtMs);
}

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getFirebaseDb();
  const snapshot = await db.collection(ORDERS_COLLECTION).get();

  const orders = snapshot.docs
    .map((doc) => {
      const data = doc.data() as {
        status?: unknown;
        source?: unknown;
        totalLkr?: unknown;
        subtotalLkr?: unknown;
        couponDiscountLkr?: unknown;
        couponCode?: unknown;
        paymentRef?: unknown;
        paymentSlipUrl?: unknown;
        paymentSlipUploadFailed?: unknown;
        paymentPersonName?: unknown;
        paymentWhatsApp?: unknown;
        currentCvUrl?: unknown;
        currentCvFileName?: unknown;
        currentCvUploadFailed?: unknown;
        linkedinUrl?: unknown;
        extraDetails?: unknown;
        catalogueAnswers?: unknown;
        intake?: unknown;
        note?: unknown;
        etaDate?: unknown;
        adminNotes?: unknown;
        userId?: unknown;
        userName?: unknown;
        userEmail?: unknown;
        createdAtMs?: unknown;
        handoverDocuments?: unknown;
        revisions?: unknown;
        updates?: unknown;
        items?: unknown;
      };

      const rawItems = Array.isArray(data.items) ? data.items : [];
      const items = rawItems
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const entry = item as {
            id?: unknown;
            productName?: unknown;
            quantity?: unknown;
            priceLkr?: unknown;
            code?: unknown;
            serviceKey?: unknown;
            experienceKey?: unknown;
            optionKey?: unknown;
          };

          if (
            typeof entry.id !== "string" ||
            typeof entry.productName !== "string" ||
            typeof entry.quantity !== "number" ||
            typeof entry.priceLkr !== "number"
          ) {
            return null;
          }

          return {
            id: entry.id,
            productName: entry.productName,
            quantity: entry.quantity,
            priceLkr: entry.priceLkr,
            code: typeof entry.code === "string" ? entry.code : undefined,
            serviceKey: typeof entry.serviceKey === "string" ? entry.serviceKey : undefined,
            experienceKey: typeof entry.experienceKey === "string" ? entry.experienceKey : undefined,
            optionKey: typeof entry.optionKey === "string" ? entry.optionKey : undefined,
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item));

      const createdAtMs = typeof data.createdAtMs === "number" ? data.createdAtMs : 0;

      return {
        id: doc.id,
        source: typeof data.source === "string" ? data.source : null,
        userId: typeof data.userId === "string" ? data.userId : "",
        status: typeof data.status === "string" ? data.status : "payment_submitted",
        totalLkr: typeof data.totalLkr === "number" ? data.totalLkr : 0,
        subtotalLkr: typeof data.subtotalLkr === "number" ? data.subtotalLkr : 0,
        couponDiscountLkr: typeof data.couponDiscountLkr === "number" ? data.couponDiscountLkr : 0,
        couponCode: typeof data.couponCode === "string" ? data.couponCode : null,
        paymentRef: typeof data.paymentRef === "string" ? data.paymentRef : "",
        paymentSlipUrl: typeof data.paymentSlipUrl === "string" ? data.paymentSlipUrl : "",
        paymentSlipUploadFailed: data.paymentSlipUploadFailed === true,
        paymentPersonName: typeof data.paymentPersonName === "string" ? data.paymentPersonName : "",
        paymentWhatsApp: typeof data.paymentWhatsApp === "string" ? data.paymentWhatsApp : "",
        currentCvUrl: typeof data.currentCvUrl === "string" ? data.currentCvUrl : null,
        currentCvFileName: typeof data.currentCvFileName === "string" ? data.currentCvFileName : null,
        currentCvUploadFailed: data.currentCvUploadFailed === true,
        linkedinUrl: typeof data.linkedinUrl === "string" ? data.linkedinUrl : null,
        extraDetails:
          typeof data.extraDetails === "string"
            ? data.extraDetails
            : typeof data.note === "string"
              ? data.note
              : null,
        catalogueAnswers:
          data.catalogueAnswers && typeof data.catalogueAnswers === "object" && !Array.isArray(data.catalogueAnswers)
            ? data.catalogueAnswers
            : null,
        intake:
          data.intake && typeof data.intake === "object" && !Array.isArray(data.intake)
            ? data.intake
            : null,
        etaDate: typeof data.etaDate === "string" ? data.etaDate : null,
        adminNotes: typeof data.adminNotes === "string" ? data.adminNotes : null,
        createdAt: createdAtMs > 0 ? new Date(createdAtMs).toISOString() : null,
        createdAtMs,
        user: {
          id: typeof data.userId === "string" ? data.userId : "",
          name: typeof data.userName === "string" ? data.userName : "Customer",
          email: typeof data.userEmail === "string" ? data.userEmail : "unknown@example.com",
        },
        handoverDocuments: parseHandoverDocuments(data.handoverDocuments),
        revisions: parseOrderRevisions(data.revisions),
        updates: parseOrderUpdates(data.updates),
        items,
      };
    })
    .sort((a, b) => b.createdAtMs - a.createdAtMs)
    .slice(0, 200);

  return NextResponse.json({ orders });
}

export async function PATCH(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = orderStatusUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const db = getFirebaseDb();
  const ref = db.collection(ORDERS_COLLECTION).doc(parsed.data.orderId);
  const existingOrderSnap = await ref.get();

  if (!existingOrderSnap.exists) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const existingData = existingOrderSnap.data() as {
    id?: unknown;
    totalLkr?: unknown;
    paymentRef?: unknown;
    status?: unknown;
    userName?: unknown;
    userEmail?: unknown;
    items?: unknown;
    updates?: unknown;
    userId?: unknown;
  };

  const existingOrder = {
    id: existingOrderSnap.id,
    userId: typeof existingData.userId === "string" ? existingData.userId : "",
    totalLkr: typeof existingData.totalLkr === "number" ? existingData.totalLkr : 0,
    paymentRef: typeof existingData.paymentRef === "string" ? existingData.paymentRef : "",
    status: typeof existingData.status === "string" ? existingData.status : "payment_submitted",
    user: {
      name: typeof existingData.userName === "string" ? existingData.userName : "Customer",
      email: typeof existingData.userEmail === "string" ? existingData.userEmail : "unknown@example.com",
    },
    items: Array.isArray(existingData.items)
      ? existingData.items
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
      : [],
    updates: parseOrderUpdates(existingData.updates),
  };

  const now = Date.now();
  const updates = [...existingOrder.updates];
  if (existingOrder.status !== parsed.data.status) {
    updates.push({
      id: randomUUID(),
      atMs: now,
      type: "status_updated",
      title: `Status changed to ${parsed.data.status}`,
      details: `Updated by admin ${admin.name}`,
      actorRole: "admin",
      status: parsed.data.status,
    });
  }

  const extraFields: Record<string, unknown> = {};
  if (parsed.data.etaDate !== undefined) extraFields.etaDate = parsed.data.etaDate;
  if (parsed.data.adminNotes !== undefined) extraFields.adminNotes = parsed.data.adminNotes;

  await ref.set({ status: parsed.data.status, updatedAtMs: now, updates, ...extraFields }, { merge: true });

  const order = {
    id: parsed.data.orderId,
    status: parsed.data.status,
  };

  if (existingOrder.status !== parsed.data.status) {
    try {
      await notifyOrderStatusChanged({
        orderId: existingOrder.id,
        customerName: existingOrder.user.name,
        customerEmail: existingOrder.user.email,
        paymentRef: existingOrder.paymentRef,
        totalLkr: existingOrder.totalLkr,
        status: parsed.data.status,
        items: existingOrder.items.map((item) => ({
          productName: item.productName,
          quantity: item.quantity,
          priceLkr: item.priceLkr,
        })),
      });
    } catch (error) {
      console.error("Order status notify failed:", error);
    }

    if (existingOrder.userId) {
      try {
        await createUserNotification({
          userId: existingOrder.userId,
          orderId: existingOrder.id,
          type: "order_status",
          title: "Order status updated",
          message: `Your order ${existingOrder.id.slice(0, 8)} is now ${parsed.data.status.replaceAll("_", " ")}.`,
        });
      } catch (error) {
        console.error("In-app status notification failed:", error);
      }
    }
  }

  return NextResponse.json({ ok: true, order });
}

export async function DELETE(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as { orderId?: unknown; orderIds?: unknown };
  const ids = Array.isArray(body.orderIds)
    ? body.orderIds.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : typeof body.orderId === "string" && body.orderId.trim()
      ? [body.orderId.trim()]
      : [];

  const uniqueIds = Array.from(new Set(ids)).slice(0, 50);
  if (uniqueIds.length === 0) {
    return NextResponse.json({ error: "Select at least one order to delete." }, { status: 400 });
  }

  const db = getFirebaseDb();
  await Promise.all(uniqueIds.map((id) => db.collection(ORDERS_COLLECTION).doc(id).delete()));

  return NextResponse.json({ ok: true, deletedCount: uniqueIds.length });
}
