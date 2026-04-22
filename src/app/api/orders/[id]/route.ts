import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { createHandoverDownloadToken } from "@/lib/order-download-token";

const ORDERS_COLLECTION = "orders";

type OrderProgressStatus =
  | "pending_payment"
  | "payment_submitted"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

function parseOrderStatus(value: unknown): OrderProgressStatus {
  if (
    value === "pending_payment" ||
    value === "payment_submitted" ||
    value === "confirmed" ||
    value === "in_progress" ||
    value === "completed" ||
    value === "cancelled"
  ) {
    return value;
  }
  return "payment_submitted";
}

function parseHandoverDocuments(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as { id?: unknown; fileName?: unknown; url?: unknown; uploadedAtMs?: unknown; uploadedBy?: unknown };
      if (typeof row.id !== "string" || typeof row.fileName !== "string" || typeof row.url !== "string" || typeof row.uploadedAtMs !== "number" || typeof row.uploadedBy !== "string") return null;
      return { id: row.id, fileName: row.fileName, url: row.url, uploadedAtMs: row.uploadedAtMs, uploadedBy: row.uploadedBy };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

function parseOrderRevisions(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as { id?: unknown; message?: unknown; status?: unknown; requestedAtMs?: unknown; requestedByUserId?: unknown; resolvedAtMs?: unknown; resolvedBy?: unknown; adminResponse?: unknown };
      if (typeof row.id !== "string" || typeof row.message !== "string" || typeof row.requestedAtMs !== "number" || typeof row.requestedByUserId !== "string") return null;
      const status: "open" | "in_review" | "resolved" = row.status === "in_review" || row.status === "resolved" ? row.status : "open";
      return { id: row.id, message: row.message, status, requestedAtMs: row.requestedAtMs, requestedByUserId: row.requestedByUserId, resolvedAtMs: typeof row.resolvedAtMs === "number" ? row.resolvedAtMs : null, resolvedBy: typeof row.resolvedBy === "string" ? row.resolvedBy : null, adminResponse: typeof row.adminResponse === "string" ? row.adminResponse : null };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => b.requestedAtMs - a.requestedAtMs);
}

function parseOrderUpdates(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as { id?: unknown; atMs?: unknown; type?: unknown; title?: unknown; details?: unknown; actorRole?: unknown; status?: unknown };
      if (typeof row.id !== "string" || typeof row.atMs !== "number" || typeof row.type !== "string" || typeof row.title !== "string" || typeof row.actorRole !== "string" || typeof row.status !== "string") return null;
      const type = row.type === "status_updated" || row.type === "handover_uploaded" || row.type === "order_warning" ? row.type : "order_created" as const;
      const actorRole = row.actorRole === "admin" ? "admin" : row.actorRole === "customer" ? "customer" : "system" as const;
      return { id: row.id, atMs: row.atMs, type, title: row.title, details: typeof row.details === "string" ? row.details : null, actorRole, status: parseOrderStatus(row.status) };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => a.atMs - b.atMs);
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Order ID required" }, { status: 400 });

    const db = getFirebaseDb();
    const doc = await db.collection(ORDERS_COLLECTION).doc(id).get();

    if (!doc.exists) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const data = doc.data() as {
      userId?: unknown;
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
      etaDate?: unknown;
      createdAtMs?: unknown;
      handoverDocuments?: unknown;
      revisions?: unknown;
      updates?: unknown;
      items?: unknown;
    };

    // Only allow the owner to view their order
    if (typeof data.userId !== "string" || (data.userId !== user.id && user.role !== "admin")) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const rawItems = Array.isArray(data.items) ? data.items : [];
    const items = rawItems
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const entry = item as { id?: unknown; productName?: unknown; quantity?: unknown; priceLkr?: unknown };
        if (typeof entry.id !== "string" || typeof entry.productName !== "string" || typeof entry.quantity !== "number" || typeof entry.priceLkr !== "number") return null;
        return { id: entry.id, productName: entry.productName, quantity: entry.quantity, priceLkr: entry.priceLkr };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));

    const createdAtMs = typeof data.createdAtMs === "number" ? data.createdAtMs : Date.now();

    const handoverDocuments = parseHandoverDocuments(data.handoverDocuments).map((handoverDocument) => {
      const token = createHandoverDownloadToken({
        userId: user.id,
        orderId: doc.id,
        documentId: handoverDocument.id,
      });
      const query = new URLSearchParams({
        orderId: doc.id,
        documentId: handoverDocument.id,
        exp: String(token.expiresAtMs),
        sig: token.signature,
      });
      return { ...handoverDocument, downloadUrl: `/api/orders/handover/download?${query.toString()}` };
    });

    const order = {
      id: doc.id,
      status: parseOrderStatus(data.status),
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
      extraDetails: typeof data.extraDetails === "string" ? data.extraDetails : typeof data.note === "string" ? data.note : null,
      etaDate: typeof data.etaDate === "string" ? data.etaDate : null,
      createdAt: new Date(createdAtMs).toISOString(),
      handoverDocuments,
      revisions: parseOrderRevisions(data.revisions),
      updates: parseOrderUpdates(data.updates),
      items,
    };

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Order fetch failed:", error);
    return NextResponse.json({ error: "Server error while loading order" }, { status: 500 });
  }
}
