import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/site-url";
import { blogPosts } from "@/content/blog-posts";
import { packageProducts } from "@/lib/packages-catalog";
import { digitalResources } from "@/lib/resources";
import { ebooks } from "@/lib/ebooks";

const baseUrl = getBaseUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/services/cv-writing",
    "/services/cover-letter-writing",
    "/services/linkedin-optimization",
    "/services/cv-review",
    "/services/packages/cv-writing",
    "/services/packages/cover-letter-writing",
    "/services/packages/linkedin-optimization",
    "/services/packages/cv-review",
    "/businesses",
    "/ebooks",
    "/resources",
    "/portfolio",
    "/pricing",
    "/case-studies",
    "/testimonials",
    "/faq",
    "/contact",
    "/help",
    "/resume",
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

  const packageEntries = packageProducts.map((item) => ({
    url: `${baseUrl}/packages/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.72,
  }));

  const resourceEntries = digitalResources.map((item) => ({
    url: `${baseUrl}/resources/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.68,
  }));

  const ebookEntries = ebooks.map((item) => ({
    url: `${baseUrl}/ebooks/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: item.category === "free" ? 0.66 : 0.64,
  }));

  return [...staticEntries, ...blogEntries, ...packageEntries, ...resourceEntries, ...ebookEntries];
}
