import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { orderStatusUpdateSchema } from "@/lib/validation";
import { notifyOrderStatusChanged } from "@/lib/notifications";

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        select: {
          id: true,
          productName: true,
          quantity: true,
          priceLkr: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

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

  const existingOrder = await prisma.order.findUnique({
    where: { id: parsed.data.orderId },
    select: {
      id: true,
      totalLkr: true,
      paymentRef: true,
      status: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        select: {
          productName: true,
          quantity: true,
          priceLkr: true,
        },
      },
    },
  });

  if (!existingOrder) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const order = await prisma.order.update({
    where: { id: parsed.data.orderId },
    data: { status: parsed.data.status },
    select: {
      id: true,
      status: true,
    },
  });

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
