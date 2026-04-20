import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { getBaseUrl } from "@/lib/site-url";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return buildNoIndexMetadata({
      title: "Case Study Not Found",
      description: "The requested case study is unavailable.",
      path: `/case-studies/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${study.title} | Case Study`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    keywords: [
      study.title,
      `${study.category.toLowerCase()} case study`,
      "career transformation case study",
      "chanuka jeewantha",
    ],
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const baseUrl = getBaseUrl();
  const studyUrl = `${baseUrl}/case-studies/${study.slug}`;
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/case-studies" },
    { name: study.title, path: `/case-studies/${study.slug}` },
  ]);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    image: [`${baseUrl}${study.image}`],
    author: {
      "@type": "Person",
      name: "Chanuka Jeewantha",
      url: `${baseUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      name: "Chanuka Jeewantha",
    },
    datePublished: `${study.year}-01-01T00:00:00.000Z`,
    dateModified: `${study.year}-01-01T00:00:00.000Z`,
    mainEntityOfPage: studyUrl,
    url: studyUrl,
    articleSection: study.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="mb-6 flex items-center gap-2 text-text-light font-medium">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/case-studies" className="hover:text-brand-main transition-colors">Case Studies</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main line-clamp-1">{study.title}</span>
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-main">{study.category}</p>
          <h1 className="max-w-5xl text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold font-plus-jakarta leading-[1.08] !text-white">
            {study.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">{study.summary}</p>
        </div>
      </section>

      <section className="w-full bg-white dark:bg-zinc-900 py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="rounded-[24px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-10 shadow-sm">
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[20px] border border-zinc-200 dark:border-zinc-800">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              </div>

              <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Client Profile</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{study.clientProfile}</p>
                </div>
                <div className="rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Category</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{study.category}</p>
                </div>
                <div className="rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Year</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{study.year}</p>
                </div>
              </div>

              <div className="space-y-10">
                <section>
                  <h2 className="text-[30px] font-bold font-plus-jakarta text-foreground">The Challenge</h2>
                  <ul className="mt-5 space-y-3">
                    {study.challenge.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                        <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-[30px] font-bold font-plus-jakarta text-foreground">What Changed</h2>
                  <ul className="mt-5 space-y-3">
                    {study.strategy.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                        <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-[30px] font-bold font-plus-jakarta text-foreground">Outcome</h2>
                  <ul className="mt-5 space-y-3">
                    {study.outcomes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                        <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
                <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground">Proof Points</h3>
                <ul className="mt-5 space-y-3">
                  {study.proofPoints.map((point) => (
                    <li key={point} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{point}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground">Next Steps</h3>
                <div className="mt-5 flex flex-col gap-3">
                  {study.relatedServices.map((item) => (
                    <Link
                      key={`${item.href}-${item.label}`}
                      href={item.href}
                      className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors hover:border-brand-main hover:text-brand-main"
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
