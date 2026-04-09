"use client";

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
  scope: "all" | "selected";
  selectedServiceSlugs: string[];
  startAtMs: number;
  endAtMs: number;
  isActive: boolean;
};

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

export default function AdminDashboardClient() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [offers, setOffers] = useState<AdminOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [offerError, setOfferError] = useState("");
  const [offerSuccess, setOfferSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminOrder["status"] | "all">("all");
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDiscountPercent, setOfferDiscountPercent] = useState(50);
  const [offerScope, setOfferScope] = useState<"all" | "selected">("all");
  const [offerSelectedSlugs, setOfferSelectedSlugs] = useState<string[]>([]);
  const [offerStartDate, setOfferStartDate] = useState(toDateInputValue(Date.now()));
  const [offerEndDate, setOfferEndDate] = useState(toDateInputValue(Date.now() + 4 * 86400000));

  const pendingOrders = useMemo(
    () => orders.filter((order) => order.status === "payment_submitted").length,
    [orders]
  );

  const pendingReviews = useMemo(
    () => reviews.filter((review) => !review.isApproved).length,
    [reviews]
  );

  const activeOffersCount = useMemo(() => {
    const now = Date.now();
    return offers.filter((offer) => offer.isActive && offer.startAtMs <= now && offer.endAtMs >= now).length;
  }, [offers]);

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
      const [ordersRes, reviewsRes, offersRes] = await Promise.all([
        fetch("/api/admin/orders", { cache: "no-store" }),
        fetch("/api/admin/reviews", { cache: "no-store" }),
        fetch("/api/admin/offers", { cache: "no-store" }),
      ]);

      const ordersPayload = await readJsonSafely(ordersRes);
      const reviewsPayload = await readJsonSafely(reviewsRes);
      const offersPayload = await readJsonSafely(offersRes);

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
      } else {
        setOffers([]);
        issues.push(typeof offersPayload.error === "string" ? offersPayload.error : "Failed to load offers");
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
      setOrders((previous) =>
        previous.map((order) => (order.id === orderId ? { ...order, status } : order))
      );
    }
  };

  const updateReviewApproval = async (id: string, isApproved: boolean) => {
    const response = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isApproved }),
    });

    if (response.ok) {
      setReviews((previous) =>
        previous.map((review) => (review.id === id ? { ...review, isApproved } : review))
      );
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
        startAt: `${offerStartDate}T00:00:00.000Z`,
        endAt: `${offerEndDate}T23:59:59.000Z`,
        isActive: true,
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
    await refreshOffers();
  };

  const toggleOffer = async (offer: AdminOffer, isActive: boolean) => {
    setOfferError("");
    setOfferSuccess("");

    const response = await fetch("/api/admin/offers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: offer.id, isActive }),
    });

    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setOfferError(typeof payload.error === "string" ? payload.error : "Failed to update offer");
      return;
    }

    setOfferSuccess(isActive ? "Offer activated." : "Offer deactivated.");
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

  const toggleServiceSelection = (slug: string) => {
    setOfferSelectedSlugs((previous) =>
      previous.includes(slug) ? previous.filter((item) => item !== slug) : [...previous, slug]
    );
  };

  return (
    <section className="w-full min-h-screen bg-zinc-50 py-16">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 space-y-8">
        <div className="rounded-[20px] border border-zinc-200 bg-white p-8">
          <h1 className="text-4xl font-bold font-plus-jakarta text-foreground mb-2">Admin Panel</h1>
          <p className="text-text-body mb-5">Manage orders and reviews smoothly from one place.</p>
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        </div>

        <div className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-5">
          <h2 className="text-2xl font-bold font-plus-jakarta">Seasonal Offers</h2>
          <p className="text-sm text-zinc-600">Create countdown sales for all services or selected services.</p>

          {offerError && <p className="text-sm text-red-700">{offerError}</p>}
          {offerSuccess && <p className="text-sm text-green-700">{offerSuccess}</p>}

          <form onSubmit={createOffer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">Offer title</label>
              <input
                type="text"
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
                value={offerScope}
                onChange={(event) => setOfferScope(event.target.value as "all" | "selected")}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              >
                <option value="all">All services</option>
                <option value="selected">Selected services</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Start date</label>
              <input
                type="date"
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
                value={offerEndDate}
                onChange={(event) => setOfferEndDate(event.target.value)}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                required
              />
            </div>

            {offerScope === "selected" && (
              <div className="md:col-span-2 rounded border border-zinc-200 p-3">
                <p className="text-sm font-medium mb-2">Selected services</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-auto">
                  {packageProducts.map((product) => (
                    <label key={product.slug} className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={offerSelectedSlugs.includes(product.slug)}
                        onChange={() => toggleServiceSelection(product.slug)}
                      />
                      <span>{product.name}</span>
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
            {offers.map((offer) => (
              <article key={offer.id} className="rounded border border-zinc-200 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{offer.title}</p>
                    <p className="text-sm text-zinc-600">
                      {offer.discountPercent}% OFF • {offer.scope === "all" ? "All services" : `${offer.selectedServiceSlugs.length} selected services`}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(offer.startAtMs).toLocaleDateString("en-LK")} - {new Date(offer.endAtMs).toLocaleDateString("en-LK")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void toggleOffer(offer, !offer.isActive)}
                      className="rounded bg-zinc-800 px-3 py-1.5 text-xs text-white"
                    >
                      {offer.isActive ? "Deactivate" : "Activate"}
                    </button>
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
            ))}

            {offers.length === 0 && <p className="text-sm text-zinc-500">No offers created yet.</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="text-2xl font-bold font-plus-jakarta">Orders</h2>
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search customer, email, ref, package"
                className="rounded border border-zinc-300 px-3 py-2 text-sm"
              />
              <select
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
