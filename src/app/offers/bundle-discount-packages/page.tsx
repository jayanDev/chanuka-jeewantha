import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { formatLkr, packageCategories } from "@/lib/packages-catalog";
import PackageActionButtons from "@/components/PackageActionButtons";

export const metadata = buildPageMetadata({
  title: "Bundle Discount Packages | Chanuka Jeewantha",
  description:
    "Explore Bundle Discount Packages including Career Brand Trinity Bundle and Application Duo Bundle with configurable package selection and direct ordering actions.",
  path: "/offers/bundle-discount-packages",
  keywords: ["bundle discount packages", "career brand trinity bundle", "application duo bundle"],
});

const bundleCategory = packageCategories.find((category) => category.key === "bundle-discount");

export default function BundleDiscountPackagesPage() {
  const packages = bundleCategory?.packages ?? [];

  return (
    <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
      <div className="mx-auto w-full max-w-[1512px] px-4 sm:px-6 space-y-8">
        <div className="rounded-[20px] border border-zinc-200 bg-white p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-main">Bundle Offers</p>
          <h1 className="mt-3 text-[34px] md:text-[48px] font-bold font-plus-jakarta text-foreground leading-[1.1]">
            Bundle Discount Packages
          </h1>
          <p className="mt-3 text-text-body text-lg max-w-3xl">
            Build high-value bundle combinations with dynamic pricing. Choose package tiers and complete your order in
            a few clicks.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/offers/career-brand-trinity-bundle"
              className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
            >
              Career Brand Trinity Bundle Page
            </Link>
            <Link
              href="/offers/application-duo-bundle"
              className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
            >
              Application Duo Bundle Page
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {packages.map((pkg) => (
            <article key={pkg.slug} className="rounded-[20px] border border-zinc-200 bg-white p-6 md:p-8 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{pkg.category}</p>
              <h2 className="text-[26px] font-bold font-plus-jakarta text-foreground">{pkg.name}</h2>
              <p className="text-text-body">{pkg.audience}</p>
              <p className="text-xl font-bold text-foreground">From {formatLkr(pkg.priceLkr)}</p>
              <ul className="space-y-1 text-sm text-zinc-600">
                {pkg.features.slice(0, 4).map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>
              <PackageActionButtons pkg={pkg} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
