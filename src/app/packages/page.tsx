import Link from "next/link";
import type { Metadata } from "next";
import {
  packageCategories,
  getPackageDisplayPrice,
  serviceOptionChoices,
} from "@/lib/packages-catalog";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Browse All Packages | CV, LinkedIn & Cover Letter Pricing | Chanuka Jeewantha",
  description:
    "Browse every CV writing, LinkedIn, and cover letter package with prices, delivery times, and what's included. Compare Signature (founder-led) and Essentials (supervised) tiers.",
  path: "/packages",
});

export default function PackagesIndexPage() {
  return (
    <>
      <section className="w-full bg-primary text-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-semibold uppercase tracking-[0.18em] text-brand-main">All Packages</p>
          <h1 className="mt-4 font-heading text-[34px] font-bold leading-[1.08] !text-white sm:text-[44px] md:text-[56px]">
            Browse every package, side by side
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Prices, delivery times, and what&apos;s included — visible upfront. No quiz required.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/catalogue" className="btn btn-secondary !border-white/40 !text-white hover:!bg-white/10">
              Need help choosing? Take the quiz
            </Link>
          </div>
        </div>
      </section>

      {packageCategories.map((category) => (
        <section key={category.key} className="w-full px-4 py-12 sm:px-6 md:py-16 odd:bg-bg-cream even:bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-main">
                {category.isPriority ? "Most Popular" : "Service"}
              </p>
              <h2 className="mt-2 font-heading text-[26px] font-bold text-foreground sm:text-[34px]">
                {category.title}
              </h2>
              <p className="mt-2 text-text-body">{category.description}</p>
            </div>

            {serviceOptionChoices.map((option) => {
              const pkgs = category.packages.filter((p) => p.optionKey === option.key);
              if (pkgs.length === 0) return null;
              const isSignature = option.key === "founder-led";
              return (
                <div key={option.key} className="mb-10 last:mb-0">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span
                      className={`badge ${isSignature ? "badge-premium" : "badge-value"}`}
                    >
                      {isSignature ? "Signature" : "Essentials"}
                    </span>
                    <h3 className="font-heading text-[20px] font-semibold text-foreground">
                      {option.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {pkgs.map((pkg) => (
                      <Link
                        key={pkg.slug}
                        href={`/packages/${pkg.slug}`}
                        className={`group relative flex flex-col rounded-[12px] border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                          isSignature
                            ? "border-2 border-brand-main"
                            : "border-zinc-200"
                        }`}
                      >
                        {isSignature && (
                          <span
                            className="absolute inset-x-0 top-0 h-1 rounded-t-[12px] bg-brand-main"
                            aria-hidden="true"
                          />
                        )}
                        {pkg.isMostPopular && (
                          <span className="badge badge-popular absolute -top-2 right-4">Popular</span>
                        )}

                        <h4 className="font-heading text-[18px] font-semibold text-foreground">
                          {pkg.name}
                        </h4>
                        {pkg.description && (
                          <p className="mt-2 text-sm leading-relaxed text-text-body line-clamp-3">
                            {pkg.description}
                          </p>
                        )}

                        <div className="mt-4 flex items-baseline gap-2">
                          <span className="font-heading text-[24px] font-bold text-primary">
                            {getPackageDisplayPrice(pkg)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs uppercase tracking-wider text-text-secondary">
                          Delivery: {pkg.delivery}
                        </p>

                        <ul className="mt-4 space-y-1.5 text-sm text-text-body">
                          {pkg.features.slice(0, 3).map((f) => (
                            <li key={f} className="flex items-start gap-2">
                              <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-main" />
                              <span className="line-clamp-1">{f}</span>
                            </li>
                          ))}
                          {pkg.features.length > 3 && (
                            <li className="text-xs text-text-secondary">
                              +{pkg.features.length - 3} more inclusions
                            </li>
                          )}
                        </ul>

                        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-main group-hover:gap-2 transition-all">
                          View details &amp; order →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section className="w-full bg-primary px-4 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-[26px] font-bold !text-white sm:text-[34px]">
            Still not sure which one fits?
          </h2>
          <p className="mt-3 text-white/80">
            Answer 3 short questions and we&apos;ll recommend the best package for your stage and goals.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/catalogue" className="btn btn-primary">
              Take the 60-second quiz
            </Link>
            <Link href="/contact" className="btn btn-secondary !border-white/40 !text-white hover:!bg-white/10">
              Ask Chanuka directly
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
