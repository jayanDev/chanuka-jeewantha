import { randomUUID } from "node:crypto";
import { getFirebaseDb } from "@/lib/firebase-admin";

export type CouponScope = "all" | "selected" | "category";

export type Coupon = {
  id: string;
  code: string;
  title: string;
  discountPercent: number;
  scope: CouponScope;
  selectedServiceSlugs: string[];
  selectedCategories: string[];
  minOrderLkr: number;
  maxTotalUses: number;
  maxUsesPerUser: number;
  usedCount: number;
  isActive: boolean;
  isDraft: boolean;
  startAtMs: number;
  endAtMs: number;
  createdAtMs: number;
  updatedAtMs: number;
};

const COUPONS_COLLECTION = "coupons";
const COUPON_USES_COLLECTION = "coupon_uses";

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(1, Math.min(90, Math.floor(value)));
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

function mapCoupon(docId: string, data: Record<string, unknown> | undefined): Coupon | null {
  if (!data) return null;
  if (typeof data.code !== "string") return null;
  if (typeof data.title !== "string") return null;
  if (typeof data.discountPercent !== "number") return null;
  if (typeof data.startAtMs !== "number") return null;
  if (typeof data.endAtMs !== "number") return null;
  if (typeof data.isActive !== "boolean") return null;

  const selectedServiceSlugs = Array.isArray(data.selectedServiceSlugs)
    ? data.selectedServiceSlugs.filter((item): item is string => typeof item === "string")
    : [];

  const selectedCategories = Array.isArray(data.selectedCategories)
    ? data.selectedCategories.filter((item): item is string => typeof item === "string")
    : [];

  return {
    id: docId,
    code: normalizeCode(data.code),
    title: data.title,
    discountPercent: clampPercent(data.discountPercent),
    scope: data.scope === "selected" ? "selected" : data.scope === "category" ? "category" : "all",
    selectedServiceSlugs,
    selectedCategories,
    minOrderLkr: typeof data.minOrderLkr === "number" ? Math.max(0, Math.floor(data.minOrderLkr)) : 0,
    maxTotalUses: typeof data.maxTotalUses === "number" ? Math.max(1, Math.floor(data.maxTotalUses)) : 100,
    maxUsesPerUser: typeof data.maxUsesPerUser === "number" ? Math.max(1, Math.floor(data.maxUsesPerUser)) : 1,
    usedCount: typeof data.usedCount === "number" ? Math.max(0, Math.floor(data.usedCount)) : 0,
    isActive: data.isActive,
    isDraft: data.isDraft === true,
    startAtMs: data.startAtMs,
    endAtMs: data.endAtMs,
    createdAtMs: typeof data.createdAtMs === "number" ? data.createdAtMs : Date.now(),
    updatedAtMs: typeof data.updatedAtMs === "number" ? data.updatedAtMs : Date.now(),
  };
}

function couponStatus(coupon: Coupon, nowMs: number): "draft" | "inactive" | "scheduled" | "active" | "expired" {
  if (coupon.isDraft) return "draft";
  if (!coupon.isActive) return "inactive";
  if (coupon.endAtMs < nowMs) return "expired";
  if (coupon.startAtMs > nowMs) return "scheduled";
  return "active";
}

function matchesScope(coupon: Coupon, slug: string, category: string): boolean {
  if (coupon.scope === "all") return true;
  if (coupon.scope === "selected") return coupon.selectedServiceSlugs.includes(slug);
  return coupon.selectedCategories.includes(category);
}

export async function listCoupons(): Promise<Coupon[]> {
  const db = getFirebaseDb();
  const snapshot = await db.collection(COUPONS_COLLECTION).get();
  return snapshot.docs
    .map((doc) => mapCoupon(doc.id, doc.data() as Record<string, unknown>))
    .filter((coupon): coupon is Coupon => Boolean(coupon))
    .sort((a, b) => b.createdAtMs - a.createdAtMs);
}

export async function createCoupon(input: {
  code: string;
  title: string;
  discountPercent: number;
  scope: CouponScope;
  selectedServiceSlugs: string[];
  selectedCategories: string[];
  minOrderLkr: number;
  maxTotalUses: number;
  maxUsesPerUser: number;
  isActive: boolean;
  isDraft: boolean;
  startAtMs: number;
  endAtMs: number;
}): Promise<Coupon> {
  const db = getFirebaseDb();
  const id = randomUUID();
  const now = Date.now();

  const coupon: Coupon = {
    id,
    code: normalizeCode(input.code),
    title: input.title.trim(),
    discountPercent: clampPercent(input.discountPercent),
    scope: input.scope,
    selectedServiceSlugs: input.scope === "selected" ? input.selectedServiceSlugs : [],
    selectedCategories: input.scope === "category" ? input.selectedCategories : [],
    minOrderLkr: Math.max(0, Math.floor(input.minOrderLkr)),
    maxTotalUses: Math.max(1, Math.floor(input.maxTotalUses)),
    maxUsesPerUser: Math.max(1, Math.floor(input.maxUsesPerUser)),
    usedCount: 0,
    isActive: input.isActive,
    isDraft: input.isDraft,
    startAtMs: input.startAtMs,
    endAtMs: input.endAtMs,
    createdAtMs: now,
    updatedAtMs: now,
  };

  await db.collection(COUPONS_COLLECTION).doc(id).set(coupon);
  return coupon;
}

export async function updateCoupon(
  id: string,
  updates: Partial<Pick<Coupon, "title" | "discountPercent" | "scope" | "selectedServiceSlugs" | "selectedCategories" | "minOrderLkr" | "maxTotalUses" | "maxUsesPerUser" | "isActive" | "isDraft" | "startAtMs" | "endAtMs">>,
): Promise<Coupon | null> {
  const db = getFirebaseDb();
  const ref = db.collection(COUPONS_COLLECTION).doc(id);
  const existing = await ref.get();
  const current = mapCoupon(existing.id, existing.data() as Record<string, unknown> | undefined);
  if (!current) return null;

  const scope = updates.scope ?? current.scope;

  const next: Coupon = {
    ...current,
    title: (updates.title ?? current.title).trim(),
    discountPercent: clampPercent(updates.discountPercent ?? current.discountPercent),
    scope,
    selectedServiceSlugs: scope === "selected" ? (updates.selectedServiceSlugs ?? current.selectedServiceSlugs) : [],
    selectedCategories: scope === "category" ? (updates.selectedCategories ?? current.selectedCategories) : [],
    minOrderLkr: updates.minOrderLkr !== undefined ? Math.max(0, Math.floor(updates.minOrderLkr)) : current.minOrderLkr,
    maxTotalUses: updates.maxTotalUses !== undefined ? Math.max(1, Math.floor(updates.maxTotalUses)) : current.maxTotalUses,
    maxUsesPerUser: updates.maxUsesPerUser !== undefined ? Math.max(1, Math.floor(updates.maxUsesPerUser)) : current.maxUsesPerUser,
    isActive: updates.isActive ?? current.isActive,
    isDraft: updates.isDraft ?? current.isDraft,
    startAtMs: updates.startAtMs ?? current.startAtMs,
    endAtMs: updates.endAtMs ?? current.endAtMs,
    updatedAtMs: Date.now(),
  };

  await ref.set(next);
  return next;
}

export async function deleteCoupon(id: string): Promise<boolean> {
  const db = getFirebaseDb();
  const ref = db.collection(COUPONS_COLLECTION).doc(id);
  const snap = await ref.get();
  if (!snap.exists) return false;
  await ref.delete();
  return true;
}

export async function validateCouponForItems(input: {
  code: string;
  userId: string;
  nowMs?: number;
  subtotalLkr: number;
  items: Array<{ slug: string; category: string; priceLkr: number; quantity: number }>;
}): Promise<{ ok: true; coupon: Coupon; discountLkr: number } | { ok: false; error: string }> {
  const db = getFirebaseDb();
  const normalizedCode = normalizeCode(input.code);
  const nowMs = input.nowMs ?? Date.now();

  const snapshot = await db
    .collection(COUPONS_COLLECTION)
    .where("code", "==", normalizedCode)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return { ok: false, error: "Coupon code not found" };
  }

  const coupon = mapCoupon(snapshot.docs[0]!.id, snapshot.docs[0]!.data() as Record<string, unknown>);
  if (!coupon) {
    return { ok: false, error: "Coupon code is invalid" };
  }

  const status = couponStatus(coupon, nowMs);
  if (status !== "active") {
    return { ok: false, error: "Coupon is not active" };
  }

  if (coupon.usedCount >= coupon.maxTotalUses) {
    return { ok: false, error: "Coupon usage limit reached" };
  }

  if (input.subtotalLkr < coupon.minOrderLkr) {
    return { ok: false, error: `Coupon requires minimum order of LKR ${coupon.minOrderLkr}` };
  }

  const userUseId = `${coupon.id}__${input.userId}`;
  const userUseSnap = await db.collection(COUPON_USES_COLLECTION).doc(userUseId).get();
  const usedByUser = userUseSnap.exists
    ? Math.max(0, Math.floor(((userUseSnap.data() as { useCount?: unknown }).useCount as number) ?? 0))
    : 0;

  if (usedByUser >= coupon.maxUsesPerUser) {
    return { ok: false, error: "You have reached this coupon usage limit" };
  }

  const eligibleSubtotal = input.items.reduce((sum, item) => {
    if (!matchesScope(coupon, item.slug, item.category)) return sum;
    return sum + item.priceLkr * item.quantity;
  }, 0);

  if (eligibleSubtotal <= 0) {
    return { ok: false, error: "Coupon does not apply to selected services" };
  }

  const discountLkr = Math.max(1, Math.round(eligibleSubtotal * coupon.discountPercent / 100));
  return { ok: true, coupon, discountLkr };
}

export async function markCouponUsed(input: {
  couponId: string;
  userId: string;
}): Promise<void> {
  const db = getFirebaseDb();
  const couponRef = db.collection(COUPONS_COLLECTION).doc(input.couponId);
  const couponSnap = await couponRef.get();
  const coupon = mapCoupon(couponSnap.id, couponSnap.data() as Record<string, unknown> | undefined);
  if (!coupon) return;

  await couponRef.set({ usedCount: coupon.usedCount + 1, updatedAtMs: Date.now() }, { merge: true });

  const userUseId = `${input.couponId}__${input.userId}`;
  const userUseRef = db.collection(COUPON_USES_COLLECTION).doc(userUseId);
  const userUseSnap = await userUseRef.get();
  const currentUse = userUseSnap.exists
    ? Math.max(0, Math.floor(((userUseSnap.data() as { useCount?: unknown }).useCount as number) ?? 0))
    : 0;

  await userUseRef.set(
    {
      couponId: input.couponId,
      userId: input.userId,
      useCount: currentUse + 1,
      updatedAtMs: Date.now(),
    },
    { merge: true },
  );
}
