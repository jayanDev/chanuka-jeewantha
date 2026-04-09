import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { orderStatusUpdateSchema } from "@/lib/validation";
import { notifyOrderStatusChanged } from "@/lib/notifications";
import { getFirebaseDb } from "@/lib/firebase-admin";

const ORDERS_COLLECTION = "orders";

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
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
        totalLkr?: unknown;
        paymentRef?: unknown;
        paymentSlipUrl?: unknown;
        userId?: unknown;
        userName?: unknown;
        userEmail?: unknown;
        createdAtMs?: unknown;
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
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item));

      return {
        id: doc.id,
        userId: typeof data.userId === "string" ? data.userId : "",
        status: typeof data.status === "string" ? data.status : "payment_submitted",
        totalLkr: typeof data.totalLkr === "number" ? data.totalLkr : 0,
        paymentRef: typeof data.paymentRef === "string" ? data.paymentRef : "",
        paymentSlipUrl: typeof data.paymentSlipUrl === "string" ? data.paymentSlipUrl : "",
        createdAtMs: typeof data.createdAtMs === "number" ? data.createdAtMs : 0,
        user: {
          id: typeof data.userId === "string" ? data.userId : "",
          name: typeof data.userName === "string" ? data.userName : "Customer",
          email: typeof data.userEmail === "string" ? data.userEmail : "unknown@example.com",
        },
        items,
      };
    })
    .sort((a, b) => b.createdAtMs - a.createdAtMs)
    .slice(0, 200)
    .map(({ createdAtMs: _ignore, ...order }) => order);

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
  };

  const existingOrder = {
    id: existingOrderSnap.id,
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
  };
  await ref.set({ status: parsed.data.status, updatedAtMs: Date.now() }, { merge: true });

  const order = {
    id: parsed.data.orderId,
    status: parsed.data.status,
  };

  if (existingOrder.status !== parsed.data.status) {
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
  }

  return NextResponse.json({ ok: true, order });
}
