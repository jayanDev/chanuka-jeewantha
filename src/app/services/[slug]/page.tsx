import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimatedServiceTextVisual from "@/components/AnimatedServiceTextVisual";
import SubscribeForm from "@/components/SubscribeForm";
import { formatLkr, packageProducts } from "@/lib/packages-catalog";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";

const serviceMetadataMap: Record<string, { label: string; title: string; description: string }> = {
  "cv-writing": {
    label: "CV Writing",
    title: "CV Writing Service | ATS-Friendly CV Strategy",
    description:
      "Compare Student, Professional, and Executive ATS-friendly CV writing packages with role-aligned positioning, achievement language, and recruiter-ready structure.",
  },
  "cover-letter-writing": {
    label: "Cover Letter Writing",
    title: "Cover Letter Writing Service",
    description:
      "Compare Student, Professional, and Executive cover letter writing packages tailored to your career stage, target role, and application goals.",
  },
  "linkedin-optimization": {
    label: "LinkedIn Account Optimization",
    title: "LinkedIn Account Optimization Service",
    description:
      "Compare Student, Professional, and Executive LinkedIn account optimization packages for stronger profile positioning, recruiter visibility, and personal branding.",
  },
  "cv-review": {
    label: "CV Review",
    title: "CV Review Service",
    description:
      "Get expert feedback on your current CV with practical recommendations for ATS compatibility and stronger interview conversion.",
  },
};

export function generateStaticParams() {
  return Object.keys(serviceMetadataMap).map((slug) => ({ slug }));
}

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
  const entry = serviceMetadataMap[slug];

  if (!entry) {
    notFound();
  }

  const serviceCategoryMap: Record<string, string[]> = {
    "cv-writing": ["CV Writing"],
    "cover-letter-writing": ["Cover Letter Writing"],
    "linkedin-optimization": ["LinkedIn Optimization"],
    "cv-review": ["CV Review"],
  };

  const categoryMatch = serviceCategoryMap[slug] ?? [];
  const relatedPackages = packageProducts.filter((pkg) => categoryMatch.includes(pkg.category));
  const oneRowServiceSlugs = ["cv-writing", "cover-letter-writing", "linkedin-optimization"];
  const relatedPackagesGridClass =
    oneRowServiceSlugs.includes(slug) && relatedPackages.length === 3
      ? "not-prose grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3"
      : "not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mt-4";

  return (
    <>
      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/services" className="hover:text-brand-main transition-colors">Services</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{entry.label}</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            {entry.label} <span className="text-brand-main">Service.</span>
          </h1>
        </div>
      </section>

 <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl relative w-full aspect-[21/9] bg-zinc-200 rounded-[24px] mb-12 overflow-hidden">
            <AnimatedServiceTextVisual label={entry.label} variant="dark" className="h-full min-h-full rounded-[24px]" />
          </div>

          <article className="prose prose-lg mx-auto max-w-4xl prose-headings:font-plus-jakarta prose-headings:text-foreground prose-p:text-text-body prose-a:text-brand-main">
            <h2>Overview</h2>
            <p>
              In today&#39;s hiring environment, your professional profile must be clear, role-aligned, and results-focused. This {entry.label.toLowerCase()} service is designed to improve how recruiters and hiring managers understand your value.
            </p>
            {slug === "cv-writing" && (
              <p>
                CV writing is now organized into three clear package levels: Student, Professional, and Executive. Each package has its own positioning depth, ATS target, delivery window, and content strategy so candidates can choose the right level for their current career stage.
              </p>
            )}
            {slug === "cover-letter-writing" && (
              <p>
                Cover letter writing is now organized into three clear package levels: Student, Professional, and Executive. Each package is written around your career stage, target role, and the kind of first impression you need to create.
              </p>
            )}
            {slug === "linkedin-optimization" && (
              <p>
                LinkedIn account optimization is now organized into three clear package levels: Student, Professional, and Executive. Each package improves profile clarity, keyword direction, visibility, and personal branding for a different career stage.
              </p>
            )}

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
                <div className={relatedPackagesGridClass}>
                  {relatedPackages.map((pkg) => (
 <div key={pkg.slug} className="rounded-[14px] border border-zinc-200 p-4 bg-zinc-50">
                      <AnimatedServiceTextVisual label={pkg.name} className="mb-4 min-h-[120px] rounded-[12px]" />
                      <p className="font-semibold text-foreground mb-2">{pkg.name}</p>
                      <p className="text-sm text-text-body mb-3">{pkg.description ?? pkg.audience}</p>
                      <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
                        <span className="rounded-[10px] bg-white px-3 py-2 font-semibold text-foreground">{formatLkr(pkg.priceLkr)}</span>
                        <span className="rounded-[10px] bg-white px-3 py-2 font-semibold text-foreground">{pkg.delivery}</span>
                      </div>
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
