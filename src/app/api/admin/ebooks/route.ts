import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { ebooks } from "@/lib/ebooks";
import { listEbookPurchases, upsertEbookPurchase, deleteEbookPurchase } from "@/lib/ebook-firestore";
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
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const purchases = await listEbookPurchases();
    return NextResponse.json({ purchases });
  } catch (error) {
    console.error("[admin/ebooks GET] Failed:", error);
    return NextResponse.json({ error: "Failed to load ebook access records" }, { status: 500 });
  }
}

// POST /api/admin/ebooks - grant ebook access to an email
export async function POST(request: Request) {
  try {
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

    const ebookExists = ebooks.some((e) => e.slug === ebookSlug);
    if (!ebookExists) {
      return NextResponse.json({ error: "Ebook not found" }, { status: 404 });
    }

    const purchase = await upsertEbookPurchase({
      email,
      ebookSlug,
      tier,
      grantedBy: admin.id,
      note,
    });

    return NextResponse.json({ purchase }, { status: 201 });
  } catch (error) {
    console.error("[admin/ebooks POST] Failed to grant access:", error);
    return NextResponse.json({ error: "Failed to grant ebook access. Check server logs." }, { status: 500 });
  }
}

// DELETE /api/admin/ebooks - revoke ebook access
export async function DELETE(request: Request) {
  try {
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

    await deleteEbookPurchase(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/ebooks DELETE] Failed to revoke access:", error);
    return NextResponse.json({ error: "Failed to revoke ebook access. Check server logs." }, { status: 500 });
  }
}


