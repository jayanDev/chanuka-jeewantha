export type Ebook = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: "free" | "paid";
  /** Legacy: kept for backward compat. Use readPriceLkr/downloadPriceLkr for new UI. */
  priceLkr?: number;
  /** Price to read online */
  readPriceLkr?: number;
  /** Price to download the full ebook file */
  downloadPriceLkr?: number;
  coverImage: string;
  highlights: string[];
  sampleReadPath?: string;
  readPath?: string;
  /** Optional direct download URL shown to buyers (e.g. Vercel Blob URL or CDN path) */
  downloadUrl?: string;
};

export const ebooks: Ebook[] = [
  {
    slug: "kotipathiyek-vime-vegawath-maga",
    title: "කෝටිපතියෙක් වීමේ වේගවත් මග",
    subtitle: "Fastlane to Wealth - ධනවත් වීමේ කෙටිමග ගවේෂණය",
    description:
      "සාමාන්‍ය වේගයෙන් නොව, වේගවත් මාර්ගයක් ඔස්සේ ධනවත් වීම ගැන කියාදෙන ප්‍රායෝගික අදහස් සහ පරිච්ඡේද 60කට වඩා අඩංගු මාර්ගෝපදේශක ebook එකක්.",
    category: "paid",
    priceLkr: 500,
    readPriceLkr: 500,
    downloadPriceLkr: 1500,
    coverImage: "/images/Millionaire Fastlane Cover Image.png",
    highlights: [
      "කාලය සහ ධනය අතර සම්බන්ධය",
      "සාර්ථක ව්‍යාපාරයක් සහ බ්‍රෑන්ඩ් එකක් ගොඩනැගීම",
      "වේගවත් ධනය ගොඩනගන මානසිකත්වය",
    ],
  },
  {
    slug: "gaburu-karyaya",
    title: "ගැඹුරු කාර්යය",
    subtitle: "Deep Work - අවධානය, කුසලතා, සහ ප්‍රතිඵලවල ගැඹුර",
    description:
      "අවධානය කැඩී යන ලෝකයේ ගැඹුරු වැඩ පුරුද්දක් ලෙස ගොඩනගාගෙන, ඉක්මනින් ඉගෙනගෙන, උසස් මට්ටමේ ප්‍රතිඵල ලබාගැනීමට උපකාරී වන ප්‍රායෝගික නීති සහ ක්‍රමවල මාර්ගෝපදේශය.",
    category: "paid",
    priceLkr: 500,
    readPriceLkr: 500,
    downloadPriceLkr: 1500,
    coverImage: "/images/Deep Work Cover Image.png",
    highlights: [
      "Deep Work වටිනාකම, අඩුවීමේ හේතු, සහ ජීවිතමය අර්ථය",
      "Work Deeply, Embrace Boredom, Quit Social Media, Drain the Shallows යන නීති 4",
      "දිනපතා focus routine, execution system, සහ measurable productivity",
    ],
  },
  {
    slug: "sarthaka-wurthiya-jeewithayaka-neethi-saha-mooladharma",
    title: "සාර්ථක වෘත්තීය ජීවිතයක නීති සහ මූලධර්ම",
    subtitle: "So Good They Can't Ignore You - Career Capital සිට Mission දක්වා",
    description:
      "Passion myth එක පසෙකලා, දුර්ලභ කුසලතා ගොඩනගා, control සහ mission මත පදනම් වූ දිගුකාලීන වෘත්තීය සාර්ථකත්වයකට යාමට උපකාරී වන ප්‍රායෝගික ebook එකක්.",
    category: "paid",
    priceLkr: 500,
    readPriceLkr: 500,
    downloadPriceLkr: 1500,
    coverImage: "/images/So Good They Can't Ignore You Cover Image.png",
    highlights: [
      "Don't Follow Your Passion සිට Think Small, Act Big දක්වා නීති 4",
      "Career Capital, Control Traps, සහ Mission execution playbook",
      "වෘත්තීය වර්ධනය measurable goals සහ practical decisions සමඟ align කිරීම",
    ],
  },
  {
    slug: "dhanavath-thaththa-saha-duppoth-thaththa",
    title: "ධනවත් තාත්තා සහ දුප්පත් තාත්තා",
    subtitle: "Rich Dad Poor Dad - සල්ලි ගැන පාසලෙන් නොකියූ දේ",
    description:
      "රොබට් කියෝසාකිගේ Rich Dad Poor Dad පොතේ සිංහල සාරාංශය. වත්කම් සහ බැරකම් අතර වෙනස, Rat Race එකෙන් එළියට යන හැටි, සහ ධනවතුන්ගේ සිතීමේ රටාව ගැන ප්‍රායෝගික මාර්ගෝපදේශයක්.",
    category: "paid",
    priceLkr: 500,
    readPriceLkr: 500,
    downloadPriceLkr: 1500,
    coverImage: "/images/Rich Dad Poor Dad Cover Image.png",
    highlights: [
      "වත්කම් (Assets) සහ බැරකම් (Liabilities) අතර ඇති සැබෑ වෙනස",
      "Rat Race එකෙන් නිදහස් වී මූල්‍ය නිදහස ලබාගන්නා ක්‍රමය",
      "ධනවතුන් සල්ලි වලින් වැඩ ගන්නා විදිහ - Passive Income",
    ],
  },
];

export const getEbookBySlug = (slug: string) => ebooks.find((ebook) => ebook.slug === slug);

export function getEbookReadPath(slug: string): string {
  return `/ebooks/${slug}/read`;
}
