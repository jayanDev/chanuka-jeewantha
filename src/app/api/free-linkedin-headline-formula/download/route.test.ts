import fs from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("LinkedIn Headline Formula download route", () => {
  it("returns the supplied PDF as an attachment", async () => {
    const sourcePath = path.join(
      process.cwd(),
      "Resources",
      "Guides",
      "Free",
      "LinkedIn Headline Formula.pdf"
    );
    const sourceFile = await fs.readFile(sourcePath);
    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/pdf");
    expect(response.headers.get("content-disposition")).toContain(
      'filename="LinkedIn Headline Formula - Chanuka Jeewantha.pdf"'
    );
    expect(Number(response.headers.get("content-length"))).toBe(sourceFile.byteLength);
    expect(Buffer.from(await response.arrayBuffer())).toEqual(sourceFile);
  });
});
