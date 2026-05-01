export type PackageProduct = {
  slug: string;
  name: string;
  category: string;
  categoryKey?: PackageCategoryKey;
  audience: string;
  description?: string;
  idealFor?: string;
  priceLkr: number;
  delivery: string;
  features: string[];
  cta: string;
  isMostPopular?: boolean;
};

export type PackageCategoryKey =
  | "cv-writing"
  | "cv-review"
  | "bulk-discount"
  | "cover-letter"
  | "linkedin"
  | "bundle-discount";

export type PackageCategory = {
  key: PackageCategoryKey;
  title: string;
  description: string;
  isPriority?: boolean;
  packages: PackageProduct[];
};

export const paymentInstructions = {
  bank: "Bank of Ceylon",
  accountName: "W.A.C. Jeewantha",
  accountNumber: "0079282859",
  branch: "Makola Branch",
  methodNote:
    "Please make a bank transfer to confirm your order and use your name or mobile number as the payment reference.",
};

export const packageCategories: PackageCategory[] = [
  {
    key: "cv-writing",
    title: "CV Writing Packages",
    description:
      "Professionally written, ATS-friendly CVs designed to position you clearly and competitively for your target roles.",
    isPriority: true,
    packages: [
      {
        slug: "student-cv-package",
        name: "Student Package - CV Writing Services",
        category: "CV Writing",
        audience: "For students, undergraduates, interns, fresh graduates, and entry-level job seekers",
        description:
          "Specially designed for students, undergraduates, interns, fresh graduates, and entry-level job seekers who need a professional CV to apply for internships, trainee roles, graduate programs, and first job opportunities.",
        idealFor:
          "Ideal for candidates with limited work experience who want to present their education, skills, projects, internships, and achievements in a professional and recruiter-friendly way.",
        priceLkr: 5000,
        delivery: "3-7 Days",
        features: [
          "Professional CV Design & Formatting",
          "ATS Optimization 75%+",
          "Student Profile Positioning",
          "Education, Skills & Project Section Optimization",
          "Editable Word File",
        ],
        cta: "Start Student Package",
      },
      {
        slug: "professional-cv-package",
        name: "Professional Package - CV Writing Services",
        category: "CV Writing",
        audience: "For working professionals, experienced job seekers, executives, and career changers",
        description:
          "Specially designed for working professionals, experienced job seekers, executives, and career changers who need a strong, polished, ATS-friendly CV to apply for better career opportunities.",
        idealFor:
          "Ideal for professionals who want to present their experience, skills, achievements, and career value in a clear, confident, and recruiter-friendly way.",
        priceLkr: 10000,
        delivery: "3-7 Days",
        features: [
          "Premium CV Writing & Design",
          "ATS Score 80-90%",
          "Professional Profile Positioning",
          "Achievement-Based Experience Rewriting",
          "Keyword Optimization for Target Roles",
          "Editable Word File",
          "3 Revisions within 3 Days after Delivery",
        ],
        cta: "Start Professional Package",
        isMostPopular: true,
      },
      {
        slug: "executive-cv-package",
        name: "Executive Package - CV Writing Services",
        category: "CV Writing",
        audience: "For senior professionals, managers, executives, department heads, consultants, and leaders",
        description:
          "Specially designed for senior professionals, managers, executives, department heads, consultants, and leadership-level candidates who need a powerful executive CV to position their experience with authority, clarity, and impact.",
        idealFor:
          "Ideal for professionals who want to highlight leadership experience, business impact, strategic decision-making, team management, operational achievements, and senior-level career value in a premium and recruiter-friendly way.",
        priceLkr: 15000,
        delivery: "3-7 Days",
        features: [
          "Tailored Executive CV & Resume",
          "High-Impact Executive Design",
          "ATS-Optimized Structure",
          "Executive Profile Positioning",
          "Leadership & Achievement-Based Rewriting",
          "Strategic Career Summary",
          "Core Competencies Optimization",
          "Editable Word File",
          "3 Revisions within 3 Days after Delivery",
        ],
        cta: "Start Executive Package",
      },
    ],
  },
  {
    key: "cv-review",
    title: "CV Review Packages",
    description:
      "Detailed expert feedback on your existing CV with clear recommendations for ATS optimization, stronger content, and better structure.",
    packages: [
      {
        slug: "student-cv-review-package",
        name: "Student CV Review Package",
        category: "CV Review",
        audience: "We tell you what to fix - you edit it",
        priceLkr: 1500,
        delivery: "2-3 days",
        features: [
          "Full CV review",
          "Clear list of all improvements needed",
          "ATS keyword and formatting guidance",
          "Grammar, structure, and layout suggestions",
        ],
        cta: "Message us to get your review",
      },
      {
        slug: "starter-cv-review-package",
        name: "Starter CV Review Package",
        category: "CV Review",
        audience: "Perfect for freshers and early-career professionals",
        priceLkr: 2000,
        delivery: "2-3 days",
        features: [
          "Section-by-section CV review",
          "ATS keyword alignment tips",
          "Content clarity suggestions",
          "Design and layout improvement ideas",
        ],
        cta: "Chat with us to start your review",
      },
      {
        slug: "professional-cv-review-package",
        name: "Professional CV Review Package",
        category: "CV Review",
        audience: "For mid-level professionals and specialists",
        priceLkr: 3000,
        delivery: "2-3 days",
        features: [
          "Deep CV analysis",
          "ATS optimization recommendations",
          "Content improvement suggestions",
          "Layout and achievement enhancement tips",
        ],
        cta: "Message us to get your detailed review",
      },
      {
        slug: "executive-cv-review-package",
        name: "Executive CV Review Package",
        category: "CV Review",
        audience: "For senior managers, directors, and C-level roles",
        priceLkr: 5000,
        delivery: "2-3 days",
        features: [
          "Senior-level CV analysis",
          "Leadership-oriented improvement guidance",
          "Keyword strategy recommendations",
          "Layout and structure refinement suggestions",
        ],
        cta: "Chat now for your executive CV review",
      },
    ],
  },
  {
    key: "bulk-discount",
    title: "Bulk Discount Packages",
    description:
      "Bulk-buy package builders with stronger discounts based on your selected CV, cover letter, and LinkedIn tiers.",
    isPriority: true,
    packages: [
      {
        slug: "bulk-cv-5-pack",
        name: "Bulk CV 5-Pack",
        category: "Bulk Discount",
        audience: "Choose CV + Cover Letter + LinkedIn tiers for 5 candidates",
        priceLkr: 52000,
        delivery: "3-7 days",
        features: [
          "Build from selected CV, Cover Letter, and LinkedIn tiers",
          "Pricing multiplies by 5 candidates",
          "20% bulk discount applied to full selection",
          "Ideal for group and agency orders",
        ],
        cta: "Build 5-CV bulk package",
      },
      {
        slug: "bulk-cv-10-pack",
        name: "Bulk CV 10-Pack",
        category: "Bulk Discount",
        audience: "Choose CV + Cover Letter + LinkedIn tiers for 10 candidates",
        priceLkr: 65000,
        delivery: "5-10 days",
        features: [
          "Build from selected CV, Cover Letter, and LinkedIn tiers",
          "Pricing multiplies by 10 candidates",
          "50% bulk discount applied to full selection",
          "Best value for large-volume orders",
        ],
        cta: "Build 10-CV bulk package",
      },
    ],
  },
  {
    key: "cover-letter",
    title: "Cover Letter Writing Packages",
    description:
      "Customized cover letters that highlight your value, align with your target role, and strengthen your job application.",
    packages: [
      {
        slug: "student-cover-letter",
        name: "Student Package - Cover Letter Writing Services",
        category: "Cover Letter Writing",
        audience: "For school leavers, interns, university students, fresh graduates, and entry-level job seekers",
        description:
          "Specially designed for school leavers, interns, university students, fresh graduates, and entry-level job seekers who need a simple, professional cover letter for internships, trainee roles, graduate programs, part-time jobs, and first job opportunities.",
        idealFor:
          "Ideal for students and freshers who want to introduce themselves professionally, show genuine interest, and improve the quality of their job or internship applications.",
        priceLkr: 3000,
        delivery: "2-5 Days",
        features: [
          "Simple, Professional Cover Letter",
          "Student / Internship Role Alignment",
          "Focus on Skills, Strengths & Motivation",
          "Education & Career Interest Positioning",
          "Delivered as Editable Word File",
          "1 Revision Included",
        ],
        cta: "Start Student Package",
      },
      {
        slug: "professional-cover-letter",
        name: "Professional Package - Cover Letter Writing Services",
        category: "Cover Letter Writing",
        audience: "For mid-level professionals, experienced job seekers, career changers, and skilled professionals",
        description:
          "Specially designed for mid-level professionals, experienced job seekers, career changers, and skilled professionals who need a fully tailored cover letter to support job applications and present their experience with clarity and confidence.",
        idealFor:
          "Ideal for professionals who want to connect their experience with the target role, highlight their achievements, and make a strong first impression with recruiters and employers.",
        priceLkr: 4000,
        delivery: "2-5 Days",
        features: [
          "Fully Tailored Professional Cover Letter",
          "Achievement-Focused Content",
          "Industry-Specific Tone & Wording",
          "ATS-Friendly Writing Structure",
          "Skills, Experience & Career Value Highlighting",
          "Delivered as Editable Word File",
          "2 Revisions Included",
        ],
        cta: "Start Professional Package",
        isMostPopular: true,
      },
      {
        slug: "executive-cover-letter",
        name: "Executive Package - Cover Letter Writing Services",
        category: "Cover Letter Writing",
        audience: "For managers, senior professionals, executives, department heads, consultants, and leaders",
        description:
          "Specially designed for managers, senior professionals, executives, department heads, consultants, and leadership-level candidates who need a powerful, customized cover letter to support senior-level job applications.",
        idealFor:
          "Ideal for senior professionals who want to communicate leadership value, strategic contribution, business impact, and suitability for executive-level opportunities with confidence and authority.",
        priceLkr: 5000,
        delivery: "2-5 Days",
        features: [
          "Leadership-Focused High-Impact Writing",
          "Strategic Value Proposition",
          "Company & Job Description Customization",
          "Executive-Level Tone & Career Positioning",
          "Achievement, Leadership & Business Impact Highlighting",
          "Delivered as Editable Word File",
          "Unlimited Revisions within 24 Hours of Delivery",
        ],
        cta: "Start Executive Package",
      },
    ],
  },
  {
    key: "linkedin",
    title: "LinkedIn Account Optimization Packages",
    description:
      "Strategic LinkedIn profile improvement focused on visibility, keyword positioning, personal branding, and recruiter attraction.",
    packages: [
      {
        slug: "student-linkedin-package",
        name: "Student Package - LinkedIn Optimisation Package",
        category: "LinkedIn Optimization",
        audience: "For students, undergraduates, interns, fresh graduates, and entry-level job seekers",
        description:
          "Specially designed for students, undergraduates, interns, fresh graduates, and entry-level job seekers who want to build a professional LinkedIn profile for internships, trainee roles, graduate programs, and first job opportunities.",
        idealFor:
          "Ideal for students and freshers who want to present their education, skills, projects, internships, achievements, and career interests professionally on LinkedIn.",
        priceLkr: 5000,
        delivery: "3-7 Days",
        features: [
          "LinkedIn Profile Review",
          "Personalized Profile Improvement List",
          "Professional Headline Suggestions",
          "\"About\" Section Improvement Points",
          "Skills & Keyword Recommendations",
          "Education, Projects & Internship Positioning Tips",
          "Basic Layout & Profile Visibility Tips",
        ],
        cta: "Start Student Package",
      },
      {
        slug: "professional-linkedin-package",
        name: "Professional Package - LinkedIn Optimisation Package",
        category: "LinkedIn Optimization",
        audience: "For mid-level professionals, experienced job seekers, career changers, and skilled professionals",
        description:
          "Specially designed for mid-level professionals, experienced job seekers, career changers, and skilled professionals who want to strengthen their LinkedIn presence, improve recruiter visibility, and present their career value more professionally.",
        idealFor:
          "Ideal for professionals who want to showcase their experience, achievements, skills, and career direction clearly while increasing their chances of being discovered by recruiters in their field.",
        priceLkr: 10000,
        delivery: "3-7 Days",
        features: [
          "Deep LinkedIn Profile Audit",
          "Professional Headline Improvement",
          "About Section Rewrite / Improvement Guidance",
          "Experience Section Improvement Recommendations",
          "Industry-Relevant Keyword Strategy",
          "Featured Section Suggestions",
          "Layout, Content & Personal Branding Recommendations",
          "Recruiter Visibility Improvement Guidance",
        ],
        cta: "Start Professional Package",
        isMostPopular: true,
      },
      {
        slug: "executive-linkedin-package",
        name: "Executive Package - LinkedIn Optimisation Package",
        category: "LinkedIn Optimization",
        audience: "For senior professionals, managers, executives, consultants, department heads, and business leaders",
        description:
          "Specially designed for senior professionals, managers, executives, consultants, department heads, business leaders, and leadership-level candidates who want to strengthen their executive presence, improve industry visibility, and position themselves for senior-level career opportunities.",
        idealFor:
          "Ideal for leaders who want to present their experience, achievements, strategic value, industry credibility, and leadership brand clearly on LinkedIn.",
        priceLkr: 15000,
        delivery: "3-7 Days",
        features: [
          "Executive-Level LinkedIn Profile Audit",
          "Personal Branding Strategy",
          "Leadership-Focused Headline & About Suggestions",
          "High-Impact Keyword Strategy",
          "Executive Profile Positioning Recommendations",
          "Guidance to Improve Authority & Industry Visibility",
          "Leadership Experience Presentation Tips",
          "Featured Section & Thought Leadership Suggestions",
        ],
        cta: "Start Executive Package",
      },
    ],
  },
  {
    key: "bundle-discount",
    title: "Bundle Discount Packages",
    description:
      "Multi-service bundle builders with automatic savings once you pick your package tiers.",
    isPriority: true,
    packages: [
      {
        slug: "career-brand-combo-30",
        name: "Career Brand Trinity Bundle",
        category: "Bundle Discount",
        audience: "Select CV + Cover Letter + LinkedIn tiers and get 30% OFF",
        priceLkr: 9100,
        delivery: "3-6 days",
        features: [
          "CV Writing + Cover Letter + LinkedIn Optimization",
          "30% bundle discount after tier selection",
          "Consistent messaging across all three deliverables",
          "Built for local and international applications",
        ],
        cta: "Build Trinity Bundle",
        isMostPopular: true,
      },
      {
        slug: "application-duo-20",
        name: "Application Duo Bundle",
        category: "Bundle Discount",
        audience: "Select CV + Cover Letter tiers and get 20% OFF",
        priceLkr: 6400,
        delivery: "2-5 days",
        features: [
          "CV Writing + Cover Letter",
          "20% bundle discount after tier selection",
          "Role-aligned document matching",
          "Made for faster application readiness",
        ],
        cta: "Build Duo Bundle",
      },
    ],
  },
];

export const packageProducts: PackageProduct[] = packageCategories.flatMap(
  (category) => category.packages.map((item) => ({ ...item, category: item.category || category.title.replace(" Packages", "") }))
);

export function formatLkr(price: number): string {
  return `LKR ${price.toLocaleString("en-LK")}`;
}
