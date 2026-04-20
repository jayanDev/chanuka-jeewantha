import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { getIndustryLandingPageBySlug, industryLandingPages } from "@/lib/industry-pages";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { getBaseUrl } from "@/lib/site-url";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return industryLandingPages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryLandingPageBySlug(slug);

  if (!page) {
    return buildNoIndexMetadata({
      title: "Industry Page Not Found",
      description: "The requested industry career page is unavailable.",
      path: `/services/industries/${slug}`,
    });
  }

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: `/services/industries/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function IndustryServicePage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const page = getIndustryLandingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const relatedCaseStudies = page.relatedCaseStudySlugs
    .map((caseStudySlug) => getCaseStudyBySlug(caseStudySlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const baseUrl = getBaseUrl();
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Industry Pages", path: "/services/industries" },
    { name: page.name, path: `/services/industries/${page.slug}` },
  ]);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.description,
    serviceType: "Industry-specific career support",
    provider: {
      "@type": "ProfessionalService",
      name: "Chanuka Jeewantha",
      url: `${baseUrl}/about`,
    },
    url: `${baseUrl}/services/industries/${page.slug}`,
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${page.name} sample roles`,
    itemListElement: page.sampleRoles.map((role, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: role,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="mb-6 flex items-center gap-2 text-text-light font-medium">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/services" className="hover:text-brand-main transition-colors">Services</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/services/industries" className="hover:text-brand-main transition-colors">Industry Pages</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{page.name}</span>
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-main">{page.name}</p>
          <h1 className="max-w-5xl text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold font-plus-jakarta leading-[1.08] !text-white">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">{page.heroSummary}</p>
        </div>
      </section>

      <section className="w-full bg-white py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <article className="space-y-8">
              <div className="rounded-[22px] border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground">Who this page is for</h2>
                <p className="mt-4 text-text-body">{page.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {page.sampleRoles.map((role) => (
                    <span key={role} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm font-medium text-zinc-700">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <section className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-6">
                  <h2 className="text-[26px] font-bold font-plus-jakarta text-foreground">Common Positioning Gaps</h2>
                  <ul className="mt-5 space-y-3">
                    {page.challenges.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-zinc-700">
                        <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-6">
                  <h2 className="text-[26px] font-bold font-plus-jakarta text-foreground">Better Direction</h2>
                  <ul className="mt-5 space-y-3">
                    {page.positioningTips.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-zinc-700">
                        <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {relatedCaseStudies.length > 0 ? (
                <section className="rounded-[22px] border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground">Relevant Proof</h2>
                      <p className="mt-2 text-text-body">See related transformation stories and proof-based results.</p>
                    </div>
                    <Link href="/results" className="text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
                      Browse all results
                    </Link>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {relatedCaseStudies.map((study) => (
                      <article key={study.slug} className="rounded-[18px] border border-zinc-200 bg-zinc-50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-main">{study.category}</p>
                        <h3 className="mt-2 text-[22px] font-bold font-plus-jakarta text-foreground">{study.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{study.summary}</p>
                        <Link href={`/case-studies/${study.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
                          Read Case Study
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}
            </article>

            <aside className="space-y-6">
              <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground">Recommended Services</h3>
                <div className="mt-5 flex flex-col gap-3">
                  {page.recommendedServices.map((item) => (
                    <Link
                      key={`${item.href}-${item.label}`}
                      href={item.href}
                      className="rounded-[10px] border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6">
                <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground">Recommended Free Tools</h3>
                <div className="mt-5 flex flex-col gap-3">
                  {page.recommendedTools.map((item) => (
                    <Link
                      key={`${item.href}-${item.label}`}
                      href={item.href}
                      className="rounded-[10px] border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-zinc-200 bg-white p-6">
                <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground">Related Resources</h3>
                <div className="mt-5 flex flex-col gap-3">
                  {page.relatedResources.map((item) => (
                    <Link
                      key={`${item.href}-${item.label}`}
                      href={item.href}
                      className="rounded-[10px] border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
