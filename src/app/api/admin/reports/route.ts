import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { listSeasonalOffers } from "@/lib/seasonal-offers";
import { listCoupons } from "@/lib/coupons";

const ORDERS_COLLECTION = "orders";

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

type FirebaseOrder = {
  totalLkr?: number;
  status?: string;
  createdAt?: string | number | { _seconds?: number };
  items?: Array<{ productName?: string; priceLkr?: number; quantity?: number }>;
  couponCode?: string | null;
  couponDiscountLkr?: number;
};

function parseOrderDate(createdAt: FirebaseOrder["createdAt"]): Date | null {
  if (!createdAt) return null;
  if (typeof createdAt === "string") return new Date(createdAt);
  if (typeof createdAt === "number") return new Date(createdAt);
  if (typeof createdAt === "object" && createdAt._seconds) {
    return new Date(createdAt._seconds * 1000);
  }
  return null;
}

function toDateKey(d: Date): string {
  return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export async function GET(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const db = getFirebaseDb();

    const [ordersSnap, offersRaw, couponsRaw] = await Promise.allSettled([
      db.collection(ORDERS_COLLECTION).get(),
      listSeasonalOffers(),
      listCoupons(),
    ]);

    const orderDocs =
      ordersSnap.status === "fulfilled"
        ? ordersSnap.value.docs.map((d) => d.data() as FirebaseOrder)
        : [];

    const offers = offersRaw.status === "fulfilled" ? offersRaw.value : [];
    const coupons = couponsRaw.status === "fulfilled" ? couponsRaw.value : [];

    // ── Revenue by day (last 30 days) ─────────────────────────────────────────
    const now = new Date();
    const cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Build a map: dateKey → totalRevenueLkr
    const revenueByDay: Record<string, number> = {};
    // Pre-fill 30 days with 0
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      revenueByDay[toDateKey(d)] = 0;
    }

    for (const order of orderDocs) {
      if (order.status !== "completed" && order.status !== "confirmed" && order.status !== "in_progress") continue;
      const date = parseOrderDate(order.createdAt);
      if (!date || date < cutoff) continue;
      const key = toDateKey(date);
      if (key in revenueByDay) {
        revenueByDay[key] += typeof order.totalLkr === "number" ? order.totalLkr : 0;
      }
    }

    const revenueChart = Object.entries(revenueByDay).map(([date, revenue]) => ({
      date,
      revenue,
    }));

    // ── Top packages by revenue ───────────────────────────────────────────────
    const packageRevenue: Record<string, { name: string; revenue: number; count: number }> = {};

    for (const order of orderDocs) {
      if (!Array.isArray(order.items)) continue;
      for (const item of order.items) {
        const name = item.productName ?? "Unknown";
        const rev = typeof item.priceLkr === "number" ? item.priceLkr * (item.quantity ?? 1) : 0;
        if (!packageRevenue[name]) packageRevenue[name] = { name, revenue: 0, count: 0 };
        packageRevenue[name].revenue += rev;
        packageRevenue[name].count += item.quantity ?? 1;
      }
    }

    const topPackages = Object.values(packageRevenue)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // ── Coupon effectiveness ──────────────────────────────────────────────────
    const couponRevenue: Record<string, { code: string; uses: number; discountGiven: number; orderCount: number }> = {};

    for (const order of orderDocs) {
      if (!order.couponCode) continue;
      const code = order.couponCode;
      if (!couponRevenue[code]) {
        couponRevenue[code] = { code, uses: 0, discountGiven: 0, orderCount: 0 };
      }
      couponRevenue[code].orderCount += 1;
      couponRevenue[code].discountGiven += typeof order.couponDiscountLkr === "number" ? order.couponDiscountLkr : 0;
    }

    // Merge with coupon metadata
    const couponEffectiveness = coupons.map((coupon) => ({
      code: coupon.code,
      title: coupon.title,
      discountPercent: coupon.discountPercent,
      maxTotalUses: coupon.maxTotalUses,
      usedCount: coupon.usedCount,
      orderCount: couponRevenue[coupon.code]?.orderCount ?? 0,
      discountGivenLkr: couponRevenue[coupon.code]?.discountGiven ?? 0,
    }));

    // ── Offer performance ─────────────────────────────────────────────────────
    const offerPerformance = offers.map((offer) => ({
      id: offer.id,
      title: offer.title,
      discountPercent: offer.discountPercent,
      impressionCount: offer.impressionCount ?? 0,
      cartAddCount: offer.cartAddCount ?? 0,
      conversionCount: offer.conversionCount ?? 0,
      clickThroughRate:
        offer.impressionCount > 0
          ? Number(((offer.cartAddCount / offer.impressionCount) * 100).toFixed(1))
          : 0,
      conversionRate:
        offer.cartAddCount > 0
          ? Number(((offer.conversionCount / offer.cartAddCount) * 100).toFixed(1))
          : 0,
    }));

    // ── Monthly summary ───────────────────────────────────────────────────────
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    let thisMonthRevenue = 0;
    let lastMonthRevenue = 0;
    let thisMonthOrders = 0;
    let lastMonthOrders = 0;

    for (const order of orderDocs) {
      const date = parseOrderDate(order.createdAt);
      if (!date) continue;
      const rev = typeof order.totalLkr === "number" ? order.totalLkr : 0;

      if (date >= thisMonthStart) {
        thisMonthRevenue += rev;
        thisMonthOrders++;
      } else if (date >= lastMonthStart && date < thisMonthStart) {
        lastMonthRevenue += rev;
        lastMonthOrders++;
      }
    }

    const monthOverMonthPct =
      lastMonthRevenue > 0
        ? Number((((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1))
        : null;

    return NextResponse.json({
      revenueChart,
      topPackages,
      couponEffectiveness,
      offerPerformance,
      monthly: {
        thisMonthRevenue,
        lastMonthRevenue,
        thisMonthOrders,
        lastMonthOrders,
        monthOverMonthPct,
      },
    });
  } catch (error) {
    console.error("Admin reports failed:", error);
    return NextResponse.json({ error: "Failed to load reports" }, { status: 500 });
  }
}
