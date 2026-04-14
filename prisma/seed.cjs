const { PrismaClient } = require("@prisma/client");
const { randomBytes, scryptSync } = require("node:crypto");

const prisma = new PrismaClient();

const posts = [
  {
    slug: "why-qualified-candidates-dont-get-interviews",
    title: "Why qualified candidates still get ignored in hiring",
    excerpt:
      "Understand why strong candidates still miss interviews when CVs and profiles are not aligned to modern hiring behavior.",
    content:
      "Most companies use ATS filters and recruiters scan quickly. Your profile must show clear value, relevant keywords, and measurable impact.",
    category: "Career Strategy",
    publishedAt: new Date("2025-10-24"),
  },
  {
    slug: "ats-friendly-cv-writing-method",
    title: "My 100% ATS-friendly CV writing method",
    excerpt:
      "A practical method for writing role-specific, recruiter-friendly CVs that pass ATS systems and improve shortlisting potential.",
    content:
      "A high-performing CV combines role clarity, strategic keyword use, achievement-based bullets, and readable structure.",
    category: "ATS CV Writing",
    publishedAt: new Date("2025-10-20"),
  },
  {
    slug: "linkedin-optimization-for-career-growth",
    title: "LinkedIn optimization for consistent career growth",
    excerpt:
      "Learn how profile SEO and strategic storytelling increase recruiter discovery and inbound opportunities.",
    content:
      "LinkedIn is a career search engine. With strong positioning and proof-based storytelling, your profile works for you daily.",
    category: "LinkedIn Optimization",
    publishedAt: new Date("2025-10-18"),
  },
];

const services = [
  {
    slug: "professional-cv-writing",
    title: "Professional CV Writing (100% ATS-Friendly)",
    summary: "Role-targeted CV writing built for ATS and recruiter readability.",
    content:
      "I turn generic job descriptions into achievement-focused profiles with clear value positioning.",
    priceFrom: null,
  },
  {
    slug: "linkedin-optimization",
    title: "LinkedIn Account Optimization",
    summary: "Profile SEO and branding for stronger recruiter visibility.",
    content:
      "I optimize headline, About, experience, and keyword strategy to improve profile performance.",
    priceFrom: null,
  },
  {
    slug: "career-coaching-roadmap",
    title: "Career Coaching & Roadmap Advice",
    summary: "Clear direction and practical next steps for career growth.",
    content:
      "I help professionals choose direction, close skill gaps, and build a realistic career execution plan.",
    priceFrom: null,
  },
];

const caseStudies = [
  {
    slug: "ats-cv-rewrite-case",
    title: "ATS CV Rewrite Case",
    category: "ATS CV Writing",
    year: 2024,
    summary:
      "Role-specific rewrite focused on ATS compatibility, measurable impact, and recruiter clarity.",
    content:
      "The final CV improved readability, keyword alignment, and career narrative strength.",
  },
  {
    slug: "linkedin-optimization-case",
    title: "LinkedIn Optimization Case",
    category: "LinkedIn Optimization",
    year: 2023,
    summary: "End-to-end profile positioning and keyword strategy for career visibility.",
    content:
      "The optimized profile delivered stronger professional clarity and recruiter discoverability.",
  },
];

const products = [
  { slug: "student-cv-package", name: "Student CV Package", category: "CV Writing", audience: "For school and university students", priceLkr: 3000, delivery: "2-5 days", features: JSON.stringify(["Professional CV and resume writing", "Basic ATS optimization", "Editable Word and PDF files", "1 revision included"]) },
  { slug: "starter-cv-package", name: "Starter CV Package", category: "CV Writing", audience: "Perfect for freshers and early-career professionals", priceLkr: 5000, delivery: "2-5 days", features: JSON.stringify(["Professional CV design and formatting", "ATS optimization (75%+)", "Editable Word and PDF files", "Role-targeted presentation guidance"]) },
  { slug: "professional-cv-package", name: "Professional CV Package", category: "CV Writing", audience: "For mid-level professionals and managers", priceLkr: 8000, delivery: "2-5 days", features: JSON.stringify(["Premium CV writing and design", "ATS score target: 80-90%", "Unlimited revisions within 3 days", "Free cover letter included"]) },
  { slug: "executive-cv-package", name: "Executive Package", category: "CV Writing", audience: "For senior leaders and executives", priceLkr: 12000, delivery: "2-5 days", features: JSON.stringify(["Tailored executive CV and resume", "High-impact design with 100% ATS compliance", "Free professional cover letter", "Free LinkedIn account optimization"]) },
  { slug: "student-cover-letter", name: "Student Cover Letter", category: "Cover Letter Writing", audience: "Best for school leavers, interns, and university students", priceLkr: 1500, delivery: "2-3 days", features: JSON.stringify(["Simple, professional cover letter", "Aligned with student and internship roles", "Focused on skills, strengths, and motivation", "Delivered in PDF and Word format"]) },
  { slug: "starter-cover-letter", name: "Starter Cover Letter", category: "Cover Letter Writing", audience: "For freshers and entry-level job seekers", priceLkr: 2000, delivery: "2-3 days", features: JSON.stringify(["Professionally written cover letter", "Simple and clear structure", "Aligned with your CV and target job", "Delivered in PDF and Word format"]) },
  { slug: "professional-cover-letter", name: "Professional Cover Letter", category: "Cover Letter Writing", audience: "Ideal for mid-level professionals", priceLkr: 3000, delivery: "2-3 days", features: JSON.stringify(["Fully tailored cover letter", "Achievement-focused content", "Industry-specific tone and ATS-friendly writing", "2 revisions included"]) },
  { slug: "executive-cover-letter", name: "Executive Cover Letter", category: "Cover Letter Writing", audience: "For managers, senior professionals, and executives", priceLkr: 5000, delivery: "2-3 days", features: JSON.stringify(["Leadership-focused, high-impact writing", "Strong strategic value proposition", "Customized to company and job description", "Unlimited revisions within 24 hours of delivery"]) },
  { slug: "student-linkedin-package", name: "Student LinkedIn Package", category: "LinkedIn Optimization", audience: "Best for students", priceLkr: 3000, delivery: "2-5 working days", features: JSON.stringify(["Full LinkedIn profile review with improvement suggestions", "Headline ideas for a stronger first impression", "About section guidance and pointers", "Skills and keyword recommendations"]) },
  { slug: "starter-linkedin-package", name: "Starter LinkedIn Package", category: "LinkedIn Optimization", audience: "Best for freshers and entry-level professionals", priceLkr: 5000, delivery: "2-5 working days", features: JSON.stringify(["Full LinkedIn profile analysis", "Headline rewrite suggestions", "About section enhancement plan", "Experience section structure tips"]) },
  { slug: "professional-linkedin-package", name: "Professional LinkedIn Package", category: "LinkedIn Optimization", audience: "For mid-level professionals", priceLkr: 8000, delivery: "2-5 working days", features: JSON.stringify(["Deep profile audit", "Headline, About, and Experience section improvements", "Industry-relevant keyword strategy", "Featured section suggestions"]) },
  { slug: "executive-linkedin-package", name: "Executive LinkedIn Package", category: "LinkedIn Optimization", audience: "Designed for senior leaders and executives", priceLkr: 12000, delivery: "2-5 working days", features: JSON.stringify(["Executive-level profile audit", "Personal branding strategy", "Leadership-focused headline and About section suggestions", "High-impact keyword strategy"]) },
  { slug: "student-cv-review-package", name: "Student CV Review Package", category: "CV Review", audience: "We tell you what to fix - you edit it", priceLkr: 1500, delivery: "2-3 days", features: JSON.stringify(["Full CV review", "Clear list of all improvements needed", "ATS keyword and formatting guidance", "Grammar, structure, and layout suggestions"]) },
  { slug: "starter-cv-review-package", name: "Starter CV Review Package", category: "CV Review", audience: "Perfect for freshers and early-career professionals", priceLkr: 2000, delivery: "2-3 days", features: JSON.stringify(["Section-by-section CV review", "ATS keyword alignment tips", "Content clarity suggestions", "Design and layout improvement ideas"]) },
  { slug: "professional-cv-review-package", name: "Professional CV Review Package", category: "CV Review", audience: "For mid-level professionals and specialists", priceLkr: 3000, delivery: "2-3 days", features: JSON.stringify(["Deep CV analysis", "ATS optimization recommendations", "Content improvement suggestions", "Layout and achievement enhancement tips"]) },
  { slug: "executive-cv-review-package", name: "Executive CV Review Package", category: "CV Review", audience: "For senior managers, directors, and C-level roles", priceLkr: 5000, delivery: "2-3 days", features: JSON.stringify(["Senior-level CV analysis", "Leadership-oriented improvement guidance", "Keyword strategy recommendations", "Layout and structure refinement suggestions"]) },
  { slug: "kotipathiyek-vime-vegawath-maga", name: "කෝටිපතියෙක් වීමේ වේගවත් මඟ", category: "Ebook", audience: "For aspiring entrepreneurs and wealth builders", priceLkr: 2500, delivery: "Instant Access", features: JSON.stringify(["Lifetime digital access", "60+ engaging chapters", "Read on any device", "Dynamic reading experience"]) },
];

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const author = await prisma.user.upsert({
    where: { email: "contact@chanuka.local" },
    update: { name: "Chanuka Jeewantha" },
    create: {
      name: "Chanuka Jeewantha",
      email: "contact@chanuka.local",
    },
  });

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        publishedAt: post.publishedAt,
        isPublished: true,
        authorId: author.id,
      },
      create: {
        ...post,
        isPublished: true,
        authorId: author.id,
      },
    });
  }

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  for (const study of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: study.slug },
      update: study,
      create: study,
    });
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@chanuka.local").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
  const adminName = process.env.ADMIN_NAME || "Chanuka Admin";

  await prisma.appUser.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      role: "admin",
    },
    create: {
      name: adminName,
      email: adminEmail,
      passwordHash: hashPassword(adminPassword),
      role: "admin",
    },
  });

  console.log("Seed completed. Admin user ready:", adminEmail);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
