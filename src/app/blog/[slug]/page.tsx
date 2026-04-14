import Link from "next/link";
import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogCommentForm from "@/components/BlogCommentForm";
import ServiceSidebarAds from "@/components/ServiceSidebarAds";
import { blogPosts, getPostBySlug } from "@/content/blog-posts";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { getBaseUrl } from "@/lib/site-url";
import { packageProducts } from "@/lib/packages-catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = getBaseUrl();
  let post: {
    title: string;
    excerpt: string;
    publishedAt?: string | Date | null;
    updatedAt?: string | Date | null;
    category?: string | null;
    keywords?: string[];
  } | null = null;
  if (process.env.DATABASE_URL) {
    try {
      post = await prisma.post.findUnique({
        where: { slug },
        select: { title: true, excerpt: true, publishedAt: true, updatedAt: true, category: true },
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
          publishedAt: fallback.publishedAt ?? null,
          updatedAt: fallback.publishedAt ?? null,
          category: fallback.category,
          keywords: fallback.keywords,
        }
      : null;
  }

  if (!post) {
    return buildNoIndexMetadata({
      title: "Post Not Found | Chanuka Jeewantha Blog",
      description: "This blog post is not available.",
      path: `/blog/${slug}`,
    });
  }

  const base = buildPageMetadata({
    title: `${post.title} | Chanuka Jeewantha Blog`,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    keywords: post.keywords,
  });

  const ogImagePath = `/blog/${slug}/opengraph-image`;

  return {
    ...base,
    openGraph: {
      ...(base.openGraph ?? {}),
      type: "article",
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
      authors: [`${baseUrl}/about`],
      section: typeof post.category === "string" ? post.category : undefined,
      tags: typeof post.category === "string" ? [post.category] : undefined,
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      ...(base.twitter ?? {}),
      images: [ogImagePath],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const fallbackPost = getPostBySlug(resolvedParams.slug);
  let post:
    | {
        id: string;
        slug: string;
        title: string;
        excerpt: string;
        content: string;
        category: string;
        publishedAt: Date | null;
        updatedAt: Date | null;
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
          updatedAt: true,
        },
      });
    } catch {
      post = null;
    }
  }

  if (!post) {
    if (fallbackPost) {
      post = {
        id: fallbackPost.slug,
        slug: fallbackPost.slug,
        title: fallbackPost.title,
        excerpt: fallbackPost.excerpt,
        content: fallbackPost.content,
        category: fallbackPost.category,
        publishedAt: fallbackPost.publishedAt ? new Date(fallbackPost.publishedAt) : null,
        updatedAt: fallbackPost.publishedAt ? new Date(fallbackPost.publishedAt) : null,
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
  const contentPost = getPostBySlug(post.slug) ?? fallbackPost;
  const isAboutChanukaArticle = post.slug === "about-chanuka-jeewantha";
  const recentPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const baseUrl = getBaseUrl();
  const articleUrl = `${baseUrl}/blog/${post.slug}`;
  const articleImageUrl = `${baseUrl}/blog/${post.slug}/opengraph-image`;
  const publishedIso = post.publishedAt ? post.publishedAt.toISOString() : new Date().toISOString();
  const modifiedIso = post.updatedAt ? post.updatedAt.toISOString() : publishedIso;
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;
  const packageInfo = contentPost?.packageSlug
    ? packageProducts.find((item) => item.slug === contentPost.packageSlug)
    : null;
  const tagKeywords =
    contentPost?.keywords && contentPost.keywords.length > 0
      ? contentPost.keywords.slice(0, 5)
      : [post.category, "career development", "ATS CV", "LinkedIn optimization"];
  const ctaButtons =
    contentPost?.ctaButtons && contentPost.ctaButtons.length > 0
      ? contentPost.ctaButtons
      : [
          { label: "Compare Packages", href: "/pricing" },
          { label: "View Services", href: "/services" },
          { label: "Contact Chanuka", href: "/contact" },
        ];

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: title,
    datePublished: publishedIso,
    dateModified: modifiedIso,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    image: [articleImageUrl],
    inLanguage: "en-LK",
    articleSection: post.category,
    wordCount,
    keywords: tagKeywords,
    author: {
      "@type": "Person",
      name: "Chanuka Jeewantha",
      url: `${baseUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      name: "Chanuka Jeewantha",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/hero-chanuka.jpg`,
      },
    },
    isAccessibleForFree: true,
    description: post.excerpt,
  };

  const faqLd =
    contentPost?.faqs && contentPost.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: contentPost.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const packageLd = packageInfo
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: packageInfo.name,
        category: packageInfo.category,
        description: `${packageInfo.name} for ${packageInfo.audience}. Delivery: ${packageInfo.delivery}.`,
        url: `${baseUrl}/packages/${packageInfo.slug}`,
        brand: {
          "@type": "Brand",
          name: "Chanuka Jeewantha",
        },
        offers: {
          "@type": "Offer",
          url: `${baseUrl}/packages/${packageInfo.slug}`,
          priceCurrency: "LKR",
          price: packageInfo.priceLkr,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
      }
    : null;

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      {packageLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(packageLd) }}
        />
      )}

      {/* 1. Hero Section */}
      <section className="w-full bg-foreground text-white pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        {/* Background Marquee Text */}
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite_reverse] flex gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                SINGLE POST
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/blog" className="hover:text-brand-main transition-colors">Blog</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main line-clamp-1 max-w-[200px] sm:max-w-none">{title}</span>
          </div>
          <h1 className="font-plus-jakarta text-[30px] sm:text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] max-w-4xl mb-8 !text-white">
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
      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-[48px] justify-between">

            {/* Left Column: Article Body */}
            <article className="w-full lg:w-[65%] flex flex-col gap-8 max-w-[760px]">
              {/* Featured Image */}
              <div className="relative w-full h-[420px] md:h-[520px] rounded-[20px] overflow-hidden mb-4 border border-zinc-200">
                <Image
                  src="/images/about-page-chanuka.jpg"
                  alt="About Chanuka Jeewantha"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg prose-zinc max-w-none text-zinc-700 font-poppins leading-loose prose-a:text-brand-main prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-headings:font-plus-jakarta prose-headings:text-foreground prose-headings:font-bold prose-blockquote:border-l-4 prose-blockquote:border-brand-main prose-blockquote:bg-zinc-50 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:font-medium prose-blockquote:text-foreground prose-blockquote:rounded-r-[20px] prose-li:marker:text-brand-main prose-li:leading-relaxed">
                {isAboutChanukaArticle ? (
                  <>
                    <p className="leading-relaxed mb-6">
                      If you have ever wondered why your job applications get no response, no calls, and no interviews, the reason is often not your potential. It is positioning. Today, career documents are filtered by ATS systems, scanned quickly by recruiters, and compared against hundreds of candidates with similar backgrounds.
                    </p>
                    <p className="leading-relaxed mb-6">
                      My name is <strong>Chanuka Jeewantha</strong>. I am a <strong>Career Development Specialist</strong> helping people build a modern career brand through ATS-friendly CV writing, high-impact cover letters, LinkedIn account optimization, portfolio and personal website positioning, coaching, and career roadmap strategy.
                    </p>

                    <blockquote className="border-l-4 border-brand-main bg-zinc-50 p-6 md:p-8 rounded-r-[20px] my-8 italic text-xl text-foreground font-medium">
                      "A strong career is not built by guesswork. It is built by clarity, positioning, and proof."
                    </blockquote>

                    <h3 className="text-[28px] font-bold font-plus-jakarta text-foreground mt-10 mb-4">Why career development changed</h3>
                    <ul>
                      <li>Most companies use ATS systems for early shortlisting.</li>
                      <li>Recruiters often scan CVs in 6-10 seconds on first review.</li>
                      <li>Hiring teams prioritize measurable outcomes and evidence.</li>
                      <li>LinkedIn acts like a search engine for talent discovery.</li>
                    </ul>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                      <div className="relative h-[320px] rounded-[20px] overflow-hidden border border-zinc-200">
                        <Image src="/images/about-chanuka.jpg" alt="Chanuka Jeewantha career consultation" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                      <div className="relative h-[320px] rounded-[20px] overflow-hidden border border-zinc-200">
                        <Image src="/images/chanuka-jeewantha-career-development-specialist.jpg" alt="Chanuka Jeewantha career development specialist" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                    </div>

                    <h3 className="text-[28px] font-bold font-plus-jakarta text-foreground mt-10 mb-4">Core services Chanuka provides</h3>
                    <ul>
                      <li><strong>Professional CV Writing:</strong> 100% ATS-friendly structure, keyword alignment, and achievement-focused storytelling.</li>
                      <li><strong>Cover Letter Writing:</strong> role-specific letters that communicate relevance, confidence, and value.</li>
                      <li><strong>LinkedIn Optimization:</strong> profile SEO with headline, about, and experience strategy, backed by 30K+ follower growth proof.</li>
                      <li><strong>Personal Website & Portfolio Support:</strong> digital presence that turns claims into visible proof.</li>
                      <li><strong>Career Coaching & Roadmaps:</strong> practical direction for role targeting, transitions, and long-term growth.</li>
                    </ul>

                    <div className="relative w-full h-[360px] rounded-[20px] overflow-hidden border border-zinc-200 my-10">
                      <Image src="/images/linkedin-optimization-30k-followers-proof.jpg" alt="LinkedIn optimization and follower growth proof" fill className="object-cover" sizes="100vw" />
                    </div>

                    <h3 className="text-[28px] font-bold font-plus-jakarta text-foreground mt-10 mb-4">Who this is ideal for</h3>
                    <ul>
                      <li>Graduates building their first professional profile.</li>
                      <li>Mid-level professionals targeting better-paying opportunities.</li>
                      <li>Candidates switching industries and needing better positioning.</li>
                      <li>Professionals applying for international roles.</li>
                      <li>Individuals who need clarity, confidence, and strategic career direction.</li>
                    </ul>

                    <p className="leading-relaxed mb-6">
                      The goal is simple: build a profile that is easy to understand, difficult to ignore, and strategically aligned with real hiring behavior.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="leading-relaxed mb-6">{post.content}</p>
                    {contentPost?.sections && contentPost.sections.length > 0 ? (
                      contentPost.sections.map((section) => (
                        <div key={section.heading}>
                          <h3 className="text-[28px] font-bold font-plus-jakarta text-foreground mt-10 mb-4">
                            {section.heading}
                          </h3>
                          {section.paragraphs.map((paragraph, index) => (
                            <p key={`${section.heading}-${index}`} className="leading-relaxed mb-6">
                              {paragraph}
                            </p>
                          ))}
                          {section.bullets && section.bullets.length > 0 && (
                            <ul>
                              {section.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))
                    ) : (
                      <>
                        <h3 className="text-[28px] font-bold font-plus-jakarta text-foreground mt-10 mb-4">The core principles of career positioning</h3>
                        <p className="leading-relaxed mb-6">
                          Career materials must match real hiring behavior. Recruiters scan quickly, ATS systems filter based on structure and keywords, and employers prioritize clear results over generic responsibilities.
                        </p>
                        <blockquote className="border-l-4 border-brand-main bg-zinc-50 p-6 md:p-8 rounded-r-[20px] my-8 italic text-xl text-foreground font-medium">
                          "A strong career is not built by guesswork. It is built by clarity, positioning, and proof."
                        </blockquote>
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6 md:p-8">
                <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground mb-3">Take Action</h3>
                <p className="text-text-body mb-5">
                  Move from reading to results with a clear next step.
                </p>
                <div className="flex flex-wrap gap-3">
                  {ctaButtons.map((button) => (
                    <Link
                      key={`${button.href}-${button.label}`}
                      href={button.href}
                      className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
                    >
                      {button.label}
                    </Link>
                  ))}
                </div>
              </div>

              {contentPost?.internalLinks && contentPost.internalLinks.length > 0 && (
                <div className="rounded-[20px] border border-zinc-200 bg-white p-6 md:p-8">
                  <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground mb-4">Related Backlinks</h3>
                  <ul className="space-y-2">
                    {contentPost.internalLinks.map((linkItem) => (
                      <li key={`${linkItem.href}-${linkItem.label}`}>
                        <Link href={linkItem.href} className="text-brand-main hover:text-brand-dark font-medium">
                          {linkItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags & Share */}
              <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-t border-b border-zinc-200 mt-8 gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-foreground">Tags:</span>
                  {tagKeywords.slice(0, 4).map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/search?q=${encodeURIComponent(tag)}`}
                      className="px-4 py-1.5 bg-zinc-100 hover:bg-brand-main hover:text-white rounded-full text-sm font-medium transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
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
                <div className="relative w-[100px] h-[100px] rounded-full flex-shrink-0 border-4 border-white shadow-sm overflow-hidden">
                  <Image src="/images/hero-chanuka.jpg" alt="Chanuka Jeewantha" fill className="object-cover" sizes="100px" />
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

            {/* Right Column: Sidebar */}
            <aside className="w-full lg:w-[30%] flex flex-col gap-10 sticky top-[120px] h-fit">
              <ServiceSidebarAds title="Career Services" />

              {/* Recent Posts Widget */}
              <div className="bg-zinc-50 rounded-[20px] p-8">
                <h4 className="text-[20px] font-bold font-plus-jakarta text-foreground mb-6">Recent Posts</h4>
                <div className="flex flex-col gap-6">
                  {recentPosts.map((recentPost, index) => (
                    <Link href={`/blog/${recentPost.slug}`} key={recentPost.slug} className="flex gap-4 group">
                      <div className="relative w-[80px] h-[80px] rounded-[10px] flex-shrink-0 overflow-hidden border border-zinc-200">
                        <Image
                          src={index % 2 === 0 ? "/images/about-chanuka.jpg" : "/images/testimonial-chanuka.jpg"}
                          alt={recentPost.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h5 className="font-bold text-foreground text-sm group-hover:text-brand-main transition-colors line-clamp-2 mb-2">{recentPost.title}</h5>
                        <span className="text-xs text-text-light">{recentPost.publishedAt}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </>
  );
}