export type CountryJobMarket = {
  slug: string;
  name: string;
  destinationLabel: string;
  region: string;
  documentName: "CV" | "resume" | "CV or resume";
  coverImage?: string;
  heroLine: string;
  metaDescription: string;
  keywords: string[];
  marketOverview: string;
  documentGuidance: string;
  hiringPriorities: string[];
  sectors: string[];
  languageNote: string;
  applicationNotes: string[];
  relatedSlugs: string[];
};

export const countryJobMarkets: CountryJobMarket[] = [
  {
    slug: "dubai",
    name: "Dubai",
    destinationLabel: "Dubai job market",
    region: "GCC",
    documentName: "CV",
    coverImage: "/images/dubai-job-cv-cover-chanuka-jeewantha.jpg",
    heroLine: "Build a Dubai-ready career profile before you leave Sri Lanka",
    metaDescription:
      "Dubai CV writing, cover letter and LinkedIn optimization for Sri Lankans applying for UAE jobs. Compare every foreign-job service price in LKR.",
    keywords: ["Dubai CV writing Sri Lanka", "Dubai jobs for Sri Lankans", "UAE foreign job CV", "Dubai LinkedIn optimization"],
    marketOverview:
      "Dubai attracts applications from across the world, so a recruiter may compare your profile with candidates already in the UAE and applicants from several other markets. Your documents must make your role, level, achievements and industry fit clear without relying on a recruiter to interpret Sri Lankan job titles.",
    documentGuidance:
      "Use a clean ATS-readable CV, lead with a focused target role, and translate local experience into results that travel across borders. Include location, availability and work-authorisation details only when accurate and useful to the vacancy.",
    hiringPriorities: ["Immediate role relevance", "GCC-transferable achievements", "Clear availability and contact details", "Keywords matched to the advertised function"],
    sectors: ["Hospitality and tourism", "Construction and engineering", "Logistics and supply chain", "Finance and accounting", "Sales and retail", "Technology and digital"],
    languageNote:
      "English is widely used in professional recruitment. Arabic can be an advantage for selected roles, but it should only be claimed at your genuine proficiency level.",
    applicationNotes: ["Target Dubai roles by function and seniority, not only by broad industry.", "Keep one master CV and tailor the opening profile and keywords for each vacancy.", "Align LinkedIn with the same target title used in your CV.", "Verify employer, offer and visa information through official channels before paying any third party."],
    relatedSlugs: ["uae", "qatar", "saudi-arabia", "oman"],
  },
  {
    slug: "australia",
    name: "Australia",
    destinationLabel: "Australian job market",
    region: "Oceania",
    documentName: "resume",
    heroLine: "Present your Sri Lankan experience in an Australian-ready resume",
    metaDescription:
      "Australia resume writing, cover letter and LinkedIn optimization for Sri Lankans seeking jobs overseas. View foreign-job package prices for every career level.",
    keywords: ["Australia resume writing Sri Lanka", "Australia jobs for Sri Lankans", "Australian resume service", "Australia LinkedIn optimization"],
    marketOverview:
      "Australian employers generally expect direct evidence of impact, clear employment dates and a resume tailored to the role. Sri Lankan candidates benefit when local organisations, qualifications and responsibilities are explained in language an Australian hiring manager can understand quickly.",
    documentGuidance:
      "A concise achievement-led resume is usually more effective than a document filled with personal details. Prioritise measurable results, relevant licences or certifications, and responsibilities that match the advertised position.",
    hiringPriorities: ["Evidence-based achievements", "Role-specific capabilities", "Clear and consistent career history", "Professional written communication"],
    sectors: ["Healthcare and aged care", "Engineering and construction", "Information technology", "Accounting and finance", "Education", "Hospitality and skilled trades"],
    languageNote:
      "Use clear Australian or international English consistently. Requirements for registration, skills assessment or English testing are separate from CV writing and should be checked with the relevant official body.",
    applicationNotes: ["Read the selection criteria and position description before tailoring.", "Use a role-specific cover letter that connects your evidence to the employer's needs.", "Keep LinkedIn achievements consistent with the resume.", "Check occupation, licensing and work-right requirements before building an application plan."],
    relatedSlugs: ["new-zealand", "canada", "united-kingdom", "singapore"],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    destinationLabel: "New Zealand job market",
    region: "Oceania",
    documentName: "CV",
    heroLine: "Create a focused New Zealand job application from Sri Lanka",
    metaDescription:
      "New Zealand CV writing, cover letters and LinkedIn optimization for Sri Lankan job seekers. Compare foreign-job prices for students, professionals and executives.",
    keywords: ["New Zealand CV writing Sri Lanka", "New Zealand jobs for Sri Lankans", "NZ CV service", "New Zealand cover letter"],
    marketOverview:
      "New Zealand employers often value practical capability, reliability and clear evidence that a candidate understands the role. An overseas application works harder when it explains transferable experience and avoids assumptions about Sri Lankan employers or qualifications.",
    documentGuidance:
      "Build a readable, role-targeted CV with a short professional profile, relevant skills and accomplishment-focused employment history. Keep personal information limited and make referees available only when appropriate.",
    hiringPriorities: ["Practical role fit", "Reliable employment evidence", "Transferable qualifications and licences", "Clear motivation for the target role"],
    sectors: ["Healthcare", "Construction and trades", "Agriculture and food production", "Engineering", "Information technology", "Hospitality and tourism"],
    languageNote:
      "Professional applications are normally prepared in English. Registration, licensing and English-language evidence can vary by occupation and must be verified separately.",
    applicationNotes: ["Research employers and regions where your occupation is genuinely needed.", "Tailor the CV and cover letter to the wording of each role.", "Explain unfamiliar Sri Lankan qualifications briefly and accurately.", "Confirm immigration and professional-registration requirements through official New Zealand sources."],
    relatedSlugs: ["australia", "canada", "united-kingdom", "finland"],
  },
  {
    slug: "canada",
    name: "Canada",
    destinationLabel: "Canadian job market",
    region: "North America",
    documentName: "resume",
    heroLine: "Turn Sri Lankan experience into a Canadian-ready professional profile",
    metaDescription:
      "Canada resume writing, cover letter and LinkedIn optimization for Sri Lankans applying overseas. See all foreign-job service prices by experience and tier.",
    keywords: ["Canada resume writing Sri Lanka", "Canada jobs for Sri Lankans", "Canadian resume service", "Canada LinkedIn optimization"],
    marketOverview:
      "Canadian recruiters typically need a clear, concise explanation of what you achieved and how your experience fits the advertised role. A strong overseas application removes unnecessary personal details and makes unfamiliar Sri Lankan experience easy to evaluate.",
    documentGuidance:
      "Use a targeted resume rather than a biography. Lead with relevant capabilities, quantify results where evidence exists, and avoid photographs or protected personal characteristics that are not part of the hiring decision.",
    hiringPriorities: ["Transferable results", "Occupation-specific keywords", "Readable reverse-chronological history", "Clear professional communication"],
    sectors: ["Technology", "Healthcare", "Engineering", "Finance and insurance", "Construction and trades", "Logistics and transportation"],
    languageNote:
      "English or French requirements depend on the province, employer and role. Your application should only claim language ability you can demonstrate.",
    applicationNotes: ["Choose a province and occupation focus before rewriting the resume.", "Match the summary and skills section to each job description.", "Use a concise cover letter to explain fit without repeating the resume.", "Treat immigration eligibility, credential recognition and licensing as separate official processes."],
    relatedSlugs: ["united-states", "united-kingdom", "australia", "finland"],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    destinationLabel: "UK job market",
    region: "Europe",
    documentName: "CV",
    heroLine: "Position your experience for UK employers before migrating",
    metaDescription:
      "UK CV writing, cover letters and LinkedIn optimization for Sri Lankans seeking United Kingdom jobs. Compare all overseas-job package prices in LKR.",
    keywords: ["UK CV writing Sri Lanka", "United Kingdom jobs for Sri Lankans", "British CV service", "UK cover letter writing"],
    marketOverview:
      "UK employers usually expect an application that is concise, evidence-led and closely matched to the vacancy. Sri Lankan candidates can improve clarity by translating local titles, qualifications and achievements into terminology that fits the UK role.",
    documentGuidance:
      "Use a professional CV without a photo or unnecessary personal details. Show outcomes, scope and progression, and tailor the personal profile and key skills to the employer's essential criteria.",
    hiringPriorities: ["Evidence against essential criteria", "Concise career history", "Relevant qualifications and registration", "Strong written English"],
    sectors: ["Healthcare and social care", "Information technology", "Engineering", "Finance and accounting", "Education", "Hospitality and logistics"],
    languageNote:
      "Use consistent British English where practical. Some regulated roles require specific registration or language evidence, which must be confirmed with the official regulator.",
    applicationNotes: ["Separate essential from desirable criteria in the vacancy.", "Use the cover letter or supporting statement to evidence the strongest criteria.", "Keep CV and LinkedIn dates, titles and achievements consistent.", "Check sponsorship, occupation and regulatory requirements before applying."],
    relatedSlugs: ["canada", "australia", "italy", "finland"],
  },
  {
    slug: "singapore",
    name: "Singapore",
    destinationLabel: "Singapore job market",
    region: "Asia",
    documentName: "resume",
    heroLine: "Compete for Singapore roles with a precise, value-led resume",
    metaDescription:
      "Singapore resume writing, cover letter and LinkedIn optimization for Sri Lankan professionals. View all foreign-job CV service prices by career level.",
    keywords: ["Singapore resume writing Sri Lanka", "Singapore jobs for Sri Lankans", "Singapore CV service", "Singapore LinkedIn optimization"],
    marketOverview:
      "Singapore is a compact, internationally competitive market where employers can compare regional and global talent. Your application needs to show specialist value, measurable performance and a credible match to the advertised seniority.",
    documentGuidance:
      "Use a concise resume with strong role keywords, quantified outcomes and a clear professional headline. Avoid generic career objectives and give priority to experience that demonstrates business impact.",
    hiringPriorities: ["Specialist capability", "Measurable commercial impact", "Regional or international exposure", "Clear seniority and role alignment"],
    sectors: ["Financial services", "Technology and data", "Logistics and maritime", "Engineering", "Healthcare and life sciences", "Sales and regional operations"],
    languageNote:
      "English is the main language of many professional applications. Additional Asian-language ability can help in selected positions when it is genuinely relevant.",
    applicationNotes: ["Focus on roles where your specialist experience is easy to evidence.", "Use numbers to show scale, efficiency, revenue or risk impact.", "Optimise LinkedIn for the same function and seniority.", "Review current work-pass and eligibility information through official Singapore channels."],
    relatedSlugs: ["maldives", "vietnam", "australia", "uae"],
  },
  {
    slug: "maldives",
    name: "Maldives",
    destinationLabel: "Maldives job market",
    region: "South Asia",
    documentName: "CV",
    heroLine: "Show Maldives employers that you are ready to contribute from day one",
    metaDescription:
      "Maldives CV writing, cover letters and LinkedIn optimization for Sri Lankans applying for resort and professional jobs. Compare every package price.",
    keywords: ["Maldives CV writing Sri Lanka", "Maldives jobs for Sri Lankans", "resort CV writing", "Maldives foreign job CV"],
    marketOverview:
      "The Maldives is close to Sri Lanka but overseas recruitment still requires a focused application. Employers need to see service standards, reliability, language ability and direct relevance to resort, island or corporate operations.",
    documentGuidance:
      "Use a clean CV that highlights customer service, operational standards, safety, technical capability and previous international or remote-site experience where relevant. Make availability and verified certifications easy to find.",
    hiringPriorities: ["Guest-service standards", "Operational reliability", "Relevant technical or hospitality skills", "Readiness for island-based work"],
    sectors: ["Resorts and hotels", "Food and beverage", "Marine and diving services", "Engineering and maintenance", "Finance and administration", "Healthcare and education"],
    languageNote:
      "English is important for many tourism and professional roles. Other languages can be valuable for guest-facing work when your proficiency is accurate.",
    applicationNotes: ["Identify whether the role is resort-based, island-based or in Malé.", "Highlight service metrics, safety practices and relevant systems.", "Use the cover letter to explain availability and motivation.", "Verify contracts, accommodation, benefits and work-permit arrangements with the employer."],
    relatedSlugs: ["singapore", "uae", "qatar", "oman"],
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    destinationLabel: "Vietnamese job market",
    region: "Southeast Asia",
    documentName: "CV",
    heroLine: "Package your international value for employers in Vietnam",
    metaDescription:
      "Vietnam CV writing, cover letter and LinkedIn optimization for Sri Lankans seeking overseas roles. See foreign-job service prices for all experience levels.",
    keywords: ["Vietnam CV writing Sri Lanka", "Vietnam jobs for Sri Lankans", "Vietnam foreign job CV", "Vietnam LinkedIn optimization"],
    marketOverview:
      "Vietnam combines fast-growing local businesses with multinational employers. Sri Lankan applicants need to show why their expertise, international perspective or specialist experience adds value beyond what is available locally.",
    documentGuidance:
      "Prepare an English CV for multinational and English-speaking roles, centred on relevant achievements and technical strengths. Keep formatting simple and make industry, employer scale and project outcomes understandable.",
    hiringPriorities: ["Specialist or international expertise", "Adaptability across cultures", "Project and business outcomes", "Clear communication"],
    sectors: ["Manufacturing", "Technology", "Education and training", "Hospitality and tourism", "Logistics", "Sales and business development"],
    languageNote:
      "English may be suitable for multinational or English-language roles; Vietnamese can be required or strongly preferred elsewhere. Follow the vacancy language and never overstate proficiency.",
    applicationNotes: ["Prioritise multinational, regional and specialist vacancies.", "Explain the scale and industry of Sri Lankan employers when unfamiliar.", "Show cross-cultural work, training or stakeholder experience.", "Confirm contract and work-permit requirements with official sources and the hiring employer."],
    relatedSlugs: ["singapore", "maldives", "australia", "finland"],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    destinationLabel: "Saudi job market",
    region: "GCC",
    documentName: "CV",
    heroLine: "Position your expertise for Saudi employers and major projects",
    metaDescription:
      "Saudi Arabia CV writing, cover letters and LinkedIn optimization for Sri Lankans applying for jobs. Compare all foreign-job CV package prices in LKR.",
    keywords: ["Saudi Arabia CV writing Sri Lanka", "Saudi jobs for Sri Lankans", "KSA CV service", "Saudi LinkedIn optimization"],
    marketOverview:
      "Saudi employers recruit across large projects, established industries and expanding private-sector functions. A Sri Lankan applicant needs to present technical depth, scale, safety, leadership and measurable delivery in terminology relevant to the target role.",
    documentGuidance:
      "Use an ATS-readable CV with a strong target title and evidence of project value, team size, budgets, systems or operational results where applicable. Keep personal and availability details accurate and concise.",
    hiringPriorities: ["Technical depth", "Project scale and delivery", "Safety and compliance", "Leadership or team contribution"],
    sectors: ["Construction and infrastructure", "Engineering and energy", "Healthcare", "Hospitality and tourism", "Technology", "Finance and operations"],
    languageNote:
      "English is used in many professional environments, while Arabic can be required or preferred for selected roles. State proficiency honestly.",
    applicationNotes: ["Match your CV to the exact discipline and project environment.", "Quantify scale, cost, productivity, quality and safety outcomes.", "Use LinkedIn to reinforce technical keywords and leadership scope.", "Verify employer, contract and work-visa details through official channels."],
    relatedSlugs: ["uae", "qatar", "kuwait", "bahrain"],
  },
  {
    slug: "kuwait",
    name: "Kuwait",
    destinationLabel: "Kuwait job market",
    region: "GCC",
    documentName: "CV",
    heroLine: "Make your Sri Lankan career experience clear to Kuwait recruiters",
    metaDescription:
      "Kuwait CV writing, cover letters and LinkedIn optimization for Sri Lankan job seekers. View every foreign-job service package and price by career level.",
    keywords: ["Kuwait CV writing Sri Lanka", "Kuwait jobs for Sri Lankans", "Kuwait foreign job CV", "Gulf CV service"],
    marketOverview:
      "Kuwait employers often recruit internationally for technical, operational, healthcare and commercial roles. Your application should make your exact function, industry experience and practical contribution visible within the first page.",
    documentGuidance:
      "Use a focused CV with clear titles, employment dates and role-relevant achievements. Translate Sri Lankan organisational context into scale, responsibilities and results that a Kuwait recruiter can assess.",
    hiringPriorities: ["Direct functional experience", "Stable and clear work history", "Relevant licences or certifications", "Operational results"],
    sectors: ["Oil and gas services", "Engineering and construction", "Healthcare", "Retail and sales", "Finance and administration", "Hospitality and facilities"],
    languageNote:
      "English is common in many expatriate professional settings; Arabic can be useful or required depending on the employer and customer contact.",
    applicationNotes: ["Apply to a defined role family rather than unrelated vacancies.", "Put the most relevant experience and certifications near the top.", "Tailor the cover letter to the employer and vacancy.", "Confirm offer authenticity, benefits and work-permit arrangements before making commitments."],
    relatedSlugs: ["saudi-arabia", "qatar", "bahrain", "uae"],
  },
  {
    slug: "qatar",
    name: "Qatar",
    destinationLabel: "Qatar job market",
    region: "GCC",
    documentName: "CV",
    heroLine: "Build a Qatar-targeted profile with evidence recruiters can trust",
    metaDescription:
      "Qatar CV writing, cover letters and LinkedIn optimization for Sri Lankans targeting overseas jobs. Compare foreign-job prices across all career levels.",
    keywords: ["Qatar CV writing Sri Lanka", "Qatar jobs for Sri Lankans", "Qatar foreign job CV", "Doha LinkedIn optimization"],
    marketOverview:
      "Qatar's international workforce creates strong competition across professional and operational vacancies. Applicants from Sri Lanka stand out when their CV explains sector knowledge, project contribution, service standards and measurable performance.",
    documentGuidance:
      "Use a concise ATS-friendly CV with a target title, relevant technical keywords and evidence of outcomes. For project-based work, show project type, scope, client environment and your specific contribution without disclosing confidential information.",
    hiringPriorities: ["Relevant sector experience", "Project or service quality", "Safety and compliance awareness", "Clear professional communication"],
    sectors: ["Construction and engineering", "Energy and utilities", "Aviation and logistics", "Hospitality", "Healthcare", "Finance and professional services"],
    languageNote:
      "English is widely used in international workplaces; Arabic may strengthen selected customer-facing or public-sector applications.",
    applicationNotes: ["Tailor project and sector keywords to the vacancy.", "Show scope through defensible numbers and outcomes.", "Keep LinkedIn, CV and application-form details consistent.", "Use official sources to verify employer, visa and professional-registration requirements."],
    relatedSlugs: ["uae", "saudi-arabia", "kuwait", "oman"],
  },
  {
    slug: "oman",
    name: "Oman",
    destinationLabel: "Oman job market",
    region: "GCC",
    documentName: "CV",
    heroLine: "Present a credible, role-focused CV for Oman opportunities",
    metaDescription:
      "Oman CV writing, cover letters and LinkedIn optimization for Sri Lankans applying for Gulf jobs. Compare all overseas CV service prices in LKR.",
    keywords: ["Oman CV writing Sri Lanka", "Oman jobs for Sri Lankans", "Oman foreign job CV", "Muscat CV service"],
    marketOverview:
      "Oman employers recruiting overseas candidates need a clear reason to shortlist someone outside the country. Your CV should demonstrate relevant technical or service experience, reliability and a realistic match to the advertised position.",
    documentGuidance:
      "Keep the CV structured and factual, with the strongest target-role evidence on page one. Highlight industry systems, certifications, safety practices and achievements that can transfer to the Omani workplace.",
    hiringPriorities: ["Role-specific experience", "Reliability and continuity", "Technical standards and safety", "Customer or operational outcomes"],
    sectors: ["Energy and engineering", "Construction", "Logistics and ports", "Hospitality and tourism", "Healthcare", "Finance and administration"],
    languageNote:
      "English is used in many professional and expatriate workplaces. Arabic is valuable in some roles, especially those involving local customers or authorities.",
    applicationNotes: ["Research the employer and location before tailoring.", "Highlight relevant equipment, systems, standards and licences.", "Use a concise cover letter to explain your overseas application.", "Confirm the complete employment package and work-authorisation process independently."],
    relatedSlugs: ["uae", "qatar", "bahrain", "maldives"],
  },
  {
    slug: "bahrain",
    name: "Bahrain",
    destinationLabel: "Bahrain job market",
    region: "GCC",
    documentName: "CV",
    heroLine: "Compete in Bahrain with a concise international career profile",
    metaDescription:
      "Bahrain CV writing, cover letters and LinkedIn optimization for Sri Lankans seeking GCC jobs. See all foreign-job prices by experience and service tier.",
    keywords: ["Bahrain CV writing Sri Lanka", "Bahrain jobs for Sri Lankans", "Bahrain foreign job CV", "GCC LinkedIn optimization"],
    marketOverview:
      "Bahrain is a smaller GCC market, so broad generic applications can struggle. A focused profile that connects your Sri Lankan experience to a specific banking, services, industrial or hospitality need is easier for recruiters to assess.",
    documentGuidance:
      "Use a streamlined CV with a clear target role, relevant systems and evidence of business or service results. Remove content that does not support the vacancy and keep employment information consistent.",
    hiringPriorities: ["Specialised role fit", "Commercial or service outcomes", "Relevant systems knowledge", "Clear international communication"],
    sectors: ["Banking and financial services", "Hospitality", "Engineering and industrial services", "Information technology", "Healthcare", "Retail and customer operations"],
    languageNote:
      "English is common in many professional environments; Arabic can be helpful for local-market and customer-facing roles.",
    applicationNotes: ["Narrow the search to roles matching your strongest evidence.", "Show knowledge of relevant systems, standards and customers.", "Use LinkedIn for recruiter discovery as well as direct applications.", "Verify employer and work-permit information before accepting an offer."],
    relatedSlugs: ["saudi-arabia", "qatar", "kuwait", "uae"],
  },
  {
    slug: "italy",
    name: "Italy",
    destinationLabel: "Italian job market",
    region: "Europe",
    documentName: "CV",
    heroLine: "Prepare a clear European-style application for jobs in Italy",
    metaDescription:
      "Italy CV writing, cover letters and LinkedIn optimization for Sri Lankans pursuing overseas jobs. Compare all foreign-job package prices in LKR.",
    keywords: ["Italy CV writing Sri Lanka", "Italy jobs for Sri Lankans", "Italian CV service", "Europe foreign job CV"],
    marketOverview:
      "Applications in Italy vary by sector and employer, with multinational companies often following international recruitment practices. Sri Lankan applicants should make qualifications, legal names of credentials and practical experience easy to understand.",
    documentGuidance:
      "Use a clean chronological CV tailored to the role. An English version may suit multinational employers, while an Italian version may be expected elsewhere; the vacancy should guide the language and format.",
    hiringPriorities: ["Relevant qualifications and experience", "Language fit for the workplace", "Clear employment chronology", "Practical and technical capability"],
    sectors: ["Hospitality and tourism", "Manufacturing", "Engineering", "Healthcare and care services", "Information technology", "Logistics and food production"],
    languageNote:
      "Italian is important for many local roles, while English may be accepted by multinational or specialist employers. A translated document should be reviewed by a competent language professional.",
    applicationNotes: ["Follow the language and document instructions in each vacancy.", "Explain Sri Lankan qualifications without claiming unverified equivalence.", "Tailor the cover letter to the employer and location.", "Check work rights, credential recognition and regulated-profession requirements officially."],
    relatedSlugs: ["finland", "united-kingdom", "canada", "australia"],
  },
  {
    slug: "united-states",
    name: "United States",
    destinationLabel: "US job market",
    region: "North America",
    documentName: "resume",
    heroLine: "Translate your achievements into a US-style professional resume",
    metaDescription:
      "United States resume writing, cover letters and LinkedIn optimization for Sri Lankans applying for US jobs. View all foreign-job service prices.",
    keywords: ["US resume writing Sri Lanka", "United States jobs for Sri Lankans", "American resume service", "US LinkedIn optimization"],
    marketOverview:
      "US hiring is highly role-specific and usually resume-led for private-sector jobs. Sri Lankan applicants need a concise value proposition, recognisable job-function language and strong evidence of outcomes rather than long responsibility lists.",
    documentGuidance:
      "Use a resume without a photograph, age, marital status or other unnecessary personal details. Prioritise achievements, keywords, relevant technology and scope; academic or research applications may follow different CV conventions.",
    hiringPriorities: ["Quantified achievements", "Exact role and skills alignment", "Concise one-to-two-page presentation", "Strong professional brand"],
    sectors: ["Technology", "Healthcare", "Engineering", "Finance", "Research and higher education", "Operations and supply chain"],
    languageNote:
      "Applications are generally prepared in clear US English. Licensing, credential evaluation and work authorisation vary significantly and sit outside the resume-writing service.",
    applicationNotes: ["Use the job description to identify required skills and outcomes.", "Lead bullets with action and business impact.", "Align LinkedIn headline, skills and experience with the target function.", "Confirm sponsorship, licensing and credential requirements before investing in an application."],
    relatedSlugs: ["canada", "united-kingdom", "australia", "singapore"],
  },
  {
    slug: "israel",
    name: "Israel",
    destinationLabel: "Israeli job market",
    region: "Middle East",
    documentName: "CV or resume",
    heroLine: "Build a factual, role-specific profile for employers in Israel",
    metaDescription:
      "Israel CV and resume writing, cover letters and LinkedIn optimization for Sri Lankans seeking overseas work. Compare all foreign-job service prices.",
    keywords: ["Israel CV writing Sri Lanka", "Israel jobs for Sri Lankans", "Israel resume service", "Israel foreign job CV"],
    marketOverview:
      "Opportunities and recruitment conditions in Israel can differ sharply by occupation, employer and current circumstances. A responsible application should be factual, targeted and supported by careful verification of the role, employer and official travel or work information.",
    documentGuidance:
      "Use a concise English CV or resume for roles advertised in English, focusing on verified skills, employment history and relevant results. Follow the employer's language and document requirements rather than assuming one universal local format.",
    hiringPriorities: ["Verified role-specific skills", "Clear employment history", "Language and communication fit", "Accurate availability and eligibility details"],
    sectors: ["Technology", "Agriculture", "Care services", "Construction", "Engineering", "Hospitality and operations"],
    languageNote:
      "Hebrew or another language may be essential for some roles, while English can be used in selected international workplaces. Only state language proficiency you can demonstrate.",
    applicationNotes: ["Apply only through employers and channels you can verify.", "Keep identity, experience and qualification details accurate across every document.", "Tailor the profile to the exact occupation and workplace.", "Check current Sri Lankan and Israeli official guidance on safety, travel and work eligibility before proceeding."],
    relatedSlugs: ["uae", "saudi-arabia", "italy", "finland"],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    destinationLabel: "UAE job market",
    region: "GCC",
    documentName: "CV",
    heroLine: "Target opportunities across the UAE with one coherent career brand",
    metaDescription:
      "UAE CV writing, cover letters and LinkedIn optimization for Sri Lankans targeting Dubai, Abu Dhabi and other emirates. Compare every package price.",
    keywords: ["UAE CV writing Sri Lanka", "UAE jobs for Sri Lankans", "Abu Dhabi CV service", "UAE LinkedIn optimization"],
    marketOverview:
      "The UAE page serves applicants targeting opportunities beyond one city, including Abu Dhabi, Sharjah and other emirates. Your profile should communicate a portable role identity while allowing keywords and emphasis to be tailored to each employer and emirate.",
    documentGuidance:
      "Use an ATS-readable CV with a focused headline, international contact details and evidence of relevant achievements. Keep the core career story consistent while tailoring industry language for each vacancy.",
    hiringPriorities: ["Country-wide role relevance", "Internationally readable achievements", "Accurate availability and location information", "Strong LinkedIn discoverability"],
    sectors: ["Energy and engineering", "Aviation and logistics", "Finance and professional services", "Technology", "Healthcare", "Hospitality and real estate"],
    languageNote:
      "English is widely used in professional recruitment; Arabic or other languages may add value where the position genuinely requires them.",
    applicationNotes: ["Choose whether your search is city-specific or UAE-wide.", "Create a target-role version instead of one generic CV for every vacancy.", "Use LinkedIn location and availability settings accurately.", "Verify recruitment, offer and visa details through official UAE and employer channels."],
    relatedSlugs: ["dubai", "qatar", "saudi-arabia", "oman"],
  },
  {
    slug: "finland",
    name: "Finland",
    destinationLabel: "Finnish job market",
    region: "Europe",
    documentName: "CV",
    heroLine: "Create a clear, evidence-led application for employers in Finland",
    metaDescription:
      "Finland CV writing, cover letters and LinkedIn optimization for Sri Lankans seeking jobs abroad. Compare foreign-job prices for every experience level.",
    keywords: ["Finland CV writing Sri Lanka", "Finland jobs for Sri Lankans", "Finnish CV service", "Finland LinkedIn optimization"],
    marketOverview:
      "Finnish recruitment generally rewards clarity, relevance and honest evidence. Sri Lankan applicants can strengthen their case by explaining technical capability, collaboration, qualifications and measurable results without inflated claims.",
    documentGuidance:
      "Use a clean, concise CV tailored to the role, supported by a focused cover letter. Highlight practical skills, technology, projects and teamwork; follow the employer's instructions on language, references and attachments.",
    hiringPriorities: ["Transparent evidence of competence", "Technical and digital skills", "Collaborative working style", "Clear motivation for the role"],
    sectors: ["Software and technology", "Engineering and manufacturing", "Healthcare", "Clean energy", "Research and education", "Hospitality and services"],
    languageNote:
      "English is used in some international and technology roles, while Finnish or Swedish may be required elsewhere. The vacancy and employer should determine your language strategy.",
    applicationNotes: ["Prioritise vacancies whose working language matches your verified ability.", "Show projects, tools and outcomes rather than generic traits.", "Write a direct cover letter explaining role and employer fit.", "Verify residence-permit, recognition and regulated-profession requirements through official Finnish sources."],
    relatedSlugs: ["italy", "united-kingdom", "canada", "new-zealand"],
  },
];

export const countryJobMarketsBySlug: Record<string, CountryJobMarket> = Object.fromEntries(
  countryJobMarkets.map((market) => [market.slug, market])
);

export const standaloneCountrySlugs = new Set(["dubai", "australia"]);

export function getCountryJobMarketBySlug(slug: string): CountryJobMarket | null {
  return countryJobMarketsBySlug[slug] ?? null;
}
