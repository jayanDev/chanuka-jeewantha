import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { notifyOrderCreated } from "@/lib/notifications";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { packageProducts } from "@/lib/packages-catalog";
import { applyOfferToPrice, getEffectiveSeasonalOffer, incrementOfferAnalytics } from "@/lib/seasonal-offers";
import { markCouponUsed, validateCouponForItems } from "@/lib/coupons";

const ORDERS_COLLECTION = "orders";
const CART_COLLECTION = "cart_items";

function getProductMap() {
  return new Map(packageProducts.map((item) => [item.slug, item]));
}

function toInt(value: FormDataEntryValue | null, fallback = 1): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(1, Math.floor(parsed));
}

async function saveSlip(file: File): Promise<string> {
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const safeExt = (extension ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const filename = `${Date.now()}-${randomUUID()}.${safeExt || "bin"}`;

  // Vercel production deployments should store uploads in blob/object storage.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/slips/${filename}`, file, {
      access: "public",
    });

    return blob.url;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Slip upload storage is not configured");
  }

  const relativePath = `/uploads/slips/${filename}`;
  const absoluteDir = path.join(process.cwd(), "public", "uploads", "slips");
  const absolutePath = path.join(absoluteDir, filename);

  await mkdir(absoluteDir, { recursive: true });
  const bytes = await file.arrayBuffer();
  await writeFile(absolutePath, Buffer.from(bytes));

  return relativePath;
}

export async function GET(request: Request) {
  try {
    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const db = getFirebaseDb();
    const snapshot = await db.collection(ORDERS_COLLECTION).where("userId", "==", user.id).get();

    const orders = snapshot.docs
      .map((doc) => {
        const data = doc.data() as {
          status?: unknown;
          totalLkr?: unknown;
          paymentRef?: unknown;
          paymentPersonName?: unknown;
          paymentWhatsApp?: unknown;
          paymentSlipUrl?: unknown;
          note?: unknown;
          createdAtMs?: unknown;
          items?: unknown;
        };

        const createdAtMs = typeof data.createdAtMs === "number" ? data.createdAtMs : Date.now();
        const rawItems = Array.isArray(data.items) ? data.items : [];
        const items = rawItems
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const entry = item as {
              id?: unknown;
              productName?: unknown;
              quantity?: unknown;
              priceLkr?: unknown;
            };

            if (
              typeof entry.id !== "string" ||
              typeof entry.productName !== "string" ||
              typeof entry.quantity !== "number" ||
              typeof entry.priceLkr !== "number"
            ) {
              return null;
            }

            return {
              id: entry.id,
              productName: entry.productName,
              quantity: entry.quantity,
              priceLkr: entry.priceLkr,
            };
          })
          .filter((item): item is NonNullable<typeof item> => Boolean(item));

        return {
          id: doc.id,
          status: typeof data.status === "string" ? data.status : "payment_submitted",
          totalLkr: typeof data.totalLkr === "number" ? data.totalLkr : 0,
          paymentRef: typeof data.paymentRef === "string" ? data.paymentRef : "",
          paymentPersonName: typeof data.paymentPersonName === "string" ? data.paymentPersonName : "",
          paymentWhatsApp: typeof data.paymentWhatsApp === "string" ? data.paymentWhatsApp : "",
          paymentSlipUrl: typeof data.paymentSlipUrl === "string" ? data.paymentSlipUrl : "",
          note: typeof data.note === "string" ? data.note : null,
          createdAt: new Date(createdAtMs).toISOString(),
          createdAtMs,
          items,
        };
      })
      .sort((a, b) => b.createdAtMs - a.createdAtMs)
      .map(({ createdAtMs: _ignore, ...order }) => order);

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: "Server error while loading orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();
    const mode = String(formData.get("mode") ?? "cart");
    const paymentRef = String(formData.get("paymentRef") ?? "").trim();
    const couponCode = String(formData.get("couponCode") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();
    const file = formData.get("slip");
    const paymentPersonName = String(formData.get("paymentPersonName") ?? "").trim();
    const paymentWhatsApp = String(formData.get("paymentWhatsApp") ?? "").trim();

    if (paymentPersonName.length < 2) {
      return NextResponse.json({ error: "Payment person name is required" }, { status: 400 });
    }

    const normalizedWhatsApp = paymentWhatsApp.replace(/\s+/g, "");
    if (!/^\+?[0-9]{9,15}$/.test(normalizedWhatsApp)) {
      return NextResponse.json({ error: "Valid WhatsApp number is required" }, { status: 400 });
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Payment slip is required" }, { status: 400 });
    }

    const isAllowedType = ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type);
    if (!isAllowedType) {
      return NextResponse.json({ error: "Only JPG, PNG, WEBP or PDF files are allowed" }, { status: 400 });
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 8MB" }, { status: 400 });
    }

    const db = getFirebaseDb();
    const productMap = getProductMap();
    const activeOffer = await getEffectiveSeasonalOffer(request);
    let products: Array<{ id: string; name: string; category: string; priceLkr: number; quantity: number }> = [];

    if (mode === "buy_now") {
      const productId = String(formData.get("productId") ?? "");
      const quantity = toInt(formData.get("quantity"), 1);

      const product = productMap.get(productId);
      if (!product) {
        return NextResponse.json({ error: "Selected package is unavailable" }, { status: 404 });
      }
      const pricing = applyOfferToPrice(product.priceLkr, product.slug, product.category, activeOffer);

      products = [{ id: product.slug, name: product.name, category: product.category, priceLkr: pricing.priceLkr, quantity }];
    } else {
      const cartSnapshot = await db.collection(CART_COLLECTION).where("userId", "==", user.id).get();

      products = cartSnapshot.docs
        .map((doc) => {
          const data = doc.data() as { productId?: unknown; quantity?: unknown };
          if (typeof data.productId !== "string" || typeof data.quantity !== "number") {
            return null;
          }

          const product = productMap.get(data.productId);
          if (!product) return null;
          const pricing = applyOfferToPrice(product.priceLkr, product.slug, product.category, activeOffer);

          return {
            id: product.slug,
            name: product.name,
            category: product.category,
            priceLkr: pricing.priceLkr,
            quantity: Math.max(1, Math.floor(data.quantity)),
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item));
    }

    if (products.length === 0) {
      return NextResponse.json({ error: "No items to checkout" }, { status: 400 });
    }

    const subtotalLkr = products.reduce((sum, item) => sum + item.priceLkr * item.quantity, 0);

    let couponId: string | null = null;
    let couponDiscountLkr = 0;
    if (couponCode) {
      const couponResult = await validateCouponForItems({
        code: couponCode,
        userId: user.id,
        subtotalLkr,
        items: products.map((item) => ({
          slug: item.id,
          category: item.category,
          priceLkr: item.priceLkr,
          quantity: item.quantity,
        })),
      });

      if (!couponResult.ok) {
        return NextResponse.json({ error: couponResult.error }, { status: 400 });
      }

      couponId = couponResult.coupon.id;
      couponDiscountLkr = couponResult.discountLkr;
    }

    const totalLkr = Math.max(1, subtotalLkr - couponDiscountLkr);

    let paymentSlipUrl = "";
    let uploadWarning: string | null = null;
    try {
      paymentSlipUrl = await saveSlip(file);
    } catch (error) {
      console.error("Order slip upload failed:", error);
      uploadWarning =
        "We received your order, but the slip upload could not be saved. Please send the payment slip on WhatsApp so we can verify faster.";
    }

    const orderId = randomUUID();
    const createdAtMs = Date.now();
    const items = products.map((item, index) => ({
      id: `${orderId}-${index + 1}`,
      productId: item.id,
      productName: item.name,
      priceLkr: item.priceLkr,
      quantity: item.quantity,
    }));

    const order = {
      id: orderId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      totalLkr,
      subtotalLkr,
      paymentRef,
      couponCode: couponCode || null,
      couponDiscountLkr,
      note: note || null,
      paymentSlipUrl,
      paymentSlipUploadFailed: Boolean(uploadWarning),
      status: "payment_submitted",
      createdAtMs,
      updatedAtMs: createdAtMs,
      items,
      paymentPersonName,
      paymentWhatsApp: normalizedWhatsApp,
    };

    await db.collection(ORDERS_COLLECTION).doc(orderId).set(order);

    if (mode !== "buy_now") {
      const cartSnapshot = await db.collection(CART_COLLECTION).where("userId", "==", user.id).get();
      await Promise.all(cartSnapshot.docs.map((doc) => doc.ref.delete()));
    }

    if (activeOffer) {
      await incrementOfferAnalytics(activeOffer.id, "conversionCount");
    }
    if (couponId) {
      await markCouponUsed({ couponId, userId: user.id });
    }

    try {
      await notifyOrderCreated({
        orderId: order.id,
        customerName: user.name,
        customerEmail: user.email,
        paymentRef: paymentRef || `${paymentPersonName} (${normalizedWhatsApp})`,
        totalLkr: order.totalLkr,
        items: order.items.map((item) => ({
          productName: item.productName,
          quantity: item.quantity,
          priceLkr: item.priceLkr,
        })),
      });
    } catch (error) {
      console.error("Order notification failed:", error);
    }

    return NextResponse.json({ ok: true, order, warning: uploadWarning });
  } catch (error) {
    console.error("Order placement failed:", error);
    return NextResponse.json({ error: "Server error while placing order" }, { status: 500 });
  }
}
