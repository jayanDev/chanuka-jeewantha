import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { careerSeoSeries } from "./blog-career-seo-series";
import { blogPosts, getPostBySlug } from "./blog-posts";
import topics from "./career-seo-series/topics.json";
import { isIndexableFallbackBlogPost } from "@/lib/blog-discovery";
import { getBaseUrl } from "@/lib/site-url";
import sitemap from "@/app/sitemap";

const { findMany } = vi.hoisted(() => ({ findMany: vi.fn() }));
vi.mock("@/lib/prisma", () => ({ prisma: { post: { findMany } } }));
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });

describe("100-topic career series publication", () => {
  it("publishes every supplied topic exactly once without changing existing routes", () => {
    expect(careerSeoSeries).toHaveLength(100);
    expect(new Set(careerSeoSeries.map((post) => post.slug)).size).toBe(100);
    for (const topic of topics) {
      const post = getPostBySlug(topic.slug);
      expect(post?.title).toBe(topic.title);
      expect(post?.keywords?.[0]).toBe(topic.keyword);
      expect(blogPosts.filter((item) => item.slug === topic.slug)).toHaveLength(1);
      expect(post).toBe(careerSeoSeries[topic.id - 1]);
      expect(isIndexableFallbackBlogPost(post!)).toBe(true);
    }
    expect(getPostBySlug("about-chanuka-jeewantha")).toBeDefined();
  });

  it("has substantial distinct copy and resolves all related article links", () => {
    const bodies = new Set<string>();
    for (const post of careerSeoSeries) {
      const body = post.body ?? [];
      const text = body.flatMap((block) => block.type === "list" ? block.items : "text" in block ? [block.text] : []).join(" ");
      expect(text.split(/\s+/).length, post.slug).toBeGreaterThan(300);
      expect(body.filter((block) => block.type === "heading" && block.level === 2).length).toBeGreaterThanOrEqual(4);
      expect(post.faqs?.length).toBeGreaterThanOrEqual(2);
      expect(post.faqs?.every((faq) => faq.question && faq.answer)).toBe(true);
      expect(post.excerpt.length).toBeGreaterThan(100);
      expect(post.excerpt.length).toBeLessThanOrEqual(175);
      expect(text).not.toMatch(/\uFFFD|TODO|PLACEHOLDER/);
      bodies.add(text);
      for (const link of post.internalLinks ?? []) {
        if (link.href.startsWith("/blog/")) expect(getPostBySlug(link.href.slice(6)), link.href).toBeDefined();
        expect(link.href).not.toBe(`/blog/${post.slug}`);
      }
    }
    expect(bodies.size).toBe(100);
  });

  it("retains the complete supplied example copy in body and FAQs", () => {
    const normalise = (text: string) => text
      .replace(/https:\/\/chanukajeewantha\.lk/g, "chanukajeewantha.lk")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
    for (let index = 0; index < 3; index++) {
      const source = readFileSync(join(process.cwd(), "src/content/career-seo-series", `${String(index + 1).padStart(3, "0")}.md`), "utf8");
      const post = careerSeoSeries[index];
      const allText = normalise([
        post.title,
        ...post.body!.flatMap((block) => block.type === "list" ? block.items : "text" in block ? [block.text] : []),
        ...post.faqs!.flatMap((faq) => [faq.question, faq.answer]),
      ].join(" "));
      for (const line of source.split(/\r?\n/).map((line) => line.replace(/^#{1,3} |^\* /, "")).filter((line) => line.trim() && line !== "---" && !line.startsWith("Frequently Asked Questions"))) {
        expect(allText, `${post.slug}: ${line}`).toContain(normalise(line));
      }
    }
  });

  async function assertSitemapCoverage() {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const topic of topics) {
      expect(urls.filter((url) => url === `${getBaseUrl()}/blog/${topic.slug}`)).toHaveLength(1);
    }
    const index = entries.find((entry) => entry.url === `${getBaseUrl()}/blog`);
    expect(new Date(index!.lastModified!).getTime()).toBeGreaterThanOrEqual(new Date("2026-08-31").getTime());
    return urls;
  }

  it("includes all 100 URLs when no database is configured", async () => {
    vi.stubEnv("DATABASE_URL", "");
    await assertSitemapCoverage();
    expect(findMany).not.toHaveBeenCalled();
  });

  it("merges database posts without duplicating or losing the new series", async () => {
    vi.stubEnv("DATABASE_URL", "test-only");
    findMany.mockResolvedValue([
      { slug: careerSeoSeries[0].slug, category: careerSeoSeries[0].category, publishedAt: new Date("2026-08-31"), updatedAt: new Date("2026-08-31") },
      { slug: "database-only-article", category: "Career Strategy", publishedAt: new Date("2026-08-30"), updatedAt: new Date("2026-08-30") },
    ]);
    const urls = await assertSitemapCoverage();
    expect(urls).toContain(`${getBaseUrl()}/blog/database-only-article`);
  });

  it("preserves sitemap coverage if the database is unavailable", async () => {
    vi.stubEnv("DATABASE_URL", "test-only");
    findMany.mockRejectedValue(new Error("Database unavailable"));
    await assertSitemapCoverage();
  });
});
