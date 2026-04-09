import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "@/lib/validation";
import {
  createSession,
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

    const user = await prisma.appUser.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        passwordHash: true,
      },
    });

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
