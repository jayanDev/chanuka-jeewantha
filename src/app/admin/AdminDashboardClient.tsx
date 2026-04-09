"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { packageProducts } from "@/lib/packages-catalog";

type AdminReview = {
  id: string;
  name: string;
  message: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
};

type AdminOrder = {
  id: string;
  status: "pending_payment" | "payment_submitted" | "confirmed" | "in_progress" | "completed" | "cancelled";
  totalLkr: number;
  paymentRef: string;
  paymentSlipUrl: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  items: Array<{
    id: string;
    productName: string;
    quantity: number;
    priceLkr: number;
  }>;
};

type AdminOffer = {
  id: string;
  title: string;
  discountPercent: number;
  scope: "all" | "selected" | "category";
  selectedServiceSlugs: string[];
  selectedCategories: string[];
  startAtMs: number;
  endAtMs: number;
  isActive: boolean;
  isDraft: boolean;
  impressionCount: number;
  cartAddCount: number;
  conversionCount: number;
};

type AdminCoupon = {
  id: string;
  code: string;
  title: string;
  discountPercent: number;
  scope: "all" | "selected" | "category";
  selectedServiceSlugs: string[];
  selectedCategories: string[];
  minOrderLkr: number;
  maxTotalUses: number;
  maxUsesPerUser: number;
  usedCount: number;
  isActive: boolean;
  isDraft: boolean;
  startAtMs: number;
  endAtMs: number;
};

type OfferPriorityMode = "highest_discount" | "newest";

const statuses: AdminOrder["status"][] = [
  "pending_payment",
  "payment_submitted",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
];

const formatLkr = (price: number) => `LKR ${price.toLocaleString("en-LK")}`;

async function readJsonSafely(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text();
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function toDateInputValue(ms: number): string {
  const date = new Date(ms);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getScheduleStatus(startAtMs: number, endAtMs: number, isDraft: boolean, isActive: boolean): "draft" | "inactive" | "scheduled" | "active" | "expired" {
  if (isDraft) return "draft";
  if (!isActive) return "inactive";
  const now = Date.now();
  if (endAtMs < now) return "expired";
  if (startAtMs > now) return "scheduled";
  return "active";
}

export default function AdminDashboardClient() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [offers, setOffers] = useState<AdminOffer[]>([]);
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [priorityMode, setPriorityMode] = useState<OfferPriorityMode>("highest_discount");
  const [previewOfferId, setPreviewOfferId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [offerError, setOfferError] = useState("");
  const [offerSuccess, setOfferSuccess] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminOrder["status"] | "all">("all");

  const [offerTitle, setOfferTitle] = useState("");
  const [offerDiscountPercent, setOfferDiscountPercent] = useState(50);
  const [offerScope, setOfferScope] = useState<"all" | "selected" | "category">("all");
  const [offerSelectedSlugs, setOfferSelectedSlugs] = useState<string[]>([]);
  const [offerSelectedCategories, setOfferSelectedCategories] = useState<string[]>([]);
  const [offerIsDraft, setOfferIsDraft] = useState(false);
  const [offerStartDate, setOfferStartDate] = useState(toDateInputValue(Date.now()));
  const [offerEndDate, setOfferEndDate] = useState(toDateInputValue(Date.now() + 4 * 86400000));

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
  const [couponStartDate, setCouponStartDate] = useState(toDateInputValue(Date.now()));
  const [couponEndDate, setCouponEndDate] = useState(toDateInputValue(Date.now() + 7 * 86400000));

  const serviceCategories = useMemo(
    () => Array.from(new Set(packageProducts.map((item) => item.category))).sort((a, b) => a.localeCompare(b)),
    [],
  );

  const pendingOrders = useMemo(() => orders.filter((order) => order.status === "payment_submitted").length, [orders]);
  const pendingReviews = useMemo(() => reviews.filter((review) => !review.isApproved).length, [reviews]);

  const activeOffersCount = useMemo(() => offers.filter((offer) => getScheduleStatus(offer.startAtMs, offer.endAtMs, offer.isDraft, offer.isActive) === "active").length, [offers]);
  const activeCouponsCount = useMemo(() => coupons.filter((coupon) => getScheduleStatus(coupon.startAtMs, coupon.endAtMs, coupon.isDraft, coupon.isActive) === "active").length, [coupons]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      const byStatus = statusFilter === "all" || order.status === statusFilter;
      if (!byStatus) return false;
      if (!query) return true;

      return (
        order.user.name.toLowerCase().includes(query) ||
        order.user.email.toLowerCase().includes(query) ||
        order.paymentRef.toLowerCase().includes(query) ||
        order.items.some((item) => item.productName.toLowerCase().includes(query))
      );
    });
  }, [orders, search, statusFilter]);

  const loadDashboard = async () => {
    setIsLoading(true);
    setError("");

    try {
      const [ordersRes, reviewsRes, offersRes, couponsRes] = await Promise.all([
        fetch("/api/admin/orders", { cache: "no-store" }),
        fetch("/api/admin/reviews", { cache: "no-store" }),
        fetch("/api/admin/offers", { cache: "no-store" }),
        fetch("/api/admin/coupons", { cache: "no-store" }),
      ]);

      const ordersPayload = await readJsonSafely(ordersRes);
      const reviewsPayload = await readJsonSafely(reviewsRes);
      const offersPayload = await readJsonSafely(offersRes);
      const couponsPayload = await readJsonSafely(couponsRes);

      const issues: string[] = [];

      if (ordersRes.ok) {
        setOrders(Array.isArray(ordersPayload.orders) ? (ordersPayload.orders as AdminOrder[]) : []);
      } else {
        setOrders([]);
        issues.push(typeof ordersPayload.error === "string" ? ordersPayload.error : "Failed to load orders");
      }

      if (reviewsRes.ok) {
        setReviews(Array.isArray(reviewsPayload.reviews) ? (reviewsPayload.reviews as AdminReview[]) : []);
      } else {
        setReviews([]);
        issues.push(typeof reviewsPayload.error === "string" ? reviewsPayload.error : "Failed to load reviews");
      }

      if (offersRes.ok) {
        setOffers(Array.isArray(offersPayload.offers) ? (offersPayload.offers as AdminOffer[]) : []);
        setPriorityMode(offersPayload.priorityMode === "newest" ? "newest" : "highest_discount");
      } else {
        setOffers([]);
        issues.push(typeof offersPayload.error === "string" ? offersPayload.error : "Failed to load offers");
      }

      if (couponsRes.ok) {
        setCoupons(Array.isArray(couponsPayload.coupons) ? (couponsPayload.coupons as AdminCoupon[]) : []);
      } else {
        setCoupons([]);
        issues.push(typeof couponsPayload.error === "string" ? couponsPayload.error : "Failed to load coupons");
      }

      setError(issues.join(" | "));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  const updateOrderStatus = async (orderId: string, status: AdminOrder["status"]) => {
    const response = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });

    if (response.ok) {
      setOrders((previous) => previous.map((order) => (order.id === orderId ? { ...order, status } : order)));
    }
  };

  const updateReviewApproval = async (id: string, isApproved: boolean) => {
    const response = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isApproved }),
    });

    if (response.ok) {
      setReviews((previous) => previous.map((review) => (review.id === id ? { ...review, isApproved } : review)));
    }
  };

  const setAllPendingReviews = async (isApproved: boolean) => {
    const pending = reviews.filter((review) => review.isApproved !== isApproved);
    for (const review of pending) {
      await updateReviewApproval(review.id, isApproved);
    }
  };

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

  const toggleStringSelection = (
    value: string,
    setValues: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setValues((previous) => (previous.includes(value) ? previous.filter((item) => item !== value) : [...previous, value]));
  };

  return (
    <section className="w-full min-h-screen bg-zinc-50 py-16">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 space-y-8">
        <div className="rounded-[20px] border border-zinc-200 bg-white p-8">
          <h1 className="text-4xl font-bold font-plus-jakarta text-foreground mb-2">Admin Panel</h1>
          <p className="text-text-body mb-5">Manage orders, reviews, seasonal offers, coupons, and preview mode from one place.</p>
          <button
            type="button"
            onClick={loadDashboard}
            disabled={isLoading}
            className="rounded-[10px] bg-foreground px-6 py-3 text-white font-medium hover:bg-brand-dark disabled:opacity-60"
          >
            {isLoading ? "Refreshing..." : "Refresh Dashboard"}
          </button>
          {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Total Orders</p>
            <p className="text-3xl font-bold text-foreground">{orders.length}</p>
          </div>
          <div className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Payment Submitted</p>
            <p className="text-3xl font-bold text-foreground">{pendingOrders}</p>
          </div>
          <div className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Pending Reviews</p>
            <p className="text-3xl font-bold text-foreground">{pendingReviews}</p>
          </div>
          <div className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Active Offers</p>
            <p className="text-3xl font-bold text-foreground">{activeOffersCount}</p>
          </div>
          <div className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Active Coupons</p>
            <p className="text-3xl font-bold text-foreground">{activeCouponsCount}</p>
          </div>
        </div>

        <div className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-5">
          <h2 className="text-2xl font-bold font-plus-jakarta">Seasonal Offers</h2>
          <p className="text-sm text-zinc-600">Priority rules, category targeting, draft scheduling, analytics, and preview mode are managed here.</p>

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
              <input
                type="text"
                aria-label="Offer title"
                value={offerTitle}
                onChange={(event) => setOfferTitle(event.target.value)}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                placeholder="New Year Seasonal Offer"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Discount %</label>
              <input
                type="number"
                aria-label="Offer discount percent"
                min={1}
                max={90}
                value={offerDiscountPercent}
                onChange={(event) => setOfferDiscountPercent(Number(event.target.value || 1))}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Scope</label>
              <select
                aria-label="Offer scope"
                value={offerScope}
                onChange={(event) => setOfferScope(event.target.value as "all" | "selected" | "category")}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              >
                <option value="all">All services</option>
                <option value="selected">Selected services</option>
                <option value="category">Selected categories</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Start date</label>
              <input
                type="date"
                aria-label="Offer start date"
                value={offerStartDate}
                onChange={(event) => setOfferStartDate(event.target.value)}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">End date</label>
              <input
                type="date"
                aria-label="Offer end date"
                value={offerEndDate}
                onChange={(event) => setOfferEndDate(event.target.value)}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                required
              />
            </div>

            <label className="inline-flex items-center gap-2 text-sm md:col-span-2">
              <input
                type="checkbox"
                aria-label="Offer draft mode"
                checked={offerIsDraft}
                onChange={(event) => setOfferIsDraft(event.target.checked)}
              />
              Save as draft (will not go live until draft is turned off)
            </label>

            {offerScope === "selected" && (
              <div className="md:col-span-2 rounded border border-zinc-200 p-3">
                <p className="text-sm font-medium mb-2">Selected services</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-auto">
                  {packageProducts.map((product) => (
                    <label key={product.slug} className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        aria-label={`Offer service ${product.name}`}
                        checked={offerSelectedSlugs.includes(product.slug)}
                        onChange={() => toggleStringSelection(product.slug, setOfferSelectedSlugs)}
                      />
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
                      <input
                        type="checkbox"
                        aria-label={`Offer category ${category}`}
                        checked={offerSelectedCategories.includes(category)}
                        onChange={() => toggleStringSelection(category, setOfferSelectedCategories)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <button type="submit" className="rounded bg-brand-main px-4 py-2 text-sm text-white">
                Create Offer
              </button>
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
                      <p className="text-sm text-zinc-600">
                        {offer.discountPercent}% OFF • {offer.scope === "all" ? "All services" : offer.scope === "selected" ? `${offer.selectedServiceSlugs.length} selected services` : `${offer.selectedCategories.length} categories`}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {new Date(offer.startAtMs).toLocaleString("en-LK")} - {new Date(offer.endAtMs).toLocaleString("en-LK")}
                      </p>
                      <p className="text-xs text-zinc-500">
                        Status: {status} • Impressions: {offer.impressionCount} • Cart Adds: {offer.cartAddCount} • Conversions: {offer.conversionCount}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void updateOffer(offer.id, { isDraft: !offer.isDraft }, offer.isDraft ? "Offer moved out of draft." : "Offer moved to draft.")}
                        className="rounded bg-zinc-700 px-3 py-1.5 text-xs text-white"
                      >
                        {offer.isDraft ? "Publish Draft" : "Move to Draft"}
                      </button>
                      <button
                        type="button"
                        onClick={() => void updateOffer(offer.id, { isActive: !offer.isActive }, offer.isActive ? "Offer deactivated." : "Offer activated.")}
                        className="rounded bg-zinc-900 px-3 py-1.5 text-xs text-white"
                      >
                        {offer.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        type="button"
                        onClick={() => void startPreview(offer.id)}
                        className="rounded bg-brand-main px-3 py-1.5 text-xs text-white"
                      >
                        Preview on Site
                      </button>
                      <Link
                        href={`/?offerPreview=${encodeURIComponent(offer.id)}`}
                        target="_blank"
                        className="rounded border border-zinc-300 px-3 py-1.5 text-xs"
                      >
                        Open Preview Tab
                      </Link>
                      <button
                        type="button"
                        onClick={() => void deleteOffer(offer.id)}
                        className="rounded bg-red-600 px-3 py-1.5 text-xs text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {offers.length === 0 && <p className="text-sm text-zinc-500">No offers created yet.</p>}
          </div>

          {previewOfferId && (
            <div className="rounded border border-brand-main/40 bg-brand-main/10 p-3 text-sm">
              Preview mode enabled for offer {previewOfferId}.
              <button type="button" onClick={() => void stopPreview()} className="ml-3 rounded bg-zinc-800 px-2 py-1 text-xs text-white">
                Stop Preview
              </button>
            </div>
          )}
        </div>

        <div className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-5">
          <h2 className="text-2xl font-bold font-plus-jakarta">Coupons</h2>
          <p className="text-sm text-zinc-600">Coupons stack with seasonal discounts, with total usage and per-user limits.</p>

          {couponError && <p className="text-sm text-red-700">{couponError}</p>}
          {couponSuccess && <p className="text-sm text-green-700">{couponSuccess}</p>}

          <form onSubmit={createCouponAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Coupon code</label>
              <input
                type="text"
                aria-label="Coupon code"
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value.toUpperCase())}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                placeholder="NEWYEAR50"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Coupon title</label>
              <input
                type="text"
                aria-label="Coupon title"
                value={couponTitle}
                onChange={(event) => setCouponTitle(event.target.value)}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Discount %</label>
              <input
                type="number"
                aria-label="Coupon discount percent"
                min={1}
                max={90}
                value={couponDiscountPercent}
                onChange={(event) => setCouponDiscountPercent(Number(event.target.value || 1))}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Scope</label>
              <select
                aria-label="Coupon scope"
                value={couponScope}
                onChange={(event) => setCouponScope(event.target.value as "all" | "selected" | "category")}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              >
                <option value="all">All services</option>
                <option value="selected">Selected services</option>
                <option value="category">Selected categories</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Minimum order (LKR)</label>
              <input
                type="number"
                aria-label="Coupon minimum order"
                min={0}
                value={couponMinOrderLkr}
                onChange={(event) => setCouponMinOrderLkr(Number(event.target.value || 0))}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Max total uses</label>
              <input
                type="number"
                aria-label="Coupon max total uses"
                min={1}
                value={couponMaxTotalUses}
                onChange={(event) => setCouponMaxTotalUses(Number(event.target.value || 1))}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Max uses per user</label>
              <input
                type="number"
                aria-label="Coupon max uses per user"
                min={1}
                value={couponMaxUsesPerUser}
                onChange={(event) => setCouponMaxUsesPerUser(Number(event.target.value || 1))}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Start date</label>
              <input
                type="date"
                aria-label="Coupon start date"
                value={couponStartDate}
                onChange={(event) => setCouponStartDate(event.target.value)}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">End date</label>
              <input
                type="date"
                aria-label="Coupon end date"
                value={couponEndDate}
                onChange={(event) => setCouponEndDate(event.target.value)}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                required
              />
            </div>

            <label className="inline-flex items-center gap-2 text-sm md:col-span-2">
              <input
                type="checkbox"
                aria-label="Coupon draft mode"
                checked={couponIsDraft}
                onChange={(event) => setCouponIsDraft(event.target.checked)}
              />
              Save as draft
            </label>

            {couponScope === "selected" && (
              <div className="md:col-span-2 rounded border border-zinc-200 p-3">
                <p className="text-sm font-medium mb-2">Selected services</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-auto">
                  {packageProducts.map((product) => (
                    <label key={product.slug} className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        aria-label={`Coupon service ${product.name}`}
                        checked={couponSelectedSlugs.includes(product.slug)}
                        onChange={() => toggleStringSelection(product.slug, setCouponSelectedSlugs)}
                      />
                      <span>{product.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {couponScope === "category" && (
              <div className="md:col-span-2 rounded border border-zinc-200 p-3">
                <p className="text-sm font-medium mb-2">Selected categories</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {serviceCategories.map((category) => (
                    <label key={category} className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        aria-label={`Coupon category ${category}`}
                        checked={couponSelectedCategories.includes(category)}
                        onChange={() => toggleStringSelection(category, setCouponSelectedCategories)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <button type="submit" className="rounded bg-brand-main px-4 py-2 text-sm text-white">
                Create Coupon
              </button>
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
                      <p className="text-sm text-zinc-600">
                        {coupon.discountPercent}% OFF • Min {formatLkr(coupon.minOrderLkr)} • Uses {coupon.usedCount}/{coupon.maxTotalUses} (per user {coupon.maxUsesPerUser})
                      </p>
                      <p className="text-xs text-zinc-500">
                        Scope: {coupon.scope === "all" ? "All" : coupon.scope === "selected" ? `${coupon.selectedServiceSlugs.length} selected` : `${coupon.selectedCategories.length} categories`} • Status: {status}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void updateCouponAction(coupon.id, { isDraft: !coupon.isDraft }, coupon.isDraft ? "Coupon moved out of draft." : "Coupon moved to draft.")}
                        className="rounded bg-zinc-700 px-3 py-1.5 text-xs text-white"
                      >
                        {coupon.isDraft ? "Publish Draft" : "Move to Draft"}
                      </button>
                      <button
                        type="button"
                        onClick={() => void updateCouponAction(coupon.id, { isActive: !coupon.isActive }, coupon.isActive ? "Coupon deactivated." : "Coupon activated.")}
                        className="rounded bg-zinc-900 px-3 py-1.5 text-xs text-white"
                      >
                        {coupon.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        type="button"
                        onClick={() => void deleteCouponAction(coupon.id)}
                        className="rounded bg-red-600 px-3 py-1.5 text-xs text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {coupons.length === 0 && <p className="text-sm text-zinc-500">No coupons created yet.</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="text-2xl font-bold font-plus-jakarta">Orders</h2>
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <input
                type="text"
                aria-label="Order search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search customer, email, ref, package"
                className="rounded border border-zinc-300 px-3 py-2 text-sm"
              />
              <select
                aria-label="Order status filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as AdminOrder["status"] | "all")}
                className="rounded border border-zinc-300 px-3 py-2 text-sm"
              >
                <option value="all">All statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredOrders.map((order) => (
            <article key={order.id} className="rounded-[16px] border border-zinc-200 bg-white p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{order.user.name} ({order.user.email})</h3>
                  <p className="text-sm text-zinc-500">Reference: {order.paymentRef}</p>
                  <p className="text-sm text-zinc-500">Total: {formatLkr(order.totalLkr)}</p>
                  <a href={order.paymentSlipUrl} target="_blank" rel="noreferrer" className="text-sm text-brand-main font-medium">
                    View Payment Slip
                  </a>
                </div>

                <select
                  aria-label="Order status update"
                  value={order.status}
                  onChange={(event) => void updateOrderStatus(order.id, event.target.value as AdminOrder["status"])}
                  className="rounded border border-zinc-300 px-3 py-2"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                {order.items.map((item) => (
                  <li key={item.id}>{item.productName} x {item.quantity} ({formatLkr(item.priceLkr)})</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold font-plus-jakarta">Reviews</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => void setAllPendingReviews(true)} className="rounded bg-green-600 px-4 py-2 text-sm text-white">Approve All</button>
              <button type="button" onClick={() => void setAllPendingReviews(false)} className="rounded bg-zinc-700 px-4 py-2 text-sm text-white">Hide All</button>
            </div>
          </div>
          {reviews.map((review) => (
            <article key={review.id} className="rounded-[16px] border border-zinc-200 bg-white p-6">
              <div className="mb-2 flex items-center justify-between gap-4">
                <h3 className="font-bold text-foreground">{review.name}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${review.isApproved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {review.isApproved ? "Approved" : "Pending"}
                </span>
              </div>
              <p className="mb-4 text-sm text-zinc-700">{review.message}</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => void updateReviewApproval(review.id, true)} className="rounded bg-green-600 px-4 py-2 text-sm text-white">Approve</button>
                <button type="button" onClick={() => void updateReviewApproval(review.id, false)} className="rounded bg-zinc-700 px-4 py-2 text-sm text-white">Hide</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
