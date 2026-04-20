import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "404 - Page Not Found | Chanuka Jeewantha",
  description: "The page you are looking for could not be found. Return to the homepage or explore services.",
  path: "/404",
  noIndex: true,
});

export default function Custom404Page() {
  return (
    <section className="w-full min-h-[72vh] bg-foreground text-background flex items-center justify-center py-[120px] px-4">
      <div className="w-full max-w-3xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-main">Error</p>
        <h1 className="font-plus-jakarta text-[72px] md:text-[110px] font-extrabold leading-none text-brand-main">404</h1>
        <h2 className="mt-2 text-[30px] md:text-[44px] font-bold font-plus-jakarta">Page Not Found</h2>
        <p className="mt-5 text-text-light/85 text-[17px] leading-relaxed">
          The page may have moved, expired, or does not exist. You can continue from one of the links below.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="rounded-[10px] bg-brand-main px-5 py-3 font-semibold text-white hover:bg-brand-dark transition-colors">
            Go to Homepage
          </Link>
 <Link href="/pricing" className="rounded-[10px] border border-white/50 px-5 py-3 font-semibold text-white hover:bg-white hover:text-foreground transition-colors">
            View Packages
          </Link>
 <Link href="/contact" className="rounded-[10px] border border-white/50 px-5 py-3 font-semibold text-white hover:bg-white hover:text-foreground transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
