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

  it("uses the supplied Dubai-specific cover artwork only on the Dubai page", () => {
    const marketsWithCustomCovers = countryJobMarkets.filter((market) => market.coverImage);

    expect(marketsWithCustomCovers).toEqual([
      expect.objectContaining({
        slug: "dubai",
        coverImage: "/images/dubai-job-cv-cover-chanuka-jeewantha.jpg",
      }),
    ]);
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

    expect(pricesByService["foreign-cv"]).toEqual([4950, 7450, 10950, 12500, 17500, 28500]);
    expect(pricesByService["cover-letter"]).toEqual([2950, 3950, 5500, 5950, 8500, 13500]);
    expect(pricesByService.linkedin).toEqual([3950, 5950, 7500, 9950, 13500, 19500]);
  });
});
