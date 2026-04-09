export type DigitalResource = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  priceLkr: number;
  coverImage: string;
  highlights: string[];
};

export const digitalResources: DigitalResource[] = [
  {
    slug: "ats-cv-mastery-toolkit",
    title: "ATS CV Mastery Toolkit",
    subtitle: "Templates, keyword maps, and measurable bullet frameworks",
    description:
      "A paid toolkit to help you build ATS-friendly CVs for modern hiring systems with recruiter-first readability.",
    priceLkr: 6500,
    coverImage: "/images/chanuka-jeewantha-career-development-specialist.jpg",
    highlights: [
      "ATS-safe CV structure templates",
      "Role-specific keyword planning sheets",
      "Achievement bullet rewrite framework",
    ],
  },
  {
    slug: "linkedin-growth-system",
    title: "LinkedIn Growth System",
    subtitle: "Profile SEO and content strategy with 30K+ growth principles",
    description:
      "A complete paid resource for optimizing your headline, About section, profile authority, and recruiter discovery strategy.",
    priceLkr: 8500,
    coverImage: "/images/linkedin-optimization-30k-followers-proof.jpg",
    highlights: [
      "LinkedIn profile optimization checklist",
      "Headline and About writing prompts",
      "Weekly growth and engagement framework",
    ],
  },
  {
    slug: "career-transition-action-plan",
    title: "Career Transition Action Plan",
    subtitle: "A structured roadmap for role or industry change",
    description:
      "A practical digital guide for professionals planning career transitions, including skill-gap mapping and portfolio proof strategy.",
    priceLkr: 7800,
    coverImage: "/images/about-page-chanuka.jpg",
    highlights: [
      "90-day transition plan template",
      "Transferable skills mapping worksheet",
      "Role-aligned positioning scripts",
    ],
  },
  {
    slug: "interview-conversion-blueprint",
    title: "Interview Conversion Blueprint",
    subtitle: "Answer structure, storytelling, and confidence systems",
    description:
      "A paid interview preparation resource for turning shortlists into offers through clear communication and proof-based responses.",
    priceLkr: 9200,
    coverImage: "/images/testimonial-chanuka.jpg",
    highlights: [
      "STAR answer bank templates",
      "Behavioral and panel question map",
      "Follow-up and negotiation scripts",
    ],
  },
];

export const getResourceBySlug = (slug: string) =>
  digitalResources.find((resource) => resource.slug === slug);
