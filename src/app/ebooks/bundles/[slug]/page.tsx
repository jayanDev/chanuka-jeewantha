import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ebookBundles, ebooks, getEbookBundleBySlug, getBundlePrice } from "@/lib/ebooks";
import { EBOOK_DOWNLOAD_PRICE_LKR } from "@/lib/ebook-pricing";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";

const whatsappNumber = "94773902230";

type BundlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ebookBundles.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: BundlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const bundle = getEbookBundleBySlug(slug);

  if (!bundle) {
    return buildNoIndexMetadata({
      title: "Bundle Not Found",
      description: "The requested bundle is unavailable.",
      path: `/ebooks/bundles/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${bundle.title} | ${bundle.discountPercent}% Off | Chanuka Ebooks`,
    description: bundle.description,
    path: `/ebooks/bundles/${slug}`,
    keywords: ["ebook bundle", "sinhala ebooks", "career ebooks", "discount"],
  });
}

export default async function BundlePage({ params }: BundlePageProps) {
  const { slug } = await params;
  const bundle = getEbookBundleBySlug(slug);

  if (!bundle) notFound();

  const { originalLkr, discountedLkr, savingsLkr } = getBundlePrice(bundle);
  const bundleEbooks = bundle.ebookSlugs.map((s) => ebooks.find((e) => e.slug === s)).filter(Boolean);

  const bookListText = bundleEbooks.map((e) => e!.title).join(", ");
  const waText = `Hello Chanuka, I want to purchase the "${bundle.title}" bundle.\nBooks: ${bookListText}\nBundle Price: LKR ${discountedLkr.toLocaleString("en-LK")} (${bundle.discountPercent}% off)`;

  return (
    <section className="w-full bg-foreground text-background pt-[116px] md:pt-[170px] pb-[72px] md:pb-[90px]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-text-light font-medium mb-8 flex-wrap">
          <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
          <span className="text-brand-main text-xs">/</span>
          <Link href="/ebooks" className="hover:text-brand-main transition-colors">Ebooks</Link>
          <span className="text-brand-main text-xs">/</span>
          <Link href="/ebooks/bundles" className="hover:text-brand-main transition-colors">Bundles</Link>
          <span className="text-brand-main text-xs">/</span>
          <span className="text-brand-main">{bundle.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 items-start">
          {/* Cover */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-white/15 bg-white">
            <Image
              src={bundle.coverImage}
              alt={bundle.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 380px"
              priority
            />
            {/* Discount badge */}
            <div className="absolute top-4 right-4 bg-brand-main text-white font-bold text-base rounded-full w-16 h-16 flex flex-col items-center justify-center leading-tight">
              <span className="text-lg font-extrabold">{bundle.discountPercent}%</span>
              <span className="text-[10px] font-semibold">OFF</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="mb-4 inline-flex rounded-full bg-brand-main/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-main">
              Bundle Deal
            </span>
            <h1 className="text-[22px] sm:text-[28px] md:text-[36px] font-bold font-heading leading-[1.15] mb-3 text-white">
              {bundle.title}
            </h1>
            <p className="text-[18px] font-semibold text-brand-light mb-5">{bundle.subtitle}</p>
            <p className="text-text-light text-lg leading-relaxed mb-6">{bundle.description}</p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {bundle.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-text-light">
                  <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Pricing */}
            <div className="rounded-[16px] border border-white/10 bg-white/5 p-6 mb-8">
              <div className="flex items-end gap-4 mb-2">
                <span className="text-4xl font-extrabold font-heading text-white">
                  LKR {discountedLkr.toLocaleString("en-LK")}
                </span>
                <span className="text-xl text-text-light line-through mb-1">
                  LKR {originalLkr.toLocaleString("en-LK")}
                </span>
              </div>
              <p className="text-brand-main font-semibold text-sm">
                ඔබ LKR {savingsLkr.toLocaleString("en-LK")} ඉතිරි කරගනී ({bundle.discountPercent}% discount)
              </p>
            </div>

            {/* CTA */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[12px] bg-[#25D366] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#1fb85a]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              WhatsApp හරහා Bundle ලබාගන්න
            </a>
          </div>
        </div>

        {/* Books in this bundle */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">Bundle ට ඇතුළත් Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bundleEbooks.map((ebook) => {
              if (!ebook) return null;
              return (
                <Link
                  key={ebook.slug}
                  href={`/ebooks/${ebook.slug}`}
                  className="group rounded-[16px] border border-white/10 bg-white/5 overflow-hidden hover:border-brand-main/50 transition-colors"
                >
                  <div className="relative aspect-[4/5] bg-white">
                    <Image
                      src={ebook.coverImage}
                      alt={ebook.title}
                      fill
                      className="object-contain"
                      sizes="280px"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-white text-sm leading-snug mb-1 group-hover:text-brand-main transition-colors">
                      {ebook.title}
                    </p>
                    <p className="text-xs text-text-light">LKR {(ebook.downloadPriceLkr ?? EBOOK_DOWNLOAD_PRICE_LKR).toLocaleString("en-LK")}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
