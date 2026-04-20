import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList, buildFaqPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ | Career Services Questions",
  description:
    "Find answers about ATS CV writing, LinkedIn optimization, coaching sessions, delivery timelines, and career support services.",
  path: "/faq",
  keywords: ["career service FAQ", "CV writing questions", "LinkedIn optimization FAQ"],
});

export default function FAQPage() {
  const faqs = [
    {
      q: "What does 100% ATS-friendly CV writing mean?",
      a: "It means your CV is structured for both ATS parsing and recruiter readability with clean headings, role-relevant keywords, and clear achievement-focused content."
    },
    {
      q: "Who are your services best for?",
      a: "I support fresh graduates, mid-level professionals, career switchers, international applicants, and anyone who is not getting interviews despite applying regularly."
    },
    {
      q: "Do you provide LinkedIn optimization as well?",
      a: "Yes. I optimize your headline, About section, experience descriptions, skills strategy, and profile positioning for stronger recruiter visibility and personal branding."
    },
    {
      q: "Can you help if I am changing industries?",
      a: "Absolutely. I help career switchers reframe transferable skills, build role-aligned narratives, and create practical roadmaps to move into new fields."
    },
    {
      q: "Do you offer coaching and roadmap sessions?",
      a: "Yes. Career coaching and roadmap advice are available to help you identify the right next role, close skill gaps, and execute a realistic growth plan."
    }
  ];

  const faqLd = buildFaqPageSchema(
    faqs.map((item) => ({
      question: item.q,
      answer: item.a,
    }))
  );

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                FAQ'S
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">FAQ Area</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Frequently Asked <span className="text-brand-main">Questions.</span>
          </h1>
        </div>
      </section>

      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl flex flex-col gap-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-zinc-50 border border-zinc-200 rounded-[20px] p-6 hover:border-brand-main transition-colors cursor-pointer open:bg-white [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-bold text-[20px] md:text-[24px] font-plus-jakarta text-foreground outline-none">
                  {faq.q}
                  <span className="relative flex-shrink-0 ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 group-open:bg-brand-main group-open:text-white transition-colors text-brand-dark">
                    <svg className="w-5 h-5 transition-transform group-open:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </summary>
                <p className="mt-4 text-text-body text-lg leading-relaxed animate-fadeInUp">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-4xl text-center bg-zinc-50 p-12 rounded-[24px] border border-zinc-200">
             <h3 className="text-[28px] font-bold font-plus-jakarta mb-4 text-foreground">Still have questions?</h3>
             <p className="text-text-body mb-8 text-lg">Can't find the answer you're looking for? Please chat to our friendly team.</p>
             <Link href="/contact" className="px-[32px] py-[16px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] font-medium transition-colors inline-block">
               Get in Touch
             </Link>
          </div>
        </div>
      </section>
    </>
  );
}
