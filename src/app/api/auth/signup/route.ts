import { NextResponse } from "next/server";
import { signUpSchema } from "@/lib/validation";
import {
  createAuthUser,
  createSession,
  findAuthUserByEmail,
  getSessionCookieName,
  getSessionExpiryDate,
  hashPassword,
} from "@/lib/auth";
import { isTrustedOrigin } from "@/lib/security";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

function toSafeAuthErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  const normalized = message.toLowerCase();

  if (message.includes("Missing required Firebase env var:")) {
    return message;
  }

  if (normalized.includes("private key")) {
    return "Firebase private key is invalid. Check FIREBASE_PRIVATE_KEY.";
  }

  if (normalized.includes("permission_denied") || normalized.includes("permission denied")) {
    return "Firebase service account does not have Firestore permissions.";
  }

  if (normalized.includes("not_found") || normalized.includes("not found")) {
    return "Firestore database was not found. Enable Firestore in your Firebase project.";
  }

  return "Server error while signing up";
}

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const ip = getClientIp(request);
    const rate = await checkRateLimit(`auth:signup:${ip}`, 3, 60_000);
    if (!rate.ok) {
      return NextResponse.json(
        { error: "Too many sign-up attempts. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existing = await findAuthUserByEmail(parsed.data.email);

    if (existing) {
      return NextResponse.json({ error: "Email is already in use" }, { status: 409 });
    }

    const user = await createAuthUser({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: hashPassword(parsed.data.password),
    });

    const token = await createSession(user.id);

    const response = NextResponse.json({ ok: true, user });
    response.cookies.set({
      name: getSessionCookieName(),
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: getSessionExpiryDate(),
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: toSafeAuthErrorMessage(error) }, { status: 500 });
  }
}
