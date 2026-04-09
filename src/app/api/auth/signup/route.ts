import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/lib/validation";
import { createSession, getSessionCookieName, getSessionExpiryDate, hashPassword } from "@/lib/auth";
import { isTrustedOrigin } from "@/lib/security";

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existing = await prisma.appUser.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json({ error: "Email is already in use" }, { status: 409 });
    }

    const user = await prisma.appUser.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        passwordHash: hashPassword(parsed.data.password),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
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
  } catch {
    return NextResponse.json({ error: "Server error while signing up" }, { status: 500 });
  }
}
