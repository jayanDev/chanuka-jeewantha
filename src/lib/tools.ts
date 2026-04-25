export type CareerTool = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: "ATS" | "LinkedIn" | "Interview";
  image: string;
  highlights: string[];
  externalUrl: string;
};

export const careerTools: CareerTool[] = [
  {
    slug: "ats-cv-audit",
    title: "ATS CV Audit Tool",
    summary:
      "Paste your CV and target job description to get a fast ATS-readiness score, keyword overlap review, and practical fixes.",
    description:
      "A free browser-based audit tool for checking keyword alignment, measurable outcomes, section coverage, and first-pass CV quality before you apply.",
    category: "ATS",
    image: "/images/chanuka-jeewantha-career-development-specialist.jpg",
    highlights: [
      "ATS-readiness score in seconds",
      "Keyword overlap and missing term review",
      "Practical improvement checklist before applying",
    ],
    externalUrl: "https://www.careerstudio.app/tools/ats-checker/",
  },
  {
    slug: "linkedin-headline-generator",
    title: "LinkedIn Headline Generator",
    summary:
      "Generate clearer LinkedIn headlines based on role, specialization, industry, and value proposition.",
    description:
      "A free positioning tool that helps professionals write stronger LinkedIn headlines for search visibility, credibility, and recruiter clicks.",
    category: "LinkedIn",
    image: "/images/linkedin-optimization-30k-followers-proof.jpg",
    highlights: [
      "Multiple headline variations",
      "Better role and niche positioning",
      "Cleaner wording for profile visibility",
    ],
    externalUrl: "https://www.careerstudio.app/linkedin/optimizer/",
  },
  {
    slug: "interview-story-bank",
    title: "Interview Story Bank Builder",
    summary:
      "Turn raw career moments into reusable STAR stories for interviews, panels, and behavioral questions.",
    description:
      "A free browser tool for building a reusable interview story bank with structured inputs, skill tagging, and copy-ready answers.",
    category: "Interview",
    image: "/images/testimonial-chanuka.jpg",
    highlights: [
      "STAR structure builder",
      "Reusable proof-based stories",
      "Copy-ready interview answer drafts",
    ],
    externalUrl: "https://www.careerstudio.app/resources/interview-prep/",
  },
  {
    slug: "cover-letter-writer",
    title: "Cover Letter Writer",
    summary:
      "Generate a cleaner, more targeted cover letter from a job description and your background.",
    description:
      "A free browser-based cover letter writing tool that helps you structure a clearer introduction, align with the role, and produce a stronger first draft faster.",
    category: "ATS",
    image: "/images/chanuka-jeewantha-career-development-specialist.jpg",
    highlights: [
      "Job-specific cover letter drafts",
      "Stronger opening and closing paragraphs",
      "Better tone and role alignment",
    ],
    externalUrl: "https://www.careerstudio.app/tools/cover-letter/",
  },
];

export function getCareerToolBySlug(slug: string) {
  return careerTools.find((tool) => tool.slug === slug);
}
