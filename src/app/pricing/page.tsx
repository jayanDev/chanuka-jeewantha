"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatLkr, packageCategories, type PackageProduct } from "@/lib/packages-catalog";
import { buildOfferPreviewHeaders, withOfferPreviewUrl } from "@/lib/offer-preview-client";

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
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [productsBySlug, setProductsBySlug] = useState<Record<string, ProductRecord>>({});
  const [activeUser, setActiveUser] = useState<AuthMe | null>(null);
  const [feedback, setFeedback] = useState("");

  const selectedCategory = packageCategories[selectedCategoryIndex];

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
  }, []);

  const addToCart = async (pkg: PackageProduct) => {
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
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      const payload = await readJsonSafely(response);
      if (!response.ok) {
        const message = typeof payload.error === "string" ? payload.error : "Failed to add to cart.";
        setFeedback(message);
        return;
      }

      setFeedback(`${pkg.name} added to cart.`);
      window.alert(`${pkg.name} added to cart.`);
    } catch {
      setFeedback("Failed to add to cart.");
    }
  };

  const buyNow = (pkg: PackageProduct) => {
    const product = productsBySlug[pkg.slug];
    if (!product) {
      setFeedback("Package catalog is syncing. Please retry in a few seconds.");
      return;
    }

    if (!activeUser) {
      window.location.assign(`/auth/signin?returnTo=${encodeURIComponent(`/checkout?mode=buy_now&productId=${product.id}`)}`);
      return;
    }

    window.location.assign(`/checkout?mode=buy_now&productId=${encodeURIComponent(product.id)}`);
  };

  const renderCard = (categoryTitle: string, pkg: PackageProduct) => (
    (() => {
      const liveProduct = productsBySlug[pkg.slug];
      const livePrice = liveProduct?.priceLkr ?? pkg.priceLkr;
      const originalPrice = liveProduct?.originalPriceLkr ?? pkg.priceLkr;
      const discountPercent = liveProduct?.discountPercent ?? 0;

      return (
        <article
      key={pkg.slug}
      className={`rounded-[20px] border bg-white p-8 shadow-sm hover:shadow-lg transition-shadow ${
        pkg.isMostPopular ? "border-brand-main" : "border-zinc-200"
      }`}
    >
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
          onClick={() => void addToCart(pkg)}
          className="inline-flex items-center justify-center rounded-[10px] bg-foreground px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => buyNow(pkg)}
          className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
        >
          Buy Now
        </button>
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
      <section className="w-full bg-foreground text-white pt-[100px] pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                PRICING PLANS
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Pricing</span>
          </div>
          <h1 className="font-plus-jakarta text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Career Packages Built for <span className="text-brand-main">Every Stage.</span>
          </h1>
        </div>
      </section>

      <section className="w-full py-[96px] bg-zinc-50">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">Packages</span>
            <h2 className="text-[40px] md:text-[56px] font-bold font-plus-jakarta text-foreground leading-[1.1]">
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
            {feedback && <p className="mt-4 text-sm font-medium text-brand-dark">{feedback}</p>}
          </div>

          <div className="md:hidden mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500 mb-3">Browse by category</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {packageCategories.map((category, index) => (
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
                  {category.isPriority ? " • Priority" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <section key={selectedCategory.title}>
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
              <section key={category.title}>
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
