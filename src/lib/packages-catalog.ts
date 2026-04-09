export type PackageProduct = {
  slug: string;
  name: string;
  category: string;
  audience: string;
  priceLkr: number;
  delivery: string;
  features: string[];
  cta: string;
  isMostPopular?: boolean;
};

export type PackageCategory = {
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
    title: "CV Writing Packages",
    description:
      "Professionally written, ATS-friendly CVs designed to position you clearly and competitively for your target roles.",
    isPriority: true,
    packages: [
      {
        slug: "student-cv-package",
        name: "Student CV Package",
        category: "CV Writing",
        audience: "For school and university students",
        priceLkr: 3000,
        delivery: "2-5 days",
        features: [
          "Professional CV and resume writing",
          "Basic ATS optimization",
          "Editable Word and PDF files",
          "1 revision included",
        ],
        cta: "Message us to get started",
      },
      {
        slug: "starter-cv-package",
        name: "Starter CV Package",
        category: "CV Writing",
        audience: "Perfect for freshers and early-career professionals",
        priceLkr: 5000,
        delivery: "2-5 days",
        features: [
          "Professional CV design and formatting",
          "ATS optimization (75%+)",
          "Editable Word and PDF files",
          "Role-targeted presentation guidance",
        ],
        cta: "Chat now to start",
      },
      {
        slug: "professional-cv-package",
        name: "Professional CV Package",
        category: "CV Writing",
        audience: "For mid-level professionals and managers",
        priceLkr: 8000,
        delivery: "2-5 days",
        features: [
          "Premium CV writing and design",
          "ATS score target: 80-90%",
          "Unlimited revisions within 3 days",
          "Free cover letter included",
        ],
        cta: "Message us to upgrade your CV",
        isMostPopular: true,
      },
      {
        slug: "executive-cv-package",
        name: "Executive Package",
        category: "CV Writing",
        audience: "For senior leaders and executives",
        priceLkr: 12000,
        delivery: "2-5 days",
        features: [
          "Tailored executive CV and resume",
          "High-impact design with 100% ATS compliance",
          "Free professional cover letter",
          "Free LinkedIn account optimization",
        ],
        cta: "Chat now to start your executive CV",
      },
    ],
  },
  {
    title: "Cover Letter Writing Packages",
    description:
      "Customized cover letters that highlight your value, align with your target role, and strengthen your job application.",
    packages: [
      {
        slug: "student-cover-letter",
        name: "Student Cover Letter",
        category: "Cover Letter Writing",
        audience: "Best for school leavers, interns, and university students",
        priceLkr: 1500,
        delivery: "2-3 days",
        features: [
          "Simple, professional cover letter",
          "Aligned with student and internship roles",
          "Focused on skills, strengths, and motivation",
          "Delivered in PDF and Word format",
        ],
        cta: "Message us to start",
      },
      {
        slug: "starter-cover-letter",
        name: "Starter Cover Letter",
        category: "Cover Letter Writing",
        audience: "For freshers and entry-level job seekers",
        priceLkr: 2000,
        delivery: "2-3 days",
        features: [
          "Professionally written cover letter",
          "Simple and clear structure",
          "Aligned with your CV and target job",
          "Delivered in PDF and Word format",
        ],
        cta: "Chat now to get your cover letter",
      },
      {
        slug: "professional-cover-letter",
        name: "Professional Cover Letter",
        category: "Cover Letter Writing",
        audience: "Ideal for mid-level professionals",
        priceLkr: 3000,
        delivery: "2-3 days",
        features: [
          "Fully tailored cover letter",
          "Achievement-focused content",
          "Industry-specific tone and ATS-friendly writing",
          "2 revisions included",
        ],
        cta: "Message us to upgrade your cover letter",
      },
      {
        slug: "executive-cover-letter",
        name: "Executive Cover Letter",
        category: "Cover Letter Writing",
        audience: "For managers, senior professionals, and executives",
        priceLkr: 5000,
        delivery: "2-3 days",
        features: [
          "Leadership-focused, high-impact writing",
          "Strong strategic value proposition",
          "Customized to company and job description",
          "Unlimited revisions within 24 hours of delivery",
        ],
        cta: "Chat now to get your executive cover letter",
      },
    ],
  },
  {
    title: "LinkedIn Optimization Packages",
    description:
      "Strategic LinkedIn profile improvement focused on visibility, keyword positioning, personal branding, and recruiter attraction.",
    packages: [
      {
        slug: "student-linkedin-package",
        name: "Student LinkedIn Package",
        category: "LinkedIn Optimization",
        audience: "Best for students",
        priceLkr: 3000,
        delivery: "2-5 working days",
        features: [
          "Full LinkedIn profile review with improvement suggestions",
          "Headline ideas for a stronger first impression",
          "About section guidance and pointers",
          "Skills and keyword recommendations",
        ],
        cta: "Message us to start your LinkedIn optimization",
      },
      {
        slug: "starter-linkedin-package",
        name: "Starter LinkedIn Package",
        category: "LinkedIn Optimization",
        audience: "Best for freshers and entry-level professionals",
        priceLkr: 5000,
        delivery: "2-5 working days",
        features: [
          "Full LinkedIn profile analysis",
          "Headline rewrite suggestions",
          "About section enhancement plan",
          "Experience section structure tips",
        ],
        cta: "Chat now to optimize your profile",
      },
      {
        slug: "professional-linkedin-package",
        name: "Professional LinkedIn Package",
        category: "LinkedIn Optimization",
        audience: "For mid-level professionals",
        priceLkr: 8000,
        delivery: "2-5 working days",
        features: [
          "Deep profile audit",
          "Headline, About, and Experience section improvements",
          "Industry-relevant keyword strategy",
          "Featured section suggestions",
        ],
        cta: "Message us to upgrade your LinkedIn",
      },
      {
        slug: "executive-linkedin-package",
        name: "Executive LinkedIn Package",
        category: "LinkedIn Optimization",
        audience: "Designed for senior leaders and executives",
        priceLkr: 12000,
        delivery: "2-5 working days",
        features: [
          "Executive-level profile audit",
          "Personal branding strategy",
          "Leadership-focused headline and About section suggestions",
          "High-impact keyword strategy",
        ],
        cta: "Chat now to optimize your executive profile",
      },
    ],
  },
  {
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
];

export const packageProducts: PackageProduct[] = packageCategories.flatMap(
  (category) => category.packages.map((item) => ({ ...item, category: item.category || category.title.replace(" Packages", "") }))
);

export function formatLkr(price: number): string {
  return `LKR ${price.toLocaleString("en-LK")}`;
}
