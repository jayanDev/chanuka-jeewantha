import type { Metadata } from "next";
import CatalogueClient from "@/app/catalogue/CatalogueQuestionnaireClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "CV Writing Services & Pricing | Signature & Essentials Tiers | Chanuka Jeewantha",
  description:
    "Answer six quick questions to match the right Signature or Essentials CV, LinkedIn, or cover letter package for your experience, delivery timeline, target role, and country.",
  path: "/catalogue",
});

export default function CataloguePage() {
  return <CatalogueClient />;
}
