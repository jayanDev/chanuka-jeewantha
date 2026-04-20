import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PricingClient from "./PricingClient";
import { getBaseUrl } from "@/lib/site-url";
import { packageProducts } from "@/lib/packages-catalog";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing & Packages - ATS Friendly CV Maker",
  description:
    "Explore pricing for our ATS-friendly CV writing, cover letters, and LinkedIn optimization bundles. Secure your career documents starting at affordable rates.",
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
