import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PackagesPageClient from "./PackagesPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Browse All Packages | CV, LinkedIn & Cover Letter Pricing | Chanuka Jeewantha",
  description:
    "Browse every CV writing, LinkedIn, and cover letter package with prices, delivery times, and what's included. Compare Signature (founder-led) and Essentials (supervised) tiers.",
  path: "/packages",
});

export default function PackagesIndexPage() {
  return <PackagesPageClient />;
}
