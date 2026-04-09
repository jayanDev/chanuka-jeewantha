import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getOfferById } from "@/lib/seasonal-offers";

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as { offerId?: unknown };
  const offerId = typeof body.offerId === "string" ? body.offerId : "";
  if (!offerId) return NextResponse.json({ error: "Offer id is required" }, { status: 400 });

  const offer = await getOfferById(offerId);
  if (!offer) return NextResponse.json({ error: "Offer not found" }, { status: 404 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "offer_preview_id",
    value: offerId,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

export async function DELETE(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "offer_preview_id",
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });

  return response;
}
