import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing | CV, LinkedIn, and Career Packages",
  description:
    "Compare CV writing, cover letter, LinkedIn optimization, and coaching package pricing from Chanuka Jeewantha.",
  path: "/pricing",
  keywords: ["career services pricing", "CV package price", "LinkedIn optimization price"],
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  );
}
