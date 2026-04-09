import { randomUUID } from "node:crypto";
import { getFirebaseDb } from "@/lib/firebase-admin";

export type OfferScope = "all" | "selected" | "category";
export type OfferPriorityMode = "highest_discount" | "newest";

export type SeasonalOffer = {
  id: string;
  title: string;
  discountPercent: number;
  scope: OfferScope;
  selectedServiceSlugs: string[];
  selectedCategories: string[];
  startAtMs: number;
  endAtMs: number;
  isActive: boolean;
  isDraft: boolean;
  impressionCount: number;
  cartAddCount: number;
  conversionCount: number;
  createdAtMs: number;
  updatedAtMs: number;
};

export type ActiveSeasonalOffer = {
  id: string;
  title: string;
  discountPercent: number;
  scope: OfferScope;
  selectedServiceSlugs: string[];
  selectedCategories: string[];
  startAtMs: number;
  endAtMs: number;
};

const OFFERS_COLLECTION = "seasonal_offers";
const SETTINGS_COLLECTION = "offer_settings";
const SETTINGS_DOC_ID = "global";

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
  const selectedCategories = Array.isArray(data.selectedCategories)
    ? data.selectedCategories.filter((item): item is string => typeof item === "string")
    : [];

  return {
    id: docId,
    title: data.title,
    discountPercent: clampDiscount(data.discountPercent),
    scope: data.scope === "selected" ? "selected" : data.scope === "category" ? "category" : "all",
    selectedServiceSlugs,
    selectedCategories,
    startAtMs: data.startAtMs,
    endAtMs: data.endAtMs,
    isActive: data.isActive,
    isDraft: data.isDraft === true,
    impressionCount: typeof data.impressionCount === "number" ? Math.max(0, Math.floor(data.impressionCount)) : 0,
    cartAddCount: typeof data.cartAddCount === "number" ? Math.max(0, Math.floor(data.cartAddCount)) : 0,
    conversionCount: typeof data.conversionCount === "number" ? Math.max(0, Math.floor(data.conversionCount)) : 0,
    createdAtMs: typeof data.createdAtMs === "number" ? data.createdAtMs : Date.now(),
    updatedAtMs: typeof data.updatedAtMs === "number" ? data.updatedAtMs : Date.now(),
  };
}

function parseCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((item) => item.trim());
  for (const cookie of cookies) {
    const separator = cookie.indexOf("=");
    if (separator < 0) continue;
    const key = cookie.slice(0, separator);
    const value = cookie.slice(separator + 1);
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

export function getOfferPreviewIdFromRequest(request: Request): string | null {
  const headerId = request.headers.get("x-offer-preview-id");
  if (headerId && headerId.trim()) return headerId.trim();

  const url = new URL(request.url);
  const queryId = url.searchParams.get("offerPreview");
  if (queryId && queryId.trim()) return queryId.trim();

  const cookieId = parseCookie(request.headers.get("cookie"), "offer_preview_id");
  if (cookieId && cookieId.trim()) return cookieId.trim();

  return null;
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
  selectedCategories: string[];
  startAtMs: number;
  endAtMs: number;
  isActive: boolean;
  isDraft: boolean;
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
    selectedCategories: input.scope === "category" ? input.selectedCategories : [],
    startAtMs: input.startAtMs,
    endAtMs: input.endAtMs,
    isActive: input.isActive,
    isDraft: input.isDraft,
    impressionCount: 0,
    cartAddCount: 0,
    conversionCount: 0,
    createdAtMs: now,
    updatedAtMs: now,
  };

  await db.collection(OFFERS_COLLECTION).doc(id).set(offer);
  return offer;
}

export async function updateSeasonalOffer(
  id: string,
  updates: Partial<
    Pick<
      SeasonalOffer,
      "title" | "discountPercent" | "scope" | "selectedServiceSlugs" | "selectedCategories" | "startAtMs" | "endAtMs" | "isActive" | "isDraft"
    >
  >,
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
    selectedCategories:
      nextScope === "category"
        ? (updates.selectedCategories ?? current.selectedCategories)
        : [],
    startAtMs: updates.startAtMs ?? current.startAtMs,
    endAtMs: updates.endAtMs ?? current.endAtMs,
    isActive: updates.isActive ?? current.isActive,
    isDraft: updates.isDraft ?? current.isDraft,
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

function getCurrentStatus(offer: SeasonalOffer, nowMs: number): "draft" | "scheduled" | "active" | "expired" | "inactive" {
  if (offer.isDraft) return "draft";
  if (!offer.isActive) return "inactive";
  if (offer.endAtMs < nowMs) return "expired";
  if (offer.startAtMs > nowMs) return "scheduled";
  return "active";
}

function selectByPriority(offers: SeasonalOffer[], mode: OfferPriorityMode): SeasonalOffer | null {
  if (offers.length === 0) return null;

  if (mode === "newest") {
    const sortedByNewest = [...offers].sort((a, b) => b.createdAtMs - a.createdAtMs);
    return sortedByNewest[0] ?? null;
  }

  const sorted = [...offers].sort((a, b) => {
    if (a.discountPercent !== b.discountPercent) {
      return b.discountPercent - a.discountPercent;
    }
    return b.createdAtMs - a.createdAtMs;
  });
  return sorted[0] ?? null;
}

export async function getOfferById(id: string): Promise<SeasonalOffer | null> {
  const db = getFirebaseDb();
  const snap = await db.collection(OFFERS_COLLECTION).doc(id).get();
  return mapOffer(snap.id, snap.data() as Record<string, unknown> | undefined);
}

export async function incrementOfferAnalytics(
  id: string,
  field: "impressionCount" | "cartAddCount" | "conversionCount",
): Promise<void> {
  const db = getFirebaseDb();
  const ref = db.collection(OFFERS_COLLECTION).doc(id);
  const snap = await ref.get();
  const current = mapOffer(snap.id, snap.data() as Record<string, unknown> | undefined);
  if (!current) return;

  const nextValue = (current[field] ?? 0) + 1;
  await ref.set({ [field]: nextValue, updatedAtMs: Date.now() }, { merge: true });
}

function toActiveOffer(offer: SeasonalOffer): ActiveSeasonalOffer {
  return {
    id: offer.id,
    title: offer.title,
    discountPercent: offer.discountPercent,
    scope: offer.scope,
    selectedServiceSlugs: offer.selectedServiceSlugs,
    selectedCategories: offer.selectedCategories,
    startAtMs: offer.startAtMs,
    endAtMs: offer.endAtMs,
  };
}

export async function getActiveSeasonalOffer(nowMs = Date.now()): Promise<ActiveSeasonalOffer | null> {
  const offers = await listSeasonalOffers();
  const activeCandidates = offers.filter((offer) => getCurrentStatus(offer, nowMs) === "active");
  const mode = await getOfferPriorityMode();
  const active = selectByPriority(activeCandidates, mode);

  if (!active) return null;

  return toActiveOffer(active);
}

export async function getPublicVisibleSeasonalOffer(nowMs = Date.now()): Promise<ActiveSeasonalOffer | null> {
  const offers = await listSeasonalOffers();
  const mode = await getOfferPriorityMode();

  const validOffers = offers.filter((offer) => {
    const status = getCurrentStatus(offer, nowMs);
    return status === "active" || status === "scheduled";
  });

  if (validOffers.length === 0) return null;

  const activeOffers = validOffers.filter((offer) => getCurrentStatus(offer, nowMs) === "active");
  if (activeOffers.length > 0) {
    const selected = selectByPriority(activeOffers, mode);
    return selected ? toActiveOffer(selected) : null;
  }

  const scheduledOffers = validOffers
    .filter((offer) => getCurrentStatus(offer, nowMs) === "scheduled")
    .sort((a, b) => a.startAtMs - b.startAtMs || b.discountPercent - a.discountPercent || b.createdAtMs - a.createdAtMs);

  const scheduled = scheduledOffers[0] ?? null;
  return scheduled ? toActiveOffer(scheduled) : null;
}

export async function getEffectiveSeasonalOffer(request: Request, nowMs = Date.now()): Promise<ActiveSeasonalOffer | null> {
  const previewId = getOfferPreviewIdFromRequest(request);
  if (previewId) {
    const previewOffer = await getOfferById(previewId);
    if (previewOffer) {
      return toActiveOffer(previewOffer);
    }
  }

  return getPublicVisibleSeasonalOffer(nowMs);
}

export function getOfferStatus(offer: SeasonalOffer, nowMs = Date.now()): "draft" | "scheduled" | "active" | "expired" | "inactive" {
  return getCurrentStatus(offer, nowMs);
}

export async function getOfferPriorityMode(): Promise<OfferPriorityMode> {
  const db = getFirebaseDb();
  const snap = await db.collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC_ID).get();
  const data = snap.data() as { priorityMode?: unknown } | undefined;
  return data?.priorityMode === "newest" ? "newest" : "highest_discount";
}

export async function setOfferPriorityMode(mode: OfferPriorityMode): Promise<OfferPriorityMode> {
  const db = getFirebaseDb();
  await db.collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC_ID).set(
    {
      priorityMode: mode,
      updatedAtMs: Date.now(),
    },
    { merge: true },
  );
  return mode;
}

export function resolveOfferDiscountPercent(
  slug: string,
  category: string,
  offer: ActiveSeasonalOffer | null,
): number {
  if (!offer) return 0;
  if (offer.scope === "all") return offer.discountPercent;
  if (offer.selectedServiceSlugs.includes(slug)) return offer.discountPercent;
  if (offer.scope === "category" && offer.selectedCategories.includes(category)) return offer.discountPercent;
  return 0;
}

export function applyOfferToPrice(
  basePriceLkr: number,
  slug: string,
  category: string,
  offer: ActiveSeasonalOffer | null,
): {
  originalPriceLkr: number;
  priceLkr: number;
  discountPercent: number;
} {
  const discountPercent = resolveOfferDiscountPercent(slug, category, offer);
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
