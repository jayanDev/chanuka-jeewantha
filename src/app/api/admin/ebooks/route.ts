import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { prisma } from "@/lib/prisma";
import { ebooks } from "@/lib/ebooks";
import { z } from "zod";

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

const grantSchema = z.object({
  email: z.string().email(),
  ebookSlug: z.string().min(1),
  tier: z.enum(["read", "download"]),
  note: z.string().optional(),
});

// GET /api/admin/ebooks - list all ebook purchases
export async function GET(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const purchases = await prisma.ebookPurchase.findMany({
    orderBy: { grantedAt: "desc" },
  });

  return NextResponse.json({ purchases });
}

// POST /api/admin/ebooks - grant ebook access to an email
export async function POST(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = grantSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { email, ebookSlug, tier, note } = parsed.data;

  // Validate ebook slug exists
  const ebookExists = ebooks.some((e) => e.slug === ebookSlug);
  if (!ebookExists) {
    return NextResponse.json({ error: "Ebook not found" }, { status: 404 });
  }

  const purchase = await prisma.ebookPurchase.upsert({
    where: { email_ebookSlug: { email, ebookSlug } },
    update: { tier, note: note ?? null, grantedBy: admin.id, grantedAt: new Date() },
    create: { email, ebookSlug, tier, note: note ?? null, grantedBy: admin.id },
  });

  return NextResponse.json({ purchase }, { status: 201 });
}

// DELETE /api/admin/ebooks - revoke ebook access
export async function DELETE(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.ebookPurchase.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
