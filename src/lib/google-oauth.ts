export function buildGoogleRedirectUri(requestUrl: URL): string {
  const configuredRedirectUri = process.env.GOOGLE_REDIRECT_URI?.trim();
  if (configuredRedirectUri) {
    try {
      return new URL(configuredRedirectUri).toString();
    } catch {
      // Fall through to origin-based construction when the env value is malformed.
    }
  }

  const configuredOrigin = process.env.GOOGLE_REDIRECT_ORIGIN?.trim() || requestUrl.origin;
  const normalizedOrigin = configuredOrigin.replace(/\/$/, "");
  return `${normalizedOrigin}/api/auth/google/callback`;
}
