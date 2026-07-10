import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import DownloadClient from "./DownloadClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Download Your Free ATS CV Checklist | Chanuka Jeewantha",
  description:
    "Your free 32-point ATS CV checklist PDF is ready to download. No signup required.",
  path: "/free-ats-cv-checklist/download",
  // Keep the keyword-rich landing page as the canonical/indexed entry point.
  noIndex: true,
});

const whatsappUrl = `https://wa.me/94773902230?text=${encodeURIComponent(
  "Hi Chanuka, I downloaded the free ATS CV checklist and I'd like help building my CV."
)}`;

export default function FreeCvChecklistDownloadPage() {
  return (
    <section className="w-full bg-bg-cream px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-2 text-sm font-medium text-text-secondary">
          <Link href="/free-ats-cv-checklist" className="hover:text-brand-main">
            Free CV Checklist
          </Link>
          <span className="text-brand-main">/</span>
          <span className="text-foreground">Download</span>
        </div>

        <DownloadClient />

        {/* Upsell */}
        <div className="mt-8 rounded-[16px] bg-primary p-6 text-center text-white sm:p-8">
          <h2 className="font-heading text-[22px] font-bold !text-white sm:text-[26px]">
            Want a CV written for you by a certified expert?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/80">
            Get a fully personalized, keyword-optimized CV built around your target role and
            experience level.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/pricing" className="btn btn-primary">
              View CV Packages
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
