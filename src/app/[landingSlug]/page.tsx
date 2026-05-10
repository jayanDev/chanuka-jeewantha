import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { formatLkr, packageProducts } from "@/lib/packages-catalog";
import { getLandingPageBySlug, landingPages } from "@/lib/landing-pages";

type LandingPageProps = {
  params: Promise<{ landingSlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return landingPages.map((item) => ({ landingSlug: item.slug }));
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { landingSlug } = await params;
  const page = getLandingPageBySlug(landingSlug);

  if (!page) {
    return buildNoIndexMetadata({
      title: "Landing Page Not Found",
      description: "The requested service landing page is unavailable.",
      path: `/${landingSlug}`,
    });
  }

  return buildPageMetadata({
    title: `${page.title} | Chanuka Jeewantha`,
    description: page.metaDescription,
    path: `/${page.slug}`,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
  });
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { landingSlug } = await params;
  const page = getLandingPageBySlug(landingSlug);

  if (!page) {
    notFound();
  }

  const relatedPackages = packageProducts.filter((pkg) => page.relatedPackageSlugs.includes(pkg.slug));

  const faqItems = [
    {
      q: `What is included in the ${page.title}?`,
      a: "The service typically includes profile review, ATS-friendly rewriting, keyword alignment, role-targeted positioning, and final formatting suitable for recruiters.",
    },
    {
      q: "Can this guarantee interviews?",
      a: "No professional service can guarantee interviews. However, stronger document quality and better role alignment can improve your application quality and screening performance.",
    },
    {
      q: "Do you support overseas applications?",
      a: "Yes. We support both Sri Lankan and international applications by adjusting wording, structure, and relevance based on the target market.",
    },
    {
      q: "Can I request a review before choosing a package?",
      a: "Yes. You can start with a CV review to identify gaps and then move into a full rewrite package if needed.",
    },
  ];

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: page.title, path: `/${page.slug}` },
  ]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[140px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap" aria-hidden="true">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[180px] font-heading font-extrabold uppercase leading-none">
                {page.primaryKeyword}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{page.title}</span>
          </div>
          <h1 className="font-heading text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] max-w-5xl !text-white">
            {page.title}
          </h1>
          <p className="mt-6 max-w-4xl text-lg text-text-light">{page.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/pricing" className="rounded-[10px] bg-brand-main px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
              View Pricing
            </Link>
            <Link href="/contact" className="rounded-[10px] border border-zinc-300 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-brand-main hover:text-brand-main">
              Contact for Guidance
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6 md:p-8 space-y-7">
            <div>
              <h2 className="text-[30px] font-bold font-heading text-foreground">Why this service matters</h2>
              <p className="mt-3 text-text-body leading-relaxed">
                In today&apos;s competitive hiring market, strong experience alone is not enough. Recruiters and ATS systems need clear role alignment, relevant keywords,
                and achievement-led writing to understand your value quickly.
              </p>
              <p className="mt-3 text-text-body leading-relaxed">{page.marketNote}</p>
            </div>

            <div>
              <h3 className="text-[24px] font-bold font-heading text-foreground">Who this is for</h3>
              <ul className="mt-4 space-y-2">
                {page.audience.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[24px] font-bold font-heading text-foreground">What we improve</h3>
              <ul className="mt-4 space-y-2">
                {page.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[24px] font-bold font-heading text-foreground">Process in 5 steps</h3>
              <ol className="mt-4 space-y-3 text-sm text-zinc-700">
                <li><strong>1. Review:</strong> We audit your current profile, target role, and market direction.</li>
                <li><strong>2. Information collection:</strong> We gather achievements, skills, certifications, and role-specific proof.</li>
                <li><strong>3. Rewrite:</strong> We build ATS-friendly structure and stronger recruiter-facing wording.</li>
                <li><strong>4. Quality check:</strong> We refine clarity, consistency, grammar, and section flow.</li>
                <li><strong>5. Delivery:</strong> You receive editable files and clear next-step guidance.</li>
              </ol>
            </div>

            <div>
              <h3 className="text-[24px] font-bold font-heading text-foreground">Backlinks and related landing pages</h3>
              <p className="mt-3 text-text-body leading-relaxed">
                For deeper support, you can also review
                {" "}
                {page.backlinks.map((slug, index) => {
                  const related = getLandingPageBySlug(slug);
                  if (!related) return null;
                  return (
                    <span key={slug}>
                      {index === 0 ? "" : index === page.backlinks.length - 1 ? " and " : ", "}
                      <Link href={`/${related.slug}`} className="font-semibold text-brand-dark underline-offset-2 hover:text-brand-main hover:underline">
                        {related.title}
                      </Link>
                    </span>
                  );
                })}
                .
              </p>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-main">Related Packages</p>
              <h3 className="mt-3 text-[24px] font-bold font-heading text-foreground">Recommended options</h3>
              {relatedPackages.length === 0 ? (
                <p className="mt-3 text-sm text-zinc-600">Check pricing and service pages to choose the best plan for your current career stage.</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {relatedPackages.map((pkg) => (
                    <div key={pkg.slug} className="rounded-[14px] border border-zinc-200 bg-zinc-50 p-4">
                      <p className="text-sm font-semibold text-zinc-900">{pkg.name}</p>
                      <p className="mt-1 text-xs text-zinc-500">{pkg.audience}</p>
                      <p className="mt-2 text-sm font-bold text-brand-dark">{formatLkr(pkg.priceLkr)}</p>
                      <div className="mt-3 flex gap-2">
                        <Link href={`/packages/${pkg.slug}`} className="rounded-[8px] bg-brand-main px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark transition-colors">
                          View Package
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6">
              <h3 className="text-[22px] font-bold font-heading text-foreground">FAQ</h3>
              <div className="mt-4 space-y-4">
                {faqItems.map((faq) => (
                  <div key={faq.q} className="rounded-[12px] border border-zinc-200 bg-white p-4">
                    <p className="text-sm font-semibold text-zinc-900">{faq.q}</p>
                    <p className="mt-2 text-sm text-zinc-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-[22px] font-bold font-heading text-foreground">Need help now?</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                Start with a quick consultation, compare pricing, or send your current CV for a practical quality review.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/services" className="rounded-[8px] border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-brand-main hover:text-brand-main">Services</Link>
                <Link href="/pricing" className="rounded-[8px] border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-brand-main hover:text-brand-main">Pricing</Link>
                <Link href="/tools" className="rounded-[8px] border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-brand-main hover:text-brand-main">Free Tools</Link>
                <Link href="/contact" className="rounded-[8px] border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-brand-main hover:text-brand-main">Contact</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
