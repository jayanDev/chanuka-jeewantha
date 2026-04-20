import { cvSeriesSi } from "@/content/blog-cv-series-si";

/**
 * Set of all Sinhala blog slugs — used to mark Sinhala posts with `lang="si"` meta.
 * Since Sinhala posts are standalone topics (not 1:1 translations), we detect the
 * primary language from the slug suffix "-sinhala".
 */
const sinhalaSlugSet = new Set(cvSeriesSi.map((post) => post.slug));

/**
 * Returns `"si"` if the slug is a Sinhala post (ends in "-sinhala" or exists in
 * the cvSeriesSi collection). Returns `null` for English posts.
 */
export function getBlogPostLanguage(slug: string): "si" | null {
  if (sinhalaSlugSet.has(slug) || slug.endsWith("-sinhala")) {
    return "si";
  }
  return null;
}

/**
 * For a Sinhala blog post, returns the hreflang alternates object suitable for
 * Next.js metadata `alternates.languages`.
 * Marks the current page as `si` and points `x-default` to the blog listing.
 */
export function getSinhalaHreflangAlternates(
  slug: string,
): Record<string, string> | null {
  if (getBlogPostLanguage(slug) !== "si") return null;
  return {
    si: `/blog/${slug}`,
    "x-default": "/blog",
  };
}
