"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { packageProducts } from "@/lib/packages-catalog";
import { formatLkr, getScheduleStatus, readJsonSafely, toDateInputValue } from "@/app/admin/_components/admin-utils";
import type { AdminCoupon, AdminOffer, OfferPriorityMode } from "@/app/admin/_components/admin-types";

const INITIAL_NOW_MS = Date.now();
const DEFAULT_OFFER_START_DATE = toDateInputValue(INITIAL_NOW_MS);
const DEFAULT_OFFER_END_DATE = toDateInputValue(INITIAL_NOW_MS + 4 * 86400000);
const DEFAULT_COUPON_START_DATE = toDateInputValue(INITIAL_NOW_MS);
const DEFAULT_COUPON_END_DATE = toDateInputValue(INITIAL_NOW_MS + 7 * 86400000);

export default function OffersCouponsClient() {
  const [offers, setOffers] = useState<AdminOffer[]>([]);
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [priorityMode, setPriorityMode] = useState<OfferPriorityMode>("highest_discount");
  const [previewOfferId, setPreviewOfferId] = useState<string | null>(null);

  const [offerError, setOfferError] = useState("");
  const [offerSuccess, setOfferSuccess] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [offerTitle, setOfferTitle] = useState("");
  const [offerDiscountPercent, setOfferDiscountPercent] = useState(50);
  const [offerScope, setOfferScope] = useState<"all" | "selected" | "category">("all");
  const [offerSelectedSlugs, setOfferSelectedSlugs] = useState<string[]>([]);
  const [offerSelectedCategories, setOfferSelectedCategories] = useState<string[]>([]);
  const [offerIsDraft, setOfferIsDraft] = useState(false);
  const [offerStartDate, setOfferStartDate] = useState(DEFAULT_OFFER_START_DATE);
  const [offerEndDate, setOfferEndDate] = useState(DEFAULT_OFFER_END_DATE);

  const [couponCode, setCouponCode] = useState("");
  const [couponTitle, setCouponTitle] = useState("");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(10);
  const [couponScope, setCouponScope] = useState<"all" | "selected" | "category">("all");
  const [couponSelectedSlugs, setCouponSelectedSlugs] = useState<string[]>([]);
  const [couponSelectedCategories, setCouponSelectedCategories] = useState<string[]>([]);
  const [couponMinOrderLkr, setCouponMinOrderLkr] = useState(0);
  const [couponMaxTotalUses, setCouponMaxTotalUses] = useState(100);
  const [couponMaxUsesPerUser, setCouponMaxUsesPerUser] = useState(1);
  const [couponIsDraft, setCouponIsDraft] = useState(false);
  const [couponStartDate, setCouponStartDate] = useState(DEFAULT_COUPON_START_DATE);
  const [couponEndDate, setCouponEndDate] = useState(DEFAULT_COUPON_END_DATE);

  const serviceCategories = useMemo(
    () => Array.from(new Set(packageProducts.map((item) => item.category))).sort((a, b) => a.localeCompare(b)),
    [],
  );

  const refreshOffers = async () => {
    const response = await fetch("/api/admin/offers", { cache: "no-store" });
    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setOfferError(typeof payload.error === "string" ? payload.error : "Failed to load offers");
      return;
    }

    setOffers(Array.isArray(payload.offers) ? (payload.offers as AdminOffer[]) : []);
    setPriorityMode(payload.priorityMode === "newest" ? "newest" : "highest_discount");
  };

  const refreshCoupons = async () => {
    const response = await fetch("/api/admin/coupons", { cache: "no-store" });
    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setCouponError(typeof payload.error === "string" ? payload.error : "Failed to load coupons");
      return;
    }

    setCoupons(Array.isArray(payload.coupons) ? (payload.coupons as AdminCoupon[]) : []);
  };

  useEffect(() => {
    let isActive = true;

    void (async () => {
      if (!isActive) return;
      await Promise.all([refreshOffers(), refreshCoupons()]);
    })();

    return () => {
      isActive = false;
    };
  }, []);

  const toggleStringSelection = (
    value: string,
    setValues: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setValues((previous) => (previous.includes(value) ? previous.filter((item) => item !== value) : [...previous, value]));
  };

  const createOffer = async (event: React.FormEvent) => {
    event.preventDefault();
    setOfferError("");
    setOfferSuccess("");

    const response = await fetch("/api/admin/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: offerTitle,
        discountPercent: offerDiscountPercent,
        scope: offerScope,
        selectedServiceSlugs: offerSelectedSlugs,
        selectedCategories: offerSelectedCategories,
        startAt: `${offerStartDate}T00:00:00.000Z`,
        endAt: `${offerEndDate}T23:59:59.000Z`,
        isActive: true,
        isDraft: offerIsDraft,
      }),
    });

    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setOfferError(typeof payload.error === "string" ? payload.error : "Failed to create offer");
      return;
    }

    setOfferSuccess("Seasonal offer created successfully.");
    setOfferTitle("");
    setOfferSelectedSlugs([]);
    setOfferSelectedCategories([]);
    setOfferIsDraft(false);
    await refreshOffers();
  };

  const updateOffer = async (offerId: string, updates: Record<string, unknown>, successMessage: string) => {
    setOfferError("");
    setOfferSuccess("");

    const response = await fetch("/api/admin/offers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: offerId, ...updates }),
    });

    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setOfferError(typeof payload.error === "string" ? payload.error : "Failed to update offer");
      return;
    }

    setOfferSuccess(successMessage);
    await refreshOffers();
  };

  const deleteOffer = async (id: string) => {
    setOfferError("");
    setOfferSuccess("");

    const response = await fetch(`/api/admin/offers?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setOfferError(typeof payload.error === "string" ? payload.error : "Failed to delete offer");
      return;
    }

    setOfferSuccess("Offer deleted.");
    await refreshOffers();
  };

  const changePriorityMode = async (mode: OfferPriorityMode) => {
    setOfferError("");
    setOfferSuccess("");

    const response = await fetch("/api/admin/offers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priorityMode: mode }),
    });

    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setOfferError(typeof payload.error === "string" ? payload.error : "Failed to update priority mode");
      return;
    }

    setPriorityMode(mode);
    setOfferSuccess("Offer priority mode updated.");
  };

  const startPreview = async (offerId: string) => {
    const response = await fetch("/api/offers/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ offerId }),
    });

    if (!response.ok) {
      setOfferError("Failed to start preview mode");
      return;
    }

    setPreviewOfferId(offerId);
    window.location.assign(`/?offerPreview=${encodeURIComponent(offerId)}`);
  };

  const stopPreview = async () => {
    const response = await fetch("/api/offers/preview", { method: "DELETE" });
    if (!response.ok) {
      setOfferError("Failed to stop preview mode");
      return;
    }

    setPreviewOfferId(null);
  };

  const createCouponAction = async (event: React.FormEvent) => {
    event.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    const response = await fetch("/api/admin/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: couponCode,
        title: couponTitle,
        discountPercent: couponDiscountPercent,
        scope: couponScope,
        selectedServiceSlugs: couponSelectedSlugs,
        selectedCategories: couponSelectedCategories,
        minOrderLkr: couponMinOrderLkr,
        maxTotalUses: couponMaxTotalUses,
        maxUsesPerUser: couponMaxUsesPerUser,
        isActive: true,
        isDraft: couponIsDraft,
        startAt: `${couponStartDate}T00:00:00.000Z`,
        endAt: `${couponEndDate}T23:59:59.000Z`,
      }),
    });

    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setCouponError(typeof payload.error === "string" ? payload.error : "Failed to create coupon");
      return;
    }

    setCouponSuccess("Coupon created.");
    setCouponCode("");
    setCouponTitle("");
    setCouponSelectedSlugs([]);
    setCouponSelectedCategories([]);
    setCouponIsDraft(false);
    await refreshCoupons();
  };

  const updateCouponAction = async (couponId: string, updates: Record<string, unknown>, successMessage: string) => {
    setCouponError("");
    setCouponSuccess("");

    const response = await fetch("/api/admin/coupons", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: couponId, ...updates }),
    });

    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setCouponError(typeof payload.error === "string" ? payload.error : "Failed to update coupon");
      return;
    }

    setCouponSuccess(successMessage);
    await refreshCoupons();
  };

  const deleteCouponAction = async (couponId: string) => {
    setCouponError("");
    setCouponSuccess("");

    const response = await fetch(`/api/admin/coupons?id=${encodeURIComponent(couponId)}`, {
      method: "DELETE",
    });

    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setCouponError(typeof payload.error === "string" ? payload.error : "Failed to delete coupon");
      return;
    }

    setCouponSuccess("Coupon deleted.");
    await refreshCoupons();
  };

  return (
    <section className="space-y-6">
 <div className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold font-plus-jakarta">Manage Offers</h2>
 <p className="text-sm text-zinc-600">Priority rules, targeting, draft scheduling, analytics, and preview mode.</p>
          </div>
          <button type="button" onClick={() => void refreshOffers()} className="rounded bg-foreground px-4 py-2 text-sm text-background">Refresh</button>
        </div>

        {offerError && <p className="text-sm text-red-700">{offerError}</p>}
        {offerSuccess && <p className="text-sm text-green-700">{offerSuccess}</p>}

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Priority mode:</span>
          <button
            type="button"
            onClick={() => void changePriorityMode("highest_discount")}
 className={`rounded px-3 py-1.5 text-xs ${priorityMode === "highest_discount" ? "bg-brand-main text-white" : "bg-zinc-200 text-zinc-800"}`}
          >
            Highest Discount
          </button>
          <button
            type="button"
            onClick={() => void changePriorityMode("newest")}
 className={`rounded px-3 py-1.5 text-xs ${priorityMode === "newest" ? "bg-brand-main text-white" : "bg-zinc-200 text-zinc-800"}`}
          >
            Newest Offer
          </button>
        </div>

        <form onSubmit={createOffer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Offer title</label>
 <input type="text" aria-label="Offer title" value={offerTitle} onChange={(event) => setOfferTitle(event.target.value)} className="w-full rounded border border-zinc-300 px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Discount %</label>
 <input type="number" aria-label="Offer discount percent" min={1} max={90} value={offerDiscountPercent} onChange={(event) => setOfferDiscountPercent(Number(event.target.value || 1))} className="w-full rounded border border-zinc-300 px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Scope</label>
 <select aria-label="Offer scope" value={offerScope} onChange={(event) => setOfferScope(event.target.value as "all" | "selected" | "category")} className="w-full rounded border border-zinc-300 px-3 py-2 text-sm">
              <option value="all">All services</option>
              <option value="selected">Selected services</option>
              <option value="category">Selected categories</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Start date</label>
 <input type="date" aria-label="Offer start date" value={offerStartDate} onChange={(event) => setOfferStartDate(event.target.value)} className="w-full rounded border border-zinc-300 px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">End date</label>
 <input type="date" aria-label="Offer end date" value={offerEndDate} onChange={(event) => setOfferEndDate(event.target.value)} className="w-full rounded border border-zinc-300 px-3 py-2 text-sm" required />
          </div>
          <label className="inline-flex items-center gap-2 text-sm md:col-span-2">
            <input type="checkbox" aria-label="Offer draft mode" checked={offerIsDraft} onChange={(event) => setOfferIsDraft(event.target.checked)} />
            Save as draft
          </label>

          {offerScope === "selected" && (
 <div className="md:col-span-2 rounded border border-zinc-200 p-3">
              <p className="text-sm font-medium mb-2">Selected services</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-auto">
                {packageProducts.map((product) => (
                  <label key={product.slug} className="inline-flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={offerSelectedSlugs.includes(product.slug)} onChange={() => toggleStringSelection(product.slug, setOfferSelectedSlugs)} />
                    <span>{product.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {offerScope === "category" && (
 <div className="md:col-span-2 rounded border border-zinc-200 p-3">
              <p className="text-sm font-medium mb-2">Selected categories</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {serviceCategories.map((category) => (
                  <label key={category} className="inline-flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={offerSelectedCategories.includes(category)} onChange={() => toggleStringSelection(category, setOfferSelectedCategories)} />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="md:col-span-2">
            <button type="submit" className="rounded bg-brand-main px-4 py-2 text-sm text-white">Create Offer</button>
          </div>
        </form>

        <div className="space-y-3">
          {offers.map((offer) => {
            const status = getScheduleStatus(offer.startAtMs, offer.endAtMs, offer.isDraft, offer.isActive);
            return (
 <article key={offer.id} className="rounded border border-zinc-200 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{offer.title}</p>
 <p className="text-sm text-zinc-600">{offer.discountPercent}% OFF</p>
                    <p className="text-xs text-zinc-500">Status: {status} • Impressions: {offer.impressionCount} • Cart Adds: {offer.cartAddCount} • Conversions: {offer.conversionCount}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => void updateOffer(offer.id, { isDraft: !offer.isDraft }, offer.isDraft ? "Offer moved out of draft." : "Offer moved to draft.")} className="rounded bg-zinc-700 px-3 py-1.5 text-xs text-white">{offer.isDraft ? "Publish Draft" : "Move to Draft"}</button>
                    <button type="button" onClick={() => void updateOffer(offer.id, { isActive: !offer.isActive }, offer.isActive ? "Offer deactivated." : "Offer activated.")} className="rounded bg-zinc-900 px-3 py-1.5 text-xs text-white">{offer.isActive ? "Deactivate" : "Activate"}</button>
                    <button type="button" onClick={() => void startPreview(offer.id)} className="rounded bg-brand-main px-3 py-1.5 text-xs text-white">Preview on Site</button>
 <Link href={`/?offerPreview=${encodeURIComponent(offer.id)}`} target="_blank" className="rounded border border-zinc-300 px-3 py-1.5 text-xs">Open Preview Tab</Link>
                    <button type="button" onClick={() => void deleteOffer(offer.id)} className="rounded bg-red-600 px-3 py-1.5 text-xs text-white">Delete</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {previewOfferId && (
          <div className="rounded border border-brand-main/40 bg-brand-main/10 p-3 text-sm">
            Preview mode enabled for offer {previewOfferId}.
            <button type="button" onClick={() => void stopPreview()} className="ml-3 rounded bg-zinc-800 px-2 py-1 text-xs text-white">Stop Preview</button>
          </div>
        )}
      </div>

 <div className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold font-plus-jakarta">Manage Coupons</h2>
 <p className="text-sm text-zinc-600">Create coupons with usage limits and scope targeting.</p>
          </div>
          <button type="button" onClick={() => void refreshCoupons()} className="rounded bg-foreground px-4 py-2 text-sm text-background">Refresh</button>
        </div>

        {couponError && <p className="text-sm text-red-700">{couponError}</p>}
        {couponSuccess && <p className="text-sm text-green-700">{couponSuccess}</p>}

        <form onSubmit={createCouponAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <input type="text" aria-label="Coupon code" value={couponCode} onChange={(event) => setCouponCode(event.target.value.toUpperCase())} placeholder="NEWYEAR50" className="rounded border border-zinc-300 px-3 py-2 text-sm" required />
 <input type="text" aria-label="Coupon title" value={couponTitle} onChange={(event) => setCouponTitle(event.target.value)} className="rounded border border-zinc-300 px-3 py-2 text-sm" required />
 <input type="number" aria-label="Coupon discount percent" min={1} max={90} value={couponDiscountPercent} onChange={(event) => setCouponDiscountPercent(Number(event.target.value || 1))} className="rounded border border-zinc-300 px-3 py-2 text-sm" required />
 <select aria-label="Coupon scope" value={couponScope} onChange={(event) => setCouponScope(event.target.value as "all" | "selected" | "category")} className="rounded border border-zinc-300 px-3 py-2 text-sm">
            <option value="all">All services</option>
            <option value="selected">Selected services</option>
            <option value="category">Selected categories</option>
          </select>
 <input type="number" aria-label="Coupon minimum order" min={0} value={couponMinOrderLkr} onChange={(event) => setCouponMinOrderLkr(Number(event.target.value || 0))} className="rounded border border-zinc-300 px-3 py-2 text-sm" />
 <input type="number" aria-label="Coupon max total uses" min={1} value={couponMaxTotalUses} onChange={(event) => setCouponMaxTotalUses(Number(event.target.value || 1))} className="rounded border border-zinc-300 px-3 py-2 text-sm" />
 <input type="number" aria-label="Coupon max uses per user" min={1} value={couponMaxUsesPerUser} onChange={(event) => setCouponMaxUsesPerUser(Number(event.target.value || 1))} className="rounded border border-zinc-300 px-3 py-2 text-sm" />
 <input type="date" aria-label="Coupon start date" value={couponStartDate} onChange={(event) => setCouponStartDate(event.target.value)} className="rounded border border-zinc-300 px-3 py-2 text-sm" required />
 <input type="date" aria-label="Coupon end date" value={couponEndDate} onChange={(event) => setCouponEndDate(event.target.value)} className="rounded border border-zinc-300 px-3 py-2 text-sm" required />

          <label className="inline-flex items-center gap-2 text-sm md:col-span-2">
            <input type="checkbox" checked={couponIsDraft} onChange={(event) => setCouponIsDraft(event.target.checked)} />
            Save as draft
          </label>

          <div className="md:col-span-2">
            <button type="submit" className="rounded bg-brand-main px-4 py-2 text-sm text-white">Create Coupon</button>
          </div>
        </form>

        <div className="space-y-3">
          {coupons.map((coupon) => {
            const status = getScheduleStatus(coupon.startAtMs, coupon.endAtMs, coupon.isDraft, coupon.isActive);
            return (
 <article key={coupon.id} className="rounded border border-zinc-200 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{coupon.code} • {coupon.title}</p>
 <p className="text-sm text-zinc-600">{coupon.discountPercent}% OFF • Min {formatLkr(coupon.minOrderLkr)} • Uses {coupon.usedCount}/{coupon.maxTotalUses}</p>
                    <p className="text-xs text-zinc-500">Status: {status}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => void updateCouponAction(coupon.id, { isDraft: !coupon.isDraft }, coupon.isDraft ? "Coupon moved out of draft." : "Coupon moved to draft.")} className="rounded bg-zinc-700 px-3 py-1.5 text-xs text-white">{coupon.isDraft ? "Publish Draft" : "Move to Draft"}</button>
                    <button type="button" onClick={() => void updateCouponAction(coupon.id, { isActive: !coupon.isActive }, coupon.isActive ? "Coupon deactivated." : "Coupon activated.")} className="rounded bg-zinc-900 px-3 py-1.5 text-xs text-white">{coupon.isActive ? "Deactivate" : "Activate"}</button>
                    <button type="button" onClick={() => void deleteCouponAction(coupon.id)} className="rounded bg-red-600 px-3 py-1.5 text-xs text-white">Delete</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
