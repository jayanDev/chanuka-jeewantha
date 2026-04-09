import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/site-url";

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

  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    select: { slug: true, publishedAt: true, updatedAt: true },
  });

  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ?? post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticEntries, ...blogEntries];
}
