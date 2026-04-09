const LOCAL_FALLBACK = "http://localhost:3000";

export function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? LOCAL_FALLBACK;
  return raw.replace(/\/$/, "");
}
