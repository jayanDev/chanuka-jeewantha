import { describe, expect, it } from "vitest";
import {
  calculateCatalogueTotal,
  experienceOptions,
  getSupervisedBundleDiscount,
  packageProducts,
  publicPackageCategories,
  publicPackageProducts,
  publicPackageServiceKeys,
  publicServiceOptions,
  type ExperienceKey,
  type ServiceKey,
  type ServiceOptionKey,
} from "./packages-catalog";

function getPrice(
  serviceKey: ServiceKey,
  experienceKey: ExperienceKey,
  optionKey: ServiceOptionKey
): number {
  const product = packageProducts.find(
    (item) =>
      item.serviceKey === serviceKey &&
      item.experienceKey === experienceKey &&
      item.optionKey === optionKey
  );

  expect(product).toBeDefined();
  return product!.priceLkr;
}

function getPriceRow(serviceKey: ServiceKey, optionKey: ServiceOptionKey): number[] {
  return experienceOptions.map((experience) =>
    getPrice(serviceKey, experience.key, optionKey)
  );
}

describe("packages catalogue", () => {
  it("offers the three requested experience levels", () => {
    expect(experienceOptions).toEqual([
      {
        key: "student",
        number: 1,
        title: "Student / Fresh Graduate Level (Less than 1 Year of Experience)",
        shortTitle: "Student / Fresh Graduate",
      },
      {
        key: "professional",
        number: 2,
        title: "Professional Level (1-9 Years of Experience)",
        shortTitle: "Professional",
      },
      {
        key: "executive",
        number: 3,
        title: "Executive Level (More than 9 Years of Experience)",
        shortTitle: "Executive",
      },
    ]);
    expect(packageProducts).toHaveLength(33);
  });

  it("uses the Essentials prices from the supplied price card", () => {
    expect(getPriceRow("ats-cv", "supervised")).toEqual([2950, 4950, 8950]);
    expect(getPriceRow("linkedin", "supervised")).toEqual([2950, 4950, 8950]);
    expect(getPriceRow("cover-letter", "supervised")).toEqual([1950, 2950, 4950]);
    expect(getPriceRow("foreign-cv", "supervised")).toEqual([3950, 6450, 9950]);
  });

  it("uses the Signature Series prices from the supplied price card", () => {
    expect(getPriceRow("ats-cv", "founder-led")).toEqual([6500, 12500, 18500]);
    expect(getPriceRow("linkedin", "founder-led")).toEqual([6500, 12500, 18500]);
    expect(getPriceRow("cover-letter", "founder-led")).toEqual([4500, 7500, 12500]);
    expect(getPriceRow("foreign-cv", "founder-led")).toEqual([11500, 16500, 27500]);
  });

  it("does not discount multi-service Essentials orders", () => {
    const selectedServices: ServiceKey[] = ["ats-cv", "linkedin", "cover-letter"];
    const selected = packageProducts.filter(
      (item) =>
        item.optionKey === "supervised" &&
        item.experienceKey === "student" &&
        selectedServices.includes(item.serviceKey)
    );

    expect(getSupervisedBundleDiscount(selectedServices)).toBe(0);
    expect(calculateCatalogueTotal(selected)).toEqual({
      subtotalLkr: 7850,
      discountPercent: 0,
      discountLkr: 0,
      totalLkr: 7850,
    });
  });

  it("exposes only the three active services on public package pages", () => {
    const publicKeys = ["ats-cv", "linkedin", "cover-letter"];

    expect(publicPackageServiceKeys).toEqual(publicKeys);
    expect(publicServiceOptions.map((item) => item.key)).toEqual(publicKeys);
    expect(publicPackageCategories.map((item) => item.key)).toEqual(publicKeys);
    expect(publicPackageProducts).toHaveLength(18);
    expect(new Set(publicPackageProducts.map((item) => item.serviceKey))).toEqual(
      new Set(publicKeys)
    );
    expect(
      packageProducts.filter((item) =>
        ["foreign-cv", "graphical-cv", "consultation"].includes(item.serviceKey)
      )
    ).toHaveLength(15);
  });
});
