import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { packageProducts } from "@/lib/packages-catalog";
import { calculateBundlePricing, isConfigurableBundleSlug, type BundleSelection } from "@/lib/bundle-pricing";
import { applyOfferToPrice, getEffectiveSeasonalOffer } from "@/lib/seasonal-offers";
import { validateCouponForItems } from "@/lib/coupons";

const CART_COLLECTION = "cart_items";

type QuoteRequest = {
  mode?: unknown;
  productId?: unknown;
  quantity?: unknown;
  couponCode?: unknown;
  bundleSelection?: unknown;
};

function getProductMap() {
  return new Map(packageProducts.map((item) => [item.slug, item]));
}

function toInt(value: unknown, fallback = 1): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(1, Math.floor(parsed));
}

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const user = await getRequestUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as QuoteRequest;
    const mode = body.mode === "buy_now" ? "buy_now" : "cart";
    const couponCode = typeof body.couponCode === "string" ? body.couponCode.trim() : "";

    const db = getFirebaseDb();
    const activeOffer = await getEffectiveSeasonalOffer(request);
    const productMap = getProductMap();

    let products: Array<{
      slug: string;
      category: string;
      quantity: number;
      priceLkr: number;
      originalPriceLkr: number;
    }> = [];

    if (mode === "buy_now") {
      const productId = typeof body.productId === "string" ? body.productId : "";
      const quantity = toInt(body.quantity, 1);
      const product = productMap.get(productId);

      if (!product) {
        return NextResponse.json({ error: "Selected package is unavailable" }, { status: 404 });
      }

      let pricing = applyOfferToPrice(product.priceLkr, product.slug, product.category, activeOffer);
      if (isConfigurableBundleSlug(product.slug)) {
        const selectionRaw = body.bundleSelection;
        const selection =
          selectionRaw && typeof selectionRaw === "object"
            ? {
                cvSlug: typeof (selectionRaw as { cvSlug?: unknown }).cvSlug === "string" ? (selectionRaw as { cvSlug: string }).cvSlug : "",
                coverLetterSlug:
                  typeof (selectionRaw as { coverLetterSlug?: unknown }).coverLetterSlug === "string"
                    ? (selectionRaw as { coverLetterSlug: string }).coverLetterSlug
                    : "",
                linkedinSlug:
                  typeof (selectionRaw as { linkedinSlug?: unknown }).linkedinSlug === "string"
                    ? (selectionRaw as { linkedinSlug: string }).linkedinSlug
                    : undefined,
              }
            : null;

        if (!selection || !selection.cvSlug || !selection.coverLetterSlug) {
          return NextResponse.json({ error: "Bundle configuration is required." }, { status: 400 });
        }

        try {
          const bundlePricing = calculateBundlePricing(product.slug, selection);
          pricing = {
            priceLkr: bundlePricing.priceLkr,
            originalPriceLkr: bundlePricing.originalPriceLkr,
            discountPercent: bundlePricing.discountPercent,
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : "Invalid bundle configuration.";
          return NextResponse.json({ error: message }, { status: 400 });
        }
      }

      products = [
        {
          slug: product.slug,
          category: product.category,
          quantity,
          priceLkr: pricing.priceLkr,
          originalPriceLkr: pricing.originalPriceLkr,
        },
      ];
    } else {
      const cartSnapshot = await db.collection(CART_COLLECTION).where("userId", "==", user.id).get();
      products = cartSnapshot.docs
        .map((doc) => {
          const data = doc.data() as { productId?: unknown; quantity?: unknown; bundleSelection?: unknown };
          if (typeof data.productId !== "string" || typeof data.quantity !== "number") {
            return null;
          }

          const product = productMap.get(data.productId);
          if (!product) return null;

          let pricing = applyOfferToPrice(product.priceLkr, product.slug, product.category, activeOffer);
          if (isConfigurableBundleSlug(product.slug)) {
            const raw = data.bundleSelection;
            const selection: BundleSelection | null =
              raw && typeof raw === "object"
                ? {
                    cvSlug: typeof (raw as { cvSlug?: unknown }).cvSlug === "string" ? (raw as { cvSlug: string }).cvSlug : "",
                    coverLetterSlug:
                      typeof (raw as { coverLetterSlug?: unknown }).coverLetterSlug === "string"
                        ? (raw as { coverLetterSlug: string }).coverLetterSlug
                        : "",
                    linkedinSlug:
                      typeof (raw as { linkedinSlug?: unknown }).linkedinSlug === "string"
                        ? (raw as { linkedinSlug: string }).linkedinSlug
                        : undefined,
                  }
                : null;

            if (!selection || !selection.cvSlug || !selection.coverLetterSlug) {
              return null;
            }

            try {
              const bundlePricing = calculateBundlePricing(product.slug, selection);
              pricing = {
                priceLkr: bundlePricing.priceLkr,
                originalPriceLkr: bundlePricing.originalPriceLkr,
                discountPercent: bundlePricing.discountPercent,
              };
            } catch {
              return null;
            }
          }

          return {
            slug: product.slug,
            category: product.category,
            quantity: Math.max(1, Math.floor(data.quantity)),
            priceLkr: pricing.priceLkr,
            originalPriceLkr: pricing.originalPriceLkr,
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item));
    }

    if (products.length === 0) {
      return NextResponse.json({ error: "No items to quote" }, { status: 400 });
    }

    const subtotalLkr = products.reduce((sum, item) => sum + item.priceLkr * item.quantity, 0);
    const originalSubtotalLkr = products.reduce((sum, item) => sum + item.originalPriceLkr * item.quantity, 0);
    const offerDiscountLkr = Math.max(0, originalSubtotalLkr - subtotalLkr);

    let couponDiscountLkr = 0;
    if (couponCode) {
      const couponResult = await validateCouponForItems({
        code: couponCode,
        userId: user.id,
        subtotalLkr,
        items: products.map((item) => ({
          slug: item.slug,
          category: item.category,
          quantity: item.quantity,
          priceLkr: item.priceLkr,
        })),
      });

      if (!couponResult.ok) {
        return NextResponse.json({ error: couponResult.error }, { status: 400 });
      }

      couponDiscountLkr = couponResult.discountLkr;
    }

    const totalLkr = Math.max(1, subtotalLkr - couponDiscountLkr);

    return NextResponse.json({
      ok: true,
      summary: {
        itemCount: products.reduce((sum, item) => sum + item.quantity, 0),
        subtotalLkr,
        originalSubtotalLkr,
        offerDiscountLkr,
        couponDiscountLkr,
        totalLkr,
        couponCode: couponCode || null,
      },
    });
  } catch (error) {
    console.error("Order quote failed:", error);
    return NextResponse.json({ error: "Failed to calculate checkout totals" }, { status: 500 });
  }
}
