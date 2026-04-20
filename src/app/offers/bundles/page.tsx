import Link from "next/link";
import { packageCategories, formatLkr } from "@/lib/packages-catalog";
import { buildPageMetadata } from "@/lib/seo";
import PackageActionButtons from "@/components/PackageActionButtons";

export const metadata = buildPageMetadata({
  title: "Bundle Offer Packages | Chanuka Jeewantha",
  description:
    "Explore bundle and bulk offer package pages with configurable selections, direct add-to-cart actions, buy-now checkout, and full package details.",
  path: "/offers/bundles",
  keywords: ["bundle offers", "bulk discount cv", "career bundle", "bundle discount packages", "bulk cv offers"],
});

const bundleCategory = packageCategories.find((category) => category.key === "bundle-discount");
const bulkCategory = packageCategories.find((category) => category.key === "bulk-discount");

export default function BundleOffersPage() {
  const categories = [bulkCategory, bundleCategory].filter((category) => Boolean(category));

  return (
    <section className="w-full bg-zinc-50 dark:bg-zinc-900 py-[64px] sm:py-[80px] md:py-[96px]">
      <div className="mx-auto w-full max-w-[1512px] px-4 sm:px-6 space-y-8">
        <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-main">Offer Hub</p>
          <h1 className="mt-3 text-[34px] md:text-[48px] font-bold font-plus-jakarta text-foreground leading-[1.1]">
            Bundle Offer Packages
          </h1>
          <p className="mt-3 text-text-body text-lg max-w-3xl">
            Choose from combo bundles and bulk-buy discounts. Build your package tiers from CV Writing, Cover Letter,
            and LinkedIn options to unlock savings.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/offers/bundle-discount-packages"
              className="rounded-[10px] bg-brand-main px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Bundle Discount Packages
            </Link>
            <Link
              href="/offers/bulk-discount-packages"
              className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
            >
              Bulk Discount Packages
            </Link>
          </div>
        </div>

        {categories.map((category) => {
          if (!category) return null;

          return (
            <article key={category.key} className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-[26px] md:text-[32px] font-bold font-plus-jakarta text-foreground">{category.title}</h2>
                <p className="mt-2 text-text-body">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {category.packages.map((pkg) => (
                  <div key={pkg.slug} className="rounded-[14px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{pkg.category}</p>
                    <h3 className="mt-1 text-lg font-bold text-foreground">{pkg.name}</h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{pkg.audience}</p>
                    <p className="mt-3 text-xl font-bold text-foreground">From {formatLkr(pkg.priceLkr)}</p>
                    <ul className="mt-3 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {pkg.features.slice(0, 3).map((feature) => (
                        <li key={feature}>- {feature}</li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <PackageActionButtons pkg={pkg} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
