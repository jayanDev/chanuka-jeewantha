import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "session_token";

function isProtectedPath(pathname: string): boolean {
  return (
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/notifications") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/reviews-admin")
  );
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;

  if (isProtectedPath(pathname) && !sessionToken) {
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.searchParams.set("returnTo", `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  if ((pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup")) && sessionToken) {
    const returnTo = request.nextUrl.searchParams.get("returnTo") ?? "/";
    const safePath = returnTo.startsWith("/") ? returnTo : "/";
    return NextResponse.redirect(new URL(safePath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/notifications/:path*",
    "/admin/:path*",
    "/reviews-admin/:path*",
    "/auth/signin",
    "/auth/signup",
  ],
};
