import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { cartItemSchema, cartUpdateSchema } from "@/lib/validation";
import { isTrustedOrigin } from "@/lib/security";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { packageProducts } from "@/lib/packages-catalog";

const CART_COLLECTION = "cart_items";

function getProductMap() {
  return new Map(packageProducts.map((item) => [item.slug, item]));
}

function makeCartItemId(userId: string, productId: string): string {
  return `${userId}__${productId}`;
}

export async function GET(request: Request) {
  try {
    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const db = getFirebaseDb();
    const productMap = getProductMap();
    const snapshot = await db.collection(CART_COLLECTION).where("userId", "==", user.id).get();

    const items = snapshot.docs
      .map((doc) => {
        const data = doc.data() as {
          productId?: unknown;
          quantity?: unknown;
          createdAtMs?: unknown;
        };

        if (typeof data.productId !== "string") return null;
        if (typeof data.quantity !== "number") return null;

        const product = productMap.get(data.productId);
        if (!product) return null;

        return {
          id: doc.id,
          quantity: Math.max(1, Math.floor(data.quantity)),
          createdAtMs: typeof data.createdAtMs === "number" ? data.createdAtMs : 0,
          product: {
            id: product.slug,
            slug: product.slug,
            name: product.name,
            category: product.category,
            priceLkr: product.priceLkr,
            delivery: product.delivery,
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

    const db = getFirebaseDb();
    const docId = makeCartItemId(user.id, product.slug);
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
        updatedAtMs: Date.now(),
        createdAtMs: existing.exists
          ? (existing.data() as { createdAtMs?: unknown }).createdAtMs ?? Date.now()
          : Date.now(),
      },
      { merge: true },
    );

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
