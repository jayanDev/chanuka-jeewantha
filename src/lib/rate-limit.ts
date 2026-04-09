import { prisma } from "@/lib/prisma";

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ ok: boolean; remaining: number; resetAt: number }> {
  const now = new Date();
  const nowMs = now.getTime();
  const resetAtMs = nowMs + windowMs;

  // Opportunistically clear stale buckets to keep table bounded.
  await prisma.rateLimitBucket.deleteMany({
    where: { resetAt: { lt: now } },
  });

  const existing = await prisma.rateLimitBucket.findUnique({ where: { key } });

  if (!existing || existing.resetAt.getTime() < nowMs) {
    await prisma.rateLimitBucket.upsert({
      where: { key },
      update: { count: 1, resetAt: new Date(resetAtMs) },
      create: { key, count: 1, resetAt: new Date(resetAtMs) },
    });

    return { ok: true, remaining: limit - 1, resetAt: resetAtMs };
  }

  if (existing.count >= limit) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt.getTime() };
  }

  const updated = await prisma.rateLimitBucket.update({
    where: { key },
    data: { count: { increment: 1 } },
    select: { count: true, resetAt: true },
  });

  return {
    ok: true,
    remaining: Math.max(0, limit - updated.count),
    resetAt: updated.resetAt.getTime(),
  };
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
