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
          <Link href="/pricing" className="text-brand-main font-medium">Add More Packages</Link>
        </div>

        {error && (
          <p className="mb-6 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {isLoading ? (
          <p className="text-text-body">Loading cart...</p>
        ) : items.length === 0 ? (
          <div className="rounded-[16px] border border-zinc-200 bg-white p-8 text-center">
            <p className="text-text-body mb-4">Your cart is empty.</p>
            <Link href="/pricing" className="inline-block rounded-[10px] bg-brand-main px-5 py-3 text-white font-medium">Browse Packages</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <article key={item.id} className="rounded-[16px] border border-zinc-200 bg-white p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{item.product.name}</h2>
                    <p className="text-sm text-zinc-500">{item.product.category} / {item.product.delivery}</p>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{formatLkr(item.product.priceLkr)}</p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <label className="text-sm">Qty</label>
                  <input
                    type="number"
                    aria-label="Quantity"
                    min={1}
                    max={10}
                    value={item.quantity}
                    onChange={(event) => void updateQty(item.id, Number(event.target.value || 1))}
                    className="w-20 rounded border border-zinc-300 px-2 py-1"
                  />
                  <button
                    type="button"
                    onClick={() => void removeItem(item.id)}
                    className="rounded bg-zinc-200 px-3 py-1 text-sm hover:bg-zinc-300"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}

            <div className="rounded-[16px] border border-zinc-200 bg-white p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-xl font-bold text-foreground">Total: {formatLkr(total)}</p>
              <Link href="/checkout" className="inline-block rounded-[10px] bg-brand-main px-6 py-3 text-white font-medium hover:bg-brand-dark">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
