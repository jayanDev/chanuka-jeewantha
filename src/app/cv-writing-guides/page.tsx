import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  cvGuideClusterOrder,
  cvGuidePages,
  getCvGuidesByCluster,
  type CvGuideCluster,
} from "@/lib/cv-guide-pages";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "100 Professional CV Writing Guides Sri Lanka | Chanuka Jeewantha",
  description: "Explore 100 practical CV, LinkedIn, career-situation, industry, and job-application guides from Sri Lankan professional CV writer Chanuka Jeewantha.",
  path: "/cv-writing-guides",
  keywords: ["CV writing guides Sri Lanka", "Chanuka Jeewantha", "professional CV writer Sri Lanka", "ATS CV guides"],
});

const clusterDescriptions: Record<CvGuideCluster, string> = {
  role: "Practical CV positioning for specific professions, from technology and finance to engineering, healthcare, education, and hospitality.",
  industry: "Sector-aware guidance for candidates who need to show operating context, standards, scale, and commercially relevant outcomes.",
  "career-situation": "Clear, honest strategies for career breaks, first jobs, transitions, remote work, internships, and other important job-search situations.",
  linkedin: "Focused LinkedIn writing and visibility guidance for stronger recruiter discovery, profile consistency, and professional trust.",
  application: "Cover letters, recruiter emails, portfolios, ATS applications, and follow-up guidance for a more complete application.",
};

const breadcrumbLd = buildBreadcrumbList([
  { name: "Home", path: "/" },
  { name: "CV Writing Guides", path: "/cv-writing-guides" },
]);

export default function CvWritingGuidesHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main>
        <section className="relative overflow-hidden bg-primary text-white">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <nav className="mb-7 flex items-center gap-2 text-sm text-white/70" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-brand-main">Home</Link><span>/</span><span className="text-brand-main">CV Writing Guides</span>
              </nav>
              <p className="inline-flex rounded-full border border-brand-main/50 bg-brand-main/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-main">
                Sri Lanka&apos;s No. 1 Professional CV Writer
              </p>
              <h1 className="mt-6 font-heading text-[40px] font-bold leading-[1.08] !text-white sm:text-[54px] lg:text-[68px]">
                100 Practical CV &amp; Career Guides
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
                Browse role-specific, industry, career-situation, LinkedIn, and application guidance created to help Sri Lankan job seekers make clearer, stronger career decisions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#guide-library" className="rounded-[10px] bg-brand-main px-6 py-3 font-semibold text-primary hover:bg-white">Explore All 100 Guides</Link>
                <Link href="/pricing" className="rounded-[10px] border border-white/35 px-6 py-3 font-semibold text-white hover:border-brand-main hover:text-brand-main">View Professional Services</Link>
              </div>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[28px] border border-white/15 shadow-2xl">
              <Image src="/images/chanuka-jeewantha-career-development-specialist.jpg" alt="Chanuka Jeewantha, professional CV writer in Sri Lanka" fill priority sizes="(max-width: 1024px) 90vw, 460px" className="object-cover" />
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-200 bg-[#FAF8F3]">
          <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-4 px-4 py-8 text-center sm:px-6 md:grid-cols-5">
            {cvGuideClusterOrder.map((cluster) => {
              const guides = getCvGuidesByCluster(cluster);
              return <a key={cluster} href={`#${cluster}`} className="rounded-[12px] border border-zinc-200 bg-white px-3 py-4 transition hover:border-brand-main"><strong className="block text-2xl text-foreground">{guides.length}</strong><span className="mt-1 block text-xs text-zinc-600">{guides[0]?.clusterLabel}</span></a>;
            })}
          </div>
        </section>

        <section id="guide-library" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1320px] space-y-20 px-4 sm:px-6">
            <header className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-dark">People-first career library</p>
              <h2 className="mt-3 font-heading text-[34px] font-bold text-foreground sm:text-[46px]">Choose the guide that matches your real search intent</h2>
              <p className="mt-5 leading-7 text-zinc-600">Every guide connects to relevant career-blog articles, professional packages, and neighbouring topics. No hidden keyword pages and no duplicate city pages.</p>
            </header>

            {cvGuideClusterOrder.map((cluster) => {
              const guides = getCvGuidesByCluster(cluster);
              return (
                <section key={cluster} id={cluster} className="scroll-mt-28">
                  <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-dark">{guides.length} guides</p>
                    <h2 className="mt-2 font-heading text-[32px] font-bold text-foreground">{guides[0]?.clusterLabel}</h2>
                    <p className="mt-3 leading-7 text-zinc-600">{clusterDescriptions[cluster]}</p>
                  </div>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {guides.map((guide, index) => (
                      <Link key={guide.slug} href={`/cv-writing-guides/${guide.slug}`} className="group rounded-[18px] border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-main hover:shadow-lg">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-bold text-brand-dark">Guide {String(cvGuidePages.indexOf(guide) + 1).padStart(3, "0")}</span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-sm text-zinc-600 transition group-hover:bg-brand-main group-hover:text-primary">&rarr;</span>
                        </div>
                        <h3 className="mt-4 font-heading text-xl font-bold text-foreground group-hover:text-brand-dark">{guide.shortTitle}</h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600">{guide.subtitle}</p>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-zinc-400">{index + 1} of {guides.length} in this section</p>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="bg-[#FAF8F3] py-16">
          <div className="mx-auto max-w-[960px] px-4 text-center sm:px-6">
            <h2 className="font-heading text-[34px] font-bold text-foreground">Need a CV written for you?</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-600">Use the free guides for direction, or work with Chanuka Jeewantha and his quality-supervised team for a professionally written CV, LinkedIn profile, or cover letter.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/catalogue" className="rounded-[10px] bg-primary px-6 py-3 font-semibold text-white hover:bg-brand-dark">Choose a Package</Link>
              <Link href="/contact" className="rounded-[10px] border border-zinc-300 bg-white px-6 py-3 font-semibold text-foreground hover:border-brand-main">Contact Chanuka</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
