import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/site-url";
import { blogPosts } from "@/content/blog-posts";
import { publicPackageProducts as packageProducts, publicPackageServiceKeys } from "@/lib/packages-catalog";
import { digitalResources } from "@/lib/resources";
import { ebooks } from "@/lib/ebooks";
import { caseStudies } from "@/lib/case-studies";
import { getBlogCategoryPath, getIndexableFallbackBlogPosts } from "@/lib/blog-discovery";
import { careerTools } from "@/lib/tools";
import { industryLandingPages } from "@/lib/industry-pages";

import { landingPages } from "@/lib/landing-pages";
import { cvGuidePages } from "@/lib/cv-guide-pages";
import { countryJobMarkets } from "@/lib/country-job-markets";
const baseUrl = getBaseUrl();
const siteLastUpdated = new Date("2026-07-30T00:00:00.000Z");

// Refresh database additions too; repository articles are included on each build.
export const revalidate = 3600;

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
    ...publicPackageServiceKeys.map((key) => `/services/packages/${key}`),
    "/services/personal-website",
    "/services/industries",
    "/businesses",
    "/ebooks",
    "/resources",
    "/free-ats-cv-template",
    "/free-ats-cv-checklist",
    "/free-linkedin-headline-formula",
    "/90-day-interview-guarantee",
    "/tools",
    "/booking",
    "/reviews",
    "/career-quiz",
    "/results",
    "/workshops",
    "/portfolio",
    "/offers",
    "/offers/bundles",
    "/offers/bulk-discount-packages",
    "/offers/bundle-discount-packages",
    "/offers/bulk-cv-5-pack",
    "/offers/bulk-cv-10-pack",
    "/offers/career-brand-trinity-bundle",
    "/offers/application-duo-bundle",
    "/pricing",
    "/catalogue",
    "/bundles",
    "/fiverr-orders",
    "/affiliate",
    "/case-studies",
    "/testimonials",
    "/faq",
    "/contact",
    "/help",
    "/privacy-policy",
    "/cv-writing-guides",
    "/terms-and-conditions",
    "/resume",
    "/blog",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: ["", "/pricing", "/bundles", "/catalogue", "/fiverr-orders", "/booking"].includes(route) || route.startsWith("/services/")
      ? new Date("2026-08-31T00:00:00.000Z")
      : siteLastUpdated,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const fallbackPosts: Array<{ slug: string; publishedAt: Date | null; updatedAt: Date; category: string }> = getIndexableFallbackBlogPosts(blogPosts).map((post) => {
    const date = post.publishedAt ? new Date(post.publishedAt) : new Date();
    return {
      slug: post.slug,
      publishedAt: date,
      updatedAt: date,
      category: post.category,
    };
  });

  let posts: Array<{ slug: string; publishedAt: Date | null; updatedAt: Date; category: string }> = fallbackPosts;
  if (process.env.DATABASE_URL) {
    try {
      const dbPosts = await prisma.post.findMany({
        where: { isPublished: true },
        select: { slug: true, publishedAt: true, updatedAt: true, category: true },
      });

      const dbSlugs = new Set(dbPosts.map((item) => item.slug));
      posts = [
        ...dbPosts,
        ...fallbackPosts.filter((item) => !dbSlugs.has(item.slug)),
      ];
    } catch {
      posts = fallbackPosts;
    }
  }

  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ?? post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const blogLastUpdated = new Date(Math.max(
    siteLastUpdated.getTime(),
    ...posts.map((post) => Math.max(post.publishedAt?.getTime() ?? 0, post.updatedAt.getTime())),
  ));

  const blogPostsPerPage = 12;
  const blogTotalPages = Math.max(1, Math.ceil(posts.length / blogPostsPerPage));
  const blogIndexEntries = Array.from({ length: blogTotalPages }, (_, index) => {
    const page = index + 1;
    return {
      url: page === 1 ? `${baseUrl}/blog` : `${baseUrl}/blog?page=${page}`,
      lastModified: blogLastUpdated,
      changeFrequency: "weekly" as const,
      priority: page === 1 ? 0.72 : 0.62,
    };
  });

  const categoryEntries = Array.from(new Set(posts.map((post) => post.category)))
    .sort()
    .map((category) => ({
      url: `${baseUrl}${getBlogCategoryPath(category)}`,
      lastModified: blogLastUpdated,
      changeFrequency: "weekly" as const,
      priority: 0.69,
    }));

  const packageEntries = packageProducts.map((item) => ({
    url: `${baseUrl}/packages/${item.slug}`,
    lastModified: new Date("2026-08-31T00:00:00.000Z"),
    changeFrequency: "weekly" as const,
    priority: 0.72,
  }));

  const resourceEntries = digitalResources.map((item) => ({
    url: `${baseUrl}/resources/${item.slug}`,
    lastModified: siteLastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.68,
  }));

  const toolEntries = careerTools.map((item) => ({
    url: `${baseUrl}/tools/${item.slug}`,
    lastModified: siteLastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.69,
  }));

  const landingEntries = landingPages.map((item) => ({
    url: `${baseUrl}/${item.slug}`,
    lastModified: siteLastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const countryJobEntries = countryJobMarkets.map((market) => ({
    url: `${baseUrl}/${market.slug}`,
    lastModified: new Date("2026-08-31T00:00:00.000Z"),
    changeFrequency: "monthly" as const,
    priority: 0.76,
    images: [`${baseUrl}${market.coverImage ?? "/images/about-chanurgka.jpg"}`],
  }));


  const cvGuideEntries = cvGuidePages.map((item) => ({
    url: `${baseUrl}/cv-writing-guides/${item.slug}`,
    lastModified: siteLastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.68,
    images: [`${baseUrl}${item.heroImage}`],
  }));

  const industryEntries = industryLandingPages.map((item) => ({
    url: `${baseUrl}/services/industries/${item.slug}`,
    lastModified: siteLastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.71,
  }));

  const ebookEntries = ebooks.map((item) => ({
    url: `${baseUrl}/ebooks/${item.slug}`,
    lastModified: siteLastUpdated,
    changeFrequency: "monthly" as const,
    priority: item.category === "free" ? 0.66 : 0.64,
  }));

  const caseStudyEntries = caseStudies.map((item) => ({
    url: `${baseUrl}/case-studies/${item.slug}`,
    lastModified: new Date(`${item.year}-01-01T00:00:00.000Z`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const entries = [
    ...staticEntries,
    ...blogIndexEntries,
    ...categoryEntries,
    ...blogEntries,
    ...packageEntries,
    ...resourceEntries,
    ...landingEntries,
    ...cvGuideEntries,
    ...countryJobEntries,
    ...toolEntries,
    ...industryEntries,
    ...ebookEntries,
    ...caseStudyEntries,
  ];

  // /blog also exists in staticRoutes. Keep its current index metadata once.
  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}
