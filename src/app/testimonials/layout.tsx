import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Testimonials | Client Feedback and Reviews",
  description:
    "Read client testimonials and success feedback on CV writing, LinkedIn optimization, and career coaching services.",
  path: "/testimonials",
  keywords: ["career service testimonials", "CV writing reviews", "LinkedIn optimization feedback"],
});

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
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
      {children}
    </>
  );
}
