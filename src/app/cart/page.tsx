"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { buildOfferPreviewHeaders, withOfferPreviewUrl } from "@/lib/offer-preview-client";

type CartItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    category: string;
    priceLkr: number;
    delivery: string;
  };
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

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.product.priceLkr, 0),
    [items]
  );

  const loadCart = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(withOfferPreviewUrl("/api/cart"), {
        cache: "no-store",
        headers: buildOfferPreviewHeaders(),
      });
      const payload = await readJsonSafely(response);

      if (response.status === 401) {
        window.location.assign(`/auth/signin?returnTo=${encodeURIComponent("/cart")}`);
        return;
      }

      if (!response.ok) {
        const message = typeof payload.error === "string" ? payload.error : "Failed to load cart";
        throw new Error(message);
      }

      setItems(Array.isArray(payload.items) ? (payload.items as CartItem[]) : []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load cart");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadCart();
  }, []);

  const updateQty = async (itemId: string, quantity: number) => {
    setError("");
    const response = await fetch("/api/cart", {
      method: "PATCH",
      headers: buildOfferPreviewHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ itemId, quantity }),
    });
    const payload = await readJsonSafely(response);
    if (!response.ok) {
      const message = typeof payload.error === "string" ? payload.error : "Failed to update cart";
      setError(message);
      return;
    }
    await loadCart();
  };

  const removeItem = async (itemId: string) => {
    setError("");
    const response = await fetch(withOfferPreviewUrl(`/api/cart?itemId=${encodeURIComponent(itemId)}`), {
      method: "DELETE",
      headers: buildOfferPreviewHeaders(),
    });
    const payload = await readJsonSafely(response);
    if (!response.ok) {
      const message = typeof payload.error === "string" ? payload.error : "Failed to update cart";
      setError(message);
      return;
    }
    await loadCart();
  };

  return (
    <section className="w-full bg-zinc-50 py-16 min-h-[70vh]">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold font-plus-jakarta text-foreground">Your Cart</h1>
          <Link href="/pricing" className="text-brand-main font-medium text-sm">+ Add More Packages</Link>
        </div>

        {error && (
          <p className="mb-6 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {isLoading ? (
          <p className="text-text-body">Loading cart...</p>
        ) : items.length === 0 ? (
          <div className="rounded-[16px] border border-zinc-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-foreground mb-2">Your cart is empty</p>
            <p className="text-sm text-zinc-500 mb-5">Browse our packages to find the right one for you.</p>
            <Link href="/pricing" className="inline-block rounded-[10px] bg-brand-main px-6 py-3 text-white font-medium hover:bg-brand-dark">Browse Packages</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <article key={item.id} className="rounded-[16px] border border-zinc-200 bg-white p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-foreground">{item.product.name}</h2>
                    <p className="text-sm text-zinc-500 mt-0.5">
                      {item.product.category}
                      {item.product.delivery ? ` · ${item.product.delivery}` : ""}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {formatLkr(item.product.priceLkr)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* +/- quantity controls */}
                    <div className="flex items-center gap-1 rounded-[10px] border border-zinc-200 bg-zinc-50 p-1">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        disabled={item.quantity <= 1}
                        onClick={() => void updateQty(item.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-[8px] text-zinc-600 hover:bg-zinc-200 disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        disabled={item.quantity >= 10}
                        onClick={() => void updateQty(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-[8px] text-zinc-600 hover:bg-zinc-200 disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                    <p className="w-28 text-right font-semibold text-foreground">
                      {formatLkr(item.product.priceLkr * item.quantity)}
                    </p>
                    <button
                      type="button"
                      onClick={() => void removeItem(item.id)}
                      aria-label="Remove item"
                      className="rounded-[8px] border border-zinc-200 px-2 py-1.5 text-xs text-zinc-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {/* Totals + Proceed */}
            <div className="rounded-[16px] border border-zinc-200 bg-white p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-zinc-500">{items.length} item{items.length > 1 ? "s" : ""}</p>
                  <p className="text-2xl font-bold text-foreground mt-0.5">{formatLkr(total)}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">Final price calculated at checkout after coupons</p>
                </div>
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center rounded-[12px] bg-brand-main px-8 py-3.5 text-base font-semibold text-white hover:bg-brand-dark"
                >
                  Proceed to Checkout →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
