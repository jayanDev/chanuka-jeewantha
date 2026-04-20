import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { digitalProducts } from "@/lib/digital-products";
import StoreFilterClient from "./_components/StoreFilterClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Digital Products & Templates | Chanuka Jeewantha",
  description:
    "Explore our premium digital product store. Download ATS CV Templates, Ebooks, Cover Letters, and Career Guides to fast-track your job search.",
  path: "/ebooks",
  keywords: ["CV templates", "cover letter templates", "career ebooks", "digital store"],
});

export default function EbooksPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Store", path: "/ebooks" },
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
                EBOOKS
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Ebooks</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-5xl !text-white">
            Premium Digital <span className="text-brand-main">Product Store</span>
          </h1>
          <p className="text-text-light text-[18px] md:text-[22px] max-w-2xl leading-relaxed mt-6">
            Download professional CV templates, cover letters, and career strategy ebooks to fast-track your job search.
          </p>
        </div>
      </section>

      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <StoreFilterClient products={digitalProducts} />

          <aside className="mt-8 rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
            <h2 className="text-[24px] font-bold font-plus-jakarta text-foreground mb-3">Continue Your Career Upgrade</h2>
            <p className="text-text-body mb-5">
              Combine ebook learning with implementation support and practical toolkits.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/resources" className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Browse Resources
              </Link>
              <Link href="/services" className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Explore Services
              </Link>
              <Link href="/contact" className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Talk to Chanuka
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
