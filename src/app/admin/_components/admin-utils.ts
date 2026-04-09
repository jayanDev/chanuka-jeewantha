export const formatLkr = (price: number) => `LKR ${price.toLocaleString("en-LK")}`;

export async function readJsonSafely(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text();
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function toDateInputValue(ms: number): string {
  const date = new Date(ms);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getScheduleStatus(startAtMs: number, endAtMs: number, isDraft: boolean, isActive: boolean): "draft" | "inactive" | "scheduled" | "active" | "expired" {
  if (isDraft) return "draft";
  if (!isActive) return "inactive";
  const now = Date.now();
  if (endAtMs < now) return "expired";
  if (startAtMs > now) return "scheduled";
  return "active";
}
