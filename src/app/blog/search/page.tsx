import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug } from "@/content/blog-posts";
import { buildNoIndexMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { getCachedBlogListing } from "@/lib/blog-listing";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q.trim() : "";

  const title = query
    ? `Blog Search Results for "${query}"`
    : "Blog Search Results";

  const description = query
    ? `Search results for "${query}" from Chanuka Jeewantha's career blog articles.`
    : "Search results for career blog articles by Chanuka Jeewantha.";

  return buildNoIndexMetadata({
    title,
    description,
    path: "/blog/search",
    keywords: query ? ["blog search", query, "career blog"] : ["blog search", "career blog"],
  });
}

export default async function BlogSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q.trim() : "";
  const normalizedQuery = query.toLowerCase();
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Search", path: "/blog/search" },
  ]);
  const posts = await getCachedBlogListing();

  const visiblePosts = normalizedQuery
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(normalizedQuery) ||
          post.excerpt.toLowerCase().includes(normalizedQuery) ||
          post.category.toLowerCase().includes(normalizedQuery)
      )
    : posts;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white min-h-[70vh]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <Link href="/blog" className="text-sm font-medium text-brand-main hover:text-brand-dark">
              Back to Blog
            </Link>
            <h1 className="mt-3 text-[34px] md:text-[48px] font-bold font-plus-jakarta text-foreground">
              Blog Search Results
            </h1>
            <p className="mt-2 text-zinc-600">
              Showing results for <span className="font-semibold text-foreground">"{query || "all posts"}"</span> ({visiblePosts.length})
            </p>
          </div>

          <form action="/blog/search" method="get" className="mb-10 max-w-xl">
            <label htmlFor="q" className="mb-2 block text-sm font-semibold text-zinc-700">
              Search blog articles
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="q"
                name="q"
                defaultValue={query}
                placeholder="Search CV, LinkedIn, interview, ATS..."
                className="w-full rounded-[10px] border border-zinc-300 px-4 py-3 text-sm focus:border-brand-main focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-[10px] bg-foreground px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Search
              </button>
            </div>
          </form>

          {visiblePosts.length === 0 ? (
            <div className="rounded-[16px] border border-zinc-200 bg-zinc-50 p-6 text-center">
              <p className="text-zinc-700">No blog posts match your search yet. Try a different keyword.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visiblePosts.map((post) => {
                const contentPost = getPostBySlug(post.slug);
                const packageSlug = post.packageSlug ?? contentPost?.packageSlug;

                return (
                <article key={post.slug} className="border border-zinc-200 rounded-[24px] p-6 hover:shadow-lg transition-shadow group flex flex-col">
                  <div className="w-full h-[220px] bg-zinc-200 rounded-[16px] overflow-hidden mb-5 flex-shrink-0">
                    <div className="w-full h-full bg-zinc-300 flex flex-col items-center justify-center font-mono text-zinc-500 text-sm text-center group-hover:scale-105 transition-transform duration-500">
                      <span className="font-semibold tracking-wide">Placeholder</span>
                      <span className="mt-1 text-xs">100% x 220px</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-brand-light/20 text-brand-dark px-3 py-1 rounded-full text-xs font-semibold">{post.category}</span>
                    <span className="text-text-light text-sm italic">
                      {post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : "-"}
                    </span>
                  </div>
                  <h2 className="text-[22px] font-bold font-plus-jakarta mb-3 group-hover:text-brand-main transition-colors text-foreground">
                    {post.title}
                  </h2>
                  <p className="text-text-body text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-brand-dark font-semibold text-[16px] hover:text-brand-main w-fit flex items-center gap-2 border-b border-transparent hover:border-brand-main pb-1 transition-all"
                    >
                      Learn More
                    </Link>
                    {packageSlug && (
                      <Link
                        href={`/packages/${packageSlug}`}
                        className="rounded-[10px] border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
                      >
                        View Package
                      </Link>
                    )}
                  </div>
                </article>
              );})}
            </div>
          )}

          <aside className="mt-12 rounded-[16px] border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-[24px] font-bold font-plus-jakarta text-foreground mb-3">Continue Exploring</h2>
            <p className="text-text-body mb-5">
              Keep building momentum with related pages across this site.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/blog" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Browse All Blog Posts
              </Link>
              <Link href="/resources" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Explore Digital Resources
              </Link>
              <Link href="/services" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                View Services
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
