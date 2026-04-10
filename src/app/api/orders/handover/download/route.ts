import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { verifyHandoverDownloadToken } from "@/lib/order-download-token";

const ORDERS_COLLECTION = "orders";

type HandoverDocument = {
  id: string;
  fileName: string;
  url: string;
  uploadedAtMs: number;
  uploadedBy: string;
};

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

export async function GET(request: Request) {
  const user = await getRequestUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId")?.trim() ?? "";
  const documentId = url.searchParams.get("documentId")?.trim() ?? "";
  const signature = url.searchParams.get("sig")?.trim() ?? "";
  const expiresAtMs = Number(url.searchParams.get("exp"));

  if (!orderId || !documentId || !signature || !Number.isFinite(expiresAtMs)) {
    return NextResponse.json({ error: "Invalid handover link" }, { status: 400 });
  }

  const isValidToken = verifyHandoverDownloadToken({
    userId: user.id,
    orderId,
    documentId,
    expiresAtMs,
    signature,
  });

  if (!isValidToken) {
    return NextResponse.json({ error: "Handover link is invalid or expired" }, { status: 403 });
  }

  const db = getFirebaseDb();
  const orderRef = db.collection(ORDERS_COLLECTION).doc(orderId);
  const orderSnapshot = await orderRef.get();

  if (!orderSnapshot.exists) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const orderData = orderSnapshot.data() as {
    userId?: unknown;
    handoverDocuments?: unknown;
  };

  if (typeof orderData.userId !== "string") {
    return NextResponse.json({ error: "Order is missing ownership details" }, { status: 400 });
  }

  if (orderData.userId !== user.id && user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const document = parseHandoverDocuments(orderData.handoverDocuments).find((entry) => entry.id === documentId);
  if (!document) {
    return NextResponse.json({ error: "Handover document not found" }, { status: 404 });
  }

  return NextResponse.redirect(document.url, 302);
}
