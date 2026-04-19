import type { BlogPost } from "@/content/blog-posts";

const templatedExcerptPattern =
  /^(Learn more about|Detailed guide on|A comprehensive guide on)\b/i;
const templatedContentPattern =
  /^(This article delves deeply into|This comprehensive guide explores|This article provides an in-depth look at)\b/i;

export function getBlogCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getBlogCategoryPath(category: string): string {
  return `/blog/category/${getBlogCategorySlug(category)}`;
}

export function getCategoryLabelFromSlug(categories: string[], slug: string): string | null {
  return categories.find((category) => getBlogCategorySlug(category) === slug) ?? null;
}

export function getBlogCategoryDescription(category: string, count?: number): string {
  const prefix =
    typeof count === "number"
      ? `${count} ${count === 1 ? "article" : "articles"} on `
      : "Articles on ";
  const normalized = category.toLowerCase();

  if (normalized.includes("linkedin")) {
    return `${prefix}${category} focused on profile SEO, authority building, recruiter discovery, and professional positioning.`;
  }

  if (normalized.includes("cv") || normalized.includes("resume") || normalized.includes("ats")) {
    return `${prefix}${category} covering ATS-friendly structure, recruiter readability, achievement writing, and interview conversion.`;
  }

  if (normalized.includes("interview")) {
    return `${prefix}${category} with practical preparation frameworks, story building, confidence systems, and follow-up strategy.`;
  }

  if (normalized.includes("career") || normalized.includes("coach") || normalized.includes("roadmap")) {
    return `${prefix}${category} designed to help job seekers make clearer career decisions, strengthen positioning, and grow faster.`;
  }

  return `${prefix}${category} from Chanuka Jeewantha's career blog, built around practical job-search execution and stronger professional positioning.`;
}

export function isCorruptedBlogText(text: string): boolean {
  return text.includes("????") || text.includes("\uFFFD");
}

export function isThinFallbackBlogPost(
  post: Pick<BlogPost, "excerpt" | "content" | "sections" | "faqs">
): boolean {
  const contentLength = post.content.trim().length;
  const excerptLength = post.excerpt.trim().length;
  return (
    contentLength < 160 &&
    excerptLength < 150 &&
    (!post.sections || post.sections.length === 0) &&
    (!post.faqs || post.faqs.length === 0)
  );
}

export function isIndexableFallbackBlogPost(post: BlogPost): boolean {
  const combinedText = `${post.title} ${post.excerpt} ${post.content}`;

  if (isCorruptedBlogText(combinedText)) {
    return false;
  }

  if (templatedExcerptPattern.test(post.excerpt) && templatedContentPattern.test(post.content)) {
    return false;
  }

  if (isThinFallbackBlogPost(post)) {
    return false;
  }

  return true;
}

export function getIndexableFallbackBlogPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter((post) => isIndexableFallbackBlogPost(post));
}
