import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { blogPosts } from "@/content/blog-posts";

export const metadata: Metadata = {
  title: "Career Blog | Chanuka Jeewantha",
  description:
    "Career-focused articles on ATS-friendly CV writing, LinkedIn optimization, coaching, and roadmap strategy.",
};

export default async function BlogPage() {
  const fallbackPosts = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
  }));

  let posts = fallbackPosts;
  if (process.env.DATABASE_URL) {
    try {
      posts = await prisma.post.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        select: {
          slug: true,
          title: true,
          excerpt: true,
          category: true,
          publishedAt: true,
        },
        take: 50,
      });
    } catch {
      posts = fallbackPosts;
    }
  }

  return (
    <>
      {/* 1. Hero Section */}
      <section className="w-full bg-foreground text-white pt-[50px] pb-[96px] relative overflow-hidden">
        {/* Background Marquee Text */}
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} className="text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                BLOG ARTICLES
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Blog</span>
          </div>
          <h1 className="font-plus-jakarta text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Read my latest articles on <span className="text-brand-main">career strategy</span> and job search growth.
          </h1>
        </div>
      </section>

      {/* 2. Blog Grid Section */}
      <section className="w-full py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.slug} className="border border-zinc-200 rounded-[24px] p-6 hover:shadow-lg transition-shadow group flex flex-col">
                <div className="w-full h-[250px] bg-zinc-200 rounded-[20px] overflow-hidden mb-6 flex-shrink-0">
                   <div className="w-full h-full bg-zinc-300 flex items-center justify-center font-mono text-zinc-500 text-sm group-hover:scale-105 transition-transform duration-500">Image</div>
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
                  <Link href={`/blog/${post.slug}`} className="text-brand-dark font-semibold text-[16px] hover:text-brand-main mt-auto w-fit flex items-center gap-2 group/link border-b border-transparent hover:border-brand-main pb-1 transition-all">
                    Learn More 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Placeholder */}
          <div className="w-full flex justify-center mt-16">
            <div className="flex gap-2">
              <button aria-label="Page 1" title="Page 1" className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-main text-white font-semibold">1</button>
              <button aria-label="Page 2" title="Page 2" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-100 text-text-body transition-colors">2</button>
              <button aria-label="Next page" title="Next page" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-100 text-text-body transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}