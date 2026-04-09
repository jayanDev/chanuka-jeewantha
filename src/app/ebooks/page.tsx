import Image from "next/image";
import Link from "next/link";
import { ebooks } from "@/lib/ebooks";
import { formatLkr } from "@/lib/packages-catalog";

export default function EbooksPage() {
  const freeEbooks = ebooks.filter((ebook) => ebook.category === "free");
  const paidEbooks = ebooks.filter((ebook) => ebook.category === "paid");

  return (
    <>
      <section className="w-full bg-foreground text-white pt-[100px] pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                EBOOKS
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Ebooks</span>
          </div>
          <h1 className="font-plus-jakarta text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.1] max-w-5xl !text-white">
            Read free career guides and discover premium <span className="text-brand-main">paid ebook toolkits</span>.
          </h1>
        </div>
      </section>

      <section className="w-full py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6">
          <div className="mb-12">
            <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">Free Ebooks</span>
            <h2 className="text-[36px] md:text-[48px] font-bold font-plus-jakarta text-foreground">Start Reading For Free</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {freeEbooks.map((ebook) => (
              <article key={ebook.slug} className="rounded-[22px] border border-zinc-200 p-7 bg-zinc-50">
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[14px] border border-zinc-200 bg-white">
                  <Image src={ebook.coverImage} alt={ebook.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <h3 className="text-[30px] font-bold font-plus-jakarta text-foreground mb-2">{ebook.title}</h3>
                <p className="text-brand-dark font-semibold mb-3">{ebook.subtitle}</p>
                <p className="text-text-body mb-6">{ebook.description}</p>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/ebooks/${ebook.slug}`} className="rounded-[10px] bg-foreground px-5 py-2.5 font-medium text-white transition-colors hover:bg-brand-dark">
                    Read Free Ebook
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mb-12">
            <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">Paid Ebooks</span>
            <h2 className="text-[36px] md:text-[48px] font-bold font-plus-jakarta text-foreground">Premium Strategy Guides</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paidEbooks.map((ebook) => (
              <article key={ebook.slug} className="rounded-[22px] border border-zinc-200 p-7 bg-white shadow-sm">
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[14px] border border-zinc-200 bg-zinc-50">
                  <Image src={ebook.coverImage} alt={ebook.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-[10px] border border-brand-main/40 bg-brand-main/10 px-3 py-1.5">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">Paid Ebook</span>
                </div>
                <h3 className="text-[30px] font-bold font-plus-jakarta text-foreground mb-2">{ebook.title}</h3>
                <p className="text-brand-dark font-semibold mb-3">{ebook.subtitle}</p>
                <p className="text-text-body mb-5">{ebook.description}</p>
                <p className="text-[22px] font-bold font-plus-jakarta text-foreground mb-6">{formatLkr(ebook.priceLkr ?? 0)}</p>
                <Link href={`/ebooks/${ebook.slug}`} className="rounded-[10px] bg-brand-main px-5 py-2.5 font-medium text-white transition-colors hover:bg-brand-dark">
                  View Paid Ebook
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
