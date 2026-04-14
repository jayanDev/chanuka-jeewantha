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
};

export const digitalResources: DigitalResource[] = [
  {
    slug: "ats-cv-mastery-toolkit",
    title: "ATS CV Mastery Toolkit",
    subtitle: "Templates, keyword maps, and measurable bullet frameworks",
    description:
      "A paid toolkit to help you build ATS-friendly CVs for modern hiring systems with recruiter-first readability.",
    resourceType: "Toolkit",
    category: "paid",
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
    resourceType: "Toolkit",
    category: "paid",
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
    resourceType: "Toolkit",
    category: "paid",
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
    resourceType: "Toolkit",
    category: "paid",
    priceLkr: 9200,
    coverImage: "/images/testimonial-chanuka.jpg",
    highlights: [
      "STAR answer bank templates",
      "Behavioral and panel question map",
      "Follow-up and negotiation scripts",
    ],
  },
  {
    slug: "cv-job-pack-bundle",
    title: "CV + Job Application Bundle",
    subtitle: "ATS CV templates, role-keyword maps, and outreach scripts",
    description:
      "A practical paid bundle for job seekers who need execution-ready assets: ATS-safe CV structures, role keyword sheets, and professional recruiter outreach templates.",
    resourceType: "Toolkit",
    category: "paid",
    priceLkr: 4800,
    coverImage: "/images/hero-chanuka.jpg",
    highlights: [
      "ATS-safe CV structure pack",
      "Job description keyword mapping sheet",
      "Recruiter outreach and follow-up scripts",
    ],
  },
  {
    slug: "interview-prep-assets",
    title: "Interview Preparation Assets",
    subtitle: "Answer banks, panel prep maps, and salary scripts",
    description:
      "A paid interview execution kit with frameworks for HR and panel rounds, STAR answer planning, and clean salary negotiation templates.",
    resourceType: "Toolkit",
    category: "paid",
    priceLkr: 5200,
    coverImage: "/images/testimonial-chanuka.jpg",
    highlights: [
      "STAR answer design worksheet",
      "Panel interview preparation map",
      "Salary negotiation message set",
    ],
  },
  {
    slug: "linkedin-authority-system",
    title: "LinkedIn Authority System",
    subtitle: "Positioning kit for visibility, trust, and inbound leads",
    description:
      "A premium practical system for professionals building authority on LinkedIn with profile positioning, content sequencing, and relationship outreach playbooks.",
    resourceType: "Toolkit",
    category: "paid",
    priceLkr: 6900,
    coverImage: "/images/linkedin-optimization-30k-followers-proof.jpg",
    highlights: [
      "Profile positioning framework",
      "Content sequence templates",
      "Outbound networking scripts",
    ],
  },
];

export const getResourceBySlug = (slug: string) =>
  digitalResources.find((resource) => resource.slug === slug);
