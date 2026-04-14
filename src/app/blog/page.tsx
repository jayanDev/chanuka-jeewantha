import Link from "next/link";
import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import { getPostBySlug } from "@/content/blog-posts";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { getCachedBlogListing } from "@/lib/blog-listing";

export const revalidate = 3600;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Number.parseInt(String(resolvedSearchParams.page ?? "1"), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 1 ? requestedPage : 1;

  const title =
    page > 1 ? `Career Blog Page ${page} | Chanuka Jeewantha` : "Career Blog | Chanuka Jeewantha";

  const description =
    page > 1
      ? `Career blog page ${page}: ATS-friendly CV writing, LinkedIn optimization, and job search strategy articles.`
      : "Career-focused articles on ATS-friendly CV writing, LinkedIn optimization, coaching, and roadmap strategy.";

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
    ],
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Number.parseInt(String(resolvedSearchParams.page ?? "1"), 10);
  const safePage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const postsPerPage = 9;

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);
  const posts = await getCachedBlogListing();

  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const currentPage = Math.min(safePage, totalPages);
  const startIndex = (currentPage - 1) * postsPerPage;
  const visiblePosts = posts.slice(startIndex, startIndex + postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const buildPageHref = (page: number) => (page <= 1 ? "/blog" : `/blog?page=${page}`);

  const getCoverImage = (category: string) => {
    const normalized = category.toLowerCase();

    if (normalized.includes("linkedin")) {
      return "/images/linkedin-optimization-30k-followers-proof.jpg";
    }

    if (normalized.includes("coach") || normalized.includes("roadmap") || normalized.includes("career")) {
      return "/images/about-page-chanuka.jpg";
    }

    if (normalized.includes("cv") || normalized.includes("ats")) {
      return "/images/chanuka-jeewantha-career-development-specialist.jpg";
    }

    return "/images/hero-chanuka.jpg";
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* 1. Hero Section */}
      <section className="w-full bg-foreground text-white pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        {/* Background Marquee Text */}
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
            <span className="text-brand-main">Blog</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Read my latest articles on <span className="text-brand-main">career strategy</span> and job search growth.
          </h1>
        </div>
      </section>

      {/* 2. Blog Grid Section */}
      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <form action="/blog/search" method="get" className="mb-8 max-w-xl">
            <label htmlFor="q" className="mb-2 block text-sm font-semibold text-zinc-700">
              Search blog articles
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="q"
                name="q"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePosts.map((post) => {
              const contentPost = getPostBySlug(post.slug);
              const packageSlug = post.packageSlug ?? contentPost?.packageSlug;

              return (
              <div key={post.slug} className="border border-zinc-200 rounded-[24px] p-6 hover:shadow-lg transition-shadow group flex flex-col">
                <div className="relative w-full h-[250px] bg-zinc-200 rounded-[20px] overflow-hidden mb-6 flex-shrink-0">
                  <Image
                    src={getCoverImage(post.category)}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-brand-light/20 text-brand-dark px-3 py-1 rounded-full text-xs font-semibold">{post.category}</span>
                    <span className="text-text-light text-sm italic">{post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : "-"}</span>
                  </div>
                  <h3 className="text-[24px] font-bold font-plus-jakarta mb-3 group-hover:text-brand-main transition-colors text-foreground">
                    {post.title}
                  </h3>
                  <p className="text-text-body text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <Link href={`/blog/${post.slug}`} className="text-brand-dark font-semibold text-[16px] hover:text-brand-main w-fit flex items-center gap-2 group/link border-b border-transparent hover:border-brand-main pb-1 transition-all">
                      Learn More 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
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
                </div>
              </div>
            );})}
          </div>
          
          <div className="w-full flex justify-center mt-16">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                href={buildPageHref(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
                className={`h-10 min-w-10 rounded-full flex items-center justify-center px-3 text-sm font-semibold transition-colors ${
                  currentPage === 1
                    ? "pointer-events-none bg-zinc-100 text-zinc-400"
                    : "hover:bg-zinc-100 text-text-body"
                }`}
              >
                Prev
              </Link>

              {pageNumbers.map((pageNumber) => (
                <Link
                  key={pageNumber}
                  href={buildPageHref(pageNumber)}
                  aria-label={`Page ${pageNumber}`}
                  title={`Page ${pageNumber}`}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    pageNumber === currentPage
                      ? "bg-brand-main text-white"
                      : "hover:bg-zinc-100 text-text-body"
                  }`}
                >
                  {pageNumber}
                </Link>
              ))}

              <Link
                href={buildPageHref(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage === totalPages}
                className={`h-10 min-w-10 rounded-full flex items-center justify-center px-3 text-sm font-semibold transition-colors ${
                  currentPage === totalPages
                    ? "pointer-events-none bg-zinc-100 text-zinc-400"
                    : "hover:bg-zinc-100 text-text-body"
                }`}
              >
                Next
              </Link>
            </div>
          </div>

          <aside className="mt-10 rounded-[16px] border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-[24px] font-bold font-plus-jakarta text-foreground mb-3">Related Career Paths</h2>
            <p className="text-text-body mb-5">
              Move from reading to action with services, resources, and premium ebooks.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/services" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Explore Services
              </Link>
              <Link href="/resources" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                View Resources
              </Link>
              <Link href="/ebooks" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Read Ebooks
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}