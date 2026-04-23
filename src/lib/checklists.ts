export type ChecklistItem = {
  id: string;
  text: string;
  detail?: string;
};

export type ChecklistStep = {
  id: number;
  title: string;
  description: string;
  items: ChecklistItem[];
  /** If true, visible without sign-in */
  free: boolean;
};

export type Checklist = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  highlights: string[];
  freeSteps: number;
  steps: ChecklistStep[];
};

export const checklists: Checklist[] = [
  {
    slug: "business-startup-fastlane",
    title: "Business Startup: Fastlane Method",
    subtitle: "8-step checklist to launch a scalable business from zero",
    description:
      "A practical, step-by-step checklist inspired by Millionaire Fastlane principles to help you plan, launch, and scale a real business — not just a 9-to-5 side hustle. Work through each step in order and tick off every item before moving on.",
    coverImage: "/images/checklist-business-startup-fastlane.jpg",
    freeSteps: 2,
    highlights: [
      "8 actionable steps from idea to first customers",
      "Based on MJ DeMarco's Fastlane CENTS framework",
      "Practical items you can act on today",
      "Covers legal, marketing, systems, and finance",
    ],
    steps: [
      {
        id: 1,
        title: "Validate Your Business Idea",
        description:
          "Before spending a single rupee, confirm people will actually pay for what you're building.",
        free: true,
        items: [
          {
            id: "1-1",
            text: "Identify a real problem people lose sleep over",
            detail:
              "Fastlane businesses solve urgent, painful problems — not nice-to-have ideas.",
          },
          {
            id: "1-2",
            text: "Check if people already pay to solve this problem",
            detail:
              "Google, Facebook groups, forums — look for competitors. Competition = demand.",
          },
          {
            id: "1-3",
            text: "Talk to at least 5 potential customers before building anything",
            detail:
              "Ask: 'How do you currently solve this?' — not 'Would you buy this?'",
          },
          {
            id: "1-4",
            text: "Score your idea against the CENTS framework",
            detail:
              "Control, Entry barriers, Need (demand), Time (passive income?), Scale (unlimited?)",
          },
          {
            id: "1-5",
            text: "Write a one-sentence problem-solution statement",
            detail:
              "Example: 'I help [target customer] solve [problem] by [your solution].'",
          },
          {
            id: "1-6",
            text: "Confirm there is a clear entry barrier you can build over time",
            detail:
              "If anyone can copy it overnight, it is not a Fastlane business.",
          },
        ],
      },
      {
        id: 2,
        title: "Build Your Business Foundation",
        description:
          "Set up the legal and operational backbone before you take your first customer.",
        free: true,
        items: [
          {
            id: "2-1",
            text: "Choose a business structure (Sole Proprietorship or Private Limited)",
            detail:
              "Private Limited gives protection and credibility for scaling. Sole Prop is faster to start.",
          },
          {
            id: "2-2",
            text: "Register your business name with the relevant authority",
            detail:
              "In Sri Lanka: Registrar of Companies for Pvt Ltd, local authority for sole prop.",
          },
          {
            id: "2-3",
            text: "Open a dedicated business bank account",
            detail:
              "Never mix personal and business money — this is non-negotiable for growth.",
          },
          {
            id: "2-4",
            text: "Set up a professional business email on your own domain",
            detail:
              "yourname@yourbusiness.com builds instant credibility. Avoid free Gmail for business.",
          },
          {
            id: "2-5",
            text: "Write out your core service or product in plain, specific language",
            detail:
              "'I do digital marketing' is not a product. 'I run Google Ads for e-commerce stores' is.",
          },
          {
            id: "2-6",
            text: "Define your income model: one-time, retainer, or product?",
            detail:
              "Retainer income is the fastest path to Fastlane — recurring, predictable revenue.",
          },
        ],
      },
      {
        id: 3,
        title: "Define Your Market and Positioning",
        description:
          "Know exactly who you serve and why they should choose you over everyone else.",
        free: false,
        items: [
          {
            id: "3-1",
            text: "Write a detailed profile of your ideal customer",
            detail:
              "Industry, company size, role, pain points, goals, and buying triggers.",
          },
          {
            id: "3-2",
            text: "Research 3–5 competitors and identify their gaps",
            detail:
              "What do their 1-star reviews say? That is your opportunity.",
          },
          {
            id: "3-3",
            text: "Define your Unique Value Proposition (UVP)",
            detail:
              "What do you do that no one else does — or does better, faster, or cheaper?",
          },
          {
            id: "3-4",
            text: "Set your pricing strategy before you launch",
            detail:
              "Never price based on cost. Price based on the value delivered to the customer.",
          },
          {
            id: "3-5",
            text: "Write a one-sentence positioning statement",
            detail:
              "Template: 'For [target], [your brand] is the [category] that [key benefit] unlike [competitor].'",
          },
          {
            id: "3-6",
            text: "Choose 1–2 primary marketing channels to dominate first",
            detail:
              "Do not spread thin. Pick where your ideal customer already spends time.",
          },
        ],
      },
      {
        id: 4,
        title: "Build Your Online Presence",
        description:
          "Your digital storefront needs to be credible before you start selling.",
        free: false,
        items: [
          {
            id: "4-1",
            text: "Build a simple 3-page website: Home, Service, Contact",
            detail:
              "You do not need 20 pages. Clear messaging, one CTA, and fast loading is enough.",
          },
          {
            id: "4-2",
            text: "Write benefit-led copy on your homepage headline",
            detail:
              "The headline answers: Who do you help? What problem? What result do they get?",
          },
          {
            id: "4-3",
            text: "Add at least 2 social proof elements (testimonial, result, case study)",
            detail:
              "Even a screenshot from a WhatsApp message works in the beginning.",
          },
          {
            id: "4-4",
            text: "Update or create your LinkedIn profile as a business owner",
            detail:
              "Your headline, about section, and featured section should all reflect your business.",
          },
          {
            id: "4-5",
            text: "Set up Google Business Profile (even for online services)",
            detail:
              "It helps local search and adds credibility with a verified business listing.",
          },
          {
            id: "4-6",
            text: "Set up Google Analytics on your website from day one",
            detail:
              "You cannot improve what you cannot measure. Know where your traffic comes from.",
          },
        ],
      },
      {
        id: 5,
        title: "Create Your First Offer",
        description:
          "Package your service so a prospect can say yes without needing to ask more questions.",
        free: false,
        items: [
          {
            id: "5-1",
            text: "Write a clear offer with a specific result and timeframe",
            detail:
              "Bad: 'Business consulting.' Good: 'Launch your first paying service in 30 days.'",
          },
          {
            id: "5-2",
            text: "Create 2–3 pricing tiers (Starter, Growth, Premium)",
            detail:
              "Tiers increase average deal size — people anchor to the middle option.",
          },
          {
            id: "5-3",
            text: "Build a simple onboarding process (even a Google Form is enough)",
            detail:
              "Know exactly what happens after someone pays. Confusion loses clients.",
          },
          {
            id: "5-4",
            text: "Prepare a basic service agreement or contract",
            detail:
              "A one-page agreement protects you and signals you are a professional.",
          },
          {
            id: "5-5",
            text: "Create a short sales page or PDF pitch deck",
            detail:
              "This is what you send when someone asks 'tell me more about what you do.'",
          },
          {
            id: "5-6",
            text: "Set up a payment method (bank transfer, card, or PayHere)",
            detail:
              "Remove every friction point from receiving money.",
          },
        ],
      },
      {
        id: 6,
        title: "Get Your First 3 Customers",
        description:
          "The hardest part is the first three — use warm outreach, not cold advertising.",
        free: false,
        items: [
          {
            id: "6-1",
            text: "List 20 people in your network who could benefit or refer",
            detail:
              "Past colleagues, clients, classmates, LinkedIn connections — start warm.",
          },
          {
            id: "6-2",
            text: "Send a direct, personal message — not a broadcast",
            detail:
              "Mention something specific about them. Generic copy gets ignored.",
          },
          {
            id: "6-3",
            text: "Join 3–5 online communities where your ideal client hangs out",
            detail:
              "Be helpful first. Answer questions before mentioning your service.",
          },
          {
            id: "6-4",
            text: "Post one valuable insight per week on LinkedIn or social media",
            detail:
              "Share what you know. Visibility precedes credibility.",
          },
          {
            id: "6-5",
            text: "Offer a time-limited launch deal to your first 3 clients",
            detail:
              "Not to give away work cheaply — but to build case studies fast.",
          },
          {
            id: "6-6",
            text: "Follow up at least twice with every prospect",
            detail:
              "80% of deals close after the 3rd contact. Most people give up after one.",
          },
        ],
      },
      {
        id: 7,
        title: "Build Systems for Repeatable Growth",
        description:
          "Stop doing everything manually — build systems that work without you.",
        free: false,
        items: [
          {
            id: "7-1",
            text: "Document your delivery process step by step in writing",
            detail:
              "If you cannot explain it in writing, you cannot delegate or automate it.",
          },
          {
            id: "7-2",
            text: "Set up a simple CRM (a Notion table or Google Sheet is enough)",
            detail:
              "Track every lead: name, status, follow-up date, deal value.",
          },
          {
            id: "7-3",
            text: "Automate your onboarding emails with a free tool (Brevo or Resend)",
            detail:
              "Every new client should automatically receive a welcome sequence.",
          },
          {
            id: "7-4",
            text: "Create templates for all repeatable tasks (proposals, reports, briefs)",
            detail:
              "Templates save 2–3 hours per client per week at scale.",
          },
          {
            id: "7-5",
            text: "Review your systems every month and fix the biggest time drain",
            detail:
              "Find the bottleneck that limits your capacity to take on more clients.",
          },
          {
            id: "7-6",
            text: "Identify one task you can delegate or outsource this month",
            detail:
              "Fastlane is about building a business that works for you — not becoming the business.",
          },
        ],
      },
      {
        id: 8,
        title: "Financial Fastlane Setup",
        description:
          "Manage money like an owner — track, reinvest, and build toward real wealth.",
        free: false,
        items: [
          {
            id: "8-1",
            text: "Set a clear monthly revenue target for months 1, 3, 6, and 12",
            detail:
              "Work backwards: target ÷ deal size = number of clients you need.",
          },
          {
            id: "8-2",
            text: "Track all income and expenses in a simple spreadsheet",
            detail:
              "You must know your profit margin. Revenue is vanity — profit is reality.",
          },
          {
            id: "8-3",
            text: "Open a separate savings account for taxes",
            detail:
              "Set aside 20–25% of every payment for tax obligations before you spend it.",
          },
          {
            id: "8-4",
            text: "Reinvest at least 30% of early profits into growth",
            detail:
              "Tools, training, paid traffic, or hiring — money that makes more money.",
          },
          {
            id: "8-5",
            text: "Understand your Customer Acquisition Cost vs. Lifetime Value",
            detail:
              "If LTV is more than 3x CAC, your business model is healthy and scalable.",
          },
          {
            id: "8-6",
            text: "Plan your exit or scale-up strategy from day one",
            detail:
              "Fastlane builders think about the endgame at the start: asset sale, passive income, or IPO.",
          },
        ],
      },
    ],
  },
];

export function getChecklistBySlug(slug: string): Checklist | undefined {
  return checklists.find((c) => c.slug === slug);
}
