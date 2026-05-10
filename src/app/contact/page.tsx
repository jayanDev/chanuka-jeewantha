import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { getBaseUrl } from "@/lib/site-url";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Chanuka Jeewantha | CV Writing & Career Services Sri Lanka",
  description:
    "Get in touch with Chanuka Jeewantha for professional CV writing, LinkedIn optimization, cover letter writing, and career coaching services in Sri Lanka. Fast response via WhatsApp.",
  path: "/contact",
  keywords: [
    "contact chanuka jeewantha",
    "cv writing service contact",
    "career services sri lanka",
    "linkedin optimization contact",
    "whatsapp cv order",
  ],
});

const baseUrl = getBaseUrl();

export default function ContactPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  const contactPageLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Chanuka Jeewantha",
    url: `${baseUrl}/contact`,
    description:
      "Contact page for professional CV writing, LinkedIn optimization, and career coaching services by Chanuka Jeewantha.",
    mainEntity: {
      "@type": "Person",
      name: "Chanuka Jeewantha",
      url: `${baseUrl}/about`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+94-77-390-2230",
        contactType: "customer service",
        areaServed: "LK",
        availableLanguage: ["English", "Sinhala"],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }}
      />

      {/* Hero Section */}
      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div
          className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap"
          aria-hidden="true"
        >
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="text-[72px] sm:text-[120px] md:text-[200px] font-heading font-extrabold uppercase leading-none"
              >
                CONTACT
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <nav className="flex items-center gap-2 text-text-light font-medium mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs" aria-hidden="true">/</span>
            <span className="text-brand-main">Contact</span>
          </nav>
          <h1 className="font-heading text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] max-w-4xl !text-white">
            Let&apos;s Work <span className="text-brand-main">Together</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-text-light">
            Send your details or reach out directly via WhatsApp for fast, practical career support.
          </p>
        </div>
      </section>

      {/* Client Contact Form Component */}
      <ContactForm />
    </>
  );
}
