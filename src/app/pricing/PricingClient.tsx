"use client";

import Link from "next/link";
import {
  formatLkr,
  packageCategories,
} from "@/lib/packages-catalog";

function getLowestStartingPrice(categoryKey: string): number | null {
  const category = packageCategories.find((item) => item.key === categoryKey);
  const prices = category?.packages.map((pkg) => pkg.priceLkr) ?? [];

  if (prices.length === 0) return null;
  return Math.min(...prices);
}

export default function PricingClient() {
  return (
    <>
      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-heading font-extrabold uppercase leading-none">
                PRICING
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Pricing</span>
          </div>
          <h1 className="font-heading text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Choose Your Career Service <span className="text-brand-main">Package</span>
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/80">
            Start with one service or choose a bundle for better value. For the best result, most professionals choose the Career Pack.
          </p>
        </div>
      </section>

      {/* Bundle Packages Section — Primary */}
      <section className="w-full bg-white py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="mx-auto max-w-[1512px] px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="mb-2 block font-semibold uppercase tracking-wider text-brand-main">Recommended</span>
            <h2 className="font-heading text-[30px] font-bold leading-[1.1] text-foreground sm:text-[40px] md:text-[56px]">
              Most clients choose one of these complete packages.
            </h2>
          </div>

          <div className="bundles-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Pack */}
            <div className="bundle-card starter bg-white rounded-[20px] border border-zinc-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
              <span className="bundle-tag inline-block rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 mb-4">For Students &amp; Graduates</span>
              <h3 className="text-[24px] font-bold font-heading text-foreground mb-4">🎓 Starter Pack</h3>
              <div className="bundle-price mb-6">
                <span className="price-amount text-[28px] font-bold text-foreground">LKR 9,500</span>
                <span className="price-original line-through block text-sm text-zinc-400">LKR 11,850</span>
                <span className="price-note block text-sm text-zinc-600">Essentials Tier • Save 20%</span>
              </div>
              <ul className="bundle-includes space-y-2 text-sm text-zinc-700 mb-6">
                <li>✓ Essentials ATS CV</li>
                <li>✓ Cover Letter</li>
                <li>✓ LinkedIn Optimization</li>
                <li>✓ 7-day delivery</li>
              </ul>
              <a href="/catalogue?bundle=starter" className="bundle-cta inline-block w-full text-center px-6 py-3 border border-zinc-300 rounded-[10px] text-zinc-700 font-semibold hover:border-brand-main hover:text-brand-main transition-colors">
                Get Started →
              </a>
            </div>

            {/* Career Pack — MOST POPULAR */}
            <div className="bundle-card career featured bg-white rounded-[20px] border-2 border-[#C9A961] p-6 shadow-lg hover:shadow-xl transition-shadow transform scale-105">
              <span className="bundle-tag-popular inline-block rounded-full bg-[#C9A961] text-white px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4">⭐ MOST POPULAR</span>
              <span className="bundle-tag block rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 mb-4">For Working Professionals</span>
              <h3 className="text-[24px] font-bold font-heading text-foreground mb-4">🚀 Career Pack</h3>
              <div className="bundle-price mb-6">
                <span className="price-amount text-[28px] font-bold text-foreground">LKR 22,500</span>
                <span className="price-original line-through block text-sm text-zinc-400">LKR 30,000</span>
                <span className="price-savings block text-sm font-bold text-[#10B981]">Save LKR 7,500</span>
                <span className="price-note block text-sm text-zinc-600">Signature Tier</span>
              </div>
              <ul className="bundle-includes space-y-2 text-sm text-zinc-700 mb-6">
                <li>✓ Signature ATS CV</li>
                <li>✓ Cover Letter</li>
                <li>✓ LinkedIn Optimization</li>
                <li>✓ Foreign Job CV</li>
                <li>✓ 30-day premium support</li>
                <li>✓ Direct WhatsApp access to Chanuka</li>
              </ul>
              <a href="/catalogue?bundle=career" className="bundle-cta primary inline-block w-full text-center px-6 py-3 bg-[#C9A961] rounded-[10px] text-white font-semibold hover:bg-[#C9A961]/90 transition-colors">
                Choose Career Pack →
              </a>
            </div>

            {/* Executive Pack */}
            <div className="bundle-card executive bg-white rounded-[20px] border border-zinc-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
              <span className="bundle-tag inline-block rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 mb-4">For Senior Professionals</span>
              <h3 className="text-[24px] font-bold font-heading text-foreground mb-4">👑 Executive Pack</h3>
              <div className="bundle-price mb-6">
                <span className="price-amount text-[28px] font-bold text-foreground">LKR 45,000</span>
                <span className="price-original line-through block text-sm text-zinc-400">LKR 60,000</span>
                <span className="price-savings block text-sm font-bold text-[#10B981]">Save LKR 15,000</span>
                <span className="price-note block text-sm text-zinc-600">Signature Tier</span>
              </div>
              <ul className="bundle-includes space-y-2 text-sm text-zinc-700 mb-6">
                <li>✓ Executive Signature CV</li>
                <li>✓ Foreign Job CV</li>
                <li>✓ Executive LinkedIn Optimization</li>
                <li>✓ Executive Cover Letter</li>
                <li>✓ 1-Hour Strategy Consultation</li>
                <li>✓ 60-day premium support</li>
              </ul>
              <a href="/catalogue?bundle=executive" className="bundle-cta inline-block w-full text-center px-6 py-3 border border-zinc-300 rounded-[10px] text-zinc-700 font-semibold hover:border-brand-main hover:text-brand-main transition-colors">
                View Executive Pack →
              </a>
            </div>
          </div>

          <div className="bundles-footer text-center mt-12 space-y-3">
            <p className="text-zinc-500">
              Need help choosing?{" "}
              <a
                href="https://wa.me/94773902230?text=Hi%20Chanuka%2C%20I%20need%20help%20choosing%20a%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#25D366] font-semibold hover:text-[#1fb85a] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.596-.798-6.36-2.144l-.444-.34-3.262 1.093 1.093-3.262-.34-.444A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                Order on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Individual Service Pricing — Secondary */}
      <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="mx-auto max-w-[1512px] px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-2 block font-semibold uppercase tracking-wider text-brand-main">Need Only One Service?</span>
              <h2 className="font-heading text-[30px] font-bold leading-[1.1] text-foreground sm:text-[40px] md:text-[56px]">
                Individual Service Starting Prices
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-600">
                View individual service starting prices below. Exact pricing depends on your career level and selected service tier.
              </p>
            </div>
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Find My Exact Package
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {packageCategories.map((category) => (
              <article key={category.key} className="rounded-[16px] border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-main">
                  {category.isPriority ? "Priority Service" : "Service"}
                </p>
                <h3 className="mt-3 min-h-[64px] font-heading text-[25px] font-bold leading-tight text-foreground">
                  {category.title.replace(" Packages", "")}
                </h3>
                <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-zinc-600">{category.description}</p>

                <div className="mt-6 rounded-[14px] border border-brand-main/20 bg-brand-main/5 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">Starting From</p>
                  <p className="mt-2 font-heading text-[32px] font-bold text-foreground">
                    {(() => {
                      const price = getLowestStartingPrice(category.key);
                      return price === null ? "N/A" : formatLkr(price);
                    })()}
                  </p>
                  <p className="mt-2 text-sm text-zinc-600">
                    Exact price changes after service, experience level, and service option are selected.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href={`/services/packages/${category.key}`}
                    className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
                  >
                    View Packages
                  </Link>
                  <Link
                    href={`/catalogue?service=${category.key}`}
                    className="rounded-[10px] bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-brand-dark"
                  >
                    Catalogue
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[16px] border border-emerald-200 bg-emerald-50 p-6">
            <h3 className="font-heading text-[24px] font-bold text-foreground">Essentials Bundle Discounts</h3>
            <p className="mt-2 text-zinc-700">
              CV + Cover Letter gets 10% off, CV + LinkedIn gets 15% off, and CV + Cover Letter + LinkedIn gets 20% off when all selected services are Essentials packages.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
