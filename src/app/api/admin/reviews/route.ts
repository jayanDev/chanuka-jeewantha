import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getRequestUser } from "@/lib/auth-server";
import { reviewModerationSchema } from "@/lib/validation";
import { isTrustedOrigin } from "@/lib/security";

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reviews = await prisma.serviceReview.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      name: true,
      message: true,
      rating: true,
      isApproved: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ reviews });
}

export async function PATCH(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = reviewModerationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const review = await prisma.serviceReview.update({
    where: { id: parsed.data.id },
    data: { isApproved: parsed.data.isApproved },
    select: {
      id: true,
      isApproved: true,
    },
  });

  revalidateTag("public-reviews", "global");

  return NextResponse.json({ ok: true, review });
}
