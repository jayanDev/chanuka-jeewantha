import { describe, expect, it } from "vitest";

import { isTrustedOrigin } from "@/lib/security";

describe("security origin checks", () => {
  it("accepts same-host origin", () => {
    const request = new Request("http://localhost/api/contact", {
      headers: {
        origin: "http://localhost:3000",
        host: "localhost:3000",
      },
    });

    expect(isTrustedOrigin(request)).toBe(true);
  });

  it("rejects unknown cross-origin host", () => {
    const request = new Request("http://localhost/api/contact", {
      headers: {
        origin: "https://malicious.example",
        host: "localhost:3000",
      },
    });

    expect(isTrustedOrigin(request)).toBe(false);
  });
});
