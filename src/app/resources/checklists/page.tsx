import Link from "next/link";
import type { Metadata } from "next";
import { checklists } from "@/lib/checklists";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Checklists | Business & Career Action Guides",
  description:
    "Free step-by-step checklists to start a business, build your career, and take practical action. Sign in to unlock all steps.",
  path: "/resources/checklists",
  keywords: ["free checklists", "business startup checklist", "career action guide", "fastlane method checklist"],
});

export default function ChecklistsIndexPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Checklists", path: "/resources/checklists" },
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
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                CHECKLISTS
              </span>
            ))}
          </div>
        </div>
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6 flex-wrap justify-center">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/resources" className="hover:text-brand-main transition-colors">Resources</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Checklists</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-5xl !text-white">
            Free <span className="text-brand-main">checklists</span> for business and career growth.
          </h1>
          <p className="text-text-light text-[18px] md:text-[22px] max-w-2xl leading-relaxed mt-6">
            Practical step-by-step guides — completely free. Sign in to unlock every step.
          </p>
        </div>
      </section>

      <section className="w-full py-[64px] sm:py-[80px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {checklists.map((checklist) => (
              <Link
                key={checklist.slug}
                href={`/resources/checklists/${checklist.slug}`}
                className="group flex flex-col rounded-[20px] border border-zinc-200 bg-white overflow-hidden hover:border-brand-main hover:shadow-lg transition-all duration-200"
              >
                <div className="relative aspect-[16/9] bg-zinc-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  </div>
                  <span className="absolute top-3 left-3 rounded-full bg-brand-main px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                    Free
                  </span>
                  <span className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white">
                    {checklist.steps.length} Steps
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="text-[16px] font-bold font-plus-jakarta text-foreground leading-snug mb-2 group-hover:text-brand-dark transition-colors">
                    {checklist.title}
                  </h2>
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
        </div>
      </section>
    </>
  );
}
