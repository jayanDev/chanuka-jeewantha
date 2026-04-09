import { NextResponse } from "next/server";
import { getActiveSeasonalOffer } from "@/lib/seasonal-offers";

export async function GET() {
  try {
    const offer = await getActiveSeasonalOffer();
    if (!offer) {
      return NextResponse.json({ offer: null });
    }

    return NextResponse.json({
      offer: {
        ...offer,
        startAt: new Date(offer.startAtMs).toISOString(),
        endAt: new Date(offer.endAtMs).toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ offer: null });
  }
}
