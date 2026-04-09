export type ServiceAd = {
  title: string;
  description: string;
  href: string;
};

export const serviceAds: ServiceAd[] = [
  {
    title: "Professional CV Writing",
    description: "100% ATS-friendly CV packages for students to executives.",
    href: "/services/packages/cv-writing",
  },
  {
    title: "Cover Letter Writing",
    description: "Role-focused cover letters that improve shortlisting potential.",
    href: "/services/packages/cover-letter-writing",
  },
  {
    title: "LinkedIn Optimization",
    description: "Profile SEO and positioning to attract recruiters consistently.",
    href: "/services/packages/linkedin-optimization",
  },
  {
    title: "CV Review Service",
    description: "Expert feedback and improvement roadmap for your current CV.",
    href: "/services/packages/cv-review",
  },
];
