import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRequestUser } from "@/lib/auth-server";
import { cartItemSchema, cartUpdateSchema } from "@/lib/validation";
import { isTrustedOrigin } from "@/lib/security";

export async function GET(request: Request) {
  const user = await getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await prisma.cartItem.findMany({
    where: { userId: user.id },
    include: {
      product: {
        select: {
          id: true,
          slug: true,
          name: true,
          category: true,
          priceLkr: true,
          delivery: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const user = await getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = cartItemSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const product = await prisma.product.findUnique({
    where: { id: parsed.data.productId },
    select: { id: true, isActive: true },
  });

  if (!product || !product.isActive) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  await prisma.cartItem.upsert({
    where: {
      userId_productId: {
        userId: user.id,
        productId: product.id,
      },
    },
    update: {
      quantity: {
        increment: parsed.data.quantity,
      },
    },
    create: {
      userId: user.id,
      productId: product.id,
      quantity: parsed.data.quantity,
    },
  });

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const user = await getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = cartUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const existing = await prisma.cartItem.findUnique({
    where: { id: parsed.data.itemId },
    select: { userId: true },
  });

  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
  }

  await prisma.cartItem.update({
    where: { id: parsed.data.itemId },
    data: { quantity: parsed.data.quantity },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const user = await getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const itemId = url.searchParams.get("itemId");

  if (!itemId) {
    await prisma.cartItem.deleteMany({ where: { userId: user.id } });
    return NextResponse.json({ ok: true });
  }

  const existing = await prisma.cartItem.findUnique({
    where: { id: itemId },
    select: { userId: true },
  });

  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id: itemId } });

  return NextResponse.json({ ok: true });
}
