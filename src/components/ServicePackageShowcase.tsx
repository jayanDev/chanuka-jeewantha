"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AnimatedServiceTextVisual from "@/components/AnimatedServiceTextVisual";
import { formatLkr, type PackageProduct } from "@/lib/packages-catalog";
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

type Props = {
  title: string;
  description: string;
  packages: PackageProduct[];
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

export default function ServicePackageShowcase({ title, description, packages }: Props) {
  const fiverrGigUrl = "https://www.fiverr.com/s/kLBDGAb";
  const [productsBySlug, setProductsBySlug] = useState<Record<string, ProductRecord>>({});
  const [activeUser, setActiveUser] = useState<AuthMe | null>(null);
  const [feedback, setFeedback] = useState("");
  const [addedBySlug, setAddedBySlug] = useState<Record<string, boolean>>({});
  const addedTimersRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const load = async () => {
      try {
        const [productsRes, authRes] = await Promise.all([
          fetch(withOfferPreviewUrl("/api/products"), { cache: "no-store", headers: buildOfferPreviewHeaders() }),
          fetch(withOfferPreviewUrl("/api/auth/me"), { cache: "no-store", headers: buildOfferPreviewHeaders() }),
        ]);

        const productsPayload = await readJsonSafely(productsRes);
        const authPayload = await readJsonSafely(authRes);

        const map: Record<string, ProductRecord> = {};
        const products = Array.isArray(productsPayload.products) ? (productsPayload.products as ProductRecord[]) : [];
        for (const product of products) {
          map[product.slug] = product;
        }

        setProductsBySlug(map);
        setActiveUser((authPayload.user as AuthMe | null) ?? null);
      } catch {
        setFeedback("Unable to load live package data. Please refresh and try again.");
      }
    };

    void load();
    const timers = addedTimersRef.current;

    return () => {
      for (const timerId of Object.values(timers)) {
        window.clearTimeout(timerId);
      }
    };
  }, []);

  const addToCart = async (pkg: PackageProduct) => {
    setFeedback("");
    const product = productsBySlug[pkg.slug];
    if (!product) {
      setFeedback("Package catalog is syncing. Please retry in a few seconds.");
      return;
    }

    if (!activeUser) {
      window.location.assign(`/auth/signin?returnTo=${encodeURIComponent(window.location.pathname)}`);
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

  const buyNow = (pkg: PackageProduct) => {
    setFeedback("");
    const product = productsBySlug[pkg.slug];
    if (!product) {
      setFeedback("Package catalog is syncing. Please retry in a few seconds.");
      return;
    }

    const destination = `/checkout?mode=buy_now&productId=${encodeURIComponent(product.id)}`;
    if (!activeUser) {
      window.location.assign(`/auth/signin?returnTo=${encodeURIComponent(destination)}`);
      return;
    }

    window.location.assign(destination);
  };

  return (
 <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-zinc-50">
      <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
 <div className="max-w-5xl mx-auto rounded-[24px] border border-zinc-200 bg-white p-8 md:p-10 text-center mb-8">
          <h2 className="text-[34px] md:text-[42px] font-bold font-plus-jakarta text-foreground mb-4">{title}</h2>
          <p className="text-text-body text-lg leading-relaxed">{description}</p>
          {feedback && <p className="mt-4 text-sm font-medium text-brand-dark">{feedback}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg) => (
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
              <AnimatedServiceTextVisual label={pkg.name} className="mb-6 min-h-[180px]" />

              {pkg.isMostPopular && (
 <div className="mb-5 inline-flex items-center gap-2 rounded-[10px] border border-brand-main/40 bg-white px-3 py-1.5 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">Client Favorite</span>
                </div>
              )}

              <h3 className="text-[26px] font-bold font-plus-jakarta text-foreground mb-2">{pkg.name}</h3>
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
                <Link
                  href={`/packages/${pkg.slug}`}
 className="inline-flex items-center justify-center rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-brand-main hover:text-brand-main"
                >
                  See Details
                </Link>
                <button
                  type="button"
                  onClick={() => void addToCart(pkg)}
                  disabled={Boolean(addedBySlug[pkg.slug])}
                  className={`inline-flex items-center justify-center rounded-[10px] px-4 py-2.5 text-sm font-medium text-background transition-colors ${
                    addedBySlug[pkg.slug]
                      ? "bg-green-600"
                      : "bg-foreground hover:bg-brand-dark"
                  }`}
                >
                  {addedBySlug[pkg.slug] ? "Added" : "Add to Cart"}
                </button>
                <button
                  type="button"
                  onClick={() => buyNow(pkg)}
                  className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                  Buy Now
                </button>
                {pkg.category === "CV Writing" && (
                  <a
                    href={fiverrGigUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-[10px] border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
                  >
                    Fiverr
                  </a>
                )}
              </div>
            </article>
              );
            })()
          ))}
        </div>

        <div className="mt-16 text-center flex flex-wrap items-center justify-center gap-3">
          <Link href="/cart" className="inline-block px-[28px] py-[14px] border border-foreground hover:bg-foreground hover:text-background rounded-[10px] font-medium transition-colors">
            Go to Cart
          </Link>
          <Link href="/checkout" className="inline-block px-[28px] py-[14px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] font-medium transition-colors">
            Checkout Now
          </Link>
        </div>
      </div>
    </section>
  );
}
