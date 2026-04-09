"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  paymentRef: string;
  paymentPersonName: string;
  paymentWhatsApp: string;
  paymentSlipUrl: string;
  note: string | null;
  createdAt: string;
  items: OrderItem[];
};

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <section className="w-full bg-zinc-50 py-16 min-h-[70vh]">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold font-plus-jakarta text-foreground">My Orders</h1>
          <Link href="/pricing" className="text-brand-main font-medium">Order More Packages</Link>
        </div>

        {error && <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {isLoading ? (
          <p className="text-text-body">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="rounded-[16px] border border-zinc-200 bg-white p-8 text-center">
            <p className="text-text-body mb-4">You have no orders yet.</p>
            <Link href="/pricing" className="inline-block rounded-[10px] bg-brand-main px-5 py-3 text-white font-medium">Browse Packages</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article key={order.id} className="rounded-[16px] border border-zinc-200 bg-white p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Order #{order.id.slice(0, 8)}</h2>
                    <p className="text-sm text-zinc-500">Placed on {new Date(order.createdAt).toLocaleDateString("en-LK")}</p>
                    <p className="text-sm text-zinc-500">Payment person: {order.paymentPersonName || "-"}</p>
                    <p className="text-sm text-zinc-500">WhatsApp: {order.paymentWhatsApp || "-"}</p>
                    {order.paymentRef && <p className="text-sm text-zinc-500">Payment ref: {order.paymentRef}</p>}
                    <a href={order.paymentSlipUrl} target="_blank" rel="noreferrer" className="text-sm text-brand-main font-medium">
                      View Submitted Slip
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-zinc-500 mb-1">Status</p>
                    <p className="font-semibold text-foreground">{order.status}</p>
                    <p className="mt-2 text-lg font-bold text-foreground">{formatLkr(order.totalLkr)}</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                  {order.items.map((item) => (
                    <li key={item.id}>{item.productName} x {item.quantity} ({formatLkr(item.priceLkr)})</li>
                  ))}
                </ul>

                {order.note && (
                  <p className="mt-3 rounded bg-zinc-100 px-3 py-2 text-sm text-zinc-700">Note: {order.note}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
