import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type PublicReview = {
  id: string;
  name: string;
  message: string;
  rating: number;
  createdAt: Date;
  role?: string;
  outcome?: string;
};

const fallbackReviews: PublicReview[] = [
  {
    id: "fallback-kasun",
    name: "Kasun R.",
    role: "Operations Executive",
    outcome: "2x more interview callbacks",
    message: "My ATS score improved and I got interviews within two weeks.",
    rating: 5,
    createdAt: new Date("2025-11-05T09:00:00.000Z"),
  },
  {
    id: "fallback-sanduni",
    name: "Sanduni M.",
    role: "Marketing Specialist",
    outcome: "Weekly recruiter inquiries",
    message: "LinkedIn profile optimization gave me inbound recruiter messages.",
    rating: 5,
    createdAt: new Date("2025-10-18T09:00:00.000Z"),
  },
  {
    id: "fallback-dilan",
    name: "Dilan P.",
    role: "Software Engineer",
    outcome: "Shortlisted for overseas roles",
    message: "Clear strategy, fast delivery, and practical career guidance.",
    rating: 5,
    createdAt: new Date("2025-09-27T09:00:00.000Z"),
  },
];

async function loadPublicReviews(): Promise<PublicReview[]> {
  if (!process.env.DATABASE_URL) {
    return fallbackReviews;
  }

  try {
    const reviews = await prisma.serviceReview.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
      take: 24,
      select: {
        id: true,
        name: true,
        message: true,
        rating: true,
        createdAt: true,
      },
    });

    if (!reviews.length) {
      return fallbackReviews;
    }

    return reviews;
  } catch {
    return fallbackReviews;
  }
}

export const getCachedPublicReviews = unstable_cache(loadPublicReviews, ["public-reviews"], {
  revalidate: 3600,
  tags: ["public-reviews"],
});
