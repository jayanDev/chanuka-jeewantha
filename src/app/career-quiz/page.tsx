import Link from "next/link";
import type { Metadata } from "next";
import CareerQuizClient from "./CareerQuizClient";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { getBaseUrl } from "@/lib/site-url";

const baseUrl = getBaseUrl();

export const metadata: Metadata = buildPageMetadata({
  title: "Career Quiz | Find the Right CV, LinkedIn, or Personal Brand Service",
  description:
    "Take a quick career quiz to discover the best next step for your CV, LinkedIn profile, interview preparation, or digital presence.",
  path: "/career-quiz",
  keywords: [
    "career quiz",
    "cv service recommender",
    "linkedin service finder",
    "career package quiz",
  ],
});

export default function CareerQuizPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Career Quiz", path: "/career-quiz" },
  ]);

  const quizLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Career Quiz",
    url: `${baseUrl}/career-quiz`,
    description:
      "A browser-based decision quiz that recommends the best next step for CV writing, LinkedIn optimization, interview preparation, and digital presence.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizLd) }}
      />

      <section className="w-full bg-foreground text-white pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                CAREER QUIZ
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Career Quiz</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] max-w-5xl !text-white">
            Not sure what you need? <span className="text-brand-main">Use the quiz.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">
            Answer a few quick questions and get a practical next-step recommendation across CV writing, LinkedIn optimization, interview prep, and digital presence.
          </p>
        </div>
      </section>

      <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <CareerQuizClient />
        </div>
      </section>
    </>
  );
}
