import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { careerTools } from "@/lib/tools";
import { buildPageMetadata } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";
import { buildBreadcrumbList } from "@/lib/structured-data";

const baseUrl = getBaseUrl();

export const metadata: Metadata = buildPageMetadata({
  title: "Free Career Tools | ATS Audit, LinkedIn Headline Generator, Interview Prep",
  description:
    "Use free career tools from Chanuka Jeewantha including an ATS CV audit, LinkedIn headline generator, and interview story bank builder.",
  path: "/tools",
  keywords: [
    "free career tools",
    "ats cv audit tool",
    "linkedin headline generator",
    "interview story bank",
  ],
});

export default function ToolsPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
  ]);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Career Tools",
    itemListElement: careerTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: `${baseUrl}/tools/${tool.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <section className="w-full bg-foreground text-white pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                FREE TOOLS
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Tools</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-5xl !text-white">
            Free tools for <span className="text-brand-main">ATS, LinkedIn, and interviews</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">
            Use these browser-based tools to improve your CV, strengthen your LinkedIn positioning, and prepare stronger interview stories before you apply.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {careerTools.map((tool) => (
              <article
                key={tool.slug}
                className="group overflow-hidden rounded-[22px] border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.1)]"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image
                    src={tool.image}
                    alt={tool.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="mb-3 inline-flex rounded-full bg-brand-main/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark">
                    {tool.category}
                  </span>
                  <h2 className="mb-3 text-[28px] font-bold font-plus-jakarta text-foreground">{tool.title}</h2>
                  <p className="mb-6 text-base leading-relaxed text-text-body">{tool.summary}</p>
                  <ul className="mb-6 space-y-2">
                    {tool.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm text-zinc-700">
                        <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main"
                  >
                    Open Tool
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <aside className="mt-10 rounded-[16px] border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-[24px] font-bold font-plus-jakarta text-foreground mb-3">Build Beyond Free Tools</h2>
            <p className="text-text-body mb-5">
              Use the free tools for fast clarity, then move to practical services, premium resources, or direct support when you want stronger execution.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/career-quiz" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Take Career Quiz
              </Link>
              <Link href="/results" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                See Results
              </Link>
              <Link href="/services" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Explore Services
              </Link>
              <Link href="/resources" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Browse Resources
              </Link>
              <Link href="/contact" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Contact for Help
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
