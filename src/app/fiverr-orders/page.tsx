import { buildPageMetadata } from "@/lib/seo";
import { formatLkr, packageCategories } from "@/lib/packages-catalog";

export const metadata = buildPageMetadata({
  title: "Fiverr CV Orders | 50% Off",
  description:
    "Order any CV Writing package through Fiverr and get 50% off. Compare package prices and place your Fiverr order instantly.",
  path: "/fiverr-orders",
  keywords: ["fiverr cv writing", "50 off cv package", "cv writing discount", "fiverr orders"],
});

const fiverrGigUrl = "https://www.fiverr.com/s/kLBDGAb";
const cvWritingCategory = packageCategories.find((category) => category.key === "cv-writing");

function discountedPrice(priceLkr: number): number {
  return Math.max(1, Math.round(priceLkr * 0.5));
}

export default function FiverrOrdersPage() {
  const packages = cvWritingCategory?.packages ?? [];

  return (
    <section className="w-full bg-zinc-50 dark:bg-zinc-900 py-[64px] sm:py-[80px] md:py-[96px]">
      <div className="mx-auto w-full max-w-[1512px] px-4 sm:px-6 space-y-8">
        <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Fiverr Special</p>
          <h1 className="mt-3 text-[34px] md:text-[48px] font-bold font-plus-jakarta text-foreground leading-[1.1]">
            Fiverr Orders - 50% OFF on All CV Writing Packages
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-text-body">
            Place your CV Writing order through Fiverr and automatically get 50% off the standard website package price.
            Use the button below to order directly from the official gig.
          </p>
          <div className="mt-5">
            <a
              href={fiverrGigUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-[10px] bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Order on Fiverr Now
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => (
            <article key={pkg.slug} className="rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <h2 className="text-xl font-bold font-plus-jakarta text-foreground">{pkg.name}</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{pkg.audience}</p>

              <div className="mt-4 rounded-[12px] bg-zinc-50 dark:bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Standard Price</p>
                <p className="text-sm text-zinc-500 line-through">{formatLkr(pkg.priceLkr)}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-emerald-700">Fiverr Price (50% OFF)</p>
                <p className="text-2xl font-bold text-emerald-700">{formatLkr(discountedPrice(pkg.priceLkr))}</p>
              </div>

              <ul className="mt-4 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                {pkg.features.slice(0, 3).map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>

              <a
                href={fiverrGigUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-[10px] border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
              >
                Order This Package on Fiverr
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
