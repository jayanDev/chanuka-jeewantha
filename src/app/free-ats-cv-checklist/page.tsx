import Link from "next/link";
import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/site-url";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free ATS CV Checklist (PDF) — 32-Point Screening Checklist | Chanuka Jeewantha",
  description:
    "Download a free 32-point ATS CV checklist (PDF). Check file format, layout, fonts, headings, keywords, and content quality before you apply. No signup required.",
  path: "/free-ats-cv-checklist",
  keywords: [
    "free ATS CV checklist",
    "ATS resume checklist PDF",
    "CV format checklist Sri Lanka",
    "resume screening checklist",
    "ATS friendly CV checklist download",
  ],
});

const whatsappNumber = "94773902230";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi Chanuka, I downloaded the free ATS CV checklist and I'd like help building my CV."
)}`;

const sections = [
  {
    tag: "FIX FIRST",
    title: "File & Delivery",
    body: "Saved as .docx, no locked-in text-as-image, clean filename — the format that actually gets submitted.",
  },
  {
    tag: "FIX FIRST",
    title: "Layout & Structure",
    body: "Single-column, no tables or text boxes, nothing hidden in headers/footers where parsers skip content.",
  },
  {
    tag: "FIX FIRST",
    title: "Fonts & Formatting",
    body: "ATS-safe fonts only, correct sizes, one bullet style, one consistent date format throughout.",
  },
  {
    tag: "FIX FIRST",
    title: "Section Headings",
    body: "Standard heading names the ATS actually searches for — not creative labels like “My Journey”.",
  },
  {
    tag: "CORE",
    title: "Contact Information",
    body: "Every required field present, sitting in the body of the document, not the header or footer.",
  },
  {
    tag: "CORE",
    title: "Keywords & Core Competencies",
    body: "8–12 relevant terms mirroring the job description language, with acronyms spelled out once.",
  },
  {
    tag: "RANKING",
    title: "Content Quality",
    body: "Action verbs, measurable results, achievements over duty lists, correct length for your career level.",
  },
  {
    tag: "FIX FIRST",
    title: "Final Verification",
    body: "The Jobscan/Resume Worded score check, grammar pass, and a plain-text copy test before you submit.",
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
    title: "Download the PDF",
    body: "Tap download and the checklist saves straight to your device.",
  },
  {
    number: "3",
    title: "Run it against your CV",
    body: "Tick every box, section by section, and fix what fails before you apply.",
  },
];

export default function FreeCvChecklistLandingPage() {
  const offerLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Free ATS-Friendly CV Checklist",
    description:
      "A free, 32-point ATS CV screening checklist in PDF format covering file format, layout, fonts, headings, keywords, and content quality.",
    price: "0",
    priceCurrency: "LKR",
    availability: "https://schema.org/InStock",
    url: `${getBaseUrl()}/free-ats-cv-checklist`,
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
              Free <span className="text-brand-main">32-Point ATS CV Checklist</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Run any CV through this checklist to confirm it will pass automated screening before it
              reaches a recruiter — built by CPRW certified CV writer Chanuka Jeewantha. No email, no
              payment, just a printable PDF.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/free-ats-cv-checklist/download" className="btn btn-primary btn-lg">
                Download Free Checklist →
              </Link>
              <Link
                href="/pricing"
                className="btn btn-secondary btn-lg !border-white/40 !text-white hover:!bg-white/10"
              >
                See CV Writing Packages
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/60">
              ⭐ Trusted by 5000+ professionals · 8 sections, 32 checks
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -inset-3 rounded-[20px] bg-brand-main/20 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[16px] border-2 border-brand-main/40 bg-white p-7 text-primary shadow-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-dark">
                Premium CV Services
              </span>
              <h2 className="mt-2 font-heading text-[22px] font-bold text-primary">ATS-Friendly CV Checklist</h2>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                Run any CV through these checks to confirm it will pass automated screening before it
                reaches a recruiter.
              </p>
              <div className="mt-5 space-y-2.5">
                {["File & Delivery", "Layout & Structure", "Fonts & Formatting", "Section Headings"].map((label) => (
                  <div key={label} className="flex items-center gap-2.5 rounded-[8px] border border-zinc-200 bg-bg-cream px-3 py-2">
                    <span className="h-3.5 w-3.5 flex-shrink-0 rounded-[3px] border-2 border-brand-main" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">{label}</span>
                    <span className="ml-auto rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-700">
                      Fix First
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-[11px] text-text-secondary">+ 4 more sections, 32 checks total</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="w-full bg-bg-cream px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">What's Inside</p>
            <h2 className="font-heading text-[28px] font-bold text-foreground sm:text-[36px]">
              8 sections. 32 checks. One verdict.
            </h2>
            <p className="mt-3 text-text-body">
              Sections 1–4 are the parser gates — a single miss can get a CV rejected before a human
              ever sees it. Sections 5–8 decide how well it ranks once it&apos;s read.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((item) => (
              <div key={item.title} className="card flex flex-col gap-3 p-6">
                <span
                  className={`w-fit rounded-[4px] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    item.tag === "FIX FIRST"
                      ? "bg-red-100 text-red-700"
                      : item.tag === "CORE"
                        ? "bg-brand-main/15 text-brand-dark"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {item.tag}
                </span>
                <h3 className="font-heading text-[18px] font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-body">{item.body}</p>
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
              Get your checklist in under a minute
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
            <Link href="/free-ats-cv-checklist/download" className="btn btn-primary btn-lg">
              Download Free Checklist →
            </Link>
          </div>
        </div>
      </section>

      {/* Pair it with the template */}
      <section className="w-full bg-bg-cream px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label">Recommended Next</p>
          <h2 className="font-heading text-[26px] font-bold text-foreground sm:text-[34px]">
            Pair it with the free CV format
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-text-body">
            Already have a CV format that passes the checklist? Start from our free, fully editable
            ATS-friendly professional CV format in Word.
          </p>
          <div className="mt-6">
            <Link href="/free-ats-cv-template" className="btn btn-secondary">
              Get the Free CV Format →
            </Link>
          </div>
        </div>
      </section>

      {/* Upsell */}
      <section className="w-full bg-primary px-4 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label !text-brand-main">Want It Done For You?</p>
          <h2 className="font-heading text-[28px] font-bold !text-white sm:text-[36px]">
            Skip the checklist — get a CV that already passes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            The checklist is a great self-review tool. If you want a fully personalized,
            keyword-optimized CV built around your target role — scored, verified, and ready to
            submit — explore our Signature and Essentials packages, or message Chanuka directly.
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
