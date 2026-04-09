"use client";

import { useEffect, useMemo, useState } from "react";
import { formatLkr, readJsonSafely } from "@/app/admin/_components/admin-utils";
import { statuses, type AdminOrder } from "@/app/admin/_components/admin-types";

export default function OrdersClient() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminOrder["status"] | "all">("all");
  const [error, setError] = useState("");

  const loadOrders = async () => {
    const response = await fetch("/api/admin/orders", { cache: "no-store" });
    const payload = await readJsonSafely(response);

    if (!response.ok) {
      setError(typeof payload.error === "string" ? payload.error : "Failed to load orders");
      setOrders([]);
      return;
    }

    setError("");
    setOrders(Array.isArray(payload.orders) ? (payload.orders as AdminOrder[]) : []);
  };

  useEffect(() => {
    void loadOrders();
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

  return (
    <section className="space-y-4">
      <div className="rounded-[16px] border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold font-plus-jakarta">Order Management</h2>
            <p className="text-sm text-zinc-600">Search, filter, and update order statuses.</p>
          </div>
          <button
            type="button"
            onClick={() => void loadOrders()}
            className="rounded bg-foreground px-4 py-2 text-sm text-white"
          >
            Refresh
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customer, email, ref, package"
            aria-label="Order search"
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

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
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

      {filteredOrders.length === 0 && <p className="text-sm text-zinc-500">No orders found for this filter.</p>}
    </section>
  );
}
