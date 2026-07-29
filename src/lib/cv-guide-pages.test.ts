import { describe, expect, it } from "vitest";
import { blogPosts } from "@/content/blog-posts";
import { getIndexableFallbackBlogPosts } from "@/lib/blog-discovery";
import {
  cvGuidePages,
  getRelatedBlogPostsForGuide,
  type CvGuideCluster,
} from "@/lib/cv-guide-pages";
import { landingPages } from "@/lib/landing-pages";
import { packageProducts } from "@/lib/packages-catalog";

const expectedClusterCounts: Record<CvGuideCluster, number> = {
  role: 40,
  industry: 20,
  "career-situation": 20,
  linkedin: 10,
  application: 10,
};

describe("CV writing guide registry", () => {
  it("contains exactly 100 curated pages in the planned clusters", () => {
    expect(cvGuidePages).toHaveLength(100);
    for (const [cluster, count] of Object.entries(expectedClusterCounts)) {
      expect(cvGuidePages.filter((page) => page.cluster === cluster)).toHaveLength(count);
    }
  });

  it("keeps slugs, titles, and core page copy unique", () => {
    expect(new Set(cvGuidePages.map((page) => page.slug))).toHaveLength(100);
    expect(new Set(cvGuidePages.map((page) => page.title))).toHaveLength(100);
    expect(new Set(cvGuidePages.map((page) => page.intro.join(" ")))).toHaveLength(100);
    expect(new Set(cvGuidePages.map((page) => page.localInsight))).toHaveLength(100);

    const existingSlugs = new Set(landingPages.map((page) => page.slug));
    for (const page of cvGuidePages) {
      expect(existingSlugs.has(page.slug)).toBe(false);
    }
  });

  it("provides substantial structured content, images, FAQs, and valid packages", () => {
    const validPackageSlugs = new Set(packageProducts.map((pkg) => pkg.slug));
    for (const page of cvGuidePages) {
      const searchableContent = [
        ...page.intro,
        ...page.audience,
        ...page.challenges,
        ...page.recommendations,
        ...page.evidenceExamples,
        page.localInsight,
      ].join(" ");

      expect(searchableContent.length).toBeGreaterThan(700);
      expect(page.metaDescription.length).toBeGreaterThan(100);
      expect(page.metaDescription.length).toBeLessThan(190);
      expect(page.heroImage.startsWith("/images/")).toBe(true);
      expect(page.faqs).toHaveLength(3);
      expect(page.articleTerms.length).toBeGreaterThanOrEqual(5);
      expect(page.relatedPackageSlugs.every((slug) => validPackageSlugs.has(slug))).toBe(true);
    }
  });

  it("selects six unique, indexable blog articles for every guide", () => {
    const indexablePosts = getIndexableFallbackBlogPosts(blogPosts);
    for (const page of cvGuidePages) {
      const related = getRelatedBlogPostsForGuide(page, indexablePosts, 6);
      expect(related).toHaveLength(6);
      expect(new Set(related.map((post) => post.slug))).toHaveLength(6);
    }
  });
});
