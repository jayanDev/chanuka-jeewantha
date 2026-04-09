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
  } catch {
    return NextResponse.json({ error: "Server error while signing in" }, { status: 500 });
  }
}
