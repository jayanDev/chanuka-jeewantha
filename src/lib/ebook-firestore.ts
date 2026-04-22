/**
 * Firestore-backed storage for EbookPurchase and EbookProgress.
 * Replaces the Prisma/SQLite models which are unavailable on Vercel
 * (SQLite requires a persistent local file system).
 *
 * Collections:
 *   ebook_purchases  — admin-granted read/download access per email+slug
 *   ebook_progress   — per-user chapter completion tracking
 */
import { getFirebaseDb } from "@/lib/firebase-admin";

const PURCHASES_COLLECTION = "ebook_purchases";
const PROGRESS_COLLECTION = "ebook_progress";

// ── Types ────────────────────────────────────────────────────────────────────

export type EbookPurchase = {
  /** Document ID: "{email}___{ebookSlug}" */
  id: string;
  email: string;
  ebookSlug: string;
  tier: "read" | "download";
  grantedAt: string; // ISO date string
  grantedBy: string; // admin user id
  note: string | null;
};

export type EbookProgress = {
  userId: string;
  ebookSlug: string;
  completedChapters: number[];
  isCompleted: boolean;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Stable composite document ID for a purchase record. */
function purchaseDocId(email: string, ebookSlug: string): string {
  // email and ebookSlug contain only safe chars for Firestore doc IDs
  return `${email}___${ebookSlug}`;
}

/** Stable composite document ID for a progress record. */
function progressDocId(userId: string, ebookSlug: string): string {
  return `${userId}___${ebookSlug}`;
}

function parsePurchase(id: string, data: Record<string, unknown>): EbookPurchase | null {
  if (
    typeof data.email !== "string" ||
    typeof data.ebookSlug !== "string" ||
    typeof data.grantedBy !== "string" ||
    (data.tier !== "read" && data.tier !== "download")
  ) {
    return null;
  }

  const grantedAt =
    typeof data.grantedAtMs === "number"
      ? new Date(data.grantedAtMs).toISOString()
      : new Date().toISOString();

  return {
    id,
    email: data.email,
    ebookSlug: data.ebookSlug,
    tier: data.tier,
    grantedAt,
    grantedBy: data.grantedBy,
    note: typeof data.note === "string" ? data.note : null,
  };
}

// ── Purchase operations ───────────────────────────────────────────────────────

export async function getEbookPurchase(
  email: string,
  ebookSlug: string
): Promise<EbookPurchase | null> {
  const db = getFirebaseDb();
  const snap = await db
    .collection(PURCHASES_COLLECTION)
    .doc(purchaseDocId(email, ebookSlug))
    .get();

  if (!snap.exists) return null;
  return parsePurchase(snap.id, snap.data() as Record<string, unknown>);
}

export async function listEbookPurchases(): Promise<EbookPurchase[]> {
  const db = getFirebaseDb();
  const snap = await db
    .collection(PURCHASES_COLLECTION)
    .orderBy("grantedAtMs", "desc")
    .get();

  return snap.docs
    .map((doc) => parsePurchase(doc.id, doc.data() as Record<string, unknown>))
    .filter((p): p is EbookPurchase => p !== null);
}

export async function upsertEbookPurchase(input: {
  email: string;
  ebookSlug: string;
  tier: "read" | "download";
  grantedBy: string;
  note?: string;
}): Promise<EbookPurchase> {
  const db = getFirebaseDb();
  const docId = purchaseDocId(input.email, input.ebookSlug);
  const now = Date.now();

  await db
    .collection(PURCHASES_COLLECTION)
    .doc(docId)
    .set({
      email: input.email,
      ebookSlug: input.ebookSlug,
      tier: input.tier,
      grantedBy: input.grantedBy,
      grantedAtMs: now,
      note: input.note ?? null,
    });

  return {
    id: docId,
    email: input.email,
    ebookSlug: input.ebookSlug,
    tier: input.tier,
    grantedAt: new Date(now).toISOString(),
    grantedBy: input.grantedBy,
    note: input.note ?? null,
  };
}

export async function deleteEbookPurchase(id: string): Promise<void> {
  const db = getFirebaseDb();
  await db.collection(PURCHASES_COLLECTION).doc(id).delete();
}

// ── Progress operations ───────────────────────────────────────────────────────

export async function getEbookProgress(
  userId: string,
  ebookSlug: string
): Promise<EbookProgress | null> {
  const db = getFirebaseDb();
  const snap = await db
    .collection(PROGRESS_COLLECTION)
    .doc(progressDocId(userId, ebookSlug))
    .get();

  if (!snap.exists) return null;
  const data = snap.data() as Record<string, unknown>;

  return {
    userId,
    ebookSlug,
    completedChapters: Array.isArray(data.completedChapters)
      ? (data.completedChapters as unknown[]).filter(
          (x): x is number => typeof x === "number"
        )
      : [],
    isCompleted: data.isCompleted === true,
  };
}

export async function upsertEbookProgress(input: {
  userId: string;
  ebookSlug: string;
  completedChapters: number[];
  isCompleted: boolean;
}): Promise<void> {
  const db = getFirebaseDb();
  await db
    .collection(PROGRESS_COLLECTION)
    .doc(progressDocId(input.userId, input.ebookSlug))
    .set({
      userId: input.userId,
      ebookSlug: input.ebookSlug,
      completedChapters: input.completedChapters,
      isCompleted: input.isCompleted,
      updatedAtMs: Date.now(),
    });
}
