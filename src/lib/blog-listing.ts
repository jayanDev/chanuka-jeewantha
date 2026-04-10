import { unstable_cache } from "next/cache";
import { blogPosts, getPostBySlug } from "@/content/blog-posts";
import { prisma } from "@/lib/prisma";

export type BlogListingPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: Date | null;
  packageSlug?: string;
};

function sortPostsByDate<T extends { publishedAt: Date | null }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aTime = a.publishedAt ? a.publishedAt.getTime() : 0;
    const bTime = b.publishedAt ? b.publishedAt.getTime() : 0;
    return bTime - aTime;
  });
}

const fallbackPosts: BlogListingPost[] = blogPosts.map((post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
  packageSlug: post.packageSlug,
}));

async function loadMergedBlogListing(): Promise<BlogListingPost[]> {
  const fallbackSorted = sortPostsByDate(fallbackPosts);

  if (!process.env.DATABASE_URL) {
    return fallbackSorted;
  }

  try {
    const dbPostsRaw = await prisma.post.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        publishedAt: true,
      },
      take: 300,
    });

    const dbPosts: BlogListingPost[] = dbPostsRaw.map((item) => ({
      ...item,
      packageSlug: getPostBySlug(item.slug)?.packageSlug,
    }));

    const dbSlugs = new Set(dbPosts.map((item) => item.slug));
    const merged = [...dbPosts, ...fallbackPosts.filter((item) => !dbSlugs.has(item.slug))];

    return sortPostsByDate(merged);
  } catch {
    return fallbackSorted;
  }
}

export const getCachedBlogListing = unstable_cache(loadMergedBlogListing, ["blog-listing:merged"], {
  revalidate: 3600,
  tags: ["blog-listing"],
});
