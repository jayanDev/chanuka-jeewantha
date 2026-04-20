import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSidebarAds from "@/components/ServiceSidebarAds";
import { getResourceBySlug, digitalResources } from "@/lib/resources";
import { formatLkr } from "@/lib/packages-catalog";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { getBaseUrl } from "@/lib/site-url";

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

  if (!resource) {
    return buildNoIndexMetadata({
      title: "Resource Not Found",
      description: "The requested resource is unavailable.",
      path: `/resources/${slug}`,
    });
  }

  const base = buildPageMetadata({
    title: `${resource.title} | Chanuka Resources`,
    description: resource.description,
    path: `/resources/${slug}`,
    keywords: [resource.title, "career resources", "digital products", "job search toolkit"],
  });

  const ogImagePath = `/resources/${slug}/opengraph-image`;

  return {
    ...base,
    openGraph: {
      ...(base.openGraph ?? {}),
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: resource.title,
        },
      ],
    },
    twitter: {
      ...(base.twitter ?? {}),
      images: [ogImagePath],
    },
  };
}

export default async function ResourceSinglePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const priceLkr = resource.priceLkr ?? 0;
  const isFreeResource = resource.category === "free";

  const baseUrl = getBaseUrl();
  const resourceUrl = `${baseUrl}/resources/${resource.slug}`;
  const imageUrl = `${baseUrl}${resource.coverImage}`;

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: resource.title, path: `/resources/${resource.slug}` },
  ]);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${resourceUrl}#product`,
    name: resource.title,
    description: resource.description,
    image: [imageUrl],
    sku: resource.slug,
    category: "Digital Career Resource",
    brand: {
      "@type": "Brand",
      name: "Chanuka Jeewantha",
    },
    offers: {
      "@type": "Offer",
      url: resourceUrl,
      priceCurrency: "LKR",
      price: isFreeResource ? 0 : resource.priceLkr,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`,
        name: "Chanuka Jeewantha",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[120px] md:pt-[180px] pb-[72px] md:pb-[90px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-white/85 font-medium mb-8">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/resources" className="hover:text-brand-main transition-colors">Resources</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{resource.title}</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] md:text-[62px] font-bold font-plus-jakarta leading-[1.08] mb-4 !text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {resource.title} <span className="text-brand-main">Resource</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">{resource.subtitle}</p>
        </div>
      </section>

      <section className="w-full bg-zinc-50 dark:bg-zinc-900 py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
            <article className="rounded-[22px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7 md:p-10">
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
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

              {resource.contentSections && resource.contentSections.length > 0 ? (
                <div className="space-y-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                  {resource.contentSections.map((section) => (
                    <section key={section.heading}>
                      <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground">{section.heading}</h2>
                      <div className="mt-4 space-y-4 text-text-body">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {section.bullets && section.bullets.length > 0 ? (
                        <ul className="mt-5 space-y-3">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3 text-text-body">
                              <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  {isFreeResource ? "Access" : "Investment"}
                </p>
                <p className="mb-6 text-[24px] font-bold font-plus-jakarta text-foreground">
                  {isFreeResource ? "Free Resource" : formatLkr(priceLkr)}
                </p>
                {isFreeResource ? (
                  <Link
                    href={resource.primaryActionHref ?? "/blog"}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-foreground px-6 py-3 font-semibold text-background transition-colors hover:bg-brand-main"
                  >
                    {resource.primaryActionLabel ?? "Explore Related Guides"}
                  </Link>
                ) : (
                  <a
                    href={getWhatsappOrderLink(resource.title, priceLkr)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[10px] bg-[#25D366] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1fb85a]"
                  >
                    Order via WhatsApp
                  </a>
                )}
              </div>
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
