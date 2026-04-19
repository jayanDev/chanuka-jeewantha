import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { packageProducts, formatLkr } from "@/lib/packages-catalog";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList, buildProductSchema } from "@/lib/structured-data";

type PackagePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return packageProducts.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packageProducts.find((item) => item.slug === slug);

  if (!pkg) {
    return buildNoIndexMetadata({
      title: "Package Not Found",
      description: "The requested package is unavailable.",
      path: `/packages/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${pkg.name} | Chanuka Packages`,
    description: `${pkg.name} - ${pkg.audience}. Delivery: ${pkg.delivery}. Price: ${formatLkr(pkg.priceLkr)}.`,
    path: `/packages/${slug}`,
    keywords: [pkg.name, pkg.category, "career services", "ATS CV writing"],
  });
}

export default async function PackageSinglePage({ params }: PackagePageProps) {
  const { slug } = await params;
  const pkg = packageProducts.find((item) => item.slug === slug);

  if (!pkg) {
    notFound();
  }

  const hasPackageWord = /\bpackage\b/i.test(pkg.name);
  const packageTitleMain = hasPackageWord ? pkg.name.replace(/\s*package\b/i, "") : pkg.name;
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: pkg.name, path: `/packages/${pkg.slug}` },
  ]);
  const productLd = buildProductSchema({
    name: pkg.name,
    description: `${pkg.audience}. Delivery: ${pkg.delivery}. Includes: ${pkg.features.slice(0, 3).join(", ")}.`,
    path: `/packages/${pkg.slug}`,
    category: pkg.category,
    priceLkr: pkg.priceLkr,
    sku: pkg.slug,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <section className="w-full bg-foreground text-white pt-[120px] md:pt-[180px] pb-[72px] md:pb-[90px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-white/85 font-medium mb-8">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/services" className="hover:text-brand-main transition-colors">Services</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{pkg.name}</span>
          </div>

          <h1 className="text-[32px] sm:text-[44px] md:text-[62px] font-bold font-plus-jakarta leading-[1.08] mb-4 !text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {packageTitleMain}{" "}
            {hasPackageWord && <span className="text-brand-main">Package</span>}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">{pkg.audience}</p>
        </div>
      </section>

      <section className="w-full py-[90px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <article className="rounded-[22px] border border-zinc-200 p-8">
            <p className="text-sm uppercase tracking-wide text-zinc-500 mb-2">Category</p>
            <p className="text-lg font-semibold text-foreground mb-5">{pkg.category}</p>

            <p className="text-sm uppercase tracking-wide text-zinc-500 mb-2">Price</p>
            <p className="text-2xl font-bold font-plus-jakarta text-foreground mb-5">{formatLkr(pkg.priceLkr)}</p>

            <p className="text-sm uppercase tracking-wide text-zinc-500 mb-2">Delivery Time</p>
            <p className="text-lg font-semibold text-foreground mb-8">{pkg.delivery}</p>

            <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground mb-5">What You Get</h2>
            <ul className="space-y-3 mb-10">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-text-body">
                  <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link href="/checkout" className="rounded-[10px] bg-brand-main px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-dark">
                Buy This Package
              </Link>
              <Link href="/contact" className="rounded-[10px] border border-zinc-300 px-6 py-3 font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Ask a Question
              </Link>
            </div>
          </article>

          <aside className="rounded-[22px] border border-zinc-200 p-6 bg-zinc-50 h-fit">
            <h3 className="text-xl font-bold font-plus-jakarta text-foreground mb-3">More Packages</h3>
            <div className="space-y-3">
              {packageProducts
                .filter((item) => item.slug !== pkg.slug)
                .slice(0, 6)
                .map((item) => (
                  <Link key={item.slug} href={`/packages/${item.slug}`} className="block rounded-[10px] border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:border-brand-main hover:text-brand-main">
                    {item.name}
                  </Link>
                ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
