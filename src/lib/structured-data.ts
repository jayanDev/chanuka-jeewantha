import { getBaseUrl } from "@/lib/site-url";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type ProductSchemaInput = {
  name: string;
  description: string;
  path: string;
  category: string;
  priceLkr: number;
  image?: string;
  sku?: string;
  availability?: "https://schema.org/InStock" | "https://schema.org/OutOfStock";
};

type OfferCatalogCategoryInput = {
  name: string;
  items: Array<{
    name: string;
    path: string;
    priceLkr: number;
    description?: string;
  }>;
};

function normalizePath(path: string): string {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${normalizePath(item.path)}`,
    })),
  };
}

export function buildFaqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildProductSchema(input: ProductSchemaInput) {
  const baseUrl = getBaseUrl();
  const absoluteUrl = `${baseUrl}${normalizePath(input.path)}`;
  const imageUrl = input.image ? `${baseUrl}${normalizePath(input.image)}` : `${baseUrl}/images/hero-chanuka.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    category: input.category,
    sku: input.sku,
    image: imageUrl,
    brand: {
      "@type": "Brand",
      name: "Chanuka Jeewantha",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "LKR",
      price: input.priceLkr,
      url: absoluteUrl,
      availability: input.availability ?? "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Chanuka Jeewantha",
      },
    },
  };
}

export function buildOfferCatalogSchema(categories: OfferCatalogCategoryInput[]) {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Career Services Pricing",
    serviceType: "CV Writing and Career Development Services",
    provider: {
      "@type": "Organization",
      name: "Chanuka Jeewantha",
      url: baseUrl,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Service Packages",
      itemListElement: categories.map((category) => ({
        "@type": "OfferCatalog",
        name: category.name,
        itemListElement: category.items.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.name,
            description: item.description,
            url: `${baseUrl}${normalizePath(item.path)}`,
          },
          priceCurrency: "LKR",
          price: item.priceLkr,
          url: `${baseUrl}${normalizePath(item.path)}`,
        })),
      })),
    },
  };
}
