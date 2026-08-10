import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import DownloadClient from "./DownloadClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Download the Free LinkedIn Headline Formula | Chanuka Jeewantha",
  description:
    "Your free LinkedIn Headline Formula PDF is ready to download. Includes the three-part formula, examples, a worksheet, and five final checks.",
  path: "/free-linkedin-headline-formula/download",
  noIndex: true,
});

const whatsappUrl =
  "https://wa.me/94773902230?text=" +
  encodeURIComponent(
    "Hi Chanuka, I downloaded the LinkedIn Headline Formula and would like help optimizing my LinkedIn profile."
  );

export default function LinkedInHeadlineFormulaDownloadPage() {
  return (
    <section className="w-full bg-bg-cream px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-2 text-sm font-medium text-text-secondary">
          <Link href="/free-linkedin-headline-formula" className="hover:text-brand-main">
            LinkedIn Headline Formula
          </Link>
          <span className="text-brand-main">/</span>
          <span className="text-foreground">Download</span>
        </div>

        <DownloadClient />

        <div className="mt-8 rounded-[16px] bg-primary p-6 text-center text-white sm:p-8">
          <h2 className="font-heading text-[22px] font-bold !text-white sm:text-[26px]">
            Want your full LinkedIn profile professionally optimized?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/80">
            Get your headline, About section, experience, keywords, and positioning aligned with
            your career goals by Chanuka Jeewantha.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/services/linkedin-optimization" className="btn btn-primary">
              View LinkedIn Service
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary !border-white/40 !text-white hover:!bg-white/10"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
