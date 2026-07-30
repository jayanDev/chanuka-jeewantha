import { describe, expect, it } from "vitest";
import { countryJobMarkets, standaloneCountrySlugs } from "@/lib/country-job-markets";
import { packageProducts } from "@/lib/packages-catalog";

const expectedSlugs = [
  "dubai",
  "australia",
  "new-zealand",
  "canada",
  "united-kingdom",
  "singapore",
  "maldives",
  "vietnam",
  "saudi-arabia",
  "kuwait",
  "qatar",
  "oman",
  "bahrain",
  "italy",
  "united-states",
  "israel",
  "uae",
  "finland",
];

const countryServiceKeys = new Set(["foreign-cv", "cover-letter", "linkedin"]);

describe("country job markets", () => {
  it("defines exactly the requested 18 country landing pages", () => {
    expect(countryJobMarkets.map((market) => market.slug)).toEqual(expectedSlugs);
    expect(new Set(expectedSlugs).size).toBe(18);
  });

  it("keeps every page substantial, unique, and internally connected", () => {
    const metaDescriptions = new Set<string>();
    const marketOverviews = new Set<string>();

    for (const market of countryJobMarkets) {
      expect(market.metaDescription.length).toBeGreaterThanOrEqual(110);
      expect(market.metaDescription.length).toBeLessThanOrEqual(170);
      expect(market.marketOverview.length).toBeGreaterThan(180);
      expect(market.documentGuidance.length).toBeGreaterThan(120);
      expect(market.hiringPriorities).toHaveLength(4);
      expect(market.sectors).toHaveLength(6);
      expect(market.applicationNotes).toHaveLength(4);
      expect(market.relatedSlugs).toHaveLength(4);
      expect(market.relatedSlugs).not.toContain(market.slug);
      expect(market.relatedSlugs.every((slug) => expectedSlugs.includes(slug))).toBe(true);

      metaDescriptions.add(market.metaDescription);
      marketOverviews.add(market.marketOverview);
    }

    expect(metaDescriptions.size).toBe(18);
    expect(marketOverviews.size).toBe(18);
  });

  it("uses standalone static routes only for the two existing premium URLs", () => {
    expect([...standaloneCountrySlugs].sort()).toEqual(["australia", "dubai"]);
  });
});

describe("country page package pricing", () => {
  const countryPackages = packageProducts.filter((pkg) => countryServiceKeys.has(pkg.serviceKey));

  it("contains all 18 required service, experience, and tier combinations", () => {
    expect(countryPackages).toHaveLength(18);
    expect(new Set(countryPackages.map((pkg) => pkg.slug)).size).toBe(18);
  });

  it("uses only foreign-job CV, cover-letter, and LinkedIn prices", () => {
    expect(new Set(countryPackages.map((pkg) => pkg.serviceKey))).toEqual(countryServiceKeys);

    const pricesByService = Object.fromEntries(
      ["foreign-cv", "cover-letter", "linkedin"].map((serviceKey) => [
        serviceKey,
        countryPackages
          .filter((pkg) => pkg.serviceKey === serviceKey)
          .map((pkg) => pkg.priceLkr)
          .sort((a, b) => a - b),
      ])
    );

    expect(pricesByService["foreign-cv"]).toEqual([3950, 6450, 9950, 11500, 16500, 27500]);
    expect(pricesByService["cover-letter"]).toEqual([1950, 2950, 4500, 4950, 7500, 12500]);
    expect(pricesByService.linkedin).toEqual([2950, 4950, 6500, 8950, 12500, 18500]);
  });
});
