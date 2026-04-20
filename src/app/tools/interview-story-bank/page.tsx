import Link from "next/link";
import type { Metadata } from "next";
import InterviewStoryBankClient from "./InterviewStoryBankClient";
import ToolLeadCapture from "@/components/ToolLeadCapture";
import { buildPageMetadata } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";
import { buildBreadcrumbList } from "@/lib/structured-data";

const baseUrl = getBaseUrl();

export const metadata: Metadata = buildPageMetadata({
  title: "Interview Story Bank Builder | Free STAR Answer Tool",
  description:
    "Use this free interview story bank builder to turn work examples into stronger STAR answers for behavioral and panel interviews.",
  path: "/tools/interview-story-bank",
  keywords: ["interview story bank", "star answer tool", "behavioral interview preparation"],
});

export default function InterviewStoryBankPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Interview Story Bank Builder", path: "/tools/interview-story-bank" },
  ]);
  const toolLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Interview Story Bank Builder",
    description:
      "A free browser-based tool for turning work examples into reusable STAR interview answers and a structured story bank.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires a modern web browser",
    url: `${baseUrl}/tools/interview-story-bank`,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "LKR",
    },
    creator: {
      "@type": "Person",
      name: "Chanuka Jeewantha",
      url: `${baseUrl}/about`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/tools" className="hover:text-brand-main transition-colors">Tools</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Interview Story Bank Builder</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] max-w-5xl !text-white">
            Build a reusable <span className="text-brand-main">interview story bank</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">
            Turn raw work examples into stronger STAR answers for behavioral interviews, panel questions, and leadership conversations.
          </p>
        </div>
      </section>

      <section className="w-full bg-zinc-50 dark:bg-zinc-900 py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <InterviewStoryBankClient />
        </div>
      </section>

      <section className="w-full bg-white dark:bg-zinc-900 py-[40px] sm:py-[56px] border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
            <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground">Build interview readiness beyond one answer</h2>
            <p className="mt-3 text-text-body">
              The highest-converting candidates do not memorize random responses. They build a small bank of proof-based stories and adapt them for different questions.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/resources/interview-story-bank-template" className="rounded-[10px] bg-brand-main px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                Free Interview Template
              </Link>
              <Link href="/career-quiz" className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Take Career Quiz
              </Link>
              <Link href="/workshops" className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Explore Workshops
              </Link>
            </div>
          </div>

          <ToolLeadCapture
            title="Get interview prep resources"
            description="Subscribe for behavioral interview frameworks, story-building prompts, and future interview-prep templates."
            buttonLabel="Get Interview Tips"
          />
        </div>
      </section>
    </>
  );
}
