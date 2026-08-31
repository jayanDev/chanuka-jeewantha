import { describe, expect, it } from "vitest";
import {
  buildCatalogueWhatsAppMessage,
  calculateDeliveryAdjustedTotal,
  catalogueServiceKeys,
  getDeliveryAdjustedPrice,
  resolveCatalogueServiceKeys,
} from "@/lib/catalogue-questionnaire";
import { packageProducts } from "@/lib/packages-catalog";

describe("catalogue questionnaire", () => {
  it("shows the four selectable services, with foreign CV resolved by country", () => {
    expect(catalogueServiceKeys).toEqual([
      "ats-cv",
      "linkedin",
      "cover-letter",
      "cv-review",
    ]);
  });

  it("maps the local CV selection to Foreign Job CV for foreign markets", () => {
    expect(
      resolveCatalogueServiceKeys(
        ["ats-cv", "linkedin", "cover-letter"],
        "foreign"
      )
    ).toEqual(["foreign-cv", "linkedin", "cover-letter"]);

    expect(
      resolveCatalogueServiceKeys(["ats-cv", "linkedin"], "sri-lanka")
    ).toEqual(["ats-cv", "linkedin"]);
  });

  it("keeps normal prices and applies the fast-delivery price", () => {
    expect(getDeliveryAdjustedPrice(5950, "normal")).toBe(5950);
    expect(getDeliveryAdjustedPrice(5950, "fast")).toBe(7140);

    const packages = packageProducts.filter((pkg) =>
      [
        "ats-cv-professional-supervised",
        "linkedin-professional-supervised",
      ].includes(pkg.slug)
    );

    expect(calculateDeliveryAdjustedTotal(packages, "normal")).toBe(11900);
    expect(calculateDeliveryAdjustedTotal(packages, "fast")).toBe(14280);
  });

  it("creates a clearly formatted WhatsApp message with role and country", () => {
    const pkg = packageProducts.find(
      (item) =>
        item.serviceKey === "foreign-cv" &&
        item.experienceKey === "professional" &&
        item.optionKey === "supervised"
    );

    expect(pkg).toBeDefined();

    const message = buildCatalogueWhatsAppMessage({
      packages: [pkg!],
      serviceKeys: ["foreign-cv"],
      experienceLabel: "Professional Level (1-9 Years of Experience)",
      serviceOptionLabel: "Essentials Packages",
      delivery: "fast",
      targetJobRoles: "Senior Accountant",
      targetCountry: "foreign",
      foreignCountries: "Dubai, UAE",
    });

    expect(message).toContain("PACKAGE DETAILS");
    expect(message).toContain("MY REQUIREMENTS");
    expect(message).toContain("Target job role(s): Senior Accountant");
    expect(message).toContain("Target country/market: Foreign — Dubai, UAE");
    expect(message).toContain("Delivery: Fast Delivery (1–2 days)");
    expect(message).toContain("TOTAL: LKR 8,940");
    expect(message).not.toContain("20%");
    expect(message.toLowerCase()).not.toContain("surcharge");
  });
});
