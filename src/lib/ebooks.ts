export type Ebook = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: "free" | "paid";
  priceLkr?: number;
  coverImage: string;
  highlights: string[];
  sampleReadPath?: string;
  readPath?: string;
};

export const ebooks: Ebook[] = [
  {
    slug: "kotipathiyek-vime-vegawath-maga",
    title: "කෝටිපතියෙක් වීමේ වේගවත් මඟ",
    subtitle: "Fastlane to Wealth - ධනවත් වීමේ කෙටිමඟ ගවේෂණය කිරීම",
    description:
      "ජීවිතයේ සාමාන්‍ය වේගයෙන් ධනවත් වෙනවා වෙනුවට, වේගවත් මාර්ගයක් ඔස්සේ (Fastlane) ධනවත් වීම ගැන කියාදෙන අගනා පරිච්ඡේද 60කට වඩා අඩංගු අත්පොතකි.",
    category: "paid",
    priceLkr: 2500,
    coverImage: "/images/millionaire-fastlane-cover.jpg", 
    highlights: [
      "කාලය සහ ධනය අතර සම්බන්ධය",
      "සාර්ථක ව්‍යාපාරයක් සහ බ්‍රෑන්ඩ් එකක් ගොඩනැගීම",
      "වේගවත් ධනය: අධිවේගී මාර්ගයේ ගමන් කිරීම",
    ],
  },
  {
    slug: "gaburu-karyaya",
    title: "ගැඹුරු කාර්යය",
    subtitle: "Deep Work - අවධානය, කුසලතා, සහ ප්‍රතිඵලවල ගැඹුර",
    description:
      "අවධානය කැඩී යන ලෝකයේ ගැඹුරු වැඩ (Deep Work) පුරුද්දක් ලෙස ගොඩනගාගෙන, ඉක්මනින් ඉගෙනගෙන, උසස් මට්ටමේ ප්‍රතිඵල ලබාගැනීමට උපකාරී වන ප්‍රායෝගික නීති සහ ක්‍රමවල සවිස්තර මාර්ගෝපදේශය.",
    category: "paid",
    priceLkr: 2200,
    coverImage: "/images/Deep Work.jpg",
    highlights: [
      "Deep Work වටිනාකම, අඩුවීමේ හේතු, සහ ජීවිතමය අර්ථය",
      "Work Deeply, Embrace Boredom, Quit Social Media, Drain the Shallows නීති 4",
      "දිනපතා focus routine, execution system, සහ measurable productivity",
    ],
  },
  {
    slug: "sarthaka-wurthiya-jeewithayaka-neethi-saha-mooladharma",
    title: "සාර්ථක වෘත්තීය ජීවිතයක නීති සහ මූලධර්ම",
    subtitle: "So Good They Can’t Ignore You - Career Capital සිට Mission දක්වා",
    description:
      "Passion myth එක පසෙකලා, දුර්ලභ කුසලතා (Career Capital) ගොඩනගා, control සහ mission මත පදනම් වූ දිගුකාලීන සාර්ථක වෘත්තීය ගමනක් සැලසුම් කර ක්‍රියාත්මක කිරීමට නිවැරදි මූලධර්ම සපයන පොත.",
    category: "paid",
    priceLkr: 2200,
    coverImage: "/images/So Good They Can't Ignore You.jpg",
    highlights: [
      "Don’t Follow Your Passion සිට Think Small, Act Big දක්වා නීති 4",
      "Career Capital, Control Traps, සහ Mission execution playbook",
      "වෘත්තීය වර්ධනය measurable goals සහ practical decisions සමඟ align කිරීම",
    ],
  },
];

export const getEbookBySlug = (slug: string) => ebooks.find((ebook) => ebook.slug === slug);

export function getEbookReadPath(slug: string): string {
  return `/ebooks/${slug}/read`;
}
