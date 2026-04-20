"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatLkr, packageProducts } from "@/lib/packages-catalog";

type PublicOffer = {
  id: string;
  title: string;
  discountPercent: number;
  scope: "all" | "selected" | "category";
  selectedServiceSlugs: string[];
  selectedCategories: string[];
  startAtMs: number;
  endAtMs: number;
  startAt: string;
  endAt: string;
  status: "active" | "scheduled" | "expired" | "inactive" | "draft";
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

function formatStatus(status: PublicOffer["status"]): string {
  if (status === "active") return "Active";
  if (status === "scheduled") return "Scheduled";
  if (status === "inactive") return "Inactive";
  if (status === "expired") return "Expired";
  return "Draft";
}

function offerAppliesToPackage(offer: PublicOffer, pkg: (typeof packageProducts)[number]): boolean {
  if (offer.scope === "all") return true;
  if (offer.scope === "selected") return offer.selectedServiceSlugs.includes(pkg.slug);
  return offer.selectedCategories.includes(pkg.category);
}

function computeDiscountedPrice(basePrice: number, discountPercent: number): number {
  return Math.max(1, Math.round(basePrice * (100 - discountPercent) / 100));
}

function getStatusBadgeClass(status: PublicOffer["status"]): string {
  if (status === "active") return "bg-emerald-100 text-emerald-700";
  if (status === "scheduled") return "bg-amber-100 text-amber-700";
  if (status === "inactive") return "bg-zinc-200 text-zinc-700";
  return "bg-zinc-100 text-zinc-600";
}

export default function OffersPageClient() {
  const [offers, setOffers] = useState<PublicOffer[]>([]);
  const [activeUser, setActiveUser] = useState<AuthMe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [addingKey, setAddingKey] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setFeedback("");

        const [offersRes, authRes] = await Promise.all([
          fetch("/api/offers", { cache: "no-store" }),
          fetch("/api/auth/me", { cache: "no-store" }),
        ]);

        const offersPayload = await readJsonSafely(offersRes);
        if (!offersRes.ok) {
          const message =
            typeof offersPayload.error === "string" ? offersPayload.error : "Failed to load offers.";
          setFeedback(message);
          return;
        }

        const authPayload = await readJsonSafely(authRes);
        setActiveUser((authPayload.user as AuthMe | null) ?? null);
        setOffers(Array.isArray(offersPayload.offers) ? (offersPayload.offers as PublicOffer[]) : []);
      } catch {
        setFeedback("Failed to load offers.");
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const offersWithProducts = useMemo(
    () =>
      offers.map((offer) => ({
        ...offer,
        products: packageProducts.filter((pkg) => offerAppliesToPackage(offer, pkg)),
      })),
    [offers]
  );

  const addToCart = async (slug: string) => {
    setFeedback("");

    if (!activeUser) {
      window.location.assign(`/auth/signin?returnTo=${encodeURIComponent("/offers")}`);
      return;
    }

    try {
      setAddingKey(`cart:${slug}`);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: slug, quantity: 1 }),
      });

      const payload = await readJsonSafely(response);
      if (!response.ok) {
        const message = typeof payload.error === "string" ? payload.error : "Failed to add package to cart.";
        setFeedback(message);
        return;
      }

      setFeedback("Package added to cart.");
    } catch {
      setFeedback("Failed to add package to cart.");
    } finally {
      setAddingKey("");
    }
  };

  const buyNow = (slug: string) => {
    if (!activeUser) {
      window.location.assign(
        `/auth/signin?returnTo=${encodeURIComponent(`/checkout?mode=buy_now&productId=${slug}`)}`
      );
      return;
    }

    window.location.assign(`/checkout?mode=buy_now&productId=${encodeURIComponent(slug)}`);
  };

  return (
    <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
      <div className="mx-auto w-full max-w-[1512px] px-4 sm:px-6 space-y-8">
        <div className="rounded-[20px] border border-zinc-200 bg-white p-6 md:p-8">
          <h1 className="text-[36px] md:text-[52px] font-bold font-plus-jakarta text-foreground leading-[1.1]">
            Website Offers and Deals
          </h1>
          <p className="mt-3 text-text-body text-lg max-w-3xl">
            Explore all available seasonal offers and order directly with Add to Cart or Buy Now.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/offers/bundles"
              className="rounded-[10px] border border-brand-main bg-brand-main/5 px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-main hover:text-white"
            >
              View Bundle Offer Packages
            </Link>
            <Link
              href="/fiverr-orders"
              className="rounded-[10px] border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
            >
              Fiverr Orders - 50% OFF
            </Link>
            <Link
              href="/pricing"
              className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
            >
              Compare Full Pricing
            </Link>
            <Link
              href="/checkout"
              className="rounded-[10px] bg-brand-main px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Go to Checkout
            </Link>
          </div>
        </div>

        {feedback && (
          <p className="rounded-[10px] border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">{feedback}</p>
        )}

        {isLoading ? (
          <div className="rounded-[16px] border border-zinc-200 bg-white p-6 text-sm text-zinc-600">Loading offers...</div>
        ) : offersWithProducts.length === 0 ? (
          <div className="rounded-[16px] border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
            No offers are available right now.
          </div>
        ) : (
          <div className="space-y-6">
            {offersWithProducts.map((offer) => (
              <article key={offer.id} className="rounded-[20px] border border-zinc-200 bg-white p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusBadgeClass(offer.status)}`}
                      >
                        {formatStatus(offer.status)}
                      </span>
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
                        {offer.discountPercent}% OFF
                      </span>
                    </div>
                    <h2 className="text-[26px] md:text-[32px] font-bold font-plus-jakarta text-foreground">
                      {offer.title}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                      {new Date(offer.startAt).toLocaleDateString("en-LK")} - {new Date(offer.endAt).toLocaleDateString("en-LK")}
                    </p>
                  </div>
                </div>

                {offer.products.length === 0 ? (
                  <p className="mt-5 text-sm text-zinc-600">No packages are currently attached to this offer.</p>
                ) : (
                  <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {offer.products.map((pkg) => {
                      const discountedPrice = computeDiscountedPrice(pkg.priceLkr, offer.discountPercent);

                      return (
                        <div key={`${offer.id}-${pkg.slug}`} className="rounded-[14px] border border-zinc-200 bg-zinc-50 p-4">
                          <p className="text-sm font-semibold text-brand-main mb-1">{pkg.category}</p>
                          <h3 className="text-lg font-bold text-foreground">{pkg.name}</h3>
                          <p className="mt-1 text-sm text-zinc-600">{pkg.audience}</p>

                          <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-xl font-bold text-foreground">{formatLkr(discountedPrice)}</span>
                            <span className="text-sm text-zinc-500 line-through">{formatLkr(pkg.priceLkr)}</span>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => void addToCart(pkg.slug)}
                              disabled={addingKey === `cart:${pkg.slug}`}
                              className="rounded-[10px] bg-foreground px-3 py-2 text-xs font-semibold text-background transition-colors hover:bg-zinc-800 disabled:opacity-60"
                            >
                              {addingKey === `cart:${pkg.slug}` ? "Adding..." : "Add to Cart"}
                            </button>
                            <button
                              type="button"
                              onClick={() => buyNow(pkg.slug)}
                              className="rounded-[10px] bg-brand-main px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-dark"
                            >
                              Buy Now
                            </button>
                            <Link
                              href={`/packages/${pkg.slug}`}
                              className="rounded-[10px] border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
