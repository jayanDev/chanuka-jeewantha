import { ReactNode } from "react";

export type TutorialSection = {
  heading: string;
  content: ReactNode | string;
};

export type TutorialLanguageContent = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  problemExplanation: string;
  whatIsIt: TutorialSection;
  whyItMatters: TutorialSection;
  stepByStep: TutorialSection[];
  examples: TutorialSection;
  commonMistakes: TutorialSection;
  finalChecklist: string[];
  cta: string;
};

export type TutorialCategory = {
  id: string;
  slug: string;
  title: string;
  titleSi: string;
  description: string;
  descriptionSi: string;
  coverImage: string;
};

export type Tutorial = {
  id: string;
  categoryId: string;
  coverImage: string;
  en: TutorialLanguageContent;
  si: TutorialLanguageContent;
};

export const tutorialCategories: TutorialCategory[] = [
  {
    id: "a",
    slug: "cv-writing",
    title: "CV Writing Tutorial Articles",
    titleSi: "CV ලිවීමේ මාර්ගෝපදේශ",
    description: "Step-by-step guides on creating professional CVs for Sri Lankan and international jobs.",
    descriptionSi: "ශ්‍රී ලංකාවේ සහ ජාත්‍යන්තර රැකියා සඳහා වෘත්තීය CV සැකසීමේ පියවරෙන් පියවර මාර්ගෝපදේශ.",
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "b",
    slug: "ats",
    title: "ATS Tutorial Articles",
    titleSi: "ATS මාර්ගෝපදේශ",
    description: "Learn how Applicant Tracking Systems work and how to beat them.",
    descriptionSi: "ATS මෘදුකාංග ක්‍රියාකරන ආකාරය සහ ඒවා ජයගන්නා ආකාරය ඉගෙන ගන්න.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "c",
    slug: "cover-letters",
    title: "Cover Letter Tutorial Articles",
    titleSi: "Cover Letter ලිවීමේ මාර්ගෝපදේශ",
    description: "Master the art of writing compelling cover letters for any job.",
    descriptionSi: "ඕනෑම රැකියාවක් සඳහා ආකර්ෂණීය Cover Letters ලිවීමේ කලාව ප්‍රගුණ කරන්න.",
    coverImage: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "d",
    slug: "linkedin",
    title: "LinkedIn Tutorial Articles",
    titleSi: "LinkedIn මාර්ගෝපදේශ",
    description: "Optimize your LinkedIn profile to attract top recruiters.",
    descriptionSi: "හොඳම Recruiters ආකර්ෂණය කර ගැනීමට ඔබේ LinkedIn Profile එක සාදාගන්න.",
    coverImage: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "e",
    slug: "foreign-jobs",
    title: "Foreign Job CV Tutorial Articles",
    titleSi: "විදේශ රැකියා CV මාර්ගෝපදේශ",
    description: "Guides tailored specifically for overseas employment applications.",
    descriptionSi: "විදේශ රැකියා අයදුම්පත් සඳහා විශේෂයෙන් සකස් කළ මාර්ගෝපදේශ.",
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "f",
    slug: "industry",
    title: "Industry-Specific Tutorial Articles",
    titleSi: "ක්ෂේත්‍රයට අදාළ මාර්ගෝපදේශ",
    description: "Specialized CV guides for IT, Finance, Engineering, Healthcare and more.",
    descriptionSi: "IT, Finance, ඉංජිනේරු, සෞඛ්‍ය වැනි ක්ෂේත්‍ර සඳහා විශේෂිත CV මාර්ගෝපදේශ.",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
  }
];

export const tutorials: Tutorial[] = [
  {
    id: "1",
    categoryId: "a",
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "how-to-write-professional-cv-sri-lanka",
      title: "How to Write a Professional CV in Sri Lanka: Step-by-Step Guide",
      seoTitle: "How to Write a Professional CV in Sri Lanka | CV Writing Guide",
      metaDescription: "Learn how to write a professional CV in Sri Lanka with this step-by-step guide. Includes CV format, professional summary, skills, work experience, ATS keywords, and common mistakes.",
      intro: "Are you applying for jobs in Sri Lanka but struggling to get interview calls? The problem usually isn't your qualifications—it's your CV.",
      problemExplanation: "Many Sri Lankan job seekers use outdated, cluttered CV formats or copy-paste weak summaries that fail to grab a recruiter's attention. In today's competitive job market, an ordinary resume gets rejected in seconds. You need a document that highlights your true value instantly.",
      whatIsIt: {
        heading: "What Is a Professional CV?",
        content: "A professional CV is a carefully structured marketing document designed to sell your skills, experience, and value to a potential employer. Unlike an old-school multi-page bio-data, a modern professional CV is highly targeted, clean, and concise."
      },
      whyItMatters: {
        heading: "Why Your CV Matters in the Sri Lankan Job Market",
        content: "Sri Lankan companies are shifting towards ATS (Applicant Tracking Systems) to filter thousands of applications. If your CV doesn't have the right keywords, formatting, and professional tone, the recruiter might never even see it. A professional CV bridges the gap between your capabilities and the employer's expectations."
      },
      stepByStep: [
        {
          heading: "Step 1: Choose the Right CV Format",
          content: "Use a Reverse-Chronological format. This puts your most recent experience first. Keep the design clean, avoid heavily colored backgrounds, and do not use generic Canva templates if you apply to corporate roles."
        },
        {
          heading: "Step 2: Write a Strong Professional Summary",
          content: "Replace the old 'Objective' section. Write a 3-4 sentence professional summary highlighting your current role, key achievements, and what specific value you bring to the position."
        },
        {
          heading: "Step 3: Add Relevant Skills and Keywords",
          content: "Create a dedicated 'Core Competencies' or 'Skills' section. Include both hard skills (e.g., Data Analysis, SEO, Project Management) and soft skills. Make sure these match the keywords found in the job description."
        },
        {
          heading: "Step 4: Write Work Experience Properly",
          content: "Don't just list everyday duties. Focus on *achievements*. Use the formula: Action Verb + Task + Result. (e.g., 'Led a team of 5 to increase sales by 20% in Q3')."
        },
        {
          heading: "Step 5: Add Education and Certifications",
          content: "List your highest education first. Include relevant professional certifications (like CIMA, CIM, BCS, AWS Certifications) as they hold high value in the Sri Lankan market."
        },
        {
          heading: "Step 6: Keep the CV ATS-Friendly",
          content: "Use standard fonts (Arial, Calibri, Helvetica). Avoid charts, progress bars, and complex tables that ATS software cannot read. Save and send your CV as a PDF."
        }
      ],
      examples: {
        heading: "Examples of a Good vs Bad Summary",
        content: "**Bad:** Seeking a challenging position in a reputed company to utilize my skills.\n\n**Good:** Results-driven Digital Marketing Executive with 4+ years of experience in SEO and Social Media Strategy. Proven track record of increasing organic website traffic by 150% within a year. Seeking to leverage analytical and campaign management skills at [Company Name]."
      },
      commonMistakes: {
        heading: "Common CV Mistakes to Avoid",
        content: "- Using unprofessional email addresses (e.g., coolboy99@gmail.com)\n- Including unnecessary personal details (marital status, religion)\n- Spelling and grammatical errors\n- Making the CV longer than 2-3 pages"
      },
      finalChecklist: [
        "Is my contact information accurate and professional?",
        "Did I include a strong Professional Summary?",
        "Are my experiences listed in reverse-chronological order?",
        "Did I highlight achievements, not just daily duties?",
        "Is the format clean and ATS-friendly?"
      ],
      cta: "Need Help Writing Your CV? Message 'CV REVIEW' or purchase our Professional CV Writing package today."
    },
    si: {
      slug: "sri-lankawe-professional-cv-liwana-hati",
      title: "ශ්‍රී ලංකාවේ වෘත්තීය CV එකක් සාදා ගන්නේ කෙසේද: පියවරෙන් පියවර උපදෙස්",
      seoTitle: "වෘත්තීය CV එකක් ලියන ආකාරය | Professional CV Guide Sinhala",
      metaDescription: "ශ්‍රී ලංකාවේ රැකියා පහසුවෙන් ලබා ගැනීමට Professional CV එකක් නිවැරදිව සකසන ආකාරය සිංහලෙන් ඉගෙන ගන්න.",
      intro: "ඔබ රැකියා සඳහා අයදුම් කළත් සම්මුඛ පරීක්ෂණ සඳහා (Interview Calls) ආරාධනා නොලැබෙනවාද? මෙයට ප්‍රධානතම හේතුව බොහෝ විට ඔබේ සුදුසුකම් නොව, ඔබේ CV එක විය හැක.",
      problemExplanation: "බොහෝ අය තවමත් පැරණි Bio-data ආකෘති හෝ ඉතා සංකීර්ණ Canva templates භාවිතා කරයි. තරඟකාරී රැකියා වෙළඳපොලේදී, සාමාන්‍ය CV එකක් තත්පර කිහිපයකින් ප්‍රතික්ෂේප විය හැකිය.",
      whatIsIt: {
        heading: "Professional CV එකක් යනු කුමක්ද?",
        content: "Professional CV එකක් යනු ඔබගේ කුසලතා, අත්දැකීම් සහ වටිනාකම ආයතනයකට මනාව පෙන්වා දෙන අලෙවිකරණ ලියවිල්ලකි. මෙය අදාළ රැකියාවට ගැලපෙන ලෙස ඉතා පැහැදිලිව හා ක්‍රමානුකූලව සකස් කළ යුතුය."
      },
      whyItMatters: {
        heading: "මේක වැදගත් වෙන්නේ ඇයි?",
        content: "වර්තමාන සමාගම් දහස් ගණනක් වන අයදුම්පත් පෙරීමට Applicant Tracking Systems (ATS) භාවිතා කරයි. ATS එකට කියවිය නොහැකි, නිවැරදි Keywords නැති CV කිසිදා HR කළමනාකරුවෙකුගේ අතට පත් නොවේ."
      },
      stepByStep: [
        {
          heading: "පියවර 1: නිවැරදි ආකෘතිය (Format) තෝරාගන්න",
          content: "Reverse-Chronological ක්‍රමය භාවිතා කරන්න. එනම් නවතම අත්දැකීම් සහ අධ්‍යාපන සුදුසුකම් මුලින්ම සඳහන් කරන්න. පිරිසිදු, සරල පෙනුමක් පවත්වා ගන්න."
        },
        {
          heading: "පියවර 2: ශක්තිමත් Professional Summary එකක් ලියන්න",
          content: "පැරණි 'Objective' එක වෙනුවට වාක්‍ය 3-4 කින් ඔබේ වෘත්තීය සාරාංශය ලියන්න. ඔබේ ප්‍රධාන ජයග්‍රහණ සහ සමාගමට ඔබෙන් ලැබෙන වටිනාකම මෙහිදී ඉස්මතු කරන්න."
        },
        {
          heading: "පියවර 3: කුසලතා (Skills) සහ Keywords එක් කරන්න",
          content: "Hard skills (උදා: Data Analysis, SEO) සහ Soft skills සඳහන් කරන්න. මේවා Job description එකේ ඇති Keywords වලට ගැලපෙන සේ එක් කිරීම අත්‍යවශ්‍ය වේ."
        },
        {
          heading: "පියවර 4: රැකියා අත්දැකීම් (Work Experience) නිවැරදිව ලියන්න",
          content: "ඔබ කළ සාමාන්‍ය වැඩ ලැයිස්තුගත නොකර ඔබේ ජයග්‍රහණ (Achievements) ප්‍රතිශත හෝ සංඛ්‍යාත්මක දත්ත සමග පැහැදිලි කරන්න."
        },
        {
          heading: "පියවර 5: අධ්‍යාපනය සහ සහතික (Education & Certifications)",
          content: "ඉහළම අධ්‍යාපන සුදුසුකම මුලින්ම සඳහන් කරන්න. CIMA, CIM, අමතර තාක්ෂණික සහතික ආදිය ඇතුළත් කරන්න."
        },
        {
          heading: "පියවර 6: CV එක ATS-Friendly ලෙස තබාගන්න",
          content: "Arial හෝ Calibri වැනි පැහැදිලි font එකක් භාවිතා කරන්න. ප්‍රස්තාර, රූප සටහන් (tables, graphics) භාවිතයෙන් වළකින්න. සෑම විටම PDF එකක් ලෙස save කරන්න."
        }
      ],
      examples: {
        heading: "නිවැරදි සහ වැරදි Summary සඳහා උදාහරණ",
        content: "**වැරදි:** හොඳ සමාගමක රැකියා අත්දැකීම් ලබා ගැනීමට බලාපොරොත්තු වෙමි.\n\n**නිවැරදි:** වසර 4ක පළපුරුද්දක් ඇති Digital Marketing විධායක නිලධාරියෙක්. කාර්තුවකදී විකුණුම් 20% කින් ඉහළ නැංවීමට මූලික වී කටයුතු කර ඇත. [සමාගමේ නම] හි අරමුණු සාක්ෂාත් කරගැනීමට කැපවීමට සූදානම්."
      },
      commonMistakes: {
        heading: "බොහෝ දෙනෙක් කරන වැරදි",
        content: "- වෘත්තීය නොවන විද්‍යුත් තැපැල් ලිපින භාවිතය (උදා: coolboy99@gmail.com)\n- අනවශ්‍ය පුද්ගලික තොරතුරු ඇතුළත් කිරීම (ආගම, විවාහක අවිවාහක බව)\n- අක්ෂර වින්‍යාසය සහ ව්‍යාකරණ දෝෂ\n- පිටු 3කට වඩා දිගින් වැඩි වීම"
      },
      finalChecklist: [
        "සම්බන්ධ කරගත හැකි තොරතුරු නිවැරදිද?",
        "ශක්තිමත් Professional Summary එකක් ඇතුළත් කර තිබේද?",
        "අත්දැකීම් සහ අධ්‍යාපනය Reverse-chronological අනුපිළිවෙලට තිබේද?",
        "දෛනික රාජකාරි වලට වඩා ජයග්‍රහණ ඉස්මතු කර තිබේද?",
        "මෙය ATS මෘදුකාංග සඳහා ගැලපෙනේද?"
      ],
      cta: "ඔබේ CV එක නිවැරදිව සකසා ගැනීමට අවශ්‍යද? අදම අපව සම්බන්ධ කරගන්න. 'CV REVIEW' ලෙස මැසේජ් කරන්න."
    }
  },
  {
    id: "2",
    categoryId: "b",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "what-is-an-ats-cv-complete-guide",
      title: "What Is an ATS CV? Complete Guide for Job Seekers",
      seoTitle: "What is an ATS CV? Applicant Tracking Systems Guide Sri Lanka",
      metaDescription: "Discover what an ATS CV is, how it works, and why over 75% of resumes are rejected by Applicant Tracking Systems before a human even reads them.",
      intro: "You've sent out dozens of job applications but haven't heard back from a single employer. Before you start questioning your qualifications, you might want to look at your resume formatting. It's likely being blocked by an ATS.",
      problemExplanation: "Over 75% of CVs never make it to human eyes because they fail to pass Applicant Tracking Systems (ATS). If your resume includes complex tables, columns, graphics, or missing keywords, the system simply cannot read it, leading to an automatic rejection.",
      whatIsIt: {
        heading: "What exactly is an ATS?",
        content: "An Applicant Tracking System (ATS) is an AI-powered software used by HR departments and recruiters to collect, sort, scan, and rank resumes. When you apply for a job online, the ATS parses your document into pure text, looking for specific skills, job titles, and experience levels."
      },
      whyItMatters: {
        heading: "Why it matters more than ever",
        content: "Almost all Fortune 500 companies and an increasing number of mid-to-large corporate companies in Sri Lanka (especially in Banking, IT, and Finance) now use ATS platforms. If you aren't writing an ATS-friendly CV, you are essentially ghosting yourself."
      },
      stepByStep: [
        {
          heading: "Rule 1: Ditch the fancy designs",
          content: "Canva templates and highly designed two-column resumes look beautiful to a human but look like gibberish to a machine. Stick to simple, single-column, standard Word document structures converted to PDF."
        },
        {
          heading: "Rule 2: Use standard section headings",
          content: "The ATS is looking for familiar terms. Use headings like 'Work Experience', 'Education', and 'Skills'. Avoid creative headings like 'My Career Journey' or 'What I Can Do'."
        },
        {
          heading: "Rule 3: Keyword optimization is critical",
          content: "The software scores your resume based on how well it matches the job description. If the job asks for 'Python Programming' and you wrote 'Coded in Python', algorithms might miss it. Mirror the exact phrasing used in the job ad."
        },
        {
          heading: "Rule 4: Avoid Headers, Footers, and Text Boxes",
          content: "Information placed inside Word headers, footers, graphics, or floating text boxes often gets completely ignored by the parsing algorithms. Put everything in the main body text."
        }
      ],
      examples: {
        heading: "ATS Readability Example",
        content: "If you use a progress bar to show you are '90% good at Excel', the ATS will likely read this as an error or skip it entirely. Instead, clearly write: 'Advanced in Microsoft Excel (Pivot Tables, VLOOKUP, Macros)'."
      },
      commonMistakes: {
        heading: "Common ATS Formatting Mistakes",
        content: "- Submitting a JPG or PNG instead of a PDF or Word Document.\n- Using non-standard fonts.\n- Putting dates in the left margin where scanners struggle to pair them with roles.\n- Hiding keywords in white text (systems flag this as spam)."
      },
      finalChecklist: [
        "Is my CV in a single-column layout?",
        "Did I remove all images, graphics, and tables?",
        "Are my section headings standard?",
        "Have I included exact keywords from the target job descriptions?",
        "Did I save the document as a standard PDF?"
      ],
      cta: "Don't let a robot reject you! Send us your CV for an ATS format upgrade today."
    },
    si: {
      slug: "ats-cv-ekak-yanu-kumakda",
      title: "ATS CV එකක් යනු කුමක්ද? සම්පූර්ණ මාර්ගෝපදේශය",
      seoTitle: "ATS CV එකක් යනු කුමක්ද | ATS Guide in Sinhala",
      metaDescription: "ATS මෘදුකාංග මගින් CV ප්‍රතික්ෂේප වන්නේ ඇයි සහ ATS Friendly CV එකක් සකස් කරගන්නා ආකාරය ඉගෙන ගන්න.",
      intro: "අයදුම්පත් රාශියක් යැව්වත් ඔබට පිළිතුරක් නොලැබෙන්නේ ඇයිදැයි ඔබ කල්පනා කරනවාද? ගැටලුව ඔබේ සුදුසුකම් නොවේ, ඔබේ CV එකේ ආකෘතිය විය හැකිය.",
      problemExplanation: "අද 75% කට වඩා CV මිනිස් ඇසකට යාමටත් පෙර Applicant Tracking Systems (ATS) හරහා ප්‍රතික්ෂේප වේ. ඔබ ඔබේ CV එකේ අනවශ්‍ය පින්තූර, ප්‍රස්තාර හෝ tables යොදාගෙන තිබෙනවා නම් එය කියවීමට මෙම මෘදුකාංග වලට නොහැක.",
      whatIsIt: {
        heading: "ATS යනු කුමක්ද?",
        content: "Applicant Tracking System (ATS) යනු මානව සම්පත් (HR) දෙපාර්තමේන්තු විසින් අයදුම්පත් එක්රැස් කිරීමට සහ පෙරීමට භාවිතා කරන මෘදුකාංගයකි. එය ඔබගේ CV එක text බවට පත් කර, අදාල Keywords සහ අත්දැකීම් පමණක් සොයා බලයි."
      },
      whyItMatters: {
        heading: "මෙය වැදගත් වන්නේ ඇයි?",
        content: "බැංකු, තොරතුරු තාක්ෂණ (IT) සහ මූල්‍ය යන අංශ වල විශාල සමාගම් බොහොමයක් අයදුම්පත් තේරීමට දැන් භාවිතා කරන්නේ ATS මෘදුකාංග වේ. ඔබ ATS වලට ගැලපෙන CV එකක් නොයවන්නේ නම්, ඔබගේ කාලය අපතේ යැවීමක් පමණි."
      },
      stepByStep: [
        {
          heading: "නීතිය 1: සංකීර්ණ Designs ඉවත් කරන්න",
          content: "Canva වල ඇති ලස්සන two-column designs යන්ත්‍ර වලට කියවිය නොහැක. සාමාන්‍ය Word document එකක් මෙන් තනි තීරුවකට (single-column) තොරතුරු පෙළගස්වන්න."
        },
        {
          heading: "නීතිය 2: සම්මත මාතෘකා භාවිතා කරන්න",
          content: "'Work Experience', 'Education', 'Skills' වැනි සම්මත මාතෘකා භාවිතා කරන්න. 'අධ්‍යාපන ගමන' වැනි වචන භාවිතා කිරීමෙන් වළකින්න."
        },
        {
          heading: "නීතිය 3: Keywords භාවිතය",
          content: "Job description එකේ ඇති වචන ඒ ආකාරයෙන්ම භාවිතා කරන්න. ඒ හරහා ATS මෘදුකාංගය මගින් ඔබේ සම්භාවිතාව වැඩිකර පෙන්වයි."
        },
        {
          heading: "නීතිය 4: Text boxes සහ Tables ඉවත් කරන්න",
          content: "Text boxes, tables, සහ headers/footers ඇතුලත ඇති තොරතුරු ATS මගින් නොසලකා හරියි."
        }
      ],
      examples: {
        heading: "ATS මගින් කියවීම පිළිබඳ උදාහරණයක්",
        content: "ඔබ Excel දන්නා බව පෙන්වීමට progress bar එකක් භාවිතා කලහොත් ATS එකට එය තේරුම් ගත නොහැක. ඒ වෙනුවට 'Advanced in Microsoft Excel (Pivot Tables, VLOOKUP, Macros)' ලෙස ලියා දක්වන්න."
      },
      commonMistakes: {
        heading: "සුලභ ATS වැරදි",
        content: "- PDF/Word වෙනුවට පින්තූර ලෙස (JPG/PNG) CV යැවීම.\n- කියවීමට අපහසු දෘශ්‍යමය සිත් ඇදගන්නා fonts භාවිතා කිරීම.\n- දින වකවානු margin එකේ ගැටගැසීම.\n- සුදු පාටින් keywords ලියා සැඟවීම (මෙය ස්වයංක්‍රීයව reject වීමට හේතු වේ)."
      },
      finalChecklist: [
        "CV එක Single-column layout එකකින් තිබේද?",
        "පින්තූර සහ ප්‍රස්තාර ඉවත් කොට තිබේද?",
        "මාතෘකා මනාව හා සම්මත ලෙස යෙදී තිබේද?",
        "Job description එකෙහි keywords අන්තර්ගත වී තිබේද?",
        "මෙය නිවැරදිව PDF ආකෘතියෙන් save කර තිබේද?"
      ],
      cta: "ATS මෘදුකාංගයකින් reject නොවී ඔබේ සිහින රැකියාවට පියනගන්න! අදම ඔබේ CV එක ATS-Friendly CV එකක් බවට පත් කරගැනීමට අපට කතා කරන්න."
    }
  },
  {
    id: "3",
    categoryId: "a",
    coverImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "create-ats-friendly-cv",
      title: "How to Create an ATS-Friendly CV for Job Applications",
      seoTitle: "How to Make an ATS-Friendly CV in 2024 | Step by Step Guide",
      metaDescription: "Learn how to format, structure, and keyword-optimize your CV to pass Applicant Tracking Systems and land more job interviews.",
      intro: "You found the perfect job, spent hours applying, and got an instant rejection email. How? Because a human didn't read your CV—an ATS bot did.",
      problemExplanation: "Most candidates use highly designed CVs from graphic design tools. Unfortunately, parsing algorithms can't read those visual elements. If the ATS skips your data, you automatically get a low score, meaning HR never sees your application.",
      whatIsIt: {
        heading: "What is an ATS-Friendly CV?",
        content: "An ATS-friendly CV is a text-based document formulated specifically for Applicant Tracking Systems. It avoids complex layouts and uses standard fonts, clear headings, and exact keywords from the job description to ensure the system reads 100% of your data."
      },
      whyItMatters: {
        heading: "Why You Need an ATS CV",
        content: "If you are applying through portals like LinkedIn, TopJobs, or company career pages, an ATS is almost certainly processing your file. Without an ATS-friendly CV, your chances of passing the initial digital screening are practically zero."
      },
      stepByStep: [
        {
          heading: "Step 1: Strip Out the Graphics",
          content: "Remove all photos, logos, charts, pie graphs, and multi-column layouts. The ATS strips these out anyway, and often scrambles the text around them in the process."
        },
        {
          heading: "Step 2: Choose the Right Font",
          content: "Stick to universally recognized fonts like Arial, Calibri, Times New Roman, or Garamond. Do not use custom downloaded web fonts."
        },
        {
          heading: "Step 3: Define Clear Headings",
          content: "Use exact, standard terms for headings: 'Work Experience' or 'Professional Experience' instead of 'My Career'. Use 'Education' instead of 'Academic Background'."
        },
        {
          heading: "Step 4: Use a Simple Date Format",
          content: "Keep dates straightforward, such as 'MM/YYYY' or 'Month Year' (e.g., 05/2021 or May 2021). Ensure the date is beside or below the job title, not floating in a left-hand column."
        },
        {
          heading: "Step 5: Keyword Optimization",
          content: "Scan the job description for required skills (e.g., 'Project Management', 'Agile', 'B2B Sales'). Ensure these exact keywords appear naturally in your summary, skills section, and experience bullet points."
        }
      ],
      examples: {
        heading: "Formatting Example",
        content: "**Bad Format:** A two-column layout with a profile picture, skill points represented by star ratings, and dates written as '19-21'.\n\n**Good Format:** A single-column top-to-bottom layout, utilizing bullet points for tasks, exact month-year date formats (June 2019 - August 2021), and plain text lists for skills."
      },
      commonMistakes: {
        heading: "Common Errors That Fail the Scan",
        content: "- Using tables to list skills or format the page.\n- Saving as an image-based PDF (always print to PDF or export text-based PDF).\n- Using abbreviations the ATS might not know (e.g., writing 'Mgr' instead of 'Manager').\n- Placing important contact info inside the MS Word Header/Footer area."
      },
      finalChecklist: [
        "Is the layout strictly single-column?",
        "Are all images and graphics removed?",
        "Did I mirror the keywords from the job description?",
        "Are my job titles and dates clearly visible in standard text?",
        "Is the document saved as a text-parseable PDF?"
      ],
      cta: "Don't guess what the ATS wants. Message 'CV REVIEW' to let our experts make your CV 100% ATS compliant."
    },
    si: {
      slug: "ats-friendly-cv-ekak-hadanne-kohomada",
      title: "රැකියා අයදුම්පත් සඳහා ATS Friendly CV එකක් නිර්මාණය කරගන්නේ කෙසේද?",
      seoTitle: "ATS Friendly CV එකක් හදමු | ATS Sinhala Guide",
      metaDescription: "පරිගණක මෘදුකාංග (ATS) හරහා ප්‍රතික්ෂේප නොවන ලෙස නිවැරදිව ATS-Friendly CV එකක් සකස් කරන ආකාරය සිංහලෙන් ඉගෙන ගන්න.",
      intro: "ඔබට ගැලපෙනම රැකියාවක් දැක apply කල සැනින්ම reject වුනාද? එසේ වීමට හේතුව මිනිසෙක් විසින් ඔබගේ CV එක නොකියවීමයි; එය කියවූයේ ATS මෘදුකාංගයකි.",
      problemExplanation: "අලුත් ලස්සන Canva ආකෘති භාවිතා කර හැදූ CV බොහොමයක් ATS වලට කියවිය නොහැක. ඒවායේ ඇති කොටු, වර්ණ සහ ප්‍රස්තාර නිසා පරිගණකය ඔබේ තොරතුරු නිවැරදිව හඳුනා නොගන්නා බැවින් ඔබ ස්වයංක්‍රීයවම ප්‍රතික්ෂේප වේ.",
      whatIsIt: {
        heading: "ATS-Friendly CV එකක් කියන්නේ මොකක්ද?",
        content: "ATS-Friendly CV එකක් යනු Applicant Tracking System වලට කියවීමට පහසු වන සේ පෙළ (Text) මත පදනම්ව සකසන ලද ලිපිගොනුවකි. මෙහි කිසිදු සංකීර්ණ රූපසටහන් නොමැති අතර, අදාළ රැකියාවට අවශ්‍ය keywords පැහැදිලිව අන්තර්ගත කර ඇත."
      },
      whyItMatters: {
        heading: "ඔබට මේක අත්‍යවශ්‍ය ඇයි?",
        content: "බොහෝ සමාගම් වලට දිනකට CV දහස් ගණනක් ලැබේ. ඒවා සියල්ලක්ම පරිලෝකනය කරන්නේ මෙම ATS මෘදුකාංගයයි. ඔබගේ CV එක මෙය සමත් නොවන්නේ නම් HR කළමනාකරු එය කිසිදිනෙක දකින්නේ නැත."
      },
      stepByStep: [
        {
          heading: "පියවර 1: රූප සහ ප්‍රස්තාර ඉවත් කරන්න",
          content: "ඡායාරූප, සමාගම් ලාංඡන (logos), සහ දක්ෂතා පෙන්වන තරු (star ratings) ඉවත් කරන්න. ATS එකට මේවා තේරුම් ගත නොහැක."
        },
        {
          heading: "පියවර 2: සරල Font එකක් පාවිච්චි කරන්න",
          content: "Arial, Calibri, හෝ Times New Roman වැනි සාමාන්‍ය font එකක් පමණක් භාවිතා කරන්න."
        },
        {
          heading: "පියවර 3: පැහැදිලි මාතෘකා (Headings) දෙන්න",
          content: "'Professional Experience', 'Education', 'Skills' යන සම්මත වචන හැර වෙනත් අලංකාර වචන මාතෘකා ලෙස නොදෙන්න."
        },
        {
          heading: "පියවර 4: දින වකවානු නිවැරදිව ලියන්න",
          content: "මාසය සහ අවුරුද්ද පැහැදිලිව ලියන්න (උදා: May 2021). දින වකවානු වම් පස margin එකේ ගැටගැසීමෙන් වළකින්න."
        },
        {
          heading: "පියවර 5: Keywords භාවිතා කරන්න",
          content: "ඔබ අයදුම් කරන රැකියා දැන්වීමේ ඇති ප්‍රධාන වචන (Keywords) ඔබේ Skills සහ Experience අංශයට ස්වභාවිකව එකතු කරන්න."
        }
      ],
      examples: {
        heading: "නිවැරදි ආකෘතියක උදාහරණයක්",
        content: "**වැරදි ආකෘතිය:** තීරු දෙකකට බෙදා, ඡායාරූපයක් සහිතව, කුසලතා රූප හරහා පෙන්වීම.\n\n**නිවැරදි ආකෘතිය:** ඉහළ සිට පහළට (Single-column) සරල පෙළක් ලෙස, bullet points භාවිතයෙන් අත්දැකීම් සහ කුසලතා පැහැදිලිව ලිවීම."
      },
      commonMistakes: {
        heading: "අනිවාර්යයෙන්ම මඟහරවා ගතයුතු වැරදි",
        content: "- තොරතුරු පෙන්වීමට Tables (වගු) භාවිතා කිරීම.\n- MS Word හි Header/Footer ඇතුලත දුරකථන අංක හෝ ඊමේල් යෙදීම (මෙය ATS මගින් නොකියවයි).\n- CV එක Image එකක් ලෙස PDF කිරීම (මෙය Text-based PDF එකක්ම විය යුතුය)."
      },
      finalChecklist: [
        "මාගේ CV එක Single Column එකක්ද?",
        "සෑම රූප සටහනක්ම ඉවත් කර තිබේද?",
        "රැකියාවට අදාල Keywords අන්තර්ගතද?",
        "මාතෘකා සඳහා සම්මත ඉංග්‍රීසි වචන භාවිතා කර තිබේද?",
        "මෙය Text Select කල හැකි PDF එකක්ද?"
      ],
      cta: "ATS පරීක්ෂාවෙන් අසමත් වෙන්න එපා! 'CV REVIEW' ලෙස අපිට මැසේජ් එකක් දාලා අදම ඔයාගේ CV එක ATS Friendly කරගන්න."
    }
  },
  {
    id: "4",
    categoryId: "a",
    coverImage: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "how-to-write-professional-summary-cv",
      title: "How to Write a Strong Professional Summary for Your CV",
      seoTitle: "Write a CV Professional Summary: Examples & Guide",
      metaDescription: "Learn how to write an impactful professional summary for your CV with examples. Discover why you should stop using outdated career objectives.",
      intro: "Recruiters spend an average of 6 seconds scanning a resume. If the top section of your CV doesn't immediately hook them, they won't read the rest.",
      problemExplanation: "Many candidates still use generic 'Career Objectives' like 'Seeking a challenging position to utilize my skills'. This tells the employer what *you* want, but not what *you bring to the table*. A weak opening guarantees your CV gets tossed aside.",
      whatIsIt: {
        heading: "What is a Professional Summary?",
        content: "A professional summary (or executive summary) is a 3-5 sentence paragraph at the very top of your CV. It acts as an elevator pitch, immediately highlighting your current job title, years of experience, key achievements, and the core value you offer to a prospective employer."
      },
      whyItMatters: {
        heading: "Why It Matters",
        content: "It sets the tone for your entire application. By clearly stating your expertise right away, you give the HR manager a reason to keep reading. For ATS systems, a keyword-rich summary ensures you score high immediately."
      },
      stepByStep: [
        {
          heading: "Step 1: Start with your Title and Experience",
          content: "Open with a strong professional identity. For example: 'Highly motivated Marketing Manager with 5+ years of experience...'"
        },
        {
          heading: "Step 2: Highlight your Core Expertise",
          content: "Use keywords from the job description. Mention the specific areas you excel in, such as 'Specializing in digital strategy, SEO, and team leadership'."
        },
        {
          heading: "Step 3: Include a Major Achievement",
          content: "Give them a taste of your success with metrics. 'Proven track record of increasing website traffic by 40% and driving B2B conversions'."
        },
        {
          heading: "Step 4: State Your Value Proposition",
          content: "End by explaining how you will help their company. 'Seeking to leverage analytical skills to drive revenue growth at [Company Name].'"
        }
      ],
      examples: {
        heading: "Summary Examples by Industry",
        content: "**IT/Software:** Detail-oriented Full Stack Developer with 4 years of experience building scalable MERN applications. Successfully led a team of 3 developers to deliver a major fintech product 2 weeks ahead of schedule. Adept at cloud deployment and optimizing legacy code.\n\n**Finance:** Analytical Financial Accountant with 6+ years of corporate experience in budgeting, tax compliance, and payroll management. Reduced annual reporting discrepancies by 15% through improved automated Excel systems. Seeking to apply forensic accounting skills at a top-tier audit firm."
      },
      commonMistakes: {
        heading: "Common Mistakes",
        content: "- Writing a 'Career Objective' instead of a Summary.\n- Making it too long (it should never exceed 5 sentences).\n- Using 'I/Me' pronouns (e.g., 'I am a manager who...'). Write in the third person without the pronoun ('Manager who...').\n- Relying on buzzwords like 'Hardworking' and 'Team player' without any proof."
      },
      finalChecklist: [
        "Does it start with my professional job title?",
        "Did I state my total years of experience?",
        "Is there at least one measurable achievement?",
        "Are ATS-friendly keywords included natively?",
        "Is it between 3 and 5 sentences?"
      ],
      cta: "Struggling to write your summary? Let our expert CV writers craft the perfect introduction for your profile. Message 'CV HELP' to get started."
    },
    si: {
      slug: "professional-summary-ekak-hadanne-kohomada",
      title: "ඔබේ CV එක සඳහා ශක්තිමත් Professional Summary එකක් ලියන්නේ කෙසේද?",
      seoTitle: "CV Summary එකක් ලියමු | Professional CV Guide Sinhala",
      metaDescription: "CV එකේ Career Objective එක වෙනුවට නිවැරදිව Professional Summary එකක් ලියන ආකාරය සහ උදාහරණ මෙතැනින් ඉගෙන ගන්න.",
      intro: "Recruiter කෙනෙක් CV එකක් දෙස බලන්නේ තත්පර 6ක් වැනි සුළු කාලයකි. ඔබේ CV එකේ ඉහළම කොටසින් ඔවුන්ගේ අවධානය දිනාගත්තේ නැත්නම්, ඔවුන් ඉතිරිය කියවන්නේ නැත.",
      problemExplanation: "බොහෝ අය තවමත් CV එක මුල outdated 'Career Objectives' භාවිතා කරයි (උදා: 'Seeking a challenging position...'). මෙයින් කියවෙන්නේ ඔබට අවශ්‍ය දේ මිසක්, ඔබට සමාගමට ලබාදිය හැකි වටිනාකම නොවේ.",
      whatIsIt: {
        heading: "Professional Summary එකක් යනු කුමක්ද?",
        content: "Professional summary එකක් කියන්නේ CV එකේ ඉහළින්ම සඳහන් වන වාක්‍ය 3-5 කින් යුත් සාරාංශයකි. මින් ඔබගේ වර්තමාන තනතුර, පළපුරුද්ද, ප්‍රධාන ජයග්‍රහණ, සහ ඔබෙන් ආයතනයට ලැබෙන වාසිය පිළිබඳව කෙටි හැඳින්වීමක් ලබා දේ."
      },
      whyItMatters: {
        heading: "මෙය වැදගත් වන්නේ ඇයි?",
        content: "ඔබේ සම්පූර්ණ CV එකේම වටිනාකම මුල් තත්පර කිහිපය තුල පෙන්නුම් කරන්නේ මෙම කොටසයි. මීට අමතරව Job keywords මෙම summary එකට ඇතුලත් කිරීම හරහා ATS මෘදුකාංගය මගින් වැඩි ලකුණු (Score) ලබාගැනීමට හැකිවේ."
      },
      stepByStep: [
        {
          heading: "පියවර 1: ඔබේ තනතුර සහ පළපුරුද්දෙන් අරඹන්න",
          content: "ශක්තිමත් හැඳින්වීමකින් පටන් ගන්න. උදාහරණයක් ලෙස: 'වසර 5ක පළපුරුද්දක් ඇති කැපවීමෙන් වැඩ කරන Marketing Manager වරයෙකි...'"
        },
        {
          heading: "පියවර 2: විශේෂ කුසලතා (Core Expertise) ඉස්මතු කරන්න",
          content: "රැකියා දැන්වීමේ ඇති keywords භාවිතා මින් ඔබේ විශේෂ කුසලතා දක්වන්න (උදා: 'Digital strategy, SEO, සහ Team leadership සම්බන්ධයෙන් විශේෂඥයෙකි')."
        },
        {
          heading: "පියවර 3: ප්‍රධාන ජයග්‍රහණයක් ඇතුලත් කරන්න",
          content: "සංඛ්‍යාත්මක දත්ත (metrics) හරහා ඔබේ සාර්ථකත්වය පෙන්වන්න. 'මාස 6ක් තුලදී ආයතනයේ website traffic එක 40% කින් වර්ධනය කිරීමට දායක වුනා.'"
        },
        {
          heading: "පියවර 4: ඔබේ වටිනාකම පෙන්වන්න",
          content: "'[සමාගමේ නම] හි අරමුණු සාක්ෂාත් කරගැනීම සඳහා මාගේ විශ්ලේෂණ කුසලතා යෙදවීමට බලාපොරොත්තු වෙමි' ලෙසින් සාරාංශය අවසන් කරන්න."
        }
      ],
      examples: {
        heading: "විවිධ ක්ෂේත්‍ර සඳහා උදාහරණ",
        content: "**IT/Software:** වසර 4ක පළපුරුද්දක් ඇති Full Stack Developer වරයෙකි. සංකීර්ණ MERN applications නිර්මාණයට විශේෂ ලැදියාවක් දක්වයි. මෑතකදී සාමාජිකයින් තිදෙනෙකුගෙන් යුත් කණ්ඩායමක් මෙහෙයවමින් ප්‍රධාන Fintech මෘදුකාංගයක් නියමිත දිනට පෙර සාර්ථකව අවසන් කරන ලදි.\n\n**Finance:** වසර 6ක පළපුරුද්දක් සතු Financial Accountant කෙනෙකි. Budgeting, Tax compliance, සහ Payroll management සම්බන්ධයෙන් ගැඹුරු දැනුමක් පවතී. නව Excel automation ක්‍රමවේද හරහා වාර්තාකරණ දෝෂ 15% කින් අවම කිරීමට සමත් වූ අතර තම විගණන දැනුම ආයතන දියුණුවට යෙදවීමට අපේක්ෂා කරයි."
      },
      commonMistakes: {
        heading: "ඔබ කරන සුලභ වැරදි",
        content: "- Summary එකක් වෙනුවට පැරණි 'Career Objective' එකක් ලිවීම.\n- වාක්‍ය 5කට වඩා දිගට රචනාවක් මෙන් ලිවීම.\n- 'මම (I/Me)' යන පද භාවිතා කිරීම (Third-person language භාවිතා කිරීම වඩාත් වෘත්තීය වේ).\n- සාධක නොමැතිව 'Hardworking', 'Team player' වැනි වචන භාවිතය."
      },
      finalChecklist: [
        "මාගේ රැකියා තනතුරෙන් මෙය ආරම්භ වෙනවාද?",
        "මුළු පළපුරුද්ද (අවුරුදු ගණන) දක්වා තිබේද?",
        "අවම වශයෙන් එක් ප්‍රධාන ජයග්‍රහණයක් හෝ අන්තර්ගතද?",
        "ATS සඳහා සහාය වන keywords ඇතුලත්ද?",
        "මෙය වාක්‍ය 3 ත් 5 ත් අතර ප්‍රමාණයක්ද?"
      ],
      cta: "ඔබේ CV Summary එක තනිවම ලියාගන්න අමාරුද? 'CV HELP' ලෙස මැසේජ් එකක් යවා අපගේ විශේෂඥයන් ලවා ඔබේ CV එකට ගැලපෙනම Summary එක සාදාගන්න."
    }
  },
  {
    id: "5",
    categoryId: "a",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "how-to-write-work-experience-cv",
      title: "How to Write Work Experience in a CV with Examples",
      seoTitle: "CV Work Experience Section: How to Write It Properly",
      metaDescription: "Learn how to effectively format and write your work experience section in your CV. Includes action verbs, bullet points, and industry-specific examples.",
      intro: "Your work experience section is the heart of your CV. It's the primary area recruiters and hiring managers look at to figure out if you can do the job.",
      problemExplanation: "Most applicants simply copy and paste their job description into their CV. This results in a boring list of daily duties ('Responsible for answering emails', 'Attended weekly meetings') that fail to demonstrate actual competence or impact.",
      whatIsIt: {
        heading: "What is the Work Experience Section?",
        content: "This section details your professional history in reverse-chronological order. It proves your qualifications by detailing your past job titles, companies, employment dates, and most importantly, your specific accomplishments in each role."
      },
      whyItMatters: {
        heading: "Why It Matters",
        content: "Employers hire for results, not responsibilities. The work experience section is your opportunity to show proof of your capabilities. It's also the most critical section for ATS optimization, as it contains your highest density of technical keywords."
      },
      stepByStep: [
        {
          heading: "Step 1: Use Reverse-Chronological Order",
          content: "Always list your most recent job first and work your way backwards. This immediately shows the recruiter your current level of seniority."
        },
        {
          heading: "Step 2: Clear Formatting for Headers",
          content: "Format each role clearly: Job Title, Company Name, Location, and Employment Dates (Month/Year to Month/Year)."
        },
        {
          heading: "Step 3: Use Bullet Points",
          content: "Never write paragraphs. Use 3-5 bullet points per job role to ensure readability."
        },
        {
          heading: "Step 4: Start with Action Verbs",
          content: "Begin every bullet point with a strong action verb (e.g., 'Spearheaded', 'Managed', 'Developed', 'Increased') instead of passive phrases like 'Responsible for' or 'Helped with'."
        },
        {
          heading: "Step 5: Highlight Achievements over Duties",
          content: "Show the result of your work. Use metrics and numbers wherever possible. (e.g., 'Trained 15 new staff members' instead of 'Training staff')."
        }
      ],
      examples: {
        heading: "Work Experience Examples",
        content: "**Digital Marketing Executive | ABC Company | Colombo | 05/2020 - Present**\n- Directed 5 major social media campaigns, resulting in a 35% increase in brand engagement within 6 months.\n- Managed a monthly advertising budget of LKR 500,000 across Facebook and Google Ads with a 300% ROI.\n- Optimized website SEO strategy, ranking 10 primary keywords on Google Page 1.\n\n**Customer Service Rep | XYZ Corp | Kandy | 01/2018 - 04/2020**\n- Addressed over 60 client inquiries daily via phone and email, maintaining a 98% customer satisfaction score.\n- Resolved escalated technical disputes, reducing average handling time by 15%."
      },
      commonMistakes: {
        heading: "Common Mistakes",
        content: "- Writing duties instead of achievements (Focusing on what you *had* to do, instead of what you *succeeded* in doing).\n- Having unexplained long gaps between jobs.\n- Inconsistent date formatting (mixing '2020' with 'May-21').\n- Including irrelevant jobs from 15+ years ago that don’t align with your current career goals."
      },
      finalChecklist: [
        "Is my experience in reverse-chronological order?",
        "Are dates and job titles clearly formatted?",
        "Does every bullet point start with an Action Verb?",
        "Did I include numbers and metrics where possible?",
        "Are there 3 to 5 strong bullet points per role?"
      ],
      cta: "Want to transform your boring duty list into a powerful achievement-based CV? Message 'CV REVIEW' to connect with our experts today."
    },
    si: {
      slug: "cv-eka-work-experience-liana-hati",
      title: "CV එකේ Work Experience (රැකියා අත්දැකීම්) නිවැරදිව ලියන්නේ කෙසේද?",
      seoTitle: "CV Work Experience ලිවීමේ ක්‍රමය | CV Guide Sinhala",
      metaDescription: "CV එකේ Work experience කොටස කැපී පෙනෙන ආකාරයට, duties වෙනුවට achievements (ජයග්‍රහණ) යොදාගනිමින් නිවැරදිව ලියන ආකාරය ඉගෙන ගන්න.",
      intro: "ඔබේ CV එකේ හදවත වන්නේ Work experience (රැකියා අත්දැකීම්) කොටසයි. ඔබට මෙම රැකියාව කළ හැකිදැයි තීරණය කිරීමට HR කළමනාකරුවන් වැඩිපුරම බලන කොටස මෙයයි.",
      problemExplanation: "බොහෝ අය කරන්නේ තමන්ගේ පරණ රැකියාවේ Job Description එක එහෙම පිටින්ම copy කර CV එකට දැමීමයි. 'Emails වලට පිළිතුරු දීම', 'සාකච්ඡා වලට සහභාගී වීම' වැනි කම්මැලි දෛනික රාජකාරි වලින් ඔබේ සැබෑ හැකියාව පෙන්නුම් කරන්නේ නැත.",
      whatIsIt: {
        heading: "Work Experience කොටස යනු කුමක්ද?",
        content: "මෙය ඔබගේ වෘත්තීය ඉතිහාසය ආපස්සට (නව රැකියාවේ සිට දක්වා) ලියා දක්වන කොටසයි. අදාළ තනතුර, සමාගම, සේවය කළ කාලය සහ වඩාත්ම වැදගත් වන—එක් එක් රැකියාවේදී ඔබ අත්පත් කරගත් විශේෂ ජයග්‍රහණ මෙහි දැක්වේ."
      },
      whyItMatters: {
        heading: "මෙය වැදගත් වන්නේ ඇයි?",
        content: "සේවා යෝජකයින් පුද්ගලයින් බඳවා ගන්නේ ප්‍රතිඵල නිර්මාණය කිරීම සඳහාය. රාජකාරි වලට වඩා ඔබ කලින් තැන්වල ලබාදුන් ප්‍රතිඵල පෙන්වීමෙන් ඔබට රැකියාව ලැබීමේ සම්භාවිතාව 80% කින් පමණ වැඩිකරගත හැක."
      },
      stepByStep: [
        {
          heading: "පියවර 1: ආපස්සට ලියන්න (Reverse-Chronological Order)",
          content: "සෑමවිටම ඔබ දැනට කරන හෝ අවසානයටම කළ රැකියාව මුලින් ලියන්න. ඉන්පසු ඊට පෙර කළ රැකියාව ලියන්න."
        },
        {
          heading: "පියවර 2: මාතෘකා පැහැදිලිව යොදන්න",
          content: "එක් එක් රැකියාව සඳහා Job Title, Company Name, Location, සහ සිට-දක්වා (Month/Year) කාලසීමාව පැහැදිලිව දක්වන්න."
        },
        {
          heading: "පියවර 3: Bullet Points භාවිතා කරන්න",
          content: "කිසිවිටක රචනාවක් මෙන් ඡේද (paragraphs) ලියන්න එපා. අත්දැකීම් පැහැදිලිව පෙනීමට එක රැකියාවකට Bullet points 3ක් හෝ 5ක් භාවිතා කරන්න."
        },
        {
          heading: "පියවර 4: Action Verbs වලින් පටන්ගන්න",
          content: "සෑම Bullet point එකක්ම 'Managed', 'Developed', 'Spearheaded' වැනි ක්‍රියා පදයකින් (Action Verb) ආරම්භ කරන්න."
        },
        {
          heading: "පියවර 5: රාජකාරි වලට වඩා ජයග්‍රහණ පෙන්වන්න",
          content: "පුළුවන් සෑම තැනකදීම සංඛ්‍යාත්මක දත්ත (Numbers/Percentages) භාවිතා කරන්න. (උදා: 'සේවකයන් පුහුණු කිරීම' වෙනුවට 'නව සේවකයින් 15 දෙනෙකු සාර්ථකව පුහුණු කිරීම')."
        }
      ],
      examples: {
        heading: "රැකියා අත්දැකීම් ලිවීමේ උදාහරණ",
        content: "**Sales Executive | ABC Company | Colombo | 05/2020 - Present**\n- මාස 6ක් ඇතුලත සමාගමේ විකුණුම් 35% කින් ඉහළ නැංවීමට මූලික වී කටයුතු කිරීම.\n- නව පාරිභෝගිකයින් 50+ දෙනෙකු ආයතනය වෙත සාර්ථකව සම්බන්ධ කර ගැනීම.\n- මාසික විකුණුම් වාර්තා (Sales Reports) විශ්ලේෂණය කරමින් නව උපායමාර්ග සැලසුම් කිරීම.\n\n**Customer Service Rep | XYZ Corp | Kandy | 01/2018 - 04/2020**\n- දිනකට පාරිභෝගික දුරකථන ඇමතුම් 60 කට වඩා හසුරුවමින් 98% ක පාරිභෝගික තෘප්තිමත්භාවයක් පවත්වා ගැනීම.\n- පාරිභෝගික ගැටළු සඳහා ලබාදෙන විසඳුම් කාලය 15% කින් අවම කිරීම."
      },
      commonMistakes: {
        heading: "ඔබ කරන සුලභ වැරදි",
        content: "- තමන් ලැබූ ප්‍රතිඵල (Achievements) වෙනුවට කරන්නට සිදුවූ දෛනික වැඩ (Duties) පමණක් ලිවීම.\n- රැකියා අතර දිගු කාල පරතරයන් (Career gaps) පැහැදිලි නොකර තැබීම.\n- දින වකවානු වල format එක වෙනස් කිරීම (එක තැනක '2020' හා තව තැනක 'May-21' ලෙස යෙදීම).\n- වර්තමාන රැකියාවට කිසිසේත් අදාළ නොවන ගොඩක් පරණ රැකියා විස්තර ඇතුලත් කිරීම."
      },
      finalChecklist: [
        "රැකියා අත්දැකීම් අලුත්ම එකේ සිට පරණ එකට ලියා තිබේද?",
        "දින වකවානු සහ තනතුරු පැහැදිලිව දක්වා තිබේද?",
        "සෑම කරුණක්ම Action Verb එකකින් ආරම්භ වෙනවාද?",
        "හැකි සෑම තැනකදීම ප්‍රතිශත සහ සංඛ්‍යා පෙන්වා තිබේද?",
        "එක් රැකියාවකට අදාළව Bullet points 3-5 අතර තිබේද?"
      ],
      cta: "කම්මැලි Duty list එකක් වෙනුවට ආකර්ශනීය Achievement-based CV එකක් සාදාගන්න අවශ්‍යද? අදම අපට 'CV REVIEW' ලෙස මැසේජ් කරන්න."
    }
  },
  {
    id: "6",
    categoryId: "a",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "write-achievements-in-cv-instead-of-duties",
      title: "How to Write Achievements in Your CV Instead of Duties",
      seoTitle: "CV Achievements vs Duties | Write Impactful Resumes",
      metaDescription: "Stop listing daily duties on your CV. Learn how to transform your responsibilities into quantifiable achievements and land higher-paying jobs.",
      intro: "If your CV sounds exactly like a job description, you're doing it wrong. Employers already know what a 'Manager' or 'Executive' is supposed to do. What they don't know is how well *you* did it.",
      problemExplanation: "Listing 'Responsible for generating reports' tells the employer what was expected of you, but it doesn't prove you were any good at it. When a recruiter looks at 100 CVs that all list the exact same duties, they have no reason to choose you over anyone else.",
      whatIsIt: {
        heading: "What is an Achievement-Based CV?",
        content: "An achievement-based CV focuses on the impact, value, and results you delivered in your past roles rather than just listing daily tasks. It utilizes metrics, numbers, and clear outcomes to prove your competence."
      },
      whyItMatters: {
        heading: "Why It Matters",
        content: "An achievement-driven bullet point immediately positions you as a high-value candidate. It shifts the conversation from 'Can they do the job?' to 'How much value will they bring us?'. This is the secret to negotiating higher salaries and securing executive interviews."
      },
      stepByStep: [
        {
          heading: "Step 1: Identify Your Wins",
          content: "Ask yourself: Did I save the company money? Did I make the company money? Did I save time or improve a process? Did I earn an award or promotion?"
        },
        {
          heading: "Step 2: Use the XYZ Formula",
          content: "Transform duties into achievements using Google's famous XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z].'"
        },
        {
          heading: "Step 3: Quantify Everything",
          content: "Whenever possible, add numbers, dollars (or Rupees), percentages, or timeframes. 'Managed a large budget' is weak. 'Managed a 10M LKR marketing budget' is strong."
        },
        {
          heading: "Step 4: Swap Weak Verbs for Action Verbs",
          content: "Remove 'Responsible for' or 'Assisted in'. Use verbs like 'Orchestrated', 'Slashed', 'Pioneered', 'Generated', or 'Optimized'."
        }
      ],
      examples: {
        heading: "Duty vs Achievement Transformation",
        content: "**Duty:** Responsible for managing company social media.\n**Achievement:** Grew Instagram following by 150% and increased lead generation by 40% over 8 months through targeted organic content strategies.\n\n**Duty:** Handled customer complaints.\n**Achievement:** Resolved 50+ tier-2 customer disputes daily, maintaining a 99% client retention rate and receiving 'Employee of the Month' twice.\n\n**Duty:** Looked after the IT network.\n**Achievement:** Slashed system downtime by 25% by configuring and deploying a new cloud-based automated backup system."
      },
      commonMistakes: {
        heading: "Common Mistakes When Writing Achievements",
        content: "- Exaggerating or lying about metrics (Recruiters will verify your claims during the interview).\n- Using numbers that lack context (e.g., 'Increased sales by 5000' - is that dollars? units?).\n- Making bullet points too long and difficult to read.\n- Failing to connect the achievement to the larger business goal."
      },
      finalChecklist: [
        "Did I replace 'Responsible for' with strong Action Verbs?",
        "Are there specific numbers, percentages, or timeframes?",
        "Does the bullet point explain *how* I achieved the result?",
        "Are these achievements directly relevant to the job I want?",
        "Did I focus on the impact I made on the business?"
      ],
      cta: "Struggling to quantify your past experience? Let our professional writers uncover your hidden achievements. Message 'CV UPGRADE' today."
    },
    si: {
      slug: "cv-eka-achievements-liana-hati",
      title: "CV එකේ Duties (රාජකාරි) වෙනුවට Achievements (ජයග්‍රහණ) ලියන්නේ කෙසේද?",
      seoTitle: "CV Achievements vs Duties | Sinhala Guide",
      metaDescription: "ඔබේ CV එකේ දෛනික රාජකාරි ලිවීම නවතා, ආයතන සෙවීම් වලදී කැපීපෙනෙන ආකාරයේ Achievements ලිවීමට ක්‍රමවේද ඉගෙනගන්න.",
      intro: "ඔබේ CV එක හරියටම Job Description එකක් වගේ පේනවා නම් ඔබ කරන්නේ විශාල වරදකි. Manager කෙනෙක් හෝ Executive කෙනෙක් කරන්න ඕන මොනවද කියලා HR කළමනාකරුවන් දනියි. ඔවුන්ට දැනගන්න අවශ්‍ය ඔබ ඒ දේවල් කොතරම් හොඳින් කලාද යන්නයි.",
      problemExplanation: "'වාර්තා සැකසීම මාගේ රාජකාරිය විය' ලෙස ලිවීමෙන් පෙන්වන්නේ ඔබට කරන්නට පැවරුණු වැඩ කොටස මිස ඔබ එය කෙතරම් සාර්ථකව කළාද යන්න නොවේ. එකම රාජකාරි ලැයිස්තුවක් ඇති CV 100 ක් අතරින් ඔබව තෝරාගැනීමට ඔවුන්ට කිසිදු විශේෂ හේතුවක් මෙවිට නැත.",
      whatIsIt: {
        heading: "Achievement-Based CV එකක් යනු කුමක්ද?",
        content: "මෙහිදී හුදු රාජකාරි ලැයිස්තුගත කරනවා වෙනුවට, ඔබ කළ රැකියාවෙන් ඇතිකළ බලපෑම සහ ජයග්‍රහණ අවධාරණය කෙරේ. ඔබේ නිපුණත්වය ඔප්පු කිරීම සඳහා සංඛ්‍යාත්මක දත්ත සහ පැහැදිලි ප්‍රතිඵල මෙහිදී භාවිත වේ."
      },
      whyItMatters: {
        heading: "මෙය වැදගත් වන්නේ ඇයි?",
        content: "රාජකාරි වලට වඩා ජයග්‍රහණ පෙන්වීම හරහා ඔබ සාමාන්‍ය සේවකයෙකු නොව ඉහළ වටිනාකමක් ඇති (High-value) පුද්ගලයෙකු බව ඔප්පු කරයි. ඉහළ වැටුප් සාකච්ඡා කිරීමට පවා මෙම ක්‍රමය ඉතා ප්‍රබල බලපෑමක් කරයි."
      },
      stepByStep: [
        {
          heading: "පියවර 1: ඔබගේ ජයග්‍රහණ හඳුනාගන්න",
          content: "ඔබෙන්ම මෙලෙස අසන්න: මා සමාගමේ මුදල් ඉතුරු කළාද? ආයතනයට අලුතෙන් ආදායම් ගෙනාවාද? කාලය ඉතුරු කරන ක්‍රමවේද හැදුවාද? මට විශේෂ සම්මාන හෝ උසස්වීම් ලැබුනාද?"
        },
        {
          heading: "පියවර 2: XYZ සූත්‍රය භාවිතා කරන්න",
          content: "Google සමාගම නිර්දේශ කරන XYZ සූත්‍රය භාවිතා කරන්න: '[Z] ක්‍රමවේදය කිරීම මගින්, [X] ප්‍රමාණයේ ප්‍රතිඵලයක්/ජයග්‍රහණයක් ලබාගත්තා. එය [Y] දත්තයෙන් සනාථ වේ.'"
        },
        {
          heading: "පියවර 3: හැමදේකටම අගයන් දෙන්න (Quantify)",
          content: "හැකි සෑම විටම ප්‍රතිශත, රුපියල් අගයන්, ලක්ෂ හෝ මිලියන ගණන් එකතු කරන්න. 'විශාල budget එකක් හැසිරෙව්වා' ට වඩා 'රු. මිලියන 10ක Marketing Budget එකක් හැසිරෙව්වා' යන්න වඩා ශක්තිමත් ය."
        },
        {
          heading: "පියවර 4: දුර්වල වචන ඉවත් කරන්න",
          content: "'Responsible for' (වගකීම් දැරීය), 'Assisted in' වැනි වචන වෙනුවට 'Optimized', 'Generated', 'Slashed' වැනි ශක්තිමත් Action verbs යොදාගන්න."
        }
      ],
      examples: {
        heading: "Duties ජයග්‍රහණ බවට පත් කරන ආකාරය",
        content: "**රාජකාරිය ලිවීම:** ආයතනයේ ෆේස්බුක් පිටුව බලාගැනීම.\n**ජයග්‍රහණය ලිවීම:** මාස 8ක් ඇතුලත ආයතනයේ Instagram followers ප්‍රමාණය 150% කින් වර්ධනය කල අතර, නිසි content උපායමාර්ග හරහා leads 40% කින් ඉහළ නැංවීමට මූලික විය.\n\n**රාජකාරිය ලිවීම:** පාරිභෝගික පැමිණිලි විසඳීම.\n**ජයග්‍රහණය ලිවීම:** දිනකට පැමිණිලි 50+ ප්‍රමාණයක් කාර්යක්ෂමව විසඳමින් පාරිභෝගික රඳවාගැනීම 99% ක මට්ටමේ පවත්වා ගත් අතර, දෙවරක් 'Employee of the Month' සම්මානය ලබාගැනීම.\n\n**රාජකාරිය ලිවීම:** IT පද්ධතිය බලාගැනීම.\n**ජයග්‍රහණය ලිවීම:** නව automated cloud backup ක්‍රමවේදයක් හඳුන්වාදෙමින් පද්ධතිය බිඳවැටෙන (Network downtime) කාලය 25% කින් අවම කිරීම."
      },
      commonMistakes: {
        heading: "ඔබ කරන සුලභ වැරදි",
        content: "- ජයග්‍රහණ සහ දත්ත බොරුවට වැඩිකර පෙන්වීම (සම්මුඛ පරීක්ෂණයේදී ඔවුන් ඒවා පරික්ෂා කරයි).\n- තේරුමක් නැති සංඛ්‍යා යෙදීම (උදා: 'විකුණුම් 5000 කින් වැඩි කලා' - 5000ක් කියන්නේ රුපියල් ද? නැත්නම් විකිණුනු භාණ්ඩ ප්‍රමාණයද?).\n- කියවීමට අපහසු වන පරිදි bullet points අවශ්‍යවට වඩා දිගට ලිවීම."
      },
      finalChecklist: [
        "මාගේ කරුණු දුර්වල වචන වෙනුවට Strong Action Verbs වලින් පටන්ගන්නවාද?",
        "කරුණු වල නිශ්චිත ප්‍රතිශත හෝ සංඛ්‍යාත්මක දත්ත අඩංගුද?",
        "මෙම ජයග්‍රහණය ලබාගැනීමට මා කල දේ පැහැදිලිද?",
        "මෙම ජයග්‍රහණ මා අයදුම් කරන රැකියාවට ගැලපෙනවාද?",
        "ආයතනයට මා ලබාදුන් වටිනාකම මින් පැහැදිලි වෙනවාද?"
      ],
      cta: "ඔබේ අත්දැකීම් වලින් ජයග්‍රහණ වෙන්කර හඳුනා ගැනීමට අපහසුද? අපගේ වෘත්තීය CV රචකයින්ට ඒ සඳහා උදව් විය හැක. 'CV UPGRADE' ලෙස අදම WhatsApp පණිවිඩයක් එවන්න."
    }
  },
  {
    id: "7",
    categoryId: "a",
    coverImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "how-to-choose-the-best-cv-format-sri-lanka",
      title: "How to Choose the Best CV Format for Sri Lankan Jobs",
      seoTitle: "Best CV Format for Sri Lanka Jobs | ATS CV Formats",
      metaDescription: "Confused about which CV format to use? Learn the difference between chronological, functional, and hybrid CVs, and find out which one works best in Sri Lanka.",
      intro: "A great CV with a bad layout is like a luxury car with square wheels—it’s not going anywhere. The format you choose determines whether recruiters understand your value or toss your application within seconds.",
      problemExplanation: "Many Sri Lankan job seekers make the mistake of using 'Functional' or 'Skills-based' CVs with heavy graphics. Unfortunately, Applicant Tracking Systems (ATS) and local HR managers struggle to read these, preferring straightforward timelines of your experience.",
      whatIsIt: {
        heading: "What Are the Main CV Formats?",
        content: "There are three primary CV formats globally: Reverse-Chronological (listing experience from newest to oldest), Functional (focusing heavily on skills rather than timelines), and Hybrid (a mix of both). Each serves a different career situation."
      },
      whyItMatters: {
        heading: "Why Picking the Right Format Matters",
        content: "Your format dictates the narrative of your career. If you choose the wrong one, you risk highlighting career gaps or confusing the ATS bots, leading to instant rejections even if you are highly qualified."
      },
      stepByStep: [
        {
          heading: "1. The Reverse-Chronological Format (Recommended)",
          content: "This is the gold standard. It lists your current or most recent job first and works backward. **Best for:** 95% of job seekers, anyone with a steady career path, and all ATS applications."
        },
        {
          heading: "2. The Functional (Skills-Based) Format",
          content: "This format groups your experience by skill categories rather than chronological jobs. It hides work history timelines. **Best for:** Almost no one in the modern corporate world. HR managers generally dislike this format because it looks like you are hiding something."
        },
        {
          heading: "3. The Hybrid (Combination) Format",
          content: "This blends a strong skills summary at the top with a standard reverse-chronological work history below. **Best for:** Career changers, senior executives with diverse skill sets, or those re-entering the workforce."
        },
        {
          heading: "4. Europass and Other International Formats",
          content: "Europass is required for some European jobs, but it is overly complex and generally hated by ATS software and private corporate recruiters in Sri Lanka. Avoid it unless specifically requested by an embassy."
        },
        {
          heading: "5. Choosing the Format for Sri Lanka",
          content: "In Sri Lanka, the corporate sector heavily relies on quick screening and ATS software. Therefore, the **Reverse-Chronological** format is universally the safest and most effective choice."
        }
      ],
      examples: {
        heading: "Format Structure Example (Reverse-Chronological)",
        content: "**Header:** Contact Info & LinkedIn\n**Summary:** 3-4 lines of professional value\n**Skills:** Bulleted list of ATS keywords\n**Work Experience:** Most recent job first, focusing on achievements\n**Education:** Highest degree first"
      },
      commonMistakes: {
        heading: "Common Formatting Mistakes",
        content: "- Using a 'Functional' CV to hide career gaps (Recruiters will notice and assume the worst).\n- Sending a highly graphic Canva CV for a Bank or Finance role.\n- Using side-by-side columns which break Applicant Tracking Systems.\n- Making the CV 5 pages long just to fill space."
      },
      finalChecklist: [
        "Did I choose the Reverse-Chronological format?",
        "Is my contact information at the very top?",
        "Are my job dates clearly aligned on the right or left?",
        "Did I avoid heavy graphics, tables, and columns?",
        "Is my CV easy to scan from top to bottom?"
      ],
      cta: "Not sure if your CV format is holding you back? Get an expert review today by messaging 'CV FORMAT'."
    },
    si: {
      slug: "lankawe-hondama-cv-format-eka-thoraganne-kohomada",
      title: "ශ්‍රී ලංකාවේ රැකියා සඳහා හොඳම CV Format එක තෝරාගන්නේ කෙසේද?",
      seoTitle: "හොඳම CV Format එක තෝරාගමු | CV formats in Sri Lanka",
      metaDescription: "Chronological, Functional සහ Hybrid CV formats ගැන සිංහලෙන් දැනගන්න. ශ්‍රී ලංකාවට වඩාත්ම සුදුසු CV ආකෘතිය කුමක්දැයි ඉගෙනගන්න.",
      intro: "ලස්සන වුනාට වැඩක් නැහැ, හරියට කියවන්න බැරි නම්. ඔබ තෝරාගන්නා CV ආකෘතිය (Format) අනුව තීරණය වෙනවා HR කළමනාකරු එය සම්පූර්ණයෙන් කියවනවාද නැද්ද යන්න.",
      problemExplanation: "අන්තර්ජාලයෙන් දකින විවිධ වර්ණවත් formats (උදා: Canva templates) සහ Functional formats ලංකාවේ රැකියා සඳහා භාවිතා කිරීමෙන් ATS මෘදුකාංග ඔබව ප්‍රතික්ෂේප කරනු ඇත.",
      whatIsIt: {
        heading: "ප්‍රධාන CV Formats මොනවාද?",
        content: "ලෝකයේ ප්‍රධාන වශයෙන් CV ආකෘති 3ක් ඇත: Reverse-Chronological (නව රැකියාවේ සිට පරණ රැකියාවට ලැයිස්තුගත කිරීම), Functional (කාලයට වඩා කුසලතා වලට මුල්තැන දීම), සහ Hybrid (මේ දෙකේම මිශ්‍රණයක්)."
      },
      whyItMatters: {
        heading: "නිවැරදි Format එක වැදගත් ඇයි?",
        content: "ඔබේ වෘත්තීය ගමන කෙතරම් සාර්ථකව පෙළගස්වා තිබේද යන්න මෙමගින් පෙන්වයි. වැරදි format එකක් තේරීමෙන් පරිගණක මෘදුකාංග (ATS) මාර්ගයෙන් ඔබව ස්වයංක්‍රීයවම reject වීමට අවස්ථාව ඇත."
      },
      stepByStep: [
        {
          heading: "1. Reverse-Chronological Format (වඩාත්ම සුදුසුයි)",
          content: "මෙය ලෝකයේ මෙන්ම ලංකාවේද පිළිගත් සම්මතම ක්‍රමයයි. මෙහිදී ඔබ දැනට කරන රැකියාව මුලින්ම ලියා, ඉන්පසු ඊට පෙර කල රැකියාව ලියයි. සියලුම ATS මෘදුකාංග වලට කියවිය හැකි හොඳම ක්‍රමය මෙයයි."
        },
        {
          heading: "2. Functional (Skills-Based) Format",
          content: "මෙහිදී රැකියා කල කාලසීමාවන් නොපෙන්වා ඔබගේ හැකියාවන් පමණක් ලියා දක්වයි. ලංකාවේ ආයතන කළමනාකරුවන් මෙම ක්‍රමයට කැමති නැත, මන්ද එයින් කුමක් හෝ කාරණයක් සඟවන බවක් ඔවුන්ට හැඟෙන බැවිනි."
        },
        {
          heading: "3. Hybrid (Combination) Format",
          content: "අධික කුසලතා ප්‍රමාණයක් ඇති විධායක නිලධාරීන්ට මෙන්ම ක්ෂේත්‍රය වෙනස් කරන (Career changers) අයට මෙය සුදුසුය. මෙහි ඉහළින්ම කුසලතා විස්තර කර පහළින් රැකියා ඉතිහාසය සාමාන්‍ය පරිදි දක්වයි."
        },
        {
          heading: "4. Europass Format එක",
          content: "සමහර යුරෝපීය රැකියා සඳහා මෙය අනිවාර්ය වුවත්, සාමාන්‍ය ලංකාවේ ආයතන මෙම සංකීර්ණ format එකට කිසිසේත්ම කැමති නැත. තානාපති කාර්යාලයකින් ඉල්ලා සිටියහොත් පමණක් මෙය භාවිතා කරන්න."
        },
        {
          heading: "5. ලංකාවට ගැලපෙන ආකෘතිය මතක තබාගන්න",
          content: "ශ්‍රී ලංකාවේ රැකියා සහ ATS මෘදුකාංග සඳහා කිසිදු පසුබට වීමකින් තොරව **Reverse-Chronological** ආකෘතියම පමණක් භාවිතා කරන්න."
        }
      ],
      examples: {
        heading: "Reverse-Chronological ආකෘතියේ සැකැස්ම",
        content: "**Header:** Contact Info (නම, දුරකථනය, Email, LinkedIn)\n**Summary:** පේළි 3-4 ක වෘත්තීය හැඳින්වීම\n**Skills:** රැකියාවට අදාල Keywords අඩංගු කුසලතා\n**Work Experience:** අලුත්ම රැකියාව මුලින්ම (Achievements සමග)\n**Education:** උසස්ම අධ්‍යාපන සුදුසුකම මුලින්ම"
      },
      commonMistakes: {
        heading: "බොහෝ දෙනෙක් කරන වැරදි",
        content: "- රැකියා අතර ඇති හිඩැස් (Career gaps) වසන් කිරීමට Functional format එක භාවිතා කිරීම.\n- බැංකු වැනි වෘත්තීය රැකියාවකට Canva හි ඇති මල් වැල් දැමූ CV යැවීම.\n- තීරු දෙකකට (Two-columns) CV එක සෑදීම. මෙයින් ATS මෘදුකාංගය confuse වේ."
      },
      finalChecklist: [
        "මා Reverse-Chronological format එක තෝරා ගත්තාද?",
        "පුද්ගලික තොරතුරු CV එකේ ඉහලින්ම තිබේද?",
        "දින වකවානු නිවැරදිව පිළිවෙලකට තිබේද?",
        "Two-columns සහ පින්තූර ඉවත් කර තිබේද?",
        "CV එක කියවීමට පහසු, පැහැදිලි එකක්ද?"
      ],
      cta: "ඔබේ CV format එක අලුත් ATS ප්‍රමිතියට ගැලපෙනවාදැයි සැකද? 'CV FORMAT' ලෙස මැසේජ් කල අපගේ විශේෂඥයන් ලවා එය පරික්ෂා කරගන්න."
    }
  },
  {
    id: "8",
    categoryId: "a",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "how-to-write-cv-without-work-experience",
      title: "How to Write a CV Without Work Experience",
      seoTitle: "Write a CV with No Experience | Entry Level CV Guide",
      metaDescription: "No work experience? No problem. Learn how to write a winning CV using your education, projects, volunteer work, and soft skills.",
      intro: "Getting your foot in the door is the hardest part. You need experience to get a job, but you need a job to get experience. It’s the ultimate catch-22.",
      problemExplanation: "Many young applicants leave their 'Experience' section completely blank or fill their CV with irrelevant hobbies. This instantly marks them as unprepared. Employers know you don't have corporate experience, but they still want to see *a track record of doing things*.",
      whatIsIt: {
        heading: "What is a No-Experience CV?",
        content: "A no-experience CV focuses on academic achievements, extracurricular activities, personal projects, and transferable skills to demonstrate your work ethic, trainability, and potential to the employer."
      },
      whyItMatters: {
        heading: "Why It Matters",
        content: "When employers hire entry-level staff, they aren't hiring for technical mastery; they are hiring for potential, motivation, and cultural fit. A well-written CV proves you are a self-starter who is ready to learn and adapt."
      },
      stepByStep: [
        {
          heading: "Step 1: Write an Objective-Driven Summary",
          content: "Since you don’t have professional achievements yet, highlight your academic background, your strongest soft skills, and your enthusiasm for entering the specific industry."
        },
        {
          heading: "Step 2: Move Education to the Top",
          content: "Your education is currently your biggest asset. Place it right below your summary. Include your degree, university, graduation date, and relevant coursework or high GPAs."
        },
        {
          heading: "Step 3: Highlight Major Projects",
          content: "Did you build an app? Write a massive research paper? Organize a university event? List these under 'Academic Projects' or 'Personal Projects' formatted just like a job experience section."
        },
        {
          heading: "Step 4: Include Volunteer Work and Extracurriculars",
          content: "Were you in the debate club? A Rotaract or AIESEC member? Volunteering shows leadership, teamwork, and commitment."
        },
        {
          heading: "Step 5: Focus on Transferable Skills",
          content: "List skills that apply to any job: Communication, Problem-Solving, Microsoft Office, Time Management, and any relevant technical skills you learned independently."
        }
      ],
      examples: {
        heading: "Project Experience Example",
        content: "**University Final Year Project: E-Commerce Web App | Jan 2023 - May 2023**\n- Collaborated with a team of 4 to design and develop a fully functional e-commerce platform using React.js and Node.js.\n- Conducted user testing with 50+ students to improve UI navigation.\n- Awarded an 'A' grade for exceptional project management and technical execution."
      },
      commonMistakes: {
        heading: "Common Mistakes",
        content: "- Apologizing for having no experience in the summary or cover letter.\n- Listing basic hobbies that don't add value (e.g., 'Watching movies', 'Sleeping').\n- Sending a mostly empty page (expand on your academic projects to fill the space effectively).\n- Ignoring spelling and grammar (if you have no experience, your attention to detail on the CV must be perfect)."
      },
      finalChecklist: [
        "Is my Education section prominently placed at the top?",
        "Did I include academic or personal projects?",
        "Have I listed relevant volunteer work and club memberships?",
        "Are my transferable soft and hard skills visible?",
        "Is the formatting clean, professional, and free of typos?"
      ],
      cta: "Need help structuring your first entry-level CV? Message us 'FRESHER CV' and let our experts build your professional profile."
    },
    si: {
      slug: "palapuruddak-nomathiwa-cv-ekak-hadanne-kohomada",
      title: "රැකියා පළපුරුද්දක් නොමැතිව (No Experience) CV එකක් ලියන්නේ කෙසේද?",
      seoTitle: "පළපුරුද්දක් නොමැතිව CV ලියමු | No Experience CV Sinhala",
      metaDescription: "කිසිදු රැකියා අත්දැකීමක් නොමැතිව, අධ්‍යාපනය, projects සහ volunteer වැඩ යොදාගනිමින් ආකර්ශනීය CV එකක් ලියන ආකාරය ඉගෙන ගන්න.",
      intro: "රැකියාවක් ගන්න පළපුරුද්ද ඕනෑ, ඒත් පළපුරුද්ද ගන්න රැකියාවක් කරන්නම ඕනෑ. අලුතෙන් රැකියා සොයන බොහෝ දෙනෙක් මුහුණ දෙන ප්‍රධානතම ගැටලුව මෙයයි.",
      problemExplanation: "බොහෝ තරුණ අයදුම්කරුවන් තම CV එකේ 'Experience' කොටස හිස්ව තබයි, නැතහොත් තේරුමක් නැති විනෝදාංශ (Hobbies) වලින් පුරවයි. ආයතන ඔබෙන් රැකියා පළපුරුද්දක් බලාපොරොත්තු නොවුණත්, ඔබ 'වැඩක් කල හැකි, උනන්දුවක් ඇති කෙනෙක්' බව ඔප්පු කිරීම අත්‍යවශ්‍ය වේ.",
      whatIsIt: {
        heading: "No-Experience CV එකක් යනු කුමක්ද?",
        content: "මෙය රැකියා ඉතිහාසයක් වෙනුවට ඔබගේ අධ්‍යාපනික ජයග්‍රහණ, Extracurricular activities (බාහිර ක්‍රියාකාරකම්), Projects, සහ Transferable skills (කුසලතා) මත පදනම්ව සකසන CV ආකෘතියකි."
      },
      whyItMatters: {
        heading: "මෙය වැදගත් වන්නේ ඇයි?",
        content: "Entry-level රැකියාවක් සඳහා බඳවාගැනීමේදී ආයතන බලන්නේ ඔබේ විශේෂඥ දැනුම නොවේ; ඔබේ විභවය (potential), ඉගෙනගැනීමට ඇති කැමැත්ත සහ ආකල්පයයි. නිවැරදි CV එකක් හරහා ඔබට එම ලක්ෂණ මනාව පෙන්විය හැක."
      },
      stepByStep: [
        {
          heading: "පියවර 1: අරමුණක් සහිත Summary එකක් ලියන්න",
          content: "පළපුරුද්දක් නැති නිසා, ඔබේ අධ්‍යාපනික පසුබිම, ප්‍රබල කුසලතා සහ අදාළ ක්ෂේත්‍රයට සම්බන්ධ වීමට ඇති ඔබේ දැඩි උනන්දුව මෙහිදී අවධාරණය කරන්න."
        },
        {
          heading: "පියවර 2: අධ්‍යාපනය (Education) ඉහළටම ගන්න",
          content: "ඔබගේ ප්‍රබලතම සාධකය මේ මොහොතේ ඔබේ අධ්‍යාපනයයි. එය Summary එකට පහලින්ම දක්වන්න. පාසල/විශ්වවිද්‍යාලය, අනුගමනය කළ විෂයයන් සහ ඉහළ ප්‍රතිඵල ඇලතුලත් කරන්න."
        },
        {
          heading: "පියවර 3: ප්‍රධාන Projects ගැන ලියන්න",
          content: "ඔබ assignment එකකට app එකක් හැදුවාද? Event එකක් සංවිධානය කලාද? Research එකක් කලාද? මේවා රැකියා අත්දැකීම් ලෙසම format කර 'Academic Projects' යටතේ ඇතුලත් කරන්න."
        },
        {
          heading: "පියවර 4: Volunteer වැඩ සහ සමාජ ක්‍රියාකාරකම් දැක්වීම",
          content: "Rotaract, AIESEC හෝ පාසලේ වෙනත් සංගම් වල වැඩ කර තිබේද? ඒ හරහා ඔබේ නායකත්වය සහ කණ්ඩායම් හැඟීම පෙන්විය හැක."
        },
        {
          heading: "පියවර 5: Transferable Skills ඇතුලත් කරන්න",
          content: "ඕනෑම රැකියාවකට ගැලපෙන Communication, Computer/IT, Time Management වැනි soft skills සහ ඔබ තනිවම ඉගෙනගත් තාක්ෂණික කුසලතා දක්වන්න."
        }
      ],
      examples: {
        heading: "Project එකක් CV එකේ ලියන ආකාරය උදාහරණයක්",
        content: "**Academic Project: වාර්ෂික විද්‍යා ප්‍රදර්ශනය සංවිධානය කිරීම | ජනවාරි 2023**\n- 500 කට අධික නරඹන්නන් පිරිසක් සහභාගී වූ ප්‍රදර්ශනයේ ප්‍රධාන සම්බන්ධීකාරක ලෙස 15 දෙනෙකුගෙන් යුත් කණ්ඩායමක් මෙහෙයවීම.\n- Sponsorships හරහා රු. 100,000 ක අරමුදලක් සාර්ථකව රැස් කිරීම.\n- කණ්ඩායම් හැඟීම සහ කාල කළමනාකරණය ප්‍රායෝගිකව භාවිතා කිරීම."
      },
      commonMistakes: {
        heading: "බොහෝ දෙනෙක් කරන වැරදි",
        content: "- 'මට පළපුරුද්දක් නැහැ' කියා CV එකේ හෝ Cover letter එකේ සමාව ගැනීම.\n- 'Watching TV', 'Listening to music' වැනි වෘත්තීය නොවන Hobbies දැමීම.\n- හිස් පිටු යැවීම (Projects වලින් පිටුව පුරවා ගන්න).\n- ව්‍යාකරණ වැරදි (ඔබට පළපුරුද්දක් නැතිනම්, අවම වශයෙන් ඔබේ CV එකේ අකුරු වැරදි හෝ නොතිබිය යුතුය)."
      },
      finalChecklist: [
        "අධ්‍යාපන සුදුසුකම් CV එකේ ඉහළින්ම දක්වා තිබේද?",
        "මගේ Projects අත්දැකීම් ලෙස විස්තර කර තිබේද?",
        "බාහිර ක්‍රියාකාරකම් සහ Volunteer වැඩ ඇතුලත් කර තිබේද?",
        "අදාළ Soft skills සහ Hard skills පැහැදිලිව දක්වා තිබේද?",
        "අක්ෂර වින්‍යාසය සහ ව්‍යාකරණ 100% නිවැරදිද?"
      ],
      cta: "පළමු රැකියාවට CV එක හදාගන්න උදව් අවශ්‍යද? 'FRESHER CV' ලෙස අපට පණිවිඩයක් එවන්න."
    }
  },
  {
    id: "9",
    categoryId: "a",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "how-to-write-cv-for-first-job",
      title: "How to Write a CV for Your First Job",
      seoTitle: "First Job CV Format & Guide | Start Your Career",
      metaDescription: "Applying for your very first job? Learn how to structure your CV, what to include, and how to prove you are the right fit with zero professional experience.",
      intro: "Writing a CV for the first time can be intimidating. You look at templates online and realize you don’t have the flashy titles or 10 years of experience they show.",
      problemExplanation: "Most first-time job seekers resort to using a standardized form they bought from a local communication shop, filling in generic details. These 'bio-data' formats look highly unprofessional and usually end up in the recycle bin.",
      whatIsIt: {
        heading: "What is a First Job CV?",
        content: "A first job CV is a foundational professional document focused heavily on soft skills, academic background, trainability, and character. It replaces professional history with academic and personal history to build a profile of a reliable candidate."
      },
      whyItMatters: {
        heading: "Why It Matters",
        content: "Your first CV is your formal introduction to the corporate world. Providing a clean, professional, ATS-friendly document immediately sets you apart from 90% of other school leavers or young adults applying for the same role."
      },
      stepByStep: [
        {
          heading: "Step 1: Write a Targeted Summary",
          content: "Keep it short. Mention your recent educational milestone, 2 strong soft skills, and your eagerness to start a career in that specific field."
        },
        {
          heading: "Step 2: Detail Your Education",
          content: "List your A/L results, O/L results (only if A/Ls aren't completed), and any diplomas or certifications. Mention extracurricular activities like sports, debating, or society memberships."
        },
        {
          heading: "Step 3: Emphasize 'Soft Skills'",
          content: "Employers want to know you are reliable. Focus on skills like adaptability, teamwork, punctuality, active listening, and basic computer literacy."
        },
        {
          heading: "Step 4: Include Any Part-Time Gigs",
          content: "Did you help at your uncle's store? Work as a cashier for a month? Sell items online? All of these count as early work experience and show strong work ethic."
        },
        {
          heading: "Step 5: Pick the Right Template",
          content: "Do not use complex two-column templates. Stick to a simple, clean, linear Word to PDF document that an Applicant Tracking System can read."
        }
      ],
      examples: {
        heading: "Good Summary for a First Job",
        content: "**Summary Example:** Highly organized and motivated recent high school graduate with a Diploma in IT. Proven ability to work well in teams through 3 years of school sports leadership. Eager to bring strong communication skills and a fast-learning attitude to the Customer Service Trainee role at [Company Name]."
      },
      commonMistakes: {
        heading: "Common Mistakes",
        content: "- Using the outdated 'Bio-Data' format with details like Age, Religion, and Marital Status.\n- Forgetting to include an email address or using an unprofessional one.\n- Writing long paragraphs instead of bullet points.\n- Not tailoring the CV for the specific job applied for."
      },
      finalChecklist: [
        "Is my contact information professional and accurate?",
        "Did I clearly list my educational qualifications?",
        "Did I highlight transferable soft skills?",
        "Is the format clean and professional?",
        "Did I save it as a PDF before sending?"
      ],
      cta: "Step into the corporate world with confidence! Message 'START CV' to get a professional CV crafted for your very first job."
    },
    si: {
      slug: "palamu-rakiyawata-cv-ekak-hadaganne-kohomada",
      title: "ඔබේ පළමු රැකියාව (First Job) සඳහා CV එකක් සාදා ගන්නේ කෙසේද?",
      seoTitle: "පළමු රැකියාවට CV ආකෘතිය | First Job CV Sinhala",
      metaDescription: "පළමු වතාවට රැකියාවකට අයදුම් කරද්දී පාසල් අත්දැකීම් සහ අධ්‍යාපනය උපයෝගී කරගෙන සාර්ථක CV එකක් ලියන ආකාරය ඉගෙනගන්න.",
      intro: "පළමු වරට CV එකක් ලිවීම තරමක් පීඩාකාරී විය හැක. අන්තර්ජාලයේ ඇති templates දකින විට ඔබට ඒ තරම් අත්දැකීම් නැති බවක් ඔබටම හැඟෙන්නට පුළුවන.",
      problemExplanation: "බොහෝ තරුණ අයදුම්කරුවන් කරන්නේ කඩයකින් ගත් 'Bio-data' ෆෝම් එකක් පුරවා යැවීමයි. Age, Religion වැනි අනවශ්‍ය දේවල් පිරිණු මෙම පැරණි ක්‍රමය නිසා ඔබේ අයදුම්පත සම්මුඛ පරීක්ෂණයටත් පෙරම කුණු කූඩයට යා හැක.",
      whatIsIt: {
        heading: "පළමු රැකියාවේ CV එකක් යනු කුමක්ද?",
        content: "මෙය වෘත්තීය ඉතිහාසයකට වඩා ඔබේ අධ්‍යාපනය, චරිත ස්වභාවය සහ ඉගෙන ගැනීමට ඇති හැකියාව (Trainability) ගැන ආයතනයට ඒත්තු ගන්වන වෘත්තීය නිල ලියවිල්ලකි."
      },
      whyItMatters: {
        heading: "මෙය වැදගත් වන්නේ ඇයි?",
        content: "ඔබේ පළමු CV එක යනු ඔබ වෘත්තීය ලෝකයට තබන පළමු පියවරයි. ඉතා පිරිසිදු, පැහැදිලි CV එකක් යැවීමෙන් ඔබ සෙසු පාසල් අවසන් කළ අයදුම්කරුවන්ගෙන් 90% කට වඩා කැපී පෙනෙනු ඇත."
      },
      stepByStep: [
        {
          heading: "පියවර 1: පැහැදිලි Summary එකක් ලියන්න",
          content: "එය කෙටි කරන්න. ඔබගේ අධ්‍යාපන මට්ටම, ප්‍රබල කුසලතා 2ක්, සහ අදාළ ආයතනයේ වැඩ කිරීමට ඇති ඔබේ කැමැත්ත පැහැදිලි කරන්න."
        },
        {
          heading: "පියවර 2: අධ්‍යාපනය විස්තර කරන්න",
          content: "A/L, මුලික ඩිප්ලෝමා (දැනට කරමින් පවතින ඒවාද ඇතුලත්ව) දක්වන්න. පාසලේ කළ ක්‍රීඩා, සමිති සමාගම් වල තනතුරු ආදිය අනිවාර්යයෙන් සඳහන් කරන්න."
        },
        {
          heading: "පියවර 3: Soft Skills (මෘදු කුසලතා) ඉස්මතු කරන්න",
          content: "ආයතන වලට අවශ්‍ය විශ්වාසවන්ත අයයි. කණ්ඩායම් හැඟීම, වෙලාවට වැඩ කිරීම, සන්නිවේදනය, සහ පරිගණක සාක්ෂරතාවය වැනි දේවල් කුසලතා ලෙස දක්වන්න."
        },
        {
          heading: "පියවර 4: කුඩා හෝ අර්ධකාලීන වැඩ ඇතුලත් කරන්න",
          content: "ඔබ මාසයක් කොහේ හෝ part-time වැඩ කලාද? Online බඩු විකුණුවාද? මේ හැමදෙයින්ම ඔබගේ මහන්සිවී වැඩ කිරීමේ හැකියාව පෙන්නුම් කෙරේ."
        },
        {
          heading: "පියවර 5: නිවැරදි Template එක තෝරන්න",
          content: "අනවශ්‍ය වර්ණ සහ columns ඇති templates භාවිතයෙන් වළකින්න. සරල, පහලට ෆෝමැට් වූ Word Document එකක් සාදා එය PDF කරන්න."
        }
      ],
      examples: {
        heading: "පළමු රැකියාවට සුදුසු Summary උදාහරණයක්",
        content: "**Summary Example:** තොරතුරු තාක්ෂණය පිළිබඳ ඩිප්ලෝමාවක් අවසන් කළ, නව දේවල් ඉගෙනීමට දැඩි උනන්දුවක් දක්වන තරුණයෙකි. වසර 3ක පාසල් ක්‍රීඩා කණ්ඩායම් නායකත්වය හරහා කණ්ඩායම් ක්‍රියාකාරිත්වය ප්‍රායෝගිකව ප්‍රගුණ කර ඇත. [ආයතනයේ නම] හි Customer Service Trainee තනතුර යටතේ මගේ සන්නිවේදන කුසලතා උපරිමයෙන් සමාගමට ලබාදීමට අපේක්ෂා කරමි."
      },
      commonMistakes: {
        heading: "ඔබ කරන සුලභ වැරදි",
        content: "- පරණ සම්ප්‍රදායේ 'Bio-Data' ලිවීම (ආගම, ජාතිය, වයස ඇතුලත් කිරීම).\n- වෘත්තීය නොවන email එකක් දැමීම (ශිෂ්‍ය කාලයේ හැදූ emails වෙනුවට නම සහිත අලුත් email එකක් හදාගන්න).\n- තොරතුරු බුලට් පොයින්ට් (Bullet points) නොමැතිව ඡේද ලෙස ලිවීම."
      },
      finalChecklist: [
        "සම්බන්ධ කරගත හැකි තොරතුරු නිවැරදිද?",
        "අධ්‍යාපනික සුදුසුකම් පැහැදිලිව දක්වා තිබේද?",
        "කණ්ඩායම් වැඩ සහ නායකත්ව කුසලතා ඇතුලත්ද?",
        "CV එක පිරිසිදු වෘත්තීය මට්ටමක පවතිනවාද?",
        "යැවීමට පෙර මෙය PDF එකක් බවට පත්කලාද?"
      ],
      cta: "වෘත්තීය ලෝකයට ඔබේ පළමු පියවර සාර්ථක කරගන්න! 'START CV' ලෙස අපට පණිවිඩයක් එවන්න."
    }
  },
  {
    id: "10",
    categoryId: "a",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "how-to-write-fresh-graduate-cv-sri-lanka",
      title: "How to Write a Fresh Graduate CV in Sri Lanka",
      seoTitle: "Fresh Graduate CV Format Sri Lanka | University Leavers",
      metaDescription: "Graduating soon? Learn how to structure a fresh graduate CV in Sri Lanka to highlight your degree, final year project, and internships to secure your first executive role.",
      intro: "You finally have your degree, but so do thousands of other fresh graduates entering the Sri Lankan job market this year. How do you convince an employer to hire you?",
      problemExplanation: "Many university graduates write purely academic CVs detailing every module they took. Employers in the corporate sector don't care about your course modules; they care about what practical skills you derived from them and whether you are ready for a real-world office environment.",
      whatIsIt: {
        heading: "What is a Graduate CV?",
        content: "A fresh graduate CV is a targeted resume that bridges the gap between your academic achievements and corporate requirements. It brings your internships, final year projects, and academic leadership to the forefront."
      },
      whyItMatters: {
        heading: "Why It Matters",
        content: "Graduate roles and management trainee programs are highly competitive. A well-optimized ATS-friendly graduate CV gets you past the automated filters and proves you have the practical hard skills (like data analysis, programming, or accounting standards) the job requires."
      },
      stepByStep: [
        {
          heading: "Step 1: The 'Education First' Approach",
          content: "As a fresh graduate, your degree is your strongest selling point. Place Education near the top. Include your university, degree title, class/GPA (if it's a 2nd upper or 1st class), and graduation year."
        },
        {
          heading: "Step 2: Spotlight Your Final Year Project or Thesis",
          content: "Treat your major university project like a job. Dedicate a section to it. Explain the problem you solved, the tools/software you used, and the final outcome of the research."
        },
        {
          heading: "Step 3: Detail Your Internship Experience",
          content: "If you did a 6-month undergraduate internship, this should be detailed extensively under 'Work Experience'. Focus on what you delivered, not just what you observed."
        },
        {
          heading: "Step 4: Include University Societies & Leadership",
          content: "Being a board member of the Rotaract club, Leo club, or Student Union in Sri Lankan universities carries heavy weight. It proves teamwork, networking, and leadership."
        },
        {
          heading: "Step 5: List Hard Technical Skills",
          content: "Create a dedicated 'Technical Skills' section. List software, programming languages, accounting tools, or laboratory techniques you mastered during your degree."
        }
      ],
      examples: {
        heading: "Internship & Project Example",
        content: "**Internship Experience**\n*Marketing Intern | Dialog Axiata | Jan 2023 - Jun 2023*\n- Assisted in running 3 digital ad campaigns, contributing to a 10% increase in youth segment engagement.\n- Analyzed weekly competitor data using Excel and presented findings to the Head of Marketing.\n\n**Academic Project**\n*Final Year Research: Consumer Behavior Analytics*\n- Surveyed 500+ participants and analyzed data using SPSS to determine buying patterns post-economic crisis. Awarded an 'A' grading."
      },
      commonMistakes: {
        heading: "Common Mistakes",
        content: "- Listing every single university module you studied.\n- Making the CV beautifully designed but completely unreadable by ATS software.\n- Hiding your internship at the bottom of the page.\n- Forgetting to mention specific hard skills."
      },
      finalChecklist: [
        "Is my degree and GPA clearly visible at the top?",
        "Did I elaborate on my internship using bullet points?",
        "Is my final year project highlighted?",
        "Are club memberships and leadership roles included?",
        "Does the CV pass standard ATS formatting rules?"
      ],
      cta: "Let your degree shine! Message 'GRAD CV' to get a professional CV that lands executive interviews."
    },
    si: {
      slug: "fresh-graduate-keneck-cv-ekak-hadanne-kohomada",
      title: "ශ්‍රී ලංකාවේ Fresh Graduate කෙනෙකු සඳහා අගනා CV එකක් ලියන්නේ කෙසේද?",
      seoTitle: "Fresh Graduate CV Guide Sri Lanka | Sinhala Tutorial",
      metaDescription: "සරසවි දිවිය අවසන් කරන ඔබ සඳහා, උපාධිය, internships සහ projects ඉස්මතු කරමින් සාර්ථකව Fresh Graduate CV එකක් සකසන අයුරු ඉගෙනගන්න.",
      intro: "ඔබ අවසානයේ උපාධිය ලබා ගත්තා, නමුත් මේ වසරේ තවත් දහස් ගණනක් ඔබත් සමගම රැකියා වෙළඳපොලට පිවිසෙනවා. ඔවුන් අතරින් ඔබව විශේෂ කර පෙන්වන්නේ කෙසේද?",
      problemExplanation: "බොහෝ උපාධිධාරීන් කරන්නේ තමන් විශ්වවිද්‍යාලයේ ඉගෙන ගත් සියලුම විෂයයන් (Modules) CV එකේ ලිවීමයි. ආයතනවලට අවශ්‍ය නම්‍යශීලී, ප්‍රායෝගික වැඩ කළ හැකි අය මිස විභාග සමත් වූ අය පමණක් නොවේ.",
      whatIsIt: {
        heading: "Graduate CV එකක් යනු කුමක්ද?",
        content: "මෙය ඔබගේ අධ්‍යාපනික ජයග්‍රහණ සහ ආයතනික අවශ්‍යතාවයන් අතර පාලමක් සදන CV එකකි. මෙහිදී ඔබගේ උපාධියට අමතරව Internships, අවසන් වසරේ project එක සහ නායකත්ව කුසලතා මනාව ඉස්මතු කරයි."
      },
      whyItMatters: {
        heading: "මෙය වැදගත් වන්නේ ඇයි?",
        content: "Management Trainee හෝ Executive මට්ටමේ රැකියා සඳහා විශාල තරඟයක් ඇත. ATS මෘදුකාංග ජයගත හැකි, ප්‍රායෝගික හැකියාවන් (Hard skills) පෙන්වන CV එකක් මගින් ඔබට ඉතා ඉක්මනින් රැකියා සම්මුඛ පරීක්ෂණ වෙත යා හැක."
      },
      stepByStep: [
        {
          heading: "පියවර 1: අධ්‍යාපනය (Education) ඉහළින්ම තැබීම",
          content: "Graduate කෙනෙකුගේ ප්‍රබලතම ආයුධය උපාධියයි. විශ්වවිද්‍යාලයේ නම, උපාධියේ නම සහ ඔබට 1st Class හෝ 2nd Upper සාමාර්ථයක් ඇත්නම් එය පැහැදිලිව ඉහළින්ම සඳහන් කරන්න."
        },
        {
          heading: "පියවර 2: Final Year Project / Research එක ඉස්මතු කරන්න",
          content: "ඔබගේ අවසන් වසරේ project එක රැකියාවක් ලෙස සලකා විස්තර කරන්න. ඔබ විසඳූ ගැටලුව, භාවිතා කළ මෘදුකාංග/ක්‍රමවේද සහ අවසන් ප්‍රතිඵලය දක්වන්න."
        },
        {
          heading: "පියවර 3: Internship අත්දැකීම විස්තර කරන්න",
          content: "ඔබ මාස 6ක internship එකක් කලා නම් එය 'Work Experience' යටතේ පුළුල්ව ලියන්න. ඔබ නිරීක්ෂණය කල දේවල් වලට වඩා ඔබ ආයතනයට කල වැඩ කොටස Bullet points වලින් ලියන්න."
        },
        {
          heading: "පියවර 4: විශ්වවිද්‍යාල සංගම් සහ නායකත්වය",
          content: "Rotaract, Leo වැනි සමාජ ශාලාවල හෝ ශිෂ්‍ය සංගමයේ තනතුරු උසුලා ඇත්නම් ඒවා අනිවාර්යයෙන්ම එක් කරන්න. මෙය ඔබගේ කණ්ඩායම් හැකියාව පෙන්වයි."
        },
        {
          heading: "පියවර 5: Hard Technical Skills ලැයිස්තුගත කරන්න",
          content: "උපාධිය තුලින් ඔබ ප්‍රගුණ කළ මෘදුකාංග (Excel, SPSS, Python), ගිණුම්කරණ ක්‍රමවේද හෝ පර්යේෂණ කුසලතා වෙනම section එකක දක්වන්න."
        }
      ],
      examples: {
        heading: "Internship සහ Project එක ලිවීම - උදාහරණ",
        content: "**Internship Experience**\n*HR Intern | ABC ආයතනය | Jan 2023 - Jun 2023*\n- නව සේවකයින් 20+ දෙනෙකුගේ Onboarding ක්‍රියාවලිය සාර්ථකව සම්බන්ධීකරණය කිරීම.\n- Excel භාවිතා කරමින් මාසික පැමිණීමේ වාර්තා (Attendance Reports) විශ්ලේෂණය කිරීම.\n\n**Academic Project**\n*අවසන් වසරේ පර්යේෂණය: Supply Chain Optimization*\n- දත්ත විශ්ලේෂණය හරහා ප්‍රවාහන වියදම් 15% කින් අවම කල හැකි නව ක්‍රමවේදයක් යෝජනා කිරීම. මෙයට විශේෂ ‘A’ සාමාර්ථයක් හිමිවිය."
      },
      commonMistakes: {
        heading: "බොහෝ දෙනෙක් කරන වැරදි",
        content: "- විශ්වවිද්‍යාලයේ ඉගෙනගත් සෑම විෂයයක්ම ලැයිස්තුගත කිරීමට යාම.\n- ATS මෘදුකාංග වලට කියවිය නොහැකි වන සේ අලංකාර Graphic designs භාවිතා කිරීම.\n- Internship අත්දැකීම CV එකේ යටටම දමා සැඟවීම.\n- තාක්ෂණික කුසලතා (Technical skills) සඳහන් කිරීමට අමතක කිරීම."
      },
      finalChecklist: [
        "මගේ උපාධිය සහ ප්‍රතිඵල ඉහළින්ම දක්වා තිබේද?",
        "Internship අත්දැකීම් පැහැදිලිව විස්තර කර තිබේද?",
        "Final year project එක ගැන වෙනම කොටසක් තිබේද?",
        "සමිති සමාගම් වල නායකත්ව වැඩ කටයුතු ඇතුලත් කර තිබේද?",
        "මෙය ATS මෘදුකාංග වලට කියවිය හැකි Format එකක්ද?"
      ],
      cta: "ඔබේ මහන්සියට සරිලන රැකියාවක් ලබාගන්න අදම සුදානම් වෙන්න. 'GRAD CV' ලෙස මැසේජ් කල අප හරහා ඔබේ CV එක සකසා ගන්න."
    }
  },
  {
    id: "11",
    categoryId: "a",
    coverImage: "https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "how-to-write-cv-for-internship",
      title: "How to Write a CV for Internship Applications",
      seoTitle: "CV for Internship Applications Sri Lanka | Beginner Resumes",
      metaDescription: "Learn how to write a winning CV for an internship position. Guide covers how to highlight coursework, soft skills, and extracurriculars to get selected.",
      intro: "Securing an internship is the most critical step in transitioning from a student to a working professional. However, competition for top internship spots in Sri Lanka is fierce.",
      problemExplanation: "When applying for an internship, everybody has the same baseline qualification: you are all pursuing a degree. If your CV only says 'Undergraduate at XYZ University', you blend in with hundreds of other applicants.",
      whatIsIt: {
        heading: "What is an Internship CV?",
        content: "An internship CV acts as a proposal of your potential. Since you have no relevant industry experience, this CV zooms in on your academic coursework, academic achievements, enthusiasm, and extracurricular involvements that prove your work ethic."
      },
      whyItMatters: {
        heading: "Why It Matters",
        content: "Companies don't hire interns solely for cheap labor; they use internships to scout future full-time employees. Your CV needs to show that you are an investment worth making—someone who is responsible, eager to learn, and culturally fit for the organization."
      },
      stepByStep: [
        {
          heading: "Step 1: Write an Enthusiastic Summary",
          content: "Use your summary to clearly state your objective. Mention your university, your major, and specifically state that you are seeking a [X duration] internship to apply your theoretical knowledge into practice."
        },
        {
          heading: "Step 2: Highlight Relevant Coursework",
          content: "Under your education section, list 4 to 6 specific modules you have completed that directly relate to the internship. (e.g., If applying for an HR internship, list 'Organizational Behavior' and 'Labor Law')."
        },
        {
          heading: "Step 3: Detail Your Academic Projects",
          content: "In the absence of a job, your group assignments and university projects are your 'experience'. Outline them using bullet points, explaining your specific contribution to the team."
        },
        {
          heading: "Step 4: Emphasize Computer & Tech Skills",
          content: "Even basic skills matter. Highlight your proficiency in Microsoft Office, Canva, Google Workspace, or any specific software like AutoCAD or Python, depending on the field."
        },
        {
          heading: "Step 5: Keep It to One Page",
          content: "As an intern applicant, you simply do not have enough material to justify a two-page CV. Keep it concise, clean, and contained to a single page."
        }
      ],
      examples: {
        heading: "Internship Objective Example",
        content: "**Objective:** Second-year Business Management undergraduate specializing in Finance. Highly analytical and detail-oriented, seeking a 6-month Finance Internship at [Company Name] to apply advanced Excel skills and academic knowledge of corporate finance in a fast-paced environment."
      },
      commonMistakes: {
        heading: "Common Mistakes",
        content: "- Sending a generic CV to 50 different companies without tailoring the objective.\n- Making spelling and grammar mistakes (which immediately signals a lack of attention to detail).\n- Leaving out extracurricular activities which are vital for showing teamwork.\n- Stretching the CV to two pages with unnecessary whitespace and formatting."
      },
      finalChecklist: [
        "Is my CV strictly exactly one page?",
        "Did I clearly state the industry I want to intern in?",
        "Are my relevant university modules listed?",
        "Did I highlight my academic projects and extracurriculars?",
        "Is there a strong emphasis on IT and soft skills?"
      ],
      cta: "Secure the best internship spots before your batchmates do! Message 'INTERN CV' to get a professionally optimized resume."
    },
    si: {
      slug: "internship-ekakata-cv-ekak-hadaganne-kohomada",
      title: "Internship (පුහුණු) රැකියා අවස්ථා සඳහා CV එකක් සාදාගන්නේ කෙසේද?",
      seoTitle: "Internship CV Guide Sinhala | පුහුණු රැකියා සඳහා CV",
      metaDescription: "පළපුරුද්දක් නැති වුවද ආකර්ශනීය ලෙස Internship එකක් සඳහා CV මුල සිට සකස් කර ගන්නා ආකාරය ගැන සිංහලෙන් ඉගෙනගන්න.",
      intro: "ශිෂ්‍යයෙකුගේ සිට වෘත්තිකයෙකු බවට පත්වීමේ වැදගත්ම පියවර වන්නේ හොඳ Internship එකක් (පුහුණු කාලසීමාවක්) ලබාගැනීමයි. නමුත් ලංකාවේ හොඳම සමාගම් වල පුහුණු අවස්ථා සඳහා විශාල තරඟයක් පවතී.",
      problemExplanation: "Internship සඳහා අයදුම් කරන සියල්ලන්ම පාහේ උපාධි අපේක්ෂකයින් වේ. ඔබගේ CV එකෙත් 'මම උපාධියක් හදාරමි' යන්න පමණක් තිබුණහොත්, අනිත් සිසුන් සියගණන අතරින් ඔබව විශේෂ වන්නේ නැත.",
      whatIsIt: {
        heading: "Internship CV එකක් කියන්නේ මොකක්ද?",
        content: "Industry අත්දැකීම් නොමැති නිසා, මෙම CV එක මගින් ප්‍රධාන වශයෙන් අවධානය යොමු කරන්නේ ඔබේ අධ්‍යන කටයුතු, ඔබ කර ඇති විශ්වවිද්‍යාල projects, මෘදු කුසලතා (Soft skills) සහ බාහිර ක්‍රියාකාරකම් මතයි."
      },
      whyItMatters: {
        heading: "මෙය වැදගත් වන්නේ ඇයි?",
        content: "ආයතන Intern කෙනෙකුව බඳවාගන්නේ ඔවුන්ගේ අනාගත ස්ථිර සේවකයෙකු බවට පත්කිරීමේ අරමුණෙනි. එනිසා ඔබ වැඩ කටයුතු වලට උනන්දුවක් දක්වන, වගකීමක් භාරදිය හැකි කෙනෙකු බව CV එක හරහා පෙන්වීම අත්‍යවශ්‍ය වේ."
      },
      stepByStep: [
        {
          heading: "පියවර 1: උනන්දුව පෙන්වන Summary එකක් ලිවීම",
          content: "ඔබගේ අරමුණ කෙටියෙන් දක්වන්න. ඔබ හදාරන උපාධිය සහ, න්‍යායාත්මක දැනුම ප්‍රායෝගිකව භාවිතා කිරීම සඳහා කොපමණ කාලයක (උදා: මාස 6ක) පුහුණුවක් අපේක්ෂා කරන්නේද යන්න සඳහන් කරන්න."
        },
        {
          heading: "පියවර 2: අදාළ විෂයයන් (Coursework) දක්වන්න",
          content: "අදාළ Internship එකට ගැලපෙන පරිදි ඔබ විශ්වවිද්‍යාලයේදී සාර්ථකව අවසන් කල විෂයන් 4-6 ක් පමණ ලැයිස්තුගත කරන්න. (උදා: HR internship එකක් නම් 'Labor Law', 'Organizational Behavior' වැනි විෂයයන් පෙන්නුම් කරන්න)."
        },
        {
          heading: "පියවර 3: විශ්වවිද්‍යාල Projects විස්තර කරන්න",
          content: "රැකියා අත්දැකීම් වෙනුවට ඔබ කළ Group projects වල විස්තර ලියන්න. එහිදී ඔබ කණ්ඩායමට ලබාදුන් සම්මාදම Bullet points මගින් පැහැදිලි කරන්න."
        },
        {
          heading: "පියවර 4: පරිගණක භාවිතය ගැන අවධාරණය කරන්න",
          content: "MS Office, Google Workspace ආදියේ සිට AutoCAD, Python දක්වා ඔබේ ක්ෂේත්‍රයට අදාළ සියලු මෘදුකාංග කුසලතා වෙනම දක්වන්න."
        },
        {
          heading: "පියවර 5: එක් පිටුවකට (One-page) සීමා කරන්න",
          content: "Intern කෙනෙකු වශයෙන් CV එක පිටු 2කට දිගු කිරීමට තරම් කරුණු නොමැත. එනිසා ඉතා පිරිසිදුව එක පිටුවක් තුල අන්තර්ගතය ගොනු කරන්න."
        }
      ],
      examples: {
        heading: "Internship Objective එකක් සඳහා උදාහරණයක්",
        content: "**Objective:** Finance පිළිබඳ විශේෂවේදී උපාධියක් හදාරන දෙවන වසරේ ව්‍යාපාර කළමනාකරණ ශිෂ්‍යයෙකි. මාගේ උසස් Excel කුසලතා සහ න්‍යායාත්මක මූල්‍ය දැනුම ප්‍රායෝගික ආයතනික පරිසරයක භාවිතා කරමින් අත්දැකීම් ලබාගැනීම සඳහා [Company Name] හි මාස 6ක Finance Internship අවස්ථාවක් අපේක්ෂා කරමි."
      },
      commonMistakes: {
        heading: "ඔබ කරන සුලභ වැරදි",
        content: "- Objective එකේ ආයතනය හෝ ක්ෂේත්‍රය වෙනස් නොකර එකම CV එක සමාගම් 50කට පමණ යැවීම.\n- අක්ෂර වින්‍යාසය සහ ව්‍යාකරණ වැරදි (මෙයින් පෙන්නුම් කරන්නේ ඔබගේ නොසැලකිලිමත් බවයි).\n- කණ්ඩායම් වැඩ පෙන්වන බාහිර ක්‍රියාකාරකම් (Extracurriculars) අත්හැරීම.\n- නිකරුණේ ඉඩ තබා CV එක පිටු 2කට ඇදීම."
      },
      finalChecklist: [
        "මගේ CV එක හරියටම පිටු එකකට සීමා වී තිබේද?",
        "මට සම්බන්ධ වීමට අවශ්‍ය ක්ෂේත්‍රය පැහැදිලිව සඳහන් කර තිබේද?",
        "අදාළ විශ්වවිද්‍යාල විෂයයන් ලැයිස්තුගත කර තිබේද?",
        "Project අත්දැකීම් සහ බාහිර ක්‍රියාකාරකම් ඇතුලත් කර තිබේද?",
        "මෘදුකාංග කුසලතා (IT Skills) පැහැදිලිව ඉස්මතු කර තිබේද?"
      ],
      cta: "හොඳම ආයතන වල පුහුණු අවස්ථා අනෙක් අයට කලින් ලබාගන්න! 'INTERN CV' ලෙස අපට මැසේජ් එකක් දමන්න."
    }
  }
];

export function getTutorialBySlug(slug: string): { tutorial: Tutorial, language: 'en' | 'si' } | null {
  for (const tut of tutorials) {
    if (tut.en.slug === slug) return { tutorial: tut, language: 'en' };
    if (tut.si.slug === slug) return { tutorial: tut, language: 'si' };
  }
  return null;
}
