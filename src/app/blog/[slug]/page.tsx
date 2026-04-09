import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogCommentForm from "@/components/BlogCommentForm";
import { getPostBySlug } from "@/content/blog-posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post: { title: string; excerpt: string } | null = null;
  if (process.env.DATABASE_URL) {
    try {
      post = await prisma.post.findUnique({
        where: { slug },
        select: { title: true, excerpt: true },
      });
    } catch {
      post = null;
    }
  }

  if (!post) {
    const fallback = getPostBySlug(slug);
    post = fallback
      ? {
          title: fallback.title,
          excerpt: fallback.excerpt,
        }
      : null;
  }

  return {
    title: post ? `${post.title} | Chanuka Jeewantha Blog` : "Post Not Found | Chanuka Jeewantha Blog",
    description: post?.excerpt ?? "Read Chanuka Jeewantha's latest career insights.",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  let post:
    | {
        id: string;
        slug: string;
        title: string;
        excerpt: string;
        content: string;
        category: string;
        publishedAt: Date | null;
      }
    | null = null;

  if (process.env.DATABASE_URL) {
    try {
      post = await prisma.post.findUnique({
        where: { slug: resolvedParams.slug },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          content: true,
          category: true,
          publishedAt: true,
        },
      });
    } catch {
      post = null;
    }
  }

  if (!post) {
    const fallback = getPostBySlug(resolvedParams.slug);
    if (fallback) {
      post = {
        id: fallback.slug,
        slug: fallback.slug,
        title: fallback.title,
        excerpt: fallback.excerpt,
        content: fallback.content,
        category: fallback.category,
        publishedAt: fallback.publishedAt ? new Date(fallback.publishedAt) : null,
      };
    }
  }

  if (!post) {
    notFound();
  }

  let commentCount = 0;
  if (process.env.DATABASE_URL) {
    try {
      commentCount = await prisma.comment.count({
        where: { postId: post.id, isApproved: true },
      });
    } catch {
      commentCount = 0;
    }
  }

  const title = post.title;

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: post.publishedAt ? post.publishedAt.toISOString().slice(0, 10) : "2025-10-24",
    author: {
      "@type": "Person",
      name: "Chanuka Jeewantha",
    },
    description: post.excerpt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />

      {/* 1. Hero Section */}
      <section className="w-full bg-foreground text-white pt-[200px] pb-[96px] relative overflow-hidden">
        {/* Background Marquee Text */}
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite_reverse] flex gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} className="text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                SINGLE POST
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/blog" className="hover:text-brand-main transition-colors">Blog</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main line-clamp-1 max-w-[200px] sm:max-w-none">{title}</span>
          </div>
          <h1 className="font-plus-jakarta text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] max-w-4xl mb-8 !text-white">
            {title || "Career profile strategy that improves interview chances"}
          </h1>

          {/* Post Metadata */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-text-light/80 font-medium text-sm md:text-base">
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-main"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {post.publishedAt ? post.publishedAt.toISOString().slice(0, 10) : "2025-10-24"}
            </span>
            <span className="hidden sm:block text-brand-main/50">-</span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-main"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              {post.category}
            </span>
            <span className="hidden sm:block text-brand-main/50">-</span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-main"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              {commentCount} Comments
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="w-full py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-[48px] justify-between">
            
            {/* Left Column: Article Body */}
            <article className="w-full lg:w-[65%] flex flex-col gap-8">
              {/* Featured Image */}
              <div className="w-full h-[400px] md:h-[500px] bg-zinc-200 rounded-[20px] overflow-hidden flex items-center justify-center mb-4">
                <span className="font-mono text-zinc-500">Featured Image Placeholder</span>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none text-text-body font-poppins">
                <p className="leading-relaxed mb-6">
                  {post.content}
                </p>
                <h3 className="text-[28px] font-bold font-plus-jakarta text-foreground mt-10 mb-4">The core principles of career positioning</h3>
                <p className="leading-relaxed mb-6">
                  Career materials must match real hiring behavior. Recruiters scan quickly, ATS systems filter based on structure and keywords, and employers prioritize clear results over generic responsibilities.
                </p>
                
                {/* Blockquote styling from template */}
                <blockquote className="border-l-4 border-brand-main bg-zinc-50 p-6 md:p-8 rounded-r-[20px] my-8 italic text-xl text-foreground font-medium">
                  "A strong career is not built by guesswork. It is built by clarity, positioning, and proof."
                </blockquote>
                
                <p className="leading-relaxed mb-6">
                  When your CV, cover letter, and LinkedIn profile communicate measurable value, your interview conversion improves and your professional confidence grows.
                </p>

                {/* Inner Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                   <div className="h-[300px] bg-zinc-200 rounded-[20px] flex items-center justify-center">
                     <span className="font-mono text-zinc-500 text-sm">Content Image 1</span>
                   </div>
                   <div className="h-[300px] bg-zinc-200 rounded-[20px] flex items-center justify-center">
                     <span className="font-mono text-zinc-500 text-sm">Content Image 2</span>
                   </div>
                </div>

                <p className="leading-relaxed mb-6">
                  Ultimately, successful job search outcomes come from clear professional communication. When your profile is aligned, specific, and evidence-driven, decision-makers trust you faster.
                </p>
              </div>

              {/* Tags & Share */}
              <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-t border-b border-zinc-200 mt-8 gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-foreground">Tags:</span>
                  <Link href="#" className="px-4 py-1.5 bg-zinc-100 hover:bg-brand-main hover:text-white rounded-full text-sm font-medium transition-colors">ATS CV</Link>
                  <Link href="#" className="px-4 py-1.5 bg-zinc-100 hover:bg-brand-main hover:text-white rounded-full text-sm font-medium transition-colors">LinkedIn</Link>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-foreground">Share:</span>
                  <div className="flex gap-2">
                    <button aria-label="Share on Facebook" title="Share on Facebook" className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-brand-main hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></button>
                    <button aria-label="Share on X" title="Share on X" className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-brand-main hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></button>
                  </div>
                </div>
              </div>

              {/* Author Box */}
              <div className="bg-zinc-50 rounded-[20px] p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-4">
                <div className="w-[100px] h-[100px] rounded-full bg-zinc-300 flex-shrink-0 border-4 border-white shadow-sm flex items-center justify-center overflow-hidden">
                  <span className="font-mono text-zinc-500 text-xs">Photo</span>
                </div>
                <div className="flex flex-col text-center sm:text-left">
                  <h4 className="text-[24px] font-bold font-plus-jakarta text-foreground mb-2">Chanuka Jeewantha</h4>
                  <p className="text-text-body mb-4">Professional CV Writer and Career Development Specialist with 8+ years of experience in ATS-friendly positioning and career strategy.</p>
                  <Link href="/about" className="text-brand-main font-semibold hover:text-brand-dark transition-colors">View all posts →</Link>
                </div>
              </div>

              {/* Comments Form */}
              <div className="mt-12">
                <h3 className="text-[32px] font-bold font-plus-jakarta text-foreground mb-8">Leave a Reply</h3>
                <p className="text-text-body mb-8">Your email address will not be published. Required fields are marked *</p>
                <BlogCommentForm postSlug={resolvedParams.slug} />
              </div>

            </article>

            {/* Right Column: Sidebar (Optional/Placeholder) */}
            <aside className="w-full lg:w-[30%] flex flex-col gap-10">
              
              {/* Search Widget */}
              <div className="bg-zinc-50 rounded-[20px] p-8">
                <h4 className="text-[20px] font-bold font-plus-jakarta text-foreground mb-4">Search</h4>
                <div className="relative">
                  <input type="text" placeholder="Search..." className="w-full px-4 py-3 rounded-[10px] bg-white border border-zinc-200 pr-12 focus:outline-none focus:border-brand-main transition-colors" />
                  <button aria-label="Search posts" title="Search posts" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-main">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </button>
                </div>
              </div>

              {/* Recent Posts Widget */}
              <div className="bg-zinc-50 rounded-[20px] p-8">
                <h4 className="text-[20px] font-bold font-plus-jakarta text-foreground mb-6">Recent Posts</h4>
                <div className="flex flex-col gap-6">
                  {[1, 2, 3].map((post) => (
                    <Link href={`/blog/post-${post}`} key={post} className="flex gap-4 group">
                      <div className="w-[80px] h-[80px] bg-zinc-200 rounded-[10px] flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <span className="font-mono text-zinc-500 text-[10px]">Img</span>
                      </div>
                      <div className="flex flex-col">
                        <h5 className="font-bold text-foreground text-sm group-hover:text-brand-main transition-colors line-clamp-2 mb-2">How to build a CV that recruiters read in seconds</h5>
                        <span className="text-xs text-text-light">Oct 20, 2025</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-zinc-50 rounded-[20px] p-8">
                <h4 className="text-[20px] font-bold font-plus-jakarta text-foreground mb-6">Categories</h4>
                <ul className="flex flex-col gap-3">
                  <li><Link href="#" className="flex justify-between items-center text-text-body hover:text-brand-main transition-colors"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-main"></div>ATS CV Writing</span> <span>(5)</span></Link></li>
                  <li><Link href="#" className="flex justify-between items-center text-text-body hover:text-brand-main transition-colors"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-main"></div>LinkedIn Optimization</span> <span>(3)</span></Link></li>
                  <li><Link href="#" className="flex justify-between items-center text-text-body hover:text-brand-main transition-colors"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-main"></div>Career Coaching</span> <span>(8)</span></Link></li>
                  <li><Link href="#" className="flex justify-between items-center text-text-body hover:text-brand-main transition-colors"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-main"></div>Career Roadmaps</span> <span>(2)</span></Link></li>
                </ul>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </>
  );
}