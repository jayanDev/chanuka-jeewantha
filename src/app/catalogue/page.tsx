import type { Metadata } from "next";
import CatalogueClient from "@/app/catalogue/CatalogueClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Career Service Catalogue | Chanuka Jeewantha",
  description:
    "Answer three quick questions and see the exact CV, LinkedIn, cover letter, foreign job CV, graphical CV, or consultation packages that match you.",
  path: "/catalogue",
});

export default function CataloguePage() {
  return <CatalogueClient />;
}
