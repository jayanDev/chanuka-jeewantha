import type { BlogFaq, BlogLink, BlogPost, BlogSection } from "./blog-posts";

const defaultInternalLinks: BlogLink[] = [
  { label: "Order your CV package", href: "/checkout" },
  { label: "Compare all packages", href: "/pricing" },
  { label: "Explore CV services", href: "/services/packages/cv-writing" },
  { label: "Read more career guides", href: "/blog" },
  { label: "Talk to Chanuka", href: "/contact" },
];

const defaultCtas: BlogLink[] = [
  { label: "Start Your Order", href: "/checkout" },
  { label: "View Services", href: "/services" },
  { label: "Check Pricing", href: "/pricing" },
];

const careerDevelopmentTitles = [
  "Create a 90-Day Career Development Plan That Gets You Interview Ready",
  "How to Set Career Milestones You Can Actually Track",
  "Career Growth Blueprint for Fresh Graduates in Sri Lanka",
  "How to Build a Promotion-Ready Career Portfolio",
  "Career Transition Checklist for Switching Industries",
  "How to Build Confidence Before Job Interviews",
  "Career Development Habits That Improve Salary Growth",
  "How to Choose the Right Career Path Using Skills and Market Data",
  "How to Build a Weekly Career Progress Scorecard",
  "Career Planning for Students: Start Early, Grow Faster",
  "How to Build a Job Search Strategy That Avoids Burnout",
  "Career Development Tips for Professionals with 3-5 Years Experience",
  "How to Build Career Momentum After a Job Rejection",
  "Career Development Framework for Remote Work Opportunities",
  "How to Align CV, LinkedIn, and Portfolio for Faster Results",
  "How to Build a Career Brand Recruiters Remember",
  "Career Development Strategy for Mid-Level Managers",
  "How to Prepare for Career Growth Conversations with Managers",
  "Career Development Mistakes That Delay Interview Calls",
  "How to Build a Learning Plan for Career Acceleration",
  "Career Development for Returning Professionals After a Break",
  "How to Build a Strong Career Narrative for Interviews",
  "Career Planning for International Job Applications",
  "How to Build Career Direction When You Feel Stuck",
  "Career Development Goals for the Next 12 Months",
] as const;

const atsFriendlyCvTitles = [
  "ATS-Friendly CV Format: Structure That Passes Screening Systems",
  "How to Write ATS-Friendly CV Summaries That Match Job Descriptions",
  "ATS-Friendly CV Bullet Points with Measurable Outcomes",
  "How to Choose ATS-Safe Fonts and Layouts for CVs",
  "ATS-Friendly CV Keywords: How to Find and Use the Right Terms",
  "How to Fix ATS Parsing Errors in Your CV",
  "ATS-Friendly CV Strategy for Freshers and Entry-Level Roles",
  "How to Build an ATS-Friendly CV for Career Switches",
  "ATS-Friendly CV Tips for Remote and Hybrid Job Applications",
  "How to Write ATS-Compatible Work Experience Sections",
  "ATS-Friendly CV vs Creative Resume: What Recruiters Prefer",
  "How to Build ATS-Friendly CVs for International Roles",
  "ATS-Friendly CV Checklist Before You Submit Applications",
  "How to Optimize ATS-Friendly CV Headers and Contact Details",
  "ATS-Friendly CV Writing for Management Positions",
  "How to Keep ATS-Friendly CVs Human-Readable",
  "ATS-Friendly CV Templates: What to Avoid",
  "How to Match ATS Keywords Without Keyword Stuffing",
  "ATS-Friendly CV Guidance for Technical Professionals",
  "How to Build ATS-Friendly Education and Certification Sections",
  "ATS-Friendly CV Writing for Internship Applications",
  "How to Prepare ATS-Friendly CV Versions for Multiple Roles",
  "ATS-Friendly CV Rules for PDF and DOCX Uploads",
  "How to Improve ATS-Friendly CV Rankings for Priority Roles",
  "ATS-Friendly CV Mistakes That Reduce Interview Chances",
] as const;

const atsScoreTitles = [
  "How ATS Score Works and Why It Impacts Interview Chances",
  "ATS Score Optimization Guide for Entry-Level Job Seekers",
  "How to Increase ATS Score Using Role-Specific Keywords",
  "ATS Score Audit: 10 Fixes You Can Make in One Hour",
  "How to Improve ATS Score Without Losing Readability",
  "ATS Score Strategy for Fresh Graduates",
  "How to Raise ATS Score for Management Applications",
  "ATS Score vs Recruiter Review: How to Balance Both",
  "How to Improve ATS Score for Career Change CVs",
  "ATS Score Boosting for Remote Job Applications",
  "How to Diagnose Low ATS Scores in Your CV",
  "ATS Score Improvement Checklist Before Every Application",
  "How to Increase ATS Score with Better Achievement Bullets",
  "ATS Score Tactics for Technical and IT Roles",
  "How to Improve ATS Score in Work Experience Sections",
  "ATS Score Tips for International Job Applications",
  "How to Increase ATS Score for Finance and Banking Roles",
  "ATS Score and Job Title Alignment: Why It Matters",
  "How to Improve ATS Score Using Skills Section Strategy",
  "ATS Score Recovery Plan After Multiple Rejections",
  "How to Improve ATS Score for Executive Profiles",
  "ATS Score Benchmarks: What Is a Good Score?",
  "How to Increase ATS Score with Better Summary Writing",
  "ATS Score Improvement for Internship and Trainee Roles",
  "How to Build a Weekly ATS Score Optimization Routine",
] as const;

const industryGuides = [
  "Information Technology",
  "Software Engineering",
  "Data Science",
  "Cybersecurity",
  "Banking",
  "Finance",
  "Accounting",
  "Sales",
  "Digital Marketing",
  "Human Resources",
  "Operations",
  "Supply Chain",
  "Customer Service",
  "Hospitality",
  "Healthcare",
  "Nursing",
  "Engineering",
  "Construction",
  "Manufacturing",
  "Education",
  "Legal",
  "Business Analysis",
  "Project Management",
  "Graphic Design",
  "Public Sector",
] as const;

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
}

function getDateByOffset(offset: number): string {
  const seed = new Date("2026-04-10T00:00:00Z");
  seed.setUTCDate(seed.getUTCDate() - offset);
  return seed.toISOString().slice(0, 10);
}

function buildGenericSections(title: string, focusArea: string): BlogSection[] {
  return [
    {
      heading: `Why ${focusArea} matters now`,
      paragraphs: [
        `${title} is important because hiring teams use tighter shortlisting criteria, ATS screening, and role-specific keyword matching before manual review.`,
        `When your strategy is clear and measurable, your profile communicates value faster and improves recruiter confidence.`
      ],
      bullets: [
        "Prioritize role-targeted keyword alignment",
        "Show measurable outcomes, not only duties",
        "Keep CV, LinkedIn, and cover letter messaging consistent",
      ],
    },
    {
      heading: "Step-by-step implementation plan",
      paragraphs: [
        "Start with role targeting and a clean ATS-safe CV structure. Then upgrade your summary, work experience bullets, and skills section with direct relevance to job descriptions.",
        "Run a weekly review cycle to improve formatting, keyword quality, and outcome language based on application response rates.",
      ],
      bullets: [
        "Define 2-3 role titles for focused applications",
        "Build one strong master CV and adapt by role",
        "Track interview conversion and iterate every week",
      ],
    },
    {
      heading: "Common mistakes to avoid",
      paragraphs: [
        "Most candidates lose opportunities by using generic templates, weak achievement language, and unstructured application workflows.",
        "Avoid copying AI-generated filler text. Keep the document specific, practical, and aligned with real hiring requirements.",
      ],
      bullets: [
        "Do not use keyword stuffing",
        "Do not submit the same CV to every role",
        "Do not skip proof-based metrics in your bullets",
      ],
    },
  ];
}

function buildFaqs(topic: string): BlogFaq[] {
  return [
    {
      question: `Who should follow this ${topic} guide?`,
      answer:
        "Students, fresh graduates, and professionals who want stronger interview conversion through ATS-friendly documents and practical career strategy can use this guide.",
    },
    {
      question: "How fast can results improve?",
      answer:
        "Most candidates see better shortlist quality within 2-4 weeks when they apply role-targeted updates consistently and track outcomes.",
    },
    {
      question: "Can this guide be used with your CV and LinkedIn services?",
      answer:
        "Yes. This guide is designed to work alongside Chanuka Jeewantha's CV writing, cover letter, and LinkedIn optimization services.",
    },
  ];
}

function buildTopicPosts(
  titles: readonly string[],
  options: {
    slugPrefix: string;
    category: string;
    offsetStart: number;
    focusKeyword: string;
  }
): BlogPost[] {
  return titles.map((title, index) => {
    const order = index + 1;
    return {
      slug: `${options.slugPrefix}-${order}-${toSlug(title)}`,
      title,
      excerpt: `${title}. Practical ${options.category.toLowerCase()} guidance with ATS-safe structure, keyword strategy, and role-targeted action steps.`,
      content:
        `${title}. This guide explains how to improve document quality, application accuracy, and recruiter response using real-world hiring patterns. ` +
        "Use the checklist, examples, and implementation plan to improve interview conversion without guesswork.",
      category: options.category,
      publishedAt: getDateByOffset(options.offsetStart + index),
      author: "Chanuka Jeewantha",
      keywords: [
        options.focusKeyword,
        `${options.category.toLowerCase()} sri lanka`,
        "ats friendly cv",
        "career development",
        toSlug(title).replace(/-/g, " "),
      ],
      sections: buildGenericSections(title, options.category),
      internalLinks: defaultInternalLinks,
      ctaButtons: defaultCtas,
      faqs: buildFaqs(options.category),
    };
  });
}

const industryPosts: BlogPost[] = industryGuides.map((industry, index) => {
  const title = `ATS-Friendly CV Guide for ${industry} Professionals`;
  return {
    slug: `industry-cv-guide-${index + 1}-${toSlug(industry)}`,
    title,
    excerpt:
      `${title}. Industry-specific CV writing guidance with role keywords, ATS score improvements, and recruiter-focused examples.`,
    content:
      `This ${industry} CV guide helps you position your experience using relevant achievements, ATS-safe formatting, and role-specific keywords. ` +
      "It also explains how to tailor your CV for promotions, job changes, and higher-paying opportunities.",
    category: "Industry CV Guide",
    publishedAt: getDateByOffset(75 + index),
    author: "Chanuka Jeewantha",
    keywords: [
      `${industry.toLowerCase()} cv guide`,
      `${industry.toLowerCase()} ats cv`,
      "industry specific cv",
      "ats score optimization",
      "career development sri lanka",
    ],
    sections: [
      {
        heading: `What recruiters in ${industry} expect`,
        paragraphs: [
          `Recruiters in ${industry} roles prioritize relevant domain terminology, measurable outcomes, and clear evidence of role impact.`,
          "A targeted CV improves shortlist quality by showing role-fit quickly in both ATS and manual review stages.",
        ],
        bullets: [
          `Use ${industry} role keywords directly from job descriptions`,
          "Highlight measurable achievements in each experience block",
          "Keep your summary focused on role relevance and impact",
        ],
      },
      {
        heading: "How to build your industry CV",
        paragraphs: [
          "Create a role-targeted summary, then rewrite experience bullets with outcomes, tools, and quantifiable results. Keep layout simple and ATS-safe.",
          "Prepare one master CV and role-specific variants for better conversion across job categories.",
        ],
        bullets: [
          "Build a strong achievement library first",
          "Prioritize role-specific terms in skills and experience",
          "Run a final ATS and readability check before submission",
        ],
      },
      {
        heading: "Final optimization checklist",
        paragraphs: [
          "Before submitting, verify keyword fit, bullet clarity, and consistency between CV and LinkedIn profile messaging.",
          "Small improvements in precision and formatting can significantly improve interview outcomes in competitive industries.",
        ],
        bullets: [
          "Match job title and summary language",
          "Align your top 5 skills with the target role",
          "Use concise and proof-based writing",
        ],
      },
    ],
    internalLinks: defaultInternalLinks,
    ctaButtons: defaultCtas,
    faqs: buildFaqs(`${industry} CV`),
  };
});

const careerDevelopmentPosts = buildTopicPosts(careerDevelopmentTitles, {
  slugPrefix: "career-development",
  category: "Career Development",
  offsetStart: 0,
  focusKeyword: "career development guide",
});

const atsFriendlyPosts = buildTopicPosts(atsFriendlyCvTitles, {
  slugPrefix: "ats-friendly-cv",
  category: "ATS Friendly CV",
  offsetStart: 25,
  focusKeyword: "ats friendly cv guide",
});

const atsScorePosts = buildTopicPosts(atsScoreTitles, {
  slugPrefix: "ats-score",
  category: "ATS Score Optimization",
  offsetStart: 50,
  focusKeyword: "ats score improvement",
});

export const careerGrowthBlogPosts: BlogPost[] = [
  ...careerDevelopmentPosts,
  ...atsFriendlyPosts,
  ...atsScorePosts,
  ...industryPosts,
];

if (careerGrowthBlogPosts.length !== 100) {
  throw new Error(`Expected 100 generated career articles, received ${careerGrowthBlogPosts.length}.`);
}
