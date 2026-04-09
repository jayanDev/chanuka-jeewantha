export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  author: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-qualified-candidates-dont-get-interviews",
    title: "Why qualified candidates still get ignored in hiring",
    excerpt:
      "Understand how ATS filtering, recruiter scan behavior, and weak positioning can block qualified candidates.",
    content:
      "Today, being qualified is not enough. Your CV and LinkedIn profile must communicate value in seconds, with role-aligned keywords, clear outcomes, and proof.",
    category: "Career Strategy",
    publishedAt: "2025-10-24",
    author: "Chanuka Jeewantha",
  },
  {
    slug: "ats-friendly-cv-writing-method",
    title: "My 100% ATS-friendly CV writing method",
    excerpt:
      "How I build CVs that pass ATS systems and quickly convince recruiters through achievement-based writing.",
    content:
      "A high-performing CV combines clean ATS structure, role-targeted keyword strategy, and measurable accomplishments. It is a marketing document designed to win interviews.",
    category: "ATS CV Writing",
    publishedAt: "2025-10-20",
    author: "Chanuka Jeewantha",
  },
  {
    slug: "linkedin-optimization-for-career-growth",
    title: "LinkedIn optimization for consistent career growth",
    excerpt:
      "Learn how profile SEO, headline positioning, and achievement-focused storytelling increase recruiter reach.",
    content:
      "LinkedIn works like a search engine. When your profile is optimized for relevant keywords and clear value communication, opportunities come to you more consistently.",
    category: "LinkedIn Optimization",
    publishedAt: "2025-10-18",
    author: "Chanuka Jeewantha",
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
