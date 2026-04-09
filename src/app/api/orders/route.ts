import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { notifyOrderCreated } from "@/lib/notifications";

function toInt(value: FormDataEntryValue | null, fallback = 1): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(1, Math.floor(parsed));
}

async function saveSlip(file: File): Promise<string> {
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const safeExt = (extension ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const filename = `${Date.now()}-${randomUUID()}.${safeExt || "bin"}`;

  // Vercel production deployments should store uploads in blob/object storage.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/slips/${filename}`, file, {
      access: "public",
    });

    return blob.url;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("BLOB_READ_WRITE_TOKEN is required for file uploads in production");
  }

  const relativePath = `/uploads/slips/${filename}`;
  const absoluteDir = path.join(process.cwd(), "public", "uploads", "slips");
  const absolutePath = path.join(absoluteDir, filename);

  await mkdir(absoluteDir, { recursive: true });
  const bytes = await file.arrayBuffer();
  await writeFile(absolutePath, Buffer.from(bytes));

  return relativePath;
}

export async function GET(request: Request) {
  try {
    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
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
    });

    return NextResponse.json({ orders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("DATABASE_URL")) {
      return NextResponse.json(
        { error: "Orders database is not configured. Please set DATABASE_URL in Vercel." },
        { status: 500 },
      );
    }

    return NextResponse.json({ error: "Server error while loading orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();
    const mode = String(formData.get("mode") ?? "cart");
    const paymentRef = String(formData.get("paymentRef") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();
    const file = formData.get("slip");

    if (!paymentRef || paymentRef.length < 3) {
      return NextResponse.json({ error: "Payment reference is required" }, { status: 400 });
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Payment slip is required" }, { status: 400 });
    }

    const isAllowedType = ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type);
    if (!isAllowedType) {
      return NextResponse.json({ error: "Only JPG, PNG, WEBP or PDF files are allowed" }, { status: 400 });
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 8MB" }, { status: 400 });
    }

    let products: Array<{ id: string; name: string; priceLkr: number; quantity: number }> = [];

    if (mode === "buy_now") {
      const productId = String(formData.get("productId") ?? "");
      const quantity = toInt(formData.get("quantity"), 1);
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { id: true, name: true, priceLkr: true, isActive: true },
      });

      if (!product || !product.isActive) {
        return NextResponse.json({ error: "Selected package is unavailable" }, { status: 404 });
      }

      products = [{ ...product, quantity }];
    } else {
      const cartItems = await prisma.cartItem.findMany({
        where: { userId: user.id },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              priceLkr: true,
              isActive: true,
            },
          },
        },
      });

      products = cartItems
        .filter((item) => item.product.isActive)
        .map((item) => ({
          id: item.product.id,
          name: item.product.name,
          priceLkr: item.product.priceLkr,
          quantity: item.quantity,
        }));
    }

    if (products.length === 0) {
      return NextResponse.json({ error: "No items to checkout" }, { status: 400 });
    }

    const totalLkr = products.reduce((sum, item) => sum + item.priceLkr * item.quantity, 0);
    const paymentSlipUrl = await saveSlip(file);

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalLkr,
        paymentRef,
        note: note || null,
        paymentSlipUrl,
        status: "payment_submitted",
        items: {
          create: products.map((item) => ({
            productId: item.id,
            productName: item.name,
            priceLkr: item.priceLkr,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          select: {
            id: true,
            productName: true,
            quantity: true,
            priceLkr: true,
          },
        },
      },
    });

    if (mode !== "buy_now") {
      await prisma.cartItem.deleteMany({ where: { userId: user.id } });
    }

    await notifyOrderCreated({
      orderId: order.id,
      customerName: user.name,
      customerEmail: user.email,
      paymentRef,
      totalLkr: order.totalLkr,
      items: order.items.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        priceLkr: item.priceLkr,
      })),
    });

    return NextResponse.json({ ok: true, order });
  } catch {
    return NextResponse.json({ error: "Server error while placing order" }, { status: 500 });
  }
}
