export type IndustryLandingPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  heroSummary: string;
  keywords: string[];
  sampleRoles: string[];
  challenges: string[];
  positioningTips: string[];
  recommendedServices: Array<{
    label: string;
    href: string;
  }>;
  recommendedTools: Array<{
    label: string;
    href: string;
  }>;
  relatedResources: Array<{
    label: string;
    href: string;
  }>;
  relatedCaseStudySlugs: string[];
};

export const industryLandingPages: IndustryLandingPage[] = [
  {
    slug: "software-it",
    name: "Software & IT",
    title: "CV Writing and LinkedIn Support for Software & IT Professionals",
    description:
      "Career support for software engineers, QA professionals, business analysts, DevOps engineers, product specialists, and IT leaders who need clearer proof and stronger recruiter positioning.",
    heroSummary:
      "Technical candidates often have strong experience but weak positioning. This page is built for IT professionals who need ATS-ready CV structure, better project storytelling, and cleaner LinkedIn visibility.",
    keywords: [
      "software engineer cv writing",
      "it resume service sri lanka",
      "linkedin optimization for software engineers",
    ],
    sampleRoles: [
      "Software Engineer",
      "QA Engineer",
      "DevOps Engineer",
      "Business Analyst",
      "Product Manager",
      "IT Support Specialist",
    ],
    challenges: [
      "Too much technical detail without enough business impact or measurable outcomes.",
      "Project work is listed, but the contribution and ownership are not clear enough.",
      "LinkedIn profiles often lack a strong headline, niche, or proof-based summary.",
    ],
    positioningTips: [
      "Show project outcomes, system impact, scale, and business value instead of only responsibilities.",
      "Translate tools and tech stacks into recruiter-readable proof and decision-making context.",
      "Use LinkedIn headlines and About sections that combine role, domain, and value clearly.",
    ],
    recommendedServices: [
      { label: "Professional CV Writing", href: "/services/packages/cv-writing" },
      { label: "LinkedIn Optimization", href: "/services/packages/linkedin-optimization" },
      { label: "CV Review Service", href: "/services/packages/cv-review" },
    ],
    recommendedTools: [
      { label: "ATS CV Audit Tool", href: "/tools/ats-cv-audit" },
      { label: "LinkedIn Headline Generator", href: "/tools/linkedin-headline-generator" },
    ],
    relatedResources: [
      { label: "ATS CV Quick Checklist", href: "/resources/ats-cv-quick-checklist" },
      { label: "LinkedIn Headline Formula Sheet", href: "/resources/linkedin-headline-formula-sheet" },
    ],
    relatedCaseStudySlugs: ["ats-cv-rewrite-international-applications", "linkedin-profile-optimization-sprint"],
  },
  {
    slug: "finance-accounting",
    name: "Finance & Accounting",
    title: "CV Writing and Career Branding for Finance & Accounting Professionals",
    description:
      "Support for accountants, auditors, finance executives, analysts, and controllers who need stronger professional positioning for local and international hiring processes.",
    heroSummary:
      "Finance profiles need credibility, clarity, and trust fast. The best-performing CVs and LinkedIn profiles show reporting ownership, controls, analysis, accuracy, and business contribution without sounding generic.",
    keywords: [
      "accountant cv writing sri lanka",
      "finance cv service",
      "linkedin optimization for accountants",
    ],
    sampleRoles: [
      "Accountant",
      "Finance Executive",
      "Audit Associate",
      "Financial Analyst",
      "Management Accountant",
      "Controller",
    ],
    challenges: [
      "CVs often read like duty lists instead of highlighting reporting, controls, and decision support.",
      "Achievements are underused even when the candidate has strong process or accuracy wins.",
      "LinkedIn profiles sound too generic for mid-level and senior finance roles.",
    ],
    positioningTips: [
      "Highlight reporting cycles, compliance context, process improvements, and impact on decision-making.",
      "Use achievement bullets to show cost control, timeline improvements, and analytical contribution.",
      "Position certifications, systems knowledge, and industry exposure more strategically.",
    ],
    recommendedServices: [
      { label: "Professional CV Writing", href: "/services/packages/cv-writing" },
      { label: "CV Review Service", href: "/services/packages/cv-review" },
      { label: "LinkedIn Optimization", href: "/services/packages/linkedin-optimization" },
    ],
    recommendedTools: [
      { label: "ATS CV Audit Tool", href: "/tools/ats-cv-audit" },
      { label: "Interview Story Bank Builder", href: "/tools/interview-story-bank" },
    ],
    relatedResources: [
      { label: "ATS CV Quick Checklist", href: "/resources/ats-cv-quick-checklist" },
      { label: "Interview Story Bank Template", href: "/resources/interview-story-bank-template" },
    ],
    relatedCaseStudySlugs: ["ats-cv-rewrite-international-applications", "career-coaching-roadmap-execution"],
  },
  {
    slug: "marketing-sales",
    name: "Marketing & Sales",
    title: "LinkedIn and CV Support for Marketing & Sales Professionals",
    description:
      "Career branding support for marketers, sales professionals, brand specialists, account managers, and growth-focused candidates who need stronger digital visibility and clearer performance proof.",
    heroSummary:
      "Marketing and sales candidates perform best when their profile tells a commercial story. Results, campaigns, audience growth, pipeline impact, and positioning all need to be visible quickly.",
    keywords: [
      "marketing cv writing",
      "sales linkedin optimization",
      "personal branding for marketers",
    ],
    sampleRoles: [
      "Marketing Executive",
      "Digital Marketer",
      "Brand Executive",
      "Sales Manager",
      "Account Executive",
      "Growth Specialist",
    ],
    challenges: [
      "Profiles mention campaign work but not enough metrics, conversions, or commercial outcomes.",
      "LinkedIn summaries often miss a strong niche and value proposition.",
      "Candidates struggle to connect CV, profile, and portfolio proof into one clear brand story.",
    ],
    positioningTips: [
      "Show campaign outcomes, leads, growth, engagement, revenue, and market-facing contributions.",
      "Use LinkedIn headlines that combine role, niche, and commercial value.",
      "Add proof assets such as featured posts, portfolio links, and a personal website when needed.",
    ],
    recommendedServices: [
      { label: "LinkedIn Optimization", href: "/services/packages/linkedin-optimization" },
      { label: "Personal Website Service", href: "/services/personal-website" },
      { label: "Professional CV Writing", href: "/services/packages/cv-writing" },
    ],
    recommendedTools: [
      { label: "LinkedIn Headline Generator", href: "/tools/linkedin-headline-generator" },
      { label: "Interview Story Bank Builder", href: "/tools/interview-story-bank" },
    ],
    relatedResources: [
      { label: "LinkedIn Headline Formula Sheet", href: "/resources/linkedin-headline-formula-sheet" },
      { label: "LinkedIn Authority System", href: "/resources/linkedin-authority-system" },
    ],
    relatedCaseStudySlugs: ["linkedin-profile-optimization-sprint", "personal-website-career-portfolio-launch"],
  },
  {
    slug: "hr-admin",
    name: "HR & Administration",
    title: "Career Support for HR, Recruitment, and Administration Roles",
    description:
      "ATS-friendly CV and LinkedIn support for HR officers, recruiters, executive assistants, office administrators, and people-operations professionals.",
    heroSummary:
      "HR and administration profiles need to balance people skills, operational reliability, process discipline, and communication. Strong positioning helps these candidates look structured, credible, and promotion-ready.",
    keywords: [
      "hr cv writing sri lanka",
      "admin resume service",
      "linkedin optimization for hr professionals",
    ],
    sampleRoles: [
      "HR Executive",
      "Recruiter",
      "People Operations Coordinator",
      "Executive Assistant",
      "Office Administrator",
      "HR Business Partner",
    ],
    challenges: [
      "Profiles often feel too task-based and understate stakeholder management and process impact.",
      "Recruitment or coordination outcomes are hard to prove without a stronger story structure.",
      "Candidates need better positioning for internal growth and lateral moves.",
    ],
    positioningTips: [
      "Show hiring outcomes, coordination quality, process improvements, and stakeholder trust.",
      "Frame communication, documentation, and support work as business-enabling contributions.",
      "Use interview stories that demonstrate judgment, empathy, and execution under pressure.",
    ],
    recommendedServices: [
      { label: "Professional CV Writing", href: "/services/packages/cv-writing" },
      { label: "CV Review Service", href: "/services/packages/cv-review" },
      { label: "LinkedIn Optimization", href: "/services/packages/linkedin-optimization" },
    ],
    recommendedTools: [
      { label: "ATS CV Audit Tool", href: "/tools/ats-cv-audit" },
      { label: "Interview Story Bank Builder", href: "/tools/interview-story-bank" },
    ],
    relatedResources: [
      { label: "ATS CV Quick Checklist", href: "/resources/ats-cv-quick-checklist" },
      { label: "Interview Story Bank Template", href: "/resources/interview-story-bank-template" },
    ],
    relatedCaseStudySlugs: ["career-coaching-roadmap-execution", "ats-cv-rewrite-international-applications"],
  },
  {
    slug: "engineering-operations",
    name: "Engineering & Operations",
    title: "CV and LinkedIn Services for Engineering & Operations Professionals",
    description:
      "Practical career branding for engineers, manufacturing professionals, supply chain specialists, and operations leaders who need clearer proof and stronger shortlist readiness.",
    heroSummary:
      "Operations and engineering candidates usually have strong practical results, but their profiles often fail to show leadership, process improvement, efficiency gains, and scale in a recruiter-friendly way.",
    keywords: [
      "engineering cv writing sri lanka",
      "operations resume service",
      "cv for supply chain professionals",
    ],
    sampleRoles: [
      "Operations Executive",
      "Project Engineer",
      "Production Engineer",
      "Supply Chain Specialist",
      "Logistics Manager",
      "Quality Engineer",
    ],
    challenges: [
      "Results are real, but they are hidden behind task-heavy writing and weak summaries.",
      "Metrics, process improvement wins, and team coordination proof are often underused.",
      "Candidates targeting overseas roles need stronger global-standard CV presentation.",
    ],
    positioningTips: [
      "Use numbers for efficiency gains, output, cost savings, accuracy, and delivery performance.",
      "Make leadership, coordination, and problem-solving visible in the first page of the CV.",
      "Align the summary to the target function instead of listing broad responsibilities.",
    ],
    recommendedServices: [
      { label: "Professional CV Writing", href: "/services/packages/cv-writing" },
      { label: "CV Review Service", href: "/services/packages/cv-review" },
      { label: "Personal Website Service", href: "/services/personal-website" },
    ],
    recommendedTools: [
      { label: "ATS CV Audit Tool", href: "/tools/ats-cv-audit" },
      { label: "Interview Story Bank Builder", href: "/tools/interview-story-bank" },
    ],
    relatedResources: [
      { label: "ATS CV Mastery Toolkit", href: "/resources/ats-cv-mastery-toolkit" },
      { label: "Interview Story Bank Template", href: "/resources/interview-story-bank-template" },
    ],
    relatedCaseStudySlugs: ["ats-cv-rewrite-international-applications", "personal-website-career-portfolio-launch"],
  },
  {
    slug: "fresh-graduates",
    name: "Fresh Graduates",
    title: "Career Support for Fresh Graduates and Early-Career Job Seekers",
    description:
      "Practical support for students, fresh graduates, internship seekers, and early-career professionals who need a stronger start with CVs, LinkedIn, interviews, and career direction.",
    heroSummary:
      "Early-career candidates do not need inflated profiles. They need clarity, structure, and evidence. The right CV, LinkedIn profile, and interview stories can make a major difference even with limited experience.",
    keywords: [
      "student cv writing sri lanka",
      "fresh graduate linkedin optimization",
      "entry level cv service",
    ],
    sampleRoles: [
      "Intern",
      "Trainee Executive",
      "Graduate Trainee",
      "Associate",
      "Junior Analyst",
      "Entry-Level Coordinator",
    ],
    challenges: [
      "Candidates often believe they have no proof, even when projects, coursework, internships, and volunteer work exist.",
      "CVs are too generic and fail to match real entry-level role requirements.",
      "Interviews feel difficult because examples are not organized into reusable stories.",
    ],
    positioningTips: [
      "Use academic projects, internships, freelance work, and extracurricular leadership as proof.",
      "Keep the CV clean, role-targeted, and free from filler statements.",
      "Build a LinkedIn headline and About section that sound focused and credible, not vague.",
    ],
    recommendedServices: [
      { label: "Professional CV Writing", href: "/services/packages/cv-writing" },
      { label: "LinkedIn Optimization", href: "/services/packages/linkedin-optimization" },
      { label: "Career Workshops", href: "/workshops" },
    ],
    recommendedTools: [
      { label: "ATS CV Audit Tool", href: "/tools/ats-cv-audit" },
      { label: "LinkedIn Headline Generator", href: "/tools/linkedin-headline-generator" },
      { label: "Interview Story Bank Builder", href: "/tools/interview-story-bank" },
    ],
    relatedResources: [
      { label: "ATS CV Quick Checklist", href: "/resources/ats-cv-quick-checklist" },
      { label: "LinkedIn Headline Formula Sheet", href: "/resources/linkedin-headline-formula-sheet" },
      { label: "Interview Story Bank Template", href: "/resources/interview-story-bank-template" },
    ],
    relatedCaseStudySlugs: ["career-coaching-roadmap-execution", "linkedin-profile-optimization-sprint"],
  },
];

export function getIndustryLandingPageBySlug(slug: string) {
  return industryLandingPages.find((item) => item.slug === slug);
}
