import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import SubscribeForm from "@/components/SubscribeForm";
import { packageProducts } from "@/lib/packages-catalog";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";

const serviceMetadataMap: Record<string, { title: string; description: string }> = {
  "cv-writing": {
    title: "CV Writing Service | ATS-Friendly CV Strategy",
    description:
      "Get ATS-friendly CV writing support with role-aligned positioning, measurable achievement language, and recruiter-ready structure.",
  },
  "cover-letter-writing": {
    title: "Cover Letter Writing Service",
    description:
      "Professional cover letter writing tailored to your target role, highlighting your value with concise and persuasive messaging.",
  },
  "linkedin-optimization": {
    title: "LinkedIn Optimization Service",
    description:
      "Improve your LinkedIn visibility with optimized headline, about section, keyword strategy, and profile positioning.",
  },
  "cv-review": {
    title: "CV Review Service",
    description:
      "Get expert feedback on your current CV with practical recommendations for ATS compatibility and stronger interview conversion.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = serviceMetadataMap[slug];

  if (!entry) {
    return buildNoIndexMetadata({
      title: "Service Not Found",
      description: "The requested service page is unavailable.",
      path: `/services/${slug}`,
    });
  }

  return buildPageMetadata({
    title: entry.title,
    description: entry.description,
    path: `/services/${slug}`,
    keywords: ["career services", slug.replaceAll("-", " "), "Chanuka Jeewantha"],
  });
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const serviceName = slug.replace(/-/g, " ").toUpperCase();
  const serviceCategoryMap: Record<string, string[]> = {
    "cv-writing": ["CV Writing"],
    "cover-letter-writing": ["Cover Letter Writing"],
    "linkedin-optimization": ["LinkedIn Optimization"],
    "cv-review": ["CV Review"],
  };

  const categoryMatch = serviceCategoryMap[slug] ?? [];
  const relatedPackages = packageProducts.filter((pkg) => categoryMatch.includes(pkg.category));

  return (
    <>
      <section className="w-full bg-foreground text-white pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/services" className="hover:text-brand-main transition-colors">Services</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{serviceName}</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl capitalize !text-white">
            {serviceName} <span className="text-brand-main">Service.</span>
          </h1>
        </div>
      </section>

      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          {/* Feature Image */}
          <div className="mx-auto max-w-4xl relative w-full aspect-[21/9] bg-zinc-200 rounded-[24px] mb-12 overflow-hidden">
            <Image
              src="/images/about-page-chanuka.jpg"
              alt={`${serviceName} service overview`}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <article className="prose prose-lg mx-auto max-w-4xl prose-headings:font-plus-jakarta prose-headings:text-foreground prose-p:text-text-body prose-a:text-brand-main">
            <h2>Overview</h2>
            <p>
              In today&#39;s hiring environment, your professional profile must be clear, role-aligned, and results-focused. This {serviceName.toLowerCase()} service is designed to improve how recruiters and hiring managers understand your value.
            </p>
            
            <h3>My Approach</h3>
            <p>
              My method is practical and strategy-driven. I combine role targeting, achievement-focused storytelling, and hiring-market expectations so your profile performs in real selection processes.
            </p>

            <ul>
              <li><strong>Role Clarity:</strong> Define target roles and realistic positioning.</li>
              <li><strong>Content Strategy:</strong> Prioritize proof, metrics, and relevant keywords.</li>
              <li><strong>Execution:</strong> Build recruiter-friendly and ATS-compatible outputs.</li>
              <li><strong>Refinement:</strong> Improve messaging based on market response.</li>
            </ul>

            <h3>The Outcome</h3>
            <p>
              The outcome is a stronger professional identity that improves shortlisting potential, interview conversion, and career direction confidence.
            </p>

            {relatedPackages.length > 0 && (
              <>
                <h3>Explore Related Packages</h3>
                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {relatedPackages.map((pkg) => (
                    <div key={pkg.slug} className="rounded-[14px] border border-zinc-200 p-4 bg-zinc-50">
                      <p className="font-semibold text-foreground mb-2">{pkg.name}</p>
                      <p className="text-sm text-text-body mb-3">{pkg.audience}</p>
                      <Link
                        href={`/packages/${pkg.slug}`}
                        className="inline-flex items-center gap-2 rounded-[10px] bg-brand-main px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-dark"
                      >
                        See More
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </article>
        </div>
      </section>

      <SubscribeForm />
    </>
  );
}