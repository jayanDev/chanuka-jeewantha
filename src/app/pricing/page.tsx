"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  formatLkr,
  packageCategories,
  type PackageCategoryKey,
  type PackageProduct,
} from "@/lib/packages-catalog";
import { buildOfferPreviewHeaders, withOfferPreviewUrl } from "@/lib/offer-preview-client";
import {
  calculateBundlePricing,
  getConfigurableBundleRule,
  isConfigurableBundleSlug,
  type BundleSelection,
} from "@/lib/bundle-pricing";

const bundleCategoryIndex = packageCategories.findIndex((category) => category.key === "bundle-discount");

function getInitialCategoryIndex(): number {
  if (typeof window === "undefined") {
    return bundleCategoryIndex >= 0 ? bundleCategoryIndex : 0;
  }

  const categoryKey = (new URL(window.location.href).searchParams.get("category") ?? "").trim() as PackageCategoryKey;
  if (!categoryKey) {
    return bundleCategoryIndex >= 0 ? bundleCategoryIndex : 0;
  }

  const index = packageCategories.findIndex((category) => category.key === categoryKey);
  return index >= 0 ? index : (bundleCategoryIndex >= 0 ? bundleCategoryIndex : 0);
}

const cvOptions = packageCategories.find((category) => category.key === "cv-writing")?.packages ?? [];
const coverLetterOptions = packageCategories.find((category) => category.key === "cover-letter")?.packages ?? [];
const linkedinOptions = packageCategories.find((category) => category.key === "linkedin")?.packages ?? [];

type ProductRecord = {
  id: string;
  slug: string;
  name: string;
  category: string;
  audience: string;
  priceLkr: number;
  originalPriceLkr?: number;
  discountPercent?: number;
  delivery: string;
  features: string;
};

type AuthMe = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

type BundleSelectionState = {
  cvSlug: string;
  coverLetterSlug: string;
  linkedinSlug: string;
};

async function readJsonSafely(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text();
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

const whatsappNumber = "94773902230";
const fiverrGigUrl = "https://www.fiverr.com/s/kLBDGAb";

const buildWhatsAppUrl = (
  categoryTitle: string,
  packageName: string,
  priceLkr: number,
  delivery: string
) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    [
      "Hello Chanuka, I want to place an order.",
      `Category: ${categoryTitle}`,
      `Package: ${packageName}`,
      `Price: ${formatLkr(priceLkr)}`,
      `Delivery: ${delivery}`,
    ].join("\n")
  )}`;

export default function PricingPage() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(getInitialCategoryIndex);
  const [productsBySlug, setProductsBySlug] = useState<Record<string, ProductRecord>>({});
  const [activeUser, setActiveUser] = useState<AuthMe | null>(null);
  const [feedback, setFeedback] = useState("");
  const [addedBySlug, setAddedBySlug] = useState<Record<string, boolean>>({});
  const [bundleSelections, setBundleSelections] = useState<Record<string, BundleSelectionState>>({});
  const addedTimersRef = useRef<Record<string, number>>({});

  const selectedCategory = packageCategories[selectedCategoryIndex];
  const mobileCategoryIndexes = packageCategories.map((_, index) => index);

  const getBundleSelectionState = (slug: string): BundleSelectionState =>
    bundleSelections[slug] ?? {
      cvSlug: "",
      coverLetterSlug: "",
      linkedinSlug: "",
    };

  const updateBundleSelection = (
    slug: string,
    field: keyof BundleSelectionState,
    value: string
  ) => {
    setBundleSelections((previous) => ({
      ...previous,
      [slug]: {
        ...getBundleSelectionState(slug),
        [field]: value,
      },
    }));
  };

  const jumpToCategory = (key: PackageCategoryKey, index: number) => {
    setSelectedCategoryIndex(index);

    window.requestAnimationFrame(() => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const selector = desktop
        ? `[data-category-anchor-desktop="${key}"]`
        : `[data-category-anchor-mobile="${key}"]`;

      const target = document.querySelector(selector);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [productsRes, authRes] = await Promise.all([
          fetch(withOfferPreviewUrl("/api/products"), { cache: "no-store", headers: buildOfferPreviewHeaders() }),
          fetch(withOfferPreviewUrl("/api/auth/me"), { cache: "no-store", headers: buildOfferPreviewHeaders() }),
        ]);

        const productsPayload = await readJsonSafely(productsRes);
        const authPayload = await readJsonSafely(authRes);

        if (!productsRes.ok) {
          const message = typeof productsPayload.error === "string" ? productsPayload.error : "Failed to load package catalog.";
          setFeedback(message);
          return;
        }

        const map: Record<string, ProductRecord> = {};
        const products = Array.isArray(productsPayload.products) ? (productsPayload.products as ProductRecord[]) : [];
        for (const product of products) {
          map[product.slug] = product;
        }
        setProductsBySlug(map);
        setActiveUser((authPayload.user as AuthMe | null) ?? null);
      } catch {
        setFeedback("Failed to load package catalog.");
      }
    };

    void load();

    return () => {
      const timers = addedTimersRef.current;
      for (const timerId of Object.values(timers)) {
        window.clearTimeout(timerId);
      }
    };
  }, []);

  const addToCart = async (pkg: PackageProduct, bundleSelection?: BundleSelection) => {
    setFeedback("");
    const product = productsBySlug[pkg.slug];
    if (!product) {
      setFeedback("Package catalog is syncing. Please retry in a few seconds.");
      return;
    }

    if (!activeUser) {
      window.location.assign(`/auth/signin?returnTo=${encodeURIComponent("/pricing")}`);
      return;
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: buildOfferPreviewHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ productId: product.id, quantity: 1, bundleSelection }),
      });

      const payload = await readJsonSafely(response);
      if (!response.ok) {
        const message = typeof payload.error === "string" ? payload.error : "Failed to add to cart.";
        setFeedback(message);
        return;
      }

      setFeedback("");
      setAddedBySlug((previous) => ({ ...previous, [pkg.slug]: true }));
      const activeTimer = addedTimersRef.current[pkg.slug];
      if (activeTimer) {
        window.clearTimeout(activeTimer);
      }

      addedTimersRef.current[pkg.slug] = window.setTimeout(() => {
        setAddedBySlug((previous) => ({ ...previous, [pkg.slug]: false }));
      }, 2500);
    } catch {
      setFeedback("Failed to add to cart.");
    }
  };

  const buyNow = (pkg: PackageProduct, bundleSelection?: BundleSelection) => {
    const product = productsBySlug[pkg.slug];
    if (!product) {
      setFeedback("Package catalog is syncing. Please retry in a few seconds.");
      return;
    }

    const checkoutParams = new URLSearchParams({
      mode: "buy_now",
      productId: product.id,
    });
    if (bundleSelection) {
      checkoutParams.set("bundleSelection", JSON.stringify(bundleSelection));
    }

    const checkoutUrl = `/checkout?${checkoutParams.toString()}`;

    if (!activeUser) {
      window.location.assign(`/auth/signin?returnTo=${encodeURIComponent(checkoutUrl)}`);
      return;
    }

    window.location.assign(checkoutUrl);
  };

  const renderCard = (categoryTitle: string, pkg: PackageProduct) => (
    (() => {
      const liveProduct = productsBySlug[pkg.slug];
      let configurableSlug: Parameters<typeof calculateBundlePricing>[0] | null = null;
      if (isConfigurableBundleSlug(pkg.slug)) {
        configurableSlug = pkg.slug;
      }
      const selectionState = getBundleSelectionState(pkg.slug);
      let computedBundlePrice: ReturnType<typeof calculateBundlePricing> | null = null;

      if (configurableSlug && selectionState.cvSlug && selectionState.coverLetterSlug) {
        const bundleRule = getConfigurableBundleRule(configurableSlug);
        const hasRequiredLinkedin = !bundleRule.requireLinkedin || Boolean(selectionState.linkedinSlug);
        if (hasRequiredLinkedin) {
          try {
            const bundleSlug = configurableSlug;
            computedBundlePrice = calculateBundlePricing(bundleSlug, {
              cvSlug: selectionState.cvSlug,
              coverLetterSlug: selectionState.coverLetterSlug,
              linkedinSlug: selectionState.linkedinSlug || undefined,
            });
          } catch {
            computedBundlePrice = null;
          }
        }
      }

      const livePrice = computedBundlePrice?.priceLkr ?? liveProduct?.priceLkr ?? pkg.priceLkr;
      const originalPrice = computedBundlePrice?.originalPriceLkr ?? liveProduct?.originalPriceLkr ?? pkg.priceLkr;
      const discountPercent = computedBundlePrice?.discountPercent ?? liveProduct?.discountPercent ?? 0;
      const isBulkBuy = pkg.slug.startsWith("bulk-cv-");
      const isCvWritingPackage = pkg.category === "CV Writing";
      const selectionReady = !configurableSlug || Boolean(computedBundlePrice);
      const bundleSelectionPayload: BundleSelection | undefined = computedBundlePrice
        ? {
            cvSlug: computedBundlePrice.selection.cvSlug,
            coverLetterSlug: computedBundlePrice.selection.coverLetterSlug,
            linkedinSlug: computedBundlePrice.selection.linkedinSlug || undefined,
          }
        : undefined;

      return (
        <article
      key={pkg.slug}
      className={`rounded-[20px] border bg-white p-8 shadow-sm hover:shadow-lg transition-shadow ${
        pkg.isMostPopular ? "border-brand-main" : "border-zinc-200"
      }`}
    >
      {isBulkBuy && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-[10px] border border-amber-300 bg-amber-50 px-3 py-1.5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">Bulk Buy</span>
        </div>
      )}
      {pkg.isMostPopular && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-[10px] border border-brand-main/40 bg-white px-3 py-1.5 shadow-sm">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-main text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">Client Favorite</span>
        </div>
      )}
      <h4 className="text-[26px] font-bold font-plus-jakarta text-foreground mb-2">{pkg.name}</h4>
      <p className="text-text-body mb-6">{pkg.audience}</p>

      {configurableSlug && (
        <div className="mb-6 rounded-[12px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">Build Package</p>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="text-sm text-zinc-700">
              <span className="mb-1 block font-medium">Step 1 - Select CV Package</span>
              <select
                value={selectionState.cvSlug}
                onChange={(event) => updateBundleSelection(pkg.slug, "cvSlug", event.target.value)}
                className="w-full rounded-[10px] border border-zinc-300 bg-white px-3 py-2"
              >
                <option value="">Choose CV package</option>
                {cvOptions.map((option) => (
                  <option key={option.slug} value={option.slug}>
                    {option.name} - {formatLkr(option.priceLkr)}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm text-zinc-700">
              <span className="mb-1 block font-medium">Step 2 - Select Cover Letter</span>
              <select
                value={selectionState.coverLetterSlug}
                onChange={(event) => updateBundleSelection(pkg.slug, "coverLetterSlug", event.target.value)}
                className="w-full rounded-[10px] border border-zinc-300 bg-white px-3 py-2"
              >
                <option value="">Choose Cover Letter package</option>
                {coverLetterOptions.map((option) => (
                  <option key={option.slug} value={option.slug}>
                    {option.name} - {formatLkr(option.priceLkr)}
                  </option>
                ))}
              </select>
            </label>

            {getConfigurableBundleRule(configurableSlug).requireLinkedin && (
              <label className="text-sm text-zinc-700 md:col-span-2">
                <span className="mb-1 block font-medium">Step 3 - Select LinkedIn Optimization</span>
                <select
                  value={selectionState.linkedinSlug}
                  onChange={(event) => updateBundleSelection(pkg.slug, "linkedinSlug", event.target.value)}
                  className="w-full rounded-[10px] border border-zinc-300 bg-white px-3 py-2"
                >
                  <option value="">Choose LinkedIn package</option>
                  {linkedinOptions.map((option) => (
                    <option key={option.slug} value={option.slug}>
                      {option.name} - {formatLkr(option.priceLkr)}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          {!computedBundlePrice && (
            <p className="mt-3 text-xs font-medium text-amber-700">
              Complete all required selections to calculate final bundle price.
            </p>
          )}
          {computedBundlePrice && (
            <p className="mt-3 text-xs font-semibold text-emerald-700">
              Savings: {formatLkr(computedBundlePrice.originalPriceLkr - computedBundlePrice.priceLkr)} ({computedBundlePrice.discountPercent}% OFF)
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-[12px] bg-zinc-100 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500 mb-1">Price</p>
          <p className="text-lg font-semibold text-foreground">{formatLkr(livePrice)}</p>
          {discountPercent > 0 && originalPrice > livePrice && (
            <p className="text-xs text-zinc-500 line-through">{formatLkr(originalPrice)}</p>
          )}
          {discountPercent > 0 && <p className="text-xs font-semibold text-brand-main">{discountPercent}% OFF</p>}
        </div>
        <div className="rounded-[12px] bg-zinc-100 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500 mb-1">Delivery</p>
          <p className="text-lg font-semibold text-foreground">{pkg.delivery}</p>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-text-body">
            <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void addToCart(pkg, bundleSelectionPayload)}
          disabled={Boolean(addedBySlug[pkg.slug]) || !selectionReady}
          className={`inline-flex items-center justify-center rounded-[10px] px-4 py-2.5 text-sm font-medium text-white transition-colors ${
            addedBySlug[pkg.slug]
              ? "bg-green-600"
              : "bg-foreground hover:bg-brand-dark"
          }`}
        >
          {addedBySlug[pkg.slug] ? "Added" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={() => buyNow(pkg, bundleSelectionPayload)}
          disabled={!selectionReady}
          className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy Now
        </button>
        {isCvWritingPackage && (
          <a
            href={fiverrGigUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[10px] border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
          >
            Order on Fiverr (50% OFF)
          </a>
        )}
        <a
          href={buildWhatsAppUrl(categoryTitle, pkg.name, livePrice, pkg.delivery)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-[10px] bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1fb85a]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </article>
      );
    })()
  );

  return (
    <>
      <section className="w-full bg-foreground text-white pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                PRICING PLANS
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
            Career Packages Built for <span className="text-brand-main">Every Stage.</span>
          </h1>
        </div>
      </section>

      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-zinc-50">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          {bundleCategoryIndex >= 0 && (
            <div className="max-w-5xl mx-auto mb-8 rounded-[20px] border border-emerald-300 bg-gradient-to-r from-emerald-50 to-white p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Bundle Highlight</p>
                  <h3 className="mt-2 text-[26px] font-bold font-plus-jakarta text-foreground">
                    Bundle Discount Packs - Save Up to 30%
                  </h3>
                  <p className="mt-2 text-text-body">
                    Build your Trinity or Duo combo by selecting package tiers and instantly see your bundled savings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => jumpToCategory("bundle-discount", bundleCategoryIndex)}
                  className="inline-flex items-center justify-center rounded-[10px] bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  View Bundle Discounts
                </button>
              </div>
            </div>
          )}

          <div className="text-center mb-16">
            <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">Packages</span>
            <h2 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-plus-jakarta text-foreground leading-[1.1]">
              Store + WhatsApp <span className="text-brand-light pl-2">Ordering</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto rounded-[24px] border border-zinc-200 bg-white p-8 md:p-10 text-center mb-8">
            <h3 className="text-[30px] font-bold font-plus-jakarta text-foreground mb-4">
              Place orders directly from website
            </h3>
            <p className="text-text-body text-lg leading-relaxed">
              Add packages to cart or use Buy Now, then complete checkout with bank transfer reference and payment slip upload.
            </p>
            <p className="mt-4 text-brand-dark font-semibold">Bank transfer only. Slip upload required for order confirmation.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={fiverrGigUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-[10px] bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Order on Fiverr (50% OFF)
              </a>
              <Link
                href="/fiverr-orders"
                className="inline-flex items-center justify-center rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
              >
                View Fiverr CV Offers
              </Link>
            </div>
            {feedback && <p className="mt-4 text-sm font-medium text-brand-dark">{feedback}</p>}
          </div>

          <div className="md:hidden mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500 mb-3">Browse by category</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {mobileCategoryIndexes.map((index) => {
                const category = packageCategories[index];

                return (
                <button
                  key={category.title}
                  type="button"
                  onClick={() => setSelectedCategoryIndex(index)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategoryIndex === index
                      ? "bg-brand-main text-white border-brand-main"
                      : "bg-white text-foreground border-zinc-300"
                  }`}
                >
                  {category.title.replace(" Packages", "")}
                  {category.isPriority ? " - Priority" : ""}
                </button>
                );
              })}
            </div>
          </div>

          <div className="md:hidden">
            <section key={selectedCategory.title} data-category-anchor-mobile={selectedCategory.key}>
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-[30px] font-bold font-plus-jakarta text-foreground">
                    {selectedCategory.title}
                  </h3>
                  {selectedCategory.isPriority && (
                    <span className="rounded-full bg-brand-main/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-dark">
                      Priority Service
                    </span>
                  )}
                </div>
                <p className="text-text-body text-lg">{selectedCategory.description}</p>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {selectedCategory.packages.map((pkg) => renderCard(selectedCategory.title, pkg))}
              </div>
            </section>
          </div>

          <div className="hidden md:block space-y-16">
            {packageCategories.map((category) => (
              <section key={category.title} data-category-anchor-desktop={category.key}>
                <div className="mb-8">
                  <div className="mb-3 flex items-center gap-3">
                    <h3 className="text-[34px] md:text-[42px] font-bold font-plus-jakarta text-foreground">
                      {category.title}
                    </h3>
                    {category.isPriority && (
                      <span className="rounded-full bg-brand-main/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-dark">
                        Priority Service
                      </span>
                    )}
                  </div>
                  <p className="text-text-body text-lg max-w-4xl">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.packages.map((pkg) => renderCard(category.title, pkg))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 text-center flex flex-wrap items-center justify-center gap-3">
            <Link href="/cart" className="inline-block px-[28px] py-[14px] border border-foreground hover:bg-foreground hover:text-white rounded-[10px] font-medium transition-colors">
              Go to Cart
            </Link>
            <Link href="/checkout" className="inline-block px-[28px] py-[14px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] font-medium transition-colors">
              Checkout Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
