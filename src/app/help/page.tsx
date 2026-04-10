import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Help Center | Career Service Support",
  description:
    "Get help with CV writing, LinkedIn optimization, coaching, and career roadmap support through Chanuka's help center.",
  path: "/help",
  keywords: ["career help center", "CV support", "LinkedIn help"],
});

export default function HelpPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Help", path: "/help" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="w-full py-[120px] bg-zinc-50">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 text-center">
          <span className="text-brand-main font-semibold tracking-wider uppercase mb-3 block">Help Center</span>
          <h1 className="font-plus-jakarta text-[30px] sm:text-[40px] md:text-[56px] font-bold text-foreground leading-[1.1] mb-6">
            Need Career Guidance?
          </h1>
          <p className="text-text-body text-lg leading-relaxed mb-8">
            For CV writing, LinkedIn profile, coaching, or roadmap-related questions, reach out and I will guide you with the best next step.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/faq"
              className="px-[28px] py-[14px] border border-foreground text-foreground hover:bg-foreground hover:text-white rounded-[10px] font-medium transition-colors"
            >
              Browse FAQ
            </Link>
            <Link
              href="/contact"
              className="px-[28px] py-[14px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] font-medium transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/services"
              className="px-[28px] py-[14px] border border-zinc-300 text-foreground hover:border-brand-main hover:text-brand-main rounded-[10px] font-medium transition-colors"
            >
              Explore Services
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/blog" className="rounded-[10px] bg-white px-4 py-2 text-sm font-semibold text-foreground border border-zinc-300 hover:border-brand-main hover:text-brand-main transition-colors">
              Read Blog Guides
            </Link>
            <Link href="/resources" className="rounded-[10px] bg-white px-4 py-2 text-sm font-semibold text-foreground border border-zinc-300 hover:border-brand-main hover:text-brand-main transition-colors">
              View Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
