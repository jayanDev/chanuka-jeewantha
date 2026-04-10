import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getFirebaseDb } from "@/lib/firebase-admin";
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

    const user = await getRequestUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      orderId?: unknown;
      message?: unknown;
    };

    const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Please include at least 10 characters for the revision request" }, { status: 400 });
    }

    if (message.length > 1500) {
      return NextResponse.json({ error: "Revision request is too long" }, { status: 400 });
    }

    const db = getFirebaseDb();
    const orderRef = db.collection(ORDERS_COLLECTION).doc(orderId);
    const orderSnapshot = await orderRef.get();

    if (!orderSnapshot.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const orderData = orderSnapshot.data() as {
      userId?: unknown;
      status?: unknown;
      revisions?: unknown;
      updates?: unknown;
    };

    if (typeof orderData.userId !== "string" || orderData.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const existingStatus = parseOrderStatus(orderData.status);
    if (existingStatus === "cancelled") {
      return NextResponse.json({ error: "Cannot request revisions for a cancelled order" }, { status: 400 });
    }

    const now = Date.now();
    const revision: OrderRevision = {
      id: randomUUID(),
      message,
      status: "open",
      requestedAtMs: now,
      requestedByUserId: user.id,
      resolvedAtMs: null,
      resolvedBy: null,
      adminResponse: null,
    };

    const revisions = [revision, ...parseOrderRevisions(orderData.revisions)];

    const nextStatus: OrderProgressStatus =
      existingStatus === "completed" || existingStatus === "confirmed" ? "in_progress" : existingStatus;

    const updates: OrderUpdate[] = [
      ...parseOrderUpdates(orderData.updates),
      {
        id: randomUUID(),
        atMs: now,
        type: "order_warning",
        title: "Revision requested by customer",
        details: message,
        actorRole: "customer",
        status: nextStatus,
      },
    ];

    if (nextStatus !== existingStatus) {
      updates.push({
        id: randomUUID(),
        atMs: now,
        type: "status_updated",
        title: "Status changed to in_progress",
        details: "Order moved back to in progress after customer revision request.",
        actorRole: "system",
        status: nextStatus,
      });
    }

    await orderRef.set(
      {
        status: nextStatus,
        revisions,
        updates,
        updatedAtMs: now,
      },
      { merge: true }
    );

    try {
      await createUserNotification({
        userId: user.id,
        orderId,
        type: "revision_requested",
        title: "Revision request submitted",
        message: "Your revision request was sent to the admin team. We will update the order timeline after review.",
      });
    } catch (error) {
      console.error("In-app revision submission notification failed:", error);
    }

    return NextResponse.json({ ok: true, revision });
  } catch (error) {
    console.error("Revision request failed:", error);
    return NextResponse.json({ error: "Failed to submit revision request" }, { status: 500 });
  }
}
