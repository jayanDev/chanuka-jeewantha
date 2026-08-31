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
    expect(packageProducts).toHaveLength(39);
  });

  it("uses the Essentials prices from the supplied price card", () => {
    expect(getPriceRow("ats-cv", "supervised")).toEqual([3950, 5950, 9950]);
    expect(getPriceRow("linkedin", "supervised")).toEqual([3950, 5950, 9950]);
    expect(getPriceRow("cover-letter", "supervised")).toEqual([2950, 3950, 5950]);
    expect(getPriceRow("foreign-cv", "supervised")).toEqual([4950, 7450, 10950]);
    expect(getPriceRow("cv-review", "supervised")).toEqual([1490, 1990, 2490]);
  });

  it("uses the Signature Series prices from the supplied price card", () => {
    expect(getPriceRow("ats-cv", "founder-led")).toEqual([7500, 13500, 19500]);
    expect(getPriceRow("linkedin", "founder-led")).toEqual([7500, 13500, 19500]);
    expect(getPriceRow("cover-letter", "founder-led")).toEqual([5500, 8500, 13500]);
    expect(getPriceRow("foreign-cv", "founder-led")).toEqual([12500, 17500, 28500]);
    expect(getPriceRow("cv-review", "founder-led")).toEqual([2500, 3500, 4500]);
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
      subtotalLkr: 10850,
      discountPercent: 0,
      discountLkr: 0,
      totalLkr: 10850,
    });
  });

  it("exposes all five price-card services on public package pages", () => {
    const publicKeys = ["ats-cv", "linkedin", "cover-letter", "foreign-cv", "cv-review"];

    expect(publicPackageServiceKeys).toEqual(publicKeys);
    expect(publicServiceOptions.map((item) => item.key)).toEqual(publicKeys);
    expect(publicPackageCategories.map((item) => item.key)).toEqual(publicKeys);
    expect(publicPackageProducts).toHaveLength(30);
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
