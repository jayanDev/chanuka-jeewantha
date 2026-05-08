import { packageProducts, type PackageProduct } from "@/lib/packages-catalog";
import { careerGrowthBlogPosts } from "./blog-career-library";
import { enrichBlogPostContent } from "./blog-content-enrichment";
import { cvSeriesEn } from "./blog-cv-series-en";
import { cvSeriesSi } from "./blog-cv-series-si";

export type BlogLink = {
  label: string;
  href: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  author: string;
  coverImage?: string;
  packageSlug?: string;
  keywords?: string[];
  sections?: BlogSection[];
  internalLinks?: BlogLink[];
  ctaButtons?: BlogLink[];
  faqs?: BlogFaq[];
};

const servicePathByCategory: Record<string, string> = {
  "CV Writing": "/services/packages/cv-writing",
  "Cover Letter Writing": "/services/packages/cover-letter-writing",
  "LinkedIn Optimization": "/services/packages/linkedin-optimization",
  "CV Review": "/services/packages/cv-review",
};

type PackageGuideDraft = {
  packageSlug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  keywords: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  internalLinks?: BlogLink[];
  ctaButtons?: BlogLink[];
};

function getPackageOrThrow(slug: string): PackageProduct {
  const pkg = packageProducts.find((item) => item.slug === slug);
  if (!pkg) {
    throw new Error(`Missing package definition for slug: ${slug}`);
  }
  return pkg;
}

function buildDefaultInternalLinks(pkg: PackageProduct): BlogLink[] {
  const servicePath = servicePathByCategory[pkg.category] ?? "/services";
  return [
    { label: `View ${pkg.name}`, href: `/packages/${pkg.slug}` },
    { label: `Explore ${pkg.category} services`, href: servicePath },
    { label: "Compare all pricing plans", href: "/pricing" },
    { label: "Browse resources for job seekers", href: "/resources" },
    { label: "Get direct support via contact", href: "/contact" },
  ];
}

function buildDefaultCtas(pkg: PackageProduct): BlogLink[] {
  return [
    { label: "View Package Details", href: `/packages/${pkg.slug}` },
    { label: "Compare Pricing", href: "/pricing" },
    { label: "Start Your Order", href: "/checkout" },
    { label: "Contact for Advice", href: "/contact" },
  ];
}

const packageGuideDrafts: PackageGuideDraft[] = [
  {
    packageSlug: "ats-cv-student-founder-led",
    title: "Student Package - CV Writing Services: CV Writing for Students, Interns, and Fresh Graduates",
    excerpt:
      "A complete guide to the Student Package for students, undergraduates, interns, fresh graduates, and entry-level job seekers who need an ATS-friendly first CV.",
    content:
      "The Student Package - CV Writing Services is designed for candidates with limited work experience who still need to look clear, professional, and recruiter-friendly. It helps turn education, skills, projects, internships, and achievements into a focused CV for internships, trainee roles, graduate programs, and first job opportunities.",
    category: "Student CV Writing",
    publishedAt: "2026-02-10",
    keywords: [
      "student package cv writing services",
      "internship cv sri lanka",
      "fresh graduate cv writing",
      "entry level cv service",
      "ats friendly student cv",
      "chanuka jeewantha cv service",
    ],
    sections: [
      {
        heading: "Who This Student Package Is Built For",
        paragraphs: [
          "This package is specially designed for students, undergraduates, interns, fresh graduates, and entry-level job seekers who need a professional CV before they have a long employment history.",
          "The goal is not to exaggerate experience. The goal is to present your real education, projects, skills, internships, volunteer work, and achievements in a format that recruiters can understand quickly.",
        ],
        bullets: [
          "Students applying for internships and trainee roles",
          "Fresh graduates applying for graduate programs",
          "Entry-level job seekers with limited work experience",
          "Candidates who need a clean editable Word CV",
        ],
      },
      {
        heading: "Package Includes",
        paragraphs: [
          "The Student Package focuses on professional presentation, ATS readability, and student profile positioning. It gives your CV a stronger base for first-stage screening and human recruiter review.",
          "Price: LKR 5,000. Delivery Time: 3-7 Days. The package is built around ATS Optimization 75%+ and a Word format you can edit as your career grows.",
        ],
        bullets: [
          "Professional CV Design & Formatting",
          "ATS Optimization 75%+",
          "Student Profile Positioning",
          "Education, Skills & Project Section Optimization",
          "Editable Word File",
        ],
      },
      {
        heading: "How This Helps When You Have Limited Experience",
        paragraphs: [
          "A strong student CV makes education and project evidence easier to scan. Recruiters do not expect a senior career history, but they do expect role relevance, clean structure, and proof that you can learn and contribute.",
          "This package positions your academic background, certifications, technical skills, coursework, final-year projects, internships, and extracurricular achievements in a professional way.",
        ],
        bullets: [
          "Turn projects into evidence of practical ability",
          "Present internships and volunteer work clearly",
          "Replace weak objectives with a stronger student profile",
          "Keep the document recruiter-friendly and easy to update",
        ],
      },
      {
        heading: "Best Way to Use the Delivered CV",
        paragraphs: [
          "After delivery, use the CV as your main base document for internship, trainee, graduate, and first-job applications. For each job, adjust a few keywords in the profile and skills sections to match the target role.",
          "Pair the CV with a focused cover letter and a consistent LinkedIn profile when applying to competitive roles, because recruiters often compare all application touchpoints before shortlisting.",
        ],
        bullets: [
          "Apply to focused role groups instead of random job titles",
          "Update the CV with every new certification or project",
          "Use the same positioning on LinkedIn and job portals",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should choose the Student Package?",
        answer:
          "Students, undergraduates, interns, fresh graduates, and entry-level job seekers who need a professional first CV should choose this package.",
      },
      {
        question: "What is the price and delivery time?",
        answer:
          "The Student Package is LKR 5,000 and the delivery time is 3-7 Days.",
      },
      {
        question: "Can I update the CV later?",
        answer:
          "Yes. You receive an editable Word file, so you can add new projects, internships, skills, certifications, and achievements later.",
      },
    ],
  },
  {
    packageSlug: "ats-cv-professional-founder-led",
    title: "Professional Package - CV Writing Services: Strategic CV Writing for Career Growth",
    excerpt:
      "A complete guide to the Professional Package for working professionals, experienced job seekers, executives, and career changers who need a polished ATS-friendly CV.",
    content:
      "The Professional Package - CV Writing Services is designed for working professionals, experienced job seekers, executives, and career changers who need a strong, polished, ATS-friendly CV for better career opportunities. It focuses on professional profile positioning, achievement-based rewriting, and keyword optimization for target roles.",
    category: "Professional CV Writing",
    publishedAt: "2026-02-12",
    keywords: [
      "professional cv package",
      "mid level cv writing",
      "ats cv for professionals",
      "career growth cv",
      "premium cv sri lanka",
    ],
    sections: [
      {
        heading: "Mid-Level CV Problems That Reduce Interview Calls",
        paragraphs: [
          "Many professional CVs are full of responsibilities but short on outcomes. Recruiters need to see business impact: improvements, savings, growth, risk reduction, delivery quality, and contribution to team or company goals.",
          "Another common issue is weak role direction. A CV that tries to fit every possible role often performs worse than one built around a clear target path.",
        ],
        bullets: [
          "Unclear role targeting",
          "Low evidence of measurable outcomes",
          "Poor keyword alignment with senior job descriptions",
        ],
      },
      {
        heading: "Package Includes",
        paragraphs: [
          "The Professional Package reframes your experience around career value, achievements, and target-role relevance while preserving ATS-friendly structure and readability.",
          "Price: LKR 10,000. Delivery Time: 3-7 Days. The package is built for an ATS Score 80-90% and includes 3 revisions within 3 days after delivery.",
        ],
        bullets: [
          "Premium CV Writing & Design",
          "ATS Score 80-90%",
          "Professional Profile Positioning",
          "Achievement-Based Experience Rewriting",
          "Keyword Optimization for Target Roles",
          "Editable Word File",
          "3 Revisions within 3 Days after Delivery",
        ],
      },
      {
        heading: "How to Use the CV for Career Acceleration",
        paragraphs: [
          "Pair your CV with a focused 90-day role strategy. Prioritize roles where your strongest outcomes are most relevant and tailor keywords around those targets.",
          "Use the upgraded CV in recruiter outreach and referral conversations, not only job portals. Better documents create better referrals.",
        ],
        bullets: [
          "Build 2-3 role-specific CV variants",
          "Use quantified achievements in every core role section",
          "Combine applications with referral and direct outreach",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should choose the Professional Package?",
        answer:
          "Working professionals, experienced job seekers, executives, and career changers who need a stronger, polished, ATS-friendly CV should choose this package.",
      },
      {
        question: "What is included in the revision support?",
        answer:
          "The package includes 3 revisions within 3 days after delivery, so you can request focused refinements after reviewing the completed CV.",
      },
      {
        question: "What is the price and delivery time?",
        answer:
          "The Professional Package is LKR 10,000 and the delivery time is 3-7 Days.",
      },
    ],
  },
  {
    packageSlug: "ats-cv-executive-founder-led",
    title: "Executive Package - CV Writing Services: Leadership CV Writing for Senior Candidates",
    excerpt:
      "Understand how senior professionals, managers, executives, department heads, consultants, and leadership-level candidates can use an executive CV to communicate authority and impact.",
    content:
      "The Executive Package - CV Writing Services is designed for senior professionals, managers, executives, department heads, consultants, and leadership-level candidates who need a powerful executive CV. It positions experience with authority, clarity, and impact while keeping the structure recruiter-friendly and ATS-ready.",
    category: "Executive CV Writing",
    publishedAt: "2026-02-13",
    keywords: [
      "executive cv package",
      "c level cv writing",
      "director resume sri lanka",
      "leadership cv ats",
      "executive career branding",
    ],
    sections: [
      {
        heading: "What Executive Recruiters Need to See Fast",
        paragraphs: [
          "At executive level, recruiters evaluate strategic outcomes, team leadership scale, governance maturity, and commercial decision quality. Generic responsibilities do not create confidence.",
          "Your CV must communicate enterprise-level relevance in the first page: growth impact, transformation leadership, risk control, and stakeholder trust.",
        ],
        bullets: [
          "Board and leadership communication clarity",
          "Business outcomes with hard metrics",
          "Crisis, change, and growth management proof",
        ],
      },
      {
        heading: "Package Includes",
        paragraphs: [
          "This package structures your experience around strategic impact rather than operational detail. It highlights leadership narrative, governance discipline, business value, and senior-level career direction.",
          "Price: LKR 15,000. Delivery Time: 3-7 Days. The package includes an editable Word file and 3 revisions within 3 days after delivery.",
        ],
        bullets: [
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
      },
      {
        heading: "Best Practices for Executive Job Search",
        paragraphs: [
          "Executive opportunities often move through networks and retained search. A premium executive CV helps you control narrative quality when introduced to decision makers.",
          "Use this CV with a targeted leadership bio and curated LinkedIn profile to maintain credibility across all first-touch channels.",
        ],
        bullets: [
          "Focus on strategic role families, not broad role lists",
          "Update board-level achievements quarterly",
          "Align CV, LinkedIn, and executive bio language",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should choose the Executive Package?",
        answer:
          "Senior professionals, managers, executives, department heads, consultants, and leadership-level candidates should choose this package.",
      },
      {
        question: "What type of leadership value does this package highlight?",
        answer:
          "It highlights leadership experience, business impact, strategic decision-making, team management, operational achievements, and senior-level career value.",
      },
      {
        question: "What is the price and delivery time?",
        answer:
          "The Executive Package is LKR 15,000 and the delivery time is 3-7 Days.",
      },
    ],
  },
  {
    packageSlug: "cover-letter-student-founder-led",
    title: "Student Package - Cover Letter Writing Services: Internship and First Job Letter Guide",
    excerpt:
      "A complete guide to the Student Package for school leavers, interns, university students, fresh graduates, and entry-level job seekers who need a simple professional cover letter.",
    content:
      "The Student Package - Cover Letter Writing Services is designed for candidates who need a simple, professional introduction for internships, trainee roles, graduate programs, part-time jobs, and first job opportunities. It helps students and freshers explain motivation, strengths, education, and career interest clearly.",
    category: "Student Cover Letter Writing",
    publishedAt: "2026-02-14",
    keywords: [
      "student package cover letter writing services",
      "student cover letter sri lanka",
      "internship cover letter",
      "cover letter writing for students",
      "entry level application letter",
      "chanuka cover letter service",
    ],
    sections: [
      {
        heading: "Who This Student Package Is Built For",
        paragraphs: [
          "This package is specially designed for school leavers, interns, university students, fresh graduates, and entry-level job seekers who need a simple, professional cover letter.",
          "It is useful when applying for internships, trainee roles, graduate programs, part-time jobs, and first job opportunities where motivation, fit, and presentation quality matter.",
        ],
        bullets: [
          "School leavers and university students",
          "Interns and trainee-role applicants",
          "Fresh graduates and entry-level job seekers",
          "Candidates who need a clear editable Word letter",
        ],
      },
      {
        heading: "Package Includes",
        paragraphs: [
          "The package focuses on a simple, professional structure that connects your education, strengths, motivation, and career interest to the target opportunity.",
          "Price: LKR 3,000. Delivery Time: 2-5 Days. The package includes one revision and is delivered as an editable Word file.",
        ],
        bullets: [
          "Simple, Professional Cover Letter",
          "Student / Internship Role Alignment",
          "Focus on Skills, Strengths & Motivation",
          "Education & Career Interest Positioning",
          "Delivered as Editable Word File",
          "1 Revision Included",
        ],
      },
      {
        heading: "How This Improves Applications",
        paragraphs: [
          "A strong student cover letter shows genuine interest without sounding generic. It gives employers a quick reason to understand why you are applying and how your skills or education connect to the role.",
          "When paired with a strong student CV, the letter improves your application quality and helps recruiters see a more complete picture of your readiness.",
        ],
        bullets: [
          "Introduce yourself professionally",
          "Show genuine interest in the role",
          "Connect education and strengths to the opportunity",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should choose the Student Package - Cover Letter Writing Services?",
        answer:
          "School leavers, interns, university students, fresh graduates, and entry-level job seekers should choose this package.",
      },
      {
        question: "What is the price and delivery time?",
        answer:
          "The Student Package is LKR 3,000 and the delivery time is 2-5 Days.",
      },
      {
        question: "Can I edit the cover letter later?",
        answer:
          "Yes. It is delivered as an editable Word file, so you can adjust it for different internships, jobs, or companies.",
      },
    ],
  },
  {
    packageSlug: "cover-letter-professional-founder-led",
    title: "Professional Package - Cover Letter Writing Services: Tailored Letters for Better Applications",
    excerpt:
      "A practical guide to the Professional Package for experienced job seekers, career changers, and skilled professionals who need a tailored cover letter.",
    content:
      "The Professional Package - Cover Letter Writing Services is designed for mid-level professionals, experienced job seekers, career changers, and skilled professionals who need a fully tailored cover letter. It helps connect experience, skills, achievements, and career value to the target role.",
    category: "Professional Cover Letter Writing",
    publishedAt: "2026-02-16",
    keywords: [
      "professional cover letter package",
      "mid level cover letter",
      "achievement based cover letter",
      "career transition cover letter",
      "ats friendly cover letter",
    ],
    sections: [
      {
        heading: "What Makes Professional Cover Letters Effective",
        paragraphs: [
          "Effective professional letters connect achievements to business priorities. Recruiters should see how your experience solves current role challenges.",
          "The strongest letters balance confidence with relevance. They focus on outcomes and role fit rather than personal history.",
        ],
        bullets: [
          "Open with role-fit positioning",
          "Highlight 2-3 role-relevant achievements",
          "End with a clear, confident call for next steps",
        ],
      },
      {
        heading: "Package Includes",
        paragraphs: [
          "The Professional Package uses achievement-focused content, industry-specific wording, and ATS-friendly writing structure to support competitive job applications.",
          "Price: LKR 4,000. Delivery Time: 2-5 Days. The package includes 2 revisions and is delivered as an editable Word file.",
        ],
        bullets: [
          "Fully Tailored Professional Cover Letter",
          "Achievement-Focused Content",
          "Industry-Specific Tone & Wording",
          "ATS-Friendly Writing Structure",
          "Skills, Experience & Career Value Highlighting",
          "Delivered as Editable Word File",
          "2 Revisions Included",
        ],
      },
      {
        heading: "How to Pair Your Cover Letter with a Strong CV",
        paragraphs: [
          "Use the cover letter to prioritize your top 2-3 achievements while the CV gives full context. This creates a strong first impression and deeper validation.",
          "Consistency between both documents increases trust and makes your profile easier to evaluate quickly.",
        ],
        bullets: [
          "Keep metrics consistent across CV and letter",
          "Match keywords with the job description",
          "Use concise language for faster recruiter scanning",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should choose the Professional Package - Cover Letter Writing Services?",
        answer:
          "Mid-level professionals, experienced job seekers, career changers, and skilled professionals should choose this package.",
      },
      {
        question: "What is the price and delivery time?",
        answer:
          "The Professional Package is LKR 4,000 and the delivery time is 2-5 Days.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "The package includes 2 revisions.",
      },
    ],
  },
  {
    packageSlug: "cover-letter-executive-founder-led",
    title: "Executive Package - Cover Letter Writing Services: Senior-Level Application Positioning",
    excerpt:
      "A leadership-focused guide to the Executive Package for managers, senior professionals, executives, consultants, and leadership-level candidates.",
    content:
      "The Executive Package - Cover Letter Writing Services is designed for managers, senior professionals, executives, department heads, consultants, and leadership-level candidates who need a powerful customized cover letter for senior-level job applications.",
    category: "Executive Cover Letter Writing",
    publishedAt: "2026-02-17",
    keywords: [
      "executive cover letter",
      "leadership application letter",
      "director cover letter",
      "c level cover letter strategy",
      "executive hiring documents",
    ],
    sections: [
      {
        heading: "Why Executive Cover Letters Matter",
        paragraphs: [
          "Senior recruiters evaluate not only what you achieved but how you think. A strong executive letter communicates judgment, strategic focus, and leadership consistency.",
          "It also gives context to major outcomes that may appear as short bullets in your CV, helping decision makers see the full scope of value.",
        ],
        bullets: [
          "Clarify leadership narrative in one page",
          "Connect outcomes to strategic direction",
          "Reinforce executive credibility across channels",
        ],
      },
      {
        heading: "Package Includes",
        paragraphs: [
          "The Executive Package focuses on leadership value, strategic contribution, business impact, and suitability for senior-level opportunities.",
          "Price: LKR 5,000. Delivery Time: 2-5 Days. The package includes unlimited revisions within 24 hours of delivery and is delivered as an editable Word file.",
        ],
        bullets: [
          "Leadership-Focused High-Impact Writing",
          "Strategic Value Proposition",
          "Company & Job Description Customization",
          "Executive-Level Tone & Career Positioning",
          "Achievement, Leadership & Business Impact Highlighting",
          "Delivered as Editable Word File",
          "Unlimited Revisions within 24 Hours of Delivery",
        ],
      },
      {
        heading: "Best Use Cases",
        paragraphs: [
          "Use this letter for executive search submissions, board-level opportunities, and direct outreach to founders, CEOs, or hiring committees.",
          "When paired with an executive CV and optimized LinkedIn profile, it creates a unified leadership brand.",
        ],
        bullets: [
          "Executive transitions and confidential searches",
          "Director and VP level applications",
          "Strategic leadership and transformation roles",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should choose the Executive Package - Cover Letter Writing Services?",
        answer:
          "Managers, senior professionals, executives, department heads, consultants, and leadership-level candidates should choose this package.",
      },
      {
        question: "What is the price and delivery time?",
        answer:
          "The Executive Package is LKR 5,000 and the delivery time is 2-5 Days.",
      },
      {
        question: "What revision support is included?",
        answer:
          "The package includes unlimited revisions within 24 hours of delivery.",
      },
    ],
  },
  {
    packageSlug: "linkedin-student-founder-led",
    title: "Student Package - LinkedIn Optimisation Package: Build a Professional Student Profile",
    excerpt:
      "A complete guide to the Student LinkedIn Optimisation Package for students, undergraduates, interns, fresh graduates, and entry-level job seekers.",
    content:
      "The Student Package - LinkedIn Optimisation Package is designed for students, undergraduates, interns, fresh graduates, and entry-level job seekers who want to build a professional LinkedIn profile for internships, trainee roles, graduate programs, and first job opportunities.",
    category: "Student LinkedIn Optimisation",
    publishedAt: "2026-02-18",
    keywords: [
      "student linkedin package",
      "linkedin optimization for students",
      "internship linkedin profile",
      "linkedin headline student",
      "career branding students",
    ],
    sections: [
      {
        heading: "Who This Student Package Is Built For",
        paragraphs: [
          "Recruiters search LinkedIn by skills, role keywords, education, location, and interests. Students who optimize early can create a stronger digital first impression before they have long work experience.",
          "This package helps present education, skills, projects, internships, achievements, and career interests professionally on LinkedIn.",
        ],
        bullets: [
          "Students and undergraduates",
          "Interns and fresh graduates",
          "Entry-level job seekers",
          "Candidates preparing for internships and graduate programs",
        ],
      },
      {
        heading: "Package Includes",
        paragraphs: [
          "The Student Package improves profile clarity through practical review, headline suggestions, About section guidance, skill keywords, and profile visibility tips.",
          "Price: LKR 5,000. Delivery Time: 3-7 Days. The package gives a personalized improvement direction for a stronger student LinkedIn presence.",
        ],
        bullets: [
          "LinkedIn Profile Review",
          "Personalized Profile Improvement List",
          "Professional Headline Suggestions",
          "\"About\" Section Improvement Points",
          "Skills & Keyword Recommendations",
          "Education, Projects & Internship Positioning Tips",
          "Basic Layout & Profile Visibility Tips",
        ],
      },
      {
        heading: "How to Keep Growing After Optimization",
        paragraphs: [
          "Post one short project or learning update weekly to build profile activity and credibility. Recruiters value active learners.",
          "Connect with alumni, recruiters, and industry professionals in your target field to expand visibility and referral potential.",
        ],
        bullets: [
          "Post weekly value updates",
          "Add certifications and project outcomes regularly",
          "Engage with industry content for visibility",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should choose the Student Package - LinkedIn Optimisation Package?",
        answer:
          "Students, undergraduates, interns, fresh graduates, and entry-level job seekers should choose this package.",
      },
      {
        question: "What is the price and delivery time?",
        answer:
          "The Student Package is LKR 5,000 and the delivery time is 3-7 Days.",
      },
      {
        question: "What if I have limited experience?",
        answer:
          "The package helps position education, projects, internships, skills, achievements, and career interests professionally.",
      },
    ],
  },
  {
    packageSlug: "linkedin-professional-founder-led",
    title: "Professional Package - LinkedIn Optimisation Package: Improve Recruiter Visibility",
    excerpt:
      "A guide to the Professional LinkedIn Optimisation Package for mid-level professionals, experienced job seekers, career changers, and skilled professionals.",
    content:
      "The Professional Package - LinkedIn Optimisation Package is designed for professionals who want to strengthen LinkedIn presence, improve recruiter visibility, and present career value more professionally.",
    category: "Professional LinkedIn Optimisation",
    publishedAt: "2026-02-20",
    keywords: [
      "professional linkedin package",
      "linkedin optimization for professionals",
      "mid level linkedin strategy",
      "linkedin profile seo",
      "career growth linkedin",
    ],
    sections: [
      {
        heading: "Why Mid-Level Profiles Underperform",
        paragraphs: [
          "Many professionals list duties but fail to show outcomes and strategic contributions. This weakens both recruiter trust and profile engagement.",
          "Another issue is inconsistent branding across headline, About section, and experience. Mixed messaging reduces profile conversion.",
        ],
        bullets: [
          "Outcome-light experience descriptions",
          "Inconsistent personal branding",
          "Poor keyword targeting for priority roles",
        ],
      },
      {
        heading: "Package Includes",
        paragraphs: [
          "The Professional Package provides a deep profile audit, headline improvement, About guidance, experience section recommendations, keyword strategy, and personal branding direction.",
          "Price: LKR 10,000. Delivery Time: 3-7 Days. It is ideal for professionals who want to showcase achievements, skills, and career direction while improving recruiter discovery.",
        ],
        bullets: [
          "Deep LinkedIn Profile Audit",
          "Professional Headline Improvement",
          "About Section Rewrite / Improvement Guidance",
          "Experience Section Improvement Recommendations",
          "Industry-Relevant Keyword Strategy",
          "Featured Section Suggestions",
          "Layout, Content & Personal Branding Recommendations",
          "Recruiter Visibility Improvement Guidance",
        ],
      },
      {
        heading: "How to Convert Visibility into Real Opportunities",
        paragraphs: [
          "After optimization, use intentional networking and thought leadership posts to attract decision makers, recruiters, and referral partners.",
          "A profile that ranks in search and communicates impact clearly will convert faster when combined with targeted outreach.",
        ],
        bullets: [
          "Publish one expertise-driven post weekly",
          "Use outbound messages with clear value proposition",
          "Align LinkedIn profile with your upgraded CV",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should choose the Professional Package - LinkedIn Optimisation Package?",
        answer:
          "Mid-level professionals, experienced job seekers, career changers, and skilled professionals should choose this package.",
      },
      {
        question: "What is the price and delivery time?",
        answer:
          "The Professional Package is LKR 10,000 and the delivery time is 3-7 Days.",
      },
      {
        question: "Does this help recruiter visibility?",
        answer:
          "Yes. The package includes industry-relevant keyword strategy and recruiter visibility improvement guidance.",
      },
    ],
  },
  {
    packageSlug: "linkedin-executive-founder-led",
    title: "Executive Package - LinkedIn Optimisation Package: Strengthen Executive Presence",
    excerpt:
      "A high-level guide to the Executive LinkedIn Optimisation Package for senior professionals, managers, executives, consultants, department heads, and business leaders.",
    content:
      "The Executive Package - LinkedIn Optimisation Package is designed for leadership-level candidates who want to strengthen executive presence, improve industry visibility, and position themselves for senior-level career opportunities.",
    category: "Executive LinkedIn Optimisation",
    publishedAt: "2026-02-21",
    keywords: [
      "executive linkedin package",
      "leadership personal branding",
      "c level linkedin optimization",
      "executive linkedin strategy",
      "board level profile",
    ],
    sections: [
      {
        heading: "What Executive Audiences Look for on LinkedIn",
        paragraphs: [
          "Executive recruiters, investors, and senior stakeholders evaluate strategic clarity, leadership maturity, and consistency of public communication.",
          "A weak executive profile can reduce trust even when your offline track record is strong.",
        ],
        bullets: [
          "Clear leadership value proposition",
          "Credible strategic narrative",
          "Consistent public-facing professional tone",
        ],
      },
      {
        heading: "Package Includes",
        paragraphs: [
          "The Executive Package strengthens leadership brand through executive profile audit, personal branding strategy, high-impact keyword direction, and authority-building recommendations.",
          "Price: LKR 15,000. Delivery Time: 3-7 Days. It is ideal for leaders who want to present experience, achievements, strategic value, industry credibility, and leadership brand clearly.",
        ],
        bullets: [
          "Executive-Level LinkedIn Profile Audit",
          "Personal Branding Strategy",
          "Leadership-Focused Headline & About Suggestions",
          "High-Impact Keyword Strategy",
          "Executive Profile Positioning Recommendations",
          "Guidance to Improve Authority & Industry Visibility",
          "Leadership Experience Presentation Tips",
          "Featured Section & Thought Leadership Suggestions",
        ],
      },
      {
        heading: "Executive Profile Maintenance Framework",
        paragraphs: [
          "Refresh your profile quarterly with strategic achievements, transformation outcomes, and leadership insights to stay current.",
          "Selective thought leadership content can strengthen authority without exposing sensitive company details.",
        ],
        bullets: [
          "Quarterly profile updates",
          "Selective thought leadership publishing",
          "Align profile narrative with executive goals",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should choose the Executive Package - LinkedIn Optimisation Package?",
        answer:
          "Senior professionals, managers, executives, consultants, department heads, business leaders, and leadership-level candidates should choose this package.",
      },
      {
        question: "What is the price and delivery time?",
        answer:
          "The Executive Package is LKR 15,000 and the delivery time is 3-7 Days.",
      },
      {
        question: "What leadership value does this package improve?",
        answer:
          "It improves executive presence, industry visibility, strategic value presentation, credibility, and leadership brand clarity.",
      },
    ],
  },
  {
    packageSlug: "ats-cv-student-supervised",
    title: "Student CV Review Package: Expert Feedback Before You Apply",
    excerpt:
      "A student-focused CV review guide that explains how feedback-driven improvements can boost internship and trainee application quality quickly.",
    content:
      "If you already have a CV draft, a focused review can save weeks of trial-and-error. The Student CV Review Package identifies structure, language, and ATS issues so you can fix them before applying.",
    category: "Student CV Review Guide",
    publishedAt: "2026-02-22",
    keywords: [
      "student cv review",
      "cv feedback for students",
      "internship cv correction",
      "ats cv review sri lanka",
      "first cv audit",
    ],
    sections: [
      {
        heading: "Why CV Review is Better Than Guesswork",
        paragraphs: [
          "Students often edit CVs based on random templates and conflicting online advice. A professional review gives clear, prioritized fixes.",
          "Instead of rewriting everything, you can improve the highest-impact sections first and apply with better confidence.",
        ],
        bullets: [
          "Detect major ATS and formatting issues early",
          "Improve clarity in summary and experience sections",
          "Prioritize corrections that improve recruiter readability",
        ],
      },
      {
        heading: "What This Review Package Covers",
        paragraphs: [
          "You receive detailed guidance on structure, language, keyword relevance, and design consistency. The objective is to help you self-edit with confidence.",
          "This is ideal if you want affordable expert direction while keeping control of final editing.",
        ],
        bullets: [
          "Full CV review with improvement checklist",
          "ATS keyword and formatting guidance",
          "Grammar, structure, and layout recommendations",
        ],
      },
      {
        heading: "How to Apply Review Feedback Correctly",
        paragraphs: [
          "Implement fixes in sequence: structure first, then content quality, then keyword relevance. This prevents inconsistent edits.",
          "After updates, test your revised CV against 2-3 target job descriptions before sending applications.",
        ],
        bullets: [
          "Fix high-impact sections first",
          "Match revised bullets with role keywords",
          "Re-check consistency before applying",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you rewrite my CV in this package?",
        answer:
          "This package focuses on expert feedback. You receive clear instructions, and you perform the edits yourself.",
      },
      {
        question: "Is this useful for internship applicants?",
        answer:
          "Yes. It is highly useful for internship and trainee applicants who need fast quality improvements before applying.",
      },
      {
        question: "Can I upgrade later to full CV writing?",
        answer:
          "Yes. Many students begin with review and later move to writing packages when they need a full rewrite.",
      },
    ],
  },
  {
    packageSlug: "ats-cv-fresh-graduate-supervised",
    title: "Starter CV Review Package: Fix Entry-Level CV Mistakes Before Recruiters See Them",
    excerpt:
      "A practical CV review roadmap for freshers and early-career job seekers to improve ATS alignment, clarity, and interview readiness.",
    content:
      "When fresher CVs underperform, small structural mistakes often cause big losses in visibility. The Starter CV Review Package gives direct, prioritized feedback so you can fix weak sections and submit stronger applications immediately.",
    category: "Starter CV Review Guide",
    publishedAt: "2026-02-23",
    keywords: [
      "starter cv review",
      "fresher cv feedback",
      "entry level ats cv review",
      "cv optimization for graduates",
      "career cv audit",
    ],
    sections: [
      {
        heading: "High-Impact CV Errors in Early-Career Profiles",
        paragraphs: [
          "Freshers frequently use weak summaries, overloaded personal details, and non-relevant bullet points. These issues reduce recruiter confidence fast.",
          "A review helps identify what to remove, what to rewrite, and what to emphasize for your target role family.",
        ],
        bullets: [
          "Weak summary and role targeting",
          "Low-value or repetitive bullet points",
          "Missing ATS-friendly keyword placement",
        ],
      },
      {
        heading: "How the Starter CV Review Package Helps",
        paragraphs: [
          "You receive section-by-section feedback with practical edit direction. This makes revisions faster and more focused than trial-and-error editing.",
          "The review also improves your confidence in future self-edits as your experience grows.",
        ],
        bullets: [
          "Detailed section review",
          "Keyword alignment guidance",
          "Design and layout improvement advice",
        ],
      },
      {
        heading: "From Review to Better Applications",
        paragraphs: [
          "After implementing feedback, use your revised CV for a focused application cycle and track response changes.",
          "If response rates improve, keep refining role-specific sections rather than rebuilding the full CV again.",
        ],
        bullets: [
          "Track response rate before and after review",
          "Create role-specific CV variations",
          "Sync updates with LinkedIn for consistency",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should choose the Starter CV Review Package?",
        answer:
          "It is best for freshers and early-career professionals who already have a draft CV but need expert improvement guidance.",
      },
      {
        question: "Will this improve ATS compatibility?",
        answer:
          "Yes. The review includes ATS keyword and formatting recommendations to improve screening performance.",
      },
      {
        question: "Can I still use my original design?",
        answer:
          "Yes, but if readability is weak, the review will recommend layout changes that improve recruiter scanning speed.",
      },
    ],
  },
  {
    packageSlug: "ats-cv-professional-supervised",
    title: "Professional CV Review Package: Audit Your CV Before High-Stakes Applications",
    excerpt:
      "A mid-level CV audit guide showing how expert review can strengthen positioning, outcomes language, and ATS performance before applying to competitive roles.",
    content:
      "If you are applying for better-paying roles, your CV needs strategic quality control. The Professional CV Review Package provides deep analysis of your current CV and a clear upgrade path focused on interview conversion.",
    category: "Professional CV Review Guide",
    publishedAt: "2026-02-24",
    keywords: [
      "professional cv review",
      "mid level cv audit",
      "ats resume review",
      "career advancement cv",
      "job application cv feedback",
    ],
    sections: [
      {
        heading: "Why Mid-Level CV Reviews Matter",
        paragraphs: [
          "At this level, small quality gaps can cost major opportunities. Recruiters compare candidates quickly, and weak impact writing can remove you early.",
          "A professional review helps identify strategic content gaps that are hard to notice when editing your own CV.",
        ],
        bullets: [
          "Improve achievement articulation",
          "Strengthen role-target clarity",
          "Reduce ambiguity in career narrative",
        ],
      },
      {
        heading: "What This Package Evaluates",
        paragraphs: [
          "The review covers ATS compatibility, outcome language quality, layout effectiveness, and role-specific relevance.",
          "You receive direct recommendations you can execute immediately to improve positioning quality.",
        ],
        bullets: [
          "Deep CV analysis with practical edit roadmap",
          "Keyword strategy suggestions",
          "Achievement and layout enhancement advice",
        ],
      },
      {
        heading: "When to Choose Review vs Full Rewrite",
        paragraphs: [
          "Choose review if your CV already has a solid base and needs strategic upgrades. Choose full rewrite if your narrative is outdated or unfocused.",
          "Many professionals start with review and then upgrade only if required.",
        ],
        bullets: [
          "Review for strong base CVs",
          "Rewrite for major positioning changes",
          "Use review insights to guide next package decision",
        ],
      },
    ],
    faqs: [
      {
        question: "Will this package improve my interview conversion?",
        answer:
          "It is designed to improve conversion by sharpening outcomes language, role relevance, and ATS alignment.",
      },
      {
        question: "Is this suitable for managers and specialists?",
        answer:
          "Yes. It is ideal for mid-level managers, specialists, and experienced professionals applying to competitive roles.",
      },
      {
        question: "Can review feedback be used for LinkedIn updates too?",
        answer:
          "Yes. Much of the positioning guidance can be applied to LinkedIn for stronger profile consistency.",
      },
    ],
  },
  {
    packageSlug: "ats-cv-executive-supervised",
    title: "Executive CV Review Package: Senior-Level CV Audit for Leadership Opportunities",
    excerpt:
      "An executive CV review framework for directors and senior leaders who need stronger strategic positioning, leadership narrative, and premium presentation.",
    content:
      "Senior candidates cannot rely on generic CV reviews. Executive hiring requires precision in strategic narrative and leadership evidence. This package provides that level of review with clear, high-impact improvement guidance.",
    category: "Executive CV Review Guide",
    publishedAt: "2026-02-25",
    keywords: [
      "executive cv review",
      "leadership resume audit",
      "director cv optimization",
      "c level cv feedback",
      "senior career branding",
    ],
    sections: [
      {
        heading: "What Executive CVs Must Demonstrate",
        paragraphs: [
          "Executive CVs must prove strategic outcomes, governance discipline, and leadership scale. Hiring stakeholders need confidence in decision quality and execution capability.",
          "A review identifies where your profile undersells value or lacks clarity in major transformation achievements.",
        ],
        bullets: [
          "Strategic impact visibility",
          "Leadership scope and influence clarity",
          "Board-facing communication quality",
        ],
      },
      {
        heading: "What This Executive Review Delivers",
        paragraphs: [
          "You receive senior-level feedback on positioning, structure, keyword direction, and leadership storytelling quality.",
          "The review helps you elevate narrative precision before applying to confidential or high-stakes leadership roles.",
        ],
        bullets: [
          "Executive-level analysis and recommendations",
          "Leadership-oriented narrative improvements",
          "Strategic keyword and structure guidance",
        ],
      },
      {
        heading: "How to Act on Review Feedback",
        paragraphs: [
          "Prioritize first-page narrative, then reinforce strategic achievements with hard outcomes. Finalize with a consistent executive tone across all sections.",
          "Use the revised profile across CV, LinkedIn, and executive bio channels for unified leadership branding.",
        ],
        bullets: [
          "Fix top narrative issues first",
          "Quantify strategic outcomes clearly",
          "Maintain consistent executive brand language",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should choose this executive review package?",
        answer:
          "Senior managers, directors, and C-level candidates who need strategic profile refinement before important applications.",
      },
      {
        question: "Is this review enough for executive search submissions?",
        answer:
          "It is a strong quality-control step and significantly improves narrative clarity for executive search and direct opportunities.",
      },
      {
        question: "Can this review help with board-level opportunities?",
        answer:
          "Yes. It strengthens leadership positioning and communication quality relevant to board-facing evaluations.",
      },
    ],
  },
];

const packageFocusedPosts: BlogPost[] = packageGuideDrafts.map((draft) => {
  const pkg = getPackageOrThrow(draft.packageSlug);
  return {
    slug: `package-guide-${pkg.slug}`,
    title: draft.title,
    excerpt: draft.excerpt,
    content: draft.content,
    category: draft.category,
    publishedAt: draft.publishedAt,
    author: "Chanuka Jeewantha",
    packageSlug: pkg.slug,
    keywords: draft.keywords,
    sections: draft.sections,
    internalLinks: draft.internalLinks ?? buildDefaultInternalLinks(pkg),
    ctaButtons: draft.ctaButtons ?? buildDefaultCtas(pkg),
    faqs: draft.faqs,
  };
});

const editorialPosts: BlogPost[] = [
  {
    slug: "professional-ats-cv-writing-service-sri-lanka-why-your-cv-matters",
    title: "Professional ATS CV Writing Service in Sri Lanka: Why Your CV Matters More Than You Think",
    excerpt:
      "Learn why ATS-friendly CV writing matters in Sri Lanka, the most common CV mistakes, and how fresh graduates, professionals, and executives can improve interview chances.",
    content:
      "In Sri Lanka's competitive job market, your CV is often the first and only chance to make a strong impression. A professional ATS-friendly CV helps recruiters and hiring systems quickly understand your value.",
    category: "ATS CV Writing",
    publishedAt: "2026-04-25",
    author: "Chanuka Jeewantha",
    keywords: [
      "professional ats cv writing service sri lanka",
      "ats friendly cv sri lanka",
      "cv writing service sri lanka",
      "linkedin profile optimization sri lanka",
      "cover letter writing service",
      "foreign job cv sri lanka",
    ],
    sections: [
      {
        heading: "What Is an ATS-Friendly CV and Why It Matters",
        paragraphs: [
          "ATS means Applicant Tracking System. Many employers use ATS software to filter applications before a recruiter reads them manually.",
          "If your CV lacks relevant keywords, proper structure, and clear role alignment, it can underperform in early screening even when you are qualified.",
        ],
        bullets: [
          "Role-targeted professional summary",
          "Keyword-rich experience aligned with job descriptions",
          "Achievement-focused bullet points",
          "Clean ATS-safe formatting with clear headings",
          "Relevant education and certification details",
        ],
      },
      {
        heading: "Why Many Job Seekers Do Not Get Interview Calls",
        paragraphs: [
          "A common issue in Sri Lanka is applying to many roles with low response. In many cases, the problem is not qualifications, but CV presentation and positioning.",
          "Generic, outdated, or weakly written CVs reduce recruiter trust and fail to communicate measurable value quickly.",
        ],
        bullets: [
          "Using one generic CV for every role",
          "Listing duties instead of achievements",
          "Missing role keywords from job ads",
          "ATS-unfriendly design and formatting",
          "Weak summary, grammar, and sentence clarity",
          "Not matching CV content to target roles",
        ],
      },
      {
        heading: "Professional CV Writing for Fresh Graduates",
        paragraphs: [
          "Fresh graduates may have limited experience, but a strong CV can still show readiness through projects, internships, academic work, and transferable skills.",
          "The goal is to present potential and professionalism clearly, not to exaggerate experience.",
        ],
        bullets: [
          "Academic achievements and final-year projects",
          "Internships, volunteering, and leadership roles",
          "Certifications and technical skills",
          "Career objective aligned with the target role",
        ],
      },
      {
        heading: "CV Strategy for Experienced Professionals and Executives",
        paragraphs: [
          "Experienced professionals need more than a list of responsibilities. Recruiters look for growth, impact, leadership signals, and measurable outcomes.",
          "Executive CVs require a higher-level narrative focused on strategy, transformation, stakeholder leadership, and business results.",
        ],
        bullets: [
          "Strong career summary with clear direction",
          "Industry-specific keyword alignment",
          "Leadership and project impact",
          "Revenue, cost, efficiency, or operational outcomes",
          "Strategic communication for senior roles",
        ],
      },
      {
        heading: "Cover Letters, LinkedIn, and Foreign Job Applications",
        paragraphs: [
          "A strong application strategy includes more than a CV. A role-specific cover letter and optimized LinkedIn profile improve credibility and consistency.",
          "For foreign applications (UAE, Qatar, Saudi Arabia, Australia, Canada, UK, and Europe), CV standards vary by country and role, so localization matters.",
        ],
        bullets: [
          "Cover letters should add value, not repeat the CV",
          "LinkedIn profile should support the same career story",
          "Foreign market CVs often require different detail levels",
          "Country-specific formatting and content expectations matter",
        ],
      },
      {
        heading: "Final Thoughts: Invest in Better Positioning",
        paragraphs: [
          "A professional ATS-friendly CV does not guarantee a job, but it significantly improves your application quality, recruiter readability, and first impression.",
          "For job seekers in Sri Lanka and overseas, better CV writing, cover letter support, and LinkedIn optimization can create a stronger and more complete application package.",
        ],
      },
    ],
    internalLinks: [
      { label: "Professional CV Writing Service", href: "/services/packages/cv-writing" },
      { label: "CV Review Service", href: "/services/packages/cv-review" },
      { label: "Cover Letter Writing Service", href: "/services/packages/cover-letter-writing" },
      { label: "LinkedIn Optimization Service", href: "/services/packages/linkedin-optimization" },
      { label: "Browse All Blog Articles", href: "/blog" },
    ],
    ctaButtons: [
      { label: "Request CV Review", href: "/services/packages/cv-review" },
      { label: "View CV Writing Packages", href: "/pricing" },
      { label: "Contact for Guidance", href: "/contact" },
    ],
    faqs: [
      {
        question: "Can an ATS-friendly CV guarantee interview calls?",
        answer:
          "No CV can guarantee interviews, but ATS-friendly structure and role-aligned writing can improve screening performance and recruiter readability.",
      },
      {
        question: "Is professional CV writing useful for fresh graduates in Sri Lanka?",
        answer:
          "Yes. Fresh graduates can present projects, internships, and transferable skills more effectively with a structured and role-targeted CV.",
      },
      {
        question: "Do I need a different CV for foreign job applications?",
        answer:
          "Usually yes. Different countries and industries follow different resume conventions, so localization improves relevance and professionalism.",
      },
      {
        question: "Should I optimize LinkedIn along with my CV?",
        answer:
          "Yes. Recruiters often check LinkedIn before shortlisting, so profile consistency with your CV improves trust and visibility.",
      },
    ],
  },
  {
    slug: "about-chanuka-jeewantha",
    title: "About Chanuka Jeewantha: Career Development Specialist",
    excerpt:
      "A full introduction to Chanuka Jeewantha's ATS-friendly CV method, LinkedIn growth strategy, and end-to-end career development services.",
    content:
      "My name is Chanuka Jeewantha, and I help job seekers and professionals build clear, competitive career brands through ATS-friendly CVs, cover letters, LinkedIn optimization, portfolio strategy, and coaching.",
    category: "About Chanuka Jeewantha",
    publishedAt: "2026-02-08",
    author: "Chanuka Jeewantha",
  },
  {
    slug: "why-qualified-candidates-dont-get-interviews",
    title: "Why qualified candidates still get ignored in hiring",
    excerpt:
      "Understand how ATS filtering, recruiter scan behavior, and weak positioning can block qualified candidates.",
    content:
      "Today, being qualified is not enough. Your CV and LinkedIn profile must communicate value in seconds, with role-aligned keywords, clear outcomes, and proof.",
    category: "Career Strategy",
    publishedAt: "2025-10-24",
    author: "Chanuka Jeewantha",
  },
  {
    slug: "ats-friendly-cv-writing-method",
    title: "My 100% ATS-friendly CV writing method",
    excerpt:
      "How I build CVs that pass ATS systems and quickly convince recruiters through achievement-based writing.",
    content:
      "A high-performing CV combines clean ATS structure, role-targeted keyword strategy, and measurable accomplishments. It is a marketing document designed to win interviews.",
    category: "ATS CV Writing",
    publishedAt: "2025-10-20",
    author: "Chanuka Jeewantha",
  },
  {
    slug: "linkedin-optimization-for-career-growth",
    title: "LinkedIn optimization for consistent career growth",
    excerpt:
      "Learn how profile SEO, headline positioning, and achievement-focused storytelling increase recruiter reach.",
    content:
      "LinkedIn works like a search engine. When your profile is optimized for relevant keywords and clear value communication, opportunities come to you more consistently.",
    category: "LinkedIn Optimization",
    publishedAt: "2025-10-18",
    author: "Chanuka Jeewantha",
  },
];

export const blogPosts: BlogPost[] = [...careerGrowthBlogPosts, ...packageFocusedPosts, ...editorialPosts, ...cvSeriesEn, ...cvSeriesSi].map(enrichBlogPostContent).sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
