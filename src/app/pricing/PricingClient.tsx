"use client";

import Link from "next/link";
import {
  formatLkr,
  packageCategories,
  serviceOptionChoices,
  type ServiceOptionKey,
} from "@/lib/packages-catalog";

function getStartingPrice(categoryKey: string, optionKey: ServiceOptionKey): number | null {
  const category = packageCategories.find((item) => item.key === categoryKey);
  const prices = category?.packages
    .filter((pkg) => pkg.optionKey === optionKey)
    .map((pkg) => pkg.priceLkr) ?? [];

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
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
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
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Career Service Starting <span className="text-brand-main">Prices.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/80">
            Final package price depends on service type, experience level, and whether you choose founder-led premium or supervised professional delivery.
          </p>
        </div>
      </section>

      <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="mx-auto max-w-[1512px] px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-2 block font-semibold uppercase tracking-wider text-brand-main">Starting Prices</span>
              <h2 className="font-plus-jakarta text-[30px] font-bold leading-[1.1] text-foreground sm:text-[40px] md:text-[56px]">
                Compare the service menu.
              </h2>
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
                <h3 className="mt-3 min-h-[64px] font-plus-jakarta text-[25px] font-bold leading-tight text-foreground">
                  {category.title.replace(" Packages", "")}
                </h3>
                <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-zinc-600">{category.description}</p>

                <div className="mt-6 space-y-3">
                  {serviceOptionChoices.map((option) => {
                    const price = getStartingPrice(category.key, option.key);
                    return (
                      <div key={option.key} className="rounded-[12px] border border-zinc-200 bg-zinc-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{option.shortTitle}</p>
                            <p className="mt-1 text-xs leading-relaxed text-zinc-500">{option.description}</p>
                          </div>
                          <p className="whitespace-nowrap text-right text-lg font-bold text-foreground">
                            {price === null ? "N/A" : `From ${formatLkr(price)}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
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
            <h3 className="font-plus-jakarta text-[24px] font-bold text-foreground">Supervised bundle discounts</h3>
            <p className="mt-2 text-zinc-700">
              CV + Cover Letter gets 10% off, CV + LinkedIn gets 15% off, and CV + Cover Letter + LinkedIn gets 20% off when all selected services are supervised professional packages.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
