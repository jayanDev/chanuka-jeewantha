import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { cartItemSchema, cartUpdateSchema } from "@/lib/validation";
import { isTrustedOrigin } from "@/lib/security";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { packageProducts } from "@/lib/packages-catalog";
import {
  calculateBundlePricing,
  isConfigurableBundleSlug,
  serializeBundleSelection,
  type BundleSelection,
} from "@/lib/bundle-pricing";
import {
  applyOfferToPrice,
  getEffectiveSeasonalOffer,
  incrementOfferAnalytics,
  resolveOfferDiscountPercent,
} from "@/lib/seasonal-offers";

const CART_COLLECTION = "cart_items";

function getProductMap() {
  return new Map(packageProducts.map((item) => [item.slug, item]));
}

function makeCartItemId(userId: string, productId: string, bundleSignature?: string): string {
  return bundleSignature ? `${userId}__${productId}__${bundleSignature}` : `${userId}__${productId}`;
}

export async function GET(request: Request) {
  try {
    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const db = getFirebaseDb();
    const activeOffer = await getEffectiveSeasonalOffer(request);
    const productMap = getProductMap();
    const snapshot = await db.collection(CART_COLLECTION).where("userId", "==", user.id).get();

    const items = snapshot.docs
      .map((doc) => {
        const data = doc.data() as {
          productId?: unknown;
          quantity?: unknown;
          createdAtMs?: unknown;
          bundleSelection?: unknown;
        };

        if (typeof data.productId !== "string") return null;
        if (typeof data.quantity !== "number") return null;

        const product = productMap.get(data.productId);
        if (!product) return null;

        let priceLkr = product.priceLkr;
        let originalPriceLkr = product.priceLkr;
        let discountPercent = 0;
        let bundleSelection: BundleSelection | null = null;

        if (isConfigurableBundleSlug(product.slug)) {
          const raw = data.bundleSelection;
          const parsedSelection =
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

          if (!parsedSelection || !parsedSelection.cvSlug || !parsedSelection.coverLetterSlug) {
            return null;
          }

          try {
            const pricing = calculateBundlePricing(product.slug, parsedSelection);
            priceLkr = pricing.priceLkr;
            originalPriceLkr = pricing.originalPriceLkr;
            discountPercent = pricing.discountPercent;
            bundleSelection = {
              cvSlug: pricing.selection.cvSlug,
              coverLetterSlug: pricing.selection.coverLetterSlug,
              linkedinSlug: pricing.selection.linkedinSlug || undefined,
            };
          } catch {
            return null;
          }
        } else {
          const pricing = applyOfferToPrice(product.priceLkr, product.slug, product.category, activeOffer);
          priceLkr = pricing.priceLkr;
          originalPriceLkr = pricing.originalPriceLkr;
          discountPercent = pricing.discountPercent;
        }

        return {
          id: doc.id,
          quantity: Math.max(1, Math.floor(data.quantity)),
          createdAtMs: typeof data.createdAtMs === "number" ? data.createdAtMs : 0,
          product: {
            id: product.slug,
            slug: product.slug,
            name: product.name,
            category: product.category,
            priceLkr,
            originalPriceLkr,
            discountPercent,
            delivery: product.delivery,
            bundleSelection,
          },
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .sort((a, b) => b.createdAtMs - a.createdAtMs)
      .map(({ createdAtMs: _ignore, ...item }) => item);

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "Server error while loading cart" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const parsed = cartItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const productMap = getProductMap();
    const product = productMap.get(parsed.data.productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let bundleSelection: BundleSelection | null = null;
    let bundleSignature: string | undefined;

    if (isConfigurableBundleSlug(product.slug)) {
      const payloadSelection = parsed.data.bundleSelection;
      if (!payloadSelection) {
        return NextResponse.json({ error: "Bundle selection is required for this package." }, { status: 400 });
      }

      try {
        const pricing = calculateBundlePricing(product.slug, payloadSelection);
        bundleSelection = {
          cvSlug: pricing.selection.cvSlug,
          coverLetterSlug: pricing.selection.coverLetterSlug,
          linkedinSlug: pricing.selection.linkedinSlug || undefined,
        };
        bundleSignature = serializeBundleSelection(bundleSelection);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Invalid bundle selection.";
        return NextResponse.json({ error: message }, { status: 400 });
      }
    } else if (parsed.data.bundleSelection) {
      return NextResponse.json({ error: "Bundle selection is only allowed for configurable bundles." }, { status: 400 });
    }

    const activeOffer = await getEffectiveSeasonalOffer(request);
    const discountPercent = resolveOfferDiscountPercent(product.slug, product.category, activeOffer);

    const db = getFirebaseDb();
    const docId = makeCartItemId(user.id, product.slug, bundleSignature);
    const ref = db.collection(CART_COLLECTION).doc(docId);
    const existing = await ref.get();
    const currentQty = existing.exists
      ? Math.max(1, Math.floor((existing.data() as { quantity?: unknown }).quantity as number))
      : 0;

    await ref.set(
      {
        userId: user.id,
        productId: product.slug,
        quantity: currentQty + parsed.data.quantity,
        bundleSelection,
        updatedAtMs: Date.now(),
        createdAtMs: existing.exists
          ? (existing.data() as { createdAtMs?: unknown }).createdAtMs ?? Date.now()
          : Date.now(),
      },
      { merge: true },
    );

    if (activeOffer && discountPercent > 0) {
      await incrementOfferAnalytics(activeOffer.id, "cartAddCount");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error while updating cart" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const parsed = cartUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const db = getFirebaseDb();
    const ref = db.collection(CART_COLLECTION).doc(parsed.data.itemId);
    const existing = await ref.get();
    if (!existing.exists) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    const data = existing.data() as { userId?: unknown } | undefined;
    if (!data || data.userId !== user.id) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    await ref.set({ quantity: parsed.data.quantity, updatedAtMs: Date.now() }, { merge: true });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error while updating cart" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(request.url);
    const itemId = url.searchParams.get("itemId");

    const db = getFirebaseDb();

    if (!itemId) {
      const snapshot = await db.collection(CART_COLLECTION).where("userId", "==", user.id).get();
      await Promise.all(snapshot.docs.map((doc) => doc.ref.delete()));
      return NextResponse.json({ ok: true });
    }

    const ref = db.collection(CART_COLLECTION).doc(itemId);
    const existing = await ref.get();
    if (!existing.exists) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    const data = existing.data() as { userId?: unknown } | undefined;
    if (!data || data.userId !== user.id) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    await ref.delete();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error while updating cart" }, { status: 500 });
  }
}
