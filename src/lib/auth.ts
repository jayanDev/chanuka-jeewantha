import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "session_token";
const SESSION_DAYS = 30;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hashHex] = storedHash.split(":");
  if (!salt || !hashHex) return false;

  const input = scryptSync(password, salt, 64);
  const stored = Buffer.from(hashHex, "hex");

  if (input.length !== stored.length) return false;
  return timingSafeEqual(input, stored);
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function getSessionExpiryDate(): Date {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + SESSION_DAYS);
  return expiry;
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");

  await prisma.authSession.create({
    data: {
      token,
      userId,
      expiresAt: getSessionExpiryDate(),
    },
  });

  return token;
}

export async function destroySession(token: string): Promise<void> {
  await prisma.authSession.deleteMany({ where: { token } });
}

export async function getUserBySessionToken(token: string): Promise<AuthUser | null> {
  const session = await prisma.authSession.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await prisma.authSession.deleteMany({ where: { token } });
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  };
}

export function getTokenFromCookieHeader(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((entry) => entry.trim());
  for (const entry of cookies) {
    const [key, value] = entry.split("=");
    if (key === SESSION_COOKIE && value) {
      return decodeURIComponent(value);
    }
  }

  return null;
}
