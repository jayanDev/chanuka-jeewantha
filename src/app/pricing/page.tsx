import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PricingClient from "./PricingClient";
import { getBaseUrl } from "@/lib/site-url";
import { packageProducts } from "@/lib/packages-catalog";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing & Packages | ATS CV Writing, LinkedIn Optimization & Career Services Sri Lanka",
  description:
    "View Chanuka Jeewantha's career service packages including ATS CV writing, LinkedIn optimization, cover letters, foreign job CVs, and consultation packages for Sri Lankan professionals.",
  path: "/pricing",
});

export default function PricingPage() {
  const prices = packageProducts.map((p) => p.priceLkr).filter((p) => typeof p === "number" && !isNaN(p));
  const lowPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const highPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const offerCount = packageProducts.length;

  const aggregateOfferLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Professional Career Packages",
    description: "Professional CV Writing and Career Development Packages",
    provider: {
      "@type": "Person",
      name: "Chanuka Jeewantha",
    },
    offers: {
      "@type": "AggregateOffer",
      offerCount: offerCount,
      lowPrice: lowPrice,
      highPrice: highPrice,
      priceCurrency: "LKR",
      url: `${getBaseUrl()}/pricing`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateOfferLd) }}
      />
      <PricingClient />
    </>
  );
}
