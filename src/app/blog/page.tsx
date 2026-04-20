import Link from "next/link";
import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import { getPostBySlug } from "@/content/blog-posts";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { getCachedBlogListing } from "@/lib/blog-listing";
import { getBlogCategoryPath } from "@/lib/blog-discovery";

export const revalidate = 3600;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Number.parseInt(String(resolvedSearchParams.page ?? "1"), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 1 ? requestedPage : 1;
  const activeCategory = resolvedSearchParams.category;

  const baseTitle = activeCategory ? `${activeCategory} Articles` : "Career Blog";
  const title = page > 1 ? `${baseTitle} Page ${page} | Chanuka Jeewantha` : `${baseTitle} | Chanuka Jeewantha`;

  const description =
    page > 1
      ? `Career blog page ${page}: ATS-friendly CV writing, LinkedIn optimization, and job search strategy articles.`
      : "Career-focused articles on ATS-friendly CV writing, LinkedIn optimization, coaching, and roadmap strategy.";

  if (activeCategory) {
    return buildNoIndexMetadata({
      title,
      description,
      path: page > 1 ? `/blog?category=${encodeURIComponent(activeCategory)}&page=${page}` : `/blog?category=${encodeURIComponent(activeCategory)}`,
      keywords: [
        "career blog",
        activeCategory.toLowerCase(),
      ],
    });
  }

  return buildPageMetadata({
    title,
    description,
    path: page > 1 ? `/blog?page=${page}` : "/blog",
    keywords: [
      "career blog",
      "ATS CV tips",
      "LinkedIn optimization guide",
      "interview preparation",
      page > 1 ? `career blog page ${page}` : "career blog page 1",
      ...(activeCategory ? [activeCategory.toLowerCase()] : []),
    ],
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Number.parseInt(String(resolvedSearchParams.page ?? "1"), 10);
  const safePage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const postsPerPage = 12;
  const activeCategory = resolvedSearchParams.category;

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);
  const allPosts = await getCachedBlogListing();

  const categories = Array.from(new Set(allPosts.map((p) => p.category).filter(Boolean))).sort();

  const posts = activeCategory 
    ? allPosts.filter(p => p.category === activeCategory)
    : allPosts;

  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const currentPage = Math.min(safePage, totalPages);
  const startIndex = (currentPage - 1) * postsPerPage;
  const visiblePosts = posts.slice(startIndex, startIndex + postsPerPage);
  
  const maxPageLinks = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageLinks / 2));
  let endPage = Math.min(totalPages, startPage + maxPageLinks - 1);
  if (endPage - startPage + 1 < maxPageLinks) {
    startPage = Math.max(1, endPage - maxPageLinks + 1);
  }
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const buildPageHref = (page: number) => {
    const search = new URLSearchParams();
    if (page > 1) search.set("page", page.toString());
    if (activeCategory) search.set("category", activeCategory);
    const qs = search.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };
  
  const buildCategoryHref = (category: string | null) => {
    if (!category) return "/blog";
    return getBlogCategoryPath(category);
  };

  const getCoverImage = (category: string) => {
    const normalized = category.toLowerCase();
    if (normalized.includes("linkedin")) return "/images/linkedin-optimization-30k-followers-proof.jpg";
    if (normalized.includes("coach") || normalized.includes("roadmap") || normalized.includes("career")) return "/images/about-page-chanuka.jpg";
    if (normalized.includes("cv") || normalized.includes("ats")) return "/images/chanuka-jeewantha-career-development-specialist.jpg";
    return "/images/hero-chanuka.jpg";
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                BLOG ARTICLES
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/blog" className={`${!activeCategory ? "text-brand-main" : "hover:text-brand-main"}`}>Blog</Link>
            {activeCategory && (
              <>
                <span className="text-brand-main text-xs">/</span>
                <span className="text-brand-main">{activeCategory}</span>
              </>
            )}
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            {activeCategory ? (
              <>Articles on <span className="text-brand-main">{activeCategory}</span></>
            ) : (
              <>Read my latest articles on <span className="text-brand-main">career strategy</span></>
            )}
          </h1>
          <p className="mt-6 text-text-light max-w-2xl text-lg">
             Explore our library of {posts.length} articles designed to help you land your dream job faster.
          </p>
        </div>
      </section>

      <section className="w-full py-[64px] sm:py-[80px] bg-zinc-50">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <aside className="w-full lg:w-1/4 flex-shrink-0 flex flex-col gap-6 sticky top-24">
              <div className="bg-white border border-zinc-200 rounded-[16px] p-6">
                <form action="/blog/search" method="get">
                  <label htmlFor="q" className="mb-3 block text-sm font-bold text-zinc-900">Search Blog</label>
                  <div className="flex flex-col gap-3">
                    <input
                      id="q"
                      name="q"
                      placeholder="Search CV, ATS..."
                      className="w-full rounded-[10px] bg-zinc-100 border border-transparent px-4 py-3 text-sm focus:border-brand-main focus:bg-white focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-[10px] bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-zinc-800"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white border border-zinc-200 rounded-[16px] p-6">
                <h3 className="font-bold text-zinc-900 mb-4 font-plus-jakarta">Categories</h3>
                <div className="flex flex-col gap-2">
                  <Link 
                    href={buildCategoryHref(null)}
                    className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${!activeCategory ? "bg-brand-main text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
                  >
                    All Articles ({allPosts.length})
                  </Link>
                  {categories.map(cat => {
                    const count = allPosts.filter(p => p.category === cat).length;
                    return (
                      <Link 
                        key={cat}
                        href={buildCategoryHref(cat)}
                        className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors flex justify-between items-center ${activeCategory === cat ? "bg-brand-main text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
                      >
                        <span>{cat}</span>
                        <span className={`text-xs ${activeCategory === cat ? "text-brand-light" : "text-zinc-400"}`}>{count}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </aside>

            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {visiblePosts.map((post) => {
                  const contentPost = getPostBySlug(post.slug);
                  const packageSlug = post.packageSlug ?? contentPost?.packageSlug;

                  return (
                    <div key={post.slug} className="bg-white border border-zinc-200 rounded-[24px] p-5 hover:shadow-xl hover:border-brand-main/30 transition-all group flex flex-col">
                      <div className="relative w-full h-[200px] bg-zinc-100 rounded-[16px] overflow-hidden mb-5 flex-shrink-0">
                        <Image
                          src={getCoverImage(post.category)}
                          alt={post.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-brand-light/20 text-brand-dark px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase">{post.category}</span>
                          <span className="text-zinc-400 text-xs font-medium">{post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : "-"}</span>
                        </div>
                        <h3 className="text-[20px] font-bold font-plus-jakarta mb-2 group-hover:text-brand-main transition-colors text-foreground leading-tight">
                          <Link href={`/blog/${post.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main rounded">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-zinc-500 text-sm mb-5 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <Link href={`/blog/${post.slug}`} className="text-brand-dark font-bold text-sm hover:text-brand-main flex items-center gap-1 group/link">
                            Read article
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                          </Link>
                          {packageSlug && (
                            <Link
                              href={`/packages/${packageSlug}`}
                              className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition-colors hover:bg-brand-main hover:text-white"
                            >
                              Package
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="w-full flex items-center justify-center mt-12 bg-white rounded-[24px] p-4 border border-zinc-200 shadow-sm">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {currentPage > 1 && (
                      <Link
                        href={buildPageHref(Math.max(1, currentPage - 1))}
                        className="h-10 px-4 rounded-full flex items-center justify-center text-sm font-semibold hover:bg-zinc-100 text-zinc-700 transition-colors"
                      >
                        Previous
                      </Link>
                    )}
                    
                    {startPage > 1 && (
                      <>
                        <Link href={buildPageHref(1)} className="w-10 h-10 rounded-full flex items-center justify-center font-semibold hover:bg-zinc-100 text-zinc-700 transition-colors">1</Link>
                        {startPage > 2 && <span className="text-zinc-400 px-2">...</span>}
                      </>
                    )}

                    {pageNumbers.map((pageNumber) => (
                      <Link
                        key={pageNumber}
                        href={buildPageHref(pageNumber)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                          pageNumber === currentPage
                            ? "bg-brand-main text-white shadow-md shadow-brand-main/20"
                            : "hover:bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {pageNumber}
                      </Link>
                    ))}

                    {endPage < totalPages && (
                      <>
                        {endPage < totalPages - 1 && <span className="text-zinc-400 px-2">...</span>}
                        <Link href={buildPageHref(totalPages)} className="w-10 h-10 rounded-full flex items-center justify-center font-semibold hover:bg-zinc-100 text-zinc-700 transition-colors">{totalPages}</Link>
                      </>
                    )}

                    {currentPage < totalPages && (
                      <Link
                        href={buildPageHref(Math.min(totalPages, currentPage + 1))}
                        className="h-10 px-4 rounded-full flex items-center justify-center text-sm font-semibold hover:bg-zinc-100 text-zinc-700 transition-colors"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
