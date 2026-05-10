import Link from "next/link";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { packageProducts, formatLkr, getPackageDisplayPrice } from "@/lib/packages-catalog";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList, buildProductSchema } from "@/lib/structured-data";

type PackagePageProps = {
  params: Promise<{ slug: string }>;
};

const retiredPackageRedirects: Record<string, string> = {
  "starter-cv-package": "/packages/student-cv-package",
  "starter-cover-letter": "/packages/student-cover-letter",
  "starter-linkedin-package": "/packages/student-linkedin-package",
};

export async function generateStaticParams() {
  return packageProducts.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (retiredPackageRedirects[slug]) {
    return buildNoIndexMetadata({
      title: "Package Moved",
      description: "This package has moved to the current Student package page.",
      path: `/packages/${slug}`,
    });
  }

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
    description: `${pkg.name} - ${pkg.description ?? pkg.audience}. Delivery: ${pkg.delivery}. Price: ${formatLkr(pkg.priceLkr)}.`,
    path: `/packages/${slug}`,
    keywords: [pkg.name, pkg.category, "career services", "ATS CV writing"],
  });
}

export default async function PackageSinglePage({ params }: PackagePageProps) {
  const { slug } = await params;
  const retiredRedirect = retiredPackageRedirects[slug];
  if (retiredRedirect) {
    permanentRedirect(retiredRedirect);
  }

  const pkg = packageProducts.find((item) => item.slug === slug);

  if (!pkg) {
    notFound();
  }

  const hasSimplePackageWord = /\bpackage\b/i.test(pkg.name) && !pkg.name.includes(" - ");
  const packageTitleMain = hasSimplePackageWord ? pkg.name.replace(/\s*package\b/i, "") : pkg.name;
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: pkg.name, path: `/packages/${pkg.slug}` },
  ]);
  const productLd = buildProductSchema({
    name: pkg.name,
    description: `${pkg.description ?? pkg.audience}. Delivery: ${pkg.delivery}. Includes: ${pkg.features.slice(0, 3).join(", ")}.`,
    path: `/packages/${pkg.slug}`,
    category: pkg.category,
    priceLkr: pkg.priceLkr,
    sku: pkg.slug,
  });

  const whatsappMessage = [
    `Hello Chanuka, I'd like to order: ${pkg.name}`,
    `Price: ${getPackageDisplayPrice(pkg)}`,
    `Delivery: ${pkg.delivery}`,
    "",
    "Please confirm next steps and payment details.",
  ].join("\n");
  const whatsappUrl = `https://wa.me/94773902230?text=${encodeURIComponent(whatsappMessage)}`;

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
      <section className="w-full bg-foreground text-background pt-[120px] md:pt-[180px] pb-[72px] md:pb-[90px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-white/85 font-medium mb-8">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/services" className="hover:text-brand-main transition-colors">Services</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{pkg.name}</span>
          </div>

          <h1 className="text-[32px] sm:text-[44px] md:text-[62px] font-bold font-heading leading-[1.08] mb-4 !text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {packageTitleMain}{" "}
            {hasSimplePackageWord && <span className="text-brand-main">Package</span>}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">{pkg.description ?? pkg.audience}</p>
        </div>
      </section>

 <section className="w-full py-[90px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
 <article className="rounded-[22px] border border-zinc-200 p-8">
            {pkg.description && (
              <>
                <p className="text-sm uppercase tracking-wide text-zinc-500 mb-2">Designed For</p>
                <p className="text-lg leading-relaxed text-text-body mb-8">{pkg.description}</p>
              </>
            )}

            <p className="text-sm uppercase tracking-wide text-zinc-500 mb-2">Category</p>
            <p className="text-lg font-semibold text-foreground mb-5">{pkg.category}</p>

            <p className="text-sm uppercase tracking-wide text-zinc-500 mb-2">Price</p>
            <p className="text-2xl font-bold font-heading text-foreground mb-5">{getPackageDisplayPrice(pkg)}</p>

            <p className="text-sm uppercase tracking-wide text-zinc-500 mb-2">Delivery Time</p>
            <p className="text-lg font-semibold text-foreground mb-8">{pkg.delivery}</p>

            <h2 className="text-[28px] font-bold font-heading text-foreground mb-5">Package Includes</h2>
            <ul className="space-y-3 mb-10">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-text-body">
                  <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {pkg.idealFor && (
              <div className="mb-10 rounded-[16px] border border-brand-main/15 bg-brand-main/5 p-5">
                <h2 className="text-[22px] font-bold font-heading text-foreground mb-3">Ideal For</h2>
                <p className="leading-relaxed text-text-body">{pkg.idealFor}</p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                </svg>
                Order on WhatsApp — Fastest
              </a>
              <p className="text-xs text-zinc-500 -mt-2">Most clients get a response in under 2 hours.</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/catalogue?service=${pkg.serviceKey}&experience=${pkg.experienceKey}&option=${pkg.optionKey}`}
                  className="btn btn-secondary"
                >
                  Order via Form
                </Link>
                <Link href="/contact" className="rounded-[10px] border border-zinc-300 px-6 py-3 font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                  Ask a Question
                </Link>
              </div>
            </div>
          </article>

 <aside className="rounded-[22px] border border-zinc-200 p-6 bg-zinc-50 h-fit">
            <h3 className="text-xl font-bold font-heading text-foreground mb-1">More in {pkg.category}</h3>
            <Link
              href={`/packages#${pkg.serviceKey}`}
              className="block text-xs font-semibold text-brand-main hover:text-brand-dark mb-4"
            >
              View all {pkg.category} packages →
            </Link>
            <div className="space-y-3">
              {packageProducts
                .filter((item) => item.slug !== pkg.slug && item.serviceKey === pkg.serviceKey)
                .sort((a, b) => {
                  if (a.optionKey === pkg.optionKey && b.optionKey !== pkg.optionKey) return -1;
                  if (a.optionKey !== pkg.optionKey && b.optionKey === pkg.optionKey) return 1;
                  return 0;
                })
                .slice(0, 6)
                .map((item) => (
 <Link key={item.slug} href={`/packages/${item.slug}`} className="block rounded-[10px] border border-zinc-200 bg-white px-3 py-2.5 transition hover:border-brand-main">
                    <p className="text-sm font-semibold text-zinc-800 hover:text-brand-main">{item.name}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{item.optionKey === "founder-led" ? "✨ Signature" : "📋 Essentials"} · {item.audience}</p>
                  </Link>
                ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Sticky mobile order bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white shadow-[0_-6px_24px_rgba(10,37,64,0.12)] lg:hidden">
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-shrink">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Price</p>
            <p className="font-heading text-[17px] font-bold text-primary leading-tight">
              {getPackageDisplayPrice(pkg)}
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-[8px] bg-brand-main px-3 py-3 text-sm font-bold text-primary shadow-[0_4px_16px_rgba(201,169,97,0.35)] transition-all active:translate-y-[1px]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
            </svg>
            📱 WhatsApp — Order Now
          </a>
          <Link
            href={`/catalogue?service=${pkg.serviceKey}&experience=${pkg.experienceKey}&option=${pkg.optionKey}`}
            className="inline-flex items-center justify-center rounded-[8px] border-2 border-foreground px-3 py-3 text-sm font-bold text-foreground"
          >
            📋 Form
          </Link>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>

      {/* Spacer so sticky bar doesn't overlap content on mobile */}
      <div className="h-24 lg:hidden" aria-hidden="true" />
    </>
  );
}
