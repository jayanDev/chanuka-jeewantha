export function isTrustedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");

  // Non-browser requests (curl/server-to-server) typically omit origin.
  if (!origin) return true;

  let originHost = "";
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  if (host && originHost === host) return true;

  const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return allowedOrigins.some((allowed) => {
    try {
      return new URL(allowed).host === originHost;
    } catch {
      return false;
    }
  });
}
