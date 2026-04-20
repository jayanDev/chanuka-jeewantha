import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { formatLkr, packageProducts } from "@/lib/packages-catalog";
import PackageActionButtons from "@/components/PackageActionButtons";

export const metadata = buildPageMetadata({
  title: "Application Duo Bundle | Bundle Discount",
  description:
    "Configure and order the Application Duo Bundle with CV and Cover Letter package selection and instant add-to-cart and buy-now actions.",
  path: "/offers/application-duo-bundle",
  keywords: ["application duo bundle", "bundle discount package", "cv and cover letter bundle"],
});

export default function ApplicationDuoBundlePage() {
  const pkg = packageProducts.find((item) => item.slug === "application-duo-20");
  if (!pkg) notFound();

  return (
 <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
 <article className="rounded-[20px] border border-zinc-200 bg-white p-6 md:p-8 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-main">Bundle Package</p>
          <h1 className="text-[34px] md:text-[48px] font-bold font-plus-jakarta text-foreground leading-[1.1]">{pkg.name}</h1>
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
