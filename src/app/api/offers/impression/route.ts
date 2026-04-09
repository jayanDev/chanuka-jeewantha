import { NextResponse } from "next/server";
import { incrementOfferAnalytics } from "@/lib/seasonal-offers";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { offerId?: unknown };
    const offerId = typeof body.offerId === "string" ? body.offerId : "";
    if (!offerId) return NextResponse.json({ ok: true });

    await incrementOfferAnalytics(offerId, "impressionCount");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
