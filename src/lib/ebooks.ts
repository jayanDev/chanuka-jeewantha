export type Ebook = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: "free" | "paid";
  /** "ebook" = traditional ebook; "resource" = guide/checklist/system. Defaults to "ebook". */
  kind?: "ebook" | "resource";
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
  {
    slug: "mudale-manowithyawa-psychology-of-money",
    title: "මුදලේ මනෝවිද්‍යාව",
    subtitle: "The Psychology of Money - සල්ලි ගැන අපි හිතන විදිහ",
    description:
      "Morgan Housel ගේ The Psychology of Money පොතේ සිංහල සාරාංශය. ධනය, අත්‍යාශය, සහ සතුට ගැන — සල්ලි ගැන අපේ හිතීමේ රටා සහ ඒවා ජීවිතයට බලපාන හැටි ගැන ප්‍රායෝගික මාර්ගෝපදේශයක්.",
    category: "paid",
    priceLkr: 500,
    readPriceLkr: 500,
    downloadPriceLkr: 1500,
    coverImage: "/images/The Psychology of Money.png",
    highlights: [
      "වාසනාව, අවදානම, සහ compounding — ධනය ගොඩනගන මූල තතු",
      "සැබෑ ධනය කියන්නේ අපිට නොපෙනෙන දේ — Saving, Freedom, සහ Contentment",
      "මිනිස් හැසිරීම, Tail Events, සහ Long-term ආයෝජන ක්‍රමය",
    ],
  },
  {
    slug: "linkedin-profile-optimization",
    title: "LinkedIn Profile Optimization System",
    subtitle: "Professional Profile එක Recruiter Magnet එකක් බවට හරවාගන්නා System",
    description:
      "LinkedIn Profile Optimization System — ඔබේ LinkedIn profile එක recruiter-ready profile එකක් බවට convert කිරීමට step-by-step guide. Photo සිට Headline, About, Experience, Skills, Recommendations, Featured Section, සහ Network Strategy දක්වා ඔක්කොම cover කරනවා.",
    category: "paid",
    kind: "resource",
    readPriceLkr: 500,
    downloadPriceLkr: 1500,
    coverImage: "/images/linkedin-optimization-30k-followers-proof.jpg",
    highlights: [
      "Recruiter-ready Profile Photo & Banner",
      "Keyword-optimised Headline & About Section",
      "Experience, Skills, Recommendations Strategy",
      "Featured Section & Content සමඟ visibility වැඩිකරගන්නේ කෙසේද",
    ],
  },
];

export const getEbookBySlug = (slug: string) => ebooks.find((ebook) => ebook.slug === slug);

export function getEbookReadPath(slug: string): string {
  return `/ebooks/${slug}/read`;
}

// ── Bundles ──────────────────────────────────────────────────────────────────

export type EbookBundle = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  ebookSlugs: string[];
  /** Discount percentage off total individual price */
  discountPercent: number;
  coverImage: string;
  highlights: string[];
};

export const ebookBundles: EbookBundle[] = [
  {
    slug: "business-starter-bundle",
    title: "Business Starter Bundle",
    subtitle: "ව්‍යාපාරය පටන් ගන්නා කෙනාට අත්‍යාවශ්‍ය ebooks 3ක් — 25% off",
    description:
      "ව්‍යාපාරයක් ආරම්භ කිරීමට සිතන ඕනෑම කෙනෙකුට වටිනා book 3ක bundle: ධනවත් වීමේ වේගවත් මාර්ගය, ගැඹුරු ඵලදායිතා ක්‍රමය, සහ ලෝකය හඳුනාගන්නා කුසලතා ගොඩනැගීම — books 3 package deal.",
    ebookSlugs: [
      "kotipathiyek-vime-vegawath-maga",
      "gaburu-karyaya",
      "sarthaka-wurthiya-jeewithayaka-neethi-saha-mooladharma",
    ],
    discountPercent: 25,
    coverImage: "/images/Business Starter Bundle Cover.png",
    highlights: [
      "ව්‍යාපාරික mindset, Deep Work productivity, සහ career capital — books 3ක",
      "Individual මිළෙන් 25% discount",
      "Books 3ම read + download access ලැබේ",
    ],
  },
  {
    slug: "complete-ebook-collection",
    title: "Complete Ebook Collection",
    subtitle: "ebooks 4ම — 50% off",
    description:
      "Chanuka Jeewantha ගේ ebooks 4ම එකවර ලබාගන්න. ධනය, productivity, career, සහ financial literacy — සම්පූර්ණ collection 50% discount.",
    ebookSlugs: [
      "kotipathiyek-vime-vegawath-maga",
      "gaburu-karyaya",
      "sarthaka-wurthiya-jeewithayaka-neethi-saha-mooladharma",
      "dhanavath-thaththa-saha-duppoth-thaththa",
    ],
    discountPercent: 50,
    coverImage: "/images/Complete Collection Bundle Cover.png",
    highlights: [
      "ebooks 4ම (Fastlane, Deep Work, So Good, Rich Dad Poor Dad)",
      "Individual මිළෙන් 50% discount",
      "සියලු books read + download access ලැබේ",
    ],
  },
];

export function getEbookBundleBySlug(slug: string): EbookBundle | undefined {
  return ebookBundles.find((b) => b.slug === slug);
}

/** Calculate bundle price: sum of individual download prices minus discount */
export function getBundlePrice(bundle: EbookBundle): {
  originalLkr: number;
  discountedLkr: number;
  savingsLkr: number;
} {
  const originalLkr = bundle.ebookSlugs.reduce((sum, slug) => {
    const ebook = ebooks.find((e) => e.slug === slug);
    return sum + (ebook?.downloadPriceLkr ?? 1500);
  }, 0);
  const discountedLkr = Math.round(originalLkr * (1 - bundle.discountPercent / 100));
  return { originalLkr, discountedLkr, savingsLkr: originalLkr - discountedLkr };
}
