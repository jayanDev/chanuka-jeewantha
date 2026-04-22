export type DigitalProductType = "Ebook" | "Planner";

export type DigitalProduct = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  productType: DigitalProductType;
  category: "free" | "paid";
  priceLkr?: number;
  readPriceLkr?: number;
  downloadPriceLkr?: number;
  coverImage: string;
  highlights: string[];
  readPath?: string;
};

export const digitalProducts: DigitalProduct[] = [
  {
    slug: "kotipathiyek-vime-vegawath-maga",
    title: "කෝටිපතියෙක් වීමේ වේගවත් මග",
    subtitle: "Fastlane to Wealth - ධනවත් වීමේ කෙටිමග ගවේෂණය",
    description:
      "සාමාන්‍ය වේගයෙන් නොව, වේගවත් මාර්ගයක් ඔස්සේ ධනවත් වීම ගැන කියාදෙන ප්‍රායෝගික අදහස් සහ පරිච්ඡේද 60කට වඩා අඩංගු මාර්ගෝපදේශක ebook එකක්.",
    productType: "Ebook",
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
    productType: "Ebook",
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
    productType: "Ebook",
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
];

export const getDigitalProductBySlug = (slug: string) =>
  digitalProducts.find((p) => p.slug === slug);
