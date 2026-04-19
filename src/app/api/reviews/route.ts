import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isTrustedOrigin } from "@/lib/security";
import { reviewSchema } from "@/lib/validation";
import { getCachedPublicReviews } from "@/lib/reviews";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reviews = await getCachedPublicReviews();
    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json(
      { error: "Server error while loading reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const ip = getClientIp(request);
    const rate = await checkRateLimit(`reviews:${ip}`, 6, 60_000);

    if (!rate.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute." },
        { status: 429 }
      );
    }

    const review = await prisma.serviceReview.create({
      data: {
        name: parsed.data.name,
        message: parsed.data.review,
        rating: parsed.data.rating,
        isApproved: false,
      },
      select: {
        id: true,
        name: true,
        message: true,
        rating: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, review, moderation: true });
  } catch {
    return NextResponse.json(
      { error: "Server error while submitting review" },
      { status: 500 }
    );
  }
}
