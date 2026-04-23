export type DigitalResourceType = "Toolkit" | "Template";

export type DigitalResource = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  resourceType: DigitalResourceType;
  category: "free" | "paid";
  priceLkr?: number;
  coverImage: string;
  highlights: string[];
  contentSections?: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  primaryActionLabel?: string;
  primaryActionHref?: string;
};

// All previous dummy resources archived. New resources live under /resources/checklists.
export const digitalResources: DigitalResource[] = [];

export const getResourceBySlug = (slug: string) =>
  digitalResources.find((resource) => resource.slug === slug);
