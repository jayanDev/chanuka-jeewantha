import { NextResponse } from "next/server";
import { destroySession, getSessionCookieName, getTokenFromCookieHeader } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const token = getTokenFromCookieHeader(request.headers.get("cookie"));
    if (token) {
      await destroySession(token);
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: getSessionCookieName(),
      value: "",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Server error while signing out" }, { status: 500 });
  }
}
