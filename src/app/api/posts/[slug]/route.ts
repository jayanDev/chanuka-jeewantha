import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const post = await prisma.post.findUnique({
      where: { slug },
      select: {
        isPublished: true,
        slug: true,
        title: true,
        excerpt: true,
        content: true,
        category: true,
        coverImage: true,
        publishedAt: true,
      },
    });

    if (!post || !post.isPublished) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      post: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        coverImage: post.coverImage,
        publishedAt: post.publishedAt,
      },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
