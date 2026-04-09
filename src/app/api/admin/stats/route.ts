import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { listSeasonalOffers } from "@/lib/seasonal-offers";
import { listCoupons } from "@/lib/coupons";
import { prisma } from "@/lib/prisma";

const USERS_COLLECTION = "app_users";
const ORDERS_COLLECTION = "orders";
const ACTIVITY_COLLECTION = "site_user_activity";

type OrderStatus = "pending_payment" | "payment_submitted" | "confirmed" | "in_progress" | "completed" | "cancelled";

function getScheduleStatus(startAtMs: number, endAtMs: number, isDraft: boolean, isActive: boolean): "draft" | "inactive" | "scheduled" | "active" | "expired" {
  if (isDraft) return "draft";
  if (!isActive) return "inactive";
  const now = Date.now();
  if (endAtMs < now) return "expired";
  if (startAtMs > now) return "scheduled";
  return "active";
}

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getFirebaseDb();
  const now = Date.now();
  const activeCutoff = now - 30 * 60 * 1000;

  const [usersSnap, ordersSnap, activeUsersSnap, offers, coupons, pendingReviews] = await Promise.all([
    db.collection(USERS_COLLECTION).get(),
    db.collection(ORDERS_COLLECTION).get(),
    db.collection(ACTIVITY_COLLECTION).where("lastSeenAtMs", ">=", activeCutoff).get(),
    listSeasonalOffers(),
    listCoupons(),
    prisma.serviceReview.count({ where: { isApproved: false } }),
  ]);

  const orderRows = ordersSnap.docs.map((doc) => doc.data() as { totalLkr?: unknown; status?: unknown });
  const totalRevenueLkr = orderRows.reduce((sum, row) => {
    return sum + (typeof row.totalLkr === "number" ? row.totalLkr : 0);
  }, 0);

  const completedOrders = orderRows.filter((row) => row.status === "completed").length;
  const pendingPaymentSubmitted = orderRows.filter((row) => row.status === "payment_submitted").length;

  const activityRows = activeUsersSnap.docs.map((doc) => doc.data() as {
    totalStayMs?: unknown;
    pingCount?: unknown;
  });

  const totalStayMs = activityRows.reduce((sum, row) => {
    return sum + (typeof row.totalStayMs === "number" ? row.totalStayMs : 0);
  }, 0);
  const totalPings = activityRows.reduce((sum, row) => {
    return sum + (typeof row.pingCount === "number" ? row.pingCount : 0);
  }, 0);

  const avgStayMs = totalPings > 0 ? Math.floor(totalStayMs / totalPings) : 0;

  const activeOffers = offers.filter((offer) => getScheduleStatus(offer.startAtMs, offer.endAtMs, offer.isDraft, offer.isActive) === "active").length;
  const activeCoupons = coupons.filter((coupon) => getScheduleStatus(coupon.startAtMs, coupon.endAtMs, coupon.isDraft, coupon.isActive) === "active").length;

  const stats = {
    generatedAtMs: now,
    liveUsersLast30Min: activeUsersSnap.size,
    totalUsers: usersSnap.size,
    averageStaySeconds: Math.floor(avgStayMs / 1000),
    current: {
      totalOrders: orderRows.length,
      completedOrders,
      paymentSubmittedOrders: pendingPaymentSubmitted,
      pendingReviews,
      activeOffers,
      activeCoupons,
      totalRevenueLkr,
      conversionRatePercent: orderRows.length > 0 ? Number(((completedOrders / orderRows.length) * 100).toFixed(1)) : 0,
    } as {
      totalOrders: number;
      completedOrders: number;
      paymentSubmittedOrders: number;
      pendingReviews: number;
      activeOffers: number;
      activeCoupons: number;
      totalRevenueLkr: number;
      conversionRatePercent: number;
    },
  };

  return NextResponse.json(stats);
}
