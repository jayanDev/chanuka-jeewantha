import {
  formatLkr,
  getServiceByKey,
  publicPackageServiceKeys,
  type PackageProduct,
  type ServiceKey,
} from "@/lib/packages-catalog";

export type DeliverySpeed = "fast" | "normal";
export type TargetCountryOption = "sri-lanka" | "foreign";

// The country question switches Professional CV to Foreign Job CV when needed.
export const catalogueServiceKeys: ServiceKey[] = publicPackageServiceKeys.filter((key) => key !== "foreign-cv");

export const deliveryChoices: Array<{
  key: DeliverySpeed;
  title: string;
  timeline: string;
}> = [
  {
    key: "fast",
    title: "Fast Delivery",
    timeline: "1–2 days",
  },
  {
    key: "normal",
    title: "Normal Delivery",
    timeline: "3–7 days",
  },
];

export function resolveCatalogueServiceKeys(
  selectedServices: ServiceKey[],
  targetCountry: TargetCountryOption
): ServiceKey[] {
  const resolved = selectedServices.map((serviceKey) =>
    serviceKey === "ats-cv" && targetCountry === "foreign"
      ? "foreign-cv"
      : serviceKey
  );

  return Array.from(new Set(resolved));
}

export function getDeliveryAdjustedPrice(
  priceLkr: number,
  delivery: DeliverySpeed
): number {
  return delivery === "fast" ? Math.round(priceLkr * 1.2) : priceLkr;
}

export function calculateDeliveryAdjustedTotal(
  packages: PackageProduct[],
  delivery: DeliverySpeed
): number {
  return packages.reduce(
    (total, pkg) => total + getDeliveryAdjustedPrice(pkg.priceLkr, delivery),
    0
  );
}

export function getDeliveryLabel(delivery: DeliverySpeed): string {
  const choice = deliveryChoices.find((item) => item.key === delivery);
  return choice ? choice.title + " (" + choice.timeline + ")" : "";
}

type CatalogueWhatsAppMessageInput = {
  packages: PackageProduct[];
  serviceKeys: ServiceKey[];
  experienceLabel: string;
  serviceOptionLabel: string;
  delivery: DeliverySpeed;
  targetJobRoles: string;
  targetCountry: TargetCountryOption;
  foreignCountries?: string;
};

export function buildCatalogueWhatsAppMessage(
  input: CatalogueWhatsAppMessageInput
): string {
  const targetCountryLabel =
    input.targetCountry === "foreign"
      ? "Foreign — " + (input.foreignCountries?.trim() || "Not specified")
      : "Sri Lanka";
  const totalLkr = calculateDeliveryAdjustedTotal(input.packages, input.delivery);
  const serviceLabels = input.serviceKeys
    .map((key) => getServiceByKey(key)?.title)
    .filter((label): label is string => Boolean(label));

  return [
    "Hello Chanuka,",
    "",
    "I completed the catalogue and would like to continue with this recommendation.",
    "",
    "PACKAGE DETAILS",
    ...input.packages.flatMap((pkg) => [
      "• " + pkg.name,
      "  Price: " +
        formatLkr(getDeliveryAdjustedPrice(pkg.priceLkr, input.delivery)),
    ]),
    "",
    "MY REQUIREMENTS",
    "• Services: " + serviceLabels.join(", "),
    "• Experience level: " + input.experienceLabel,
    "• Service option: " + input.serviceOptionLabel,
    "• Delivery: " + getDeliveryLabel(input.delivery),
    "• Target job role(s): " + input.targetJobRoles.trim(),
    "• Target country/market: " + targetCountryLabel,
    "",
    "TOTAL: " + formatLkr(totalLkr),
    "",
    "Please confirm availability, payment details, and the next steps.",
  ].join("\n");
}
