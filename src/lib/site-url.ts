const PRODUCTION_FALLBACK = "https://chanukajeewantha.lk";

export function getBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    PRODUCTION_FALLBACK;
  return raw.replace(/\/$/, "");
}
