import type { Metadata } from "next";
import OffersPageClient from "@/app/offers/OffersPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Offers | Chanuka Jeewantha",
  description:
    "View all available website offers and seasonal discounts for CV writing, cover letters, LinkedIn optimization, and CV review packages.",
  path: "/offers",
  keywords: [
    "career service offers",
    "cv writing discounts",
    "linkedin package offers",
    "chanuka jeewantha offers",
  ],
});

export default function OffersPage() {
  return <OffersPageClient />;
}
