import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ebookBundles, ebooks, getBundlePrice } from "@/lib/ebooks";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Ebook Bundle Deals | Chanuka Jeewantha",
  description:
    "ebooks bundle deals — Business Starter (25% off) සහ Complete Collection (50% off). Career, productivity, සහ wealth ebooks Sinhala.",
  path: "/ebooks/bundles",
  keywords: ["ebook bundle", "sinhala ebooks", "career ebooks", "discount bundle"],
});

export default function BundlesPage() {
  return (
    <section className="w-full bg-foreground text-background pt-[116px] md:pt-[170px] pb-[72px] md:pb-[90px]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-text-light font-medium mb-8">
          <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
          <span className="text-brand-main text-xs">/</span>
          <Link href="/ebooks" className="hover:text-brand-main transition-colors">Ebooks</Link>
          <span className="text-brand-main text-xs">/</span>
          <span className="text-brand-main">Bundles</span>
        </div>

        <div className="mb-12">
          <span className="mb-4 inline-flex rounded-full bg-brand-main/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-main">Bundle Deals</span>
          <h1 className="text-[28px] sm:text-[38px] font-bold font-plus-jakarta leading-tight mb-4 text-white">
            Ebook Bundles
          </h1>
          <p className="text-text-light text-lg max-w-2xl">
            Books කිහිපයක් එකවර ලබාගෙන discount ලබාගන්න. Individual ebooks ගන්නවාට වඩා savings ලැබේ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ebookBundles.map((bundle) => {
            const { originalLkr, discountedLkr, savingsLkr } = getBundlePrice(bundle);
            const bundleEbookCovers = bundle.ebookSlugs
              .map((s) => ebooks.find((e) => e.slug === s))
              .filter(Boolean)
              .slice(0, 3);

            return (
              <Link
                key={bundle.slug}
                href={`/ebooks/bundles/${bundle.slug}`}
                className="group rounded-[20px] border border-white/10 bg-white/5 overflow-hidden hover:border-brand-main/50 transition-colors flex flex-col"
              >
                {/* Cover with discount badge */}
                <div className="relative aspect-[16/9] bg-white overflow-hidden">
                  <Image
                    src={bundle.coverImage}
                    alt={bundle.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 540px"
                  />
                  <div className="absolute top-4 right-4 bg-brand-main text-white font-bold rounded-full w-16 h-16 flex flex-col items-center justify-center leading-tight shadow-lg">
                    <span className="text-lg font-extrabold">{bundle.discountPercent}%</span>
                    <span className="text-[10px] font-semibold">OFF</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="mb-3 inline-flex self-start rounded-full bg-brand-main/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-main">
                    {bundle.ebookSlugs.length} Books
                  </span>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-brand-main transition-colors">
                    {bundle.title}
                  </h2>
                  <p className="text-text-light text-sm leading-relaxed mb-6 flex-1">{bundle.description}</p>

                  {/* Price */}
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-2xl font-extrabold font-plus-jakarta text-white">
                      LKR {discountedLkr.toLocaleString("en-LK")}
                    </span>
                    <span className="text-base text-text-light line-through mb-0.5">
                      LKR {originalLkr.toLocaleString("en-LK")}
                    </span>
                  </div>
                  <p className="text-brand-main text-sm font-semibold">
                    LKR {savingsLkr.toLocaleString("en-LK")} ඉතිරි කරගන්න
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Back to all ebooks */}
        <div className="mt-12 text-center">
          <Link
            href="/ebooks"
            className="inline-flex items-center gap-2 text-text-light hover:text-brand-main transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
            All Ebooks බලන්න
          </Link>
        </div>
      </div>
    </section>
  );
}
