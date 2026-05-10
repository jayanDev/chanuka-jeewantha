"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  priceLkr: number;
};

type Order = {
  id: string;
  status: "pending_payment" | "payment_submitted" | "confirmed" | "in_progress" | "completed" | "cancelled";
  totalLkr: number;
  createdAt: string;
  items: OrderItem[];
  handoverDocuments: { id: string }[];
  revisions: { id: string; status: string }[];
};

const formatLkr = (price: number) => `LKR ${price.toLocaleString("en-LK")}`;

const statusLabel: Record<Order["status"], string> = {
  pending_payment: "Pending Payment",
  payment_submitted: "Payment Submitted",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const statusColors: Record<Order["status"], string> = {
  pending_payment: "bg-zinc-100 text-zinc-700",
  payment_submitted: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all");

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/orders", { cache: "no-store" });
        const payload = await readJsonSafely(response);

        if (response.status === 401) {
          window.location.assign(`/auth/signin?returnTo=${encodeURIComponent("/orders")}`);
          return;
        }

        if (!response.ok) {
          const message = typeof payload.error === "string" ? payload.error : "Failed to load orders";
          throw new Error(message);
        }

        setOrders(Array.isArray(payload.orders) ? (payload.orders as Order[]) : []);
        setError("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) return false;
      if (!q) return true;
      return (
        order.id.toLowerCase().includes(q) ||
        order.items.some((item) => item.productName.toLowerCase().includes(q))
      );
    });
  }, [orders, search, statusFilter]);

  const totalValue = useMemo(() => orders.reduce((sum, o) => sum + o.totalLkr, 0), [orders]);

  return (
    <section className="w-full bg-zinc-50 py-16 min-h-[70vh]">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold font-heading text-foreground">My Orders</h1>
            <p className="text-sm text-zinc-500 mt-1">Track your order progress and download final documents.</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-zinc-600">
              Total: <span className="font-semibold text-foreground">{formatLkr(totalValue)}</span>
            </p>
            <Link
              href="/pricing"
              className="rounded-[10px] bg-brand-main px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
            >
              + Order More
            </Link>
          </div>
        </div>

        {error && (
          <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {/* Search & Filter */}
        {orders.length > 0 && (
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by package name or order ID..."
              aria-label="Search orders"
              className="flex-1 rounded-[10px] border border-zinc-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-main"
            />
            <select
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Order["status"] | "all")}
              className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-main"
            >
              <option value="all">All Statuses</option>
              {(Object.keys(statusLabel) as Order["status"][]).map((s) => (
                <option key={s} value={s}>{statusLabel[s]}</option>
              ))}
            </select>
          </div>
        )}

        {isLoading ? (
          <p className="text-text-body">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="rounded-[16px] border border-zinc-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-foreground mb-2">No orders yet</p>
            <p className="text-sm text-zinc-500 mb-5">Browse our packages and place your first order.</p>
            <Link
              href="/pricing"
              className="inline-block rounded-[10px] bg-brand-main px-6 py-3 text-white font-medium hover:bg-brand-dark"
            >
              Browse Packages
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-zinc-500">No orders match your search.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => {
              const openRevisions = order.revisions.filter((r) => r.status !== "resolved").length;
              const packageNames = order.items.map((i) => i.productName).join(", ");

              return (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="group block rounded-[16px] border border-zinc-200 bg-white p-5 hover:border-brand-main hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-zinc-400">#{order.id.slice(0, 8)}</span>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[order.status]}`}
                        >
                          {statusLabel[order.status]}
                        </span>
                        {openRevisions > 0 && (
                          <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
                            {openRevisions} revision{openRevisions > 1 ? "s" : ""}
                          </span>
                        )}
                        {order.handoverDocuments.length > 0 && (
                          <span className="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
                            {order.handoverDocuments.length} file{order.handoverDocuments.length > 1 ? "s" : ""} ready
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 font-semibold text-foreground text-sm leading-snug truncate">
                        {packageNames || "Order"}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Placed{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-LK", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
                      <p className="font-bold text-foreground">{formatLkr(order.totalLkr)}</p>
                      <span className="text-xs font-medium text-brand-main group-hover:underline">
                        View details →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

