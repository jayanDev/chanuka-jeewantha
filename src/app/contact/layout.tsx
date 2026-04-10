import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact | Career Consultation with Chanuka Jeewantha",
  description:
    "Contact Chanuka Jeewantha for ATS-friendly CV writing, LinkedIn optimization, and career coaching support.",
  path: "/contact",
  keywords: ["contact career coach", "CV consultation", "LinkedIn consultation"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
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
