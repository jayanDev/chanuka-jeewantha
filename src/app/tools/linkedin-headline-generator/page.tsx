import Link from "next/link";
import type { Metadata } from "next";
import LinkedinHeadlineGeneratorClient from "./LinkedinHeadlineGeneratorClient";
import ToolLeadCapture from "@/components/ToolLeadCapture";
import ExternalToolLaunch from "@/components/ExternalToolLaunch";
import { buildPageMetadata } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";
import { buildBreadcrumbList } from "@/lib/structured-data";

const baseUrl = getBaseUrl();

export const metadata: Metadata = buildPageMetadata({
  title: "LinkedIn Headline Generator | Free Profile Positioning Tool",
  description:
    "Generate stronger LinkedIn headlines using role, specialization, niche, and value signals to improve profile positioning and visibility.",
  path: "/tools/linkedin-headline-generator",
  keywords: ["linkedin headline generator", "linkedin profile headline tool", "linkedin positioning tool"],
});

export default function LinkedinHeadlineGeneratorPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "LinkedIn Headline Generator", path: "/tools/linkedin-headline-generator" },
  ]);
  const toolLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LinkedIn Headline Generator",
    description:
      "A free browser-based tool for generating stronger LinkedIn headlines using role, specialization, niche, and value signals.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires a modern web browser",
    url: `${baseUrl}/tools/linkedin-headline-generator`,
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
            <span className="text-brand-main">LinkedIn Headline Generator</span>
          </div>
          <h1 className="font-heading text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] max-w-5xl !text-white">
            Free <span className="text-brand-main">LinkedIn headline generator</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">
            Build stronger headline options for recruiter visibility, clearer positioning, and a more credible first impression.
          </p>
          <ExternalToolLaunch
            href="https://www.careerstudio.app/linkedin/optimizer/"
            label="Open LinkedIn Optimizer"
            note="This button opens the matching Career Studio LinkedIn tool in a new tab."
          />
        </div>
      </section>

 <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <LinkedinHeadlineGeneratorClient />
        </div>
      </section>

 <section className="w-full bg-white py-[40px] sm:py-[56px] border-t border-zinc-200">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
 <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-[28px] font-bold font-heading text-foreground">Turn a better headline into a stronger profile</h2>
            <p className="mt-3 text-text-body">
              A headline works best when your About section, experience entries, and proof assets support the same positioning story. Use this as the first layer, not the whole brand.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/services/packages/linkedin-optimization" className="rounded-[10px] bg-brand-main px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                LinkedIn Optimization
              </Link>
 <Link href="/services/personal-website" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Personal Website Service
              </Link>
 <Link href="/results" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                See Results
              </Link>
            </div>
          </div>

          <ToolLeadCapture
            title="Get LinkedIn growth tips"
            description="Subscribe for headline ideas, profile positioning tips, and future LinkedIn resources designed for recruiter visibility."
            buttonLabel="Get LinkedIn Tips"
          />
        </div>
      </section>
    </>
  );
}
