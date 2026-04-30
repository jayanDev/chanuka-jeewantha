import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getCachedBlogListing } from "@/lib/blog-listing";
import { prisma } from "@/lib/prisma";

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [posts, commentCounts] = await Promise.allSettled([
    getCachedBlogListing(),
    prisma.comment.groupBy({
      by: ["postId"],
      _count: { id: true },
    }),
  ]);

  const postList = posts.status === "fulfilled" ? posts.value : [];

  // Build slug → comment count map (via postId lookup)
  const commentsBySlug: Record<string, { total: number; pending: number }> = {};

  if (commentCounts.status === "fulfilled") {
    // Also get pending counts
    const pendingCounts = await prisma.comment.groupBy({
      by: ["postId"],
      where: { isApproved: false },
      _count: { id: true },
    }).catch(() => []);

    // Get postId→slug map from DB posts that have an id
    const dbPosts = await prisma.post.findMany({
      select: { id: true, slug: true },
    }).catch(() => []);

    const idToSlug = new Map(dbPosts.map((p) => [p.id, p.slug]));

    for (const row of commentCounts.value) {
      const slug = idToSlug.get(row.postId) ?? row.postId;
      if (!commentsBySlug[slug]) commentsBySlug[slug] = { total: 0, pending: 0 };
      commentsBySlug[slug].total = row._count.id;
    }

    for (const row of pendingCounts) {
      const slug = idToSlug.get(row.postId) ?? row.postId;
      if (!commentsBySlug[slug]) commentsBySlug[slug] = { total: 0, pending: 0 };
      commentsBySlug[slug].pending = row._count.id;
    }
  }

  const postsWithComments = postList.map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.category,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    totalComments: commentsBySlug[post.slug]?.total ?? 0,
    pendingComments: commentsBySlug[post.slug]?.pending ?? 0,
  }));

  return NextResponse.json({ posts: postsWithComments, total: postsWithComments.length });
}
