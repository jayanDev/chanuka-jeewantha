export type Ebook = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: "free" | "paid";
  priceLkr?: number;
  coverImage: string;
  highlights: string[];
  sampleReadPath?: string;
};

export const ebooks: Ebook[] = [
  {
    slug: "ats-cv-foundations",
    title: "ATS CV Foundations",
    subtitle: "Build a recruiter-ready CV from scratch",
    description:
      "A practical starter guide for fresh graduates and early professionals to structure an ATS-friendly CV that recruiters can scan quickly.",
    category: "free",
    coverImage: "/images/blog-card-1.jpg",
    sampleReadPath: "/blog",
    highlights: [
      "CV layout blueprint",
      "Achievement bullet writing framework",
      "ATS keyword integration basics",
    ],
  },
  {
    slug: "linkedin-visibility-playbook",
    title: "LinkedIn Visibility Playbook",
    subtitle: "Increase profile reach and response quality",
    description:
      "A focused guide to profile positioning, keyword clarity, and headline/about optimization to improve recruiter discovery.",
    category: "free",
    coverImage: "/images/blog-card-2.jpg",
    sampleReadPath: "/blog",
    highlights: [
      "Headline optimization templates",
      "About section prompt system",
      "Search visibility checklist",
    ],
  },
  {
    slug: "career-switch-premium-toolkit",
    title: "Career Switch Premium Toolkit",
    subtitle: "Transition strategy for role and industry changers",
    description:
      "A full toolkit with positioning methods, gap-bridging messaging, and application strategy for career transitions.",
    category: "paid",
    priceLkr: 8500,
    coverImage: "/images/blog-featured-default.jpg",
    highlights: [
      "Transferable skills conversion worksheet",
      "Role-targeted CV and cover letter patterns",
      "90-day transition action map",
    ],
  },
  {
    slug: "interview-conversion-system",
    title: "Interview Conversion System",
    subtitle: "From shortlisting to offer-ready performance",
    description:
      "A preparation system with answer structures, confidence routines, and panel interview response frameworks.",
    category: "paid",
    priceLkr: 12000,
    coverImage: "/images/blog-content-1.jpg",
    highlights: [
      "STAR answer banks",
      "Technical and HR interview frameworks",
      "Post-interview follow-up templates",
    ],
  },
];

export const getEbookBySlug = (slug: string) => ebooks.find((ebook) => ebook.slug === slug);
