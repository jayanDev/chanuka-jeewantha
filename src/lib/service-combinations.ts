import { formatLkr, getConsultationPrice, packageProducts, type ExperienceKey, type ServiceOptionKey } from "./packages-catalog";

// These are combinations of individually priced services, not discounted offers.
const definitions: Array<{
  key: string;
  name: string;
  audience: string;
  experience: ExperienceKey;
  option: ServiceOptionKey;
  services: string[];
  consultation?: boolean;
}> = [
  { key: "starter", name: "Starter Pack", audience: "Students / Fresh Graduates · Less than 1 year", experience: "student", option: "supervised", services: ["ats-cv", "cover-letter", "linkedin"] },
  { key: "career", name: "Career Pack", audience: "Professionals · 1–9 years", experience: "professional", option: "founder-led", services: ["ats-cv", "cover-letter", "linkedin", "foreign-cv"] },
  { key: "executive", name: "Executive Pack", audience: "Executives · More than 9 years", experience: "executive", option: "founder-led", services: ["ats-cv", "foreign-cv", "linkedin", "cover-letter"], consultation: true },
];

export const serviceCombinations = definitions.map((definition) => {
  const components = definition.services.map((service) => {
    const product = packageProducts.find((pkg) => pkg.serviceKey === service && pkg.experienceKey === definition.experience && pkg.optionKey === definition.option);
    if (!product) throw new Error(`Missing service combination component: ${definition.key}/${service}`);
    return { name: product.category, priceLkr: product.priceLkr };
  });
  if (definition.consultation) {
    // Existing one-hour executive consultation price; not changed by the price cards.
    components.push({ name: "1-Hour Strategy Consultation", priceLkr: getConsultationPrice(definition.experience, "oneHour") });
  }
  const totalLkr = components.reduce((sum, component) => sum + component.priceLkr, 0);
  const tier = definition.option === "supervised" ? "Essentials" : "Signature";
  const message = [
    `Hello Chanuka, I would like to discuss the ${definition.name} (${tier}).`,
    definition.audience,
    ...components.map((component) => `${component.name}: ${formatLkr(component.priceLkr)}`),
    `Combined service total: ${formatLkr(totalLkr)}`,
    "Please confirm availability, delivery, and payment details.",
  ].join("\n");
  return { ...definition, tier, components, totalLkr, whatsappUrl: `https://wa.me/94773902230?text=${encodeURIComponent(message)}` };
});
