import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { formatLkr, packageProducts } from "@/lib/packages-catalog";
import PackageActionButtons from "@/components/PackageActionButtons";

export const metadata = buildPageMetadata({
  title: "Bulk CV 10-Pack | Bulk Discount Package",
  description:
    "Build and order the Bulk CV 10-Pack with dynamic CV, Cover Letter, and LinkedIn selection and maximum bulk discount pricing.",
  path: "/offers/bulk-cv-10-pack",
  keywords: ["bulk cv 10 pack", "bulk cv writing", "bulk discount package"],
});

export default function BulkCv10PackPage() {
  const pkg = packageProducts.find((item) => item.slug === "bulk-cv-10-pack");
  if (!pkg) notFound();

  return (
 <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
 <article className="rounded-[20px] border border-zinc-200 bg-white p-6 md:p-8 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-main">Bulk Package</p>
          <h1 className="text-[34px] md:text-[48px] font-bold font-heading text-foreground leading-[1.1]">{pkg.name}</h1>
          <p className="text-lg text-text-body">{pkg.audience}</p>
          <p className="text-xl font-bold text-foreground">From {formatLkr(pkg.priceLkr)}</p>
 <ul className="space-y-1 text-sm text-zinc-600">
            {pkg.features.map((feature) => (
              <li key={feature}>- {feature}</li>
            ))}
          </ul>
          <PackageActionButtons pkg={pkg} />
        </article>
      </div>
    </section>
  );
}
