import { NextResponse } from "next/server";
import { getOfferStatus, listSeasonalOffers } from "@/lib/seasonal-offers";

export async function GET() {
  try {
    const now = Date.now();
    const offers = await listSeasonalOffers();

    const publicOffers = offers
      .filter((offer) => !offer.isDraft)
      .map((offer) => ({
        id: offer.id,
        title: offer.title,
        discountPercent: offer.discountPercent,
        scope: offer.scope,
        selectedServiceSlugs: offer.selectedServiceSlugs,
        selectedCategories: offer.selectedCategories,
        startAtMs: offer.startAtMs,
        endAtMs: offer.endAtMs,
        startAt: new Date(offer.startAtMs).toISOString(),
        endAt: new Date(offer.endAtMs).toISOString(),
        status: getOfferStatus(offer, now),
      }))
      .sort((a, b) => {
        const statusRank = (status: string) => {
          if (status === "active") return 0;
          if (status === "scheduled") return 1;
          if (status === "inactive") return 2;
          return 3;
        };

        const rankDiff = statusRank(a.status) - statusRank(b.status);
        if (rankDiff !== 0) return rankDiff;
        if (a.status === "scheduled") return a.startAtMs - b.startAtMs;
        return b.discountPercent - a.discountPercent;
      });

    return NextResponse.json({ offers: publicOffers });
  } catch {
    return NextResponse.json({ error: "Failed to load offers" }, { status: 500 });
  }
}
