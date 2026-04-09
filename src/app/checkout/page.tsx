"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { paymentInstructions } from "@/lib/packages-catalog";
import SeasonalOfferBanner from "@/components/SeasonalOfferBanner";
import { buildOfferPreviewHeaders, withOfferPreviewUrl } from "@/lib/offer-preview-client";

type CartItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    priceLkr: number;
  };
};

type Product = {
  id: string;
  slug: string;
  name: string;
  priceLkr: number;
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

export default function CheckoutPage() {
  const params = useSearchParams();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [mode, setMode] = useState<"cart" | "buy_now">("cart");
  const [buyNowProductId, setBuyNowProductId] = useState("");
  const [buyNowQuantity, setBuyNowQuantity] = useState(1);
  const [paymentPersonName, setPaymentPersonName] = useState("");
  const [paymentWhatsApp, setPaymentWhatsApp] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [note, setNote] = useState("");
  const [slip, setSlip] = useState<File | null>(null);

  useEffect(() => {
    const queryMode = params.get("mode");
    const queryProductId = params.get("productId");

    if (queryMode === "buy_now") {
      setMode("buy_now");
    }
    if (queryProductId) {
      setBuyNowProductId(queryProductId);
    }
  }, [params]);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [cartRes, productsRes] = await Promise.all([
          fetch(withOfferPreviewUrl("/api/cart"), { cache: "no-store", headers: buildOfferPreviewHeaders() }),
          fetch(withOfferPreviewUrl("/api/products"), { cache: "no-store", headers: buildOfferPreviewHeaders() }),
        ]);

        const cartPayload = await readJsonSafely(cartRes);
        if (cartRes.status === 401) {
          const returnPath = `/checkout${window.location.search}`;
          window.location.assign(`/auth/signin?returnTo=${encodeURIComponent(returnPath)}`);
          return;
        }
        if (!cartRes.ok) {
          const message = typeof cartPayload.error === "string" ? cartPayload.error : "Failed to load cart";
          throw new Error(message);
        }

        const productsPayload = await readJsonSafely(productsRes);
        if (!productsRes.ok) {
          const message = typeof productsPayload.error === "string" ? productsPayload.error : "Failed to load products";
          throw new Error(message);
        }

        setCartItems(Array.isArray(cartPayload.items) ? (cartPayload.items as CartItem[]) : []);
        setProducts(Array.isArray(productsPayload.products) ? (productsPayload.products as Product[]) : []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load checkout");
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.priceLkr * item.quantity, 0),
    [cartItems]
  );

  const buyNowProduct = products.find((item) => item.id === buyNowProductId);
  const buyNowTotal = (buyNowProduct?.priceLkr ?? 0) * buyNowQuantity;

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!slip) {
      setError("Please upload your payment slip.");
      return;
    }

    const formData = new FormData();
    formData.append("mode", mode);
    formData.append("paymentPersonName", paymentPersonName);
    formData.append("paymentWhatsApp", paymentWhatsApp);
    formData.append("couponCode", couponCode);
    formData.append("paymentRef", paymentRef);
    formData.append("note", note);
    formData.append("slip", slip);

    if (mode === "buy_now") {
      if (!buyNowProductId) {
        setError("Please select a package for Buy Now.");
        return;
      }

      formData.append("productId", buyNowProductId);
      formData.append("quantity", String(buyNowQuantity));
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: buildOfferPreviewHeaders(),
        body: formData,
      });

      const payload = await readJsonSafely(response);
      if (!response.ok) {
        const message = typeof payload.error === "string" ? payload.error : "Failed to place order";
        throw new Error(message);
      }

      setSuccess("Order submitted successfully. We will verify your transfer and confirm your service.");
      setSlip(null);
      setPaymentPersonName("");
      setPaymentWhatsApp("");
      setCouponCode("");
      setPaymentRef("");
      setNote("");
      if (mode === "cart") {
        setCartItems([]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SeasonalOfferBanner />

      <section className="w-full bg-zinc-50 py-16 min-h-[70vh]">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 space-y-8">
        <h1 className="text-4xl font-bold font-plus-jakarta text-foreground">Checkout</h1>

        <div className="rounded-[16px] border border-zinc-200 bg-white p-6">
          <h2 className="text-2xl font-bold mb-3">Payment Instructions</h2>
          <p className="text-text-body mb-4">{paymentInstructions.methodNote}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><strong>Bank:</strong> {paymentInstructions.bank}</p>
            <p><strong>Name:</strong> {paymentInstructions.accountName}</p>
            <p><strong>Account No:</strong> {paymentInstructions.accountNumber}</p>
            <p><strong>Branch:</strong> {paymentInstructions.branch}</p>
          </div>
        </div>

        {error && <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {success && <p className="rounded-[10px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{success}</p>}

        {isLoading ? (
          <p>Loading checkout...</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6 rounded-[16px] border border-zinc-200 bg-white p-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Purchase Mode</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center gap-2">
                  <input type="radio" checked={mode === "cart"} onChange={() => setMode("cart")} />
                  Checkout Cart ({formatLkr(cartTotal)})
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" checked={mode === "buy_now"} onChange={() => setMode("buy_now")} />
                  Buy Now
                </label>
              </div>
            </div>

            {mode === "buy_now" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Select Package</label>
                  <select
                    aria-label="Select Package"
                    value={buyNowProductId}
                    onChange={(event) => setBuyNowProductId(event.target.value)}
                    className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                    required
                  >
                    <option value="">Choose package</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {formatLkr(product.priceLkr)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Quantity</label>
                  <input
                    type="number"
                    aria-label="Quantity"
                    min={1}
                    max={10}
                    value={buyNowQuantity}
                    onChange={(event) => setBuyNowQuantity(Number(event.target.value || 1))}
                    className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                  />
                  <p className="mt-2 text-sm text-zinc-500">Total: {formatLkr(buyNowTotal)}</p>
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium">Payment Person Name</label>
              <input
                type="text"
                aria-label="Payment Person Name"
                value={paymentPersonName}
                onChange={(event) => setPaymentPersonName(event.target.value)}
                required
                className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">WhatsApp Number</label>
              <input
                type="tel"
                aria-label="WhatsApp Number"
                value={paymentWhatsApp}
                onChange={(event) => setPaymentWhatsApp(event.target.value)}
                required
                className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                placeholder="e.g. 0773902230"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Coupon Code (optional)</label>
              <input
                type="text"
                aria-label="Coupon Code"
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value.toUpperCase())}
                className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                placeholder="NEWYEAR50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Payment Reference (Optional)</label>
              <input
                type="text"
                aria-label="Payment Reference"
                value={paymentRef}
                onChange={(event) => setPaymentRef(event.target.value)}
                className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Upload Payment Slip (JPG, PNG, WEBP, PDF)</label>
              <input
                type="file"
                aria-label="Payment Slip Upload"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                onChange={(event) => setSlip(event.target.files?.[0] ?? null)}
                required
                className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Notes (optional)</label>
              <textarea
                aria-label="Order Notes"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={4}
                className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-[10px] bg-brand-main px-6 py-3 text-white font-medium hover:bg-brand-dark disabled:opacity-60"
              >
                {isSubmitting ? "Submitting order..." : "Submit Order"}
              </button>
              <Link href="/cart" className="rounded-[10px] border border-zinc-300 px-6 py-3 font-medium text-foreground">Back to Cart</Link>
            </div>
          </form>
        )}
        </div>
      </section>
    </>
  );
}
