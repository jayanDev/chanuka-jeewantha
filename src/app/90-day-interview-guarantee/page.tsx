import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList, buildFaqPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "90-Day Interview Guarantee — Terms & Conditions | Chanuka Jeewantha",
  description:
    "Full terms of the 90-Day Interview Guarantee on Dubai and Australia Professional & Executive packages: eligibility, application requirements, proof, and the free-rewrite or 50% refund remedy.",
  path: "/90-day-interview-guarantee",
  keywords: [
    "90 day interview guarantee",
    "CV writing guarantee",
    "Dubai CV guarantee",
    "interview guarantee terms",
  ],
});

const conditions = [
  {
    title: "Minimum 15 relevant applications per month",
    body: "You must apply to at least 15 relevant jobs per month (45+ within the 90 days) that match your experience level and the roles your CV was written for.",
  },
  {
    title: "Applications must match the CV's target",
    body: "Applications must be to roles in the market your package was built for (Dubai/UAE or Australia), matching the seniority and job types targeted by your CV. Applying to unrelated roles or markets does not count toward the guarantee.",
  },
  {
    title: "Use the final delivered documents without edits",
    body: "You must use the final delivered CV and optimized LinkedIn profile as provided. Modifying the documents yourself voids the guarantee, since we can no longer stand behind the result.",
  },
  {
    title: "Proof of applications is required",
    body: "To make a claim you must provide proof of your applications — the Application Tracker sheet we give you at delivery, or equivalent screenshots showing dates, companies, roles, and sources.",
  },
  {
    title: "The 90 days start at final delivery",
    body: "The guarantee period begins on the date your final documents are delivered (after your included revision rounds), not the order date.",
  },
];

const faqs = [
  {
    question: "Which packages include the 90-Day Interview Guarantee?",
    answer:
      "The guarantee is included with the Dubai Professional, Dubai Executive, Australia Professional, and Australia Migration Pro packages. The Dubai Starter and Australia Starter packages do not include the guarantee.",
  },
  {
    question: "What exactly do I get if I don't receive an interview within 90 days?",
    answer:
      "If you meet all guarantee conditions and still receive no interview invitation within 90 days of final delivery, we will first rewrite your CV free of charge. If the rewrite still produces no interview invitation within a further 30 days of active applications, we refund 50% of your package price.",
  },
  {
    question: "Why isn't it a 100% refund?",
    answer:
      "Because interview outcomes depend on more than the CV — how many jobs you apply to, which roles, and your visa situation all matter. The conditional structure is the industry standard used by international firms like TopResume and ZipJob. The rewrite-first remedy means we keep working until it works.",
  },
  {
    question: "How do I make a claim?",
    answer:
      "Message us on WhatsApp within 14 days after your 90-day period ends, attaching your completed Application Tracker (or equivalent proof). We review claims within 5 working days.",
  },
  {
    question: "What is the Application Tracker?",
    answer:
      "A Google Sheet template we send with your final delivery. You log each application's date, company, role, job link, source, and status. It is both your proof for the guarantee and a tool that keeps your job search consistent — which is what actually gets interviews.",
  },
];

export default function GuaranteePage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "90-Day Interview Guarantee", path: "/90-day-interview-guarantee" },
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

      {/* Hero */}
      <section className="w-full bg-primary px-4 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[52px]" aria-hidden="true">🛡️</span>
          <h1 className="mt-4 font-heading text-[32px] font-bold leading-[1.1] !text-white sm:text-[42px] md:text-[50px]">
            90-Day <span className="text-brand-main">Interview Guarantee</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            If you don&apos;t receive at least one interview invitation within 90 days —
            we&apos;ll rewrite your CV free of charge, or refund 50%.
          </p>
          <p className="mt-4 text-sm text-white/60">
            Included with the Dubai Professional &amp; Executive and Australia Professional &amp; Migration Pro packages.
          </p>
        </div>
      </section>

      {/* How the remedy works */}
      <section className="w-full bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="section-label">The Promise</p>
            <h2 className="font-heading text-[26px] font-bold text-foreground sm:text-[34px]">
              How the guarantee works
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="card border-2 !border-brand-main p-7">
              <span className="badge badge-premium">Step 1 — First Remedy</span>
              <h3 className="mt-4 font-heading text-[20px] font-semibold text-foreground">
                Free CV Rewrite
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                If you meet the conditions below and receive no interview invitation within 90 days of
                final delivery, we rewrite your CV from scratch — free of charge — with a fresh strategy
                and repositioning.
              </p>
            </div>
            <div className="card p-7">
              <span className="badge badge-value">Step 2 — Final Remedy</span>
              <h3 className="mt-4 font-heading text-[20px] font-semibold text-foreground">
                50% Refund
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                If the rewritten CV still produces no interview invitation within a further 30 days of
                active, qualifying applications, we refund 50% of your package price.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="w-full bg-bg-cream px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="section-label">The Conditions</p>
            <h2 className="font-heading text-[26px] font-bold text-foreground sm:text-[34px]">
              What keeps your guarantee active
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-text-body">
              A CV can open the door, but only if you knock. These five conditions make the guarantee
              fair for both sides — the same structure used by leading international CV firms.
            </p>
          </div>

          <ol className="mt-10 space-y-4">
            {conditions.map((condition, index) => (
              <li key={condition.title} className="flex gap-4 rounded-[12px] border border-zinc-200 bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary font-heading text-[17px] font-bold text-brand-main">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-heading text-[18px] font-semibold text-foreground">{condition.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-body">{condition.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tracker + check-ins */}
      <section className="w-full bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="section-label">We Stay With You</p>
            <h2 className="font-heading text-[26px] font-bold text-foreground sm:text-[34px]">
              You&apos;re not left alone after delivery
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="card p-7">
              <h3 className="font-heading text-[19px] font-semibold text-foreground">📊 Application Tracker included</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                With your final delivery you receive a ready-made Google Sheet tracker — date, company,
                role, job link, source, status, interview. It keeps your search consistent and doubles
                as your proof if you ever need to claim the guarantee.
              </p>
            </div>
            <div className="card p-7">
              <h3 className="font-heading text-[19px] font-semibold text-foreground">💬 Check-ins on Day 14, 30 &amp; 60</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                We message you on WhatsApp to see how your applications are going, answer questions, and
                remind you of the 15-applications-per-month minimum so your guarantee stays active.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-bg-cream px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="section-label">FAQ</p>
            <h2 className="font-heading text-[26px] font-bold text-foreground sm:text-[34px]">
              Guarantee questions, answered
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

      {/* CTA */}
      <section className="w-full bg-primary px-4 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-[26px] font-bold !text-white sm:text-[34px]">
            Ready to start your Dubai job search — risk managed?
          </h2>
          <p className="mt-3 text-white/80">
            The guarantee is included with the Dubai and Australia Professional-level packages and above.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/dubai#packages" className="btn btn-primary btn-lg">
              View Dubai Packages →
            </Link>
            <Link href="/australia#packages" className="btn btn-primary btn-lg">
              View Australia Packages →
            </Link>
            <Link href="/contact" className="btn btn-secondary !border-white/40 !text-white hover:!bg-white/10">
              Ask a Question First
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
