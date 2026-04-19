import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { reviewModerationSchema } from "@/lib/validation";

function isAuthorized(request: Request): boolean {
  const token = request.headers.get("x-review-admin-token");
  const expected = process.env.REVIEW_ADMIN_TOKEN;

  if (!expected) return false;
  return token === expected;
}

export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
  } catch {
    return NextResponse.json(
      { error: "Server error while loading admin reviews" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
        name: true,
        message: true,
        rating: true,
        isApproved: true,
        createdAt: true,
      },
    });

    revalidateTag("public-reviews", "global");

    return NextResponse.json({ ok: true, review });
  } catch {
    return NextResponse.json(
      { error: "Server error while updating review" },
      { status: 500 }
    );
  }
}
