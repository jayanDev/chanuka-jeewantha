import Link from "next/link";
import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = buildPageMetadata({
  title: "Portfolio | Career Branding Work",
  description:
    "Browse Chanuka Jeewantha's portfolio examples focused on career branding, profile positioning, and interview readiness outcomes.",
  path: "/portfolio",
  keywords: ["career portfolio", "career branding work", "CV and LinkedIn portfolio"],
});

export default function PortfolioPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* 1. Hero Section */}
      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        {/* Background Marquee Text */}
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                PORTFOLIO
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Portfolio</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Turning your career claims into <span className="text-brand-main">visible proof</span>
          </h1>
        </div>
      </section>

      {/* 2. Portfolio Grid Section */}
 <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-zinc-50">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">Works</span>
              <h2 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-plus-jakarta text-foreground leading-[1.1]">
                Career Proof <span className="text-brand-light pl-2">Portfolio.</span>
              </h2>
            </div>
            <Link href="/contact" className="px-[25px] py-[15px] border border-foreground hover:bg-foreground hover:text-background rounded-[10px] text-foreground font-medium transition-colors">
              Let's Talk
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {caseStudies.map((study) => (
 <article key={study.slug} className="group overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.1)]">
                <div className="relative h-[320px] overflow-hidden">
 <div className="absolute top-6 left-6 z-10 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm">
                    {study.category}
                  </div>
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">{study.year}</p>
                  <h3 className="mb-3 text-[28px] font-bold font-plus-jakarta text-foreground transition-colors group-hover:text-brand-main">
                    {study.title}
                  </h3>
                  <p className="mb-5 text-base leading-relaxed text-text-body">{study.summary}</p>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main"
                  >
                    Open Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

 <aside className="mt-10 rounded-[16px] border border-zinc-200 bg-white p-6">
            <h2 className="text-[24px] font-bold font-plus-jakarta text-foreground mb-3">Build From Examples to Execution</h2>
            <p className="text-text-body mb-5">
              Use these samples as inspiration, then move to practical packages and direct support.
            </p>
            <div className="flex flex-wrap gap-3">
 <Link href="/case-studies" className="rounded-[10px] border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Read Case Studies
              </Link>
 <Link href="/services" className="rounded-[10px] border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Explore Services
              </Link>
 <Link href="/services/personal-website" className="rounded-[10px] border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Personal Website Service
              </Link>
 <Link href="/contact" className="rounded-[10px] border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Contact Now
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
