import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSidebarAds from "@/components/ServiceSidebarAds";
import { getResourceBySlug, digitalResources } from "@/lib/resources";
import { formatLkr } from "@/lib/packages-catalog";

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

const whatsappNumber = "94773902230";

function getWhatsappOrderLink(title: string, price: number) {
  const lines = [
    "Hello Chanuka, I want to order this paid digital resource.",
    `Resource: ${title}`,
    `Price: ${formatLkr(price)}`,
  ];

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export async function generateStaticParams() {
  return digitalResources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) return { title: "Resource Not Found" };

  return {
    title: `${resource.title} | Chanuka Resources`,
    description: resource.description,
  };
}

export default async function ResourceSinglePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return (
    <>
      <section className="w-full bg-foreground text-white pt-[180px] pb-[90px]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-white/85 font-medium mb-8">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/resources" className="hover:text-brand-main transition-colors">Resources</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{resource.title}</span>
          </div>
          <h1 className="text-[44px] md:text-[62px] font-bold font-plus-jakarta leading-[1.08] mb-4 !text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {resource.title} <span className="text-brand-main">Resource</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">{resource.subtitle}</p>
        </div>
      </section>

      <section className="w-full bg-zinc-50 py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
            <article className="rounded-[22px] border border-zinc-200 bg-white p-7 md:p-10">
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[16px] border border-zinc-200 bg-zinc-50">
                <Image src={resource.coverImage} alt={resource.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 70vw" />
              </div>
              <p className="text-text-body text-lg leading-relaxed mb-8">{resource.description}</p>

              <ul className="space-y-3 mb-8">
                {resource.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-text-body">
                    <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <p className="text-[24px] font-bold font-plus-jakarta text-foreground mb-6">{formatLkr(resource.priceLkr)}</p>
              <a
                href={getWhatsappOrderLink(resource.title, resource.priceLkr)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#25D366] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1fb85a]"
              >
                Order via WhatsApp
              </a>
            </article>

            <aside className="w-full">
              <ServiceSidebarAds title="Related Services" />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
