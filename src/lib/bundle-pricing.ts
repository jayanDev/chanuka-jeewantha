import { packageProducts } from "@/lib/packages-catalog";

export type ConfigurableBundleSlug =
  | "career-brand-combo-30"
  | "application-duo-20"
  | "bulk-cv-5-pack"
  | "bulk-cv-10-pack";

export type BundleSelection = {
  cvSlug: string;
  coverLetterSlug: string;
  linkedinSlug?: string;
};

type BundleRule = {
  discountPercent: number;
  quantityMultiplier: number;
  requireLinkedin: boolean;
};

type BundleComponent = {
  slug: string;
  name: string;
  category: string;
  priceLkr: number;
};

export type BundlePricingResult = {
  bundleSlug: ConfigurableBundleSlug;
  discountPercent: number;
  quantityMultiplier: number;
  originalPriceLkr: number;
  priceLkr: number;
  selection: Required<BundleSelection>;
  components: {
    cv: BundleComponent;
    coverLetter: BundleComponent;
    linkedin: BundleComponent | null;
  };
};

const rules: Record<ConfigurableBundleSlug, BundleRule> = {
  "career-brand-combo-30": {
    discountPercent: 30,
    quantityMultiplier: 1,
    requireLinkedin: true,
  },
  "application-duo-20": {
    discountPercent: 20,
    quantityMultiplier: 1,
    requireLinkedin: false,
  },
  "bulk-cv-5-pack": {
    discountPercent: 20,
    quantityMultiplier: 5,
    requireLinkedin: true,
  },
  "bulk-cv-10-pack": {
    discountPercent: 50,
    quantityMultiplier: 10,
    requireLinkedin: true,
  },
};

const productBySlug = new Map(packageProducts.map((product) => [product.slug, product]));

const CV_CATEGORY = "CV Writing";
const COVER_LETTER_CATEGORY = "Cover Letter Writing";
const LINKEDIN_CATEGORY = "LinkedIn Optimization";

export function isConfigurableBundleSlug(slug: string): slug is ConfigurableBundleSlug {
  return slug in rules;
}

export function getConfigurableBundleRule(slug: ConfigurableBundleSlug): BundleRule {
  return rules[slug];
}

function readComponent(slug: string, expectedCategory: string, role: string): BundleComponent {
  const product = productBySlug.get(slug);
  if (!product) {
    throw new Error(`${role} package is unavailable.`);
  }

  if (product.category !== expectedCategory) {
    throw new Error(`${role} package is invalid.`);
  }

  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    priceLkr: product.priceLkr,
  };
}

export function calculateBundlePricing(bundleSlug: ConfigurableBundleSlug, selection: BundleSelection): BundlePricingResult {
  const rule = rules[bundleSlug];
  const cv = readComponent(selection.cvSlug, CV_CATEGORY, "CV");
  const coverLetter = readComponent(selection.coverLetterSlug, COVER_LETTER_CATEGORY, "Cover Letter");

  if (rule.requireLinkedin && !selection.linkedinSlug) {
    throw new Error("LinkedIn package is required for this bundle.");
  }

  const linkedin = selection.linkedinSlug
    ? readComponent(selection.linkedinSlug, LINKEDIN_CATEGORY, "LinkedIn")
    : null;

  if (!rule.requireLinkedin && selection.linkedinSlug) {
    throw new Error("LinkedIn selection is not used in this bundle.");
  }

  const perCandidateBase = cv.priceLkr + coverLetter.priceLkr + (linkedin?.priceLkr ?? 0);
  const originalPriceLkr = perCandidateBase * rule.quantityMultiplier;
  const priceLkr = Math.max(1, Math.round((originalPriceLkr * (100 - rule.discountPercent)) / 100));

  return {
    bundleSlug,
    discountPercent: rule.discountPercent,
    quantityMultiplier: rule.quantityMultiplier,
    originalPriceLkr,
    priceLkr,
    selection: {
      cvSlug: cv.slug,
      coverLetterSlug: coverLetter.slug,
      linkedinSlug: linkedin?.slug ?? "",
    },
    components: {
      cv,
      coverLetter,
      linkedin,
    },
  };
}

export function serializeBundleSelection(selection: BundleSelection): string {
  return [selection.cvSlug, selection.coverLetterSlug, selection.linkedinSlug ?? "-"].join("__");
}
