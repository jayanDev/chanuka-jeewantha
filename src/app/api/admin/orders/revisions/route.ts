import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { notifyOrderStatusChanged } from "@/lib/notifications";
import { isTrustedOrigin } from "@/lib/security";
import { createUserNotification } from "@/lib/user-notifications";

const ORDERS_COLLECTION = "orders";

type OrderProgressStatus =
  | "pending_payment"
  | "payment_submitted"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

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

function parseOrderStatus(value: unknown, fallback: OrderProgressStatus = "payment_submitted"): OrderProgressStatus {
  if (
    value === "pending_payment" ||
    value === "payment_submitted" ||
    value === "confirmed" ||
    value === "in_progress" ||
    value === "completed" ||
    value === "cancelled"
  ) {
    return value;
  }

  return fallback;
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

      return {
        id: row.id,
        atMs: row.atMs,
        type,
        title: row.title,
        details: typeof row.details === "string" ? row.details : null,
        actorRole,
        status: parseOrderStatus(row.status),
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

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      orderId?: unknown;
      revisionId?: unknown;
      status?: unknown;
      adminResponse?: unknown;
    };

    const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
    const revisionId = typeof body.revisionId === "string" ? body.revisionId.trim() : "";
    const status = body.status === "in_review" || body.status === "resolved" ? body.status : null;
    const adminResponse = typeof body.adminResponse === "string" ? body.adminResponse.trim() : "";

    if (!orderId || !revisionId || !status) {
      return NextResponse.json({ error: "Order ID, revision ID and status are required" }, { status: 400 });
    }

    if (status === "resolved" && adminResponse.length < 5) {
      return NextResponse.json({ error: "Please provide a short resolution note" }, { status: 400 });
    }

    if (adminResponse.length > 1500) {
      return NextResponse.json({ error: "Admin response is too long" }, { status: 400 });
    }

    const db = getFirebaseDb();
    const orderRef = db.collection(ORDERS_COLLECTION).doc(orderId);
    const orderSnapshot = await orderRef.get();

    if (!orderSnapshot.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const orderData = orderSnapshot.data() as {
      status?: unknown;
      revisions?: unknown;
      updates?: unknown;
      userId?: unknown;
      userName?: unknown;
      userEmail?: unknown;
      paymentRef?: unknown;
      totalLkr?: unknown;
      items?: unknown;
    };

    const revisions = parseOrderRevisions(orderData.revisions);
    const revisionIndex = revisions.findIndex((entry) => entry.id === revisionId);
    if (revisionIndex < 0) {
      return NextResponse.json({ error: "Revision request not found" }, { status: 404 });
    }

    const now = Date.now();
    const existingStatus = parseOrderStatus(orderData.status);

    const updatedRevision: OrderRevision = {
      ...revisions[revisionIndex],
      status,
      resolvedAtMs: status === "resolved" ? now : null,
      resolvedBy: status === "resolved" ? admin.email : null,
      adminResponse: adminResponse || null,
    };

    const updatedRevisions = [...revisions];
    updatedRevisions[revisionIndex] = updatedRevision;

    const nextStatus: OrderProgressStatus =
      existingStatus === "cancelled"
        ? "cancelled"
        : status === "in_review"
          ? "in_progress"
          : "completed";

    const updates: OrderUpdate[] = [
      ...parseOrderUpdates(orderData.updates),
      {
        id: randomUUID(),
        atMs: now,
        type: "order_warning",
        title: status === "resolved" ? "Revision resolved by admin" : "Revision marked in progress",
        details:
          status === "resolved"
            ? adminResponse || "Revision completed and ready for customer review."
            : adminResponse || "Admin started working on this revision request.",
        actorRole: "admin",
        status: nextStatus,
      },
    ];

    if (nextStatus !== existingStatus) {
      updates.push({
        id: randomUUID(),
        atMs: now,
        type: "status_updated",
        title: `Status changed to ${nextStatus}`,
        details: `Updated during revision workflow by ${admin.name}`,
        actorRole: "admin",
        status: nextStatus,
      });
    }

    await orderRef.set(
      {
        status: nextStatus,
        revisions: updatedRevisions,
        updates,
        updatedAtMs: now,
      },
      { merge: true }
    );

    const userId = typeof orderData.userId === "string" ? orderData.userId : "";
    if (userId) {
      try {
        await createUserNotification({
          userId,
          orderId,
          type: status === "resolved" ? "revision_resolved" : "order_status",
          title: status === "resolved" ? "Revision completed" : "Revision in progress",
          message:
            status === "resolved"
              ? adminResponse || "Your requested revision has been completed. Please review your order updates."
              : adminResponse || "Your revision request is now being worked on by our team.",
        });
      } catch (error) {
        console.error("In-app revision notification failed:", error);
      }
    }

    if (nextStatus !== existingStatus) {
      const customerName = typeof orderData.userName === "string" ? orderData.userName : "Customer";
      const customerEmail = typeof orderData.userEmail === "string" ? orderData.userEmail : "";
      const paymentRef = typeof orderData.paymentRef === "string" ? orderData.paymentRef : "";
      const totalLkr = typeof orderData.totalLkr === "number" ? orderData.totalLkr : 0;
      const items = Array.isArray(orderData.items)
        ? orderData.items
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
        console.error("Order status notify failed during revision update:", error);
      }
    }

    return NextResponse.json({ ok: true, revision: updatedRevision, status: nextStatus });
  } catch (error) {
    console.error("Admin revision update failed:", error);
    return NextResponse.json({ error: "Failed to update revision" }, { status: 500 });
  }
}
