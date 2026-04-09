import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { getTokenFromCookieHeader, getUserBySessionToken } from "@/lib/auth";

const VISITOR_COOKIE = "visitor_id";
const ACTIVITY_COLLECTION = "site_user_activity";

function normalizeActiveMs(value: unknown): number {
  const raw = Number(value);
  if (!Number.isFinite(raw) || raw < 0) return 0;
  return Math.min(Math.floor(raw), 5 * 60 * 1000);
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { path?: unknown; activeMs?: unknown };

  const now = Date.now();
  const path = typeof body.path === "string" ? body.path.slice(0, 300) : "/";
  const activeMs = normalizeActiveMs(body.activeMs);

  const cookieHeader = request.headers.get("cookie");
  const existingVisitorId = request.cookies.get(VISITOR_COOKIE)?.value ?? null;
  const visitorId = existingVisitorId ?? randomUUID();

  const sessionToken = getTokenFromCookieHeader(cookieHeader);
  const sessionUser = sessionToken ? await getUserBySessionToken(sessionToken) : null;
  const userId = sessionUser?.id ?? null;

  const identityKey = userId ? `u_${userId}` : `v_${visitorId}`;
  const db = getFirebaseDb();
  const ref = db.collection(ACTIVITY_COLLECTION).doc(identityKey);
  const snap = await ref.get();

  const current = snap.data() as {
    firstSeenAtMs?: unknown;
    totalStayMs?: unknown;
    pingCount?: unknown;
  } | undefined;

  const firstSeenAtMs = typeof current?.firstSeenAtMs === "number" ? current.firstSeenAtMs : now;
  const totalStayMs = typeof current?.totalStayMs === "number" ? current.totalStayMs : 0;
  const pingCount = typeof current?.pingCount === "number" ? current.pingCount : 0;

  await ref.set(
    {
      userId,
      visitorId,
      firstSeenAtMs,
      lastSeenAtMs: now,
      totalStayMs: totalStayMs + activeMs,
      pingCount: pingCount + 1,
      lastPath: path,
      updatedAtMs: now,
    },
    { merge: true },
  );

  const response = NextResponse.json({ ok: true });
  if (!existingVisitorId) {
    response.cookies.set({
      name: VISITOR_COOKIE,
      value: visitorId,
      path: "/",
      maxAge: 60 * 60 * 24 * 180,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false,
    });
  }

  return response;
}
