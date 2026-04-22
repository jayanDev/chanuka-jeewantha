import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppOrderButton from "@/components/WhatsAppOrderButton";
import BackToTop from "@/components/BackToTop";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnalyticsHeartbeat from "@/components/AnalyticsHeartbeat";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SeasonalOfferBanner from "@/components/SeasonalOfferBanner";
import { getServerUser } from "@/lib/auth-server";
import { getBaseUrl } from "@/lib/site-url";
import { TARGET_SEO_KEYWORDS } from "@/lib/seo";

const siteUrl = getBaseUrl();
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const organizationId = `${siteUrl}#organization`;
const websiteId = `${siteUrl}#website`;

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": organizationId,
  name: "Chanuka Jeewantha",
  url: siteUrl,
  image: `${siteUrl}/images/hero-chanuka.jpg`,
  logo: `${siteUrl}/images/hero-chanuka.jpg`,
  description:
    "Professional CV Writing Services, ATS Friendly CV maker, Cover Letter Writing, and LinkedIn Optimization by Career Specialist Chanuka Jeewantha.",
  areaServed: "Sri Lanka",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+94-77-390-2230",
    contactType: "customer service",
    areaServed: "LK",
    availableLanguage: ["English", "Sinhala"],
  },
  sameAs: [
    "https://www.linkedin.com/in/chanuka-jeewantha/",
    "https://www.facebook.com/share/15vdmdB4oE/",
    "https://www.youtube.com/@chanukajeewantha",
    "https://www.fiverr.com/s/kLBDGAb",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: "Chanuka Jeewantha",
  inLanguage: "en-LK",
  publisher: {
    "@id": organizationId,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/blog/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport = {
  themeColor: "#8ac826",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ATS Friendly CV Maker & Professional CV Writing Services | Chanuka Jeewantha",
    template: "%s | Chanuka Jeewantha",
  },
  applicationName: "Chanuka Jeewantha",
  manifest: "/site.webmanifest",
  description:
    "Ranked #1 CV maker in Sri Lanka. I provide Professional CV Writing Services, ATS-friendly CV design, Cover Letter Writing, and complete LinkedIn Optimization.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/icon-192.svg", type: "image/svg+xml" },
    ],
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  keywords: TARGET_SEO_KEYWORDS,
  authors: [{ name: "Chanuka Jeewantha", url: siteUrl }],
  creator: "Chanuka Jeewantha",
  publisher: "Chanuka Jeewantha",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Chanuka Jeewantha - Career Development Specialist",
    description:
      "ATS-friendly CV writing, LinkedIn optimization, personal branding assets, and career strategy services.",
    type: "website",
    url: siteUrl,
    siteName: "Chanuka Jeewantha",
    locale: "en_LK",
    images: [
      {
        url: "/images/hero-chanuka.jpg",
        width: 1200,
        height: 630,
        alt: "Chanuka Jeewantha career services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chanuka Jeewantha - Career Development Specialist",
    description:
      "Career-focused CV, LinkedIn, coaching, and roadmap services designed for real hiring outcomes.",
    images: ["/images/hero-chanuka.jpg"],
    creator: "@chanukajeewantha",
    site: "@chanukajeewantha",
  },
  verification: {
    google: "google-site-verification-code", // Will need real code
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getServerUser();

  return (
    <html
      lang="en-LK"
      className={`${plusJakarta.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <link rel="alternate" type="application/rss+xml" title="Chanuka Jeewantha Blog RSS Feed" href={`${siteUrl}/feed.xml`} />
      </head>
      <body className="min-h-full flex flex-col font-poppins">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[9999] focus:top-4 focus:left-4 focus:rounded-lg focus:bg-brand-main focus:px-4 focus:py-2 focus:text-white focus:font-semibold focus:shadow-lg"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        {gaMeasurementId ? (
          <Suspense fallback={null}>
            <GoogleAnalytics measurementId={gaMeasurementId} />
          </Suspense>
        ) : null}
        <AnalyticsHeartbeat />
        <div id="site-nav">
          <Header initialUser={currentUser} />
          <SeasonalOfferBanner />
          <Breadcrumbs />
        </div>
        <main id="main-content" className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        <WhatsAppOrderButton />
        <BackToTop />
      </body>
    </html>
  );
}
