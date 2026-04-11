import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import {
  createAuthUser,
  createSession,
  findAuthUserByEmail,
  getSessionCookieName,
  getSessionExpiryDate,
  hashPassword,
  setAuthUserRole,
} from "@/lib/auth";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";
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

function getAdminEmailSet(): Set<string> {
  return new Set(
    (process.env.GOOGLE_ADMIN_EMAILS ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

function signInErrorRedirect(request: Request, message: string) {
  const url = new URL("/auth/signin", request.url);
  url.searchParams.set("oauthError", message);
  return NextResponse.redirect(url);
}

function toSafeErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  const normalized = message.toLowerCase();
  const errorCode =
    typeof error === "object" && error !== null && "code" in error
      ? (error as { code?: unknown }).code
      : undefined;

  if (errorCode === 5 || normalized.includes("not_found")) {
    return "Firestore database was not found. Enable Firestore in this Firebase project.";
  }

  if (message.includes("Missing required Firebase env var:")) {
    return message;
  }

  if (normalized.includes("private key")) {
    return "Firebase private key is invalid. Check FIREBASE_PRIVATE_KEY in Vercel.";
  }

  if (
    normalized.includes("permission_denied") ||
    normalized.includes("permission denied") ||
    normalized.includes("does not have permission")
  ) {
    return "Firebase service account lacks Firestore permissions.";
  }

  if (message.includes("FIREBASE_")) {
    return "Firebase is not configured. Please set Firebase env vars in Vercel.";
  }

  if (message) {
    return "Google sign-in failed due to server configuration.";
  }

  return "Google sign-in failed. Please try again.";
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");

  if (!code || !state) {
    return signInErrorRedirect(request, "Invalid Google callback response");
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = new Map(
    cookieHeader
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const separator = entry.indexOf("=");
        if (separator < 0) return [entry, ""] as const;
        const key = entry.slice(0, separator);
        const value = decodeURIComponent(entry.slice(separator + 1));
        return [key, value] as const;
      }),
  );

  const expectedState = cookies.get(OAUTH_STATE_COOKIE);
  const returnTo = sanitizeReturnTo(cookies.get(OAUTH_RETURN_TO_COOKIE) ?? "/");

  if (!expectedState || state !== expectedState) {
    return signInErrorRedirect(request, "Google sign-in session expired. Please try again.");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return signInErrorRedirect(request, "Google sign-in is not configured");
  }

  const redirectUri = buildGoogleRedirectUri(requestUrl);

  try {
    const tokenResponse = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      return signInErrorRedirect(request, "Failed to verify Google account");
    }

    const tokenPayload = (await tokenResponse.json()) as {
      access_token?: string;
    };

    if (!tokenPayload.access_token) {
      return signInErrorRedirect(request, "Google account token was missing");
    }

    const userResponse = await fetch(USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${tokenPayload.access_token}`,
      },
      cache: "no-store",
    });

    if (!userResponse.ok) {
      return signInErrorRedirect(request, "Failed to load Google profile");
    }

    const profile = (await userResponse.json()) as {
      email?: string;
      email_verified?: boolean;
      name?: string;
    };

    if (!profile.email || !profile.email_verified) {
      return signInErrorRedirect(request, "Google account email is not verified");
    }

    const email = profile.email.toLowerCase();
    const fallbackName = email.split("@")[0] ?? "Google User";
    const displayName = (profile.name?.trim() || fallbackName).slice(0, 120);
    const adminEmailSet = getAdminEmailSet();
    const shouldBeAdmin = adminEmailSet.has(email);

    let user = await findAuthUserByEmail(email);

    if (!user) {
      user = await createAuthUser({
        name: displayName,
        email,
        passwordHash: hashPassword(randomBytes(32).toString("hex")),
        role: shouldBeAdmin ? "admin" : "customer",
      });
    } else if (shouldBeAdmin && user.role !== "admin") {
      user = await setAuthUserRole(user.id, "admin");
      if (!user) {
        return signInErrorRedirect(request, "Failed to update user role");
      }
    }

    const token = await createSession(user.id);
    const destination = new URL(returnTo, request.url);
    const response = NextResponse.redirect(destination);

    response.cookies.set({
      name: getSessionCookieName(),
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: getSessionExpiryDate(),
    });

    // Clear temporary OAuth cookies.
    response.cookies.set({
      name: OAUTH_STATE_COOKIE,
      value: "",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });
    response.cookies.set({
      name: OAUTH_RETURN_TO_COOKIE,
      value: "",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("Google OAuth callback failed", error);
    return signInErrorRedirect(request, toSafeErrorMessage(error));
  }
}
