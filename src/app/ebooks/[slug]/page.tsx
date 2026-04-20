import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ebooks, getEbookBySlug } from "@/lib/ebooks";
import { formatLkr } from "@/lib/packages-catalog";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

type EbookPageProps = {
  params: Promise<{ slug: string }>;
};

const whatsappNumber = "94773902230";

const getWhatsappOrderLink = (title: string, price?: number) => {
  const lines = [
    "Hello Chanuka, I want to order this paid ebook.",
    `Ebook: ${title}`,
    price ? `Price: ${formatLkr(price)}` : "",
  ].filter(Boolean);

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
};

export async function generateStaticParams() {
  return ebooks.map((ebook) => ({ slug: ebook.slug }));
}

export async function generateMetadata({ params }: EbookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);

  if (!ebook) {
    return buildNoIndexMetadata({
      title: "Ebook Not Found",
      description: "The requested ebook is unavailable.",
      path: `/ebooks/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${ebook.title} | Chanuka Ebooks`,
    description: ebook.description,
    path: `/ebooks/${slug}`,
    keywords: [ebook.title, "career ebooks", "job seeker guide", ebook.category === "paid" ? "paid ebook" : "free ebook"],
  });
}

export default async function EbookSinglePage({ params }: EbookPageProps) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);

  if (!ebook) {
    notFound();
  }

  const baseUrl = getBaseUrl();
  const ebookUrl = `${baseUrl}/ebooks/${ebook.slug}`;
  const imageUrl = `${baseUrl}${ebook.coverImage}`;
  const paidProductLd =
    ebook.category === "paid" && typeof ebook.priceLkr === "number"
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": `${ebookUrl}#product`,
          name: ebook.title,
          description: ebook.description,
          image: [imageUrl],
          sku: ebook.slug,
          category: "Digital Career Ebook",
          brand: {
            "@type": "Brand",
            name: "Chanuka Jeewantha",
          },
          offers: {
            "@type": "Offer",
            url: ebookUrl,
            priceCurrency: "LKR",
            price: ebook.priceLkr,
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: {
              "@type": "Organization",
              "@id": `${baseUrl}#organization`,
              name: "Chanuka Jeewantha",
            },
          },
        }
      : null;

  return (
    <>
      {paidProductLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(paidProductLd) }}
        />
      )}

      <section className="w-full bg-foreground text-background pt-[116px] md:pt-[170px] pb-[72px] md:pb-[90px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-text-light font-medium mb-8">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/ebooks" className="hover:text-brand-main transition-colors">Ebooks</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{ebook.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 items-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-white/15 bg-white dark:bg-zinc-900/5">
              <Image src={ebook.coverImage} alt={ebook.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 420px" />
            </div>

            <div>
              <span className="mb-4 inline-flex rounded-full bg-brand-main/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-main">
                {ebook.category === "paid" ? "Paid Ebook" : "Free Ebook"}
              </span>
              <h1 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-plus-jakarta leading-[1.08] mb-3 text-white">{ebook.title}</h1>
              <p className="text-[22px] font-semibold text-brand-light mb-5">{ebook.subtitle}</p>
              <p className="text-text-light text-lg leading-relaxed mb-8">{ebook.description}</p>

              <ul className="space-y-3 mb-10">
                {ebook.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-text-light">
                    <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {ebook.category === "free" ? (
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/ebooks/${ebook.slug}/read/0`}
                    className="rounded-[10px] bg-brand-main px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    Read Now
                  </Link>
                  <Link href="/contact" className="rounded-[10px] border border-white/35 px-6 py-3 font-semibold text-white transition-colors hover:border-brand-main hover:text-brand-main">
                    Ask a Question
                  </Link>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/ebooks/${ebook.slug}/read/0`}
                    className="rounded-[10px] bg-brand-main px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    Start Reading (Free Preview)
                  </Link>
                  <a
                    href={getWhatsappOrderLink(ebook.title, ebook.priceLkr)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[10px] bg-[#25D366] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1fb85a]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Order via WhatsApp
                  </a>
                  <p className="w-full text-brand-light font-semibold">Price: {formatLkr(ebook.priceLkr ?? 0)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
