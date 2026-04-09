import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { getFirebaseDb } from "@/lib/firebase-admin";

const SESSION_COOKIE = "session_token";
const SESSION_DAYS = 30;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

export type AuthUserRecord = AuthUser & {
  passwordHash: string;
};

const USERS_COLLECTION = "app_users";
const SESSIONS_COLLECTION = "auth_sessions";

type StoredAuthUser = {
  name?: unknown;
  email?: unknown;
  role?: unknown;
  passwordHash?: unknown;
};

function mapStoredAuthUser(id: string, data: StoredAuthUser | undefined): AuthUserRecord | null {
  if (!data) return null;
  if (typeof data.name !== "string") return null;
  if (typeof data.email !== "string") return null;
  if (typeof data.passwordHash !== "string") return null;

  return {
    id,
    name: data.name,
    email: data.email.toLowerCase(),
    role: data.role === "admin" ? "admin" : "customer",
    passwordHash: data.passwordHash,
  };
}

function mapAuthUser(record: AuthUserRecord): AuthUser {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    role: record.role,
  };
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hashHex] = storedHash.split(":");
  if (!salt || !hashHex) return false;

  const input = scryptSync(password, salt, 64);
  const stored = Buffer.from(hashHex, "hex");

  if (input.length !== stored.length) return false;
  return timingSafeEqual(input, stored);
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function getSessionExpiryDate(): Date {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + SESSION_DAYS);
  return expiry;
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");

  const db = getFirebaseDb();
  await db.collection(SESSIONS_COLLECTION).doc(token).set({
    userId,
    expiresAtMs: getSessionExpiryDate().getTime(),
  });

  return token;
}

export async function destroySession(token: string): Promise<void> {
  const db = getFirebaseDb();
  await db.collection(SESSIONS_COLLECTION).doc(token).delete();
}

export async function getUserBySessionToken(token: string): Promise<AuthUser | null> {
  const db = getFirebaseDb();
  const sessionRef = db.collection(SESSIONS_COLLECTION).doc(token);
  const sessionSnap = await sessionRef.get();
  if (!sessionSnap.exists) return null;

  const sessionData = sessionSnap.data() as { userId?: unknown; expiresAtMs?: unknown } | undefined;
  if (!sessionData || typeof sessionData.userId !== "string" || typeof sessionData.expiresAtMs !== "number") {
    await sessionRef.delete();
    return null;
  }

  if (sessionData.expiresAtMs < Date.now()) {
    await sessionRef.delete();
    return null;
  }

  const userSnap = await db.collection(USERS_COLLECTION).doc(sessionData.userId).get();
  const user = mapStoredAuthUser(userSnap.id, userSnap.data() as StoredAuthUser | undefined);
  if (!user) {
    await sessionRef.delete();
    return null;
  }

  return mapAuthUser(user);
}

export async function findAuthUserByEmail(email: string): Promise<AuthUserRecord | null> {
  const db = getFirebaseDb();
  const normalized = email.toLowerCase().trim();
  const snapshot = await db
    .collection(USERS_COLLECTION)
    .where("email", "==", normalized)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return mapStoredAuthUser(doc.id, doc.data() as StoredAuthUser);
}

export async function createAuthUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  role?: "customer" | "admin";
}): Promise<AuthUserRecord> {
  const db = getFirebaseDb();
  const id = randomUUID();
  const now = Date.now();
  const normalized = input.email.toLowerCase().trim();
  const role = input.role ?? "customer";

  await db.collection(USERS_COLLECTION).doc(id).set({
    name: input.name,
    email: normalized,
    passwordHash: input.passwordHash,
    role,
    createdAtMs: now,
    updatedAtMs: now,
  });

  return {
    id,
    name: input.name,
    email: normalized,
    passwordHash: input.passwordHash,
    role,
  };
}

export async function setAuthUserRole(userId: string, role: "customer" | "admin"): Promise<AuthUserRecord | null> {
  const db = getFirebaseDb();
  const ref = db.collection(USERS_COLLECTION).doc(userId);
  const existing = await ref.get();
  const record = mapStoredAuthUser(existing.id, existing.data() as StoredAuthUser | undefined);
  if (!record) return null;

  await ref.set({ role, updatedAtMs: Date.now() }, { merge: true });
  return { ...record, role };
}

export function getTokenFromCookieHeader(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((entry) => entry.trim());
  for (const entry of cookies) {
    const [key, value] = entry.split("=");
    if (key === SESSION_COOKIE && value) {
      return decodeURIComponent(value);
    }
  }

  return null;
}
