import { packageProducts, type PackageProduct } from "@/lib/packages-catalog";
import { careerGrowthBlogPosts } from "./blog-career-library";
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
    packageSlug: "student-cv-package",
    title: "Student CV Package Sri Lanka: How to Build a First CV That Gets Internship Calls",
    excerpt:
      "A practical student CV guide for Sri Lanka covering internship-focused writing, ATS format, and exactly how to turn school or campus work into interview-ready proof.",
    content:
      "Most students are not rejected because they have no experience. They are rejected because their CV does not translate potential into recruiter-friendly evidence. This guide explains how the Student CV Package helps you create a first CV that reads clearly in ATS systems and still looks professional to hiring managers.",
    category: "Student CV Guide",
    publishedAt: "2026-02-10",
    keywords: [
      "student cv package sri lanka",
      "internship cv sri lanka",
      "first cv writing",
      "ats friendly student cv",
      "chanuka jeewantha cv service",
    ],
    sections: [
      {
        heading: "Why Student CVs Usually Fail",
        paragraphs: [
          "Student CVs often include generic objectives, long personal details, and weak bullet points like 'hardworking team player' without context. Recruiters scan quickly and need tangible indicators of responsibility, progress, and initiative.",
          "Even if you do not have full-time experience, you can still prove employability with project outcomes, volunteer work, club roles, coursework impact, and technical skill usage in real scenarios.",
        ],
        bullets: [
          "Replace generic objectives with role-targeted value statements",
          "Show evidence from projects, assignments, and internships",
          "Use ATS-safe structure with clean headings and formatting",
        ],
      },
      {
        heading: "What the Student CV Package Improves",
        paragraphs: [
          "The package turns scattered student information into a focused, role-aligned CV that is easier for employers to evaluate. It also improves keyword coverage for internship and entry-level job searches.",
          "You receive a format that can be updated quickly as you gain new projects or certifications, so your profile keeps improving without rebuilding from zero each time.",
        ],
        bullets: [
          "Professional CV writing and formatting for students",
          "Basic ATS optimization for internship applications",
          "Editable files so you can update with new achievements",
        ],
      },
      {
        heading: "After Delivery: 14-Day Application Plan",
        paragraphs: [
          "Use your upgraded CV with a shortlist of roles that match your specialization. Apply consistently and track which versions perform best by industry and role title.",
          "Pair your CV with a matching cover letter and beginner LinkedIn optimization to improve response quality across both local and international opportunities.",
        ],
        bullets: [
          "Apply to 5-10 relevant roles each week",
          "Track response rates by title and company type",
          "Update one bullet weekly with new proof or metrics",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I use this package if I have no job experience?",
        answer:
          "Yes. The package is specifically designed to convert coursework, projects, volunteer work, and internships into strong professional evidence for recruiters.",
      },
      {
        question: "Is this useful for internship and trainee applications?",
        answer:
          "Yes. The writing style and structure are aligned with internship and trainee hiring expectations, including ATS readability and fast recruiter scanning.",
      },
      {
        question: "Can I update the CV later by myself?",
        answer:
          "Yes. You receive editable formats, so you can add projects, certifications, and achievements as your profile grows.",
      },
    ],
  },
  {
    packageSlug: "starter-cv-package",
    title: "Starter CV Package for Fresh Graduates: Convert Education into Interview Results",
    excerpt:
      "Learn how fresh graduates can use the Starter CV Package to move from generic graduate CVs to ATS-aligned, role-targeted profiles that attract recruiter attention.",
    content:
      "Fresh graduate CVs usually fail because they describe responsibilities instead of outcomes. The Starter CV Package is built to bridge that gap by turning education, projects, internships, and early work exposure into value statements recruiters can trust.",
    category: "Starter CV Guide",
    publishedAt: "2026-02-11",
    keywords: [
      "starter cv package",
      "fresh graduate cv sri lanka",
      "entry level cv writing",
      "ats cv for freshers",
      "career cv service",
    ],
    sections: [
      {
        heading: "What Recruiters Look for in Fresh Graduate CVs",
        paragraphs: [
          "Recruiters do not expect senior experience. They expect clarity, discipline, and role fit. A strong graduate CV highlights learning speed, practical exposure, and relevant technical or communication skills.",
          "When your CV mirrors the wording of the target role and includes measurable evidence, your profile stands out even against candidates with similar academic backgrounds.",
        ],
        bullets: [
          "Role-matching keywords from real job descriptions",
          "Achievement-based bullets instead of task-only bullets",
          "Clean sections that improve ATS extraction accuracy",
        ],
      },
      {
        heading: "How This Package Positions You Better",
        paragraphs: [
          "The Starter CV Package is designed for early-career competition. It creates a sharp profile narrative: who you are, what you can do now, and why you are relevant to the role.",
          "This is especially useful when applying to many positions quickly because your CV remains structured, professional, and easy to customize for each role.",
        ],
        bullets: [
          "ATS optimization with graduate-role keyword coverage",
          "Professional formatting and readability upgrades",
          "Role-targeted presentation guidance",
        ],
      },
      {
        heading: "How to Improve Response Rate After Getting the CV",
        paragraphs: [
          "Use a shortlist of priority role titles and tailor your summary line for each batch of applications. Consistency beats random mass applying.",
          "Add one project proof line to LinkedIn and keep your CV + LinkedIn message aligned. That consistency improves trust with recruiters.",
        ],
        bullets: [
          "Apply in focused role batches, not mixed job titles",
          "Sync your LinkedIn headline with your CV positioning",
          "Refresh keyword alignment every 2-3 weeks",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this package only for graduates with work experience?",
        answer:
          "No. It is suitable for graduates with internships, projects, part-time roles, or even strong academic portfolios.",
      },
      {
        question: "Will this package help with ATS screening?",
        answer:
          "Yes. The package structure and writing are optimized to increase ATS compatibility while keeping strong human readability.",
      },
      {
        question: "Can I use the same CV for all jobs?",
        answer:
          "Use one strong base CV from this package, then make small role-specific keyword and summary edits for each target role.",
      },
    ],
  },
  {
    packageSlug: "professional-cv-package",
    title: "Professional CV Package: Strategic CV Writing for Mid-Level Career Growth",
    excerpt:
      "A complete guide for mid-level professionals who need a stronger CV narrative, ATS performance, and achievement-focused positioning to secure better opportunities.",
    content:
      "At mid-level, competition is not about who has worked longer. It is about who communicates impact faster. The Professional CV Package is built to help experienced candidates present measurable outcomes, leadership signals, and role-specific value clearly.",
    category: "Professional CV Guide",
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
          "Many mid-level CVs are full of responsibilities but short on outcomes. Recruiters need to see business impact: improvements, savings, growth, risk reduction, and delivery quality.",
          "Another common issue is weak role direction. A CV that tries to fit every possible role often performs worse than one built around a clear target path.",
        ],
        bullets: [
          "Unclear role targeting",
          "Low evidence of measurable outcomes",
          "Poor keyword alignment with senior job descriptions",
        ],
      },
      {
        heading: "What This Package Delivers for Experienced Candidates",
        paragraphs: [
          "The Professional CV Package reframes your experience around strategic outcomes and decision-making value, while preserving ATS-friendly structure and readability.",
          "It is ideal for promotions, role transitions, and international applications where stronger storytelling and evidence quality matter.",
        ],
        bullets: [
          "Premium CV writing and design",
          "ATS target range for stronger system visibility",
          "Achievement-first narrative structure",
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
        question: "Who should choose the Professional CV Package?",
        answer:
          "It is best for mid-level professionals and managers who want stronger interview conversion for better-paying or more strategic roles.",
      },
      {
        question: "Can I add a cover letter with this package?",
        answer:
          "Yes. You can add a separate cover letter package or choose a discount bundle that combines CV and cover letter services.",
      },
      {
        question: "Can this help with international job applications?",
        answer:
          "Yes. The structure and writing style are suitable for global recruiter expectations and ATS-based hiring processes.",
      },
    ],
  },
  {
    packageSlug: "executive-cv-package",
    title: "Executive CV Package: Leadership Positioning for Directors and C-Level Candidates",
    excerpt:
      "Understand how senior leaders can use the Executive CV Package to present strategic impact, governance value, and board-level credibility in a concise ATS-ready format.",
    content:
      "Executive hiring is outcome-driven and reputation-sensitive. The Executive CV Package is crafted to present leadership outcomes, transformation history, and commercial impact in a high-trust format that works for both executive search and direct applications.",
    category: "Executive CV Guide",
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
        heading: "How the Executive Package Strengthens Positioning",
        paragraphs: [
          "This package structures your experience around strategic impact rather than operational detail. It highlights leadership narrative, governance discipline, and value delivery.",
          "You can optionally pair this with a LinkedIn optimization package to keep your executive profile aligned with the same leadership story.",
        ],
        bullets: [
          "Tailored executive CV and resume writing",
          "High-impact ATS compliant structure",
          "LinkedIn optimization support for executive branding",
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
        question: "Is this package suitable for director and C-level roles?",
        answer:
          "Yes. It is specifically designed for senior leaders, directors, and executive-level candidates seeking strategic or board-facing roles.",
      },
      {
        question: "Does the package support leadership branding?",
        answer:
          "Yes. The writing emphasizes leadership value, strategic impact, and decision quality while also supporting LinkedIn consistency.",
      },
      {
        question: "Can I use this for confidential executive transitions?",
        answer:
          "Yes. The profile is designed to communicate authority clearly while allowing strategic discretion around sensitive initiatives.",
      },
    ],
  },
  {
    packageSlug: "student-cover-letter",
    title: "Student Cover Letter Guide: Write Internship Letters That Sound Professional",
    excerpt:
      "A step-by-step guide to using the Student Cover Letter package for internship and trainee applications with clear structure, motivation, and skill relevance.",
    content:
      "A good student cover letter does one thing clearly: it connects your potential to the employer's need. This guide explains how the Student Cover Letter package helps you avoid generic language and build focused, role-relevant application letters.",
    category: "Student Cover Letter Guide",
    publishedAt: "2026-02-14",
    keywords: [
      "student cover letter sri lanka",
      "internship cover letter",
      "cover letter writing for students",
      "entry level application letter",
      "chanuka cover letter service",
    ],
    sections: [
      {
        heading: "Why Student Cover Letters Get Ignored",
        paragraphs: [
          "Most letters repeat CV content without demonstrating why the role matters to the candidate and why the candidate is relevant to the role.",
          "Recruiters need concise motivation, role fit, and evidence of initiative. A short letter can still be powerful when it is clear and specific.",
        ],
        bullets: [
          "Avoid copy-paste templates",
          "Connect skills to job requirements directly",
          "Use a clear and respectful professional tone",
        ],
      },
      {
        heading: "What This Package Solves",
        paragraphs: [
          "The Student Cover Letter package creates a professional foundation for internship and trainee applications by improving structure, clarity, and relevance.",
          "It helps students communicate strengths and motivation confidently without sounding exaggerated or generic.",
        ],
        bullets: [
          "Simple professional letter aligned to student roles",
          "Skills and strengths highlighted with context",
          "Delivery in editable formats for future applications",
        ],
      },
      {
        heading: "How to Use One Letter Across Multiple Applications",
        paragraphs: [
          "Start with a strong base letter, then customize two parts for each application: role title and company-specific motivation. This keeps quality high and effort manageable.",
          "Keep your letter aligned with your CV summary so recruiters receive a consistent message across both documents.",
        ],
        bullets: [
          "Customize first and final paragraph per employer",
          "Keep body focused on 2-3 relevant strengths",
          "Use matching keywords from job advertisements",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this only for internships?",
        answer:
          "No. It can also be used for trainee and entry-level applications where students need a professional and concise letter.",
      },
      {
        question: "Can I edit and reuse the letter?",
        answer:
          "Yes. The letter is provided in editable format so you can tailor it for different roles and companies.",
      },
      {
        question: "Should I send a cover letter if not requested?",
        answer:
          "In competitive roles, a strong cover letter can still improve your chances by showing motivation and fit clearly.",
      },
    ],
  },
  {
    packageSlug: "starter-cover-letter",
    title: "Starter Cover Letter for Freshers: Improve Application Quality in 3 Steps",
    excerpt:
      "How freshers can use the Starter Cover Letter package to create role-specific applications that sound confident, relevant, and recruiter-friendly.",
    content:
      "Freshers often underestimate the value of a clear cover letter. When your experience is limited, your clarity becomes your advantage. This package helps you write letters that explain fit, motivation, and readiness without unnecessary filler.",
    category: "Starter Cover Letter Guide",
    publishedAt: "2026-02-15",
    keywords: [
      "starter cover letter",
      "fresher cover letter sri lanka",
      "entry level job application letter",
      "professional cover letter writing",
      "cover letter for graduates",
    ],
    sections: [
      {
        heading: "How Freshers Lose Attention in Cover Letters",
        paragraphs: [
          "Common fresher letters are either too emotional or too generic. Recruiters prefer concise communication that quickly proves relevance.",
          "A strong letter should show understanding of the role, transferable strengths, and a clear willingness to contribute from day one.",
        ],
        bullets: [
          "Avoid long life-story introductions",
          "Use direct role relevance language",
          "Connect your strengths to practical value",
        ],
      },
      {
        heading: "What You Receive in the Starter Cover Letter Package",
        paragraphs: [
          "This package gives you a professionally written letter with clear structure that aligns with your CV and target role profile.",
          "It is optimized for fast recruiter reading and easy customization when applying to multiple opportunities.",
        ],
        bullets: [
          "Professional letter structure and wording",
          "Alignment with your CV narrative",
          "Editable delivery for fast role-by-role customization",
        ],
      },
      {
        heading: "Weekly Routine to Improve Cover Letter Results",
        paragraphs: [
          "Use one strong base letter and update role title, skill emphasis, and final paragraph for each target company.",
          "Track positive replies and identify the strongest language patterns so you can improve your template over time.",
        ],
        bullets: [
          "Customize before every submission",
          "Track which wording improves response quality",
          "Keep tone concise, confident, and practical",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this package good for entry-level jobs?",
        answer:
          "Yes. It is designed for freshers and early-career applicants who need clearer and more professional application letters.",
      },
      {
        question: "Do I need a different cover letter for each role?",
        answer:
          "You should keep one strong core version and customize key lines for each role to maintain relevance.",
      },
      {
        question: "Can this be used for international applications?",
        answer:
          "Yes. The structure is professional and suitable for international recruiter expectations when combined with role-specific tailoring.",
      },
    ],
  },
  {
    packageSlug: "professional-cover-letter",
    title: "Professional Cover Letter Package: How Mid-Level Candidates Prove Value Quickly",
    excerpt:
      "A practical guide for professionals who need achievement-focused cover letters that support promotion, role changes, and competitive applications.",
    content:
      "At mid-level, your cover letter should not restate your CV. It should frame your value for the specific role and create urgency for interview consideration. This package is built to do exactly that with concise, strategic writing.",
    category: "Professional Cover Letter Guide",
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
        heading: "Why This Package Helps Promotion and Career Moves",
        paragraphs: [
          "The Professional Cover Letter package uses industry-aware language and measurable achievement framing, making your application stronger in competitive pools.",
          "It is especially useful when moving to a new company or industry, where narrative clarity is critical to reduce hiring risk.",
        ],
        bullets: [
          "Tailored writing with achievement focus",
          "Industry-specific tone and clarity",
          "Revision support for role-fit refinement",
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
        question: "Who should use this cover letter package?",
        answer:
          "It is ideal for mid-level professionals seeking promotions, better offers, or transitions into stronger roles.",
      },
      {
        question: "Can it be tailored for specific industries?",
        answer:
          "Yes. The tone and evidence can be adjusted to suit the language and expectations of your target industry.",
      },
      {
        question: "How long should a professional cover letter be?",
        answer:
          "Usually one page with concise high-impact points is best for recruiter readability and response speed.",
      },
    ],
  },
  {
    packageSlug: "executive-cover-letter",
    title: "Executive Cover Letter Strategy: Position Leadership Value for Senior Hiring",
    excerpt:
      "A leadership-focused guide to executive cover letters that communicate strategic value, governance confidence, and measurable outcomes.",
    content:
      "For executive candidates, a cover letter is a positioning document. It should show strategic impact, leadership maturity, and role-specific relevance in a concise narrative. This package is built to present that value clearly and credibly.",
    category: "Executive Cover Letter Guide",
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
        heading: "How This Package Builds Executive Credibility",
        paragraphs: [
          "The Executive Cover Letter package is written to match senior hiring expectations, including board-facing tone, strategic framing, and concise impact storytelling.",
          "It supports confidential transitions and high-trust applications where first impression quality has significant influence.",
        ],
        bullets: [
          "Leadership-focused writing and value positioning",
          "Company and role customization support",
          "Rapid revision flow for time-sensitive applications",
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
        question: "Is this package suitable for C-level applications?",
        answer:
          "Yes. It is tailored for senior and executive-level candidates requiring strategic narrative quality.",
      },
      {
        question: "Can the letter be customized to a specific company?",
        answer:
          "Yes. The package supports company-specific and role-specific tailoring to maximize relevance.",
      },
      {
        question: "Do executive cover letters still matter today?",
        answer:
          "Yes. In high-level hiring, a strong letter can shape first impression quality and strengthen strategic fit perception.",
      },
    ],
  },
  {
    packageSlug: "student-linkedin-package",
    title: "Student LinkedIn Package: Build a Recruiter-Visible Profile Before Graduation",
    excerpt:
      "A complete student LinkedIn optimization guide for building profile visibility, keyword relevance, and early professional credibility.",
    content:
      "LinkedIn is often the first profile recruiters check after scanning your CV. For students, a well-optimized profile can create internship opportunities before graduation. This package is designed to build that visibility from the ground up.",
    category: "Student LinkedIn Guide",
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
        heading: "Why Students Need LinkedIn Early",
        paragraphs: [
          "Recruiters search LinkedIn by skills, role keywords, and location. Students who optimize early often appear in more internship and trainee searches.",
          "A complete profile also increases trust when employers verify your application after receiving your CV.",
        ],
        bullets: [
          "Visibility in recruiter search",
          "Stronger digital first impression",
          "Better networking opportunities",
        ],
      },
      {
        heading: "How the Student LinkedIn Package Helps",
        paragraphs: [
          "This package improves your headline, About summary, skill direction, and profile structure so your strengths become clearer and easier to discover.",
          "It is especially useful for students who have projects but do not know how to present them professionally.",
        ],
        bullets: [
          "Profile review with practical recommendations",
          "Headline and About guidance",
          "Keyword and skills placement support",
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
        question: "Can students get opportunities through LinkedIn?",
        answer:
          "Yes. Many internships and entry-level opportunities are discovered or validated through LinkedIn searches.",
      },
      {
        question: "What if I have limited experience?",
        answer:
          "The package helps you present projects, coursework, volunteer activity, and skills in a professional and discoverable format.",
      },
      {
        question: "How often should I update my student LinkedIn profile?",
        answer:
          "Review and update monthly, or whenever you complete projects, courses, certifications, or internships.",
      },
    ],
  },
  {
    packageSlug: "starter-linkedin-package",
    title: "Starter LinkedIn Package: Entry-Level Profile Optimization That Attracts Recruiters",
    excerpt:
      "How freshers can optimize LinkedIn for job search visibility, clear positioning, and stronger recruiter conversion.",
    content:
      "A LinkedIn profile without strategy becomes a digital CV copy. The Starter LinkedIn Package is built to create a profile that ranks better in searches and communicates value faster for entry-level hiring.",
    category: "Starter LinkedIn Guide",
    publishedAt: "2026-02-19",
    keywords: [
      "starter linkedin package",
      "linkedin for freshers",
      "entry level linkedin optimization",
      "linkedin headline rewrite",
      "recruiter visibility linkedin",
    ],
    sections: [
      {
        heading: "What Makes Entry-Level LinkedIn Profiles Weak",
        paragraphs: [
          "Most fresher profiles use vague headlines, generic About summaries, and incomplete experience sections. This reduces discoverability and profile trust.",
          "When the profile lacks keyword strategy, recruiters searching for specific skills are less likely to find or short-list you.",
        ],
        bullets: [
          "Weak headline positioning",
          "Low keyword relevance",
          "Incomplete experience and skills storytelling",
        ],
      },
      {
        heading: "What This Package Improves",
        paragraphs: [
          "The package provides structured profile analysis and rewrite direction for headline, About section, and experience blocks.",
          "It creates a clearer message so recruiters instantly understand your target role and current value.",
        ],
        bullets: [
          "Full profile analysis",
          "Headline and About enhancement",
          "Experience section structure improvement",
        ],
      },
      {
        heading: "Post-Optimization Growth Plan",
        paragraphs: [
          "Start a simple 30-day activity plan: optimize profile, add skills proof, then engage with role-specific content daily.",
          "Consistent activity helps your profile stay visible and improves inbound recruiter messages.",
        ],
        bullets: [
          "Connect with relevant recruiters weekly",
          "Share progress posts and project highlights",
          "Update keywords as target roles evolve",
        ],
      },
    ],
    faqs: [
      {
        question: "Will this package help me get noticed by recruiters?",
        answer:
          "Yes. The package improves profile keyword relevance and message clarity, both critical for recruiter discovery.",
      },
      {
        question: "Do I need paid LinkedIn features for this to work?",
        answer:
          "No. Strong profile structure and content quality can produce meaningful visibility even without premium tools.",
      },
      {
        question: "Can I use this with my existing CV strategy?",
        answer:
          "Yes. It is most effective when LinkedIn and CV positioning are aligned around the same target roles.",
      },
    ],
  },
  {
    packageSlug: "professional-linkedin-package",
    title: "Professional LinkedIn Package: Turn Experience into Inbound Career Opportunities",
    excerpt:
      "A growth-focused LinkedIn guide for mid-level professionals who want stronger visibility, better network quality, and recruiter-ready profile messaging.",
    content:
      "Mid-level professionals often have strong experience but weak online positioning. The Professional LinkedIn Package aligns your profile with role-specific keyword demand and value communication so opportunities come more consistently.",
    category: "Professional LinkedIn Guide",
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
        heading: "How the Professional LinkedIn Package Helps",
        paragraphs: [
          "This package provides a deeper audit and practical rewrite direction for your core profile sections, including industry-aligned keyword placement.",
          "It also improves featured section direction so your most valuable work is visible in the first profile scroll.",
        ],
        bullets: [
          "Deep profile audit",
          "Headline/About/Experience optimization",
          "Industry keyword strategy and featured section guidance",
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
        question: "Is this package suitable for professionals planning a job switch?",
        answer:
          "Yes. It is ideal for professionals aiming for stronger opportunities, promotions, or industry transitions.",
      },
      {
        question: "How important is keyword strategy on LinkedIn?",
        answer:
          "Very important. LinkedIn behaves like a search engine, and keyword relevance affects visibility significantly.",
      },
      {
        question: "Do I need to post content after optimization?",
        answer:
          "Yes, consistent activity helps maintain profile visibility and improves inbound opportunity flow.",
      },
    ],
  },
  {
    packageSlug: "executive-linkedin-package",
    title: "Executive LinkedIn Package: Build a Leadership Brand That Signals Authority",
    excerpt:
      "A high-level LinkedIn strategy guide for executives who need strong personal branding, board-ready messaging, and leadership discoverability.",
    content:
      "For senior leaders, LinkedIn is not just networking. It is public executive positioning. The Executive LinkedIn Package helps shape authority, strategic credibility, and leadership relevance for high-value opportunities.",
    category: "Executive LinkedIn Guide",
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
        heading: "How This Package Strengthens Leadership Presence",
        paragraphs: [
          "The package provides executive-level profile structuring with leadership-focused headline and About messaging that reflects strategic authority.",
          "It supports alignment between your profile and executive CV so your brand remains consistent in all high-stakes conversations.",
        ],
        bullets: [
          "Executive profile audit and positioning",
          "Leadership-centric messaging enhancements",
          "High-impact keyword strategy for senior visibility",
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
        question: "Is LinkedIn important for senior leaders?",
        answer:
          "Yes. It is often used to validate executive credibility and leadership brand before formal hiring discussions.",
      },
      {
        question: "Can this package support confidential leadership transitions?",
        answer:
          "Yes. Messaging can be positioned carefully to maintain strategic discretion while improving executive visibility.",
      },
      {
        question: "Should executives post frequently?",
        answer:
          "Quality and consistency matter more than volume. Strategic periodic posts are usually enough for leadership positioning.",
      },
    ],
  },
  {
    packageSlug: "student-cv-review-package",
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
    packageSlug: "starter-cv-review-package",
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
    packageSlug: "professional-cv-review-package",
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
    packageSlug: "executive-cv-review-package",
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

export const blogPosts: BlogPost[] = [...careerGrowthBlogPosts, ...packageFocusedPosts, ...editorialPosts, ...cvSeriesEn, ...cvSeriesSi].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
