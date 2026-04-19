import { caseStudies } from "@/lib/case-studies";
import type { PublicReview } from "@/lib/reviews";

export type ResultsHubItem = {
  id: string;
  kind: "Case Study" | "Testimonial";
  title: string;
  summary: string;
  href: string;
  focusAreas: string[];
  audience: string;
  yearLabel: string;
  proofLabel: string;
};

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function inferFocusAreasFromText(text: string) {
  const source = text.toLowerCase();
  const focusAreas: string[] = [];

  if (source.includes("linkedin") || source.includes("headline") || source.includes("profile")) {
    focusAreas.push("LinkedIn");
  }
  if (source.includes("ats") || source.includes("cv") || source.includes("resume") || source.includes("shortlist")) {
    focusAreas.push("ATS CV");
  }
  if (source.includes("interview") || source.includes("story")) {
    focusAreas.push("Interview Prep");
  }
  if (source.includes("portfolio") || source.includes("website") || source.includes("brand")) {
    focusAreas.push("Digital Presence");
  }
  if (source.includes("coach") || source.includes("strategy") || source.includes("roadmap")) {
    focusAreas.push("Career Strategy");
  }

  return unique(focusAreas.length > 0 ? focusAreas : ["Career Strategy"]);
}

function getCaseStudyAudience(clientProfile: string) {
  if (clientProfile.toLowerCase().includes("graduate")) return "Fresh Graduates";
  if (clientProfile.toLowerCase().includes("career switcher")) return "Career Switchers";
  if (clientProfile.toLowerCase().includes("mid-level")) return "Mid-Level Professionals";
  return "Professionals";
}

export function buildResultsHubItems(reviews: PublicReview[]): ResultsHubItem[] {
  const caseStudyItems: ResultsHubItem[] = caseStudies.map((study) => ({
    id: `case-study-${study.slug}`,
    kind: "Case Study",
    title: study.title,
    summary: study.summary,
    href: `/case-studies/${study.slug}`,
    focusAreas: inferFocusAreasFromText(`${study.category} ${study.summary} ${study.proofPoints.join(" ")}`),
    audience: getCaseStudyAudience(study.clientProfile),
    yearLabel: String(study.year),
    proofLabel: study.proofPoints[0] ?? study.category,
  }));

  const testimonialItems: ResultsHubItem[] = reviews.map((review) => {
    const role = review.role?.trim() || "Client";
    const outcome = review.outcome?.trim() || "Client result";
    const text = `${role} ${outcome} ${review.message}`;

    return {
      id: `testimonial-${review.id}`,
      kind: "Testimonial",
      title: `${review.name} - ${role}`,
      summary: review.message,
      href: "/testimonials",
      focusAreas: inferFocusAreasFromText(text),
      audience: role,
      yearLabel: new Date(review.createdAt).getFullYear().toString(),
      proofLabel: outcome,
    };
  });

  return [...caseStudyItems, ...testimonialItems].sort((a, b) => b.yearLabel.localeCompare(a.yearLabel));
}

export function getResultsHubFocusAreas(items: ResultsHubItem[]) {
  return unique(items.flatMap((item) => item.focusAreas)).sort();
}
