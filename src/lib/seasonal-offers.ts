import { randomUUID } from "node:crypto";
import { getFirebaseDb } from "@/lib/firebase-admin";

export type OfferScope = "all" | "selected";

export type SeasonalOffer = {
  id: string;
  title: string;
  discountPercent: number;
  scope: OfferScope;
  selectedServiceSlugs: string[];
  startAtMs: number;
  endAtMs: number;
  isActive: boolean;
  createdAtMs: number;
  updatedAtMs: number;
};

export type ActiveSeasonalOffer = {
  id: string;
  title: string;
  discountPercent: number;
  scope: OfferScope;
  selectedServiceSlugs: string[];
  startAtMs: number;
  endAtMs: number;
};

const OFFERS_COLLECTION = "seasonal_offers";

function clampDiscount(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(1, Math.min(90, Math.floor(value)));
}

function mapOffer(docId: string, data: Record<string, unknown> | undefined): SeasonalOffer | null {
  if (!data) return null;
  if (typeof data.title !== "string") return null;
  if (typeof data.discountPercent !== "number") return null;
  if (typeof data.startAtMs !== "number") return null;
  if (typeof data.endAtMs !== "number") return null;
  if (typeof data.isActive !== "boolean") return null;

  const selectedServiceSlugs = Array.isArray(data.selectedServiceSlugs)
    ? data.selectedServiceSlugs.filter((item): item is string => typeof item === "string")
    : [];

  return {
    id: docId,
    title: data.title,
    discountPercent: clampDiscount(data.discountPercent),
    scope: data.scope === "selected" ? "selected" : "all",
    selectedServiceSlugs,
    startAtMs: data.startAtMs,
    endAtMs: data.endAtMs,
    isActive: data.isActive,
    createdAtMs: typeof data.createdAtMs === "number" ? data.createdAtMs : Date.now(),
    updatedAtMs: typeof data.updatedAtMs === "number" ? data.updatedAtMs : Date.now(),
  };
}

export async function listSeasonalOffers(): Promise<SeasonalOffer[]> {
  const db = getFirebaseDb();
  const snapshot = await db.collection(OFFERS_COLLECTION).get();
  return snapshot.docs
    .map((doc) => mapOffer(doc.id, doc.data() as Record<string, unknown>))
    .filter((offer): offer is SeasonalOffer => Boolean(offer))
    .sort((a, b) => b.createdAtMs - a.createdAtMs);
}

export async function createSeasonalOffer(input: {
  title: string;
  discountPercent: number;
  scope: OfferScope;
  selectedServiceSlugs: string[];
  startAtMs: number;
  endAtMs: number;
  isActive: boolean;
}): Promise<SeasonalOffer> {
  const db = getFirebaseDb();
  const id = randomUUID();
  const now = Date.now();
  const offer: SeasonalOffer = {
    id,
    title: input.title.trim(),
    discountPercent: clampDiscount(input.discountPercent),
    scope: input.scope,
    selectedServiceSlugs: input.scope === "selected" ? input.selectedServiceSlugs : [],
    startAtMs: input.startAtMs,
    endAtMs: input.endAtMs,
    isActive: input.isActive,
    createdAtMs: now,
    updatedAtMs: now,
  };

  await db.collection(OFFERS_COLLECTION).doc(id).set(offer);
  return offer;
}

export async function updateSeasonalOffer(
  id: string,
  updates: Partial<Pick<SeasonalOffer, "title" | "discountPercent" | "scope" | "selectedServiceSlugs" | "startAtMs" | "endAtMs" | "isActive">>,
): Promise<SeasonalOffer | null> {
  const db = getFirebaseDb();
  const ref = db.collection(OFFERS_COLLECTION).doc(id);
  const existing = await ref.get();
  const current = mapOffer(existing.id, existing.data() as Record<string, unknown> | undefined);
  if (!current) return null;

  const nextScope = updates.scope ?? current.scope;
  const nextDiscount = updates.discountPercent ?? current.discountPercent;

  const next: SeasonalOffer = {
    ...current,
    title: (updates.title ?? current.title).trim(),
    discountPercent: clampDiscount(nextDiscount),
    scope: nextScope,
    selectedServiceSlugs:
      nextScope === "selected"
        ? (updates.selectedServiceSlugs ?? current.selectedServiceSlugs)
        : [],
    startAtMs: updates.startAtMs ?? current.startAtMs,
    endAtMs: updates.endAtMs ?? current.endAtMs,
    isActive: updates.isActive ?? current.isActive,
    updatedAtMs: Date.now(),
  };

  await ref.set(next);
  return next;
}

export async function deleteSeasonalOffer(id: string): Promise<boolean> {
  const db = getFirebaseDb();
  const ref = db.collection(OFFERS_COLLECTION).doc(id);
  const snap = await ref.get();
  if (!snap.exists) return false;
  await ref.delete();
  return true;
}

export async function getActiveSeasonalOffer(nowMs = Date.now()): Promise<ActiveSeasonalOffer | null> {
  const offers = await listSeasonalOffers();
  const active = offers.find(
    (offer) => offer.isActive && offer.startAtMs <= nowMs && offer.endAtMs >= nowMs,
  );

  if (!active) return null;

  return {
    id: active.id,
    title: active.title,
    discountPercent: active.discountPercent,
    scope: active.scope,
    selectedServiceSlugs: active.selectedServiceSlugs,
    startAtMs: active.startAtMs,
    endAtMs: active.endAtMs,
  };
}

export function resolveOfferDiscountPercent(slug: string, offer: ActiveSeasonalOffer | null): number {
  if (!offer) return 0;
  if (offer.scope === "all") return offer.discountPercent;
  if (offer.selectedServiceSlugs.includes(slug)) return offer.discountPercent;
  return 0;
}

export function applyOfferToPrice(basePriceLkr: number, slug: string, offer: ActiveSeasonalOffer | null): {
  originalPriceLkr: number;
  priceLkr: number;
  discountPercent: number;
} {
  const discountPercent = resolveOfferDiscountPercent(slug, offer);
  if (discountPercent <= 0) {
    return {
      originalPriceLkr: basePriceLkr,
      priceLkr: basePriceLkr,
      discountPercent: 0,
    };
  }

  const discounted = Math.max(1, Math.round(basePriceLkr * (100 - discountPercent) / 100));
  return {
    originalPriceLkr: basePriceLkr,
    priceLkr: discounted,
    discountPercent,
  };
}
