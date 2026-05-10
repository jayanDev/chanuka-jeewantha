export type ServiceKey =
  | "ats-cv"
  | "linkedin"
  | "cover-letter"
  | "foreign-cv"
  | "graphical-cv"
  | "consultation";

export type ExperienceKey =
  | "student"
  | "fresh-graduate"
  | "professional"
  | "senior-professional"
  | "executive";

export type ServiceOptionKey = "founder-led" | "supervised";

export type PackageCategoryKey =
  | ServiceKey
  | "cv-writing"
  | "cover-letter"
  | "bundle-discount"
  | "bulk-discount"
  | "cv-review";

export type PackageProduct = {
  slug: string;
  code: string;
  name: string;
  category: string;
  categoryKey: PackageCategoryKey;
  serviceKey: ServiceKey;
  experienceKey: ExperienceKey;
  optionKey: ServiceOptionKey;
  audience: string;
  description?: string;
  idealFor?: string;
  priceLkr: number;
  priceNote?: string;
  delivery: string;
  features: string[];
  cta: string;
  isMostPopular?: boolean;
};

export type PackageCategory = {
  key: PackageCategoryKey;
  title: string;
  description: string;
  isPriority?: boolean;
  packages: PackageProduct[];
};

export type CatalogueSelection = {
  serviceKeys: ServiceKey[];
  experienceKey: ExperienceKey;
  optionKey: ServiceOptionKey;
};

export const paymentInstructions = {
  bank: "Bank of Ceylon",
  accountName: "W.A.C. Jeewantha",
  accountNumber: "0079282859",
  branch: "Makola Branch",
  methodNote:
    "Please make a bank transfer to confirm your order and use your name or mobile number as the payment reference.",
};

export const serviceOptions: Array<{
  key: ServiceKey;
  number: number;
  title: string;
  shortTitle: string;
  categoryTitle: string;
  description: string;
}> = [
  {
    key: "ats-cv",
    number: 1,
    title: "ATS Friendly Professional CV Writing",
    shortTitle: "ATS CV Writing",
    categoryTitle: "ATS Friendly Professional CV Writing Packages",
    description:
      "Professional, ATS-friendly CV writing built around recruiter readability, keywords, and measurable career value.",
  },
  {
    key: "linkedin",
    number: 2,
    title: "LinkedIn Account Optimization",
    shortTitle: "LinkedIn Optimization",
    categoryTitle: "LinkedIn Account Optimization Packages",
    description:
      "LinkedIn profile positioning for stronger recruiter discovery, personal branding, and profile conversion.",
  },
  {
    key: "cover-letter",
    number: 3,
    title: "Professional Cover Letter Writing",
    shortTitle: "Cover Letter Writing",
    categoryTitle: "Professional Cover Letter Writing Packages",
    description:
      "Role-aligned cover letters that connect your experience to the vacancy with a clear, confident message.",
  },
  {
    key: "foreign-cv",
    number: 4,
    title: "Foreign Job CV Writing",
    shortTitle: "Foreign Job CV",
    categoryTitle: "Foreign Job CV Writing Packages",
    description:
      "CV writing for international job markets with stronger positioning for overseas applications.",
  },
  {
    key: "graphical-cv",
    number: 5,
    title: "Graphical CV Writing / Resume Writing",
    shortTitle: "Graphical CV",
    categoryTitle: "Graphical CV Writing / Resume Writing Packages",
    description:
      "Modern visual CV and resume writing for situations where presentation and personal brand matter.",
  },
  {
    key: "consultation",
    number: 6,
    title: "Consultation",
    shortTitle: "Consultation",
    categoryTitle: "Career Consultation Packages",
    description:
      "One-to-one career direction, CV/profile advice, and job-search strategy consultation.",
  },
];

export const experienceOptions: Array<{
  key: ExperienceKey;
  number: number;
  title: string;
  shortTitle: string;
}> = [
  { key: "student", number: 1, title: "Student (No Experience)", shortTitle: "Student" },
  {
    key: "fresh-graduate",
    number: 2,
    title: "Fresh Graduate (0-12 Months of Experience)",
    shortTitle: "Fresh Graduate",
  },
  {
    key: "professional",
    number: 3,
    title: "Professional Level (1-5 Years of Experience)",
    shortTitle: "Professional",
  },
  {
    key: "senior-professional",
    number: 4,
    title: "Senior Professional Level (6-12 Years of Experience)",
    shortTitle: "Senior Professional",
  },
  {
    key: "executive",
    number: 5,
    title: "Executive Level (More than 12 Years of Experience)",
    shortTitle: "Executive",
  },
];

export const serviceOptionChoices: Array<{
  key: ServiceOptionKey;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
}> = [
  {
    key: "founder-led",
    number: 1,
    title: "Signature Series Premium Packages",
    shortTitle: "Signature Series",
    description:
      "Personally crafted by Chanuka Jeewantha with premium positioning and strategic development.",
  },
  {
    key: "supervised",
    number: 2,
    title: "Essentials Packages",
    shortTitle: "Essentials",
    description:
      "Team-crafted under Chanuka's supervision with quality review and practical delivery.",
  },
];

const founderLedPrices: Record<ServiceKey, Array<number | { thirtyMin: number; oneHour: number }>> = {
  "ats-cv": [6500, 8000, 11500, 15500, 22500],
  linkedin: [6500, 8000, 11500, 15500, 22500],
  "cover-letter": [4000, 5000, 7000, 8500, 12500],
  "foreign-cv": [10500, 12500, 14500, 18500, 27500],
  "graphical-cv": [4000, 5000, 7000, 8500, 12500],
  consultation: [
    { thirtyMin: 6500, oneHour: 9500 },
    { thirtyMin: 7500, oneHour: 10500 },
    { thirtyMin: 10500, oneHour: 14500 },
    { thirtyMin: 13500, oneHour: 18500 },
    { thirtyMin: 18500, oneHour: 27500 },
  ],
};

const supervisedPrices: Partial<Record<ServiceKey, number[]>> = {
  "ats-cv": [2950, 3950, 4950, 5950, 8950],
  linkedin: [2950, 3950, 4950, 5950, 8950],
  "cover-letter": [1950, 2450, 2950, 3450, 5450],
  "foreign-cv": [3450, 4450, 5950, 6950, 9950],
  "graphical-cv": [1950, 2450, 2950, 3450, 4450],
};

const optionTone: Record<ServiceOptionKey, string[]> = {
  "founder-led": [
    "Signature Series: Personally crafted by Chanuka Jeewantha",
    "Premium positioning for your selected career level",
    "Industry-specific strategic positioning and country optimization",
    "30-day post-delivery support with premium quality",
    "Limited to 2 new clients per day for exclusivity",
  ],
  supervised: [
    "Essentials: Team-crafted under Chanuka's supervision",
    "Quality reviewed by Chanuka with practical delivery",
    "Standard ATS-friendly format with basic optimization",
    "7-day delivery with email-based support",
    "Budget-friendly option for students and graduates",
  ],
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getPriceValue(
  serviceKey: ServiceKey,
  optionKey: ServiceOptionKey,
  experienceIndex: number
): { priceLkr: number; priceNote?: string } | null {
  if (optionKey === "supervised") {
    const row = supervisedPrices[serviceKey];
    if (!row) return null;
    return { priceLkr: row[experienceIndex] };
  }

  const value = founderLedPrices[serviceKey][experienceIndex];
  if (typeof value === "number") {
    return { priceLkr: value };
  }

  return {
    priceLkr: value.thirtyMin,
    priceNote: `${formatLkr(value.thirtyMin)} (30 min) / ${formatLkr(value.oneHour)} (1 Hr)`,
  };
}

function makePackage(
  service: (typeof serviceOptions)[number],
  experience: (typeof experienceOptions)[number],
  option: (typeof serviceOptionChoices)[number],
  experienceIndex: number
): PackageProduct | null {
  const price = getPriceValue(service.key, option.key, experienceIndex);
  if (!price) return null;

  const code = `${service.number}${experience.number}${option.number}`;
  const optionName = option.shortTitle;
  const name = `${experience.shortTitle} ${service.shortTitle} - ${optionName}`;
  const delivery = service.key === "consultation" ? "Scheduled after payment confirmation" : "3-7 Days";

  return {
    slug: slugify(`${service.key}-${experience.key}-${option.key}`),
    code,
    name,
    category: service.shortTitle,
    categoryKey: service.key,
    serviceKey: service.key,
    experienceKey: experience.key,
    optionKey: option.key,
    audience: experience.title,
    description: `${service.title} for ${experience.title.toLowerCase()} through the ${option.shortTitle.toLowerCase()} service option.`,
    idealFor:
      service.key === "consultation"
        ? "Ideal when you need direct career direction before deciding your next application, CV, LinkedIn, or job market strategy."
        : `Ideal for ${experience.title.toLowerCase()} who need ${service.shortTitle.toLowerCase()} with ${option.shortTitle.toLowerCase()} quality control.`,
    priceLkr: price.priceLkr,
    priceNote: price.priceNote,
    delivery,
    features: [
      ...optionTone[option.key],
      service.key === "consultation"
        ? "Action-focused consultation notes and next-step guidance"
        : "Editable final document or improvement guidance where applicable",
    ],
    cta: "Order This Package",
    isMostPopular:
      service.key === "ats-cv" &&
      experience.key === "professional" &&
      option.key === "founder-led",
  };
}

export const packageProducts: PackageProduct[] = serviceOptions.flatMap((service) =>
  experienceOptions.flatMap((experience, experienceIndex) =>
    serviceOptionChoices
      .map((option) => makePackage(service, experience, option, experienceIndex))
      .filter((item): item is PackageProduct => Boolean(item))
  )
);

export const packageCategories: PackageCategory[] = serviceOptions.map((service) => ({
  key: service.key,
  title: service.categoryTitle,
  description: service.description,
  isPriority: service.key === "ats-cv",
  packages: packageProducts.filter((item) => item.serviceKey === service.key),
}));

export function formatLkr(price: number): string {
  return `LKR ${price.toLocaleString("en-LK")}`;
}

export function getPackageDisplayPrice(pkg: PackageProduct): string {
  return pkg.priceNote ?? formatLkr(pkg.priceLkr);
}

export function getServiceByKey(key: ServiceKey) {
  return serviceOptions.find((item) => item.key === key) ?? null;
}

export function getExperienceByKey(key: ExperienceKey) {
  return experienceOptions.find((item) => item.key === key) ?? null;
}

export function getServiceOptionByKey(key: ServiceOptionKey) {
  return serviceOptionChoices.find((item) => item.key === key) ?? null;
}

export function getFilteredPackages(selection: CatalogueSelection): PackageProduct[] {
  const selectedServices = new Set(selection.serviceKeys);
  return packageProducts.filter(
    (pkg) =>
      selectedServices.has(pkg.serviceKey) &&
      pkg.experienceKey === selection.experienceKey &&
      pkg.optionKey === selection.optionKey
  );
}

export function getSupervisedBundleDiscount(serviceKeys: ServiceKey[]): number {
  const keys = new Set(serviceKeys);
  const hasCv = keys.has("ats-cv");
  const hasCover = keys.has("cover-letter");
  const hasLinkedin = keys.has("linkedin");

  if (hasCv && hasCover && hasLinkedin) return 20;
  if (hasCv && hasLinkedin) return 15;
  if (hasCv && hasCover) return 10;
  return 0;
}

export function calculateCatalogueTotal(packages: PackageProduct[]): {
  subtotalLkr: number;
  discountPercent: number;
  discountLkr: number;
  totalLkr: number;
} {
  const subtotalLkr = packages.reduce((sum, pkg) => sum + pkg.priceLkr, 0);
  const allSupervised = packages.length > 0 && packages.every((pkg) => pkg.optionKey === "supervised");
  const discountPercent = allSupervised
    ? getSupervisedBundleDiscount(packages.map((pkg) => pkg.serviceKey))
    : 0;
  const discountLkr = Math.round((subtotalLkr * discountPercent) / 100);

  return {
    subtotalLkr,
    discountPercent,
    discountLkr,
    totalLkr: Math.max(0, subtotalLkr - discountLkr),
  };
}

export function getFounderLedAvailabilityLabel(): string {
  return Math.random() > 0.5 ? "Only 1 premium slot remaining today" : "1 of 2 premium slots available today";
}
