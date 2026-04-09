import { cookies } from "next/headers";
import { getSessionCookieName, getUserBySessionToken, getTokenFromCookieHeader, type AuthUser } from "@/lib/auth";

export async function getRequestUser(request: Request): Promise<AuthUser | null> {
  const token = getTokenFromCookieHeader(request.headers.get("cookie"));
  if (!token) return null;
  return getUserBySessionToken(token);
}

export async function getServerUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  if (!token) return null;
  return getUserBySessionToken(token);
}
