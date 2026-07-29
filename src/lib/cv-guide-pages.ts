import type { BlogPost } from "@/content/blog-posts";

export type CvGuideCluster = "role" | "industry" | "career-situation" | "linkedin" | "application";

export type CvGuideFaq = { question: string; answer: string };

export type CvGuidePage = {
  slug: string;
  cluster: CvGuideCluster;
  clusterLabel: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroImage: string;
  intro: string[];
  audience: string[];
  challenges: string[];
  recommendations: string[];
  evidenceExamples: string[];
  localInsight: string;
  articleTerms: string[];
  relatedPackageSlugs: string[];
  faqs: CvGuideFaq[];
};

type GuideSeed = readonly [key: string, topic: string, angle: string, terms: readonly string[]];

const heroImages = [
  "/images/hero-chanuka.jpg",
  "/images/about-page-chanuka.jpg",
  "/images/chanuka-jeewantha-career-development-specialist.jpg",
  "/images/about-chanuka.jpg",
  "/images/about-chanurgka.jpg",
  "/images/testimonial-chanuka.jpg",
] as const;

const roleSeeds: readonly GuideSeed[] = [
  ["software-engineer-cv", "Software Engineer", "architecture decisions, product delivery, and technical depth", ["developer", "technology", "software"]],
  ["data-analyst-cv", "Data Analyst", "business questions, analytical methods, and decision support", ["analytics", "Excel", "Power BI"]],
  ["data-scientist-cv", "Data Scientist", "model development, experimentation, and business application", ["machine learning", "analytics", "AI"]],
  ["cybersecurity-specialist-cv", "Cybersecurity Specialist", "risk reduction, incident response, and security controls", ["information security", "risk", "compliance"]],
  ["qa-engineer-cv", "QA Engineer", "test strategy, defect prevention, and release confidence", ["software testing", "automation", "quality"]],
  ["devops-engineer-cv", "DevOps Engineer", "delivery pipelines, cloud reliability, and platform automation", ["cloud", "CI CD", "technology"]],
  ["ui-ux-designer-cv", "UI/UX Designer", "user research, interaction decisions, and product usability", ["design", "portfolio", "product"]],
  ["graphic-designer-cv", "Graphic Designer", "brand interpretation, visual systems, and campaign execution", ["creative", "portfolio", "branding"]],
  ["product-manager-cv", "Product Manager", "customer problems, product strategy, and roadmap leadership", ["product strategy", "leadership", "launch"]],
  ["project-manager-cv", "Project Manager", "scope, stakeholder alignment, and delivery control", ["PMP", "leadership", "delivery"]],
  ["business-analyst-cv", "Business Analyst", "requirements discovery, process improvement, and stakeholder translation", ["requirements", "process", "stakeholder"]],
  ["accountant-cv", "Accountant", "financial accuracy, controls, and reporting discipline", ["finance", "audit", "reporting"]],
  ["auditor-cv", "Auditor", "assurance work, control evaluation, and risk-based testing", ["audit", "risk", "governance"]],
  ["financial-analyst-cv", "Financial Analyst", "commercial analysis, forecasting, and management insight", ["finance", "forecasting", "analysis"]],
  ["credit-analyst-cv", "Credit Analyst", "borrower assessment, portfolio quality, and lending judgement", ["banking", "risk", "credit"]],
  ["risk-compliance-officer-cv", "Risk and Compliance Officer", "regulatory interpretation, monitoring, and control design", ["compliance", "risk", "banking"]],
  ["hr-manager-cv", "HR Manager", "people strategy, workforce capability, and policy leadership", ["human resources", "leadership", "people"]],
  ["hr-executive-cv", "HR Executive", "recruitment operations, employee support, and HR administration", ["human resources", "recruitment", "onboarding"]],
  ["recruiter-cv", "Recruiter", "talent sourcing, candidate assessment, and hiring-partner service", ["talent acquisition", "HR", "hiring"]],
  ["digital-marketing-specialist-cv", "Digital Marketing Specialist", "channel strategy, campaign optimisation, and audience growth", ["SEO", "social media", "marketing"]],
  ["brand-manager-cv", "Brand Manager", "brand strategy, market insight, and campaign leadership", ["marketing", "FMCG", "brand"]],
  ["sales-manager-cv", "Sales Manager", "revenue leadership, pipeline discipline, and team performance", ["sales", "leadership", "revenue"]],
  ["business-development-executive-cv", "Business Development Executive", "opportunity creation, partnerships, and commercial follow-through", ["sales", "partnerships", "pipeline"]],
  ["customer-service-executive-cv", "Customer Service Executive", "customer resolution, service quality, and communication", ["customer service", "BPO", "support"]],
  ["operations-manager-cv", "Operations Manager", "process control, service delivery, and resource performance", ["operations", "leadership", "process"]],
  ["supply-chain-manager-cv", "Supply Chain Manager", "planning, supplier performance, and end-to-end flow", ["logistics", "procurement", "planning"]],
  ["procurement-officer-cv", "Procurement Officer", "sourcing discipline, vendor management, and commercial control", ["purchasing", "supply chain", "vendor"]],
  ["logistics-coordinator-cv", "Logistics Coordinator", "shipment visibility, documentation, and delivery coordination", ["shipping", "supply chain", "freight"]],
  ["civil-engineer-cv", "Civil Engineer", "site delivery, technical judgement, and construction coordination", ["construction", "engineering", "site"]],
  ["mechanical-engineer-cv", "Mechanical Engineer", "equipment reliability, design decisions, and maintenance improvement", ["maintenance", "engineering", "equipment"]],
  ["electrical-engineer-cv", "Electrical Engineer", "power systems, controls, and technical project delivery", ["power", "engineering", "controls"]],
  ["quantity-surveyor-cv", "Quantity Surveyor", "cost planning, measurement, and commercial contract control", ["construction", "cost", "contracts"]],
  ["architect-cv", "Architect", "design thinking, technical coordination, and client outcomes", ["design", "construction", "portfolio"]],
  ["nurse-cv", "Nurse", "patient care, clinical safety, and multidisciplinary contribution", ["healthcare", "foreign jobs", "clinical"]],
  ["pharmacist-cv", "Pharmacist", "medication safety, patient service, and regulatory accuracy", ["healthcare", "pharmaceutical", "compliance"]],
  ["medical-laboratory-technologist-cv", "Medical Laboratory Technologist", "diagnostic accuracy, laboratory systems, and quality assurance", ["healthcare", "diagnostics", "laboratory"]],
  ["teacher-cv", "Teacher", "student development, classroom practice, and curriculum delivery", ["education", "school", "teaching"]],
  ["lecturer-cv", "Lecturer", "subject expertise, teaching quality, and academic contribution", ["academic CV", "education", "research"]],
  ["hotel-manager-cv", "Hotel Manager", "guest experience, commercial performance, and hotel operations", ["hospitality", "tourism", "hotel"]],
  ["chef-cv", "Chef", "culinary leadership, kitchen systems, and guest value", ["hospitality", "foreign jobs", "culinary"]],
];

const industrySeeds: readonly GuideSeed[] = [
  ["apparel-garment-industry-cv", "Apparel and Garment Industry", "production, merchandising, quality, and export delivery", ["apparel", "garment", "merchandising"]],
  ["bpo-shared-services-cv", "BPO and Shared Services", "service operations, process discipline, and global-client communication", ["BPO", "shared services", "customer service"]],
  ["construction-industry-cv", "Construction Industry", "project delivery, safety, technical coordination, and commercial control", ["construction", "engineering", "project"]],
  ["fmcg-industry-cv", "FMCG Industry", "fast-moving commercial execution, distribution, and brand performance", ["FMCG", "sales", "marketing"]],
  ["telecommunications-industry-cv", "Telecommunications Industry", "network, digital product, customer, and commercial delivery", ["telecommunications", "technology", "network"]],
  ["insurance-industry-cv", "Insurance Industry", "risk assessment, customer protection, claims, and portfolio growth", ["insurance", "risk", "sales"]],
  ["renewable-energy-industry-cv", "Renewable Energy Industry", "clean-energy projects, technical delivery, and sustainability value", ["renewable energy", "sustainability", "engineering"]],
  ["manufacturing-industry-cv", "Manufacturing Industry", "production systems, quality, maintenance, and continuous improvement", ["manufacturing", "operations", "quality"]],
  ["export-import-industry-cv", "Export and Import Industry", "trade documentation, customer coordination, and shipment control", ["export", "shipping", "logistics"]],
  ["ngo-development-sector-cv", "NGO and Development Sector", "programme outcomes, community impact, donor accountability, and partnerships", ["NGO", "development", "project management"]],
  ["public-sector-cv", "Public Sector", "public-service responsibility, policy implementation, and accountable delivery", ["government jobs", "administration", "public service"]],
  ["hospitality-tourism-industry-cv", "Hospitality and Tourism Industry", "guest experience, revenue, service standards, and destination knowledge", ["hospitality", "tourism", "hotel"]],
  ["aviation-industry-cv", "Aviation Industry", "safety, passenger service, technical standards, and time-critical operations", ["aviation", "airline", "customer service"]],
  ["maritime-shipping-industry-cv", "Maritime and Shipping Industry", "vessel, port, freight, and documentation coordination", ["maritime", "shipping", "logistics"]],
  ["agriculture-agribusiness-cv", "Agriculture and Agribusiness", "production, value chains, field operations, and market access", ["agriculture", "agribusiness", "supply chain"]],
  ["education-sector-cv", "Education Sector", "learning outcomes, programme delivery, administration, and student support", ["education", "teacher", "academic"]],
  ["pharmaceutical-industry-cv", "Pharmaceutical Industry", "product knowledge, regulation, quality, and healthcare-market execution", ["pharmaceutical", "healthcare", "sales"]],
  ["retail-industry-cv", "Retail Industry", "store performance, customer experience, inventory, and team execution", ["retail", "sales", "customer service"]],
  ["real-estate-industry-cv", "Real Estate Industry", "property sales, client advisory, portfolio support, and transaction delivery", ["real estate", "property", "sales"]],
  ["startup-scaleup-cv", "Startup and Scale-up Careers", "ambiguity, ownership, experimentation, and rapid business building", ["startup", "entrepreneurship", "career change"]],
];

const careerSituationSeeds: readonly GuideSeed[] = [
  ["first-job-cv", "First Job CV", "education, projects, transferable skills, and early potential", ["fresh graduate", "student", "first job"]],
  ["career-break-cv", "CV After a Career Break", "career continuity, current readiness, and confident context", ["career break", "return to work", "gaps"]],
  ["career-change-cv", "Career Change CV", "transferable value, target-role relevance, and a credible transition story", ["career change", "transferable skills", "transition"]],
  ["promotion-ready-cv", "Promotion-ready CV", "leadership scope, expanded accountability, and next-level impact", ["promotion", "leadership", "career growth"]],
  ["redundancy-job-search-cv", "CV After Redundancy", "recent value, resilience, and forward-looking positioning", ["redundancy", "job search", "transition"]],
  ["return-to-work-cv", "Return-to-work CV", "updated capability, availability, and a clear re-entry target", ["return to work", "career break", "job search"]],
  ["no-experience-cv", "CV With No Formal Experience", "evidence of ability beyond paid employment", ["no experience", "student", "fresh graduate"]],
  ["employment-gap-cv", "CV With Employment Gaps", "transparent chronology, relevant activity, and current capability", ["employment gap", "CV gaps", "job search"]],
  ["remote-job-cv", "CV for Remote Jobs", "independent delivery, digital collaboration, and communication reliability", ["remote jobs", "work from home", "international"]],
  ["hybrid-job-cv", "CV for Hybrid Jobs", "self-management, office collaboration, and flexible execution", ["hybrid jobs", "workplace", "professional"]],
  ["government-job-cv", "CV for Government Jobs", "formal qualifications, public-service relevance, and accurate chronology", ["government jobs", "public sector", "Sri Lanka"]],
  ["internship-cv", "Internship CV", "learning agility, subject foundations, and practical motivation", ["internship", "student", "fresh graduate"]],
  ["management-trainee-cv", "Management Trainee CV", "leadership potential, commercial awareness, and structured learning", ["management trainee", "graduate jobs", "leadership"]],
  ["scholarship-application-cv", "Scholarship Application CV", "academic merit, community contribution, and future direction", ["scholarship", "academic", "student"]],
  ["academic-university-cv", "Academic CV for University Applications", "research, teaching, publications, and academic service", ["academic CV", "university", "research"]],
  ["freelancer-to-full-time-cv", "Freelancer-to-full-time CV", "client work as structured professional experience", ["freelancer", "portfolio", "career change"]],
  ["contract-professional-cv", "CV for Contract Professionals", "project continuity, assignment value, and fast integration", ["contract jobs", "project", "professional"]],
  ["overqualified-candidate-cv", "CV for Overqualified Candidates", "role motivation, relevant scope, and right-sized positioning", ["overqualified", "job search", "transition"]],
  ["multiple-career-paths-cv", "CV for Multiple Career Paths", "a focused version for each target instead of one broad document", ["targeted CV", "career change", "multiple roles"]],
  ["mid-career-move-cv", "Mid-career Move CV", "depth without overload, leadership growth, and a clear next step", ["mid career", "professional", "career growth"]],
];

const linkedinSeeds: readonly GuideSeed[] = [
  ["linkedin-headline", "LinkedIn Headline", "role clarity, searchable expertise, and a concise value promise", ["LinkedIn SEO", "headline", "branding"]],
  ["linkedin-about-section", "LinkedIn About Section", "a credible professional story with keywords and proof", ["LinkedIn profile", "about", "branding"]],
  ["linkedin-experience-section", "LinkedIn Experience Section", "achievement-led role descriptions that support recruiter scanning", ["experience", "achievements", "profile"]],
  ["linkedin-skills-keywords", "LinkedIn Skills and Keywords", "search relevance without keyword stuffing", ["skills", "keywords", "visibility"]],
  ["linkedin-job-search-profile", "LinkedIn Profile for Job Search", "a profile aligned to target vacancies and recruiter discovery", ["job search", "recruiter", "optimization"]],
  ["linkedin-executive-profile", "Executive LinkedIn Profile", "leadership authority, strategic impact, and board-level credibility", ["executive", "leadership", "branding"]],
  ["linkedin-fresh-graduate-profile", "Fresh Graduate LinkedIn Profile", "potential, practical learning, and an accessible first professional brand", ["fresh graduate", "student", "job search"]],
  ["linkedin-freelancer-profile", "Freelancer LinkedIn Profile", "service clarity, proof of work, and client trust", ["freelancer", "personal brand", "clients"]],
  ["linkedin-overseas-job-profile", "LinkedIn Profile for Overseas Jobs", "internationally clear skills, location intent, and market-relevant keywords", ["overseas jobs", "international", "profile"]],
  ["linkedin-recruiter-visibility", "LinkedIn Recruiter Visibility", "profile completeness, search relevance, and trustworthy activity", ["recruiter visibility", "LinkedIn SEO", "optimization"]],
];

const applicationSeeds: readonly GuideSeed[] = [
  ["fresh-graduate-cover-letter", "Fresh Graduate Cover Letter", "motivation, role understanding, and evidence beyond experience", ["first job", "cover letter", "graduate"]],
  ["professional-cover-letter", "Professional Cover Letter", "target-role relevance, selected achievements, and a confident reason for moving", ["job application", "career move", "cover letter"]],
  ["career-change-cover-letter", "Career Change Cover Letter", "transition logic and transferable value that a CV cannot fully explain", ["career transition", "cover letter", "application"]],
  ["overseas-job-cover-letter", "Overseas Job Cover Letter", "international relevance, availability, and country-aware communication", ["foreign jobs", "international", "cover letter"]],
  ["management-role-cover-letter", "Management Role Cover Letter", "leadership judgement, team impact, and strategic relevance", ["management", "leadership", "application"]],
  ["ats-job-application", "ATS-friendly Job Application", "consistent keywords and evidence across the CV, letter, and form", ["ATS", "job description", "application"]],
  ["email-cv-to-recruiter", "Emailing a CV to a Recruiter", "a concise subject line, useful context, and professional attachment handling", ["recruiter email", "email CV", "application"]],
  ["selection-criteria-response", "Selection Criteria Response", "direct evidence against each requirement using structured examples", ["STAR method", "criteria", "application"]],
  ["job-application-portfolio", "Job Application Portfolio", "carefully selected work samples that support the target role", ["portfolio", "creative", "application"]],
  ["job-application-follow-up-email", "Job Application Follow-up Email", "respectful timing, clear context, and renewed interest without pressure", ["follow up", "recruiter", "application"]],
];

const signaturePackages = ["ats-cv-professional-founder-led", "ats-cv-student-supervised", "linkedin-professional-founder-led"];
const linkedinPackages = ["linkedin-student-founder-led", "linkedin-professional-founder-led", "linkedin-executive-founder-led"];
const applicationPackages = ["cover-letter-student-founder-led", "cover-letter-professional-founder-led", "ats-cv-professional-founder-led"];

function getClusterLabel(cluster: CvGuideCluster): string {
  if (cluster === "role") return "Role-specific CV Guides";
  if (cluster === "industry") return "Industry CV Guides";
  if (cluster === "career-situation") return "Career Situation Guides";
  if (cluster === "linkedin") return "LinkedIn Profile Guides";
  return "Job Application Guides";
}

function getTitle(cluster: CvGuideCluster, topic: string): string {
  if (cluster === "role") return `${topic} CV Writing Guide in Sri Lanka`;
  if (cluster === "industry") return `${topic} CV Guide for Sri Lankan Professionals`;
  if (cluster === "career-situation") return `${topic}: A Practical Sri Lankan CV Guide`;
  if (cluster === "linkedin") return `${topic} Guide for Sri Lankan Professionals`;
  return `${topic} Guide for Sri Lankan Job Seekers`;
}

function getMetaDescription(cluster: CvGuideCluster, topic: string): string {
  if (cluster === "linkedin") return `${topic} guide with practical LinkedIn SEO, recruiter visibility, profile writing, and personal-brand advice from Chanuka Jeewantha.`;
  if (cluster === "application") return `${topic} guide with practical structure, ATS-aware advice, evidence selection, and professional application support from Chanuka Jeewantha.`;
  if (cluster === "industry") return `Practical ${topic} CV guide covering ATS structure, sector keywords, measurable achievements, and recruiter-ready positioning by Chanuka Jeewantha.`;
  return `${topic} guide with ATS structure, achievement evidence, role-specific keywords, and expert CV guidance from Chanuka Jeewantha in Sri Lanka.`;
}

function getAudience(cluster: CvGuideCluster, topic: string): string[] {
  if (cluster === "industry") return [
    `Professionals already working in the ${topic.toLowerCase()}`,
    `Candidates moving into the sector with relevant transferable experience`,
    `Sri Lankan applicants targeting regional or global employers in this industry`,
  ];
  if (cluster === "career-situation") return [
    `Sri Lankan job seekers currently dealing with ${topic.toLowerCase()}`,
    `Candidates who are unsure how much context to include in the CV`,
    `Applicants who need a focused document for local or overseas opportunities`,
  ];
  if (cluster === "linkedin") return [
    `Professionals who want stronger recruiter discovery on LinkedIn`,
    `Job seekers whose profile is incomplete or inconsistent with their CV`,
    `Sri Lankan candidates building visibility for local, remote, or overseas roles`,
  ];
  if (cluster === "application") return [
    `Sri Lankan applicants who want a more professional application`,
    `Candidates applying to competitive local or overseas vacancies`,
    `Job seekers using generic templates with weak role alignment`,
  ];
  return [
    `${topic} professionals preparing for a focused career move`,
    `Candidates applying for local, remote, or overseas ${topic.toLowerCase()} roles`,
    `Applicants whose current CV lists duties but does not demonstrate professional value`,
  ];
}

function getLocalInsight(cluster: CvGuideCluster, topic: string, angle: string): string {
  if (cluster === "industry") return `Sri Lankan employers in the ${topic.toLowerCase()} range from local organisations to export businesses and multinational groups. The CV should make operating scale and contribution to ${angle} explicit instead of relying on the employer name alone.`;
  if (cluster === "career-situation") return `Sri Lankan candidates receive conflicting advice about ${topic.toLowerCase()}. The safest strategy is accurate chronology, clear relevance, and evidence of current capability rather than exaggerated titles or unexplained gaps.`;
  if (cluster === "linkedin") return `LinkedIn usage among Sri Lankan recruiters varies by sector, but ${topic.toLowerCase()} is especially relevant for professional, technology, leadership, remote, and overseas searches when it is supported by credible evidence.`;
  if (cluster === "application") return `Sri Lankan applicants often reuse one generic message for many vacancies. A shorter, role-specific ${topic.toLowerCase()} creates more trust because it demonstrates attention, relevance, and communication quality.`;
  return `Sri Lankan ${topic.toLowerCase()} vacancies often combine broad responsibilities under one title. A quality CV separates routine work from higher-value contribution to ${angle}, making both relevance and progression easier to assess.`;
}

function getFaqs(cluster: CvGuideCluster, topic: string): CvGuideFaq[] {
  if (cluster === "linkedin") return [
    { question: `How often should I update my ${topic.toLowerCase()}?`, answer: "Review it after a role change, major project, qualification, or change in target market. A quarterly check is useful during an active job search." },
    { question: "Should LinkedIn copy match the CV exactly?", answer: "The facts should match, but LinkedIn can be more conversational and provide selected context. The strategic direction should remain consistent." },
    { question: "Can keywords alone improve recruiter visibility?", answer: "Keywords help discovery, but profile completeness, credible evidence, network relevance, and professional activity also influence results." },
  ];
  if (cluster === "application") return [
    { question: `Can I reuse the same ${topic.toLowerCase()}?`, answer: "Keep a strong master version, but change the employer context, role evidence, keywords, and motivation for each meaningful application." },
    { question: "How long should it be?", answer: "Use the shortest length that answers the employer's need. Cover letters are normally one page; emails and follow-ups should be much shorter." },
    { question: "Should AI-written text be submitted without editing?", answer: "No. Verify every fact, remove generic language, add real evidence, and adjust the tone so it accurately represents you." },
  ];
  if (cluster === "career-situation") return [
    { question: `Should I explain ${topic.toLowerCase()} in the CV?`, answer: "Include only the context a recruiter genuinely needs. A short, factual explanation is stronger than either hiding the issue or writing a long personal account." },
    { question: "Will an ATS reject this automatically?", answer: "ATS tools mainly parse structure and keywords. Recruiter decisions still depend on relevance, evidence, chronology, and vacancy requirements." },
    { question: "Can one version be used for every application?", answer: "No. Keep a master document, but tailor the profile, keywords, and evidence for materially different target roles." },
  ];
  return [
    { question: `How long should a ${topic} CV be?`, answer: "Most candidates are best served by a focused two-page CV. Extra space is useful only when every section adds relevant evidence." },
    { question: "Should every skill and tool be listed?", answer: "No. Prioritise skills requested by target roles and connect important ones to real work, projects, or measurable outcomes." },
    { question: "Can Chanuka tailor this CV for overseas jobs?", answer: "Yes. Structure, terminology, and emphasis can be adjusted for the target country while keeping the candidate's experience accurate." },
  ];
}

function buildGuidePage(seed: GuideSeed, cluster: CvGuideCluster, index: number): CvGuidePage {
  const [key, topic, angle, terms] = seed;
  const proof = terms.join(", ");
  const isProfile = cluster === "linkedin";
  const isApplication = cluster === "application";
  const documentName = isProfile ? "profile" : isApplication ? "application" : "CV";
  const primaryKeyword = cluster === "role" || cluster === "industry" ? `${topic} CV Sri Lanka` : `${topic} Sri Lanka`;

  return {
    slug: `${key}-guide-sri-lanka`,
    cluster,
    clusterLabel: getClusterLabel(cluster),
    title: getTitle(cluster, topic),
    shortTitle: topic,
    subtitle: `A practical guide to presenting ${angle} with clear evidence, search relevance, and professional credibility.`,
    metaDescription: getMetaDescription(cluster, topic),
    primaryKeyword,
    secondaryKeywords: [`${topic} example`, `${topic} writing help`, "professional CV writer Sri Lanka", ...terms],
    heroImage: heroImages[index % heroImages.length],
    intro: [
      `A strong ${topic.toLowerCase()} should translate ${angle} into evidence a recruiter can assess quickly. It should not read like a copied template or a list of claims without context.`,
      `Chanuka Jeewantha's approach connects the target opportunity to proof involving ${proof}. This gives Sri Lankan candidates a clearer professional story for local and international applications.`,
    ],
    audience: getAudience(cluster, topic),
    challenges: [
      `Explaining ${angle} without generic responsibility statements`,
      `Selecting credible proof from ${proof} while keeping the ${documentName} concise`,
      `Balancing ATS or platform terminology with a natural story a decision-maker can understand`,
    ],
    recommendations: [
      `Start with a specific target and make ${angle} visible in the opening section.`,
      `Use evidence connected to ${proof}, adding numbers, scale, or before-and-after context wherever accurate.`,
      `Mirror suitable vacancy language while preserving honest titles, dates, qualifications, and outcomes.`,
    ],
    evidenceExamples: [
      "Scale: team size, project value, customer volume, system reach, territory, or workload handled",
      `Change: measurable improvement connected to ${angle}`,
      `Credibility: qualifications, tools, sector knowledge, promotions, awards, or complex work involving ${proof}`,
    ],
    localInsight: getLocalInsight(cluster, topic, angle),
    articleTerms: [topic, ...terms, isProfile ? "LinkedIn" : "CV", "job search"],
    relatedPackageSlugs: isProfile ? [...linkedinPackages] : isApplication ? [...applicationPackages] : [...signaturePackages],
    faqs: getFaqs(cluster, topic),
  };
}

export const cvGuidePages: CvGuidePage[] = [
  ...roleSeeds.map((seed, index) => buildGuidePage(seed, "role", index)),
  ...industrySeeds.map((seed, index) => buildGuidePage(seed, "industry", roleSeeds.length + index)),
  ...careerSituationSeeds.map((seed, index) => buildGuidePage(seed, "career-situation", roleSeeds.length + industrySeeds.length + index)),
  ...linkedinSeeds.map((seed, index) => buildGuidePage(seed, "linkedin", 80 + index)),
  ...applicationSeeds.map((seed, index) => buildGuidePage(seed, "application", 90 + index)),
];

export const cvGuidePagesBySlug: Record<string, CvGuidePage> = Object.fromEntries(cvGuidePages.map((page) => [page.slug, page]));
export const cvGuideClusterOrder: CvGuideCluster[] = ["role", "industry", "career-situation", "linkedin", "application"];

export function getCvGuidePageBySlug(slug: string): CvGuidePage | undefined {
  return cvGuidePagesBySlug[slug];
}

export function getCvGuidesByCluster(cluster: CvGuideCluster): CvGuidePage[] {
  return cvGuidePages.filter((page) => page.cluster === cluster);
}

const stopWords = new Set(["a", "an", "and", "for", "from", "guide", "in", "job", "of", "on", "or", "sri", "lanka", "the", "to", "with"]);

function tokenize(value: string): string[] {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter((token) => token.length > 2 && !stopWords.has(token));
}

export function getRelatedBlogPostsForGuide(page: CvGuidePage, posts: BlogPost[], limit = 6): BlogPost[] {
  const guideTokens = new Set(tokenize([page.primaryKeyword, ...page.secondaryKeywords, ...page.articleTerms].join(" ")));
  const scored = posts.map((post, index) => {
    const scoreTokens = (value: string, weight: number) => tokenize(value).reduce((score, token) => score + (guideTokens.has(token) ? weight : 0), 0);
    const score = scoreTokens(post.title, 6) + scoreTokens(post.category, 4) + scoreTokens((post.keywords ?? []).join(" "), 3) + scoreTokens(post.excerpt, 1);
    return { post, score, index };
  }).sort((a, b) => b.score - a.score || a.index - b.index);

  const selected = scored.filter((item) => item.score > 0).slice(0, limit);
  const selectedSlugs = new Set(selected.map((item) => item.post.slug));
  for (const item of scored) {
    if (selected.length >= limit) break;
    if (!selectedSlugs.has(item.post.slug)) {
      selected.push(item);
      selectedSlugs.add(item.post.slug);
    }
  }
  return selected.map((item) => item.post);
}
