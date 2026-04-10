import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_VERSION = "v1";
const DEFAULT_TTL_MS = 30 * 60 * 1000;

function getOrderDownloadSecret(): string {
  return process.env.ORDER_LINK_SECRET ?? process.env.FIREBASE_PRIVATE_KEY ?? "dev-order-link-secret";
}

function buildPayload(input: {
  userId: string;
  orderId: string;
  documentId: string;
  expiresAtMs: number;
}): string {
  return [TOKEN_VERSION, input.userId, input.orderId, input.documentId, String(input.expiresAtMs)].join(":");
}

function signPayload(payload: string): string {
  return createHmac("sha256", getOrderDownloadSecret()).update(payload).digest("hex");
}

function constantTimeEqualHex(left: string, right: string): boolean {
  try {
    const leftBuffer = Buffer.from(left, "hex");
    const rightBuffer = Buffer.from(right, "hex");
    if (leftBuffer.length === 0 || rightBuffer.length === 0) return false;
    if (leftBuffer.length !== rightBuffer.length) return false;
    return timingSafeEqual(leftBuffer, rightBuffer);
  } catch {
    return false;
  }
}

export function createHandoverDownloadToken(input: {
  userId: string;
  orderId: string;
  documentId: string;
  expiresInMs?: number;
}): { signature: string; expiresAtMs: number } {
  const expiresInMs = Math.max(60 * 1000, input.expiresInMs ?? DEFAULT_TTL_MS);
  const expiresAtMs = Date.now() + expiresInMs;
  const payload = buildPayload({
    userId: input.userId,
    orderId: input.orderId,
    documentId: input.documentId,
    expiresAtMs,
  });

  return {
    signature: signPayload(payload),
    expiresAtMs,
  };
}

export function verifyHandoverDownloadToken(input: {
  userId: string;
  orderId: string;
  documentId: string;
  expiresAtMs: number;
  signature: string;
}): boolean {
  if (!Number.isFinite(input.expiresAtMs)) return false;
  if (input.expiresAtMs <= Date.now()) return false;

  const payload = buildPayload({
    userId: input.userId,
    orderId: input.orderId,
    documentId: input.documentId,
    expiresAtMs: input.expiresAtMs,
  });

  const expected = signPayload(payload);
  return constantTimeEqualHex(expected, input.signature);
}
