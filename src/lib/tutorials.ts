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
,
{
  "id": "101",
  "categoryId": "b",
  "coverImage": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "ats-friendly-resume-writing",
    "title": "How to Write an ATS-Friendly Resume",
    "seoTitle": "ATS-Friendly CV Guide for Jobs | Beat Applicant Tracking Systems",
    "metaDescription": "Master ATS friendly resume formats to ensure your CV gets past automated software and into the hands of a recruiter. Learn keyword optimization and formatting.",
    "intro": "Are you applying to dozens of jobs online but hearing nothing back? Your CV might be getting rejected by a robot before a human ever sees it.",
    "problemExplanation": "Most modern companies use Applicant Tracking Systems (ATS) to scan, rank, and filter resumes. If your resume has complex formats, columns, graphics, or lacks specific keywords, the ATS cannot read it. As a result, highly qualified candidates often get automatically rejected.",
    "whatIsIt": {
      "heading": "What is an ATS-Friendly Resume?",
      "content": "An ATS-friendly resume is a document specifically formatted and written to easily be parsed by recruitment software. It uses simple layouts, standard fonts, clear headings, and strategically placed keywords matching the job description."
    },
    "whyItMatters": {
      "heading": "Why ATS Optimization is Crucial",
      "content": "Over 70% of large companies and increasingly many medium-sized businesses use an ATS. If you do not optimize your CV for ATS, your job search efforts are essentially wasted because you are failing the very first checkpoint in the hiring process."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Simplify Your Layout",
        "content": "Remove all columns, sidebars, text boxes, tables, and images. The ATS reads top to bottom, left to right. A single-column layout is the safest and most effective format."
      },
      {
        "heading": "Step 2: Use Standard Fonts and Headings",
        "content": "Stick to accessible fonts like Arial, Calibri, or Times New Roman. Use conventional headings like 'Work Experience', 'Education', and 'Skills'—do not use creative titles like 'My Professional Journey' as the system won't recognize them."
      },
      {
        "heading": "Step 3: Keyword Optimization",
        "content": "Carefully read the job advertisement. Highlight the required skills and phrases, and seamlessly integrate those exact keywords into your Professional Summary, Skills list, and Experience bullet points."
      },
      {
        "heading": "Step 4: Save as Standard Formats",
        "content": "Always save and submit your CV as a PDF or .docx file. Unless the application portal specifies otherwise, PDF is usually preferred to preserve formatting without losing readability."
      }
    ],
    "examples": {
      "heading": "Keyword Examples",
      "content": "**Bad:** Experienced in managing teams and software development.\n**Good:** 5+ years of experience in Agile Project Management, specializing in Software Development Life Cycle (SDLC) and leading cross-functional teams."
    },
    "commonMistakes": {
      "heading": "Common ATS Mistakes",
      "content": "Using logos of past companies, adding a headshot photo in corporate markets where it's discouraged, putting important details in the header/footer (ATS often ignores headers), and saving the file as an image format."
    },
    "finalChecklist": [
      "Is my CV a single-column format without tables or graphics?",
      "Have I used standard section headings?",
      "Are the keywords from the job description naturally included?",
      "Is the text highly readable without complex formatting?",
      "Did I save it as a PDF or DOCX file?"
    ],
    "cta": "Want to know if your CV passes the ATS check? Use our professional ATS formatting service to guarantee results!"
  },
  "si": {
    "slug": "ats-friendly-resume-writing-si",
    "title": "ATS-Friendly CV එකක් සාදා ගන්නා ආකාරය",
    "seoTitle": "ATS-Friendly CV එකක් සාදා ගන්නා ආකාරය | රැකියා ලබාගැනීමේ රහස්",
    "metaDescription": "Applicant Tracking Systems (ATS) මෘදුකාංග මඟින් ප්‍රතික්ෂේප නොවන පරිදි නිවැරදිව CV එකක් සකසා ගන්නා ආකාරය මෙයින් ඉගෙන ගන්න.",
    "intro": "ඔබ කොතරම් රැකියා සඳහා අයදුම් කළත් සම්මුඛ පරීක්ෂණ (Interviews) සඳහා කැඳවීමක් නොලැබෙන්නේ ඇයි දැයි ඔබ කල්පනා කර තිබෙනවාද? මීට ප්‍රධාන හේතුවක් විය හැක්කේ ATS මෘදුකාංගයයි.",
    "problemExplanation": "අද කාලයේ බොහෝ ආයතන වලට ලැබෙන දහස් ගණන් CV පරීක්ෂා කිරීම සඳහා Applicant Tracking Systems (ATS) නම් මෘදුකාංග භාවිත කෙරේ. ඔබගේ CV එකේ සංකීර්ණ Design, වගු, සහ රූප ඇතුළත් නම් හෝ අදාළ Keywords නැති නම්, පරිගණකය විසින් එය ස්වයංක්‍රීයව ප්‍රතික්ෂේප කර දමයි.",
    "whatIsIt": {
      "heading": "ATS-Friendly CV එකක් කියන්නේ කුමක්ද?",
      "content": "ATS-Friendly CV එකක් යනු පරිගණක මෘදුකාංගයකට පහසුවෙන් කියවා තේරුම් ගත හැකි ලෙස ඉතා සරලව හා පැහැදිළිව සකස් කරන ලද CV ආකෘතියකි. මෙහිදී අදාළ රැකියාවට ගැලපෙන Keywords (මූලික පද) නිවැරදිව භාවිත කරනු ලබයි."
    },
    "whyItMatters": {
      "heading": "මෙය වැදගත් වන්නේ ඇයි?",
      "content": "ලෝකයේ සහ ශ්‍රී ලංකාවේ ප්‍රමුඛ පෙළේ සමාගම් වලින් 70% කට වඩා සේවකයන් බඳවා ගැනීමේදී ATS මෘදුකාංග භාවිත කරයි. එබැවින් ඔබේ CV එක ATS මෘදුකාංග වලින් සමත් වීමට නොහැකි නම්, ඔබේ සුදුසුකම් කොතරම් ඉහළ වුවත් මනුෂ්‍යයෙකුගේ ඇස ගැටීමටවත් අවස්ථාවක් නොලැබේ."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: සරල Layout එකක් භාවිත කරන්න",
        "content": "CV එකේ Columns, Tables, Graphics, සහ අකුරු වටා කොටු යෙදීමෙන් වළකින්න. මෘදුකාංගය කියවන්නේ ඉහළ සිට පහළට සහ වමේ සිට දකුණට බැවින්, Single-column ෆෝමැට් එකක් භාවිතා කිරීම වඩාත් සුදුසුය."
      },
      {
        "heading": "පියවර 2: සාමාන්‍ය Fonts සහ පැහැදිලි Headings භාවිතා කරන්න",
        "content": "Arial, Calibri වැනි පැහැදිලි අකුරු රටා භාවිතා කරන්න. 'Work Experience', 'Education' වැනි සම්මත Headings (මාතෘකා) පමනක් යොදන්න."
      },
      {
        "heading": "පියවර 3: ජොබ් එකට ගැලපෙන Keywords ඇතුළත් කිරීම",
        "content": "රැකියා දැන්වීමේ සඳහන් කර ඇති අවශ්‍යතා කියවා ඒ සඳහා ඇති Skills සහ පළපුරුද්ද යෙදෙන වචන ඔබගේ CV එකෙහිද අනිවාර්යයෙන් ඇතුළත් කරන්න."
      },
      {
        "heading": "පියවර 4: නිවැරදි File Format එකෙන් Save කරන්න",
        "content": "සෑම විටම CV එක PDF හෝ Word Document එකක් ලෙස යවන්න. පින්තූර (Images) ලෙස යැවීමෙන් වලකින්න."
      }
    ],
    "examples": {
      "heading": "උදාහරණයක්",
      "content": "**වැරදි ක්‍රමය:** 'මම මෘදුකාංග නිර්මාණය පිළිබඳ පළපුරුද්දක් ඇති කෙනෙක්මි.'\n**නිවැරදි ක්‍රමය:** 'වසර 5ක පළපුරුද්දක් සහිත Agile Project Management සහ Software Development Life Cycle (SDLC) පිළිබඳ විශේෂඥතාවක් ඇති ඉංජිනේරුවරයෙකි.'"
    },
    "commonMistakes": {
      "heading": "බහුලව සිදුවන වැරදි",
      "content": "පාට පාට වර්ණ සහ විවිධ හැඩතල යොදා ගැනීම, Header සහ Footer හි Contact Details දැමීම (සමහර ATS මෘදුකාංග වලට ඒවා කියවිය නොහැක), සහ අනවශ්‍ය ලෙස පිංතූර CV එකට ඇතුලත් කිරීම."
    },
    "finalChecklist": [
      "මගේ CV එක Single-column සරල ආකෘතියකින් නිර්මාණය වී තිබේද?",
      "Standard මාතෘකා (Headings) භාවිතා කර තිබේද?",
      "රැකියා දැන්වීමේ ඇති Keywords මෙයට ඇතුළත් කර තිබේද?",
      "මෘදුකාංග වලට කියවිය නොහැකි Tables සහ Graphics ඉවත් කර තිබේද?",
      "PDF එකක් ලෙස Save කර තිබේද?"
    ],
    "cta": "ඔබගේ CV එක ATS මෘදුකාංගයකින් පහසුවෙන් සමත් වේවිද? අපගේ වෘත්තීය CV සැකසීමේ සේවාව හරහා අදම එය තහවුරු කරගන්න!"
  }
},
{
  "id": "102",
  "categoryId": "c",
  "coverImage": "https://images.unsplash.com/photo-1588600878108-578307a3cc9d?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "how-to-write-a-cover-letter",
    "title": "How to Write a Compelling Cover Letter",
    "seoTitle": "Cover Letter Writing Guide | Make Your Job Application Stand Out",
    "metaDescription": "A comprehensive guide to writing a standout cover letter. Learn how to highlight your value, address the hiring manager, and clearly state your career goals.",
    "intro": "Your CV states what you have done, but your cover letter tells the hiring manager who you are. A strong cover letter can be the deciding factor in securing an interview.",
    "problemExplanation": "Many applicants either skip the cover letter entirely or use generic templates downloaded from the internet. When recruiters see a 'To Whom It May Concern' with a robotic, copy-pasted message, they immediately lose interest. A generic cover letter suggests you lack genuine passion for the role and the company.",
    "whatIsIt": {
      "heading": "What is a Cover Letter?",
      "content": "A cover letter is a one-page document submitted alongside your CV. It provides context to your career history, showcases your communication skills, and specifically explains why you are deeply interested in the company and the role you are applying for."
    },
    "whyItMatters": {
      "heading": "Why You Should Always Include a Cover Letter",
      "content": "While the CV is heavily structured and ATS-optimised, a cover letter is your chance to tell a story. It lets you explain complex situations (like a career gap or career change), show cultural fit, and establish a personal connection with the hiring manager."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Header and Salutation",
        "content": "Use a professional header with your contact details. Try your best to find the name of the hiring manager (e.g., 'Dear Mr. Perera') rather than using generic greetings."
      },
      {
        "heading": "Step 2: The Hook (Opening)",
        "content": "Open with a strong sentence that states what role you are applying for and hooks the reader with a major relevant achievement or statement of deep interest in the company's specific recent work."
      },
      {
        "heading": "Step 3: Sell Your Skills (Body)",
        "content": "Do not repeat your CV. Instead, pick your top 2 or 3 accomplishments that perfectly match the job requirements and elaborate on the context and results."
      },
      {
        "heading": "Step 4: Show Cultural Fit",
        "content": "Explain why you want to work for *this specific company*. Mention their recent projects, corporate values, or mission, and align it with your own career trajectory."
      },
      {
        "heading": "Step 5: Call to Action (Closing)",
        "content": "End by enthusiastically reiterating your interest and providing a gentle call to action, offering to discuss how you can bring value over an interview. Sign off professionally."
      }
    ],
    "examples": {
      "heading": "A Great Opening Sentence",
      "content": "**Bad:** I am writing to apply for the Marketing Manager role.\n**Good:** I was thrilled to see the Marketing Manager opening at [Company], as your recent 'Green Earth' campaign perfectly aligns with my 5-year background in sustainable brand management."
    },
    "commonMistakes": {
      "heading": "What to Avoid",
      "content": "Making it longer than one page, repeating everything on the resume, focusing solely on what the job can do for you rather than what you can do for the company, and failing to proofread for typos."
    },
    "finalChecklist": [
      "Is the letter personalized to the specific company and role?",
      "Did I address a specific person if possible?",
      "Does the body add value instead of just repeating my CV?",
      "Is it free from grammar and spelling errors?",
      "Is it shorter than a full page?"
    ],
    "cta": "Need a cover letter that stands out? Get our experts to write a personalized and compelling cover letter tailored to your dream job."
  },
  "si": {
    "slug": "how-to-write-cover-letter-si",
    "title": "ආකර්ෂණීය Cover Letter එකක් ලියන්නේ කෙසේද?",
    "seoTitle": "Cover Letter එකක් ලියන ආකාරය | ආකර්ෂණීය රැකියා අයදුම්පතක්",
    "metaDescription": "රැකියා අවස්ථාවන් වැඩි කරගැනීම සඳහා ආකර්ෂණීය සහ නිවැරදි Cover Letter එකක් ලියන ආකාරය පිළිබඳ සම්පූර්ණ මාර්ගෝපදේශය.",
    "intro": "CV එකෙන් ඔබ කර ඇති දේවල් ගැන කියවෙන අතර, Cover Letter එකෙන් කියවෙන්නේ 'ඔබ කවුද' යන්නයි. සම්මුඛ පරීක්ෂණයක් සඳහා තෝරාගැනීමට Cover Letter එක ප්‍රබල සාධකයක් විය හැක.",
    "problemExplanation": "බොහෝ අයදුම්කරුවන් Cover Letter එකක් නොයවන අතර, යවන අයද අන්තර්ජාලයෙන් බාගත කළ සාමාන්‍ය (Generic) අච්චුම භාවිතා කරති. 'To Whom It May Concern' වැනි යෙදුම් සමඟ එකම දේ සියල්ලන්ටම යැවීමෙන්, සේවායෝජකයාට ඔබ පිළිබඳව ඇති උනන්දුව නැති වී යයි.",
    "whatIsIt": {
      "heading": "Cover Letter එකක් කියන්නේ කුමක්ද?",
      "content": "Cover Letter යනු ඔබේ CV එක සමඟ යවන එක් පිටුවක ලියවිල්ලකි. ඉන් ඔබේ වෘත්තීය ඉතිහාසයට අමතර වටිනාකමක් එකතු කරන අතර, ඔබ මෙම ආයතනයට සහ තනතුරට කොතරම් ගැලපෙනවාද යන්න පැහැදිලි කරයි."
    },
    "whyItMatters": {
      "heading": "Cover Letter එකක් අනිවාර්ය වන්නේ ඇයි?",
      "content": "CV එකට වඩා Cover Letter තුළින් ඔබේ කතාව ප්‍රකාශ කළ හැක. වෘත්තීය ජීවිතයේ හිඩැසක් (Career Gap) පැහැදිලි කිරීමට, ආයතනයේ සංස්කෘතියට ඔබ ගැලපෙන බව පෙන්වීමට මෙන්ම, Human Resource (HR) කළමනාකරු සමඟ පෞද්ගලික සම්බන්ධතාවයක් ගොඩනඟා ගැනීමට මෙය කදිම අවස්ථාවකි."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: Header සහ ආමන්ත්‍රණය",
        "content": "ඔබේ සම්බන්ධතා තොරතුරු ඉහළින් යොදන්න. හැකි සෑම විටම HR කළමනාකරුගේ හෝ අදාළ නිලධාරියාගේ නම (උදා: Dear Mr. Perera) සොයාගැනීමට උත්සහ කරන්න."
      },
      {
        "heading": "පියවර 2: ආකර්ෂණීය ආරම්භයක්",
        "content": "ඔබ අයදුම් කරන්නේ කුමන තනතුරකටද යන්න සඳහන් කර ඔබගේ ප්‍රධාන ජයග්‍රහණයක් හෝ ආයතනය පිළිබඳ ඔබේ ඇති උනන්දුව පෙන්වමින් ලිපිය ආරම්භ කරන්න."
      },
      {
        "heading": "පියවර 3: ඔබගේ කුසලතා ඉස්මතු කිරීම (Body)",
        "content": "CV එකම නැවත මෙහි ලියන්න එපා. ඒ වෙනුවට රැකියාවේ අවශ්‍යතා වලට වඩාත්ම ගැලපෙන ඔබගේ ප්‍රධාන ජයග්‍රහණ 2-3 ක් තෝරාගෙන ඒවා සවිස්තරාත්මකව දක්වන්න."
      },
      {
        "heading": "පියවර 4: ආයතනයට ඇති කැමැත්ත",
        "content": "ඔබ විශේෂයෙන් *මෙම ආයතනයේම* සේවය කිරීමට කැමති ඇයි දැයි පැහැදිලි කරන්න. ඔවුන්ගේ අරමුණු සහ මෑත වෙනස්කම් ඔබේ වෘත්තීය දැක්ම සමඟ ගැලපෙන ආකාරය පෙන්වා දෙන්න."
      },
      {
        "heading": "පියවර 5: අවසානය (Closing)",
        "content": "සම්මුඛ පරීක්ෂණයක් සඳහා කාලයක් යොදාගැනීමට ඇති කැමැත්ත පවසා ඉතා වෘත්තීය මට්ටමින් ලිපිය අවසන් කරන්න."
      }
    ],
    "examples": {
      "heading": "ආරම්භක වාක්‍යයක උදාහරණයක්",
      "content": "**වැරදි:** Marketing Manager තනතුර සඳහා මම අයදුම් කරමි.\n**නිවැරදි:** මෑතකදී ඔබ ආයතනය දියත් කළ 'Green Earth' ව්‍යාපෘතිය මා ඉතාමත් ආකර්ෂණය කළ අතර, මගේ පස් වසරක තිරසාර සන්නාම කළමනාකරණ අත්දැකීම් සමග [Company] හි Marketing Manager තනතුරට අයදුම් කිරීමට ලැබීම සතුටකි."
    },
    "commonMistakes": {
      "heading": "මග හැරිය යුතු වැරදි",
      "content": "පිටුවකට වඩා දිගු වීම, CV එකේ ඇති දේවල්ම නැවත ලිවීම, ආයතනයට වඩා තමන්ගේ පුද්ගලික වාසි ගැන පමණක් ලිවීම සහ අක්ෂර වින්‍යාස දෝෂ තිබීම."
    },
    "finalChecklist": [
      "ලිපිය අදාළ ආයතනයට සහ තනතුරට පමණක් සුවිශේෂී ලෙස ලියා තිබේද?",
      "හැකි සෑම විටම නිශ්චිත පුද්ගලයෙකුට ආමන්ත්‍රණය කළාද?",
      "CV එකේ නැති අමතර වටිනාකමක් මෙහි තිබේද?",
      "ව්‍යාකරණ සහ අක්ෂර වින්‍යාස වැරදි සම්පූර්ණයෙන්ම සකසා තිබේද?",
      "ලිපිය එක් පිටුවකට සීමා කර තිබේද?"
    ],
    "cta": "ඔබටත් සුවිශේෂී Cover Letter එකක් අවශ්‍යද? අදම අපගේ වෘත්තීය සේවාව හා සම්බන්ධ වන්න."
  }
},
{
  "id": "103",
  "categoryId": "d",
  "coverImage": "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "linkedin-profile-optimization",
    "title": "LinkedIn Profile Optimization: Get Discovered by Recruiters",
    "seoTitle": "LinkedIn Profile Optimization | Strategies to Get Hired Faster",
    "metaDescription": "Transform your LinkedIn profile into a powerful magnet for jobs. Discover actionable steps to optimize your headline, summary, and experience to attract top employers.",
    "intro": "In today's corporate world, your LinkedIn profile is just as important—if not more important—than your CV. It functions as your digital reputation and 24/7 networking tool.",
    "problemExplanation": "Many professionals treat LinkedIn like a static online CV, leaving fields blank and failing to use the platform's networking features. If your profile is incomplete and lacks proper keywords, recruiters who use LinkedIn Recruiter search tools will never find you.",
    "whatIsIt": {
      "heading": "What is LinkedIn Optimization?",
      "content": "LinkedIn Optimization involves updating every section of your profile to rank higher in LinkedIn’s internal search algorithm. This makes you easily discoverable to hiring managers and recruiters looking for specific talents."
    },
    "whyItMatters": {
      "heading": "Why LinkedIn is Gold for Your Career",
      "content": "A large percentage of jobs are never publicly advertised; they are filled by headhunters sourcing candidates directly through LinkedIn. An optimized profile will bring job opportunities to your inbox passively."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Professional Headshot and Banner",
        "content": "Use a clear, high-quality headshot with good lighting and professional attire. Add a background banner image that reflects your industry or personal brand to stand out."
      },
      {
        "heading": "Step 2: Write a Keyword-Rich Headline",
        "content": "Don't just use your job title. Your headline should be a mini-pitch. Include your role, your specific expertise, and the value you provide. E.g., 'Senior Software Engineer | React & Node.js | Building Scalable FinTech Solutions'."
      },
      {
        "heading": "Step 3: Tell Your Story in the 'About' Section",
        "content": "Write a 3-4 paragraph summary sharing your professional journey, your passions, major achievements, and what drives you. Include a list of your core skills at the bottom for SEO."
      },
      {
        "heading": "Step 4: Detail Your Experience and Add Multimedia",
        "content": "For each role, list bullet points highlighting your accomplishments (like a CV). Under each role, attach links, PDFs, presentations, or portfolio websites to visually showcase your work."
      },
      {
        "heading": "Step 5: Get Recommendations and Endorsements",
        "content": "Reach out to former colleagues, managers, and clients. Ask them for a written recommendation. This serves as powerful social proof of your professional competence."
      }
    ],
    "examples": {
      "heading": "Headline Makeover",
      "content": "**Average:** Sales Executive at XYZ Corp\n**Optimized:** B2B Sales Executive | Account Management | Driving Revenue Growth specializing in SaaS Solutions 🚀"
    },
    "commonMistakes": {
      "heading": "LinkedIn Mistakes to Stop Making",
      "content": "Leaving the profile URL as the default messy string of numbers, having typos in your current job title, only being active when you need a job, and treating connections like mere numbers rather than real networking opportunities."
    },
    "finalChecklist": [
      "Is my profile picture professional and approachable?",
      "Does my headline clearly state my value and keywords?",
      "Is my 'About' section engaging to read?",
      "Have I customized my public LinkedIn URL?",
      "Are my job experiences updated with quantifiable achievements?"
    ],
    "cta": "Want recruiters to come directly to you? Let our LinkedIn experts revamp your profile for maximum visibility."
  },
  "si": {
    "slug": "linkedin-profile-optimization-si",
    "title": "Recruiters ලා ඔබව සොයා එන ලෙස LinkedIn Profile එකක් හදමු",
    "seoTitle": "LinkedIn Profile Optimization | LinkedIn එක හරහා රැකියා සොයාගැනීම",
    "metaDescription": "ප්‍රමුඛ පෙළේ ආයතන වල අවධානය දිනාගැනීමට ඔබේ LinkedIn Profile එක නිවැරදිව optimize කරන ආකාරය පිළිබඳ සම්පූර්ණ උපදෙස්.",
    "intro": "අද කාලයේ ව්‍යාපාරික ලෝකය තුළ ඔබේ CV එකටත් වඩා LinkedIn Profile එක වැදගත් වීමට ඉඩ ඇත. එය ඔබේ ඩිජිටල් අනන්‍යතාවය මෙන්ම පැය 24 පුරා ක්‍රියාත්මක වන Networking මෙවලමකි.",
    "problemExplanation": "බොහෝ අය LinkedIn එක භාවිතා කරන්නේ අන්තර්ජාල CV එකක් ලෙස පමණි. Profile එකෙහි විස්තර නිවැරදිව පුරවා නොමැති විට සහ අන්තර්ජාලය හරහා සම්බන්ධතා ගොඩනගා නොගන්නා විට, රැකියා සඳහා සුදුස්සන් සොයන HR කළමනාකරුවන්ගෙන් ඔබව මග හැරී යයි.",
    "whatIsIt": {
      "heading": "LinkedIn Optimization කියන්නේ කුමක්ද?",
      "content": "මෙමගින් අදහස් කරන්නේ LinkedIn හි Search Algorithm එකට පහසුවෙන් හඳුනාගත හැකි පරිදි ඔබේ ගිණුමේ සෑම අංශයක්ම නිවැරදි Keywords සහිතව යාවත්කාලීන කිරීමයි. මෙහිදී Recruiters ලා තමන්ට අවශ්‍ය කෙනාව සෙවීමේදී ඔබේ නම මුලින්ම ඉදිරිපත් වීම බලාපොරොත්තු වේ."
    },
    "whyItMatters": {
      "heading": "LinkedIn ඔබේ අනාගතයට වැදගත් ඇයි?",
      "content": "බොහෝ ඉහළ රැකියා අවස්ථා කිසිදා ප්‍රසිද්ධියේ පුවත්පත් වල පළ නොවේ. ඒ වෙනුවට Headhunters ලා LinkedIn හරහා කෙළින්ම සුදුස්සන්ට කතා කරති. නිසි ලෙස සකසන ලද Profile එකක් මගින් ඔබට ඉතා වටිනා රැකියා අවස්ථා ඉබේම ලැබෙනු ඇත."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: වෘත්තීය ඡායාරූපයක් (Headshot) සහ Banner එකක් යෙදීම",
        "content": "පැහැදිලි ආලෝකයක් සහිත ඉතා වෘත්තීය පෙනුමක් ඇති ඡායාරූපයක් භාවිතා කරන්න. ඔබේ ක්ෂේත්‍රයට අදාළ පසුබිම් රූපයක් (Banner cover picture) යෙදීමෙන් අමතර වටිනාකමක් ලබා දෙන්න."
      },
      {
        "heading": "පියවර 2: Keywords සහිත ආකර්ෂණීය Headline එකක් ලිවීම",
        "content": "රැකියාවේ නම පමණක් ලිවීම ප්‍රමාණවත් නොවේ. ඔබගේ විශේෂඥතාව සහ ඔබෙන් ලබාදෙන වටිනාකම කෙටි වාක්‍යයකින් ලියන්න. උදා: 'Senior Software Engineer | React & Node.js | Building Scalable FinTech Solutions'."
      },
      {
        "heading": "පියවර 3: 'About' කොටසේ ඔබේ කතාව ලිවීම",
        "content": "ඔබගේ වෘත්තීය ගමන, ඔබ කැමති දේවල් සහ ඔබගේ ජයග්‍රහණ ඡේද 3-4 කින් පමණ ලස්සන කතාවක් ආකාරයෙන් ලියන්න. පහලින්ම ඔබගේ ප්‍රධාන හැකියාවන් (Skills) ලැයිස්තුවක්ද එක් කරන්න."
      },
      {
        "heading": "පියවර 4: පළපුරුද්ද (Experience) සහ Multimedia ඇතුළත් කිරීම",
        "content": "එක් එක් රැකියාවේදී ඔබ කළ දෑ සහ ලබාගත් ජයග්‍රහණ CV එකක සේම පැහැදිලිව සඳහන් කරන්න. ඔබ නිර්මාණය කළ දේවල්, ලිපි, ලින්ක් හෝ PDF මෙයට අමුණන්න."
      },
      {
        "heading": "පියවර 5: Recommendations ලබා ගැනීම",
        "content": "ඔබ කලින් වැඩ කළ ආයතන වල ප්‍රධානීන්ගෙන් සහ මිතුරන්ගෙන් ඔබ ගැන නිර්දේශයක් (Recommendation) ලියාදෙන ලෙස ආචාරශීලීව ඉල්ලා සිටින්න. එය ඔබේ හැකියාව තහවුරු කිරීමට ඉතා වැදගත් සාධකයක් වේ."
      }
    ],
    "examples": {
      "heading": "Headline එකක් නිර්මාණය කිරීමේ උදාහරණයක්",
      "content": "**සාමාන්‍ය ක්‍රමය:** Sales Executive at XYZ Corp\n**වඩාත් හොඳ ක්‍රමය:** B2B Sales Executive | Account Management | Driving Revenue Growth specializing in SaaS Solutions 🚀"
    },
    "commonMistakes": {
      "heading": "නතර කළ යුතු වැරදි පුරුදු",
      "content": "LinkedIn URL එකේ ඇති අංක වැල වෙනස් නොකර තබාගැනීම, Job title එකේ අක්ෂර වින්‍යාස වැරදි තිබීම, සහ රැකියාවක් අවශ්‍ය වූ විට පමණක් LinkedIn භාවිතා කිරීම."
    },
    "finalChecklist": [
      "මගේ Profile Picture එක වෘත්තීය පෙනුමකින් යුක්තද?",
      "Headline එකෙහි මගේ හැකියාව සහ Keywords පැහැදිලිව සඳහන් කර තිබේද?",
      "About section එක කියවීමට ආකර්ෂණීයද?",
      "Custom LinkedIn URL එකක් සාදාගෙන තිබේද?",
      "මගේ රැකියා අත්දැකීම් පැහැදිලි ප්‍රතිඵල සහිතව යාවත්කාලීන කර තිබේද?"
    ],
    "cta": "ඔබට ගැලපෙනම රැකියා අවස්ථා සඳහා LinkedIn Profile එක ශක්තිමත් කරගැනීමට අවශ්‍යද? වෘත්තීය සහය ලබාගැනීමට අප හා සම්බන්ධ වන්න."
  }
},
{
  "id": "104",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "preparing-for-job-interviews",
    "title": "Mastering the Job Interview: Pre-Interview Prep",
    "seoTitle": "Job Interview Preparation Guide | How to Ace Your Interview",
    "metaDescription": "Learn exactly how to research the company, prepare your answers, and build confidence before walking into a job interview.",
    "intro": "Getting an interview means your CV did its job. Now it’s up to you to prove that the person on paper is the right fit in real life.",
    "problemExplanation": "Nervousness, blanking out on common questions, or simply not knowing enough about the company are the main reasons highly qualified candidates fail interviews. Going in without preparation is a guaranteed way to lose an opportunity.",
    "whatIsIt": {
      "heading": "What Constitutes Proper Interview Preparation?",
      "content": "Proper preparation involves thoroughly researching the employer, practicing your core narratives through the STAR method, preparing intelligent questions to ask the interviewers, and preparing logistics mentally and physically."
    },
    "whyItMatters": {
      "heading": "The Role of Confidence",
      "content": "Interviewers look for capability and culture fit. If you're well-prepared, your anxiety drops significantly. This allows your true personality and confidence to shine through, making you highly memorable to the panel."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Deep Corporate Research",
        "content": "Don't just read the 'About Us' page. Search for the company in the news, read their latest annual report, check their LinkedIn updates, and understand their main competitors."
      },
      {
        "heading": "Step 2: Master the STAR Method",
        "content": "For behavioral questions ('Tell me about a time when...'), structure your answers using STAR: Situation, Task, Action, Result. Focus heavily on the exact Actions you took and quantify the Result."
      },
      {
        "heading": "Step 3: Prepare the Basics",
        "content": "Practise your 'Tell me about yourself' pitch. It should be a 90-second summary of who you are, what you've accomplished, and why you're perfect for the role."
      },
      {
        "heading": "Step 4: Prepare Questions for Them",
        "content": "Always have 2-3 questions ready when they ask, 'Do you have any questions for us?' Ask about team structure, current challenges, or their strategic goals for the next year."
      },
      {
        "heading": "Step 5: Logistics & Mindset",
        "content": "Plan your route, iron your clothes the night before, and pack copies of your CV. Visualize success to keep calm."
      }
    ],
    "examples": {
      "heading": "STAR Answer Example",
      "content": "**Situation:** Project X was behind schedule.\n**Task:** I needed to deliver the MVP in 2 weeks.\n**Action:** I reorganized the development sprints, communicated directly with stakeholders, and removed daily bottlenecks.\n**Result:** We launched on time and user engagement increased by 15%."
    },
    "commonMistakes": {
      "heading": "Warning Signs",
      "content": "Speaking badly about former bosses or employers, failing to give concrete examples for soft skills, and turning up with an arrogant 'know-it-all' attitude."
    },
    "finalChecklist": [
      "Have I researched the company's recent news/products?",
      "Is my 'Tell me about yourself' answer polished?",
      "Have I prepared at least three STAR stories?",
      "Do I have questions ready to ask the interviewer?",
      "Is my formal wear clean and ready?"
    ],
    "cta": "Want to ace your next big interview? Check out our Mock Interview Preparation sessions for personalized coaching."
  },
  "si": {
    "slug": "preparing-for-job-interviews-si",
    "title": "සම්මුඛ පරීක්ෂණයකට (Job Interview) සාර්ථකව මුහුණ දෙමු",
    "seoTitle": "සම්මුඛ පරීක්ෂණය සඳහා සූදානම් වීමේ මාර්ගෝපදේශය",
    "metaDescription": "පූර්ව සූදානම හරහා බියකින් තොරව සම්මුඛ පරීක්ෂණයකට මුහුණ දෙන අයුරු පියවරෙන් පියවර ඉගෙන ගන්න.",
    "intro": "ඔබට සම්මුඛ පරීක්ෂණයක් සඳහා කැඳවීමක් ලැබුණා යනු ඔබේ CV එක සාර්ථකයි යන්නයි. දැන් ඔබේ වගකීම වන්නේ CV එකෙහි සඳහන් කර ඇති දේවල් සැබවින්ම ඔබට කළ හැකි බව ඔවුන්ට ඔප්පු කර පෙන්වීමයි.",
    "problemExplanation": "ඉතා දක්ෂ අයදුම්කරුවන්ට පවා රැකියාව අහිමිවීමට ප්‍රධාන හේතු වන්නේ කලබල වීම, සාමාන්‍ය ප්‍රශ්න වලට පිළිතුරු සූදානම් කර නොමැති වීම සහ ආයතනය පිළිබඳව කිසිදු අවබෝධයක් නොමැති වීමයි.",
    "whatIsIt": {
      "heading": "Interview එකකට සූදානම් වීම යනු කුමක්ද?",
      "content": "නිසි සූදානම යනු අදාළ ආයතනය පිළිබඳව හොඳින් අධ්‍යනය කිරීම, STAR ක්‍රමය මගින් පිළිතුරු සැපයීමට සූදානම් වීම, මෙන්ම පරීක්ෂක මණ්ඩලයෙන් ඇසීමට වැදගත් ප්‍රශ්න කිහිපයක් කල්තියා සූදානම් කර ගැනීමයි."
    },
    "whyItMatters": {
      "heading": "ආත්ම විශ්වාසයේ වැදගත්කම",
      "content": "ආයතන බලන්නේ හැකියාව සහ ඔබ ඔවුන්ගේ සංස්කෘතියට ගැලපෙනවාද යන්න පමණි. ඔබ කල්තියා හොඳින් සූදානම් වී ඇත්නම්, ඔබේ බිය සම්පූර්ණයෙන්ම පහව යන අතර, ඔබගේ සැබෑ පෞරුෂය මනාව කැපී පෙනෙනු ඇත."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: ආයතනය පිළිබඳව හොඳින් අධ්‍යනය කරන්න",
        "content": "Website එකේ 'About Us' එක බැලීමෙන් පමණක් නොනැවතී, ඔවුන්ගේ මෑත කාලීන නිෂ්පාදන, තරඟකාරී ආයතන සහ LinkedIn හි ඔවුන් බෙදාගත් පුවත් පිළිබඳව සොයා බලන්න."
      },
      {
        "heading": "පියවර 2: STAR method එක භාවිතා කිරීම",
        "content": "ඔබ ලැබූ අභියෝග ගැන අසන ප්‍රශ්න වලට පිළිතුරු දීමේදී STAR (Situation - ගැටළුව, Task - ඔබේ වගකීම, Action - ඔබ ගත් ක්‍රියාමාර්ගය, Result - ලැබූ සාර්ථක ප්‍රතිඵලය) ක්‍රමය භාවිතා කරන්න."
      },
      {
        "heading": "පියවර 3: මූලික ප්‍රශ්න සඳහා සූදානම් වන්න",
        "content": "'Tell me about yourself' (ඔබ ගැන විස්තරයක් කරන්න) යන ප්‍රශ්නය සඳහා ඔබ ගැන කෙටි ඒත් ආකර්ෂණීය විස්තරයක් විනාඩි 1.5 කට වැනි කෙටි කාලසීමාවකට සූදානම් කරගන්න."
      },
      {
        "heading": "පියවර 4: ඔබ අසන ප්‍රශ්න තීරණය කරන්න",
        "content": "සම්මුඛ පරීක්ෂණය අවසානයේදී 'ඔබට අපෙන් අසන්නට යමක් තිබෙනවාද?' කියා අසන විට, කණ්ඩායමේ ව්‍යුහය හෝ ආයතනයේ ඉදිරි අරමුණු ගැන තර්කානුකූල ප්‍රශ්න 2-3ක් විමසන්න."
      },
      {
        "heading": "පියවර 5: මානසික සූදානම",
        "content": "පරීක්ෂණයට යන මාර්ගය, අඳින පළඳින ඇඳුම් සහ CV පිටපත් කල්තියා සූදානම් කර ගන්න. ධනාත්මක සිතුවිලි වලින් මනස සන්සුන් කරගන්න."
      }
    ],
    "examples": {
      "heading": "STAR පිළිතුරක උදාහරණයක්",
      "content": "**Situation:** අදාළ ව්‍යාපෘතිය නියම වේලාවට අවසන් කිරීමට නොහැකි තත්ත්වයක් පැන නැගුනි.\n**Action:** මම කණ්ඩායම සමඟ පැය ගණනක් විමර්ශනය කර නව ක්‍රමවේදයක් හඳුන්වා දී ගැටළුව නිරාකරණය කළෙමි.\n**Result:** සියල්ල නියමිත කාලයට අවසන් කර, ගනුදෙනුකරුවාගේ පූර්ණ ප්‍රසාදය හිමිවිය."
    },
    "commonMistakes": {
      "heading": "මග හැරිය යුතුම දේවල්",
      "content": "පැරණි ආයතන නිලධාරීන්ට බැන වැදීම දෝෂාරෝපණය කිරීම, තමාට කළ හැකි දේවල් ගැන බොරු කීම සහ උඩඟු කමින් හැසිරීම."
    },
    "finalChecklist": [
      "මම අදාළ ආයතනයේ මෑතകാലීන පුවත් ගැන දන්නවාද?",
      "මාව හඳුන්වාදීමට නිවැරදි විස්තරයක් සාදාගෙන තිබේද?",
      "STAR ක්‍රමය හරහා කීමට කතන්දර කිහිපයක් රෙඩි ද?",
      "ඔවුන්ගෙන් ඇසීමට ප්‍රශ්න කල්තියා ලියාගත්තාද?",
      "වැදගත් ලිපි ලේඛන සියල්ලම රැගෙන යාමට සූදානම් ද?"
    ],
    "cta": "ඔබගේ ඊළඟ Job Interview එක සාර්ථක කරගන්න අවශ්‍යද? අපගේ Mock Interview පුහුණු සැසියක් හරහා නිවැරදි මග පෙන්වීමක් ලබාගන්න."
  }
},
{
  "id": "105",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "career-growth-and-personal-branding",
    "title": "Career Growth and Personal Branding",
    "seoTitle": "Personal Branding for Career Growth | Professional Development",
    "metaDescription": "Advance your career by establishing a strong personal brand. Learn how to network, demonstrate thought leadership, and propel your professional growth.",
    "intro": "Your personal brand is what people say about you when you are not in the room. In today's digital age, deliberately crafting that brand is the fastest way to accelerate your career.",
    "problemExplanation": "Many hard-working professionals remain stagnant in their careers, waiting patiently to be noticed by management. The reality is that hard work alone isn't enough; visibility is key. Without a personal brand, you blend in with everyone else.",
    "whatIsIt": {
      "heading": "What is Personal Branding?",
      "content": "Personal branding is the intentional process of establishing and promoting what you stand for. It combines your skills, experiences, and personality to demonstrate your unique value proposition to your industry."
    },
    "whyItMatters": {
      "heading": "The Leverage of a Strong Brand",
      "content": "A strong personal brand attracts mentors, clients, and promotions. It establishes you as an authority in your field. When highly coveted roles open up, people will naturally think of your name first."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Define Your Niche",
        "content": "You cannot be famous for everything. Pick a specific area of expertise (e.g., 'Agile Leadership', 'Cloud Cost Optimization') and focus on becoming the go-to person for that subject."
      },
      {
        "heading": "Step 2: Share Your Knowledge Online",
        "content": "Use platforms like LinkedIn or Medium to write articles, post industry insights, and share your experiences. Consistency is key here."
      },
      {
        "heading": "Step 3: Network Purposefully",
        "content": "Attend local meetups, conferences, and webinars. When networking, focus on how you can help others rather than just asking for favors."
      },
      {
        "heading": "Step 4: Keep Upskilling",
        "content": "A brand built on outdated knowledge will eventually crumble. Continuously take courses, earn certifications, and read industry books."
      },
      {
        "heading": "Step 5: Seek Speaking Opportunities",
        "content": "Volunteer to do a presentation for your current team, or apply to speak at industry conferences. Public speaking drastically enhances your perceived authority."
      }
    ],
    "examples": {
      "heading": "Brand Statement Example",
      "content": "**Generic:** I am a project manager who handles software projects.\n**Branded:** I am a Project Manager specializing in rescuing at-risk enterprise software deployments and bringing them back on budget."
    },
    "commonMistakes": {
      "heading": "Branding Pitfalls",
      "content": "Trying to be controversial just for engagement, being overly promotional without offering value, and having an inconsistent online persona compared to how you act in real life."
    },
    "finalChecklist": [
      "Have I clearly defined my professional niche?",
      "Am I regularly sharing industry insights on LinkedIn?",
      "Is my network steadily growing with relevant professionals?",
      "Am I continually updating my skill set?",
      "Do I have a consistent 'brand voice'?"
    ],
    "cta": "Ready to take your career to the management or executive level? Let's build your professional brand together starting today."
  },
  "si": {
    "slug": "career-growth-personal-branding-si",
    "title": "වෘත්තීය දියුණුව සහ Personal Branding",
    "seoTitle": "Personal Branding හරහා ඔබගේ වෘත්තීය දියුණුව හදාගන්න",
    "metaDescription": "පෞද්ගලික සන්නාමයක් (Personal brand) ගොඩනගා ගැනීම මගින් රැකියා ක්ෂේත්‍රයේ ඉහළටම යන ආකාරය පිළිබඳ වටිනා උපදෙස්.",
    "intro": "ඔබ නොමැති ස්ථානයකදී මිනිසුන් ඔබ ගැන කියන්නේ කුමක්ද යන්න ඔබගේ 'Personal Brand' එකයි. සාර්ථක වෘත්තීය ගමනකට මෙය අතිශයින් වැදගත් වේ.",
    "problemExplanation": "බොහෝ දක්ෂ සේවකයන් සිතන්නේ තමන් මහන්සි වී වැඩ කළොත් ස්වභාවිකවම උසස්වීම් ලැබෙනු ඇති කියාය. නමුත් එය සත්‍යයක් නොවේ. ඔබගේ හැකියාවන් අන් අයට පෙන්වීමට කටයුතු නොකළහොත්, ඔබ සදහටම එකම ස්ථානයක රැඳී සිටිනු ඇත.",
    "whatIsIt": {
      "heading": "Personal Branding කියන්නේ කුමක්ද?",
      "content": "මෙය යනු ඔබගේ කුසලතා, අත්දැකීම් සහ පෞරුෂත්වයේ එකතුවක් හරහා ඔබව ක්ෂේත්‍රයේ විශේෂඥයෙකු ලෙස අන් අයට ස්වයංක්‍රීයව පෙන්වා දීමේ විධිමත් ක්‍රියාවලියකි."
    },
    "whyItMatters": {
      "heading": "ශක්තිමත් Personal Brand එකක බලය",
      "content": "මෙහිදී ඔබට රැකියා සහ අවස්ථා පසුපස යාමට අවශ්‍ය නොවේ. ඔබගේ සන්නාමය ශක්තිමත් වූ විට, උසස් වීම්, Mentors ලා සහ හොඳ රැකියා අවස්ථාවන් ස්වයංක්‍රීයව ඔබ වෙත ආකර්ෂණය වීමට පටන් ගනී."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: ඔබගේ විශේෂඥතාව හඳුනාගන්න (Niche)",
        "content": "සියල්ල ගැන අඩුවෙන් දන්නවාට වඩා එක අංශයක් ගැන හොඳින්ම දැනගන්න. උදා: 'Digital Marketing' නම්, එහි 'SEO' සඳහා පමණක් ඔබ ප්‍රසිද්ධ වන පරිදි ඉලක්කයක් සකසන්න."
      },
      {
        "heading": "පියවර 2: දැනුම බෙදාහරින්න",
        "content": "LinkedIn, Medium හෝ බ්ලොග් අඩවි භාවිතා කරමින් ඔබ දන්නා කරුණු, ක්ෂේත්‍රයේ නවතම තොරතුරු සහ ඔබ ඉගෙනගත් පාඩම් ලියන්න. නොකඩවා මෙය කිරීම අනිවාර්යයි."
      },
      {
        "heading": "පියවර 3: Networking",
        "content": "වෙහෙස වී සම්මන්ත්‍රණ, Online Events සහ Meetups වලට සහභාගී වන්න. අන් අයගෙන් උදව් ඉල්ලීමට පෙර, ඔවුන්ට ඔබට උදව් කළ හැකි දැයි විමසන්න."
      },
      {
        "heading": "පියවර 4: නිරන්තරයෙන් ඉගෙනගැනීම",
        "content": "පැරණි දැනුමකින් Personal Brand එකක් ගොඩනැගිය නොහැක. අලුත් සහතිකපත්‍ර පාඨමාලා හැදෑරීම සහ පොත්පත් කියවීම මගින් ඔබව යාවත්කාලීන කරගන්න."
      },
      {
        "heading": "පියවර 5: අදහස් දැක්වීමේ අවස්ථා සොයාගන්න",
        "content": "ඔබේ අංශයේ Meeting වලදී, හෝ සම්මන්ත්‍රණ වල දේශන පැවැත්වීමට අවස්ථා ලබාගන්න. Public speaking මගින් ඔබව කඩිනමින් නායකත්වයට ගෙන එනු ඇත."
      }
    ],
    "examples": {
      "heading": "අනන්‍යතා ප්‍රකාශන (Brand Statement) උදාහරණ",
      "content": "**සාමාන්‍ය:** මම Software පද්ධති හදන Project Manager කෙනෙක්.\n**වඩාත් හොඳ:** මම අයවැය ඉක්මවා යන ව්‍යාපෘති නැවත නිරවුල් කර සමාගමට ලාභ ගෙන දීමට විශේෂඥතාවක් ඇති Project Manager කෙනෙකි."
    },
    "commonMistakes": {
      "heading": "මග හැරිය යුතු වැරදි",
      "content": "වටිනාකමක් නොදෙන විහිළු හෝ මතභේදාත්මක දේවල් නිතර පෝස්ට් කිරීම, සහ අන්තර්ජාලයේ එක විදිහකට සහ සැබෑ ලෝකයේ තවත් තරහවෙන් හැසිරීම."
    },
    "finalChecklist": [
      "මගේ විශේෂඥතාවය මා නිශ්චිතව හඳුනාගෙන තිබේද?",
      "මම මාසිකව හෝ සතිපතා LinkedIn එකේ ලිපි පළ කරනවාද?",
      "ක්ෂේත්‍රයේ වැදගත් පුද්ගලයින් සමග Networking කරනවාද?",
      "අලුත් දේවල් දිනපතා ඉගෙනගන්නවාද?",
      "සැබෑ ලෝකයේදීත් කාරුණික හා වෘත්තීයව හැසිරෙනවාද?"
    ],
    "cta": "Executive level එක දක්වා ඔබේ වෘත්තිය ගෙනයාමට සූදානම්ද? අපගේ උපදේශන සේවාවන් සමඟ අදම සම්බන්ධ වන්න."
  }
},
{
  "id": "106",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "how-to-explain-employment-gaps",
    "title": "How to Explain Employment Gaps in a CV",
    "seoTitle": "How to Explain Gaps in Resume | CV Guide",
    "metaDescription": "Employment gaps shouldn't ruin your career chances. Learn how to address timeline gaps in your resume confidently and professionally.",
    "intro": "Having a gap in your employment history is common, but leaving it unexplained on your CV can raise red flags for recruiters.",
    "problemExplanation": "When a hiring manager spots an unexplained gap of several months or years on your CV, human nature usually assumes the worst—perhaps you were fired, unmotivated, or lost your skills. Providing no context leaves the recruiter guessing.",
    "whatIsIt": {
      "heading": "What is an Employment Gap?",
      "content": "An employment gap is a period in your professional timeline, typically 6 months or longer, where you were not formally employed. Gaps can happen due to higher studies, health issues, travel, caring for family, or economic downturns."
    },
    "whyItMatters": {
      "heading": "Honesty vs. Professionalism",
      "content": "Recruiters appreciate honesty but demand professionalism. Taking control of the narrative shows you are forthright and proactive. When properly explained, a gap can even demonstrate resilience and personal growth."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Don’t Hide It",
        "content": "Never lie about employment dates. Background checks will easily uncover deceit, destroying your credibility immediately. List years instead of exact months if the gap is small, but be ready to clarify."
      },
      {
        "heading": "Step 2: Briefly List it on the CV",
        "content": "You can create a brief line item in your Experience section. E.g., '2020 – 2021: Career Break / Sabbatical'. Add one bullet point explaining the focus (e.g., 'Focused on family care and completed AWS certification')."
      },
      {
        "heading": "Step 3: Keep Explanations Brief",
        "content": "When interviewed, don't over-explain or apologize. State the reason briefly, concisely, and confidently, then immediately pivot to why you are excited and ready to return to work."
      },
      {
        "heading": "Step 4: Highlight Productive Activities",
        "content": "Did you travel, volunteer, read extensively, freelance, or learn a new software tool during the gap? Mention it! It proves you remained active and dedicated to self-improvement."
      },
      {
        "heading": "Step 5: Address it in the Cover Letter",
        "content": "The cover letter is the perfect place to write a short paragraph explaining the gap gracefully, ensuring the recruiter understands the context before even opening your CV."
      }
    ],
    "examples": {
      "heading": "In-Interview Pivot Example",
      "content": "“I took a year off to care for an ailing family member. Fortunately, their health has fully recovered, and during that time I also completed a rigorous online data analytics bootcamp. I am now fully ready and eager to bring these new skills to this role.”"
    },
    "commonMistakes": {
      "heading": "What Not to Do",
      "content": "Lying about start/end dates, bad-mouthing a former employer as the reason for leaving, or sharing 'too much information' (TMI) about deeply personal or medical struggles."
    },
    "finalChecklist": [
      "Are my dates on the CV accurate and truthful?",
      "Have I prepared a confident, 1-2 sentence explanation?",
      "Did I highlight the skills/studies I gained during the gap?",
      "Have I drafted a brief explanation in my cover letter?",
      "Is my focus fully shifted onto the future and this new role?"
    ],
    "cta": "Struggling to format a CV that has career gaps? Let our CV writing professionals spin your journey into a compelling narrative."
  },
  "si": {
    "slug": "how-to-explain-employment-gaps-si",
    "title": "CV එකේ ඇති රැකියා හිඩැස් (Employment Gaps) පැහැදිලි කරන්නේ කෙසේද?",
    "seoTitle": "CV එකේ ඇති (Employment Gaps) පැහැදිලි කරන ආකාරය",
    "metaDescription": "රැකියා ඉතිහාසයේ ඇති හිඩැස් (Career gaps) වෘත්තීය ආකාරයෙන් පැහැදිලි කර, නව රැකියාවක් සාර්ථකව ලබාගන්නා ආකාරය ඉගෙන ගන්න.",
    "intro": "රැකියා ඉතිහාසයේ මාස කිහිපයක හෝ වසරක හිඩැසක් තිබීම සාමාන්‍ය දෙයකි. නමුත් එයට හේතුව CV එකේ පැහැදිලිව නොදැක්වීම ගැටලු මතුකරවයි.",
    "problemExplanation": "CV එක පරීක්ෂා කරන කළමනාකරුවෙකුට ඔබ රැකියාව නොකළ විශාල කාලසීමාවක් දුටු විට මුලින්ම සිතෙන්නේ, සමහර විට ඔබව සේවයෙන් පහකළා විය හැකි බවයි. නැත්නම් ඔබට රැකියාවක් කිරීමට උනන්දුවක් නැති බවයි.",
    "whatIsIt": {
      "heading": "Employment Gap යනු කුමක්ද?",
      "content": "ඔබගේ රැකියා ඉතිහාසයේ මාස 6 කට හෝ ඊට වැඩි කාලයක් විධිමත් රැකියාවක නිරත නොවුණු කාලයයි. මෙය වැඩිදුර අධ්‍යාපනයට, සෞඛ්‍ය ගැටළුවකට, ගර්භනීභාවයට හෝ විදේශගත වීමකට විය හැක."
    },
    "whyItMatters": {
      "heading": "සත්‍යවාදී බව සහ වෘත්තීයභාවය",
      "content": "රැකියා ලබාදෙන පාර්ශවයන් ඔබේ අවංකකම මෙන්ම ඔබ ගැටළුවක් ඉදිරිපත් කරන වෘත්තීය (Professional) ආකාරය පිළිබඳව සැලකිලිමත් වෙයි. නිවැරදිව පැහැදිලි කළහොත්, එම හිඩැස ඔබේ පෞරුෂයේ වර්ධනයක් පෙන්වීමට අවස්ථාවක් කරගත හැක."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: කිසිවිටෙක එය සඟවන්න එපා",
        "content": "රැකියා කළ කාල සීමාවන් ගැන බොරු කියන්න එපා. Background Check එකක් මගින් එය අසුවුනොත් විශාල හානියක් වේ. එය නිර්භීතව පිළිගන්න."
      },
      {
        "heading": "පියවර 2: CV එකේම කෙටියෙන් සඳහන් කරන්න",
        "content": "Experience කොටසේ '2020 – 2021: Career Break' යනුවෙන් සටහන් කර, එහි එක Bullet point එකකින් 'Personal health retreat and completed PMP certification' වැනි සරල හේතුවක් දක්වන්න."
      },
      {
        "heading": "පියවර 3: සම්මුඛ පරීක්ෂණයේදී කෙටියෙන් පැහැදිලි කිරීම",
        "content": "Interview එකකදී මේ ගැන ඇසුවහොත් දිගින් දිගටම දුක හිතෙන කතා කියන්න එපා. කෙටියෙන් හේතුව පවසා, 'දැන් මම සම්පූර්ණයෙන්ම සූදානම් මේ රැකියාව භාර ගන්න' යනුවෙන් කතාව නවත්වන්න."
      },
      {
        "heading": "පියවර 4: ඉන් ලැබූ අමතර ප්‍රයෝජන පෙන්වීම",
        "content": "එම කාලය තුළ ඔබ අලුත් මෘදුකාංගයක් ඉගෙන ගත්තාද? Freelance වැඩ කළාද? ඒ බව අනිවාර්යයෙන් සඳහන් කරන්න. එයින් පෙනී යන්නේ ඔබ කම්මැලියෙකු නොවන බවයි."
      },
      {
        "heading": "පියවර 5: Cover Letter එක භාවිත කරන්න",
        "content": "ඔබේ Cover Letter එකේ කෙටි ඡේදයකින් මේ හිඩැස ගැන මනාව පැහැදිලි කර ලිවීම ඉතාමත් ප්‍රායෝගික ක්‍රමයකි."
      }
    ],
    "examples": {
      "heading": "සම්මුඛ පරීක්ෂණයේදී භාවිතා කළ හැකි පිළිතුරක්",
      "content": "'පසුගිය වසරේ මගේ පවුලේ අයෙකුගේ අසනීප තත්ත්වයක් නිසා මට රැකියාවෙන් ඉවත් වීමට සිදුවුණා. දැන් ඔවුන්ට සම්පූර්ණයෙන්ම සුවයි. ඒ කාලය තුළ මම අන්තර්ජාලය හරහා Data Analytics පාඨමාලාවත් සාර්ථකව අවසන් කළා. ඒ නිසා දැන් මම නව ජවයකින් වැඩ භාර ගැනීමට සූදානම්.'"
    },
    "commonMistakes": {
      "heading": "නොකළ යුතු දෑ",
      "content": "රැකියා දිනයන් බොරු කිරීම, පරණ රැකියා ස්ථානයට බැන වැදීමෙන් හිඩැස සාධාරණීකරණය කිරීම, සහ අතිශය පෞද්ගලික ලෙඩ රෝග ගැන දීර්ඝව පැහැදිලි කරමින් වෙලාව ගැනීම."
    },
    "finalChecklist": [
      "CV එකේ සඳහන් රැකියා කාලසීමාවන් සහ දිනයන් සත්‍ය ඒවාද?",
      "හිඩැස ගැන පැහැදිලි කිරීමට වාක්‍ය 1-2 ක කෙටි පිළිතුරක් සූදානම්ද?",
      "එම කාලය තුළ ලබාගත් නව දැනුම/කුසලතා CV එකට ඇතුළත් කළාද?",
      "Cover Letter එකේ මේ ගැන කෙටි සටහනක් දැම්මාද?",
      "වැඩි අවධානය යොමු කරන්නේ අතීතයටද, නොඑසේනම් අනාගතයටද?"
    ],
    "cta": "ඔබගේ Career Gap එක අවාසියක් නොවන ලෙස වෘත්තීය CV එකක් නිර්මාණය කරගැනීමට අපගේ සේවාව අදම ලබාගන්න."
  }
},
{
  "id": "107",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "salary-negotiation-tips",
    "title": "Salary Negotiation Tips for Professionals",
    "seoTitle": "Salary Negotiation Tips Sri Lanka | Receive the Pay You Deserve",
    "metaDescription": "Don't leave money on the table. Discover effective strategies for negotiating salary offers confidently and successfully without damaging relationships.",
    "intro": "Negotiating your salary is one of the most critical conversations in your career. However, the fear of losing the job offer keeps many professionals from ever trying.",
    "problemExplanation": "Most people accept the very first salary number offered to them. Over a span of ten years, failing to negotiate can result in millions of rupees lost in unearned income and compound raises. Employers usually expect a counter-offer.",
    "whatIsIt": {
      "heading": "What is Salary Negotiation?",
      "content": "It is a professional discussion between you and your potential employer to reach a mutually agreeable compensation package. It involves assessing market rates, stating your value, and respectfully asking for a higher number."
    },
    "whyItMatters": {
      "heading": "The Cost of Silence",
      "content": "Your initial salary sets the baseline for your future raises, bonuses, and even your salary at your *next* job. Negotiating successfully signals to employers that you value yourself and possess strong communication skills."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Do Thorough Market Research",
        "content": "Before the interview, use platforms like Glassdoor, Payscale, and local industry wisdom to find the standard pay bracket for your position, experience level, and location."
      },
      {
        "heading": "Step 2: Don't Name Your Number First",
        "content": "Try to let the employer state their budget first. If forced to provide an expected salary in a form, give a realistic, slightly flexible range rather than an exact flat figure."
      },
      {
        "heading": "Step 3: Ask for Time to Consider",
        "content": "When they make an offer, never say “yes” immediately on the phone. Show enthusiasm, then say, “Thank you so much! Could I have 24 hours to review the complete package?”"
      },
      {
        "heading": "Step 4: Prepare the Counter-Offer",
        "content": "Ask for 10% to 15% more than their initial offer, backing it up with facts (e.g., 'Given my 5 years in AWS and immediate ability to take on the cloud migration project...')."
      },
      {
        "heading": "Step 5: Negotiate Perks if Money is Tight",
        "content": "If the company genuinely cannot increase the basic pay, pivot to negotiating other perks: performance bonuses, extra leave, flexible working hours, or educational allowances."
      }
    ],
    "examples": {
      "heading": "How to Make the Counter-Offer",
      "content": "“I am very excited about the offer to join the team. Based on my research on market rates and the extensive technical leadership experience I bring, I was hoping to see a base salary closer to Rs. 250,000. Is there flexibility to bridge this gap?”"
    },
    "commonMistakes": {
      "heading": "Negotiation Killers",
      "content": "Giving ultimatums ('Pay me X or I walk'), negotiating based on your personal financial problems or lifestyle needs rather than your professional value, and negotiating purely via rushed phone calls without preparation."
    },
    "finalChecklist": [
      "Do I know the actual market rate for this job?",
      "Am I basing my request on value, not personal needs?",
      "Did I wait to hear their initial offer first?",
      "Have I prepared alternatives (like remote work/bonuses) if they say no?",
      "Did I express enthusiasm toward the company regardless?"
    ],
    "cta": "Want personalized coaching on how to negotiate your next big salary bump? Schedule a 1-on-1 career coaching session with us."
  },
  "si": {
    "slug": "salary-negotiation-tips-si",
    "title": "වැටුප ගැන කතා කරමු: Salary Negotiation ක්‍රම",
    "seoTitle": "නිවැරදිව Salary Negotiation කිරීම සඳහා උපදෙස්",
    "metaDescription": "පොදු වැරදි වලින් මිදී තමන්ට ලැබිය යුතු නිවැරදි වැටුප රැකියා ආයතනයෙන් ඉල්ලා ගන්නා ආකාරය ඉගෙනගන්න.",
    "intro": "මුදල් ගැන කතා කිරීම බොහෝ දෙනෙකුට අසීරු කරුණකි. එබැවින් රැකියාවක් ලැබෙන විට පිරිනමන පළමු වැටුපටම අකමැත්තෙන් වුවත් එකඟ වීමට බොහෝ අය පුරුදු වී සිටිති.",
    "problemExplanation": "අයදුම්කරුවන් මුලින් ලබාදෙන වැටුපට එකඟ වීම නිසා ඔවුන්ට ලක්ෂ ගණනක අනාගත ආදායම් අහිමි වී යයි. රැකියා ආයතන බොහෝ විට මුලින් ලබා දෙන්නේ ඔවුන්ට ලබා දිය හැකි අවම අගයයි. ඔවුන් ඔබෙන් Counter-offer එකක් (ඔබේ ඉල්ලීමක්) බලාපොරොත්තු වේ.",
    "whatIsIt": {
      "heading": "Salary Negotiation කියන්නේ කුමක්ද?",
      "content": "මෙය පැහැදිලිවම වෘත්තීය සාකච්ඡාවකි. ආයතනයෙන් පිරිනමන සම්පූර්ණ දීමනාව පිළිබඳව ඔබගේ අත්දැකීම් සහ වටිනාකමට සරිලන පරිදි සාධාරණීකරණය කර, සාධාරණ වැටුපකට දෙපාර්ශවයම එකඟ වීම මෙයින් අදහස් වේ."
    },
    "whyItMatters": {
      "heading": "මෙහි වැදගත්කම කුමක්ද?",
      "content": "ඔබ එකඟ වන මූලික වැටුප මත ඔබගේ අනාගත දීමනා සහ බෝනස් ප්‍රමාණයත් තීරණය වේ. ඔබගේ රැකියාවේ වටිනාකම ඔබම තේරුම් ගෙන සිටින බව HR නිලධාරීන්ට පෙන්වීමට මෙය කදිම අවස්ථාවකි."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: වෙළෙඳපොළේ මිල ගණන් සොයාබලන්න",
        "content": "අදාළ තනතුරට ශ්‍රී ලංකාවේ (හෝ අදාළ රටේ) සාමාන්‍ය වැටුප් තලය Payscale, Glassdoor වැනි වෙබ් අඩවි හරහා හෝ ක්ෂේත්‍රයේ මිතුරන්ගෙන් අසා දැනගන්න."
      },
      {
        "heading": "පියවර 2: මුලින්ම ඔබේ ඉලක්කම් කියන්නට යන්න එපා",
        "content": "හැකි සැමවිටම ආයතනයට ඔවුන්ගේ budget එක ප්‍රකාශ කිරීමට ඉඩ හරින්න. පුරවන ෆෝම් එකක අනිවාර්යයෙන්ම සඳහන් කළ යුතු නම් නිශ්චිත අගයක් වෙනුවට Expected Range (පරතරයක්) එකක් දක්වන්න."
      },
      {
        "heading": "පියවර 3: සිතීමට කාලය ඉල්ලන්න",
        "content": "ඔවුන් වැටුපක් පිරිනැමූ විට දුරකථනයෙන්ම වහාම 'ඔව්' කීමට ඉක්මන් නොවන්න. 'බොහොම ස්තූතියි! මට මේ පිළිබඳව සලකා බැලීමට පැය 24ක කාලයක් ලබාදිය හැකිද?' යන්නෙන් විමසන්න."
      },
      {
        "heading": "පියවර 4: වටිනාකම් පෙන්වා Counter-offer කරන්න",
        "content": "ඔවුන් පිරිනමන වැටුපෙන් 10% - 15% කින් පමණ වැඩි වැටුපක් ඉල්ලා සිටින්න. එයට හේතු ලෙස ඔබේ ඉහළ අත්දැකීම් සහ ඔබ ආයතනයට ගෙන එන සීඝ්‍ර දියුණුව මතක් කර දෙන්න."
      },
      {
        "heading": "පියවර 5: වෙනත් දීමනා ඉල්ලීම",
        "content": "කිසියම් හේතුවක් නිසා ඔවුන්ට මූලික වැටුප වැඩි කිරීමට නොහැකි නම්, අමතර නිවාඩු, Medical allowance, සහ Work-from-home දින වැනි අමතර ප්‍රතිලාභ පිළිබඳව කතාබහ කරන්න."
      }
    ],
    "examples": {
      "heading": "කතා කළ යුතු ආකාරයේ උදාහරණයක්",
      "content": "'මෙම තනතුරට තෝරාගැනීම පිළිබඳව මම ඉතාමත් සතුටු වෙනවා. නමුත්, මාගේ වසර ගණනාවක තාක්ෂණික අත්දැකීම් සහ වෙළෙඳපොළේ පවතින සම්මත අගයන් සැලකීමේදී මා බලාපොරොත්තු වූයේ රු. 150,000 ක පමණ ආසන්න අගයකි. අපට මේ පිළිබඳව නැවත සලකා බැලිය හැකිද?'"
    },
    "commonMistakes": {
      "heading": "මග හැරිය යුතුම දේවල්",
      "content": "තරහා ගෙන තර්ජනය කිරීම, තමන්ගේ ණය බර හෝ ගෙදර වියදම් ගැන කියමින් ආයාචනා කිරීම, සහ පෙර සූදානමකින් තොරව සාකච්ඡාවට ඉදිරිපත් වීම."
    },
    "finalChecklist": [
      "අදාළ තනතුරේ සැබෑ වෙළෙඳපොළ වැටුප මා දන්නවාද?",
      "මාගේ ඉල්ලීම කෙරෙන්නේ හැකියාව මත පදනම්ව මිසක පෞද්ගලික ගැටළු මතද?",
      "ඔවුන්ගේ Offter එකට එකවරම 'YES' කීමෙන් වැළකී සිටියාද?",
      "මුදල් වැඩි කළ නොහැකි නම් ඉල්ලිය යුතු අමතර දීමනා ගැන හිතුවාද?",
      "සාකච්ඡාව ඉතා මිත්‍රශීලීව හා වෘත්තීය මට්ටමින් කළාද?"
    ],
    "cta": "Job Offer එකක් ලැබිලා ද ඉන්නේ? නිවැරදිව පඩි සාකච්ඡා කිරීමට අපගේ වෘත්තීය සහය ලබාගන්න."
  }
},
{
  "id": "108",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "building-an-online-portfolio",
    "title": "How to Build a High-Converting Online Portfolio",
    "seoTitle": "Build a Digital Portfolio | Showcase Your Work to Employers",
    "metaDescription": "A resume tells, but a portfolio shows. Learn how to build an impressive online portfolio to showcase your exact skills to recruiters and clients.",
    "intro": "In highly competitive industries like design, software development, or marketing, simply writing down your skills is no longer enough. You need to prove them. This is where an online portfolio outshines a traditional CV.",
    "problemExplanation": "Many creatives embed heavy PDF files in emails or send disorganized Google Drive links to clients or employers. This creates friction. If a recruiter has to jump through hoops to see your actual work, they will move on to the next candidate.",
    "whatIsIt": {
      "heading": "What is an Online Portfolio?",
      "content": "It is a curated, professional website or digital gallery that neatly displays your best work, case studies, and achievements. It acts as tangible proof of the abilities highlighted on your CV."
    },
    "whyItMatters": {
      "heading": "Seeing is Believing",
      "content": "A portfolio vividly demonstrates your problem-solving process, your aesthetic sense, and your communication skills. It shifts the conversation dynamically from 'Can you do this?' to 'How soon can you start doing this for us?'"
    },
    "stepByStep": [
      {
        "heading": "Step 1: Choose the Right Platform",
        "content": "Use platforms like Notion, Wix, Webflow, or WordPress if you want a standalone site. If you are a designer, use Behance or Dribbble. If you are a developer, use GitHub Pages to showcase live code."
      },
      {
        "heading": "Step 2: Curate Your Best Work",
        "content": "Do not include everything you have ever made. Select 3 to 6 of your absolute best projects. Ensure a mix of projects that highlight different core skills required by your dream jobs."
      },
      {
        "heading": "Step 3: Write Case Studies, Not Just Pictures",
        "content": "A picture without context is confusing. Write a brief case study for each project: What was the problem? What was your role? What tools did you use? What was the final, quantifiable outcome?"
      },
      {
        "heading": "Step 4: Keep the UX Simple",
        "content": "Ensure the navigation is brain-dead simple. Include a clear 'About Me' page and a highly visible 'Contact Me' button. The site must be completely mobile-friendly."
      },
      {
        "heading": "Step 5: Link it Everywhere",
        "content": "Your portfolio is useless if nobody sees it. Add the link prominently at the top of your CV, in your LinkedIn featured section, and in your email signature."
      }
    ],
    "examples": {
      "heading": "Project Description Structure",
      "content": "**Title:** E-commerce Website Redesign\n**The Problem:** High cart abandonment rate.\n**My Solution:** Redesigned the checkout flow and implemented a 1-click purchase system using React.\n**The Impact:** Reduced cart abandonment by 25% within 3 months."
    },
    "commonMistakes": {
      "heading": "The Biggest Errors",
      "content": "Requiring passwords for entry without providing them, having broken links or 'coming soon' pages, overwhelming the viewer with too much text, and poor mobile responsiveness."
    },
    "finalChecklist": [
      "Is the portfolio easy to access via a simple link?",
      "Does it showcase only my top 3-6 projects?",
      "Did I include short case study text explaining the 'Why' behind my work?",
      "Is my contact information extremely easy to find?",
      "Does the site load fast and look good on a mobile phone?"
    ],
    "cta": "Do you need help compiling all your unstructured work into a brilliant portfolio? Contact us to review your digital presence."
  },
  "si": {
    "slug": "building-an-online-portfolio-si",
    "title": "සාර්ථක Online Portfolio එකක් හදන්නේ කොහොමද?",
    "seoTitle": "Online Portfolio එකක් හදන ආකාරය",
    "metaDescription": "CV එකට අමතරව ඔබේ දක්ෂතා සැබෑ ලෙස පෙන්විය හැකි Digital Portfolio එකක් ගොඩනගාගන්නා ආකාරය ඉගෙන ගන්න.",
    "intro": "විශේෂයෙන්ම නිර්මාණකරණයේ (Graphic Design / Software / Marketing) යෙදෙන අයට, CV එකක කුසලතා ලිවීම පමණක් ප්‍රමාණවත් නොවේ. ඔබ කර ඇති දේවල් ඇස් ඉදිරිපිටම දැකගන්නට සේවායෝජකයන් තදින් අකමැත්තක් දක්වයි.",
    "problemExplanation": "බොහෝ දෙනා තම නිර්මාණ විශාල PDF හෝ disorganized Google Drive ලින්ක් ලෙස යවති. Interview කරන මහත්වරුන්ට මෙය විවෘත කිරීමට අපහසු නම් ඔවුන් එය මග හැර දමා ඊළඟ අයදුම්කරු දෙසට හැරේ.",
    "whatIsIt": {
      "heading": "Online Portfolio කියන්නේ කුමක්ද?",
      "content": "මෙය ඔබගේ විශිෂ්ටතම නිර්මාණ, ව්‍යාපෘති සහ අත්දැකීම් ඉතා අලංකාරව සහ පෙළගස්වා ඇති වෘත්තීය වෙබ් අඩවියක් හෝ ඩිජිටල් ෆෝල්ඩරයකි. CV එකේ ඇති දේවල් වලට සජීවී සාක්ෂියක් මෙයින් ලබාදේ."
    },
    "whyItMatters": {
      "heading": "ඇසින් දැකීම වඩාත් විශ්වාසදායකයි",
      "content": "Portfolio එකක් මගින් ඔබේ විසඳුම් ලබාදීමේ හැකියාව මෙන්ම නිර්මාණාත්මක බව හොඳින් පෙන්වයි. එය රැකියා අවස්ථාවකදී CV 100 කට වඩා ඔබව කැපී පෙනෙන තත්වයකට පත් කරයි."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: සුදුසු තැනක් (Platform) තෝරාගන්න",
        "content": "වෙබ් අඩවියක් ලෙස Notion, Wix, හෝ WordPress භාවිතා කරන්න. නිර්මාණකරුවෙක් නම් Behance/Dribbble සුදුසුය. මෘදුකාංග ඉංජිනේරුවෙක් නම් ඔබේ GitHub Profile එක විශිෂ්ට Portfolio එකකි."
      },
      {
        "heading": "පියවර 2: ගොඩක් දේවල් දාන්න එපා (Curate)",
        "content": "ඔබ කළ සියලුම වැඩ මෙයට ඇතුළත් නොකරන්න. අතිශයින් සාර්ථක වූ ප්‍රධාන ව්‍යාපෘති 3 කින් හෝ 5 කින් පමණක් ඔබගේ හැකියාව මනාව ඔප්පු කරන්න."
      },
      {
        "heading": "පියවර 3: පින්තූර පමණක් මදි, Case Study එකක් ලියන්න",
        "content": "හුදු රූපයක් පමණක් තිබීමෙන් ඔවුන්ට එය තේරුම් ගත නොහැක. ගැටළුව කුමක්ද? ඔබේ කාර්යභාරය කුමක්ද? ඔබ භාවිතා කළේ මොනවාද? යන කරුණු අඩංගු කෙටි විස්තරයක් එයට අමුණන්න."
      },
      {
        "heading": "පියවර 4: භාවිතයට පහසු ලෙස සකසන්න",
        "content": "කෙනෙකුට පහසුවෙන් තේරුම් ගැනීමට හැකිවන සරල layout එකක් භාවිත කරන්න. ඔබේ 'Contact Me' සහ 'About' විස්තර හොඳින් පේන්න තබන්න. සාමාන්‍ය ජංගම දුරකථනයකටද එය පහසුවෙන් දිස්විය යුතුය."
      },
      {
        "heading": "පියවර 5: හැමතැනම Link එක බෙදාගන්න",
        "content": "ඔබේ CV එකේ මුලින්ම, LinkedIn ගිණුමෙහි සහ Email Signature එකෙහි මෙම Portfolio Link එක අනිවාර්යයෙන්ම සඳහන් කරන්න."
      }
    ],
    "examples": {
      "heading": "Project විස්තරයක් ලිවිය යුතු ආකාරය",
      "content": "**ව්‍යාපෘතිය:** E-commerce වෙබ් අඩවිය අලුත්වැඩියා කිරීම.\n**ගැටළුව:** පාරිභෝගිකයින් භාණ්ඩ මිල දී ගැනීම අතරමග නැවැත්වීම.\n**මගේ විසඳුම:** React හරහා ඉතා ඉක්මන් '1-click checkout' පහසුකමක් සැකසීම.\n**ප්‍රතිඵලය:** මාස 3ක් ඇතුළත ආදායම 25% කින් ඉහළ යාම."
    },
    "commonMistakes": {
      "heading": "සිදුවන විශාලතම වැරදි",
      "content": "බැලීමට Passwords ඉල්ලන සේ නිර්මාණය කිරීම, කැඩුණු ලින්ක්ස් (Broken links) තිබීම, සහ ඕනෑවට වඩා දීර්ඝ විස්තර කියවීමට සැලැස්වීම."
    },
    "finalChecklist": [
      "Portfolio එක එකම Link එකකින් පහසුවෙන් බැලිය හැකිද?",
      "අඩංගු කර ඇත්තේ මාගේ හොඳම නිර්මාණ පමණක්ද?",
      "සෑම නිර්මාණයක් සඳහාම එය සැකසූ හේතුව ලියා තිබේද?",
      "මාව සම්බන්ධ කරගැනීමට අවශ්‍ය පහසුකම් පැහැදිලිද?",
      "වෙබ් අඩවිය Mobile Phone එකට පහසුවෙන් පේනවාද?"
    ],
    "cta": "ඔබේ නිර්මාණ ලෝකයට එකතු කර ආකර්ෂණීය Portfolio එකක් නිමවා ගැනීමට අපගේ විශේෂඥ උපදෙස් ලබාගන්න."
  }
},
{
  "id": "109",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1596526131083-e8c638c9c6c7?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "writing-professional-emails-to-recruiters",
    "title": "Writing Professional Emails to Recruiters",
    "seoTitle": "How to Email a Recruiter | Professional Email Templates",
    "metaDescription": "Master the art of emailing hiring managers. From cold outreach to following up after an interview, learn the etiquette of professional communication.",
    "intro": "Knowing how to gracefully communicate over email is a dying art. When you interact with a recruiter via email, they are silently judging your professional communication skills.",
    "problemExplanation": "Sending emails with no subject lines, using informal language ('Hi bro'), attaching unstructured CVs, or failing to follow up makes you appear unprofessional. In the corporate world, an unprofessional email is a one-way ticket to the rejection pile.",
    "whatIsIt": {
      "heading": "What Makes an Email 'Professional'?",
      "content": "A professional email is concise, polite, structured with clear intentions, uses proper formatting and grammar, and respects the recipient's time by getting straight to the point without unnecessary fluff."
    },
    "whyItMatters": {
      "heading": "First Impressions Matter",
      "content": "If your email is well-crafted, the recruiter automatically assumes your work will be well-crafted too. It sets a positive, respectful tone that puts you ahead of 90% of sloppy applicants who just hit 'forward'."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Write a Clear Subject Line",
        "content": "The subject line must tell them exactly what is inside. Format it clearly. E.g., 'Application for Software Engineer - [Your Name] - [Job Reference ID]'."
      },
      {
        "heading": "Step 2: Use the Right Salutation",
        "content": "Never use 'Hey'. Use 'Dear Mr. / Ms. [Last Name]'. If you don’t know their name, 'Dear Hiring Manager' or 'Dear [Company Name] Talent Team' is perfectly acceptable."
      },
      {
        "heading": "Step 3: Keep the Body Brief and Focused",
        "content": "State your purpose in the first sentence. Mention any mutual connections or where you found the job. Include a 2-sentence summary of why you are a strong fit. Direct them to your attached CV."
      },
      {
        "heading": "Step 4: Rename Your Attachments",
        "content": "Never attach a file named 'asdasd_cv_final2.pdf'. Always rename your document professionally: 'Firstname_Lastname_CV.pdf'."
      },
      {
        "heading": "Step 5: Include a Professional Signature",
        "content": "End with 'Sincerely' or 'Best regards', followed by your full name, phone number, and a link to your polished LinkedIn profile."
      }
    ],
    "examples": {
      "heading": "Following-up After an Interview",
      "content": "“Dear [Name],\n\nThank you for the opportunity to speak yesterday regarding the Marketing Analyst position. I greatly enjoyed learning about the upcoming Q3 strategy. I remain very enthusiastic about the role. Please let me know if you need any further information from my end.\n\nBest regards,\n[Your Name]\n[Phone Number]”"
    },
    "commonMistakes": {
      "heading": "Emailing Blunders",
      "content": "Pasting the cover letter in the email AND attaching it again, using funky colored fonts, forgetting the attachment entirely, and sending follow-ups every day demanding an answer."
    },
    "finalChecklist": [
      "Is the subject line clear and informative?",
      "Have I used a professional greeting?",
      "Is the attachment correctly named and actually attached?",
      "Is the body text completely free of slang and typos?",
      "Is my contact information in the signature?"
    ],
    "cta": "Want to make sure you never send a poorly written corporate email again? Access our comprehensive library of Email Templates for Job Seekers."
  },
  "si": {
    "slug": "emailing-recruiters-si",
    "title": "Recruiters ලා හට වෘත්තීය මට්ටමින් Email එකක් යවමු",
    "seoTitle": "HR එකට Email එකක් වෘත්තීයව යවන ආකාරය",
    "metaDescription": "ප්‍රතික්ෂේප නොවන ලෙස ආයතන වලට ඊමේල් (Email) යවන ආකාරය සහ අනුකම්පා විරහිත ලෝකයේ වෘත්තීමය සන්නිවේදනය ඉගෙන ගන්න.",
    "intro": "Email එකක් යැවීම අද කාලයේ ඉතා සරල දෙයක් වුවත්, ආයතනයකට එය වෘත්තීමය ආකාරයෙන් ලිවීම බොහෝ දෙනා නොදන්නා කලාවකි. HR නිලධාරියෙක් ඔබගේ CV එක විවෘත කිරීමටත් පෙර, ඔබගේ Email එකෙන් ඔබව විනිශ්චය කරයි.",
    "problemExplanation": "Subject එකක් නොමැතිව, ඉතා කෙටි වචන වලින් ('See attached'), සහ වැරදි නම් සහිත ලිපිගොනු අමුණා යවන Emails වහාම ප්‍රතික්ෂේප ලැයිස්තුවට යයි. මන්ද එයින් හැඟෙන්නේ ඔබට වෘත්තීය සන්නිවේදන හැකියාවක් නොමැති බවයි.",
    "whatIsIt": {
      "heading": "වෘත්තීය (Professional) Email එකක් යනු කුමක්ද?",
      "content": "ඉතා පැහැදිලි, තේරුම්ගැනීමට පහසු, නිවැරදි ව්‍යාකරණ භාවිත කරමින් සහ ලබන්නාට පහසුවෙන් අවශ්‍ය දේ ලබාගත හැකි පරිදි ඉතා ආචාරශීලීව සකසන ලද Email පණිවිඩයකි."
    },
    "whyItMatters": {
      "heading": "පළමු හැඟීම වැදගත් ඇයි?",
      "content": "ඔබේ Email ලිවීම පිළිවෙළට තිබේ නම්, ඔබ වැඩ කරන්නේද ඉතා පිළිවෙළට බව ඔවුන්ට හැඟේ. පෝලිමේ සිටින අනෙක් සාමාන්‍ය අයදුම්කරුවන් අතරින් මෙය ඔබව සුවිශේෂී පුද්ගලයෙකු බවට පත් කරයි."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: පැහැදිලි Subject Line එකක් යෙදීම",
        "content": "ඊමේල් එකේ ඇතුළත තිබෙන්නේ කුමක්දැයි එය කියවීමෙන් එකවරම තේරුම් ගත යුතුය. උදා: 'Application for Software Engineer - [ඔබගේ නම] - [Job Reference]'"
      },
      {
        "heading": "පියවර 2: නිවැරදි ආමන්ත්‍රණය",
        "content": "කිසිවිටෙකත් 'Hi', 'Hey' භාවිතා නොකරන්න. 'Dear Mr/Ms. [අවසන් නම]' භාවිත කරන්න. නම නොදන්නේ නම් 'Dear Hiring Manager' භාවිතා කරන්න."
      },
      {
        "heading": "පියවර 3: පණිවිඩය කෙටි සහ පැහැදිලි කිරීම",
        "content": "ඔබ ලියන හේතුව පළමු වාක්‍යයෙන්ම සඳහන් කරන්න. ඔබ මෙම තනතුරට සුදුසු වීමට හේතු වාක්‍ය 2 කින් පවසා, වැඩි විස්තර සඳහා අමුණා ඇති CV පත්‍රිකාව බලන ලෙස ඉල්ලන්න."
      },
      {
        "heading": "පියවර 4: Attachment එකේ නම වෙනස් කිරීම",
        "content": "CV එක Attach කිරීමට පෙර එහි නම 'My_CV_new_23.pdf' වැනි දේකින් වෙනස් කර, 'Firstname_Lastname_CV.pdf' ආකාරයෙන් ඉතා වෘත්තීය ලෙස Rename කරන්න."
      },
      {
        "heading": "පියවර 5: Professional Signature එක",
        "content": "අවසානයේ 'Best regards' හෝ 'Sincerely' යොදා, ඔබගේ සම්පූර්ණ නම, දුරකථන අංකය සහ LinkedIn ගිණුමේ Link එක අනිවාර්යයෙන්ම පහතින් සටහන් කරන්න."
      }
    ],
    "examples": {
      "heading": "Interview එකකින් පසුව යවන ස්තුති කිරීමේ විද්‍යුත් ලිපිය (Follow-up)",
      "content": "“Dear [Name],\n\nඊයේ දින මා සමඟ පැවැත්වූ සම්මුඛ සාකච්ඡාවට බොහෝ ස්තූතියි. එහිදී කතා කළ කරුණු අනුව ආයතනයේ ඉදිරි ගමනට සහාය වීමට මා ඉතා කැමැත්තෙන් පසු වෙමි. මේ පිළිබඳව වැඩිදුර තොරතුරු අවශ්‍ය නම් මා සම්බන්ධ කරගන්න.\n\nBest regards,\n[Your Name]\n[Phone Number]”"
    },
    "commonMistakes": {
      "heading": "සිදුවන ලොකුම වැරදි",
      "content": "Cover letter එක Email එකේද ලියා නැවත PDF එකක් ලෙසද යැවීම, වැදගැම්මකට නැති වර්ණ සහ ආකෘති භාවිත කිරීම, CV එක Attach කිරීමට අමතක වීම සහ තීරණය ගැන අසමින් දිනපතා කරදර කිරීම."
    },
    "finalChecklist": [
      "Subject line එක පැහැදිලිද?",
      "ආරම්භය ආචාරශීලීද?",
      "ඇමිණුමේ (Attachment) නම නිවැරදිද සහ එය Attach කළාද?",
      "අක්ෂර වින්‍යාස/ව්‍යාකරණ වැරදි පරීක්ෂා කළාද?",
      "Signature එක පහළින් යොදා තිබේද?"
    ],
    "cta": "ආයතනවල නිලධාරීන්ට මින් පසුව කිසිදු දෝෂයකින් තොරව සුපිරි Business Email යැවීමට අපගේ සේවාවන් සමඟ එක්වන්න."
  }
},
{
  "id": "110",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1579227114347-15d08129bdee?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "video-resume-infographic-cv",
    "title": "Creating a Video Resume or Infographic CV",
    "seoTitle": "How to Make a Video Resume & Infographic CVs",
    "metaDescription": "Learn when and how to use Video Resumes and Infographic CVs to creatively showcase your personality and skills in modern job markets.",
    "intro": "Innovation in the hiring process has paved the way for creative formats like Video Resumes and Infographic CVs. While traditional CVs are essential, creative formats can help you stand out immensely.",
    "problemExplanation": "A standard text-based CV is great for ATS, but it fails to communicate your charisma, presentation skills, or design prowess. In highly creative or client-facing roles, simply writing 'excellent communication skills' is not convincing enough.",
    "whatIsIt": {
      "heading": "What are Creative Resumes?",
      "content": "A Video Resume is a 1-to-2 minute recorded pitch where you speak directly to the camera about your skills and value. An Infographic CV is a highly visual document using charts, icons, and typography to map out your career timeline."
    },
    "whyItMatters": {
      "heading": "Breaking Through the Noise",
      "content": "For roles in Sales, PR, Media, or Graphic Design, your personality and visual communication are part of the core product. A Video/Infographic resume acts as a real-time audition, catching an employer's attention immediately."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Know Your Audience",
        "content": "Never send a video resume to a traditional bank or a law firm unless specifically asked. Reserve these formats for startups, marketing agencies, tech firms, and creative industries."
      },
      {
        "heading": "Step 2: Script It Out (For Video)",
        "content": "Do not wing it. Write a crisp script. Hook the viewer in the first 10 seconds. State your name, your core expertise, outline a major achievement, and explain why you're passionate about their company."
      },
      {
        "heading": "Step 3: Quality Matters",
        "content": "For video: Use natural lighting, ensure the audio is noise-free, and dress professionally. For infographics: Maintain color balance, avoid cluttered charts, and ensure it remains highly readable."
      },
      {
        "heading": "Step 4: Keep It Short",
        "content": "A video resume should be strictly under 2 minutes. An infographic CV still needs to fit comfortably onto one, easily digestible page."
      },
      {
        "heading": "Step 5: Always Provide a Standard CV As Well",
        "content": "Creative formats are supplements, not replacements. The ATS software cannot scan a video or a heavily graphical PDF. Always submit your standard ATS-friendly CV alongside them."
      }
    ],
    "examples": {
      "heading": "Video Script Concept",
      "content": "“Hi, my name is [Name] and I specialize in turning complex digital marketing data into high-converting campaigns. Over the last 3 years, I've scaled client revenues by an average of 40%. Unlike a piece of paper, I wanted you to see the actual energy I'll bring to your marketing team. Here is a brief look at my portfolio...”"
    },
    "commonMistakes": {
      "heading": "Creative Traps",
      "content": "Using overly dramatic background music, poor audio quality, treating the video like an informal vlog, and making infographics so complicated that the actual text is difficult to read."
    },
    "finalChecklist": [
      "Is the company culture suitable for a creative resume?",
      "Is my video under 2 minutes with high-quality audio?",
      "Does the infographic perfectly align with standard design principles?",
      "Does my personality look professional, yet engaging?",
      "Did I also attach my standard, text-based ATS resume?"
    ],
    "cta": "Want to create a compelling script for your video resume or need an infographic designed? Explore our premium creative CV services."
  },
  "si": {
    "slug": "video-resume-infographic-cv-si",
    "title": "Video Resume එකක් හෝ Infographic CV එකක් නිර්මාණය කරමු",
    "seoTitle": "Video Resume එකක් සහ Infographic CV එකක් සාදන ආකාරය",
    "metaDescription": "අඩු කාලයකදී වැඩි වටිනාකමක් පෙන්වන Video Resume හෝ පැහැදිලි Infographic CV එකක් නිවැරදිව භාවිත කරන ආකාරය ඉගෙන ගන්න.",
    "intro": "සාම්ප්‍රදායික CV වලට අමතරව, අද කාලයේ ඔබේ ප්‍රතිරූපය වඩා හොඳින් ගොඩනංවන Video Resume සහ Infographic CV ලෝකයේ ජනප්‍රිය වෙමින් පවතී.",
    "problemExplanation": "සාමාන්‍ය CV එකකට කිසිසේත්ම ඔබේ කටහඬ, කතා කිරීමේ විලාසය, සහ ඔබේ ඉදිරිපත් කිරීමේ හැකියාව විදහා දැක්විය නොහැක. Sales වැනි තනතුරු වලදී 'හොඳින් කතා කිරීමට හැකිය' යැයි කොළයක ලිවීම පමණක් කිසිසේත් ප්‍රමාණවත් නොවේ.",
    "whatIsIt": {
      "heading": "මේවා මොනවාද?",
      "content": "Video Resume යනු ඔබ කෙලින්ම කැමරාවට කතා කරමින් විනාඩි 1 - 2 කින් පමණ ඔබේ හැකියාවන් හා පළපුරුද්ද විස්තර කරන වීඩියෝවකි. Infographic CV එකක් යනු සාමාන්‍ය වචන වෙනුවට වර්ණ, Icons, සහ ප්‍රස්ථාර භාවිතයෙන් නිර්මාණාත්මකව සාදන ලද CV එකකි."
    },
    "whyItMatters": {
      "heading": "අනෙක් අයගෙන් කැපී පෙනෙන්නට",
      "content": "මාධ්‍ය, අලෙවිකරණය (Marketing), සහ නිර්මාණාත්මක ක්‍ෂේත්‍ර වලදී මෙය ඔබගේ සැබෑ දක්ෂතාව පරීක්ෂා කරන සජීවී Audition එකක් වැනිය. සේවායෝජකයෙකුට කොළ සියයක් කියවනවාට වඩා මෙය පෞද්ගලිකව දැනෙන අත්දැකීමක් වේ."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: සුදුසු තැන් පමණක් තෝරාගන්න",
        "content": "සෑම රැකියාවකටම මෙය ගැලපෙන්නේ නැත. බැංකු හෝ නීති ආයතන වැනි සම්ප්‍රදායික තැන්වලට මෙය යවන්න එපා. මෙය වඩාත් ගැලපෙන්නේ Startups, Advertising සහ Tech සමාගම් වලටයි."
      },
      {
        "heading": "පියවර 2: කියන දේ කල්තියා ලියාගන්න (Script)",
        "content": "කැමරාව ඉදිරියේ අහඹු ලෙස කතා කරන්නට යන්න එපා. පළමු තත්ත්පර 10 තුළ ඔබගේ නම සහ කුසලතා කියමින් ආකර්ෂණීය ආරම්භයක් ගන්න. පැහැදිලි Script එකක් කල්තියා ලියාගන්න."
      },
      {
        "heading": "පියවර 3: ගුණාත්මක බව (Quality)",
        "content": "වීඩියෝ එකේ අනිවාර්යයෙන්ම හොඳ ආලෝකයක් සහ පැහැදිලි ශබ්දයක් (Audio) තිබිය යුතුය. Infographic එකක වුවද, වැඩිපුර වර්ණ සහ කොටු භාවිතා නොකර සරල බව රැකගන්න."
      },
      {
        "heading": "පියවර 4: කෙටියෙන් අදහස දක්වන්න",
        "content": "Video එකක් විනාඩි 2 කට වඩා දිගු නොවිය යුතුය. Infographic CV එකද එක් පිටුවක පැහැදිලිව පහසුවෙන් කියවිය හැකි ලෙස නිර්මාණය කළ යුතුය."
      },
      {
        "heading": "පියවර 5: අමතරව සාමාන්‍ය CV එකකුත් යවන්න",
        "content": "ATS මෘදුකාංග වලට Video හෝ Graphics ඇති දේවල් කියවීමට නොහැකි බැවින්, අනිවාර්යයෙන්ම අප පෙර සඳහන් කළ ATS-Friendly ලියවිල්ල අමතරව යැවිය යුතුය."
      }
    ],
    "examples": {
      "heading": "කතා කිරීමට උදාහරණයක්",
      "content": "“ආයුබෝවන්, මම [නම]. ආයතනයක අලෙවිකරණ දත්ත උපයෝගී කරගෙන විකුණුම් වැඩි කරන Digital Campaigns නිර්මාණය කිරීමට මට වසර 3 ක පළපුරුද්දක් තිබෙනවා. කඩදාසියකට වඩා, මගේ උකටලී නොවන ශක්තිමත් කතා විලාසය ඔබට පෙන්වීමටයි මම මේ වීඩියෝ එක යොමු කළේ.”"
    },
    "commonMistakes": {
      "heading": "ලොකුම වැරදි",
      "content": "කන් අගුළු වැටෙන පසුබිම් සංගීතය යෙදීම, නිවසේ ඇති සාමාන්‍ය ඇඳුම් වලින් සහ අඳුරු කාමරයක රූගත කිරීම, සහ Infographic එකේ ඇති අකුරු කියවිය නොහැකි තරම් කුඩා වීම."
    },
    "finalChecklist": [
      "අදාළ ආයතනයේ සංස්කෘතියට මෙම ක්‍රමය ගැලපෙනවාද?",
      "වීඩියෝව විනාඩි 2 කට අඩුවෙන් හා පැහැදිලි Audio එකකින් යුක්තද?",
      "Infographic එක හැඩ වුවත් පහසුවෙන් කියවීමට හැකිද?",
      "සැබෑ වෘත්තීය හැසිරීමක් මා රඳවාගෙන සිටිනවාද?",
      "සාමාන්‍ය ලිඛිත (ATS) CV එකද අමුණා තිබේද?"
    ],
    "cta": "ඔබගේ හැකියාවන් සජීවීව පෙන්වන Video Script එකක් හෝ Infographic නිර්මාණයක් අපෙන් සාදාගැනීමට අදම එකතු වන්න."
  }
},
{
  "id": "111",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "how-to-describe-achievements-in-a-cv",
    "title": "How to Describe Achievements in a CV",
    "seoTitle": "How to Write Achievements in a CV | Better Resume Results",
    "metaDescription": "Learn how to convert daily job duties into measurable achievements that impress recruiters and increase interview calls.",
    "intro": "Recruiters are not impressed by long lists of routine duties. They are impressed by outcomes.",
    "problemExplanation": "Most CVs say things like 'Responsible for sales' or 'Handled operations.' Those lines sound generic and do not prove impact. Without quantifiable achievements, your profile blends into hundreds of similar applications.",
    "whatIsIt": {
      "heading": "What Is an Achievement Statement?",
      "content": "An achievement statement is a result-focused bullet point that explains what you changed, improved, or delivered. It includes action, context, and measurable impact."
    },
    "whyItMatters": {
      "heading": "Why Achievement-Based CVs Win",
      "content": "Hiring managers decide quickly. Strong achievement bullets show business value in seconds and make your interview selection easier."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Start with a strong action verb",
        "content": "Use verbs like Led, Increased, Reduced, Designed, Implemented, and Optimized to show ownership."
      },
      {
        "heading": "Step 2: Add context",
        "content": "Briefly explain the project, team, or challenge so the result has meaning."
      },
      {
        "heading": "Step 3: Quantify impact",
        "content": "Use percentages, revenue, time saved, cost reduced, customer growth, or process speed."
      },
      {
        "heading": "Step 4: Keep each bullet concise",
        "content": "Aim for one to two lines per bullet, with direct language and no filler words."
      },
      {
        "heading": "Step 5: Match achievements to the target role",
        "content": "Select achievements aligned with the role's KPIs instead of listing everything you have done."
      }
    ],
    "examples": {
      "heading": "Duty vs Achievement Example",
      "content": "**Weak:** Responsible for social media campaigns.\n**Strong:** Led paid social campaigns that increased qualified leads by 38% in 4 months while reducing cost per lead by 21%."
    },
    "commonMistakes": {
      "heading": "Common Mistakes",
      "content": "Using only duties, writing vague claims without numbers, exaggerating results, and adding irrelevant achievements that do not fit the target role."
    },
    "finalChecklist": [
      "Does each bullet begin with an action verb?",
      "Have I included measurable impact wherever possible?",
      "Are my most relevant achievements at the top?",
      "Is each achievement short and clear?",
      "Can I explain each claim confidently in an interview?"
    ],
    "cta": "Need help transforming your job duties into high-impact achievement bullets? We can rewrite your CV for stronger interview results."
  },
  "si": {
    "slug": "cv-eka-jayagrahana-liyana-hati",
    "title": "CV එකේ ජයග්‍රහණ (Achievements) ලියන හොඳම ක්‍රමය",
    "seoTitle": "CV Achievements ලියන ආකාරය | වැඩි Interview Calls",
    "metaDescription": "සාමාන්‍ය duties වෙනුවට measurable achievements ලියන ආකාරය ඉගෙනගෙන ඔබගේ CV එක ප්‍රබල කරන්න.",
    "intro": "Recruiter කෙනෙකුට ඔබ කළ දෛනික වැඩ ලැයිස්තුමත් කිරීම පමණක් ප්‍රමාණවත් නොවේ. ඔවුන්ට අවශ්‍ය වන්නේ ප්‍රතිඵලයයි.",
    "problemExplanation": "බොහෝ CV වල 'Handled sales' වැනි පොදු වාක්‍ය පමණක් තිබේ. එයින් ඔබගේ සැබෑ වටිනාකම පෙන්වෙන්නේ නැත. අංක සහ ප්‍රතිඵල නොමැති CV එකක් පහසුවෙන් අමතක වේ.",
    "whatIsIt": {
      "heading": "Achievement statement එකක් කියන්නේ කුමක්ද?",
      "content": "ඔබ කළ ක්‍රියාව, අදාළ පසුබිම සහ ලැබූ measurable ප්‍රතිඵලය කෙටිව දක්වන bullet point එකකි."
    },
    "whyItMatters": {
      "heading": "මේ ක්‍රමය වැදගත් ඇයි?",
      "content": "ආයතන බලන්නේ ඔබ ව්‍යාපාරයට ගෙන එන වටිනාකමයි. Achievement-based CV එකකින් ඒ බව තත්පර කිහිපයෙන් පෙන්විය හැක."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: බලවත් ක්‍රියා පදයකින් ආරම්භ කරන්න",
        "content": "Led, Improved, Increased, Reduced වැනි action verbs භාවිත කර ownership එක පෙන්වන්න."
      },
      {
        "heading": "පියවර 2: කෙටි context එකක් දෙන්න",
        "content": "ව්‍යාපෘතිය හෝ ගැටළුව කෙටියෙන් සඳහන් කළාම ප්‍රතිඵලය තේරුම් ගැනීම පහසු වේ."
      },
      {
        "heading": "පියවර 3: අංක භාවිත කරන්න",
        "content": "ප්‍රතිශතය, මුදල් අගය, කාලය ඉතිරිවීම, කාර්යක්ෂමතාව වැඩිවීම වැනි දේ එකතු කරන්න."
      },
      {
        "heading": "පියවර 4: දිග නොකරන්න",
        "content": "Bullet එකක් lines 1-2 කට සීමා කර කියවීමට පහසු ලෙස ලියන්න."
      },
      {
        "heading": "පියවර 5: Target job එකට ගැලපෙන achievements තෝරන්න",
        "content": "හැම දෙයක්ම නොදමා, අදාළ තනතුරට වටිනා achievements පමණක් තෝරන්න."
      }
    ],
    "examples": {
      "heading": "දුර්වල vs ප්‍රබල උදාහරණයක්",
      "content": "**Weak:** Social media manage කළා.\n**Strong:** මාස 4කදී paid campaigns optimize කර qualified leads 38% කින් වැඩි කර CPL 21% කින් අඩු කළා."
    },
    "commonMistakes": {
      "heading": "සිදුවන වැරදි",
      "content": "Duties පමණක් ලිවීම, numbers නොදැමීම, අතිශයෝක්තියෙන් ලිවීම, සහ target role එකට අදාළ නොවන කරුණු දමීම."
    },
    "finalChecklist": [
      "සෑම bullet එකක්ම action verb එකකින් ආරම්භ වෙනවාද?",
      "මැනිය හැකි ප්‍රතිඵලය ඇතුළත් කළාද?",
      "අදාළ achievements මුලින්ම දාලා තියේද?",
      "bullet points කෙටි සහ පැහැදිලිද?",
      "Interview එකේදී මේ claims prove කළ හැකිද?"
    ],
    "cta": "ඔබගේ duties statements, result-driven achievements බවට අපි පරිවර්තනය කර දෙන්නම්. අදම ඔබේ CV එක optimize කරගන්න."
  }
},
{
  "id": "112",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "how-to-write-a-job-winning-cv-profile",
    "title": "How to Write a Job-Winning CV Profile",
    "seoTitle": "CV Profile Writing Guide | Professional Summary That Gets Interviews",
    "metaDescription": "Write a concise CV profile that positions your value in the first 5 seconds and improves shortlist rates.",
    "intro": "Your CV profile is the first section recruiters read. If it is weak, they may never reach the rest of your CV.",
    "problemExplanation": "Many candidates still write generic objectives like 'Seeking a challenging position.' That tells recruiters nothing about your actual value, achievements, or role fit.",
    "whatIsIt": {
      "heading": "What Is a CV Profile?",
      "content": "A CV profile (professional summary) is a 3-5 line snapshot of your experience, strengths, and measurable impact relevant to the target job."
    },
    "whyItMatters": {
      "heading": "Why This Section Is Critical",
      "content": "A strong profile gives immediate clarity. It helps recruiters understand who you are, what level you operate at, and why they should continue reading."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Identify your professional identity",
        "content": "Start with your current role and years of experience in one clear sentence."
      },
      {
        "heading": "Step 2: Add 2-3 core strengths",
        "content": "Choose strengths that directly match the role, such as stakeholder management, data analysis, or process improvement."
      },
      {
        "heading": "Step 3: Include one measurable result",
        "content": "Add a proof point like revenue growth, productivity increase, or cost reduction."
      },
      {
        "heading": "Step 4: Use role keywords",
        "content": "Mirror the job description language so ATS and recruiters quickly see alignment."
      },
      {
        "heading": "Step 5: Keep it concise and specific",
        "content": "Avoid buzzwords and cliches. Focus on concrete value in under 80 words."
      }
    ],
    "examples": {
      "heading": "Strong CV Profile Example",
      "content": "Results-driven Operations Executive with 6+ years of experience in FMCG distribution, inventory optimization, and vendor management. Improved order fulfilment accuracy from 89% to 97% and reduced logistics costs by 14% through route redesign and KPI-based tracking."
    },
    "commonMistakes": {
      "heading": "Common Mistakes",
      "content": "Writing an objective instead of a profile, using vague adjectives only, copying from online templates, and making the paragraph too long."
    },
    "finalChecklist": [
      "Does my profile mention role + years of experience?",
      "Did I include strengths relevant to this role?",
      "Is there at least one measurable result?",
      "Are role keywords naturally included?",
      "Is the profile clear within 3-5 lines?"
    ],
    "cta": "Want a recruiter-ready profile that creates a strong first impression? Let us craft your CV summary professionally."
  },
  "si": {
    "slug": "job-winning-cv-profile-liyana-hati",
    "title": "Job-Winning CV Profile එකක් ලියන්නේ කෙසේද?",
    "seoTitle": "Professional CV Summary ලියන මාර්ගෝපදේශය",
    "metaDescription": "CV එකේ මුලින්ම කියවන Profile section එක ප්‍රබලව ලියා shortlist chance වැඩි කරගන්න.",
    "intro": "Recruiter කෙනෙක් CV එක බැලූ විගස කියවන්නේ Profile section එකයි. ඒක දුර්වල නම් ඉතිරි කොටස් කියවීමටත් ඉඩ නැති වෙයි.",
    "problemExplanation": "'Seeking a challenging position' වැනි objective වාක්‍ය අද කාලයට ගැලපෙන්නේ නැත. ඒවා ඔබගේ value එක හෝ results කිසිවක් පෙන්වන්නේ නැහැ.",
    "whatIsIt": {
      "heading": "CV Profile එක කියන්නේ කුමක්ද?",
      "content": "ඔබගේ පළපුරුද්ද, ශක්තිමත් හැකියාවන් සහ measurable achievements 3-5 lines තුළ කෙටියෙන් දක්වන professional summary එකයි."
    },
    "whyItMatters": {
      "heading": "මේ කොටස තීරණාත්මක ඇයි?",
      "content": "Recruiter කෙනාට ඔබ කවුද, කුමන මට්ටමේද, සහ මේ role එකට ගැලපෙන්නේ ඇයි කියලා ඉක්මනින්ම තේරුම් ගන්න මෙය උදව් කරයි."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: ඔබගේ professional identity එක සඳහන් කරන්න",
        "content": "වත්මන් role එක සහ years of experience එක පළමු වාක්‍යයෙන් දක්වන්න."
      },
      {
        "heading": "පියවර 2: Role එකට ගැලපෙන strengths 2-3ක් දාන්න",
        "content": "Leadership, analysis, communication වගේ target job එකට වැදගත් strengths තෝරන්න."
      },
      {
        "heading": "පියවර 3: අංක සහිත ප්‍රතිඵලයක් එකතු කරන්න",
        "content": "Revenue, cost, productivity වගේ measurable impact එකක් දෙන්න."
      },
      {
        "heading": "පියවර 4: Job description keywords ඇතුළත් කරන්න",
        "content": "ATS match වීමට job ad එකේ keywords natural ලෙස යොදාගන්න."
      },
      {
        "heading": "පියවර 5: 80 words වලට සීමා කරන්න",
        "content": "දිගු paragraph නොලියා concise, value-focused summary එකක් ලියන්න."
      }
    ],
    "examples": {
      "heading": "හොඳ Profile උදාහරණයක්",
      "content": "FMCG operations අංශයේ වසර 6+ අත්දැකීම් ඇති results-focused Operations Executive කෙනෙකි. Inventory planning සහ vendor coordination හරහා order accuracy 89% සිට 97% දක්වා ඉහළ නංවා logistics cost 14% කින් අඩු කළා."
    },
    "commonMistakes": {
      "heading": "සුලභ වැරදි",
      "content": "Objective statement දමීම, buzzwords පමණක් භාවිතා කිරීම, template copy-paste කිරීම, සහ profile එක අතිශය දිගු කිරීම."
    },
    "finalChecklist": [
      "මගේ role + experience years දාලා තියේද?",
      "target role එකට අදාළ strengths ඇතුළත්ද?",
      "measurable result එකක් තියේද?",
      "ATS keywords natural ලෙස ඇතුළත්ද?",
      "3-5 lines තුළ පැහැදිලි summary එකක්ද?"
    ],
    "cta": "ඔබට වෙනස්ම first impression එකක් දෙන CV profile එකක් අපි professional ලෙස ලියා දෙන්නම්."
  }
},
{
  "id": "113",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "how-to-make-your-cv-more-attractive-to-employers",
    "title": "How to Make Your CV More Attractive to Employers",
    "seoTitle": "Make Your CV Attractive to Employers | Practical Resume Tips",
    "metaDescription": "Improve your CV visual clarity and content strategy so employers quickly notice your value.",
    "intro": "Attractive CVs are not about fancy graphics. They are about clarity, relevance, and proof of value.",
    "problemExplanation": "Candidates often overdesign their resume while under-explaining impact. The result is a pretty document with weak hiring signals.",
    "whatIsIt": {
      "heading": "What Makes a CV Attractive to Employers?",
      "content": "A CV is attractive when it is easy to scan, role-relevant, and supported by measurable achievements and clear structure."
    },
    "whyItMatters": {
      "heading": "Why Presentation + Relevance Both Matter",
      "content": "Recruiters skim fast. Strong structure helps readability, while targeted content helps decision-making. You need both to increase callbacks."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Start with a clean layout",
        "content": "Use clear headings, consistent spacing, and one readable font. Avoid visual clutter."
      },
      {
        "heading": "Step 2: Tailor for each role",
        "content": "Adjust profile, skills, and top achievements according to each job ad."
      },
      {
        "heading": "Step 3: Use strategic keywords",
        "content": "Include role-specific terms from the job description to improve ATS and recruiter match."
      },
      {
        "heading": "Step 4: Prioritize results",
        "content": "Show what changed because of your work using numbers and outcomes."
      },
      {
        "heading": "Step 5: Remove low-value details",
        "content": "Delete outdated, repetitive, or irrelevant points that dilute your strongest sections."
      }
    ],
    "examples": {
      "heading": "Attractive Bullet Example",
      "content": "Designed and implemented a customer onboarding workflow that reduced drop-offs by 29% and improved first-month activation by 17%."
    },
    "commonMistakes": {
      "heading": "Common Mistakes",
      "content": "Using multiple colors/fonts, listing every task done, adding irrelevant personal details, and sending one generic CV everywhere."
    },
    "finalChecklist": [
      "Is the CV easy to scan in 10 seconds?",
      "Is content tailored to this job?",
      "Did I show measurable impact?",
      "Did I remove outdated information?",
      "Is the final document ATS-friendly?"
    ],
    "cta": "Want your CV to stand out for the right reasons? We can professionally optimize both structure and content."
  },
  "si": {
    "slug": "employers-la-ata-attractive-cv-ekak",
    "title": "Employers ලාට ආකර්ෂණීය CV එකක් හදන්නේ කොහොමද?",
    "seoTitle": "CV එක ආකර්ෂණීය කරගැනීම සඳහා Practical Tips",
    "metaDescription": "ලස්සන design එකකට වඩා වැදගත් clarity, relevance සහ results. CV එක employer-friendly කරගන්නා ආකාරය ඉගෙනගන්න.",
    "intro": "හොඳ CV එකක් කියන්නේ colors වැඩිපුර තියෙන design එකක් නොවෙයි. Recruiter කෙනාට තත්පර කිහිපයකින් value එක තේරුම් යන document එකකි.",
    "problemExplanation": "බොහෝ අය design එකට වැඩි අවධානය දී content එක දුර්වලව තබනවා. එතකොට CV එක පේන්නේ ලස්සනට, නමුත් shortlist වීමට අවශ්‍ය evidence නැහැ.",
    "whatIsIt": {
      "heading": "Employer-friendly CV එක කියන්නේ මොකක්ද?",
      "content": "කියවීමට පහසු structure එකක්, role එකට අදාළ content එකක්, සහ measurable achievements සහිත CV එකක්."
    },
    "whyItMatters": {
      "heading": "මේ දෙකම (presentation + relevance) අවශ්‍ය ඇයි?",
      "content": "Recruiters CV එක ඉක්මනින් scan කරනවා. කියවීමට පහසු format එකක් සහ role-fit content එකක් එකට තිබ්බොත් callback chance එක වැඩිවේ."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: Clean layout එකක් භාවිතා කරන්න",
        "content": "එකම font එක, clear headings, සහ consistent spacing භාවිතා කරන්න."
      },
      {
        "heading": "පියවර 2: Role එකකට role එකට tailor කරන්න",
        "content": "Profile, skills, top achievements එකක් එකක් job description එකට අනුව වෙනස් කරන්න."
      },
      {
        "heading": "පියවර 3: Strategic keywords දාන්න",
        "content": "ATS pass වීමට role-specific terms natural ලෙස ඇතුළත් කරන්න."
      },
      {
        "heading": "පියවර 4: Results ඉස්මතු කරන්න",
        "content": "ඔබ කළ වැඩේ අවසාන ප්‍රතිඵලය අංක සමඟ පෙන්වන්න."
      },
      {
        "heading": "පියවර 5: Low-value details ඉවත් කරන්න",
        "content": "අදාළ නොවන, පරණ, repeat වන දේ ඉවත් කර strongest points ඉස්මතු කරන්න."
      }
    ],
    "examples": {
      "heading": "හොඳ bullet එකක්",
      "content": "Customer onboarding process එක redesign කර drop-off rate 29% කින් අඩු කර first-month activation 17% කින් වැඩි කළා."
    },
    "commonMistakes": {
      "heading": "සිදුවන වැරදි",
      "content": "Fonts/colors වැඩියෙන් භාවිතා කිරීම, generic CV එකක් හැම job එකකටම යැවීම, සහ measurable results නොදැමීම."
    },
    "finalChecklist": [
      "CV එක තත්පර 10කින් scan කරගත හැකිද?",
      "content role එකට tailor කරලාද?",
      "results numbers එක්ක දැම්මාද?",
      "පරණ/අදාළ නොවන දේ ඉවත් කළාද?",
      "ATS-friendly document එකක්ද?"
    ],
    "cta": "ඔබේ CV එක employer-friendly, shortlist-ready document එකක් බවට පත් කිරීමට අපි සහය දෙන්නම්."
  }
},
{
  "id": "114",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "common-cv-problems-and-how-to-fix-them",
    "title": "Common CV Problems and How to Fix Them",
    "seoTitle": "Most Common CV Mistakes and Fixes | Resume Troubleshooting",
    "metaDescription": "Identify the most common reasons CVs fail and apply practical fixes to improve your interview conversion rate.",
    "intro": "If your CV is not getting responses, it is usually not one huge mistake. It is a series of small issues.",
    "problemExplanation": "Weak summaries, poor formatting, irrelevant details, and missing achievements quietly reduce your chances. Many candidates never diagnose these issues objectively.",
    "whatIsIt": {
      "heading": "What Is CV Troubleshooting?",
      "content": "CV troubleshooting is a structured process of finding and fixing content, formatting, and strategy issues that block interview calls."
    },
    "whyItMatters": {
      "heading": "Why a Diagnostic Approach Works",
      "content": "When you systematically fix each weakness, the CV becomes clearer, stronger, and more aligned with hiring expectations."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Audit your summary",
        "content": "Replace generic objective lines with a targeted professional profile."
      },
      {
        "heading": "Step 2: Check structure and readability",
        "content": "Ensure headings, spacing, and bullet consistency. Remove visual confusion."
      },
      {
        "heading": "Step 3: Improve achievement quality",
        "content": "Convert weak duty bullets into measurable impact statements."
      },
      {
        "heading": "Step 4: Align with job keywords",
        "content": "Add relevant terms from the target role so ATS and recruiters can match quickly."
      },
      {
        "heading": "Step 5: Remove unnecessary content",
        "content": "Delete outdated software, irrelevant school details, and long personal descriptions."
      }
    ],
    "examples": {
      "heading": "Simple Fix Example",
      "content": "**Before:** Responsible for reporting.\n**After:** Automated weekly reporting workflow, reducing report preparation time by 6 hours per week."
    },
    "commonMistakes": {
      "heading": "Problems to Watch",
      "content": "Too many pages without value, inconsistent tense, weak verbs, keyword stuffing, and grammar mistakes."
    },
    "finalChecklist": [
      "Is my profile targeted and clear?",
      "Is the structure clean and consistent?",
      "Did I replace duties with achievements?",
      "Is ATS keyword alignment in place?",
      "Did I proofread grammar and spelling?"
    ],
    "cta": "Need a complete CV audit with practical fixes? We can diagnose and rewrite your document professionally."
  },
  "si": {
    "slug": "common-cv-problems-fix-karana-hati",
    "title": "CV වල සුලභ ගැටලු සහ ඒවා විසඳන ක්‍රම",
    "seoTitle": "Common CV Mistakes හඳුනාගෙන Fix කරන ආකාරය",
    "metaDescription": "Interview calls අඩුවීමට හේතු වන CV ගැටලු හඳුනාගෙන ප්‍රායෝගිකව සකස් කරගන්නා ආකාරය.",
    "intro": "CV එකට responses අඩු නම් ඒක බොහෝවිට එක ලොකු වැරද්දක් නොවෙයි. කුඩා වැරදි කීපයක් එකට එකතු වීමේ ප්‍රතිඵලයක්.",
    "problemExplanation": "Weak profile, poor formatting, irrelevant details, measurable results නොමැතිවීම වැනි දේ shortlist chance එක අඩු කරනවා. බොහෝ දෙනා ඒවා diagnose කරන්නේ නැහැ.",
    "whatIsIt": {
      "heading": "CV troubleshooting කියන්නේ කුමක්ද?",
      "content": "CV එකේ content, formatting සහ strategy ගැටලු හඳුනාගෙන එකින් එක නිවැරදි කිරීමේ විධිමත් ක්‍රියාවලිය."
    },
    "whyItMatters": {
      "heading": "මෙය ප්‍රයෝජනවත් ඇයි?",
      "content": "Systematic විදිහට fix කළාම CV එක පැහැදිලි, ප්‍රබල, සහ hiring expectations වලට ගැලපෙන තත්ත්වයට පත්වේ."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: Summary එක audit කරන්න",
        "content": "Generic objective ඉවත් කර targeted professional profile එකක් දාන්න."
      },
      {
        "heading": "පියවර 2: Structure/readability පරීක්ෂා කරන්න",
        "content": "Headings, spacing, bullets consistency තහවුරු කර visual clutter ඉවත් කරන්න."
      },
      {
        "heading": "පියවර 3: Duty bullets improve කරන්න",
        "content": "Routine task lines measurable achievement statements බවට පරිවර්තනය කරන්න."
      },
      {
        "heading": "පියවර 4: Job keywords align කරන්න",
        "content": "Target role එකේ keywords natural ලෙස එක්කර ATS match වැඩි කරන්න."
      },
      {
        "heading": "පියවර 5: අදාළ නොවන content ඉවත් කරන්න",
        "content": "පරණ software lists, irrelevant personal details, unnecessary paragraphs ඉවත් කරන්න."
      }
    ],
    "examples": {
      "heading": "Fix උදාහරණයක්",
      "content": "**Before:** Reporting handled.\n**After:** Weekly reporting process automate කර preparation time සතියකට පැය 6කින් අඩු කළා."
    },
    "commonMistakes": {
      "heading": "මග හැරිය යුතු දේ",
      "content": "Value නොමැති දිගු pages, inconsistent tense, weak verbs, keyword stuffing, grammar mistakes."
    },
    "finalChecklist": [
      "Profile එක targeted සහ පැහැදිලිද?",
      "Layout එක clean සහ consistentද?",
      "Duties -> achievements ලෙස convert කළාද?",
      "ATS keywords alignment තිබේද?",
      "Final proofreading කළාද?"
    ],
    "cta": "ඔබේ CV එක troubleshoot කර shortlist-ready document එකක් බවට පත් කිරීමට අපගේ professional audit සේවාව ලබාගන්න."
  }
},
{
  "id": "115",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1521790945508-bf2a36314e85?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "how-long-should-a-cv-be",
    "title": "How Long Should a CV Be?",
    "seoTitle": "Ideal CV Length Guide | One Page vs Two Pages",
    "metaDescription": "Understand the best CV length by career stage and role type so your resume stays concise but complete.",
    "intro": "One page or two pages? This question confuses almost every job seeker.",
    "problemExplanation": "Some candidates overload their CV with everything they have ever done, while others remove too much and lose important value signals. Both hurt hiring decisions.",
    "whatIsIt": {
      "heading": "What Is the Ideal CV Length?",
      "content": "The ideal length depends on relevance and experience level, not strict page rules. Most candidates perform best with 1-2 focused pages."
    },
    "whyItMatters": {
      "heading": "Why Length Affects Results",
      "content": "If the CV is too long, key points get buried. If too short, credibility drops. Balanced length keeps attention and trust."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Freshers should target one page",
        "content": "For internships and entry roles, one page is usually enough when structured properly."
      },
      {
        "heading": "Step 2: Mid-career can use two pages",
        "content": "With 5+ years of relevant experience, two pages are acceptable if every section adds value."
      },
      {
        "heading": "Step 3: Prioritize relevance over chronology",
        "content": "Do not list everything. Highlight only experience and achievements relevant to the target role."
      },
      {
        "heading": "Step 4: Reduce low-value sections",
        "content": "Remove outdated trainings, old school details, and repetitive responsibilities."
      },
      {
        "heading": "Step 5: Review with a 10-second scan test",
        "content": "If a recruiter cannot identify role fit quickly, tighten and reorganize content."
      }
    ],
    "examples": {
      "heading": "Practical Rule",
      "content": "If a section does not help you win the target role, it should be shortened or removed regardless of page count."
    },
    "commonMistakes": {
      "heading": "Length Mistakes",
      "content": "Using tiny fonts to force content into one page, expanding to three pages without senior-level relevance, and repeating the same information across sections."
    },
    "finalChecklist": [
      "Is the length right for my experience level?",
      "Is every section relevant to this role?",
      "Can key value points be seen quickly?",
      "Did I remove repetitive content?",
      "Is the document still comfortable to read?"
    ],
    "cta": "Not sure if your CV is too long or too short? We can optimize length and structure for your target role."
  },
  "si": {
    "slug": "cv-ekata-kochchara-digak-ona-da",
    "title": "CV එක කොච්චර දිගක් වෙන්න ඕනෙද?",
    "seoTitle": "One Page ද Two Pages ද? CV Length Guide",
    "metaDescription": "ඔබේ career stage එකට ගැලපෙන CV length එක තෝරාගෙන concise සහ complete document එකක් හදාගන්න.",
    "intro": "One page ද? Two pages ද? බොහෝ job seekers ලාට තියෙන ප්‍රධානම CV ප්‍රශ්නය මේකයි.",
    "problemExplanation": "සමහර අය හැමදේම CV එකට දාලා දිග වැඩි කරනවා. තවත් සමහර අය වැඩිපුර remove කරලා key evidence නැති කරනවා. දෙකම අවාසියක්.",
    "whatIsIt": {
      "heading": "Ideal CV length එක කියන්නේ කුමක්ද?",
      "content": "Strict page rule එකක් වඩා relevance සහ experience level එක වැදගත්. බොහෝ අයට 1-2 focused pages හොඳම option එක."
    },
    "whyItMatters": {
      "heading": "දිග interview chance එකට බලපාන්නේ ඇයි?",
      "content": "දිග වැඩි නම් key points නැතිවෙලා යයි. අඩු වැඩිත් වටිනාකම පෙන්වෙන්නේ නැත. Balanced length එක recruiter attention එක තබාගනී."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: Freshers ලා one page target කරන්න",
        "content": "Entry-level/Internship roles සඳහා හොඳ structure එකක් එක්ක one page සාමාන්‍යයෙන් ප්‍රමාණවත්."
      },
      {
        "heading": "පියවර 2: Mid-career සඳහා two pages accept කළ හැක",
        "content": "5+ years relevant experience තියේ නම් value-add content එකක් සහිත pages දෙකක් සාධාරණයි."
      },
      {
        "heading": "පියවර 3: Relevance priority දෙන්න",
        "content": "හැම අත්දැකීමක්ම දාන්න එපා. target role එකට අදාළ ඒවා පමණක් ඉස්මතු කරන්න."
      },
      {
        "heading": "පියවර 4: Low-value sections කපාහරින්න",
        "content": "පරණ trainings, irrelevant school details, repeated tasks ඉවත් කරන්න."
      },
      {
        "heading": "පියවර 5: 10-second scan test කරන්න",
        "content": "Recruiter කෙනාට තත්පර 10කින් role-fit එක තේරෙන්නේ නැත්නම් content තව tighten කරන්න."
      }
    ],
    "examples": {
      "heading": "ප්‍රායෝගික නීතිය",
      "content": "Target job එක දිනාගැනීමට උදව් නොකරන කොටසක් නම් pages ගණන බැලුවත් නැතත් reduce/ remove කරන්න."
    },
    "commonMistakes": {
      "heading": "දිග සම්බන්ධ වැරදි",
      "content": "Tiny fonts භාවිත කර one page බලෙන් හදීම, senior relevance නැතුව pages 3කට දිගු කිරීම, සහ එකම කරුණු නැවත නැවත ලිවීම."
    },
    "finalChecklist": [
      "මගේ experience level එකට length ගැලපෙනවාද?",
      "සෑම section එකක්ම role එකට අදාළද?",
      "key value points ඉක්මනින්ම පේනවාද?",
      "repeat content ඉවත් කළාද?",
      "කියවීමට පහසු layout එකක්ද?"
    ],
    "cta": "ඔබගේ CV length එක strategy එකකට ගැලපෙන ලෙස optimize කර shortlist chance වැඩි කරගන්න."
  }
},
{
  "id": "116",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "what-is-the-best-layout-for-a-professional-cv",
    "title": "What Is the Best Layout for a Professional CV?",
    "seoTitle": "Best Professional CV Layout | Modern Resume Structure",
    "metaDescription": "Learn the most effective CV layout for readability, ATS compatibility, and recruiter attention.",
    "intro": "A strong layout helps recruiters find your value quickly. A poor layout hides even great experience.",
    "problemExplanation": "Many candidates use overdesigned templates with columns, icons, and text boxes that hurt ATS parsing and readability.",
    "whatIsIt": {
      "heading": "What Is a Professional CV Layout?",
      "content": "A professional layout is a clean single-column structure with clear hierarchy, predictable section order, and easy scanning."
    },
    "whyItMatters": {
      "heading": "Why Layout Decides Readability",
      "content": "Recruiters spend limited time per CV. Good structure reduces cognitive load and improves your chances of being shortlisted."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Use single-column format",
        "content": "Single-column layouts are safest for ATS and easiest for humans to read."
      },
      {
        "heading": "Step 2: Follow logical section order",
        "content": "Header, profile, skills, experience, education, and optional certifications is a proven structure."
      },
      {
        "heading": "Step 3: Maintain visual consistency",
        "content": "Use one font family, clear heading sizes, and consistent spacing/margins."
      },
      {
        "heading": "Step 4: Use bullet points effectively",
        "content": "Keep bullets concise and impact-focused. Avoid long paragraph blocks."
      },
      {
        "heading": "Step 5: Leave enough white space",
        "content": "Balanced spacing increases readability and gives your key points room to stand out."
      }
    ],
    "examples": {
      "heading": "Section Order Example",
      "content": "Name & Contact -> Professional Summary -> Core Skills -> Work Experience -> Education -> Certifications"
    },
    "commonMistakes": {
      "heading": "Layout Mistakes",
      "content": "Multi-column design for ATS roles, inconsistent margins, too many decorative elements, and dense text blocks without spacing."
    },
    "finalChecklist": [
      "Is my layout ATS-safe and readable?",
      "Are sections in logical order?",
      "Is visual style consistent throughout?",
      "Are bullets concise and impact-focused?",
      "Does white space make reading easier?"
    ],
    "cta": "Need a recruiter-tested CV layout that is both modern and ATS-safe? We can redesign your CV structure professionally."
  },
  "si": {
    "slug": "professional-cv-layout-hondama-kramaya",
    "title": "Professional CV එකකට හොඳම Layout එක මොකක්ද?",
    "seoTitle": "Best CV Layout Guide | ATS-friendly Structure",
    "metaDescription": "ATS-compatible සහ recruiter-friendly CV layout එකක් සකස් කිරීමේ නිවැරදි ක්‍රමය.",
    "intro": "ඔබේ අත්දැකීම් හොඳ වුනත් layout එක වැරදි නම් ඒවා recruiter කෙනාට පැහැදිලිව පේන්නේ නැහැ.",
    "problemExplanation": "අතිශය design templates, columns, icons, text boxes වගේ දේ ATS parsing වලට හා readability එකට බාධා කරයි.",
    "whatIsIt": {
      "heading": "Professional CV layout එක කියන්නේ කුමක්ද?",
      "content": "Single-column, clear hierarchy, සහ predictable section order එකක් සහිත clean format එකකි."
    },
    "whyItMatters": {
      "heading": "Layout එක වැදගත් ඇයි?",
      "content": "Recruiters ලාට CV එක ඉක්මනින් scan කරන්න වෙනවා. හොඳ layout එකකින් key information ඉක්මනින්ම පෙනේ."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: Single-column format භාවිත කරන්න",
        "content": "ATS සහ human readability දෙකටම safest option එක single-column layout එකයි."
      },
      {
        "heading": "පියවර 2: Logical section order පවත්වාගන්න",
        "content": "Header -> Summary -> Skills -> Experience -> Education -> Certifications වගේ order එකක් යොදාගන්න."
      },
      {
        "heading": "පියවර 3: Visual consistency තබාගන්න",
        "content": "එකම font family, consistent heading sizes, spacing සහ margins භාවිතා කරන්න."
      },
      {
        "heading": "පියවර 4: Bullet points නිවැරදිව භාවිත කරන්න",
        "content": "Long paragraphs වෙනුවට concise impact bullets භාවිතා කරන්න."
      },
      {
        "heading": "පියවර 5: White space තබාගන්න",
        "content": "අවශ්‍ය අතර ඉඩ තැබීමෙන් document එක කියවීමට පහසු වෙලා key points කැපී පෙනේ."
      }
    ],
    "examples": {
      "heading": "Recommended order එක",
      "content": "Name/Contact -> Profile -> Core Skills -> Work Experience -> Education -> Certifications"
    },
    "commonMistakes": {
      "heading": "Layout වැරදි",
      "content": "ATS roles සඳහා multi-column design භාවිතා කිරීම, inconsistent margins, decorative elements වැඩිපුර යොදාගැනීම, dense text blocks."
    },
    "finalChecklist": [
      "Layout එක ATS-safe ද?",
      "Sections logical order එකට තියෙනවද?",
      "Visual style consistent ද?",
      "Bullets concise සහ impact-focused ද?",
      "White space නිවැරදිව තියෙනවද?"
    ],
    "cta": "ඔබේ CV layout එක modern සහ ATS-friendly දෙකම වන ලෙස redesign කරගැනීමට අපෙන් සහය ලබාගන්න."
  }
},
{
  "id": "117",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "how-to-format-a-cv-for-maximum-readability",
    "title": "How to Format a CV for Maximum Readability",
    "seoTitle": "CV Formatting for Readability | Practical Resume Formatting Tips",
    "metaDescription": "Use formatting techniques that help recruiters scan your CV faster and understand your value instantly.",
    "intro": "Formatting is not cosmetic. It directly affects whether your CV gets understood quickly.",
    "problemExplanation": "Even strong candidates lose opportunities because their CV is hard to read: crowded lines, poor spacing, and inconsistent formatting.",
    "whatIsIt": {
      "heading": "What Is Readability-First Formatting?",
      "content": "It is a formatting approach that prioritizes visual clarity, consistent structure, and fast information retrieval."
    },
    "whyItMatters": {
      "heading": "Why Readability Influences Decisions",
      "content": "Recruiters skim quickly. Better readability means your strongest points are seen, remembered, and trusted."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Choose readable typography",
        "content": "Use professional fonts like Calibri, Arial, or Helvetica with body size around 10.5-12."
      },
      {
        "heading": "Step 2: Use consistent spacing",
        "content": "Set uniform line spacing and section spacing so content feels organized."
      },
      {
        "heading": "Step 3: Apply hierarchy clearly",
        "content": "Use heading size, bold weight, and spacing to separate sections and priorities."
      },
      {
        "heading": "Step 4: Keep bullets short",
        "content": "Use one-line or two-line bullets focused on outcome and relevance."
      },
      {
        "heading": "Step 5: Validate with print/PDF preview",
        "content": "Always check final output on desktop and PDF to ensure clean alignment and no broken lines."
      }
    ],
    "examples": {
      "heading": "Formatting Win",
      "content": "A well-spaced one-page CV with clear section headers often beats a denser two-page CV in first-round screening."
    },
    "commonMistakes": {
      "heading": "Formatting Mistakes",
      "content": "Random font sizes, inconsistent indentation, too much bold/italics, narrow margins, and heavy paragraph text."
    },
    "finalChecklist": [
      "Is typography readable at first glance?",
      "Are spacing rules consistent?",
      "Do headings create clear hierarchy?",
      "Are bullets concise and scannable?",
      "Does the final PDF look clean?"
    ],
    "cta": "Want your CV formatted to maximize readability and recruiter response? We can professionally polish your final document."
  },
  "si": {
    "slug": "cv-format-karana-honda-kramaya-readability",
    "title": "CV එක කියවීමට පහසු ලෙස Format කරන්නේ කෙසේද?",
    "seoTitle": "Maximum Readability සඳහා CV Formatting Tips",
    "metaDescription": "Recruiter කෙනාට තත්පර කිහිපයකින් value එක තේරුම් යාමට CV formatting නිවැරදිව සකස් කරගන්න.",
    "intro": "Formatting කියන්නේ design දෙයක් විතරක් නෙවෙයි. CV එක තේරුම් ගන්නා වේගය ඒකෙන් තීරණය වෙනවා.",
    "problemExplanation": "හොඳ content තිබුණත් crowded lines, poor spacing, inconsistent formatting නිසා බොහෝ CV reject වෙනවා.",
    "whatIsIt": {
      "heading": "Readability-first formatting කියන්නේ කුමක්ද?",
      "content": "Visual clarity, consistent structure සහ quick scanning පහසු කරන formatting ක්‍රමයකි."
    },
    "whyItMatters": {
      "heading": "මෙය hiring decisions වලට බලපාන්නේ ඇයි?",
      "content": "Recruiters ලා ඉක්මනින් skim කරනවා. කියවීමට පහසු CV එකක key points ඉක්මනින් පෙනෙන නිසා shortlist chance වැඩිවේ."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: Readable fonts භාවිත කරන්න",
        "content": "Calibri/Arial වැනි professional fonts සහ body size 10.5-12 range එක භාවිතා කරන්න."
      },
      {
        "heading": "පියවර 2: Spacing consistency තබාගන්න",
        "content": "Line spacing සහ section spacing එකම pattern එකෙන් පවත්වාගන්න."
      },
      {
        "heading": "පියවර 3: Clear hierarchy එකක් ගොඩනගන්න",
        "content": "Heading sizes සහ bold weight මඟින් section priorities පැහැදිලි කරන්න."
      },
      {
        "heading": "පියවර 4: Bullet points කෙටි කරන්න",
        "content": "Outcome-focused concise bullets භාවිතා කර long paragraphs අඩු කරන්න."
      },
      {
        "heading": "පියවර 5: PDF preview එක පරීක්ෂා කරන්න",
        "content": "Final document එක PDF/desktop view වලට check කර alignment issues, line breaks පරීක්ෂා කරන්න."
      }
    ],
    "examples": {
      "heading": "Formatting advantage උදාහරණයක්",
      "content": "Clean headings සහ good spacing තියෙන one-page CV එකක්, dense text තියෙන two-page CV එකකට වඩා first screening එකේ හොඳ performance දෙනවා."
    },
    "commonMistakes": {
      "heading": "Formatting වැරදි",
      "content": "Random font sizes, inconsistent indentation, bold/italics වැඩිපුර යෙදීම, margins ඉතා කුඩා කිරීම, dense paragraphs."
    },
    "finalChecklist": [
      "Font සහ size එක කියවීමට පහසුද?",
      "Spacing rules consistent ද?",
      "Headings clear hierarchy දෙන්නවාද?",
      "Bullets concise/scannable ද?",
      "Final PDF clean සහ professional ද?"
    ],
    "cta": "ඔබගේ CV formatting එක recruiter-ready quality එකකට ගෙන එන්න අපගේ professional editing සේවාව භාවිතා කරන්න."
  }
},
{
  "id": "118",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "why-your-cv-is-not-getting-interview-calls",
    "title": "Why Your CV Is Not Getting Interview Calls",
    "seoTitle": "No Interview Calls? CV Diagnosis and Fix Strategy",
    "metaDescription": "Discover the top reasons your CV is being ignored and the practical changes that increase callback rates.",
    "intro": "If you are applying to many jobs with little response, your CV strategy needs diagnosis, not guesswork.",
    "problemExplanation": "Low callbacks usually come from poor targeting, weak value messaging, missing keywords, and lack of measurable impact rather than lack of talent.",
    "whatIsIt": {
      "heading": "What Causes Low Interview Conversion?",
      "content": "A mismatch between what recruiters need and what your CV communicates. Good candidates fail when the document does not tell the right story quickly."
    },
    "whyItMatters": {
      "heading": "Why Diagnosis Beats Random Edits",
      "content": "Without identifying root causes, random edits waste time. A structured fix process improves results faster."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Check role targeting",
        "content": "Ensure each application uses a CV version tailored to that specific role and industry."
      },
      {
        "heading": "Step 2: Strengthen your value proposition",
        "content": "Rewrite profile and top bullets to show why you are a strong fit immediately."
      },
      {
        "heading": "Step 3: Improve keyword alignment",
        "content": "Add critical role terms from job descriptions into profile, skills, and achievements."
      },
      {
        "heading": "Step 4: Add measurable proof",
        "content": "Replace generic tasks with outcomes and numbers recruiters can trust."
      },
      {
        "heading": "Step 5: Audit application quality",
        "content": "Track applications, response rate, and role fit weekly so you can improve with data."
      }
    ],
    "examples": {
      "heading": "High-Impact Rewrite",
      "content": "**Before:** Experienced team player with communication skills.\n**After:** Sales Coordinator with 4+ years in B2B account support, improved renewal rate by 18% through structured customer follow-up workflows."
    },
    "commonMistakes": {
      "heading": "Common Reasons for No Calls",
      "content": "Sending one generic CV, no metrics, ATS-unfriendly format, weak profile section, and applying to misaligned roles."
    },
    "finalChecklist": [
      "Do I tailor CVs for each role type?",
      "Is my value clear in the first section?",
      "Do I include role-critical keywords?",
      "Have I shown measurable outcomes?",
      "Am I tracking conversion rate and improving?"
    ],
    "cta": "If your callback rate is low, we can audit your CV and build a conversion-focused version for your target jobs."
  },
  "si": {
    "slug": "ai-cv-ekata-interview-calls-ne-nam",
    "title": "ඔබේ CV එකට Interview Calls නොඑන්නේ ඇයි?",
    "seoTitle": "No Interview Calls? CV Diagnose සහ Fix Guide",
    "metaDescription": "CV එක නොසලකා හැරීමට ප්‍රධාන හේතු හඳුනාගෙන callback rate වැඩි කරන practical fixes ඉගෙනගන්න.",
    "intro": "බොහෝ jobs apply කළත් calls අඩු නම්, ඔබට තවත් applications නොව CV strategy diagnosis එකක් අවශ්‍යයි.",
    "problemExplanation": "බොහෝවිට ගැටළුව talent එක නොවෙයි. Document එකෙන් role-fit value එක ඉක්මනින්ම communicate නොවීමයි.",
    "whatIsIt": {
      "heading": "Low conversion එකේ මුලික හේතුව",
      "content": "Recruiterට අවශ්‍ය දේ සහ ඔබේ CV එක කියන කතාව අතර mismatch එකක්."
    },
    "whyItMatters": {
      "heading": "Random edits නොව diagnosis එක වැදගත් ඇයි?",
      "content": "Root cause හඳුනාගන්නෙ නැතිව කරන edits වලින් ප්‍රතිඵල අඩුයි. Structured fixes වලින් වේගයෙන් improvement ලැබේ."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: Role targeting පරීක්ෂා කරන්න",
        "content": "එක් එක් role type එකට CV version එක tailor කරනවාද කියලා බලන්න."
      },
      {
        "heading": "පියවර 2: Value proposition ශක්තිමත් කරන්න",
        "content": "Profile සහ top bullets rewrite කර fit එක මුලින්ම පෙන්වන්න."
      },
      {
        "heading": "පියවර 3: Keywords alignment වැඩි කරන්න",
        "content": "Job descriptions වල critical terms profile/skills/experience වලට natural ලෙස එක්කරන්න."
      },
      {
        "heading": "පියවර 4: Measurable proof එක්කරන්න",
        "content": "Generic task lines වෙනුවට numbers සහ outcomes දාන්න."
      },
      {
        "heading": "පියවර 5: Application data track කරන්න",
        "content": "Response rate weekly track කර role-fit සහ CV quality එක data මත improve කරන්න."
      }
    ],
    "examples": {
      "heading": "Rewrite උදාහරණයක්",
      "content": "**Before:** Good communication skills with team work.\n**After:** B2B Sales Coordinator වශයෙන් customer renewal rate 18% කින් වැඩි කළා structured follow-up workflow හරහා."
    },
    "commonMistakes": {
      "heading": "calls අඩුවීමට හේතු",
      "content": "Generic CV එකක් හැම job එකට යැවීම, metrics නොදැමීම, ATS-unfriendly format, weak profile, misaligned roles apply කිරීම."
    },
    "finalChecklist": [
      "Role type එකකට tailor කළ CV version තියෙනවද?",
      "මුල් section එකෙන් value එක පේනවද?",
      "Role-critical keywords ඇතුළත්ද?",
      "Measurable outcomes දැම්මාද?",
      "Response rate track කර improvements කරනවද?"
    ],
    "cta": "Interview calls වැඩි කරන conversion-focused CV එකක් සඳහා අපගේ professional CV audit සේවාව ලබාගන්න."
  }
},
{
  "id": "119",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "how-to-write-a-cv-for-competitive-jobs",
    "title": "How to Write a CV for Competitive Jobs",
    "seoTitle": "CV for Competitive Jobs | Stand Out in High-Competition Roles",
    "metaDescription": "Build a CV strategy for highly competitive roles by differentiating your value and proving impact clearly.",
    "intro": "In high-competition roles, a decent CV is not enough. You need strategic differentiation.",
    "problemExplanation": "When hundreds of qualified applicants apply, recruiters shortlist only profiles with clear fit, proof, and positioning. Generic CVs disappear quickly.",
    "whatIsIt": {
      "heading": "What Is a Competitive-Role CV?",
      "content": "A competitive-role CV is a highly targeted document designed to highlight role-specific value, measurable outcomes, and strategic fit faster than average resumes."
    },
    "whyItMatters": {
      "heading": "Why Differentiation Is Essential",
      "content": "In crowded applicant pools, relevance and evidence decide outcomes. Your CV must answer: why you over other strong candidates?"
    },
    "stepByStep": [
      {
        "heading": "Step 1: Define your positioning",
        "content": "Identify your strongest niche and align profile messaging around it."
      },
      {
        "heading": "Step 2: Prioritize role-critical achievements",
        "content": "Show 4-6 top outcomes directly tied to the role's biggest priorities."
      },
      {
        "heading": "Step 3: Include advanced skills proof",
        "content": "Support technical or domain claims with certifications, projects, or measurable delivery."
      },
      {
        "heading": "Step 4: Show progression and leadership",
        "content": "Demonstrate growth in scope, ownership, and complexity over time."
      },
      {
        "heading": "Step 5: Tailor each application deeply",
        "content": "Customize profile, keywords, and top bullets for each target company."
      }
    ],
    "examples": {
      "heading": "Competitive Positioning Example",
      "content": "Product Analyst specializing in retention strategy, delivered a 12-point increase in 90-day retention through cohort-based funnel redesign and lifecycle experimentation."
    },
    "commonMistakes": {
      "heading": "Common Mistakes",
      "content": "Using one generic CV for premium roles, leading with responsibilities instead of outcomes, and failing to show depth in one specialization."
    },
    "finalChecklist": [
      "Is my professional positioning clear?",
      "Are top achievements role-critical?",
      "Do I show progression and ownership?",
      "Is technical/domain proof included?",
      "Is this CV customized for this company?"
    ],
    "cta": "Applying to highly competitive roles? Let us build a premium, differentiation-driven CV strategy for you."
  },
  "si": {
    "slug": "competitive-jobs-sandaha-cv-liyana-hati",
    "title": "Competitive Jobs සඳහා CV එකක් ලියන්නේ කෙසේද?",
    "seoTitle": "High-Competition Roles සඳහා Standout CV Guide",
    "metaDescription": "තරඟකාරී රැකියා සඳහා role-specific, evidence-based CV එකක් සකස් කර shortlist chance වැඩි කරගන්න.",
    "intro": "තරඟකාරී රැකියා සඳහා සාමාන්‍ය CV එකක් ප්‍රමාණවත් නැහැ. ඔබ වෙනස් බව data සමඟ පෙන්විය යුතුයි.",
    "problemExplanation": "Applicants ගණන වැඩි වූ විට recruiters ලා shortlist කරන්නේ clear fit සහ measurable proof තියෙන profiles පමණයි.",
    "whatIsIt": {
      "heading": "Competitive-role CV එක කියන්නේ කුමක්ද?",
      "content": "Role එකට අදාළ value, measurable outcomes, සහ strategic fit ඉක්මනින් පෙන්වන highly-targeted CV එකකි."
    },
    "whyItMatters": {
      "heading": "Differentiation අවශ්‍ය ඇයි?",
      "content": "Strong applicants ගොඩක් අතරින් ඔබව තෝරාගන්න recruiter කෙනාට 'Why you?' කියන උත්තරය CV එකෙන්ම පේන්න ඕනේ."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: ඔබේ positioning එක පැහැදිලි කරන්න",
        "content": "ඔබේ niche strength එක හඳුනාගෙන profile messaging ඒ වටා ගොඩනගන්න."
      },
      {
        "heading": "පියවර 2: Role-critical achievements ඉස්මතු කරන්න",
        "content": "Target role priorities වලට සම්බන්ධ top outcomes 4-6ක් මුලින්ම දාන්න."
      },
      {
        "heading": "පියවර 3: Advanced skill proof දක්වන්න",
        "content": "Certifications, projects, measurable delivery මඟින් technical claims prove කරන්න."
      },
      {
        "heading": "පියවර 4: Growth/leadership trajectory පෙන්වන්න",
        "content": "කාලයත් සමඟ ownership, scope, complexity වැඩි වීම පැහැදිලිව පෙන්වන්න."
      },
      {
        "heading": "පියවර 5: Company එකකට company එකකට tailor කරන්න",
        "content": "Profile, keywords, achievements එක එක company context එකට deep customize කරන්න."
      }
    ],
    "examples": {
      "heading": "Positioning උදාහරණයක්",
      "content": "Retention strategy පිළිබඳ විශේෂඥ Product Analyst කෙනෙකු ලෙස cohort-funnel redesign හරහා 90-day retention 12 points කින් වැඩි කළා."
    },
    "commonMistakes": {
      "heading": "සුලභ වැරදි",
      "content": "Premium roles වලට generic CV එකක් යැවීම, results වෙනුවට duties පමණක් ලිවීම, සහ specialization depth නොපෙන්වීම."
    },
    "finalChecklist": [
      "මගේ positioning එක පැහැදිලිද?",
      "Top achievements role-critical ද?",
      "Growth සහ ownership පේනවද?",
      "Technical/domain proof තියෙනවද?",
      "මේ company එකට customize කළ CV එකක්ද?"
    ],
    "cta": "තරඟකාරී තනතුරු සඳහා premium-level CV positioning එකක් අපි ඔබට සකසා දෙන්නම්."
  }
},
{
  "id": "120",
  "categoryId": "a",
  "coverImage": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80",
  "en": {
    "slug": "the-best-way-to-organize-work-experience-in-a-cv",
    "title": "The Best Way to Organize Work Experience in a CV",
    "seoTitle": "Organize Work Experience in CV | Resume Experience Section Guide",
    "metaDescription": "Structure your work experience section for clarity, impact, and role relevance so recruiters can evaluate you quickly.",
    "intro": "The work experience section is the heart of your CV. How you organize it can make or break your shortlist chance.",
    "problemExplanation": "Candidates often list responsibilities in random order, bury achievements, and fail to show progression. Recruiters then struggle to assess fit."
    ,
    "whatIsIt": {
      "heading": "What Is a Well-Organized Experience Section?",
      "content": "A reverse-chronological structure where each role clearly presents scope, key responsibilities, and measurable achievements in a consistent format."
    },
    "whyItMatters": {
      "heading": "Why Organization Improves Shortlisting",
      "content": "A clear structure helps recruiters quickly understand your trajectory, impact, and suitability for the target role."
    },
    "stepByStep": [
      {
        "heading": "Step 1: Use reverse-chronological order",
        "content": "List your most recent role first, then move backward in time."
      },
      {
        "heading": "Step 2: Keep role headers consistent",
        "content": "Use a consistent format: Job Title | Company | Dates | Location."
      },
      {
        "heading": "Step 3: Start with one-line role scope",
        "content": "Briefly describe team size, domain, or operational scope before bullets."
      },
      {
        "heading": "Step 4: Add 4-6 impact bullets per role",
        "content": "Focus on outcomes, ownership, and metrics, not routine task repetition."
      },
      {
        "heading": "Step 5: Highlight progression",
        "content": "If promoted, show progression clearly to signal growth and trust."
      }
    ],
    "examples": {
      "heading": "Experience Entry Example",
      "content": "Senior Operations Executive | ABC Logistics | 2022-Present | Colombo\nLed regional fulfilment operations across 3 hubs.\n- Improved on-time delivery from 86% to 95% through route optimization.\n- Reduced return-processing time by 32% by redesigning QA checkpoints."
    },
    "commonMistakes": {
      "heading": "Common Mistakes",
      "content": "Listing tasks without outcomes, inconsistent date formats, too many bullets for older roles, and no evidence of progression."
    },
    "finalChecklist": [
      "Is experience listed in reverse chronology?",
      "Are headers consistent across roles?",
      "Does each role include measurable outcomes?",
      "Is progression visible?",
      "Is content relevant to target jobs?"
    ],
    "cta": "Need a high-impact experience section that recruiters can trust instantly? We can rewrite and structure it for better outcomes."
  },
  "si": {
    "slug": "work-experience-section-organize-karana-honda-kramaya",
    "title": "CV එකේ Work Experience කොටස හොඳින් සංවිධානය කරන ක්‍රමය",
    "seoTitle": "Work Experience Section Guide | CV Structure Tips",
    "metaDescription": "Experience section එක clear, impact-focused, සහ recruiter-friendly ලෙස සකස් කර shortlist chance වැඩි කරගන්න.",
    "intro": "CV එකේ වැදගත්ම කොටස work experience section එකයි. ඒක සංවිධානය කරන ආකාරය shortlist එක තීරණය කරයි.",
    "problemExplanation": "බොහෝ CV වල duties random order එකකින් ලියලා achievements පසුපසට දාලා තියෙනවා. ඒ නිසා recruiter කෙනාට fit එක තේරුම් ගන්න අමාරුයි.",
    "whatIsIt": {
      "heading": "Well-organized experience section එක කියන්නේ කුමක්ද?",
      "content": "Reverse-chronological order එකකින් role එක role එකට scope, key responsibilities, measurable achievements consistent format එකකින් දක්වන ව්‍යුහයකි."
    },
    "whyItMatters": {
      "heading": "මෙය shortlist එකට උදව් කරන්නේ කොහොමද?",
      "content": "Clear organization එකකින් recruiter කෙනාට ඔබේ growth, impact, role-fit එක ඉක්මනින්ම තේරුම් ගත හැක."
    },
    "stepByStep": [
      {
        "heading": "පියවර 1: Reverse-chronological order භාවිතා කරන්න",
        "content": "අලුත්ම role එක මුලින් දාලා පසුගිය අත්දැකීම් පසුව දක්වන්න."
      },
      {
        "heading": "පියවර 2: Role headers එකම format එකෙන් දාන්න",
        "content": "Job Title | Company | Dates | Location pattern එක සෑම entry එකකටම භාවිතා කරන්න."
      },
      {
        "heading": "පියවර 3: Role scope එක one line එකකින් දාන්න",
        "content": "Team size, domain, operational scope වැනි context එක කෙටියෙන් දෙන්න."
      },
      {
        "heading": "පියවර 4: 4-6 impact bullets එක්කරන්න",
        "content": "Routine duties repeat නොකර outcomes, ownership, metrics ඉස්මතු කරන්න."
      },
      {
        "heading": "පියවර 5: Progression පෙන්වන්න",
        "content": "Promotions හෝ scope growth පෙන්වා career trajectory එක පැහැදිලි කරන්න."
      }
    ],
    "examples": {
      "heading": "Experience entry උදාහරණයක්",
      "content": "Senior Operations Executive | ABC Logistics | 2022-Present | Colombo\nRegional fulfilment operations hubs 3ක් පාලනය කළා.\n- Route optimization හරහා on-time delivery 86% සිට 95% දක්වා වැඩි කළා.\n- QA checkpoints redesign කර return-processing time 32% කින් අඩු කළා."
    },
    "commonMistakes": {
      "heading": "සුලභ වැරදි",
      "content": "Outcomes නැති duty lists, inconsistent date formats, පරණ roles වලට අධික bullets, progression evidence නොදැමීම."
    },
    "finalChecklist": [
      "Experience reverse chronology එකෙන් දා තිබේද?",
      "Role headers consistent format එකකින්ද?",
      "Each role එකේ measurable outcomes තිබේද?",
      "Career progression පේනවද?",
      "Target jobs වලට අදාළ content එකක්ද?"
    ],
    "cta": "ඔබේ work experience section එක recruiter-friendly, high-impact format එකකට නැවත ගොඩනගාගැනීමට අපගේ සේවාව ලබාගන්න."
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
