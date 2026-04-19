import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList, buildOfferCatalogSchema } from "@/lib/structured-data";
import { packageCategories } from "@/lib/packages-catalog";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing | CV Writing Services, CV Maker & Linkedin Optimization",
  description:
    "Compare Professional CV Writing Services, ATS Friendly CV creation packages, and LinkedIn Optimization pricing by career expert Chanuka Jeewantha.",
  path: "/pricing",
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]);

  const offerCatalogLd = buildOfferCatalogSchema(
    packageCategories.map((category) => ({
      name: category.title,
      items: category.packages.map((item) => ({
        name: item.name,
        path: `/packages/${item.slug}`,
        priceLkr: item.priceLkr,
        description: item.audience,
      })),
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogLd) }}
      />
      {children}
    </>
  );
}
