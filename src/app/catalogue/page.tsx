import type { Metadata } from "next";
import CatalogueClient from "@/app/catalogue/CatalogueClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "CV Writing Services & Pricing | Signature & Essentials Tiers | Chanuka Jeewantha",
  description:
    "Choose Signature Series (premium, personally crafted) or Essentials (team-crafted, supervised) tiers. ATS CV, LinkedIn, Cover Letter, Foreign Job CV. Bundle discounts up to 25%.",
  path: "/catalogue",
});

export default function CataloguePage() {
  return <CatalogueClient />;
}
