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
    slug: string;
    name: string;
    category: string;
    priceLkr: number;
    originalPriceLkr: number;
    discountPercent: number;
  };
};

type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  priceLkr: number;
  originalPriceLkr: number;
  discountPercent: number;
};

type QuoteSummary = {
  itemCount: number;
  subtotalLkr: number;
  originalSubtotalLkr: number;
  offerDiscountLkr: number;
  couponDiscountLkr: number;
  totalLkr: number;
  couponCode: string | null;
};

type SelectedItem = {
  id: string;
  name: string;
  quantity: number;
  priceLkr: number;
  originalPriceLkr: number;
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
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [extraDetails, setExtraDetails] = useState("");
  const [slip, setSlip] = useState<File | null>(null);
  const [currentCv, setCurrentCv] = useState<File | null>(null);

  const [quoteSummary, setQuoteSummary] = useState<QuoteSummary | null>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);
  const [couponPreviewError, setCouponPreviewError] = useState("");

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

  const buyNowProduct = products.find((item) => item.id === buyNowProductId);

  const selectedItems = useMemo<SelectedItem[]>(() => {
    if (mode === "buy_now") {
      if (!buyNowProduct) return [];
      return [
        {
          id: buyNowProduct.id,
          name: buyNowProduct.name,
          quantity: buyNowQuantity,
          priceLkr: buyNowProduct.priceLkr,
          originalPriceLkr: buyNowProduct.originalPriceLkr,
        },
      ];
    }

    return cartItems.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      priceLkr: item.product.priceLkr,
      originalPriceLkr: item.product.originalPriceLkr,
    }));
  }, [mode, buyNowProduct, buyNowQuantity, cartItems]);

  const fallbackSummary = useMemo<QuoteSummary>(() => {
    const subtotalLkr = selectedItems.reduce((sum, item) => sum + item.priceLkr * item.quantity, 0);
    const originalSubtotalLkr = selectedItems.reduce((sum, item) => sum + item.originalPriceLkr * item.quantity, 0);
    const offerDiscountLkr = Math.max(0, originalSubtotalLkr - subtotalLkr);

    return {
      itemCount: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotalLkr,
      originalSubtotalLkr,
      offerDiscountLkr,
      couponDiscountLkr: 0,
      totalLkr: subtotalLkr,
      couponCode: null,
    };
  }, [selectedItems]);

  useEffect(() => {
    if (isLoading) return;
    if (selectedItems.length === 0) {
      setQuoteSummary(fallbackSummary);
      setCouponPreviewError("");
      return;
    }

    const coupon = couponCode.trim();
    if (!coupon) {
      setQuoteSummary(fallbackSummary);
      setCouponPreviewError("");
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        setIsQuoteLoading(true);
        setCouponPreviewError("");

        const response = await fetch("/api/orders/quote", {
          method: "POST",
          headers: {
            ...buildOfferPreviewHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mode,
            productId: buyNowProductId,
            quantity: buyNowQuantity,
            couponCode: coupon,
          }),
          signal: controller.signal,
        });

        const payload = await readJsonSafely(response);
        if (!response.ok) {
          const message = typeof payload.error === "string" ? payload.error : "Coupon could not be applied";
          setCouponPreviewError(message);
          setQuoteSummary({
            ...fallbackSummary,
            couponCode: coupon,
          });
          return;
        }

        const summaryRaw = payload.summary;
        if (!summaryRaw || typeof summaryRaw !== "object") {
          setQuoteSummary(fallbackSummary);
          return;
        }

        const summary = summaryRaw as {
          itemCount?: unknown;
          subtotalLkr?: unknown;
          originalSubtotalLkr?: unknown;
          offerDiscountLkr?: unknown;
          couponDiscountLkr?: unknown;
          totalLkr?: unknown;
          couponCode?: unknown;
        };

        setQuoteSummary({
          itemCount: typeof summary.itemCount === "number" ? summary.itemCount : fallbackSummary.itemCount,
          subtotalLkr: typeof summary.subtotalLkr === "number" ? summary.subtotalLkr : fallbackSummary.subtotalLkr,
          originalSubtotalLkr:
            typeof summary.originalSubtotalLkr === "number"
              ? summary.originalSubtotalLkr
              : fallbackSummary.originalSubtotalLkr,
          offerDiscountLkr:
            typeof summary.offerDiscountLkr === "number" ? summary.offerDiscountLkr : fallbackSummary.offerDiscountLkr,
          couponDiscountLkr:
            typeof summary.couponDiscountLkr === "number" ? summary.couponDiscountLkr : fallbackSummary.couponDiscountLkr,
          totalLkr: typeof summary.totalLkr === "number" ? summary.totalLkr : fallbackSummary.totalLkr,
          couponCode: typeof summary.couponCode === "string" ? summary.couponCode : null,
        });
      } catch (err) {
        if (!controller.signal.aborted) {
          setCouponPreviewError(err instanceof Error ? err.message : "Coupon could not be applied");
          setQuoteSummary({
            ...fallbackSummary,
            couponCode: coupon,
          });
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsQuoteLoading(false);
        }
      }
    }, 300);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [isLoading, selectedItems, couponCode, mode, buyNowProductId, buyNowQuantity, fallbackSummary]);

  const activeSummary = quoteSummary ?? fallbackSummary;

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
    formData.append("linkedinUrl", linkedinUrl);
    formData.append("extraDetails", extraDetails);
    formData.append("slip", slip);

    if (currentCv) {
      formData.append("currentCv", currentCv);
    }

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

      const warningText =
        typeof payload.warning === "string" && payload.warning.trim().length > 0
          ? ` ${payload.warning}`
          : "";
      setSuccess(
        `Order submitted successfully. We will verify your transfer and confirm your service.${warningText}`
      );
      setSlip(null);
      setCurrentCv(null);
      setPaymentPersonName("");
      setPaymentWhatsApp("");
      setCouponCode("");
      setPaymentRef("");
      setLinkedinUrl("");
      setExtraDetails("");
      setCouponPreviewError("");
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
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 space-y-8">
          <h1 className="text-4xl font-bold font-plus-jakarta text-foreground">Checkout</h1>

          {error && <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          {success && <p className="rounded-[10px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{success}</p>}

          {isLoading ? (
            <p>Loading checkout...</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
              <form onSubmit={onSubmit} className="space-y-6 rounded-[16px] border border-zinc-200 bg-white p-6">
                <div className="rounded-[16px] border border-zinc-200 bg-zinc-50 p-5">
                  <h2 className="text-xl font-bold mb-3">Payment Instructions</h2>
                  <p className="text-text-body mb-4 text-sm">{paymentInstructions.methodNote}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p><strong>Bank:</strong> {paymentInstructions.bank}</p>
                    <p><strong>Name:</strong> {paymentInstructions.accountName}</p>
                    <p><strong>Account No:</strong> {paymentInstructions.accountNumber}</p>
                    <p><strong>Branch:</strong> {paymentInstructions.branch}</p>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Purchase Mode</label>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" checked={mode === "cart"} onChange={() => setMode("cart")} />
                      Checkout Cart
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
                  <label className="mb-2 block text-sm font-medium">LinkedIn Profile URL (optional)</label>
                  <input
                    type="url"
                    aria-label="LinkedIn Profile URL"
                    value={linkedinUrl}
                    onChange={(event) => setLinkedinUrl(event.target.value)}
                    className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                    placeholder="https://www.linkedin.com/in/your-profile"
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
                  {isQuoteLoading && <p className="mt-2 text-xs text-zinc-500">Calculating coupon...</p>}
                  {couponPreviewError && <p className="mt-2 text-xs text-red-600">{couponPreviewError}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Payment Reference (optional)</label>
                  <input
                    type="text"
                    aria-label="Payment Reference"
                    value={paymentRef}
                    onChange={(event) => setPaymentRef(event.target.value)}
                    className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Upload Current CV (optional - PDF, DOC, DOCX)</label>
                  <input
                    type="file"
                    aria-label="Current CV Upload"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => setCurrentCv(event.target.files?.[0] ?? null)}
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
                  <label className="mb-2 block text-sm font-medium">Extra details (optional)</label>
                  <textarea
                    aria-label="Extra details"
                    value={extraDetails}
                    onChange={(event) => setExtraDetails(event.target.value)}
                    rows={4}
                    className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                    placeholder="Share target roles, industry preferences, deadlines, or specific instructions."
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

              <aside className="space-y-4 lg:sticky lg:top-24">
                <div className="rounded-[16px] border border-zinc-200 bg-white p-5 space-y-4">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                  <div className="space-y-2 text-sm text-zinc-700">
                    <div className="flex items-center justify-between">
                      <span>Mode</span>
                      <span className="font-medium">{mode === "buy_now" ? "Buy Now" : "Cart Checkout"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Items</span>
                      <span className="font-medium">{activeSummary.itemCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span>{formatLkr(activeSummary.subtotalLkr)}</span>
                    </div>
                    {activeSummary.offerDiscountLkr > 0 && (
                      <div className="flex items-center justify-between text-emerald-700">
                        <span>Offer discount</span>
                        <span>-{formatLkr(activeSummary.offerDiscountLkr)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-emerald-700">
                      <span>Coupon discount</span>
                      <span>-{formatLkr(activeSummary.couponDiscountLkr)}</span>
                    </div>
                    <div className="border-t border-zinc-200 pt-2 flex items-center justify-between text-base font-bold text-foreground">
                      <span>Final total</span>
                      <span>{formatLkr(activeSummary.totalLkr)}</span>
                    </div>
                  </div>

                  <div className="rounded border border-zinc-200 bg-zinc-50 p-3">
                    <p className="text-xs font-semibold text-zinc-800 mb-1">Included packages</p>
                    {selectedItems.length === 0 ? (
                      <p className="text-xs text-zinc-500">No items selected yet.</p>
                    ) : (
                      <ul className="space-y-1 text-xs text-zinc-700">
                        {selectedItems.map((item) => (
                          <li key={item.id}>
                            {item.name} x {item.quantity} ({formatLkr(item.priceLkr)})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="rounded-[16px] border border-zinc-200 bg-white p-5">
                  <h3 className="font-semibold text-foreground mb-2">What happens next</h3>
                  <ul className="space-y-1 text-sm text-zinc-600">
                    <li>1. Your payment details are reviewed by admin.</li>
                    <li>2. Order status updates appear in My Orders.</li>
                    <li>3. Final deliverables are uploaded for handover.</li>
                    <li>4. You receive a notification when handover is ready.</li>
                  </ul>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
