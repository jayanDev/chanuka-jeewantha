import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { z } from "zod/v4";

const bodySchema = z.object({
  productSlug: z.string().min(1).max(200),
});

export async function GET() {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.savedItem.findMany({
    where: { userId: user.id },
    select: { productSlug: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ saved: items.map((i) => i.productSlug) });
}

export async function POST(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await prisma.savedItem.upsert({
    where: { userId_productSlug: { userId: user.id, productSlug: parsed.data.productSlug } },
    update: {},
    create: { userId: user.id, productSlug: parsed.data.productSlug },
  });

  return NextResponse.json({ ok: true, saved: true });
}

export async function DELETE(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const productSlug = searchParams.get("slug");

  if (!productSlug || productSlug.length > 200) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  await prisma.savedItem.deleteMany({
    where: { userId: user.id, productSlug },
  });

  return NextResponse.json({ ok: true, saved: false });
}
