import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/site-url";
import { blogPosts } from "@/content/blog-posts";

const baseUrl = getBaseUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/businesses",
    "/ebooks",
    "/portfolio",
    "/pricing",
    "/case-studies",
    "/testimonials",
    "/faq",
    "/contact",
    "/blog",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  let posts: Array<{ slug: string; publishedAt: Date | null; updatedAt: Date }> = [];
  if (process.env.DATABASE_URL) {
    try {
      posts = await prisma.post.findMany({
        where: { isPublished: true },
        select: { slug: true, publishedAt: true, updatedAt: true },
      });
    } catch {
      posts = [];
    }
  }

  if (posts.length === 0) {
    posts = blogPosts.map((post) => {
      const date = post.publishedAt ? new Date(post.publishedAt) : new Date();
      return {
        slug: post.slug,
        publishedAt: date,
        updatedAt: date,
      };
    });
  }

  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ?? post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticEntries, ...blogEntries];
}
