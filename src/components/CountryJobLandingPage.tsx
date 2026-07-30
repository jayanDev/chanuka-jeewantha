import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { CountryJobMarket } from "@/lib/country-job-markets";
import { countryJobMarkets, getCountryJobMarketBySlug } from "@/lib/country-job-markets";
import {
  experienceOptions,
  formatLkr,
  packageProducts,
  type ExperienceKey,
  type PackageProduct,
  type ServiceKey,
} from "@/lib/packages-catalog";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList, buildFaqPageSchema } from "@/lib/structured-data";
import { getBaseUrl } from "@/lib/site-url";

type CountryJobLandingPageProps = {
  market: CountryJobMarket;
};

type CountryService = {
  key: Extract<ServiceKey, "foreign-cv" | "cover-letter" | "linkedin">;
  title: string;
  shortTitle: string;
  description: (market: CountryJobMarket) => string;
};

const countryServices: CountryService[] = [
  {
    key: "foreign-cv",
    title: "Foreign Job CV Writing",
    shortTitle: "Foreign Job CV",
    description: (market) =>
      `A ${market.name}-targeted ${market.documentName} that translates Sri Lankan experience into clear, ATS-readable evidence for overseas recruiters.`,
  },
  {
    key: "cover-letter",
    title: "Professional Cover Letter Writing",
    shortTitle: "Cover Letter",
    description: (market) =>
      `A role-specific letter that explains why your background, motivation and transferable value fit an employer in ${market.name}.`,
  },
  {
    key: "linkedin",
    title: "LinkedIn Account Optimization",
    shortTitle: "LinkedIn Optimization",
    description: (market) =>
      `A recruiter-searchable profile aligned with the same target role, seniority and ${market.name} job-market direction as your application.`,
  },
];

const experienceLabels: Record<ExperienceKey, { title: string; note: string }> = {
  student: { title: "Student / Fresh Graduate", note: "Less than 1 year of experience" },
  professional: { title: "Professional", note: "1–9 years of experience" },
  executive: { title: "Executive", note: "More than 9 years of experience" },
};

function findPackage(
  serviceKey: CountryService["key"],
  experienceKey: ExperienceKey,
  optionKey: "supervised" | "founder-led"
): PackageProduct {
  const item = packageProducts.find(
    (pkg) =>
      pkg.serviceKey === serviceKey &&
      pkg.experienceKey === experienceKey &&
      pkg.optionKey === optionKey
  );

  if (!item) {
    throw new Error(`Missing ${serviceKey}/${experienceKey}/${optionKey} package`);
  }

  return item;
}

function buildWhatsAppUrl(market: CountryJobMarket): string {
  const message = [
    `Hi Chanuka, I am currently in Sri Lanka and applying for jobs in ${market.name}.`,
    "Please help me choose the right Foreign Job CV, Cover Letter and LinkedIn Optimization package for my experience level.",
  ].join(" ");

  return `https://wa.me/94773902230?text=${encodeURIComponent(message)}`;
}

function buildFaqs(market: CountryJobMarket) {
  const priceFloor = Math.min(
    ...packageProducts
      .filter((pkg) => countryServices.some((service) => service.key === pkg.serviceKey))
      .map((pkg) => pkg.priceLkr)
  );

  return [
    {
      question: `Can I order a ${market.name} job ${market.documentName} while I am still in Sri Lanka?`,
      answer: `Yes. These services are designed for Sri Lankans who are planning and applying from Sri Lanka as well as candidates already overseas. Your documents will be positioned around the target role and ${market.destinationLabel}, not around a false claim that you are already there.`,
    },
    {
      question: `Should I call the document a CV or resume for ${market.name}?`,
      answer: `This page uses “${market.documentName}” because that is a common term for the target market. Employers may use CV and resume interchangeably, so the vacancy instructions always take priority over the label.`,
    },
    {
      question: "Which services and prices are shown on this page?",
      answer: `Only Foreign Job CV Writing, Professional Cover Letter Writing and LinkedIn Account Optimization are listed. Prices start from ${formatLkr(priceFloor)} and are shown separately for Student/Fresh Graduate, Professional and Executive levels across Essentials and Signature Series.`,
    },
    {
      question: "What is the difference between Essentials and Signature Series?",
      answer:
        "Essentials is team-crafted under Chanuka's supervision and quality review. Signature Series is personally crafted by Chanuka Jeewantha with deeper country, industry and career-positioning work. The exact catalogue price is shown for every service and experience level.",
    },
    {
      question: `Do you provide a ${market.name} visa, job placement or interview guarantee?`,
      answer:
        "No. This is a professional CV, cover-letter and LinkedIn service, not a recruitment agency, migration adviser or legal service. No ethical writer can guarantee a job or interview. Always verify employers, work eligibility, visa rules and regulated-profession requirements through official sources.",
    },
  ];
}

export function buildCountryLandingMetadata(market: CountryJobMarket): Metadata {
  const documentTerm = market.documentName === "resume" ? "Resume" : "CV";

  return buildPageMetadata({
    title: `${market.name} ${documentTerm} Writing for Sri Lankans | Foreign Job Services`,
    description: market.metaDescription,
    path: `/${market.slug}`,
    keywords: market.keywords,
    ...(market.coverImage
      ? {
          image: {
            url: market.coverImage,
            width: 1200,
            height: 630,
            alt: `${market.name} job CV services by Chanuka Jeewantha`,
          },
        }
      : {}),
  });
}

export default function CountryJobLandingPage({ market }: CountryJobLandingPageProps) {
  const hasCustomCoverImage = Boolean(market.coverImage);
  const faqs = buildFaqs(market);
  const baseUrl = getBaseUrl();
  const allCountryPackages = countryServices.flatMap((service) =>
    experienceOptions.flatMap((experience) => [
      findPackage(service.key, experience.key, "supervised"),
      findPackage(service.key, experience.key, "founder-led"),
    ])
  );
  const relatedMarkets = market.relatedSlugs
    .map((slug) => getCountryJobMarketBySlug(slug))
    .filter((item): item is CountryJobMarket => Boolean(item));

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: `${market.name} Job CV Services`, path: `/${market.slug}` },
  ]);
  const faqLd = buildFaqPageSchema(faqs);
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${market.name} Foreign Job CV, Cover Letter and LinkedIn Optimization`,
    description: market.metaDescription,
    url: `${baseUrl}/${market.slug}`,
    serviceType: "International CV writing and career profile optimization",
    provider: {
      "@type": "Person",
      name: "Chanuka Jeewantha",
      url: baseUrl,
    },
    audience: {
      "@type": "PeopleAudience",
      geographicArea: {
        "@type": "Country",
        name: "Sri Lanka",
      },
    },
    areaServed: market.name,
    offers: allCountryPackages.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      price: pkg.priceLkr,
      priceCurrency: "LKR",
      url: `${baseUrl}/packages/${pkg.slug}`,
      availability: "https://schema.org/InStock",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />

      <section className="relative overflow-hidden bg-primary px-4 pb-16 pt-12 text-white sm:px-6 md:pb-24 md:pt-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 18%, rgba(249,115,22,.65), transparent 25%), radial-gradient(circle at 88% 72%, rgba(255,255,255,.2), transparent 30%)",
          }}
        />
        <div
          className={`relative mx-auto grid max-w-[1240px] items-center gap-12 ${
            hasCustomCoverImage
              ? "lg:grid-cols-[minmax(0,1fr)_520px]"
              : "lg:grid-cols-[minmax(0,1.15fr)_420px]"
          }`}
        >
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
              <Link href="/" className="text-white/70 transition-colors hover:text-brand-main">
                Home
              </Link>
              <span className="text-brand-main">/</span>
              <span className="text-white">{market.name} Job CV Services</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-brand-main/50 bg-brand-main/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-orange-200">
                For Sri Lankans applying overseas
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80">
                {market.region}
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl font-heading text-[38px] font-bold leading-[1.04] !text-white sm:text-[50px] lg:text-[66px]">
              {market.name} Job <span className="text-brand-main">{market.documentName === "resume" ? "Resume" : "CV"}</span> Writing for Sri Lankans
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-semibold text-white">
              {market.heroLine}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/75 md:text-lg">
              Country-focused Foreign Job CV Writing, Professional Cover Letter Writing and
              LinkedIn Account Optimization by Chanuka Jeewantha—built for Sri Lankans who want
              to migrate for work and apply from Sri Lanka with a credible international profile.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#country-prices" className="btn btn-primary btn-lg">
                View all prices
              </a>
              <a
                href={buildWhatsAppUrl(market)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg !border-white/40 !text-white hover:!bg-white/10"
              >
                Discuss my {market.name} application
              </a>
            </div>

            <div className="mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["3", "career levels"],
                ["2", "quality tiers"],
                ["18", "transparent prices"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-brand-main">{value}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/65">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative mx-auto w-full ${
              hasCustomCoverImage ? "max-w-[560px]" : "max-w-[420px]"
            }`}
          >
            <div className="absolute -inset-4 rounded-[34px] bg-brand-main/20 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[30px] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <Image
                src={market.coverImage ?? "/images/about-chanurgka.jpg"}
                alt={
                  hasCustomCoverImage
                    ? `Are you looking for a job in ${market.name}? Country-specific CV services by Chanuka Jeewantha`
                    : `Chanuka Jeewantha, professional CV writer for Sri Lankans targeting jobs in ${market.name}`
                }
                width={hasCustomCoverImage ? 1200 : 600}
                height={hasCustomCoverImage ? 630 : 760}
                priority
                className={
                  hasCustomCoverImage
                    ? "aspect-[1200/630] w-full rounded-[22px] object-cover"
                    : "aspect-[4/5] w-full rounded-[22px] object-cover object-top"
                }
              />
              {!hasCustomCoverImage && (
                <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-primary/90 p-4 shadow-lg backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-main">
                  Sri Lanka&apos;s No. 1 Professional CV Writer
                </p>
                <p className="mt-1 text-xl font-bold text-white">Chanuka Jeewantha</p>
                <p className="mt-1 text-xs text-white/70">CPRW · CPCC · Country-specific career positioning</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm font-semibold text-zinc-700">
          <span>✓ ATS-readable documents</span>
          <span>✓ Exact LKR pricing</span>
          <span>✓ Sri Lanka-based support</span>
          <span>✓ No false job or visa guarantees</span>
        </div>
      </section>

      <section className="bg-zinc-50 px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <article>
            <p className="section-label">{market.name} application strategy</p>
            <h2 className="mt-3 max-w-3xl font-heading text-[34px] font-bold leading-tight text-foreground md:text-[46px]">
              Your Sri Lankan experience needs the right international context
            </h2>
            <p className="mt-6 text-base leading-8 text-zinc-700">{market.marketOverview}</p>
            <p className="mt-4 text-base leading-8 text-zinc-700">{market.documentGuidance}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {market.hiringPriorities.map((priority, index) => (
                <div key={priority} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-sm font-bold text-brand-main">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-bold text-foreground">{priority}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[26px] bg-primary p-7 text-white shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-main">
              Common opportunity areas
            </p>
            <h3 className="mt-3 font-heading text-[28px] font-bold !text-white">
              Sectors Sri Lankan applicants often explore
            </h3>
            <ul className="mt-6 space-y-3">
              {market.sectors.map((sector) => (
                <li key={sector} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-main" />
                  <span>{sector}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-sm font-bold text-white">Language and document note</p>
              <p className="mt-2 text-sm leading-6 text-white/70">{market.languageNote}</p>
            </div>
          </aside>
        </div>
      </section>

      <section id="country-prices" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-label">Foreign-job service pricing</p>
            <h2 className="mt-3 font-heading text-[34px] font-bold leading-tight text-foreground md:text-[48px]">
              Every {market.name} application service price
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              These prices come directly from the main catalogue. Choose your experience level,
              then compare Essentials with the founder-led Signature Series. No unrelated local CV
              or graphical CV prices are mixed into this page.
            </p>
          </div>

          <div className="mt-10 grid gap-6">
            {countryServices.map((service, serviceIndex) => (
              <article
                key={service.key}
                className="overflow-hidden rounded-[26px] border border-zinc-200 bg-zinc-50 shadow-sm"
              >
                <div className="grid gap-5 bg-primary px-6 py-6 text-white md:grid-cols-[minmax(0,1fr)_180px] md:items-center md:px-8">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-main text-sm font-black text-white">
                        {serviceIndex + 1}
                      </span>
                      <h3 className="font-heading text-[26px] font-bold !text-white">{service.title}</h3>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
                      {service.description(market)}
                    </p>
                  </div>
                  <Link
                    href={`/catalogue`}
                    className="rounded-xl border border-white/25 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:border-brand-main hover:text-brand-main"
                  >
                    Select in catalogue
                  </Link>
                </div>

                <div className="grid gap-4 p-4 md:grid-cols-3 md:p-6">
                  {experienceOptions.map((experience) => {
                    const essentials = findPackage(service.key, experience.key, "supervised");
                    const signature = findPackage(service.key, experience.key, "founder-led");
                    const label = experienceLabels[experience.key];

                    return (
                      <div key={experience.key} className="rounded-2xl border border-zinc-200 bg-white p-5">
                        <p className="font-bold text-foreground">{label.title}</p>
                        <p className="mt-1 text-xs text-zinc-500">{label.note}</p>

                        <div className="mt-5 space-y-3">
                          <Link
                            href={`/packages/${essentials.slug}`}
                            className="block rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-brand-main"
                          >
                            <span className="text-xs font-bold uppercase tracking-[0.1em] text-zinc-500">
                              Essentials
                            </span>
                            <span className="mt-1 block text-xl font-black text-foreground">
                              {formatLkr(essentials.priceLkr)}
                            </span>
                            <span className="mt-1 block text-xs text-zinc-500">
                              Team-crafted · supervised
                            </span>
                          </Link>
                          <Link
                            href={`/packages/${signature.slug}`}
                            className="block rounded-xl border border-orange-200 bg-orange-50 p-4 transition hover:border-brand-main"
                          >
                            <span className="text-xs font-bold uppercase tracking-[0.1em] text-brand-main">
                              Signature Series
                            </span>
                            <span className="mt-1 block text-xl font-black text-foreground">
                              {formatLkr(signature.priceLkr)}
                            </span>
                            <span className="mt-1 block text-xs text-zinc-600">
                              Personally crafted by Chanuka
                            </span>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[24px] border border-orange-200 bg-orange-50 p-6 text-center md:flex-row md:text-left">
            <div>
              <p className="font-heading text-2xl font-bold text-foreground">
                Not sure which service level fits you?
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Send your current CV, experience level and target role for practical package guidance.
              </p>
            </div>
            <a
              href={buildWhatsAppUrl(market)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary whitespace-nowrap"
            >
              Ask Chanuka on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)]">
            <div>
              <p className="section-label">Application roadmap</p>
              <h2 className="mt-3 font-heading text-[34px] font-bold leading-tight text-foreground">
                From Sri Lanka to a focused {market.name} job search
              </h2>
              <p className="mt-4 leading-7 text-zinc-600">
                A strong document is one part of a responsible overseas job search. Use it with
                accurate research, verified employers and a consistent application process.
              </p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {market.applicationNotes.map((note, index) => (
                <li key={note} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <span className="text-sm font-black text-brand-main">STEP {index + 1}</span>
                  <p className="mt-3 text-sm leading-6 text-zinc-700">{note}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <p className="section-label">Frequently asked questions</p>
              <h2 className="mt-3 font-heading text-[34px] font-bold text-foreground">
                Before you order
              </h2>
              <div className="mt-7 space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                    <summary className="cursor-pointer list-none pr-6 font-bold text-foreground">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-[28px] bg-primary p-7 text-white lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-main">
                Related destinations
              </p>
              <h3 className="mt-3 font-heading text-[28px] font-bold !text-white">
                Compare nearby or similar job markets
              </h3>
              <div className="mt-6 grid gap-3">
                {relatedMarkets.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${related.slug}`}
                    className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-brand-main hover:text-brand-main"
                  >
                    <span>{related.name} job CV services</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
              <p className="mt-7 border-t border-white/15 pt-5 text-xs leading-5 text-white/55">
                Chanuka Jeewantha provides document and career-profile support only. Job placement,
                immigration, legal advice and employer verification are not included.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-16 text-white sm:px-6 md:py-20">
        <div className="mx-auto max-w-[1240px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-main">
            Explore all international job markets
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl font-heading text-[34px] font-bold !text-white md:text-[44px]">
            One Sri Lankan career story, positioned for the right country
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {countryJobMarkets.map((country) => (
              <Link
                key={country.slug}
                href={`/${country.slug}`}
                aria-current={country.slug === market.slug ? "page" : undefined}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  country.slug === market.slug
                    ? "border-brand-main bg-brand-main text-white"
                    : "border-white/20 text-white/75 hover:border-brand-main hover:text-brand-main"
                }`}
              >
                {country.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
