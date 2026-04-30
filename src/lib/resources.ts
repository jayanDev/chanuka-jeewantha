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

export type DigitalResourceDownload = {
  fileName: string;
  relativePath: string[];
  contentType: string;
};

export const digitalResources: DigitalResource[] = [
  {
    slug: "ats-friendly-cv-template-free",
    title: "ATS Friendly CV Template Free",
    subtitle: "Free Microsoft Word CV template built for ATS scanning and recruiter readability.",
    description:
      "Download a clean ATS-friendly CV template in DOCX format and use it as a practical starting point for your next job application. The layout avoids heavy graphics, text boxes, and confusing formatting so applicant tracking systems can read your content more reliably.",
    resourceType: "Template",
    category: "free",
    coverImage: "/images/cv-after-ats-template.svg",
    highlights: [
      "DOCX template designed for ATS-friendly structure",
      "Clean sections for profile, experience, education, skills, and achievements",
      "Easy to edit in Microsoft Word, Google Docs, or compatible editors",
      "Best used with role-specific keywords and measurable achievement writing",
    ],
    contentSections: [
      {
        heading: "What this free CV template helps you do",
        paragraphs: [
          "Many job seekers lose opportunities because their CV looks attractive to humans but becomes difficult for ATS software to parse. This template gives you a cleaner structure, simpler formatting, and clearer section hierarchy so your experience is easier to scan.",
          "The template is intentionally practical. It gives you the layout foundation, while your real results, target-role keywords, and career story still need to be written carefully for each application.",
        ],
        bullets: [
          "Use one clean column for the main CV content.",
          "Keep headings simple and recognizable for recruiters and ATS systems.",
          "Replace generic duties with measurable achievements wherever possible.",
          "Tailor keywords to the role before submitting each application.",
        ],
      },
      {
        heading: "Who should download this template",
        paragraphs: [
          "This template is useful for fresh graduates, professionals changing jobs, applicants targeting corporate roles, and anyone who wants a clean Word CV without complicated design elements.",
          "It is especially helpful if your current CV uses tables, icons, photo-heavy layouts, decorative columns, or creative graphics that may reduce ATS readability.",
        ],
        bullets: [
          "Fresh graduates building a first professional CV.",
          "Mid-career professionals refreshing an outdated CV.",
          "Applicants who want a simple ATS-friendly Word format.",
          "Job seekers preparing multiple targeted versions of the same CV.",
        ],
      },
      {
        heading: "How to use it correctly",
        paragraphs: [
          "Open the DOCX file, replace every placeholder with your own details, and keep the structure simple. Avoid adding photos, progress bars, rating stars, decorative icons, or extra columns unless a specific employer asks for a creative CV.",
          "Before sending your CV, compare the job description with your profile, experience, and skills sections. Add relevant keywords naturally, then proofread the document for clarity, consistency, and measurable value.",
        ],
        bullets: [
          "Save a master copy before editing for each role.",
          "Use strong action verbs at the start of achievement bullets.",
          "Keep dates, job titles, company names, and section headings consistent.",
          "Export to PDF only when the employer allows PDF submissions.",
        ],
      },
    ],
    primaryActionLabel: "Download Free Template",
    primaryActionHref: "/resources/ats-friendly-cv-template-free",
  },
];

const resourceDownloads: Record<string, DigitalResourceDownload> = {
  "ats-friendly-cv-template-free": {
    fileName: "ATS Friendly CV Template Free.docx",
    relativePath: ["Resources", "Templates", "Free", "ATS Friendly CV Template Free.docx"],
    contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
};

export const getResourceBySlug = (slug: string) =>
  digitalResources.find((resource) => resource.slug === slug);

export const getResourceDownloadBySlug = (slug: string) =>
  resourceDownloads[slug] ?? null;
