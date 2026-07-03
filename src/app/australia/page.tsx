import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList, buildFaqPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Australia CV Writing & Migration Packages for Sri Lankans | ANZSCO-Aligned ATS CV",
  description:
    "Land your Australian job or support your skilled migration with ANZSCO-aligned, Australian-format ATS CVs by CPRW & CPCC certified writer Chanuka Jeewantha. Packages from Rs. 25,000 — with a 90-Day Interview Guarantee.",
  path: "/australia",
  keywords: [
    "Australia CV writing Sri Lanka",
    "Australian resume format",
    "ANZSCO CV",
    "skilled migration CV Sri Lanka",
    "SEEK resume writing",
    "Australia jobs for Sri Lankans",
    "selection criteria writing",
  ],
});

const whatsappNumber = "94773902230";

function buildWhatsAppUrl(packageName: string, priceLkr: string) {
  const message = `Hi Chanuka! YES — I want the ${packageName} (Rs. ${priceLkr}). Please send me the payment details + intake form.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const packages = [
  {
    name: "Australia Starter Package",
    shortName: "Australia Starter",
    priceLkr: "25,000",
    tagline: "For professionals beginning their Australian job search",
    isPopular: false,
    hasGuarantee: false,
    delivery: "4 working days",
    features: [
      {
        title: "Australian-Format ATS CV",
        body: "Written from scratch in the format Australian recruiters expect — no photo, achievement-focused, 3 pages, fully ATS-optimized for SEEK, Indeed & LinkedIn screening systems.",
      },
      {
        title: "LinkedIn Headline & About Rewrite",
        body: "Rewritten with Australian market keywords + location targeting.",
      },
      { title: "1 Revision Round", body: "" },
    ],
    priceNote: "",
  },
  {
    name: "Australia Professional Package",
    shortName: "Australia Professional",
    priceLkr: "45,000",
    tagline: "For skilled professionals targeting Australian jobs or skilled migration",
    isPopular: true,
    hasGuarantee: true,
    delivery: "5 working days",
    features: [
      {
        title: "Australian-Format ATS CV (Migration-Ready)",
        body: "Written from scratch and aligned to your ANZSCO occupation code — so your CV supports both job applications AND your skills assessment. Optimized for SEEK, Indeed & LinkedIn.",
      },
      {
        title: "Full LinkedIn Optimization",
        body: "Complete profile rewrite — headline, about, experience, skills & Australian location targeting. Australian recruiters heavily screen LinkedIn before shortlisting.",
      },
      {
        title: "2 Tailored Cover Letters",
        body: "Australian-style cover letters — a must-have there, unlike the Gulf market.",
      },
      {
        title: "Salary Positioning Guidance",
        body: "How to frame your expectations in AUD without underselling yourself.",
      },
      { title: "2 Revision Rounds + 30-Day Support", body: "" },
    ],
    priceNote: "Less than 1% of the average AUD 85,000+ annual salary you're targeting",
  },
  {
    name: "Australia Migration Pro Package",
    shortName: "Australia Migration Pro",
    priceLkr: "90,000",
    tagline: "The complete document suite for skilled migration & senior roles",
    isPopular: false,
    hasGuarantee: true,
    delivery: "3 working days (priority)",
    features: [
      {
        title: "Migration-Ready Executive CV",
        body: "ANZSCO-aligned, achievement-driven CV built for both skills assessment bodies AND senior-level recruiters.",
      },
      {
        title: "Full LinkedIn Optimization + 4 Ghostwritten Posts",
        body: "Complete transformation plus 4 posts to build visibility with Australian recruiters during your first month.",
      },
      {
        title: "2 Tailored Cover Letters + 1 Selection Criteria Response",
        body: "Including one written response to a key selection criteria — essential for government & healthcare roles.",
      },
      {
        title: "Australian Interview Prep Document",
        body: "Common Australian interview questions, workplace culture insights & how to answer as an overseas candidate.",
      },
      {
        title: "Personal Portfolio One-Pager",
        body: "A clean professional web page to link from your CV & LinkedIn.",
      },
      { title: "Salary & Offer Positioning Guidance", body: "" },
      { title: "3 Revision Rounds + 60-Day Priority Support", body: "" },
    ],
    priceNote: "Your migration journey costs Rs. 15+ lakhs — this is the 5% that determines whether the other 95% pays off",
  },
];

const faqs = [
  {
    question: "How is an Australian CV different from a Sri Lankan or Gulf CV?",
    answer:
      "Australian CVs have no photo, no personal details like visa status on page one, run about 3 pages, and are achievement-focused with measurable results. They must also pass the ATS software used by SEEK, Indeed, and LinkedIn. A Gulf or Sri Lankan format signals immediately that you don't know the local market.",
  },
  {
    question: "What does ANZSCO-aligned mean and why does it matter?",
    answer:
      "ANZSCO is Australia's official occupation classification used in skilled migration. Skills assessment bodies compare your CV against your nominated occupation code's task list. An ANZSCO-aligned CV presents your experience in that language — supporting both your skills assessment and your job applications with one document.",
  },
  {
    question: "Do I need a cover letter and selection criteria responses for Australia?",
    answer:
      "Yes — unlike the Gulf market, Australian employers expect a tailored cover letter with most applications. Government, healthcare, and education roles additionally require written responses to selection criteria. The Professional package includes 2 cover letters; Migration Pro adds a selection criteria response.",
  },
  {
    question: "What is the 90-Day Interview Guarantee?",
    answer:
      "With the Australia Professional and Australia Migration Pro packages: if you don't receive at least one interview invitation within 90 days of final delivery — while meeting the application conditions — we'll rewrite your CV free of charge, or refund 50%. Full conditions are on our guarantee page.",
  },
  {
    question: "How do I order?",
    answer:
      "Tap the WhatsApp button on any package and send the pre-filled message. You'll receive payment details and an intake form, and delivery starts as soon as both are complete.",
  },
];

export default function AustraliaLandingPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Australia CV Packages", path: "/australia" },
  ]);
  const faqLd = buildFaqPageSchema(faqs);

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

      {/* Hero — mirrors homepage layout */}
      <section className="w-full bg-primary px-4 pt-12 pb-16 text-white sm:px-6 md:pt-16 md:pb-24">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 md:flex-row">
          <div className="flex-1">
            <span className="badge badge-premium">For Sri Lankans Targeting Australia</span>
            <h1 className="mt-5 font-heading text-[34px] font-bold leading-[1.08] !text-white sm:text-[44px] md:text-[56px]">
              Land Your <span className="text-brand-main">Australian Job</span> — or Power Your Skilled Migration
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              ANZSCO-aligned, Australian-format ATS CVs, SEEK-ready LinkedIn profiles, cover letters
              and selection criteria — written by CPRW &amp; CPCC certified CV writer Chanuka Jeewantha.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#packages" className="btn btn-primary btn-lg">
                View Australia Packages →
              </a>
              <a
                href={buildWhatsAppUrl("Australia Professional Package", "45,000")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg !border-white/40 !text-white hover:!bg-white/10"
              >
                Chat on WhatsApp
              </a>
            </div>
            <p className="mt-5 text-sm text-white/60">
              🛡️ 90-Day Interview Guarantee on Professional &amp; Migration Pro packages
            </p>
          </div>

          <div className="relative w-full max-w-[420px] flex-1">
            <div className="absolute -inset-3 rounded-[20px] bg-brand-main/20 blur-2xl" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] border-2 border-brand-main/40 shadow-2xl">
              <Image
                src="/images/hero-chanuka.jpg"
                alt="Chanuka Jeewantha — CPRW & CPCC certified CV writer for Australian jobs and skilled migration"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip — cream, like homepage */}
      <section className="w-full border-y border-zinc-200 bg-bg-cream px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 text-center md:grid-cols-4">
          <div>
            <span className="block text-[24px]" aria-hidden="true">🎓</span>
            <strong className="mt-2 block text-sm font-bold text-foreground">CPRW &amp; CPCC Certified</strong>
            <small className="block text-xs text-text-secondary">Internationally certified writer</small>
          </div>
          <div>
            <span className="block text-[24px]" aria-hidden="true">📄</span>
            <strong className="mt-2 block text-sm font-bold text-foreground">5000+ CVs Completed</strong>
            <small className="block text-xs text-text-secondary">Across industries &amp; countries</small>
          </div>
          <div>
            <span className="block text-[24px]" aria-hidden="true">🇦🇺</span>
            <strong className="mt-2 block text-sm font-bold text-foreground">ANZSCO-Aligned CVs</strong>
            <small className="block text-xs text-text-secondary">SEEK, Indeed &amp; LinkedIn ready</small>
          </div>
          <div>
            <span className="block text-[24px]" aria-hidden="true">🛡️</span>
            <strong className="mt-2 block text-sm font-bold text-foreground">90-Day Guarantee</strong>
            <small className="block text-xs text-text-secondary">
              <Link href="/90-day-interview-guarantee" className="underline hover:text-brand-main">
                See conditions
              </Link>
            </small>
          </div>
        </div>
      </section>

      {/* Why Australian format */}
      <section className="w-full bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">Why It Matters</p>
            <h2 className="font-heading text-[28px] font-bold text-foreground sm:text-[36px]">
              Australia plays by different rules
            </h2>
            <p className="mt-3 text-text-body">
              The CV that works in Colombo — or even Dubai — gets screened out in Sydney and Melbourne.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="card p-6">
              <h3 className="font-heading text-[19px] font-semibold text-foreground">A completely different format</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                No photo, no personal details, ~3 pages, achievement-driven. A photo on an Australian CV
                can get it discarded instantly due to anti-discrimination hiring rules.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-heading text-[19px] font-semibold text-foreground">One CV, two jobs to do</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                For skilled migration, your CV is read by assessment bodies against your ANZSCO occupation
                code — not just by recruiters. It must satisfy both audiences at once.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-heading text-[19px] font-semibold text-foreground">Cover letters &amp; selection criteria</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                Australian employers expect tailored cover letters, and government or healthcare roles
                require written selection criteria responses — skills most overseas applicants don&apos;t have.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="w-full bg-bg-cream px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">Australia Packages</p>
            <h2 className="font-heading text-[28px] font-bold text-foreground sm:text-[36px]">
              Choose your Australia package
            </h2>
            <p className="mt-3 text-text-body">
              Order on WhatsApp — reply <strong>&quot;YES&quot;</strong> and receive payment details + intake form instantly.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className={`relative flex flex-col rounded-[16px] bg-white p-7 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl ${
                  pkg.isPopular ? "border-2 border-brand-main lg:-mt-4 lg:pb-10" : "border border-zinc-200"
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute inset-x-0 top-0 h-1 rounded-t-[16px] bg-brand-main" aria-hidden="true" />
                )}
                {pkg.isPopular && (
                  <span className="badge badge-popular absolute -top-3 left-1/2 -translate-x-1/2">
                    ⭐ Most Popular
                  </span>
                )}

                <h3 className="font-heading text-[22px] font-bold text-foreground">{pkg.shortName}</h3>
                <p className="mt-1.5 text-sm italic leading-snug text-text-secondary">{pkg.tagline}</p>

                <p className="mt-5 font-heading text-[32px] font-bold text-primary">
                  Rs. {pkg.priceLkr}
                </p>
                {pkg.priceNote && (
                  <p className="mt-1 text-xs font-semibold text-success">({pkg.priceNote})</p>
                )}

                <ul className="mt-6 flex-grow space-y-4">
                  {pkg.features.map((feature) => (
                    <li key={feature.title} className="flex items-start gap-2.5">
                      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-main/15 text-brand-dark" aria-hidden="true">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-foreground">{feature.title}</span>
                        {feature.body && (
                          <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">
                            {feature.body}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-3 border-t border-zinc-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    ⏱ Delivery: <span className="text-foreground">{pkg.delivery}</span>
                  </p>
                  {pkg.hasGuarantee && (
                    <Link
                      href="/90-day-interview-guarantee"
                      className="inline-flex items-center gap-1.5 rounded-[8px] bg-primary/5 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                    >
                      🛡️ 90-Day Interview Guarantee included — see conditions
                    </Link>
                  )}
                  <a
                    href={buildWhatsAppUrl(pkg.name, pkg.priceLkr)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn w-full ${pkg.isPopular ? "btn-primary" : "btn-secondary"}`}
                  >
                    Reply &quot;YES&quot; on WhatsApp 🚀
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-text-secondary">
            The 90-Day Interview Guarantee is included with Professional &amp; Migration Pro packages.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">How It Works</p>
            <h2 className="font-heading text-[28px] font-bold text-foreground sm:text-[36px]">
              From WhatsApp to interview-ready
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", t: "Reply “YES” on WhatsApp", b: "Pick a package and send the pre-filled message." },
              { n: "2", t: "Payment + intake form", b: "Receive payment details and a short intake form about your experience, ANZSCO code (if migrating) and target roles." },
              { n: "3", t: "We build your Australian profile", b: "CV, LinkedIn, and extras delivered within your package timeline." },
              { n: "4", t: "Apply with the tracker", b: "You get an application tracker sheet — apply consistently and we check in with you." },
            ].map((step) => (
              <div key={step.n} className="rounded-[12px] border border-zinc-200 bg-white p-6 text-center shadow-sm">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-[20px] font-bold text-brand-main">
                  {step.n}
                </span>
                <h3 className="mt-4 font-heading text-[17px] font-semibold text-foreground">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">{step.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-bg-cream px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">FAQ</p>
            <h2 className="font-heading text-[28px] font-bold text-foreground sm:text-[36px]">
              Common questions
            </h2>
          </div>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-[12px] border border-zinc-200 bg-white p-5">
                <summary className="cursor-pointer list-none font-semibold text-primary transition-colors hover:text-brand-main">
                  {faq.question}
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-primary px-4 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-[26px] font-bold !text-white sm:text-[34px]">
            Your Australian career starts with one message
          </h2>
          <p className="mt-3 text-white/80">
            Most clients choose the Australia Professional Package — migration-ready CV, LinkedIn,
            cover letters, and the 90-Day Interview Guarantee.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={buildWhatsAppUrl("Australia Professional Package", "45,000")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Start on WhatsApp 🚀
            </a>
            <a href="#packages" className="btn btn-secondary !border-white/40 !text-white hover:!bg-white/10">
              Compare Packages
            </a>
          </div>
          <p className="mt-6 text-sm text-white/60">
            Targeting Dubai instead?{" "}
            <Link href="/dubai" className="font-semibold text-brand-main underline hover:text-brand-light">
              See our Dubai packages
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
