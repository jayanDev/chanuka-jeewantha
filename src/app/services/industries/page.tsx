import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { industryLandingPages } from "@/lib/industry-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Industry Career Pages | CV Writing and LinkedIn Support by Audience",
  description:
    "Browse industry-specific career pages for software, finance, marketing, HR, engineering, and fresh graduates with tailored CV, LinkedIn, and digital-presence guidance.",
  path: "/services/industries",
  keywords: [
    "industry career pages",
    "industry cv writing",
    "linkedin optimization by industry",
    "career services by role type",
  ],
});

export default function ServiceIndustriesPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Industry Pages", path: "/services/industries" },
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
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-heading font-extrabold uppercase leading-none">
                INDUSTRY PAGES
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/services" className="hover:text-brand-main transition-colors">Services</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Industry Pages</span>
          </div>
          <h1 className="font-heading text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] max-w-5xl !text-white">
            Career pages built for <span className="text-brand-main">specific audiences</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">
            Explore tailored pages for different industries and role groups with more relevant CV, LinkedIn, interview, and digital-presence guidance.
          </p>
        </div>
      </section>

 <section className="w-full bg-white py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {industryLandingPages.map((page) => (
 <article key={page.slug} className="rounded-[22px] border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.1)]">
                <span className="inline-flex rounded-full bg-brand-main/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark">
                  {page.name}
                </span>
                <h2 className="mt-4 text-[28px] font-bold font-heading text-foreground">{page.name}</h2>
 <p className="mt-3 text-sm leading-relaxed text-zinc-600">{page.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {page.sampleRoles.slice(0, 3).map((role) => (
 <span key={role} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
                      {role}
                    </span>
                  ))}
                </div>
                <Link href={`/services/industries/${page.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
                  Open Career Page
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
