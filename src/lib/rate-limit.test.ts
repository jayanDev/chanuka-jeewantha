import { describe, expect, it } from "vitest";

import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

describe("rate limiting", () => {
  it("allows requests until the limit is reached", async () => {
    const key = `test-limit-${Date.now()}`;

    expect((await checkRateLimit(key, 2, 60_000)).ok).toBe(true);
    expect((await checkRateLimit(key, 2, 60_000)).ok).toBe(true);
    expect((await checkRateLimit(key, 2, 60_000)).ok).toBe(false);
  });

  it("extracts client IP from x-forwarded-for header", () => {
    const request = new Request("http://localhost/api/contact", {
      headers: {
        "x-forwarded-for": "203.0.113.10, 70.41.3.18",
      },
    });

    expect(getClientIp(request)).toBe("203.0.113.10");
  });
});
