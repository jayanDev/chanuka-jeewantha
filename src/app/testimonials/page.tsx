import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Client Testimonials & Reviews | Chanuka Jeewantha CV Writing",
  description:
    "Read verified client testimonials for Chanuka Jeewantha's CV writing, LinkedIn optimization, and career services in Sri Lanka. Real reviews from professionals and graduates.",
  path: "/testimonials",
  keywords: [
    "Chanuka Jeewantha reviews",
    "CV writing testimonials Sri Lanka",
    "LinkedIn optimization reviews",
    "career services client feedback",
  ],
});

export default function TestimonialsPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Testimonials", path: "/testimonials" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <TestimonialsClient />
    </>
  );
}
