import { NextResponse } from "next/server";
import { getEffectiveSeasonalOffer, getOfferPreviewIdFromRequest } from "@/lib/seasonal-offers";

export async function GET(request: Request) {
  try {
    const offer = await getEffectiveSeasonalOffer(request);
    const previewOfferId = getOfferPreviewIdFromRequest(request);
    if (!offer) {
      return NextResponse.json({ offer: null });
    }

    return NextResponse.json({
      offer: {
        ...offer,
        isPreview: Boolean(previewOfferId && previewOfferId === offer.id),
        startAt: new Date(offer.startAtMs).toISOString(),
        endAt: new Date(offer.endAtMs).toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ offer: null });
  }
}
