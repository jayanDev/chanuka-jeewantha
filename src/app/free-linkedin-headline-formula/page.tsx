import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

const landingPath = "/free-linkedin-headline-formula";

export const metadata: Metadata = buildPageMetadata({
  title: "Free LinkedIn Headline Formula PDF | Chanuka Jeewantha",
  description:
    "Download Chanuka Jeewantha's free LinkedIn Headline Formula PDF with a 3-part structure, before-and-after examples, a worksheet, and five practical rules.",
  path: landingPath,
  keywords: [
    "free LinkedIn headline formula",
    "LinkedIn headline examples",
    "LinkedIn headline for job seekers",
    "LinkedIn profile tips Sri Lanka",
    "LinkedIn headline PDF",
    "Chanuka Jeewantha LinkedIn guide",
  ],
});

const whatsappUrl =
  "https://wa.me/94773902230?text=" +
  encodeURIComponent(
    "Hi Chanuka, I downloaded the LinkedIn Headline Formula and would like help optimizing my LinkedIn profile."
  );

const guideContents = [
  {
    number: "01",
    title: "Why your headline matters",
    body: "Understand where your headline appears and why recruiters use it to decide whether your profile is worth opening.",
  },
  {
    number: "02",
    title: "The 3-part formula",
    body: "Build one clear sentence around who you serve, the result you deliver, and how you create that result.",
  },
  {
    number: "03",
    title: "Before-and-after examples",
    body: "See weak job-title-only headlines rewritten for marketing, HR, software, accounting, and graduate profiles.",
  },
  {
    number: "04",
    title: "Fill-in worksheet",
    body: "Work through the three building blocks and combine your answers into a headline you can publish immediately.",
  },
  {
    number: "05",
    title: "Five final checks",
    body: "Check length, recruiter keywords, buzzwords, the three-second test, and alignment with your About section.",
  },
];

const audience = [
  "Students and fresh graduates who need to communicate value beyond a job title",
  "Professionals who want to appear in more relevant recruiter searches",
  "Career changers repositioning their experience for a new field",
  "Freelancers, consultants, and founders building a clearer personal brand",
];

const steps = [
  {
    number: "1",
    title: "Open the download page",
    body: "Use the button below to continue to the dedicated download page.",
  },
  {
    number: "2",
    title: "Save the free PDF",
    body: "Download the two-page guide to your phone or computer. No signup or payment is required.",
  },
  {
    number: "3",
    title: "Write and test your headline",
    body: "Complete the worksheet, apply the five checks, and update your LinkedIn profile.",
  },
];

export default function FreeLinkedInHeadlineFormulaPage() {
  const offerLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Free LinkedIn Headline Formula",
    description:
      "A free two-page LinkedIn headline guide with a three-part formula, examples, a fill-in worksheet, and five publishing rules.",
    price: "0",
    priceCurrency: "LKR",
    availability: "https://schema.org/InStock",
    url: getBaseUrl() + landingPath,
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

      <section className="w-full overflow-hidden bg-primary px-4 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <span className="badge badge-premium">Free PDF · No Signup</span>
            <h1 className="mt-5 font-heading text-[34px] font-bold leading-[1.08] !text-white sm:text-[44px] md:text-[54px]">
              Turn your LinkedIn headline into a{" "}
              <span className="text-brand-main">reason to click</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              Download Chanuka Jeewantha&apos;s two-page LinkedIn Headline Formula and learn the
              three-part sentence structure that helps recruiters understand who you help, the
              result you deliver, and how you do it.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={landingPath + "/download"} className="btn btn-primary btn-lg">
                Get the Free Formula →
              </Link>
              <Link
                href="/services/linkedin-optimization"
                className="btn btn-secondary btn-lg !border-white/40 !text-white hover:!bg-white/10"
              >
                LinkedIn Optimization Service
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/65">
              <span>✓ 2-page PDF</span>
              <span>✓ Practical examples</span>
              <span>✓ Ready-to-use worksheet</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -inset-6 rounded-full bg-brand-main/20 blur-3xl" aria-hidden="true" />
            <div className="relative rotate-[1.5deg] overflow-hidden rounded-[16px] border border-white/20 bg-white p-2 shadow-2xl transition-transform duration-300 hover:rotate-0">
              <Image
                src="/images/resources/linkedin-headline-formula-preview.png"
                alt="Preview of the free LinkedIn Headline Formula by Chanuka Jeewantha"
                width={1190}
                height={1684}
                priority
                className="h-auto w-full rounded-[10px]"
                sizes="(max-width: 1024px) 420px, 36vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-bg-cream px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label">Inside the Guide</p>
            <h2 className="font-heading text-[28px] font-bold text-foreground sm:text-[36px]">
              One formula. Five practical sections.
            </h2>
            <p className="mt-3 text-text-body">
              This is a focused working guide, not a long ebook. You can understand the method,
              draft your headline, and check it in one sitting.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {guideContents.map((item) => (
              <article key={item.number} className="card p-6">
                <span className="font-heading text-[28px] font-bold text-brand-main">{item.number}</span>
                <h3 className="mt-3 font-heading text-[18px] font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-label">The Core Structure</p>
            <h2 className="font-heading text-[28px] font-bold text-foreground sm:text-[36px]">
              Say more than your job title
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-text-body">
              A strong headline makes your audience and value clear. The worksheet helps you move
              from a generic title to a specific positioning statement recruiters can understand
              in seconds.
            </p>
          </div>

          <div className="rounded-[18px] border border-brand-main/30 bg-primary p-6 text-white shadow-xl sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-main">Copy this structure</p>
            <p className="mt-5 font-heading text-[22px] font-semibold leading-relaxed !text-white sm:text-[28px]">
              I help <span className="text-brand-main">[who you serve]</span> achieve{" "}
              <span className="text-brand-main">[the result]</span>, through{" "}
              <span className="text-brand-main">[how you do it]</span>.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              The PDF explains each part, shows five completed examples, and gives you space to
              write your own version.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-bg-cream px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">Who It Helps</p>
            <h2 className="font-heading text-[28px] font-bold text-foreground sm:text-[36px]">
              Built for professionals at every career stage
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {audience.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[12px] border border-zinc-200 bg-white p-5 shadow-sm">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-main/15 font-bold text-brand-dark">
                  ✓
                </span>
                <p className="text-sm leading-relaxed text-text-body">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">How to Get It</p>
            <h2 className="font-heading text-[28px] font-bold text-foreground sm:text-[36px]">
              Your new headline is three steps away
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="rounded-[12px] border border-zinc-200 bg-white p-6 text-center shadow-sm">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-[20px] font-bold text-brand-main">
                  {step.number}
                </span>
                <h3 className="mt-4 font-heading text-[19px] font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href={landingPath + "/download"} className="btn btn-primary btn-lg">
              Continue to Download →
            </Link>
            <p className="mt-3 text-sm text-text-secondary">No email · No account · No payment</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-primary px-4 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label !text-brand-main">Want the Full Profile Rebuilt?</p>
          <h2 className="font-heading text-[28px] font-bold !text-white sm:text-[36px]">
            Turn your complete LinkedIn profile into a stronger career asset
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            The headline is the first step. Chanuka Jeewantha&apos;s LinkedIn Optimization service
            aligns your headline, About section, experience, keywords, and positioning with the
            opportunities you want to attract.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/services/linkedin-optimization" className="btn btn-primary">
              Explore LinkedIn Optimization
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary !border-white/40 !text-white hover:!bg-white/10"
            >
              Ask Chanuka on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
