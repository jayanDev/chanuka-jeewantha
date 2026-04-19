const fs = require('fs');

const topicsEn = [
  { slug: 'the-complete-guide-to-cv-writing-services', title: 'The Complete Guide to CV Writing Services' },
  { slug: 'why-professional-cv-writing-matters', title: 'Why Professional CV Writing Matters More Than Ever' },
  { slug: 'how-cv-writing-service-can-improve-job-search', title: 'How a CV Writing Service Can Improve Your Job Search' },
  { slug: 'best-practices-for-writing-a-cv-in-sri-lanka', title: 'Best Practices for Writing a CV in Sri Lanka' },
  { slug: 'how-to-write-an-international-standard-cv', title: 'How to Write an International Standard CV' },
  { slug: 'what-to-include-in-a-cv-local-overseas', title: 'What to Include in a CV for Local and Overseas Jobs' },
  { slug: 'how-to-make-your-cv-look-professional', title: 'How to Make Your CV Look Professional' },
  { slug: 'how-often-should-you-update-your-cv', title: 'How Often Should You Update Your CV' },
  { slug: 'how-to-write-a-cv-for-career-growth', title: 'How to Write a CV for Career Growth' },
  { slug: 'how-to-present-your-skills-clearly-in-a-cv', title: 'How to Present Your Skills Clearly in a CV' },
  { slug: 'how-to-describe-achievements-in-a-cv', title: 'How to Describe Achievements in a CV' },
  { slug: 'how-to-write-a-job-winning-cv-profile', title: 'How to Write a Job-Winning CV Profile' },
  { slug: 'how-to-make-your-cv-more-attractive-to-employers', title: 'How to Make Your CV More Attractive to Employers' },
  { slug: 'common-cv-problems-and-how-to-fix-them', title: 'Common CV Problems and How to Fix Them' },
  { slug: 'how-long-should-a-cv-be', title: 'How Long Should a CV Be' },
  { slug: 'what-is-the-best-layout-for-a-professional-cv', title: 'What Is the Best Layout for a Professional CV' },
  { slug: 'how-to-format-a-cv-for-maximum-readability', title: 'How to Format a CV for Maximum Readability' },
  { slug: 'why-your-cv-is-not-getting-interview-calls', title: 'Why Your CV Is Not Getting Interview Calls' },
  { slug: 'how-to-write-a-cv-for-competitive-jobs', title: 'How to Write a CV for Competitive Jobs' },
  { slug: 'the-best-way-to-organize-work-experience-in-a-cv', title: 'The Best Way to Organize Work Experience in a CV' },
  { slug: 'how-to-write-a-cv-for-multiple-job-roles', title: 'How to Write a CV for Multiple Job Roles' },
  { slug: 'cv-writing-tips-for-mid-career-professionals', title: 'CV Writing Tips for Mid-Career Professionals' },
  { slug: 'cv-writing-tips-for-senior-professionals', title: 'CV Writing Tips for Senior Professionals' },
  { slug: 'how-to-write-a-cv-after-a-career-break', title: 'How to Write a CV After a Career Break' },
  { slug: 'how-to-write-a-cv-when-changing-careers', title: 'How to Write a CV When Changing Careers' }
];

const topicsSi = [
  { slug: 'the-complete-guide-to-cv-writing-services-sinhala', title: 'CV සේවා පිළිබඳ සම්පූර්ණ මාර්ගෝපදේශය (CV Writing Services)' },
  { slug: 'why-professional-cv-writing-matters-sinhala', title: 'වෘත්තීය මට්ටමේ (Professional) CV එකක් ලිවීම වෙනදාටත් වඩා වැදගත් ඇයි?' },
  { slug: 'how-cv-writing-service-can-improve-job-search-sinhala', title: 'CV ලියන සේවාවකින් (CV Writing Service) ඔබේ රැකියා සෙවීම දියුණු කරන්නේ කෙසේද?' },
  { slug: 'best-practices-for-writing-a-cv-in-sri-lanka-sinhala', title: 'ශ්‍රී ලංකාවේ රැකියා සඳහා CV එකක් ලිවීමේ හොඳම පිළිවෙත්' },
  { slug: 'how-to-write-an-international-standard-cv-sinhala', title: 'ජාත්‍යන්තර ප්‍රමිතියට (International Standard) අනුව CV එකක් ලියන්නේ ගොහොමද?' },
  { slug: 'what-to-include-in-a-cv-local-overseas-sinhala', title: 'දේශීය සහ විදේශීය රැකියා සඳහා CV එකකට ඇතුළත් කළ යුතු දේවල්' },
  { slug: 'how-to-make-your-cv-look-professional-sinhala', title: 'ඔබේ CV එක වඩාත් වෘත්තීය (Professional) පෙනුමකින් යුක්ත කරන්නේ කෙසේද' },
  { slug: 'how-often-should-you-update-your-cv-sinhala', title: 'ඔබේ CV එක කොපමණ වාර ගණනක් Update (යාවත්කාලීන) කළ යුතුද?' },
  { slug: 'how-to-write-a-cv-for-career-growth-sinhala', title: 'වෘත්තීය දියුණුව (Career Growth) ඉලක්ක කරගෙන CV එකක් ලියන්නේ කෙසේද' },
  { slug: 'how-to-present-your-skills-clearly-in-a-cv-sinhala', title: 'CV එකක ඔබේ කුසලතා (Skills) පැහැදිලිව ඉදිරිපත් කරන්නේ කෙසේද' },
  { slug: 'how-to-describe-achievements-in-a-cv-sinhala', title: 'CV එකක ජයග්‍රහණ (Achievements) විස්තර කරන්නේ කෙසේද' },
  { slug: 'how-to-write-a-job-winning-cv-profile-sinhala', title: 'රැකියාවක් ලබා දෙන සාර්ථක CV Profile එකක් ලියන ආකාරය' },
  { slug: 'how-to-make-your-cv-more-attractive-to-employers-sinhala', title: 'සේවායෝජකයින්ට ඔබේ CV එක වඩාත් ආකර්ෂණීය (Attractive) කරන්නේ කෙසේද' },
  { slug: 'common-cv-problems-and-how-to-fix-them-sinhala', title: 'සාමාන්‍ය CV ගැටලු සහ ඒවා විසඳන ආකාරය' },
  { slug: 'how-long-should-a-cv-be-sinhala', title: 'CV එකක් කොතරම් දිගු (Long) විය යුතුද?' },
  { slug: 'what-is-the-best-layout-for-a-professional-cv-sinhala', title: 'වෘත්තීය CV එකක් සඳහා හොඳම පිරිසැලසුම (Layout) කුමක්ද?' },
  { slug: 'how-to-format-a-cv-for-maximum-readability-sinhala', title: 'උපරිම කියවීමේ හැකියාවක් (Readability) සඳහා CV එකක් ආකෘතිගත කරන්නේ කෙසේද' },
  { slug: 'why-your-cv-is-not-getting-interview-calls-sinhala', title: 'ඔබගේ CV එක සඳහා සම්මුඛ පරීක්ෂණ (Interviews) නොලැබෙන්නේ ඇයි?' },
  { slug: 'how-to-write-a-cv-for-competitive-jobs-sinhala', title: 'තරඟකාරී රැකියා සඳහා CV එකක් ලියන්නේ කෙසේද?' },
  { slug: 'the-best-way-to-organize-work-experience-in-a-cv-sinhala', title: 'CV එකක අත්දැකීම් (Work Experience) පෙළගස්වන හොඳම ආකාරය කුමක්ද?' },
  { slug: 'how-to-write-a-cv-for-multiple-job-roles-sinhala', title: 'රැකියා භූමිකාවන් (Job Roles) කිහිපයක් සඳහා එකම CV එකක් ලියන ආකාරය' },
  { slug: 'cv-writing-tips-for-mid-career-professionals-sinhala', title: 'මධ්‍යම මට්ටමේ කාර්යමණ්ඩල (Mid-Career) සඳහා CV ලිවීමේ උපදෙස්' },
  { slug: 'cv-writing-tips-for-senior-professionals-sinhala', title: 'පළපුරුදු ජ්‍යෙෂ්ඨ වෘත්තිකයින් (Senior Professionals) සඳහා CV ලිවීමේ උපදෙස්' },
  { slug: 'how-to-write-a-cv-after-a-career-break-sinhala', title: 'වෘත්තීය විරාමයකින් (Career Break) පසු CV එකක් ලියන්නේ කෙසේද' },
  { slug: 'how-to-write-a-cv-when-changing-careers-sinhala', title: 'වෙනත් රැකියා ක්ෂේත්‍රයකට මාරු වන විට (Changing Careers) CV එකක් ලියන ආකාරය' }
];

function generateContent(items, isSinhala) {
  let content = '';
  items.forEach(item => {
    content += '  {\n';
    content += '    slug: "' + item.slug + '",\n';
    content += '    title: "' + item.title + '",\n';
    content += '    excerpt: "' + (isSinhala ? item.title + ' පිළිබඳව පූර්ණ විස්තරයක් මෙතැනින්.' : 'Learn more about ' + item.title + ' in this comprehensive guide tailored for 2026.') + '",\n';
    content += '    content: "' + (isSinhala ? 'මෙම ලිපිය මඟින් ' + item.title + ' පිළිබඳව ගැඹුරින් සාකච්ඡා කෙරේ. රැකියා අපේක්ෂකයින්ට මෙය අතිශය වැදගත් වේ.' : 'This article delves deeply into ' + item.title + '. Understanding this is critical for modern job seekers adjusting to the 2026 hiring landscape.') + '",\n';
    content += '    category: "Career Advice",\n';
    content += '    publishedAt: "2026-04-19",\n';
    content += '    author: "Chanuka Jeewantha",\n';
    content += '    keywords: ["' + item.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').slice(0,4).join(' ') + '"],\n';
    content += '  },\n';
  });
  return content;
}

const enContent = generateContent(topicsEn, false);
const siContent = generateContent(topicsSi, true);

let enFile = fs.readFileSync('src/content/blog-cv-series-en.ts', 'utf8');
let siFile = fs.readFileSync('src/content/blog-cv-series-si.ts', 'utf8');

enFile = enFile.replace('];', enContent + '];');
siFile = siFile.replace('];', siContent + '];');

fs.writeFileSync('src/content/blog-cv-series-en.ts', enFile);
fs.writeFileSync('src/content/blog-cv-series-si.ts', siFile);
console.log('Appended 25 articles successfully.');
