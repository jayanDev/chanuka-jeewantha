"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatLkr, packageCategories, type PackageProduct } from "@/lib/packages-catalog";
import {
  calculateBundlePricing,
  getConfigurableBundleRule,
  isConfigurableBundleSlug,
  type BundleSelection,
} from "@/lib/bundle-pricing";
import SaveButton from "@/components/SaveButton";

type ProductRecord = {
  id: string;
  slug: string;
};

type AuthMe = {
  id: string;
};

type BundleSelectionState = {
  cvSlug: string;
  coverLetterSlug: string;
  linkedinSlug: string;
};

type PackageActionButtonsProps = {
  pkg: PackageProduct;
};

const cvOptions = packageCategories.find((category) => category.key === "cv-writing")?.packages ?? [];
const coverLetterOptions = packageCategories.find((category) => category.key === "cover-letter")?.packages ?? [];
const linkedinOptions = packageCategories.find((category) => category.key === "linkedin")?.packages ?? [];

async function readJsonSafely(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text();
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export default function PackageActionButtons({ pkg }: PackageActionButtonsProps) {
  const [productsBySlug, setProductsBySlug] = useState<Record<string, ProductRecord>>({});
  const [activeUser, setActiveUser] = useState<AuthMe | null>(null);
  const [feedback, setFeedback] = useState("");
  const [added, setAdded] = useState(false);
  const [selection, setSelection] = useState<BundleSelectionState>({
    cvSlug: "",
    coverLetterSlug: "",
    linkedinSlug: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [productsRes, authRes] = await Promise.all([
          fetch("/api/products", { cache: "no-store" }),
          fetch("/api/auth/me", { cache: "no-store" }),
        ]);

        const productsPayload = await readJsonSafely(productsRes);
        const authPayload = await readJsonSafely(authRes);

        const products = Array.isArray(productsPayload.products)
          ? (productsPayload.products as Array<{ id: string; slug: string }>)
          : [];

        const map: Record<string, ProductRecord> = {};
        for (const product of products) {
          map[product.slug] = { id: product.id, slug: product.slug };
        }

        setProductsBySlug(map);
        setActiveUser((authPayload.user as AuthMe | null) ?? null);
      } catch {
        setFeedback("Failed to load package actions.");
      }
    };

    void load();
  }, []);

  const computedBundlePrice = useMemo(() => {
    if (!isConfigurableBundleSlug(pkg.slug)) {
      return null;
    }

    if (!selection.cvSlug || !selection.coverLetterSlug) {
      return null;
    }

    const rule = getConfigurableBundleRule(pkg.slug);
    if (rule.requireLinkedin && !selection.linkedinSlug) {
      return null;
    }

    try {
      return calculateBundlePricing(pkg.slug, {
        cvSlug: selection.cvSlug,
        coverLetterSlug: selection.coverLetterSlug,
        linkedinSlug: selection.linkedinSlug || undefined,
      });
    } catch {
      return null;
    }
  }, [pkg.slug, selection]);

  const selectionReady = !isConfigurableBundleSlug(pkg.slug) || Boolean(computedBundlePrice);

  const bundleSelectionPayload: BundleSelection | undefined = computedBundlePrice
    ? {
        cvSlug: computedBundlePrice.selection.cvSlug,
        coverLetterSlug: computedBundlePrice.selection.coverLetterSlug,
        linkedinSlug: computedBundlePrice.selection.linkedinSlug || undefined,
      }
    : undefined;

  const addToCart = async () => {
    setFeedback("");
    const product = productsBySlug[pkg.slug];
    if (!product) {
      setFeedback("Package catalog is syncing. Please retry in a few seconds.");
      return;
    }

    if (!activeUser) {
      const returnTo = `${window.location.pathname}${window.location.search}`;
      window.location.assign(`/auth/signin?returnTo=${encodeURIComponent(returnTo)}`);
      return;
    }

    if (!selectionReady) {
      setFeedback("Complete required package selections first.");
      return;
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          bundleSelection: bundleSelectionPayload,
        }),
      });

      const payload = await readJsonSafely(response);
      if (!response.ok) {
        const message = typeof payload.error === "string" ? payload.error : "Failed to add to cart.";
        setFeedback(message);
        return;
      }

      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch {
      setFeedback("Failed to add to cart.");
    }
  };

  const buyNow = () => {
    const product = productsBySlug[pkg.slug];
    if (!product) {
      setFeedback("Package catalog is syncing. Please retry in a few seconds.");
      return;
    }

    if (!selectionReady) {
      setFeedback("Complete required package selections first.");
      return;
    }

    const checkoutParams = new URLSearchParams({
      mode: "buy_now",
      productId: product.id,
    });
    if (bundleSelectionPayload) {
      checkoutParams.set("bundleSelection", JSON.stringify(bundleSelectionPayload));
    }
    const checkoutUrl = `/checkout?${checkoutParams.toString()}`;

    if (!activeUser) {
      window.location.assign(`/auth/signin?returnTo=${encodeURIComponent(checkoutUrl)}`);
      return;
    }

    window.location.assign(checkoutUrl);
  };

  return (
    <div className="space-y-3">
      {isConfigurableBundleSlug(pkg.slug) && (
 <div className="rounded-[12px] border border-zinc-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">Build Package</p>
          <div className="mt-3 grid grid-cols-1 gap-3">
 <label className="text-sm text-zinc-700">
              <span className="mb-1 block font-medium">Select CV Package</span>
              <select
                value={selection.cvSlug}
                onChange={(event) => setSelection((prev) => ({ ...prev, cvSlug: event.target.value }))}
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
              <span className="mb-1 block font-medium">Select Cover Letter</span>
              <select
                value={selection.coverLetterSlug}
                onChange={(event) => setSelection((prev) => ({ ...prev, coverLetterSlug: event.target.value }))}
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

            {getConfigurableBundleRule(pkg.slug).requireLinkedin && (
 <label className="text-sm text-zinc-700">
                <span className="mb-1 block font-medium">Select LinkedIn Optimization</span>
                <select
                  value={selection.linkedinSlug}
                  onChange={(event) => setSelection((prev) => ({ ...prev, linkedinSlug: event.target.value }))}
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

          {computedBundlePrice && (
            <p className="mt-3 text-xs font-semibold text-emerald-700">
              Bundle price: {formatLkr(computedBundlePrice.priceLkr)} ({computedBundlePrice.discountPercent}% OFF)
            </p>
          )}
        </div>
      )}

      {feedback && <p className="text-xs font-medium text-brand-dark">{feedback}</p>}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void addToCart()}
          disabled={!selectionReady}
          className="inline-flex items-center justify-center rounded-[10px] bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {added ? "Added" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={buyNow}
          disabled={!selectionReady}
          className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy Now
        </button>
        <Link
          href={`/packages/${pkg.slug}`}
 className="inline-flex items-center justify-center rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main"
        >
          See More
        </Link>
        {activeUser && <SaveButton productSlug={pkg.slug} />}
      </div>
    </div>
  );
}
