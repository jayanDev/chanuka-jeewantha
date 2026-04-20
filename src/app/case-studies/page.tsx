import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies | Career Profile Transformations",
  description:
    "Review practical case studies showing CV, LinkedIn, and coaching outcomes from Chanuka Jeewantha's career services.",
  path: "/case-studies",
  keywords: ["career case studies", "CV transformation", "LinkedIn case study"],
});

export default function CaseStudiesPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/case-studies" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                CASE STUDIES
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Case Studies</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Success stories & <span className="text-brand-main">Impact.</span>
          </h1>
        </div>
      </section>

 <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-zinc-50">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-16">
            {caseStudies.map((study, index) => (
              <div 
                key={study.slug} 
                className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2 aspect-[4/3] bg-zinc-200 rounded-[24px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand-main/20 group-hover:bg-transparent transition-colors z-10" />
 <div className="absolute top-4 left-4 z-20 bg-white backdrop-blur text-foreground px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                    {study.category}
                  </div>
                  <Image
                    fill
                    src={study.image}
                    alt={study.title}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="w-full md:w-1/2 flex flex-col">
                  <span className="text-brand-main font-bold mb-4">{study.year}</span>
                  <h2 className="text-[32px] md:text-[40px] font-bold font-plus-jakarta text-foreground leading-[1.2] mb-6">
                    {study.title}
                  </h2>
                  <p className="text-text-body text-lg leading-relaxed mb-8">
                    {study.summary}
                  </p>
                  
                  <Link href={`/case-studies/${study.slug}`} className="group flex items-center gap-4 text-foreground font-bold hover:text-brand-main transition-colors w-max">
                    <span className="border-b-2 border-foreground group-hover:border-brand-main pb-1 transition-colors">Read Case Study</span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

 <aside className="mt-10 rounded-[16px] border border-zinc-200 bg-white p-6">
            <h2 className="text-[24px] font-bold font-plus-jakarta text-foreground mb-3">Keep Exploring Results</h2>
            <p className="text-text-body mb-5">
              Compare service scope, portfolio samples, and implementation packages.
            </p>
            <div className="flex flex-wrap gap-3">
 <Link href="/portfolio" className="rounded-[10px] border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                View Portfolio
              </Link>
 <Link href="/services" className="rounded-[10px] border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Explore Services
              </Link>
 <Link href="/services/personal-website" className="rounded-[10px] border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Personal Website Service
              </Link>
 <Link href="/pricing" className="rounded-[10px] border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Compare Pricing
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
