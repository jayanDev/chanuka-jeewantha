import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { notifyOrderCreated } from "@/lib/notifications";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { packageProducts } from "@/lib/packages-catalog";
import { applyOfferToPrice, getEffectiveSeasonalOffer, incrementOfferAnalytics } from "@/lib/seasonal-offers";
import { markCouponUsed, validateCouponForItems } from "@/lib/coupons";
import { isAllowedFileType, saveUploadedFile } from "@/lib/upload-storage";

const ORDERS_COLLECTION = "orders";
const CART_COLLECTION = "cart_items";

const SLIP_ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const SLIP_ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "pdf"];

const CV_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const CV_ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];

type OrderProgressStatus =
  | "pending_payment"
  | "payment_submitted"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

type OrderUpdate = {
  id: string;
  atMs: number;
  type: "order_created" | "status_updated" | "handover_uploaded" | "order_warning";
  title: string;
  details: string | null;
  actorRole: "system" | "admin" | "customer";
  status: OrderProgressStatus;
};

type HandoverDocument = {
  id: string;
  fileName: string;
  url: string;
  uploadedAtMs: number;
  uploadedBy: string;
};

function getProductMap() {
  return new Map(packageProducts.map((item) => [item.slug, item]));
}

function toInt(value: FormDataEntryValue | null, fallback = 1): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(1, Math.floor(parsed));
}

function parseHandoverDocuments(value: unknown): HandoverDocument[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as {
        id?: unknown;
        fileName?: unknown;
        url?: unknown;
        uploadedAtMs?: unknown;
        uploadedBy?: unknown;
      };

      if (
        typeof row.id !== "string" ||
        typeof row.fileName !== "string" ||
        typeof row.url !== "string" ||
        typeof row.uploadedAtMs !== "number" ||
        typeof row.uploadedBy !== "string"
      ) {
        return null;
      }

      return {
        id: row.id,
        fileName: row.fileName,
        url: row.url,
        uploadedAtMs: row.uploadedAtMs,
        uploadedBy: row.uploadedBy,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

function parseOrderUpdates(value: unknown): OrderUpdate[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as {
        id?: unknown;
        atMs?: unknown;
        type?: unknown;
        title?: unknown;
        details?: unknown;
        actorRole?: unknown;
        status?: unknown;
      };

      if (
        typeof row.id !== "string" ||
        typeof row.atMs !== "number" ||
        typeof row.type !== "string" ||
        typeof row.title !== "string" ||
        typeof row.actorRole !== "string" ||
        typeof row.status !== "string"
      ) {
        return null;
      }

      const type: OrderUpdate["type"] =
        row.type === "status_updated" || row.type === "handover_uploaded" || row.type === "order_warning"
          ? row.type
          : "order_created";

      const actorRole: OrderUpdate["actorRole"] =
        row.actorRole === "admin" ? "admin" : row.actorRole === "customer" ? "customer" : "system";

      const status: OrderProgressStatus =
        row.status === "pending_payment" ||
        row.status === "payment_submitted" ||
        row.status === "confirmed" ||
        row.status === "in_progress" ||
        row.status === "completed" ||
        row.status === "cancelled"
          ? row.status
          : "payment_submitted";

      return {
        id: row.id,
        atMs: row.atMs,
        type,
        title: row.title,
        details: typeof row.details === "string" ? row.details : null,
        actorRole,
        status,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => a.atMs - b.atMs);
}

function normalizeLinkedinUrl(raw: string): string | null {
  if (!raw) return null;

  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.toLowerCase();
    if (!host.includes("linkedin.com")) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

function toOrderProducts(input: {
  mode: string;
  buyNowProductId: string;
  buyNowQuantity: number;
  userId: string;
  db: ReturnType<typeof getFirebaseDb>;
  activeOffer: Awaited<ReturnType<typeof getEffectiveSeasonalOffer>>;
  productMap: ReturnType<typeof getProductMap>;
}): Promise<Array<{ id: string; name: string; category: string; priceLkr: number; quantity: number }>> {
  if (input.mode === "buy_now") {
    const product = input.productMap.get(input.buyNowProductId);
    if (!product) {
      return Promise.resolve([]);
    }

    const pricing = applyOfferToPrice(product.priceLkr, product.slug, product.category, input.activeOffer);
    return Promise.resolve([
      {
        id: product.slug,
        name: product.name,
        category: product.category,
        priceLkr: pricing.priceLkr,
        quantity: input.buyNowQuantity,
      },
    ]);
  }

  return input.db
    .collection(CART_COLLECTION)
    .where("userId", "==", input.userId)
    .get()
    .then((cartSnapshot) =>
      cartSnapshot.docs
        .map((doc) => {
          const data = doc.data() as { productId?: unknown; quantity?: unknown };
          if (typeof data.productId !== "string" || typeof data.quantity !== "number") {
            return null;
          }

          const product = input.productMap.get(data.productId);
          if (!product) return null;
          const pricing = applyOfferToPrice(product.priceLkr, product.slug, product.category, input.activeOffer);

          return {
            id: product.slug,
            name: product.name,
            category: product.category,
            priceLkr: pricing.priceLkr,
            quantity: Math.max(1, Math.floor(data.quantity)),
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
    );
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
          subtotalLkr?: unknown;
          couponDiscountLkr?: unknown;
          couponCode?: unknown;
          paymentRef?: unknown;
          paymentPersonName?: unknown;
          paymentWhatsApp?: unknown;
          paymentSlipUrl?: unknown;
          paymentSlipUploadFailed?: unknown;
          currentCvUrl?: unknown;
          currentCvFileName?: unknown;
          currentCvUploadFailed?: unknown;
          linkedinUrl?: unknown;
          extraDetails?: unknown;
          note?: unknown;
          createdAtMs?: unknown;
          handoverDocuments?: unknown;
          updates?: unknown;
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
          subtotalLkr: typeof data.subtotalLkr === "number" ? data.subtotalLkr : 0,
          couponDiscountLkr: typeof data.couponDiscountLkr === "number" ? data.couponDiscountLkr : 0,
          couponCode: typeof data.couponCode === "string" ? data.couponCode : null,
          paymentRef: typeof data.paymentRef === "string" ? data.paymentRef : "",
          paymentPersonName: typeof data.paymentPersonName === "string" ? data.paymentPersonName : "",
          paymentWhatsApp: typeof data.paymentWhatsApp === "string" ? data.paymentWhatsApp : "",
          paymentSlipUrl: typeof data.paymentSlipUrl === "string" ? data.paymentSlipUrl : "",
          paymentSlipUploadFailed: data.paymentSlipUploadFailed === true,
          currentCvUrl: typeof data.currentCvUrl === "string" ? data.currentCvUrl : null,
          currentCvFileName: typeof data.currentCvFileName === "string" ? data.currentCvFileName : null,
          currentCvUploadFailed: data.currentCvUploadFailed === true,
          linkedinUrl: typeof data.linkedinUrl === "string" ? data.linkedinUrl : null,
          extraDetails:
            typeof data.extraDetails === "string"
              ? data.extraDetails
              : typeof data.note === "string"
                ? data.note
                : null,
          handoverDocuments: parseHandoverDocuments(data.handoverDocuments),
          updates: parseOrderUpdates(data.updates),
          createdAt: new Date(createdAtMs).toISOString(),
          createdAtMs,
          items,
        };
      })
      .sort((a, b) => b.createdAtMs - a.createdAtMs)
      .map(({ createdAtMs: _ignore, ...order }) => order);

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Order loading failed:", error);
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
    const legacyNote = String(formData.get("note") ?? "").trim();
    const extraDetails = String(formData.get("extraDetails") ?? legacyNote).trim();
    const file = formData.get("slip");
    const currentCvFile = formData.get("currentCv");
    const paymentPersonName = String(formData.get("paymentPersonName") ?? "").trim();
    const paymentWhatsApp = String(formData.get("paymentWhatsApp") ?? "").trim();
    const linkedinRaw = String(formData.get("linkedinUrl") ?? "").trim();

    if (paymentPersonName.length < 2) {
      return NextResponse.json({ error: "Payment person name is required" }, { status: 400 });
    }

    const normalizedWhatsApp = paymentWhatsApp.replace(/\s+/g, "");
    if (!/^\+?[0-9]{9,15}$/.test(normalizedWhatsApp)) {
      return NextResponse.json({ error: "Valid WhatsApp number is required" }, { status: 400 });
    }

    const linkedinUrl = normalizeLinkedinUrl(linkedinRaw);
    if (linkedinRaw && !linkedinUrl) {
      return NextResponse.json({ error: "Enter a valid LinkedIn profile URL" }, { status: 400 });
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Payment slip is required" }, { status: 400 });
    }

    const isAllowedSlipType = isAllowedFileType(file, {
      mimeTypes: SLIP_ALLOWED_MIME_TYPES,
      extensions: SLIP_ALLOWED_EXTENSIONS,
    });
    if (!isAllowedSlipType) {
      return NextResponse.json({ error: "Only JPG, PNG, WEBP or PDF files are allowed" }, { status: 400 });
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Payment slip size must be less than 8MB" }, { status: 400 });
    }

    if (currentCvFile instanceof File && currentCvFile.size > 0) {
      const isAllowedCvType = isAllowedFileType(currentCvFile, {
        mimeTypes: CV_ALLOWED_MIME_TYPES,
        extensions: CV_ALLOWED_EXTENSIONS,
      });
      if (!isAllowedCvType) {
        return NextResponse.json({ error: "Current CV must be PDF, DOC, or DOCX" }, { status: 400 });
      }
      if (currentCvFile.size > 12 * 1024 * 1024) {
        return NextResponse.json({ error: "Current CV size must be less than 12MB" }, { status: 400 });
      }
    }

    const db = getFirebaseDb();
    const productMap = getProductMap();
    const activeOffer = await getEffectiveSeasonalOffer(request);

    let products: Array<{ id: string; name: string; category: string; priceLkr: number; quantity: number }> = [];

    if (mode === "buy_now") {
      const productId = String(formData.get("productId") ?? "");
      const quantity = toInt(formData.get("quantity"), 1);

      products = await toOrderProducts({
        mode,
        buyNowProductId: productId,
        buyNowQuantity: quantity,
        userId: user.id,
        db,
        activeOffer,
        productMap,
      });

      if (products.length === 0) {
        return NextResponse.json({ error: "Selected package is unavailable" }, { status: 404 });
      }
    } else {
      products = await toOrderProducts({
        mode,
        buyNowProductId: "",
        buyNowQuantity: 1,
        userId: user.id,
        db,
        activeOffer,
        productMap,
      });
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

    const uploadWarnings: string[] = [];
    let paymentSlipUrl = "";
    let paymentSlipUploadFailed = false;

    try {
      paymentSlipUrl = await saveUploadedFile({
        file,
        folder: "slips",
      });
    } catch (error) {
      console.error("Order slip upload failed:", error);
      paymentSlipUploadFailed = true;
      uploadWarnings.push(
        "We received your order, but the payment slip could not be saved. Please send your slip on WhatsApp so we can verify faster."
      );
    }

    let currentCvUrl: string | null = null;
    let currentCvFileName: string | null = null;
    let currentCvUploadFailed = false;

    if (currentCvFile instanceof File && currentCvFile.size > 0) {
      currentCvFileName = currentCvFile.name;
      try {
        currentCvUrl = await saveUploadedFile({
          file: currentCvFile,
          folder: "current-cv",
        });
      } catch (error) {
        console.error("Current CV upload failed:", error);
        currentCvUploadFailed = true;
        uploadWarnings.push(
          "Your current CV was not saved to storage. Please share it on WhatsApp so we can proceed without delay."
        );
      }
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

    const updates: OrderUpdate[] = [
      {
        id: randomUUID(),
        atMs: createdAtMs,
        type: "order_created",
        title: "Order placed",
        details: "Order submitted with payment details and awaiting admin confirmation.",
        actorRole: "customer",
        status: "payment_submitted",
      },
    ];

    if (paymentSlipUploadFailed) {
      updates.push({
        id: randomUUID(),
        atMs: createdAtMs,
        type: "order_warning",
        title: "Payment slip requires manual follow-up",
        details: "Slip upload failed in storage. Customer was asked to submit via WhatsApp.",
        actorRole: "system",
        status: "payment_submitted",
      });
    }

    if (currentCvUploadFailed) {
      updates.push({
        id: randomUUID(),
        atMs: createdAtMs,
        type: "order_warning",
        title: "Current CV requires manual follow-up",
        details: "CV upload failed in storage. Customer was asked to submit via WhatsApp.",
        actorRole: "system",
        status: "payment_submitted",
      });
    }

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
      note: extraDetails || null,
      extraDetails: extraDetails || null,
      linkedinUrl,
      paymentSlipUrl,
      paymentSlipUploadFailed,
      currentCvUrl,
      currentCvFileName,
      currentCvUploadFailed,
      status: "payment_submitted",
      createdAtMs,
      updatedAtMs: createdAtMs,
      items,
      paymentPersonName,
      paymentWhatsApp: normalizedWhatsApp,
      handoverDocuments: [] as HandoverDocument[],
      updates,
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

    return NextResponse.json({
      ok: true,
      order,
      warning: uploadWarnings.length > 0 ? uploadWarnings.join(" ") : null,
    });
  } catch (error) {
    console.error("Order placement failed:", error);
    return NextResponse.json({ error: "Server error while placing order" }, { status: 500 });
  }
}
