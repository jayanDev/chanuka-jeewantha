import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { checklists } from "@/lib/checklists";
import { digitalResources } from "@/lib/resources";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import ResourceFilterClient from "./_components/ResourceFilterClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Career Resources, Templates & Checklists | Chanuka Jeewantha",
  description:
    "Download ATS-friendly CV templates, career resources, and free checklists to improve job applications, LinkedIn visibility, and career planning.",
  path: "/resources",
  keywords: ["ATS CV template", "free CV template", "career resources", "free resources", "business checklist"],
});

export default function ResourcesPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-heading font-extrabold uppercase leading-none">
                RESOURCES
              </span>
            ))}
          </div>
        </div>
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Resources</span>
          </div>
          <h1 className="font-heading text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-5xl !text-white">
            Career <span className="text-brand-main">resources</span> for cleaner applications and smarter growth.
          </h1>
          <p className="text-text-light text-[18px] md:text-[22px] max-w-2xl leading-relaxed mt-6">
            Download templates, browse practical checklists, and use focused tools to improve your next career move.
          </p>
        </div>
      </section>

      {/* Templates and digital resources */}
      <section className="w-full py-[64px] sm:py-[80px] bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <span className="text-brand-dark font-semibold tracking-wider uppercase">Templates</span>
            <h2 className="text-[30px] sm:text-[40px] font-bold font-heading text-foreground leading-[1.12]">
              Downloadable Templates and Career Resources
            </h2>
            <p className="mx-auto max-w-2xl text-text-body">
              Filter by resource type and access level. Free items require a website account before download.
            </p>
          </div>
          <ResourceFilterClient resources={digitalResources} />
        </div>
      </section>

      {/* Checklists section */}
      <section className="w-full py-[64px] sm:py-[80px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">

          {/* Category heading */}
          <div className="mb-10 flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-brand-main/10 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <div>
              <h2 className="text-[22px] font-bold font-heading text-foreground leading-tight">Checklists</h2>
              <p className="text-sm text-text-body mt-0.5">Step-by-step action guides - free for everyone</p>
            </div>
          </div>

          {/* Checklist cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {checklists.map((checklist) => (
              <Link
                key={checklist.slug}
                href={`/resources/checklists/${checklist.slug}`}
                className="group flex flex-col rounded-[20px] border border-zinc-200 bg-white overflow-hidden hover:border-brand-main hover:shadow-lg transition-all duration-200"
              >
                <div className="relative aspect-[16/9] bg-zinc-100 overflow-hidden">
                  <Image
                    src={checklist.coverImage}
                    alt={checklist.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Free badge */}
                  <span className="absolute top-3 left-3 rounded-full bg-brand-main px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                    Free
                  </span>
                  {/* Steps count */}
                  <span className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white">
                    {checklist.steps.length} Steps
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-[16px] font-bold font-heading text-foreground leading-snug mb-2 group-hover:text-brand-dark transition-colors">
                    {checklist.title}
                  </h3>
                  <p className="text-sm text-text-body leading-relaxed mb-4 flex-1">
                    {checklist.subtitle}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                    <span className="text-xs text-text-light">
                      {checklist.freeSteps} of {checklist.steps.length} steps free
                    </span>
                    <span className="text-sm font-semibold text-brand-dark group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      View
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Related links */}
          <aside className="mt-16 rounded-[16px] border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-[22px] font-bold font-heading text-foreground mb-3">Explore More</h2>
            <p className="text-text-body mb-5">Pair these checklists with deeper reading and hands-on services.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/ebooks" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Explore Ebooks
              </Link>
              <Link href="/services" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                View Services
              </Link>
              <Link href="/tools" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Use Free Tools
              </Link>
              <Link href="/blog" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Read Blog Guides
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
