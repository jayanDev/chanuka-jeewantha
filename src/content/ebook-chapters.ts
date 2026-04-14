export type EbookChapter = {
  slug: string;
  title: string;
  excerpt: string;
  estimatedReadMinutes: number;
  content: string[];
};

type EbookChapterMap = Record<string, EbookChapter[]>;

export const ebookChapterMap: EbookChapterMap = {
  "ats-cv-foundations": [
    {
      slug: "cv-clarity-blueprint",
      title: "Chapter 1: CV Clarity Blueprint",
      excerpt: "Define role target, value promise, and the structure recruiters scan first.",
      estimatedReadMinutes: 6,
      content: [
        "Start with one clear target role. A CV that tries to fit every vacancy usually performs poorly in ATS and in recruiter screening.",
        "Your top section should communicate role alignment, years of experience level, and one focused value statement in two lines.",
        "Use a consistent section order: summary, skills, experience, education, certifications. This removes friction for recruiters and improves keyword context.",
      ],
    },
    {
      slug: "achievement-writing",
      title: "Chapter 2: Achievement Writing",
      excerpt: "Turn task-heavy bullets into measurable outcomes with context.",
      estimatedReadMinutes: 7,
      content: [
        "Replace generic responsibilities with outcomes using a simple pattern: action + scope + result.",
        "Use numbers where possible: time saved, volume handled, process accuracy, response rates, or revenue impact.",
        "Keep each bullet short and role-relevant. Three strong bullets beat ten weak bullets.",
      ],
    },
    {
      slug: "ats-keyword-system",
      title: "Chapter 3: ATS Keyword System",
      excerpt: "Build a repeatable keyword extraction and placement workflow.",
      estimatedReadMinutes: 8,
      content: [
        "Extract repeated terms from 5-10 role descriptions and cluster them into skills, tools, responsibilities, and outcomes.",
        "Place high-priority terms naturally inside summary, skills, and relevant experience bullets.",
        "Avoid keyword stuffing. ATS quality and human readability should move together.",
      ],
    },
  ],
  "linkedin-visibility-playbook": [
    {
      slug: "headline-positioning",
      title: "Chapter 1: Headline Positioning",
      excerpt: "Write a recruiter-facing headline with searchable intent.",
      estimatedReadMinutes: 6,
      content: [
        "Your headline should combine target role, core capability, and domain context.",
        "Use terms recruiters actually search. Prioritize clarity over creativity.",
        "Include one trust signal such as a domain, specialization, or measurable strength.",
      ],
    },
    {
      slug: "about-section-framework",
      title: "Chapter 2: About Section Framework",
      excerpt: "Use a concise narrative that supports discovery and credibility.",
      estimatedReadMinutes: 7,
      content: [
        "Open with role focus and experience level, then support it with strengths and outcome-oriented examples.",
        "Close with the kind of opportunities you are targeting and the business problems you solve.",
        "Keep language specific, easy to scan, and aligned with your CV positioning.",
      ],
    },
  ],
  "career-switch-premium-toolkit": [
    {
      slug: "identity-shift",
      title: "Chapter 1: Identity Shift Strategy",
      excerpt: "Build a credible narrative for role transition without hiding prior experience.",
      estimatedReadMinutes: 9,
      content: [
        "Career switching is not a reset. It is reframing your proven strengths into a new market context.",
        "Define your bridge story with three blocks: what you have done, what is transferable, and what you are now targeting.",
        "Recruiters need a low-risk signal. Make your transition logic obvious in summary, skills, and project examples.",
      ],
    },
    {
      slug: "transferable-skills-matrix",
      title: "Chapter 2: Transferable Skills Matrix",
      excerpt: "Map prior work into role-matching skill evidence.",
      estimatedReadMinutes: 10,
      content: [
        "List your top past responsibilities and map each one to the target role requirements.",
        "For every mapped skill, add one proof statement with scope and result.",
        "Use this matrix to rewrite CV bullets and interview stories consistently.",
      ],
    },
    {
      slug: "gap-bridging-plan",
      title: "Chapter 3: Gap Bridging Plan",
      excerpt: "Close credibility gaps with portfolio signals and tactical upskilling.",
      estimatedReadMinutes: 8,
      content: [
        "Identify only the critical gaps that block interviews, not every possible weakness.",
        "Use fast proof assets: mini projects, case breakdowns, process documents, and public writeups.",
        "Package outputs so recruiters can evaluate your readiness in under five minutes.",
      ],
    },
    {
      slug: "transition-cv-system",
      title: "Chapter 4: Transition CV System",
      excerpt: "Build a CV version tailored for switch roles and adjacent opportunities.",
      estimatedReadMinutes: 9,
      content: [
        "Create one master CV and two role-specific variants rather than one generic version.",
        "Adjust summary, skill stack, and top bullets to mirror target job language.",
        "Use selected projects and achievements to reduce perceived transition risk.",
      ],
    },
    {
      slug: "application-funnel",
      title: "Chapter 5: Application Funnel Design",
      excerpt: "Run a weekly system to improve response rates through feedback loops.",
      estimatedReadMinutes: 8,
      content: [
        "Track every application with source, role fit score, and response timeline.",
        "Every 15-20 applications, review patterns and refine keywords, bullets, and outreach messages.",
        "Small weekly optimizations compound faster than occasional full rewrites.",
      ],
    },
  ],
  "interview-conversion-system": [
    {
      slug: "interview-intent",
      title: "Chapter 1: Interview Intent",
      excerpt: "Understand what interviewers actually validate and how to respond.",
      estimatedReadMinutes: 8,
      content: [
        "Interview rounds typically test role fit, problem solving, communication, and risk profile.",
        "Prepare answers by objective, not by memorizing random questions.",
        "When you know the interviewer intent, your responses become cleaner and more strategic.",
      ],
    },
    {
      slug: "star-answer-banks",
      title: "Chapter 2: STAR Answer Banks",
      excerpt: "Build reusable achievement stories for behavioral and situational rounds.",
      estimatedReadMinutes: 10,
      content: [
        "Prepare 8-12 STAR stories covering leadership, conflict, ownership, ambiguity, and learning.",
        "Each story should include context, your decision logic, and measurable result.",
        "Reusing structured stories reduces stress and improves consistency under pressure.",
      ],
    },
    {
      slug: "panel-communication",
      title: "Chapter 3: Panel Communication",
      excerpt: "Handle multi-interviewer dynamics while keeping answers concise.",
      estimatedReadMinutes: 7,
      content: [
        "Start with a direct answer, then add one relevant example, then close with impact.",
        "Acknowledge follow-up cues quickly and adapt depth based on interviewer role.",
        "Strong panel performance is clarity plus composure, not long explanations.",
      ],
    },
  ],
};

export function getEbookChapters(ebookSlug: string): EbookChapter[] {
  return ebookChapterMap[ebookSlug] ?? [];
}

export function getEbookChapterBySlug(ebookSlug: string, chapterSlug: string): EbookChapter | null {
  const chapters = getEbookChapters(ebookSlug);
  return chapters.find((chapter) => chapter.slug === chapterSlug) ?? null;
}
