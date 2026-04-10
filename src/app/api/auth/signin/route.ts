import { NextResponse } from "next/server";
import { signInSchema } from "@/lib/validation";
import {
  createSession,
  findAuthUserByEmail,
  getSessionCookieName,
  getSessionExpiryDate,
  verifyPassword,
} from "@/lib/auth";
import { isTrustedOrigin } from "@/lib/security";

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

  return "Server error while signing in";
}

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = signInSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const user = await findAuthUserByEmail(parsed.data.email);

    if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await createSession(user.id);
    const response = NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

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
