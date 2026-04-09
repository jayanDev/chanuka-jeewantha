"use client";

import { useEffect, useMemo, useState } from "react";

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

const statuses: AdminOrder["status"][] = [
  "pending_payment",
  "payment_submitted",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
];

const formatLkr = (price: number) => `LKR ${price.toLocaleString("en-LK")}`;

export default function AdminDashboardClient() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminOrder["status"] | "all">("all");

  const pendingOrders = useMemo(
    () => orders.filter((order) => order.status === "payment_submitted").length,
    [orders]
  );

  const pendingReviews = useMemo(
    () => reviews.filter((review) => !review.isApproved).length,
    [reviews]
  );

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
      const [ordersRes, reviewsRes] = await Promise.all([
        fetch("/api/admin/orders", { cache: "no-store" }),
        fetch("/api/admin/reviews", { cache: "no-store" }),
      ]);

      const ordersPayload = await ordersRes.json();
      const reviewsPayload = await reviewsRes.json();

      if (!ordersRes.ok) throw new Error(ordersPayload?.error ?? "Failed to load orders");
      if (!reviewsRes.ok) throw new Error(reviewsPayload?.error ?? "Failed to load reviews");

      setOrders(ordersPayload.orders ?? []);
      setReviews(reviewsPayload.reviews ?? []);
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
