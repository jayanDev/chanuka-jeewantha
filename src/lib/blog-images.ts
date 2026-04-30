export type BlogImageInput = {
  slug?: string;
  title?: string;
  excerpt?: string;
  category?: string | null;
  keywords?: string[] | null;
  coverImage?: string | null;
};

const blogCoverByTheme = {
  "ats-cv": "/images/blog/ats-cv.svg",
  "career-planning": "/images/blog/career-planning.svg",
  "cover-letter": "/images/blog/cover-letter.svg",
  "cv-writing": "/images/blog/cv-writing.svg",
  "default-career": "/images/blog/default-career.svg",
  "fresh-graduate": "/images/blog/fresh-graduate.svg",
  "industry-career": "/images/blog/industry-career.svg",
  "international-jobs": "/images/blog/international-jobs.svg",
  interview: "/images/blog/interview.svg",
  "job-search": "/images/blog/job-search.svg",
  linkedin: "/images/blog/linkedin.svg",
  portfolio: "/images/blog/portfolio.svg",
  "remote-work": "/images/blog/remote-work.svg",
  "resume-vs-cv": "/images/blog/resume-vs-cv.svg",
  "salary-growth": "/images/blog/salary-growth.svg",
} as const;

type BlogImageTheme = keyof typeof blogCoverByTheme;

const themeRules: Array<[BlogImageTheme, RegExp]> = [
  ["linkedin", /\blinkedin\b|profile seo|personal brand|social selling|30k/],
  ["cover-letter", /cover letter|motivation letter|application letter/],
  ["interview", /interview|hr round|technical round|behavioral|behavioural|tell me about yourself/],
  ["resume-vs-cv", /resume vs cv|cv vs resume|curriculum vitae|resume difference/],
  ["ats-cv", /\bats\b|applicant tracking|cv score|resume score|cv scan|resume scan|parser|keyword match/],
  ["fresh-graduate", /student|graduate|fresh|internship|entry level|first cv|campus|undergraduate|school leaver/],
  ["remote-work", /remote|hybrid|work from home|distributed/],
  ["international-jobs", /international|overseas|foreign|abroad|dubai|qatar|uae|canada|australia|uk\b|europe|gulf/],
  ["salary-growth", /salary|promotion|increment|raise|growth|higher pay|negotiate|negotiation/],
  ["portfolio", /portfolio|personal website|case study|projects|github|behance|proof of work/],
  ["job-search", /job search|job application|apply|hiring|recruiter|shortlist|rejection|vacancy/],
  ["career-planning", /career plan|roadmap|career roadmap|coaching|mentor|transition|career change|career path|goal/],
  ["industry-career", /industry|software|developer|engineer|accounting|finance|marketing|sales|hr\b|human resources|banking|hospitality|healthcare/],
  ["cv-writing", /\bcv\b|resume writing|professional summary|work experience|achievement|cv writing|cv format/],
];

function normalizeInput(input: BlogImageInput): string {
  return [
    input.slug,
    input.title,
    input.excerpt,
    input.category,
    ...(input.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function getBlogImageTheme(input: BlogImageInput): BlogImageTheme {
  const text = normalizeInput(input);
  const matched = themeRules.find(([, pattern]) => pattern.test(text));
  return matched?.[0] ?? "default-career";
}

export function getBlogCoverImage(input: BlogImageInput): string {
  const explicitCoverImage = input.coverImage?.trim();
  if (explicitCoverImage) {
    return explicitCoverImage;
  }

  return blogCoverByTheme[getBlogImageTheme(input)];
}

export function isGeneratedBlogCoverImage(src: string): boolean {
  return src.startsWith("/images/blog/") && src.endsWith(".svg");
}
