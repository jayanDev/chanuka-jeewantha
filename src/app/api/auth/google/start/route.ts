import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const OAUTH_STATE_COOKIE = "google_oauth_state";
const OAUTH_RETURN_TO_COOKIE = "google_oauth_return_to";

function sanitizeReturnTo(value: string | null): string {
  if (!value) return "/";
  if (!value.startsWith("/")) return "/";
  if (value.startsWith("//")) return "/";
  return value;
}

function buildGoogleRedirectUri(requestUrl: URL): string {
  const configuredRedirectUri = process.env.GOOGLE_REDIRECT_URI?.trim();
  if (configuredRedirectUri) {
    try {
      return new URL(configuredRedirectUri).toString();
    } catch {
      // Fall back to origin-based construction when env value is malformed.
    }
  }

  const configuredOrigin =
    process.env.GOOGLE_REDIRECT_ORIGIN?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    requestUrl.origin;

  const normalizedOrigin = configuredOrigin.replace(/\/$/, "");
  return `${normalizedOrigin}/api/auth/google/callback`;
}

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(new URL("/auth/signin?oauthError=Google%20sign-in%20is%20not%20configured", request.url));
  }

  const requestUrl = new URL(request.url);
  const returnTo = sanitizeReturnTo(requestUrl.searchParams.get("returnTo"));
  const state = randomBytes(24).toString("hex");

  const redirectUri = buildGoogleRedirectUri(requestUrl);
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });

  const response = NextResponse.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
  const sharedCookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  };

  response.cookies.set({
    name: OAUTH_STATE_COOKIE,
    value: state,
    ...sharedCookieOptions,
  });

  response.cookies.set({
    name: OAUTH_RETURN_TO_COOKIE,
    value: returnTo,
    ...sharedCookieOptions,
  });

  return response;
}
