import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "CV Writing Services & Linkedin Optimization Sri Lanka | Services",
  description:
    "Expert CV writing services. Get an ATS Friendly CV, Cover Letter Writing, and Linkedin Optimization by Chanuka Jeewantha.",
  path: "/services",
});

export default function ServicesPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  const services = [
    {
      title: "Professional CV Writing (100% ATS-Friendly)",
      desc: "Role-targeted CVs with clean structure, proper keywords, and achievement-based writing to pass ATS and impress recruiters.",
      isMostPopular: true,
      href: "/services/packages/cv-writing",
    },
    {
      title: "Cover Letter Writing",
      desc: "Cover letters that communicate relevance, confidence, and proof-based value for competitive and international applications.",
      href: "/services/packages/cover-letter-writing",
    },
    {
      title: "LinkedIn Account Optimization",
      desc: "Headline, About, and experience positioning for stronger recruiter discovery and profile conversion.",
      href: "/services/packages/linkedin-optimization",
    },
    {
      title: "CV Review Service",
      desc: "Detailed expert feedback on your existing CV with ATS recommendations, stronger content direction, and clear structure fixes.",
      href: "/services/packages/cv-review",
    },
  ];

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
                SERVICES
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Services</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Career Development Services Built for <span className="text-brand-main">Modern Hiring Systems</span>
          </h1>
        </div>
      </section>

      {/* 2. Services Grid Section */}
      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">Our Service</span>
              <h2 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-plus-jakarta text-foreground leading-[1.1]">
                What I Help You <span className="text-brand-light pl-2">Achieve.</span>
              </h2>
              <span className="mt-3 inline-block rounded-full bg-brand-main/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-dark">
                Priority Service: CV Writing
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`bg-[#f0f9ff]/40 rounded-[20px] p-8 md:p-12 hover:shadow-xl transition-shadow flex flex-col group border ${
                  service.isMostPopular ? "border-brand-main" : "border-[#e1f5fe]"
                }`}
              >
                {service.isMostPopular && (
                  <div className="mb-5 inline-flex items-center gap-2 rounded-[10px] border border-brand-main/40 bg-white px-3 py-1.5 shadow-sm">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-main text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">Client Favorite</span>
                  </div>
                )}
                <div className="w-full h-[250px] bg-zinc-200 rounded-[15px] mb-8 flex items-center justify-center overflow-hidden relative">
                  <div className="text-zinc-500 font-mono text-sm text-center group-hover:scale-105 transition-transform duration-500">
                    <p className="font-semibold tracking-wide">Service Image {index + 1}</p>
                    <p className="mt-1 text-xs">100% x 250px</p>
                  </div>
                </div>
                <h3 className="text-[28px] font-bold font-plus-jakarta mb-4 text-foreground">{service.title}</h3>
                <p className="text-text-body mb-8 flex-grow text-lg leading-relaxed">
                  {service.desc}
                </p>
                <Link href={service.href} className="text-brand-dark hover:text-brand-main font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform text-lg">
                  See More
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[16px] border border-[#e1f5fe] bg-[#f0f9ff]/60 p-6 text-center">
            <p className="text-text-body text-lg">
              Additional services will be added soon. Current priority packages are CV Writing, Cover Letter Writing, LinkedIn Optimization, and CV Review.
            </p>
          </div>

          <aside className="mt-8 rounded-[16px] border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-[24px] font-bold font-plus-jakarta text-foreground mb-3">Plan Your Next Step</h2>
            <p className="text-text-body mb-5">
              Compare packages, check free and paid resources, or contact me for custom guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/pricing" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Compare Pricing
              </Link>
              <Link href="/resources" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Browse Resources
              </Link>
              <Link href="/contact" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Contact for Advice
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}