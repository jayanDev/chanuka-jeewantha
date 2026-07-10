export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  year: number;
  image: string;
  summary: string;
  clientProfile: string;
  challenge: string[];
  strategy: string[];
  outcomes: string[];
  proofPoints: string[];
  relatedServices: Array<{
    label: string;
    href: string;
  }>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "faang-offer-8-weeks-ats-cv-transformation",
    title: "From 6 Months of Silence to a FAANG-Level Offer in 8 Weeks",
    category: "ATS CV Writing",
    year: 2025,
    image: "/images/hero-chanuka.jpg",
    summary:
      "A senior software engineer went from half a year of recruiter silence to a FAANG-level offer after one strategic ATS-focused CV rewrite and stronger market positioning.",
    clientProfile:
      "Senior software engineer with 9 years of fintech and backend systems experience, targeting FAANG-level and global remote roles after a long, inactive application cycle.",
    challenge: [
      "The existing CV buried achievements under dense responsibility language and lacked ATS-friendly keyword alignment.",
      "Recruiters were scanning past the profile because it did not clearly communicate senior technical leadership and product impact.",
      "The candidate had strong experience but no proof points that matched high-volume international application filters.",
    ],
    strategy: [
      "Rebuilt the CV with achievement-led storytelling, ATS-safe headings, and concise senior-level positioning.",
      "Mapped the profile to FAANG-style role keywords while preserving readability for human review.",
      "Created a focused executive summary and impact bullets that turned technical work into business results.",
    ],
    outcomes: [
      "A new CV that delivered 14 recruiter interviews within the first eight weeks.",
      "A 97% ATS keyword match score for target senior software engineering roles.",
      "A signed offer with an LKR 8.4M+ package — 40% above the previous compensation benchmark.",
    ],
    proofPoints: [
      "High-impact, recruiter-centered achievement bullets",
      "ATS-safe structure with clear senior engineering positioning",
      "Rapid shortlist results after prolonged application silence",
    ],
    relatedServices: [
      { label: "Professional CV Writing", href: "/services/packages/cv-writing" },
      { label: "Book Consultation", href: "/contact" },
      { label: "Compare Pricing", href: "/pricing" },
    ],
  },
  {
    slug: "linkedin-profile-optimization-sprint",
    title: "LinkedIn Profile Optimization Sprint",
    category: "LinkedIn Optimization",
    year: 2023,
    image: "/images/linkedin-optimization-30k-followers-proof.jpg",
    summary:
      "A LinkedIn positioning refresh focused on discoverability, authority, and stronger recruiter-facing messaging for professional growth.",
    clientProfile:
      "A marketing specialist with solid experience but low inbound visibility and weak profile messaging.",
    challenge: [
      "The headline and About section were too generic to attract relevant searches.",
      "Experience entries read like task lists instead of market-facing proof.",
      "The profile lacked clear authority signals and consistency across sections.",
    ],
    strategy: [
      "Reframed the headline, About section, and experience copy around recruiter search intent.",
      "Strengthened positioning with clearer niche language and proof-based storytelling.",
      "Aligned profile sections to support both inbound opportunities and manual outreach.",
    ],
    outcomes: [
      "A profile that communicates positioning faster and more credibly.",
      "Improved visibility for role-relevant keyword searches.",
      "Stronger consistency between public profile, CV, and outreach messaging.",
    ],
    proofPoints: [
      "Headline and About rewrite",
      "Search-oriented keyword strategy",
      "Experience storytelling cleanup",
    ],
    relatedServices: [
      { label: "LinkedIn Optimization", href: "/services/packages/linkedin-optimization" },
      { label: "LinkedIn Authority Resources", href: "/resources/linkedin-authority-system" },
      { label: "View Services", href: "/services" },
    ],
  },
  {
    slug: "career-coaching-roadmap-execution",
    title: "Career Coaching + Roadmap Execution",
    category: "Career Coaching",
    year: 2022,
    image: "/images/about-page-chanuka.jpg",
    summary:
      "A structured coaching engagement that moved a client from unclear direction to focused applications, stronger positioning, and more confident execution.",
    clientProfile:
      "A career switcher needing role clarity, application focus, and a stronger execution plan across CV, LinkedIn, and interview preparation.",
    challenge: [
      "Applications were spread across too many role types with no positioning focus.",
      "The candidate had useful experience but no clear narrative for the new direction.",
      "Execution lacked consistency across CV, profile, and interview stories.",
    ],
    strategy: [
      "Built a practical roadmap around role selection, proof mapping, and communication strategy.",
      "Aligned CV, LinkedIn, and interview stories to one coherent career narrative.",
      "Created a step-by-step application rhythm with measurable next actions.",
    ],
    outcomes: [
      "Better clarity on target roles and a more disciplined application strategy.",
      "Improved confidence in networking, profile messaging, and interview preparation.",
      "A stronger system for turning effort into visible progress instead of guesswork.",
    ],
    proofPoints: [
      "Role-targeting framework",
      "Narrative alignment across channels",
      "Practical weekly execution plan",
    ],
    relatedServices: [
      { label: "Career Services", href: "/services" },
      { label: "Free Interview Template", href: "/resources/interview-story-bank-template" },
      { label: "Book Consultation", href: "/contact" },
    ],
  },
  {
    slug: "personal-website-career-portfolio-launch",
    title: "Personal Website Launch for a Career Portfolio Upgrade",
    category: "Digital Presence",
    year: 2025,
    image: "/images/hero-chanuka.jpg",
    summary:
      "A personal website launch that turned a strong professional background into a clearer public proof layer recruiters and clients could review in minutes.",
    clientProfile:
      "A mid-career specialist with a good CV and LinkedIn profile who needed stronger digital presence, a public portfolio link, and more credible proof for outreach and applications.",
    challenge: [
      "The candidate had strong experience, but proof was spread across a CV, LinkedIn profile, and disconnected documents.",
      "Recruiters and decision-makers had no simple place to review work, positioning, and contact details together.",
      "The profile needed a clearer authority layer for international and opportunity-led conversations.",
    ],
    strategy: [
      "Built a portfolio-style personal website focused on positioning, achievements, experience, and contact clarity.",
      "Aligned the website messaging with the CV and LinkedIn profile to create one coherent public story.",
      "Used a cleaner digital structure so the candidate could share a single proof link with recruiters and clients.",
    ],
    outcomes: [
      "A stronger digital presence that supported CV claims with visible proof.",
      "Better clarity for recruiters and inbound opportunities reviewing the candidate's profile.",
      "A reusable public asset for applications, networking, and personal branding.",
    ],
    proofPoints: [
      "Public portfolio-style proof layer",
      "Stronger digital presence and credibility",
      "Aligned messaging across CV, LinkedIn, and website",
    ],
    relatedServices: [
      { label: "Personal Website Service", href: "/services/personal-website" },
      { label: "LinkedIn Optimization", href: "/services/packages/linkedin-optimization" },
      { label: "Portfolio Examples", href: "/portfolio" },
    ],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
