import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isTrustedOrigin } from "@/lib/security";
import { commentSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = commentSchema.safeParse(body);

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
    const rate = await checkRateLimit(`comments:${ip}`, 6, 60_000);

    if (!rate.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute." },
        { status: 429 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { slug: parsed.data.postSlug },
      select: { id: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.comment.create({
      data: {
        postId: post.id,
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      },
    });

    return NextResponse.json({ ok: true, moderation: true });
  } catch {
    return NextResponse.json(
      { error: "Server error while posting comment" },
      { status: 500 }
    );
  }
}
