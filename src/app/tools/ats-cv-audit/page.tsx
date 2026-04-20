import Link from "next/link";
import type { Metadata } from "next";
import AtsCvAuditClient from "./AtsCvAuditClient";
import ToolLeadCapture from "@/components/ToolLeadCapture";
import { buildPageMetadata } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";
import { buildBreadcrumbList } from "@/lib/structured-data";

const baseUrl = getBaseUrl();

export const metadata: Metadata = buildPageMetadata({
  title: "ATS CV Audit Tool | Free CV Keyword and Readiness Checker",
  description:
    "Use this free ATS CV audit tool to compare your CV with a job description, spot missing keywords, and improve recruiter readiness.",
  path: "/tools/ats-cv-audit",
  keywords: ["ats cv audit tool", "ats cv checker", "cv keyword checker", "free cv audit"],
});

export default function AtsCvAuditPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "ATS CV Audit Tool", path: "/tools/ats-cv-audit" },
  ]);
  const toolLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ATS CV Audit Tool",
    description:
      "A free browser-based ATS CV audit tool that compares a CV against a target job description and suggests practical improvements.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires a modern web browser",
    url: `${baseUrl}/tools/ats-cv-audit`,
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
            <span className="text-brand-main">ATS CV Audit Tool</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] max-w-5xl !text-white">
            Free <span className="text-brand-main">ATS CV audit</span> before you apply.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">
            Compare your CV against a target job description, review missing keywords, and spot the highest-impact fixes before sending applications.
          </p>
        </div>
      </section>

      <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <AtsCvAuditClient />
        </div>
      </section>

      <section className="w-full bg-white py-[40px] sm:py-[56px] border-t border-zinc-200">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground">What to do after the audit</h2>
            <p className="mt-3 text-text-body">
              If the score is weak, move to CV writing or a professional review. If the score is decent but inconsistent, start with the checklist and strengthen your metrics, keywords, and structure.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/services/packages/cv-writing" className="rounded-[10px] bg-brand-main px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                Professional CV Writing
              </Link>
              <Link href="/services/packages/cv-review" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                CV Review Service
              </Link>
              <Link href="/career-quiz" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Take Career Quiz
              </Link>
            </div>
          </div>

          <ToolLeadCapture
            title="Get ATS tips by email"
            description="Subscribe for ATS CV checklists, role-targeting tips, and future free resources that help you improve application quality."
            buttonLabel="Get ATS Updates"
          />
        </div>
      </section>
    </>
  );
}
