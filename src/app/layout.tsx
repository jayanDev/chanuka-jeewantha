import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppOrderButton from "@/components/WhatsAppOrderButton";
import AnalyticsHeartbeat from "@/components/AnalyticsHeartbeat";
import { getBaseUrl } from "@/lib/site-url";

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
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Chanuka Jeewantha - Career Development Specialist",
    template: "%s | Chanuka Jeewantha",
  },
  description:
    "Professional CV writing, LinkedIn optimization, career coaching, and roadmap support by Chanuka Jeewantha.",
  openGraph: {
    title: "Chanuka Jeewantha - Career Development Specialist",
    description:
      "ATS-friendly CV writing, LinkedIn optimization, personal branding assets, and career strategy services.",
    type: "website",
    url: getBaseUrl(),
  },
  twitter: {
    card: "summary_large_image",
    title: "Chanuka Jeewantha - Career Development Specialist",
    description:
      "Career-focused CV, LinkedIn, coaching, and roadmap services designed for real hiring outcomes.",
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
        <AnalyticsHeartbeat />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppOrderButton />
      </body>
    </html>
  );
}
