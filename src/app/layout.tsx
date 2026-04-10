import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppOrderButton from "@/components/WhatsAppOrderButton";
import AnalyticsHeartbeat from "@/components/AnalyticsHeartbeat";
import SeasonalOfferBanner from "@/components/SeasonalOfferBanner";
import { getBaseUrl } from "@/lib/site-url";

const siteUrl = getBaseUrl();
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
    "Professional CV writing, LinkedIn optimization, career coaching, and roadmap support by Chanuka Jeewantha.",
  areaServed: "Sri Lanka",
  sameAs: [
    "https://www.linkedin.com/in/chanuka-jeewantha/",
    "https://www.facebook.com/share/15vdmdB4oE/",
    "https://www.youtube.com/@chanukajeewantha",
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
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chanuka Jeewantha - Career Development Specialist",
    template: "%s | Chanuka Jeewantha",
  },
  applicationName: "Chanuka Jeewantha",
  description:
    "Professional CV writing, LinkedIn optimization, career coaching, and roadmap support by Chanuka Jeewantha.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "ATS CV writing Sri Lanka",
    "LinkedIn optimization Sri Lanka",
    "career coach Sri Lanka",
    "professional CV writer",
    "Chanuka Jeewantha",
  ],
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-poppins">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <AnalyticsHeartbeat />
        <Header />
        <SeasonalOfferBanner />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppOrderButton />
      </body>
    </html>
  );
}
