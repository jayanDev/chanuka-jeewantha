import { getFirebaseDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const RATE_LIMIT_COLLECTION = "rate_limit_buckets";

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ ok: boolean; remaining: number; resetAt: number }> {
  const db = getFirebaseDb();
  const nowMs = Date.now();
  const resetAtMs = nowMs + windowMs;
  const ref = db.collection(RATE_LIMIT_COLLECTION).doc(key);

  const result = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.data() as { count?: number; resetAtMs?: number } | undefined;

    if (!data || !data.resetAtMs || data.resetAtMs < nowMs) {
      tx.set(ref, { count: 1, resetAtMs });
      return { ok: true, remaining: limit - 1, resetAt: resetAtMs };
    }

    if ((data.count ?? 0) >= limit) {
      return { ok: false, remaining: 0, resetAt: data.resetAtMs };
    }

    tx.update(ref, { count: FieldValue.increment(1) });
    const newCount = (data.count ?? 0) + 1;
    return {
      ok: true,
      remaining: Math.max(0, limit - newCount),
      resetAt: data.resetAtMs,
    };
  });

  return result;
}

export function getClientIp(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const real = request.headers.get("x-real-ip");
  if (real) return real;

  return "unknown";
}
