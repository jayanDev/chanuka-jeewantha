export function getOfferPreviewIdFromBrowser(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const value = params.get("offerPreview");
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed || null;
}

export function buildOfferPreviewHeaders(baseHeaders?: HeadersInit): HeadersInit {
  const headers = new Headers(baseHeaders ?? {});
  const previewId = getOfferPreviewIdFromBrowser();
  if (previewId) {
    headers.set("x-offer-preview-id", previewId);
  }
  return headers;
}

export function withOfferPreviewUrl(url: string): string {
  const previewId = getOfferPreviewIdFromBrowser();
  if (!previewId) return url;

  const hasQuery = url.includes("?");
  const separator = hasQuery ? "&" : "?";
  return `${url}${separator}offerPreview=${encodeURIComponent(previewId)}`;
}
