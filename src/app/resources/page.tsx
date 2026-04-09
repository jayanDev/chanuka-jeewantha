import Image from "next/image";
import Link from "next/link";
import { digitalResources } from "@/lib/resources";
import { formatLkr } from "@/lib/packages-catalog";

export default function ResourcesPage() {
  return (
    <>
      <section className="w-full bg-foreground text-white pt-[200px] pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                RESOURCES
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Resources</span>
          </div>
          <h1 className="font-plus-jakarta text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.1] max-w-5xl !text-white">
            Paid Digital <span className="text-brand-main">Resources</span> for career growth and interview conversion.
          </h1>
        </div>
      </section>

      <section className="w-full py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {digitalResources.map((resource) => (
              <article key={resource.slug} className="rounded-[22px] border border-zinc-200 p-7 bg-white shadow-sm">
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[14px] border border-zinc-200 bg-zinc-50">
                  <Image src={resource.coverImage} alt={resource.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-[10px] border border-brand-main/40 bg-brand-main/10 px-3 py-1.5">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">Paid Resource</span>
                </div>
                <h2 className="text-[30px] font-bold font-plus-jakarta text-foreground mb-2">{resource.title}</h2>
                <p className="text-brand-dark font-semibold mb-3">{resource.subtitle}</p>
                <p className="text-text-body mb-5">{resource.description}</p>
                <p className="text-[22px] font-bold font-plus-jakarta text-foreground mb-6">{formatLkr(resource.priceLkr)}</p>
                <Link href={`/resources/${resource.slug}`} className="rounded-[10px] bg-brand-main px-5 py-2.5 font-medium text-white transition-colors hover:bg-brand-dark">
                  View Resource
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
