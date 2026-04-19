import Link from "next/link";
import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "About Chanuka Jeewantha | Professional CV Writer & Linkedin Optimization Expert",
  description:
    "Chanuka Jeewantha is a Career Specialist providing CV Writing Services, Professional CV making, and ATS Friendly CV optimization in Sri Lanka.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

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
                ABOUT US
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">About</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Career growth is not guesswork, it is <span className="text-brand-main">strategy and proof</span>
          </h1>
        </div>
      </section>

      {/* 2. My Mission / Story Section */}
      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Left Column (Sticky/Small) */}
            <div className="w-full lg:w-1/4 flex-shrink-0">
              <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">My Story</span>
              <h2 className="text-[32px] md:text-[40px] font-bold font-plus-jakarta text-foreground leading-[1.2] lg:sticky lg:top-32">
                About Chanuka Jeewantha
              </h2>
            </div>
            
            {/* Right Column (Content) */}
            <div className="w-full lg:w-3/4 flex flex-col gap-8">
              <div className="relative w-full h-[400px] rounded-[20px] mb-4 overflow-hidden border border-zinc-200">
                <Image
                  src="/images/about-page-chanuka.jpg"
                  alt="Chanuka Jeewantha profile"
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover"
                />
              </div>
              <p className="text-[20px] md:text-[24px] text-foreground font-medium leading-relaxed">
                I am Chanuka Jeewantha, a Professional CV Writer and Career Development Specialist helping people present themselves clearly, confidently, and competitively.
              </p>
              <p className="text-text-body text-[16px] md:text-[18px] leading-relaxed">
                With 8+ years of experience, I help candidates align their CV, LinkedIn, portfolio, and personal brand to real hiring behavior. My approach is practical and results-focused, built around ATS performance, recruiter readability, and achievement-based positioning.
              </p>
              <p className="text-text-body text-[16px] md:text-[18px] leading-relaxed">
                I support fresh graduates, mid-level professionals, career switchers, and international applicants through role-specific strategy, clear communication, and proof-driven career storytelling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-[40px] sm:py-[56px] bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <h2 className="text-[24px] md:text-[30px] font-bold font-plus-jakarta text-foreground mb-3">
            Explore More Career Support
          </h2>
          <p className="text-text-body mb-5">
            Continue with service details, free tools, workshop options, or practical career insights.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/services" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
              Explore Services
            </Link>
            <Link href="/tools" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
              Use Free Tools
            </Link>
            <Link href="/workshops" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
              View Workshops
            </Link>
            <Link href="/blog" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
              Read Career Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
