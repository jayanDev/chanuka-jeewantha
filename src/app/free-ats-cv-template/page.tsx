import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/site-url";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free ATS-Friendly Professional CV Format (Word) — No Signup | Chanuka Jeewantha",
  description:
    "Download a free, fully editable ATS-friendly professional CV format in Word (.docx). Built by CPRW & CPCC certified CV writer Chanuka Jeewantha. No signup required.",
  path: "/free-ats-cv-template",
  keywords: [
    "free ATS CV template",
    "free CV format Word",
    "ATS friendly CV template Sri Lanka",
    "professional CV format download",
    "free resume template docx",
  ],
});

const whatsappNumber = "94773902230";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi Chanuka, I downloaded the free ATS CV format and I'd like help building my CV."
)}`;

const includes = [
  {
    title: "ATS-Optimized Structure",
    body: "Clean single-column layout that applicant tracking systems can parse without errors.",
  },
  {
    title: "Recruiter-Ready Sections",
    body: "Professional summary, experience, skills, education, and achievements — in the right order.",
  },
  {
    title: "Fully Editable Word File",
    body: "A .docx you can edit in Microsoft Word, Google Docs, or any word processor.",
  },
  {
    title: "Proper Formatting Guides",
    body: "Pre-set fonts, spacing, and headings so your CV looks polished from the first edit.",
  },
];

const steps = [
  {
    number: "1",
    title: "Open the download page",
    body: "Click the button below — no account, no email, no payment.",
  },
  {
    number: "2",
    title: "Download the Word file",
    body: "Tap download and the ATS CV format saves straight to your device.",
  },
  {
    number: "3",
    title: "Edit & apply",
    body: "Replace the sample content with yours and start applying with confidence.",
  },
];

export default function FreeCvTemplateLandingPage() {
  const offerLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Free ATS-Friendly Professional CV Format",
    description:
      "A free, fully editable ATS-friendly professional CV format in Microsoft Word (.docx).",
    price: "0",
    priceCurrency: "LKR",
    availability: "https://schema.org/InStock",
    url: `${getBaseUrl()}/free-ats-cv-template`,
    seller: {
      "@type": "Person",
      name: "Chanuka Jeewantha",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }}
      />

      {/* Hero */}
      <section className="w-full bg-primary px-4 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="badge badge-premium">100% Free · No Signup</span>
            <h1 className="mt-5 font-heading text-[34px] font-bold leading-[1.08] !text-white sm:text-[44px] md:text-[54px]">
              Free <span className="text-brand-main">ATS-Friendly</span> Professional CV Format
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Download a fully editable, recruiter-ready CV format in Microsoft Word — designed by
              CPRW &amp; CPCC certified CV writer Chanuka Jeewantha. No email, no payment, just a
              clean template you can use today.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/free-ats-cv-template/download" className="btn btn-primary btn-lg">
                Download Free Template →
              </Link>
              <Link
                href="/pricing"
                className="btn btn-secondary btn-lg !border-white/40 !text-white hover:!bg-white/10"
              >
                See CV Writing Packages
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/60">
              ⭐ Trusted by 5000+ professionals · Works with Word &amp; Google Docs
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -inset-3 rounded-[20px] bg-brand-main/20 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[16px] border-2 border-brand-main/40 bg-white shadow-2xl">
              <Image
                src="/images/cv-after.jpg"
                alt="Preview of the free ATS-friendly professional CV format"
                width={840}
                height={1188}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="w-full bg-bg-cream px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">What You Get</p>
            <h2 className="font-heading text-[28px] font-bold text-foreground sm:text-[36px]">
              Everything you need in one clean file
            </h2>
            <p className="mt-3 text-text-body">
              This is the same professional foundation used in paid CV builds — yours free.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {includes.map((item) => (
              <div key={item.title} className="card flex gap-4 p-6">
                <span
                  className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-main/15 text-brand-dark"
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-heading text-[19px] font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-body">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to get it */}
      <section className="w-full bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">3 Simple Steps</p>
            <h2 className="font-heading text-[28px] font-bold text-foreground sm:text-[36px]">
              Get your CV format in under a minute
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative rounded-[12px] border border-zinc-200 bg-white p-6 text-center shadow-sm">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-[20px] font-bold text-brand-main">
                  {step.number}
                </span>
                <h3 className="mt-4 font-heading text-[19px] font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/free-ats-cv-template/download" className="btn btn-primary btn-lg">
              Download Free Template →
            </Link>
          </div>
        </div>
      </section>

      {/* Upsell */}
      <section className="w-full bg-primary px-4 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label !text-brand-main">Want It Done For You?</p>
          <h2 className="font-heading text-[28px] font-bold !text-white sm:text-[36px]">
            Prefer a CV written by a certified expert?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            The free format is a great starting point. If you want a fully personalized,
            keyword-optimized CV built around your target role, explore our Signature and
            Essentials packages — or message Chanuka directly.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/pricing" className="btn btn-primary">
              View CV Packages
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary !border-white/40 !text-white hover:!bg-white/10"
            >
              Need help choosing? Order on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
