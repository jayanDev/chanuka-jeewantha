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

export const digitalResources: DigitalResource[] = [
  {
    slug: "ats-cv-quick-checklist",
    title: "ATS CV Quick Checklist",
    subtitle: "A free 10-point review sheet before you submit any CV",
    description:
      "A free practical checklist for job seekers who want to catch the most common ATS and recruiter-readability issues before applying.",
    resourceType: "Template",
    category: "free",
    coverImage: "/images/chanuka-jeewantha-career-development-specialist.jpg",
    highlights: [
      "10 quick ATS and readability checks",
      "Common first-page mistakes to remove",
      "Easy structure fixes before you apply",
    ],
    contentSections: [
      {
        heading: "Use This Before Every Application",
        paragraphs: [
          "The fastest way to improve CV quality is not a full rewrite every time. It is a reliable final-check process before sending applications.",
          "This checklist is designed for last-mile quality control: clarity, keyword fit, layout discipline, and recruiter scanning speed.",
        ],
        bullets: [
          "Confirm the target role appears clearly in your summary",
          "Check that keywords match the live job description",
          "Make sure each role section contains results, not only responsibilities",
        ],
      },
      {
        heading: "What To Fix First",
        paragraphs: [
          "If your CV feels weak, start with the top of page one. Hiring teams form impressions fast, so the biggest gains usually come from a stronger headline, summary, and achievement language.",
        ],
        bullets: [
          "Remove generic objective statements",
          "Replace weak adjectives with evidence",
          "Keep design clean enough for ATS parsing",
        ],
      },
    ],
    primaryActionLabel: "Read ATS CV Guides",
    primaryActionHref: "/blog/category/ats-cv-writing",
  },
  {
    slug: "linkedin-headline-formula-sheet",
    title: "LinkedIn Headline Formula Sheet",
    subtitle: "A free positioning guide for clearer profile search visibility",
    description:
      "A free formula sheet for writing LinkedIn headlines that communicate role fit, niche relevance, and professional value more clearly.",
    resourceType: "Template",
    category: "free",
    coverImage: "/images/linkedin-optimization-30k-followers-proof.jpg",
    highlights: [
      "Headline structure prompts",
      "Keyword placement ideas",
      "Positioning examples for job seekers and professionals",
    ],
    contentSections: [
      {
        heading: "Why Headlines Matter",
        paragraphs: [
          "Your headline is one of the fastest ways to signal relevance on LinkedIn. It influences profile clicks, recruiter search visibility, and first impressions in comments and search results.",
        ],
        bullets: [
          "State your role family clearly",
          "Add niche, industry, or specialization context",
          "Use language that sounds credible, not inflated",
        ],
      },
      {
        heading: "A Simple Formula",
        paragraphs: [
          "A strong headline usually combines role + specialization + value signal. It should help a recruiter understand where you fit and why they should keep reading.",
        ],
        bullets: [
          "Role title",
          "Specialization or domain",
          "Outcome or value angle",
        ],
      },
    ],
    primaryActionLabel: "Explore LinkedIn Articles",
    primaryActionHref: "/blog/category/linkedin-optimization",
  },
  {
    slug: "interview-story-bank-template",
    title: "Interview Story Bank Template",
    subtitle: "A free framework for building strong STAR examples",
    description:
      "A free interview-prep worksheet to help you collect, organize, and reuse proof-based stories for behavioral questions and panel interviews.",
    resourceType: "Template",
    category: "free",
    coverImage: "/images/testimonial-chanuka.jpg",
    highlights: [
      "STAR story planning structure",
      "Prompt list for achievements and challenges",
      "Reusable format for multiple interview questions",
    ],
    contentSections: [
      {
        heading: "Build Once, Reuse Often",
        paragraphs: [
          "Most candidates struggle in interviews because they prepare answers question by question. A better approach is to build a story bank you can adapt across many questions.",
        ],
        bullets: [
          "List 8-10 career stories with measurable outcomes",
          "Tag each story by skill or behavior",
          "Practice short and long versions of the same example",
        ],
      },
      {
        heading: "What Makes Stories Strong",
        paragraphs: [
          "Strong interview stories show context, action, judgment, and outcomes. They feel specific enough to be believable and structured enough to be easy to follow.",
        ],
        bullets: [
          "Use numbers where possible",
          "Show your decision-making role clearly",
          "End with the result and what changed",
        ],
      },
    ],
    primaryActionLabel: "Browse Interview Guides",
    primaryActionHref: "/blog/category/interview-preparation",
  },
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
