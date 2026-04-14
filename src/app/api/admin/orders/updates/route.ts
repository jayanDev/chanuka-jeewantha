import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { createUserNotification } from "@/lib/user-notifications";
import { z } from "zod";

const ORDERS_COLLECTION = "orders";

const addUpdateSchema = z.object({
  orderId: z.string().min(1),
  title: z.string().min(1).max(200),
  details: z.string().optional(),
});

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

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function POST(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = addUpdateSchema.safeParse(body);

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
    status?: unknown;
    updates?: unknown;
    userId?: unknown;
  };

  const currentStatus: OrderProgressStatus =
    typeof existingData.status === "string"
      ? (existingData.status as OrderProgressStatus)
      : "in_progress";

  const rawUpdates = Array.isArray(existingData.updates) ? existingData.updates : [];
  
  const now = Date.now();
  const newUpdate: OrderUpdate = {
    id: randomUUID(),
    atMs: now,
    type: "status_updated",
    title: parsed.data.title,
    details: parsed.data.details || null,
    actorRole: "admin",
    status: currentStatus,
  };

  const updates = [...rawUpdates, newUpdate];

  await ref.set({ updatedAtMs: now, updates }, { merge: true });

  const userId = typeof existingData.userId === "string" ? existingData.userId : null;
  
  if (userId) {
    try {
      await createUserNotification({
        userId,
        orderId: parsed.data.orderId,
        type: "order_status",
        title: "Order Update",
        message: parsed.data.title,
      });
    } catch (error) {
      console.error("In-app status notification failed:", error);
    }
  }

  return NextResponse.json({ ok: true, update: newUpdate });
}
