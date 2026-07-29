import { afterEach, describe, expect, it } from "vitest";
import { buildGoogleRedirectUri } from "./google-oauth";

describe("buildGoogleRedirectUri", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it("uses the request origin even when the general site URL still points at the old domain", () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SITE_URL: "https://chanukajeewantha.com",
      SITE_URL: "https://chanukajeewantha.com",
      GOOGLE_REDIRECT_ORIGIN: "",
      GOOGLE_REDIRECT_URI: "",
    };

    expect(buildGoogleRedirectUri(new URL("https://chanukajeewantha.lk/auth/signin"))).toBe(
      "https://chanukajeewantha.lk/api/auth/google/callback",
    );
  });

  it("allows a dedicated Google redirect origin to pin the canonical callback domain", () => {
    process.env = {
      ...originalEnv,
      GOOGLE_REDIRECT_ORIGIN: "https://www.chanukajeewantha.lk/",
      GOOGLE_REDIRECT_URI: "",
    };

    expect(buildGoogleRedirectUri(new URL("https://chanukajeewantha.lk/auth/signin"))).toBe(
      "https://www.chanukajeewantha.lk/api/auth/google/callback",
    );
  });
});
