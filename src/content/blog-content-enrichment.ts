import type { BlogFaq, BlogLink, BlogPost, BlogSection } from "./blog-posts";

type TopicKind =
  | "academic"
  | "ai-tools"
  | "ats"
  | "career"
  | "cover-letter"
  | "cv-writing"
  | "interview"
  | "job-search"
  | "linkedin"
  | "portfolio"
  | "salary"
  | "skills"
  | "templates";

type TopicProfile = {
  kind: TopicKind;
  englishFocus: string;
  sinhalaFocus: string;
  output: string;
};

const minimumArticleChars = 2200;
const minimumSectionCount = 4;

const topicProfiles: Record<TopicKind, Omit<TopicProfile, "kind">> = {
  academic: {
    englishFocus: "academic CV structure, research evidence, publications, and institution-ready positioning",
    sinhalaFocus: "academic CV structure, research proof, publications සහ institution-ready positioning",
    output: "academic CV",
  },
  "ai-tools": {
    englishFocus: "AI-assisted CV writing, human editing, keyword alignment, and safe quality control",
    sinhalaFocus: "AI CV tools, human editing, keyword alignment සහ quality control",
    output: "AI-assisted CV",
  },
  ats: {
    englishFocus: "ATS readability, keyword matching, clean structure, and recruiter scan performance",
    sinhalaFocus: "ATS readability, keyword matching, clean structure සහ recruiter scan performance",
    output: "ATS-friendly CV",
  },
  career: {
    englishFocus: "career direction, role targeting, professional positioning, and long-term growth",
    sinhalaFocus: "career direction, role targeting, professional positioning සහ long-term growth",
    output: "career plan",
  },
  "cover-letter": {
    englishFocus: "role-specific cover letters, motivation, evidence, and employer relevance",
    sinhalaFocus: "role-specific cover letters, motivation, evidence සහ employer relevance",
    output: "cover letter",
  },
  "cv-writing": {
    englishFocus: "professional CV writing, achievement-based content, layout, and job-fit messaging",
    sinhalaFocus: "professional CV writing, achievement-based content, layout සහ job-fit messaging",
    output: "CV",
  },
  interview: {
    englishFocus: "interview preparation, answer structure, examples, and confident communication",
    sinhalaFocus: "interview preparation, answer structure, examples සහ confident communication",
    output: "interview plan",
  },
  "job-search": {
    englishFocus: "job applications, recruiter expectations, shortlisting behavior, and follow-up strategy",
    sinhalaFocus: "job applications, recruiter expectations, shortlisting behavior සහ follow-up strategy",
    output: "job application strategy",
  },
  linkedin: {
    englishFocus: "LinkedIn SEO, headline positioning, profile conversion, and recruiter discovery",
    sinhalaFocus: "LinkedIn SEO, headline positioning, profile conversion සහ recruiter discovery",
    output: "LinkedIn profile",
  },
  portfolio: {
    englishFocus: "portfolio proof, personal websites, project evidence, and public career credibility",
    sinhalaFocus: "portfolio proof, personal websites, project evidence සහ public career credibility",
    output: "career portfolio",
  },
  salary: {
    englishFocus: "salary negotiation, offer evaluation, value proof, and confident communication",
    sinhalaFocus: "salary negotiation, offer evaluation, value proof සහ confident communication",
    output: "salary discussion plan",
  },
  skills: {
    englishFocus: "hard skills, soft skills, keyword relevance, and proof-based examples",
    sinhalaFocus: "hard skills, soft skills, keyword relevance සහ proof-based examples",
    output: "skills section",
  },
  templates: {
    englishFocus: "CV templates, resume builders, formatting choices, and ATS-safe design decisions",
    sinhalaFocus: "CV templates, resume builders, formatting choices සහ ATS-safe design decisions",
    output: "CV template",
  },
};

function getArticleTextLength(post: BlogPost): number {
  const sectionsText = (post.sections ?? [])
    .flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])])
    .join(" ");
  const faqText = (post.faqs ?? [])
    .flatMap((faq) => [faq.question, faq.answer])
    .join(" ");

  return [post.content, sectionsText, faqText].join(" ").trim().length;
}

function isSinhalaPost(post: BlogPost): boolean {
  return post.slug.includes("sinhala") || /[\u0D80-\u0DFF]/.test(`${post.title} ${post.content}`);
}

function getPostSearchText(post: BlogPost): string {
  return [post.slug, post.title, post.excerpt, post.category, ...(post.keywords ?? [])].join(" ").toLowerCase();
}

function getTopicKind(post: BlogPost): TopicKind {
  const text = getPostSearchText(post);

  if (/academic|research|publication|overleaf|curriculum/.test(text)) return "academic";
  if (/ai|generator|maker|builder|canva|template|onlinecv|resumeio|free resume|free cv|download/.test(text)) return "templates";
  if (/ats|applicant tracking|parser|keyword|scan|score/.test(text)) return "ats";
  if (/cover.?letter|motivation letter|cv letter|coverletter/.test(text)) return "cover-letter";
  if (/linkedin|profile seo|headline|personal brand/.test(text)) return "linkedin";
  if (/interview|panel|technical|presentation|video interview/.test(text)) return "interview";
  if (/salary|offer|increment|promotion|negotiate|negotiation/.test(text)) return "salary";
  if (/portfolio|personal website|project|github|case study/.test(text)) return "portfolio";
  if (/skill|soft skill|hard skill|competenc/.test(text)) return "skills";
  if (/job search|job application|recruiter|shortlist|rejection|vacancy|hiring/.test(text)) return "job-search";
  if (/career|roadmap|mentor|leadership|workplace|manager|freelanc|remote/.test(text)) return "career";

  return "cv-writing";
}

function getTopicProfile(post: BlogPost): TopicProfile {
  const kind = getTopicKind(post);
  return { kind, ...topicProfiles[kind] };
}

function getPrimaryKeyword(post: BlogPost, fallback: string): string {
  return post.keywords?.find((keyword) => keyword.trim().length > 0) ?? fallback;
}

function needsEnrichment(post: BlogPost): boolean {
  return getArticleTextLength(post) < minimumArticleChars || (post.sections?.length ?? 0) < minimumSectionCount;
}

function buildEnglishIntro(post: BlogPost, profile: TopicProfile): string {
  const baseIntro = post.content && post.content.trim().length > 80 ? post.content.replace(/\s*\.\.\.$/, ".") : "";
  const addition = `${post.title} matters because hiring decisions now depend on clear positioning, relevant proof, and fast readability. This guide explains how to approach ${profile.output} work with ${profile.englishFocus}, so the final result supports real applications instead of looking like a generic document. Use the ideas below as a practical checklist before you send your next application, update your profile, or compare professional career services.`;

  if (!baseIntro) return addition;
  if (baseIntro.length > 420) return baseIntro;
  return `${baseIntro} ${addition}`;
}

function buildSinhalaIntro(post: BlogPost, profile: TopicProfile, keyword: string): string {
  const baseIntro = post.content && post.content.trim().length > 80 ? post.content.replace(/\s*\.\.\.$/, ".") : "";
  const addition = `මෙම මාතෘකාව වැදගත් වන්නේ අද රැකියා වෙළඳපොළේ CV එකක්, LinkedIn profile එකක් හෝ application document එකක් සරල ලැයිස්තුවක් ලෙස පමණක් නොබලන නිසාය. ${keyword} ගැන නිවැරදි අවබෝධයක් තිබුණොත් ඔබට ${profile.sinhalaFocus} මත පදනම්ව වඩා වෘත්තීය, ATS-friendly සහ recruiter-friendly ප්‍රතිඵලයක් සාදා ගත හැක. පහත මාර්ගෝපදේශය ඔබගේ ඊළඟ job application එකට පෙර භාවිතා කළ හැකි ප්‍රායෝගික checklist එකක් ලෙස සකස් කර ඇත.`;

  if (!baseIntro) return addition;
  if (baseIntro.length > 420) return baseIntro;
  return `${baseIntro} ${addition}`;
}

function buildEnglishSections(post: BlogPost, profile: TopicProfile, keyword: string): BlogSection[] {
  return [
    {
      heading: `Why ${post.title} matters`,
      paragraphs: [
        `A strong ${profile.output} is useful only when it helps a recruiter understand your value quickly. The goal is not to add more decoration or longer wording; the goal is to make your strengths, experience, and direction easy to evaluate.`,
        `For this topic, focus on ${profile.englishFocus}. When those parts are missing, even qualified candidates can look unclear, generic, or risky compared with applicants who communicate proof more directly.`,
      ],
    },
    {
      heading: "How to apply this step by step",
      paragraphs: [
        `Start by reading the target job description or career goal carefully. Identify the role requirements, repeated keywords, experience level, and the type of proof the employer is likely to value.`,
        `Then reshape your content around relevance. Instead of writing everything you have done, prioritize examples that show impact, responsibility, tools used, industries served, or measurable outcomes connected to ${keyword}.`,
      ],
      bullets: [
        "Clarify the exact job title, industry, and seniority level you are targeting.",
        "Collect proof such as metrics, projects, tools, responsibilities, awards, or client outcomes.",
        "Use simple section headings that recruiters and ATS systems can understand.",
        "Remove decorative elements that make the document harder to scan or parse.",
        "Review the final version against the job description before applying.",
      ],
    },
    {
      heading: "ATS and recruiter readability",
      paragraphs: [
        `Many applications are filtered or ranked before a human reads them. That means your wording, structure, and file clarity matter as much as the design. Use standard headings, text-based content, and role-matched terminology.`,
        `Recruiters also scan quickly. Your strongest information should appear early, with achievements written in a way that shows the result of your work. A clean layout, consistent spacing, and concise bullet points make the article topic practical in real hiring situations.`,
      ],
    },
    {
      heading: "Common mistakes to avoid",
      paragraphs: [
        `The biggest mistake is treating ${post.title.toLowerCase()} as a one-time formatting task. Career materials perform better when they are matched to a specific role, audience, and hiring context.`,
        `Avoid copying generic templates without changing the strategy. Also avoid keyword stuffing, exaggerated claims, image-heavy layouts, vague duties, and long paragraphs that hide the most important evidence.`,
      ],
      bullets: [
        "Do not use the same wording for every job application.",
        "Do not rely only on design when the content is weak.",
        "Do not add skills or tools you cannot explain in an interview.",
        "Do not bury results below generic responsibilities.",
        "Do not submit before checking spelling, dates, and contact details.",
      ],
    },
    {
      heading: "Final checklist before you use it",
      paragraphs: [
        `Before you publish, download, or send your ${profile.output}, test whether a stranger can understand your target role and value within a few seconds. If the answer is no, simplify the message and bring stronger proof to the top.`,
        `A complete version should answer three questions clearly: what role you are targeting, why you are suitable, and what evidence supports your claim. That is what turns ${keyword} from a basic topic into a practical career advantage.`,
      ],
      bullets: [
        "The opening summary matches the target role.",
        "Important keywords appear naturally in context.",
        "Each section has a clear purpose.",
        "Achievements include numbers, scope, or outcomes where possible.",
        "The final document is easy to read on mobile and desktop screens.",
      ],
    },
  ];
}

function buildSinhalaSections(post: BlogPost, profile: TopicProfile, keyword: string): BlogSection[] {
  return [
    {
      heading: "මෙම මාතෘකාව ඔබගේ රැකියා අයදුම්පතට වැදගත් වන්නේ ඇයි?",
      paragraphs: [
        `ශක්තිමත් ${profile.output} එකක් සාර්ථක වන්නේ recruiter කෙනෙකුට ඔබගේ වටිනාකම ඉක්මනින් තේරුම් ගත හැකි විටය. ලස්සන design එකක් පමණක් තිබීම ප්‍රමාණවත් නොවේ; අත්දැකීම්, skills, achievements සහ role-fit එක පැහැදිලිව පෙන්විය යුතුය.`,
        `${keyword} ගැන අවධානය යොමු කරන විට ${profile.sinhalaFocus} යන කරුණු එකට සම්බන්ධව සිතීම වැදගත්ය. එසේ නොකළහොත් qualified candidate කෙනෙකු වුවද generic ලෙස පෙනී, shortlist වීමේ අවස්ථාව අඩු විය හැක.`,
      ],
    },
    {
      heading: "පියවරෙන් පියවර ක්‍රියාත්මක කරන ආකාරය",
      paragraphs: [
        "පළමුව target කරන job role එක හොඳින් කියවන්න. Job description එකේ නැවත නැවත එන keywords, required skills, experience level සහ employer බලාපොරොත්තු වන proof හඳුනා ගන්න.",
        "ඊළඟට ඔබගේ content එක role එකට ගැළපෙන ලෙස නැවත සකස් කරන්න. ඔබ කළ සියල්ල ලිවීමට වඩා, ප්‍රතිඵල, වගකීම්, tools, projects, clients හෝ measurable outcomes පෙන්වන කරුණු ප්‍රමුඛ කරන්න.",
      ],
      bullets: [
        "Target කරන job title, industry සහ seniority level එක පැහැදිලි කරගන්න.",
        "Metrics, projects, tools, responsibilities සහ achievements වැනි proof එකතු කරන්න.",
        "ATS systems කියවිය හැකි සරල headings භාවිතා කරන්න.",
        "CV එක scan කිරීම අමාරු කරන graphics, tables හෝ image-heavy design අවම කරන්න.",
        "Apply කිරීමට පෙර final version එක job description එක සමඟ compare කරන්න.",
      ],
    },
    {
      heading: "ATS සහ recruiter readability",
      paragraphs: [
        "බොහෝ companies වල applications පළමුව ATS system එකකින් filter විය හැක. ඒ නිසා wording, structure, file clarity සහ keywords නිවැරදි වීම ඉතා වැදගත්ය.",
        "Recruiter කෙනෙක් සාමාන්‍යයෙන් CV එක ඉතා කෙටි වේලාවක් තුළ scan කරයි. ඒ නිසා ඔබගේ strongest achievements මුල් කොටසේ පෙනෙන ලෙස, concise bullet points සහ clean layout එකක් භාවිතා කිරීම වඩා හොඳය.",
      ],
    },
    {
      heading: "වැළැක්විය යුතු සාමාන්‍ය වැරදි",
      paragraphs: [
        `බොහෝ අය ${keyword} ගැන සිතන්නේ formatting task එකක් ලෙස පමණි. නමුත් හොඳ career document එකක් role, audience සහ hiring context එකට match විය යුතුය.`,
        "Generic templates copy කිරීම, keyword stuffing කිරීම, exaggerated claims ලිවීම, vague duties පමණක් දාීම, සහ long paragraphs වල proof සඟවා දැමීම shortlist වීමට බාධා වේ.",
      ],
      bullets: [
        "එකම CV එක සියලුම jobs සඳහා යවන්න එපා.",
        "Content දුර්වල නම් design එක පමණක් විශ්වාස කරන්න එපා.",
        "Interview එකේ explain කළ නොහැකි skills add කරන්න එපා.",
        "Results සහ achievements responsibilities වලට යට කරන්න එපා.",
        "Dates, spelling, contact details සහ links පරීක්ෂා නොකර submit කරන්න එපා.",
      ],
    },
    {
      heading: "Apply කිරීමට පෙර අවසාන checklist එක",
      paragraphs: [
        `ඔබගේ ${profile.output} එක යැවීමට පෙර, කෙනෙකුට තත්පර කිහිපයකින් ඔබ target කරන role එක සහ ඔබගේ value එක තේරුම් ගත හැකිදැයි පරීක්ෂා කරන්න. එසේ නොහැකි නම් message එක තවත් සරල කර strongest proof මුල් කොටසට ගෙන එන්න.`,
        `සම්පූර්ණ article එකක අරමුණ වන්නේ ${keyword} ගැන දැනුම දීම පමණක් නොව, එය ඔබගේ job application එකේ ප්‍රායෝගික advantage එකක් බවට පත් කිරීමයි.`,
      ],
      bullets: [
        "Opening summary එක target role එකට ගැළපේද?",
        "Important keywords context එක තුළ natural ලෙස තිබේද?",
        "සෑම section එකකටම පැහැදිලි purpose එකක් තිබේද?",
        "Achievements සඳහා numbers, scope හෝ outcomes තිබේද?",
        "Mobile සහ desktop දෙකේම කියවීමට පහසුද?",
      ],
    },
  ];
}

function buildEnglishFaqs(post: BlogPost, profile: TopicProfile, keyword: string): BlogFaq[] {
  return [
    {
      question: `Is ${keyword} important for job applications?`,
      answer: `Yes. ${keyword} affects how clearly employers understand your relevance, proof, and readiness for a role. It is especially useful when combined with clean structure and role-specific content.`,
    },
    {
      question: "Should I use the same version for every job?",
      answer: "No. Keep a strong master version, then adjust the summary, keywords, and strongest examples for each target role or industry.",
    },
    {
      question: `What makes a ${profile.output} more professional?`,
      answer: "A professional version is clear, evidence-based, easy to scan, ATS-friendly where relevant, and directly connected to the role or outcome you want.",
    },
  ];
}

function buildSinhalaFaqs(post: BlogPost, profile: TopicProfile, keyword: string): BlogFaq[] {
  return [
    {
      question: `${keyword} job applications සඳහා වැදගත්ද?`,
      answer: `ඔව්. ${keyword} නිවැරදිව සකස් කිරීමෙන් employer කෙනෙකුට ඔබගේ relevance, proof සහ readiness පැහැදිලිව තේරුම් ගත හැක.`,
    },
    {
      question: "එකම CV එක සියලුම jobs සඳහා භාවිතා කළ හැකිද?",
      answer: "Master CV එකක් තබා ගැනීම හොඳයි. නමුත් summary, keywords සහ strongest examples target role එකට ගැළපෙන ලෙස වෙනස් කළ යුතුය.",
    },
    {
      question: `Professional ${profile.output} එකක තිබිය යුතු ප්‍රධාන ලක්ෂණ මොනවාද?`,
      answer: "එය clear, evidence-based, scan කිරීමට පහසු, ATS-friendly සහ target role එකට සෘජුව සම්බන්ධ විය යුතුය.",
    },
  ];
}

function buildInternalLinks(profile: TopicProfile): BlogLink[] {
  if (profile.kind === "cover-letter") {
    return [
      { label: "Explore Cover Letter Writing Packages", href: "/services/packages/cover-letter-writing" },
      { label: "Compare Career Service Pricing", href: "/pricing" },
      { label: "Contact for Application Support", href: "/contact" },
    ];
  }

  if (profile.kind === "linkedin") {
    return [
      { label: "Explore LinkedIn Optimization Packages", href: "/services/packages/linkedin-optimization" },
      { label: "Try the LinkedIn Headline Generator", href: "/tools/linkedin-headline-generator" },
      { label: "Compare Career Service Pricing", href: "/pricing" },
    ];
  }

  if (profile.kind === "interview") {
    return [
      { label: "Try the Interview Story Bank", href: "/tools/interview-story-bank" },
      { label: "Browse Career Services", href: "/services" },
      { label: "Contact for Career Guidance", href: "/contact" },
    ];
  }

  if (profile.kind === "portfolio") {
    return [
      { label: "Explore Personal Website Service", href: "/services/personal-website" },
      { label: "Browse Portfolio Examples", href: "/portfolio" },
      { label: "Compare Career Service Pricing", href: "/pricing" },
    ];
  }

  return [
    { label: "Explore CV Writing Packages", href: "/services/packages/cv-writing" },
    { label: "Try the ATS CV Audit Tool", href: "/tools/ats-cv-audit" },
    { label: "Compare Career Service Pricing", href: "/pricing" },
  ];
}

function buildCtaButtons(profile: TopicProfile): BlogLink[] {
  if (profile.kind === "linkedin") {
    return [
      { label: "View LinkedIn Packages", href: "/services/packages/linkedin-optimization" },
      { label: "Generate Headline Ideas", href: "/tools/linkedin-headline-generator" },
      { label: "Contact Chanuka", href: "/contact" },
    ];
  }

  if (profile.kind === "cover-letter") {
    return [
      { label: "View Cover Letter Packages", href: "/services/packages/cover-letter-writing" },
      { label: "Compare Pricing", href: "/pricing" },
      { label: "Contact Chanuka", href: "/contact" },
    ];
  }

  return [
    { label: "View CV Packages", href: "/services/packages/cv-writing" },
    { label: "Run ATS Audit", href: "/tools/ats-cv-audit" },
    { label: "Contact Chanuka", href: "/contact" },
  ];
}

export function enrichBlogPostContent(post: BlogPost): BlogPost {
  if (!needsEnrichment(post)) {
    return post;
  }

  const profile = getTopicProfile(post);
  const sinhala = isSinhalaPost(post);
  const keyword = getPrimaryKeyword(post, sinhala ? profile.sinhalaFocus : profile.englishFocus);
  const generatedSections = sinhala
    ? buildSinhalaSections(post, profile, keyword)
    : buildEnglishSections(post, profile, keyword);
  const generatedFaqs = sinhala
    ? buildSinhalaFaqs(post, profile, keyword)
    : buildEnglishFaqs(post, profile, keyword);

  return {
    ...post,
    content: sinhala ? buildSinhalaIntro(post, profile, keyword) : buildEnglishIntro(post, profile),
    sections: [...(post.sections ?? []), ...generatedSections].slice(0, 7),
    internalLinks: post.internalLinks && post.internalLinks.length > 0 ? post.internalLinks : buildInternalLinks(profile),
    ctaButtons: post.ctaButtons && post.ctaButtons.length > 0 ? post.ctaButtons : buildCtaButtons(profile),
    faqs: post.faqs && post.faqs.length > 0 ? post.faqs : generatedFaqs,
  };
}
