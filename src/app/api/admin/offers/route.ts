import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import {
  createSeasonalOffer,
  deleteSeasonalOffer,
  listSeasonalOffers,
  updateSeasonalOffer,
  type OfferScope,
} from "@/lib/seasonal-offers";

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

function parseDateInput(value: unknown): number | null {
  if (typeof value !== "string") return null;
  const ms = Date.parse(value);
  if (!Number.isFinite(ms)) return null;
  return ms;
}

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const offers = await listSeasonalOffers();
  return NextResponse.json({ offers });
}

export async function POST(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    title?: unknown;
    discountPercent?: unknown;
    scope?: unknown;
    selectedServiceSlugs?: unknown;
    startAt?: unknown;
    endAt?: unknown;
    isActive?: unknown;
  };

  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (title.length < 3) {
    return NextResponse.json({ error: "Offer title is required" }, { status: 400 });
  }

  const discountPercent = Number(body.discountPercent);
  if (!Number.isFinite(discountPercent) || discountPercent < 1 || discountPercent > 90) {
    return NextResponse.json({ error: "Discount must be between 1 and 90" }, { status: 400 });
  }

  const scope: OfferScope = body.scope === "selected" ? "selected" : "all";
  const selectedServiceSlugs = Array.isArray(body.selectedServiceSlugs)
    ? body.selectedServiceSlugs.filter((item): item is string => typeof item === "string")
    : [];

  if (scope === "selected" && selectedServiceSlugs.length === 0) {
    return NextResponse.json({ error: "Select at least one service for selected-scope offers" }, { status: 400 });
  }

  const startAtMs = parseDateInput(body.startAt);
  const endAtMs = parseDateInput(body.endAt);
  if (!startAtMs || !endAtMs) {
    return NextResponse.json({ error: "Start and end dates are required" }, { status: 400 });
  }
  if (endAtMs <= startAtMs) {
    return NextResponse.json({ error: "End date must be after start date" }, { status: 400 });
  }

  const offer = await createSeasonalOffer({
    title,
    discountPercent,
    scope,
    selectedServiceSlugs,
    startAtMs,
    endAtMs,
    isActive: body.isActive !== false,
  });

  return NextResponse.json({ ok: true, offer });
}

export async function PATCH(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    id?: unknown;
    title?: unknown;
    discountPercent?: unknown;
    scope?: unknown;
    selectedServiceSlugs?: unknown;
    startAt?: unknown;
    endAt?: unknown;
    isActive?: unknown;
  };

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "Offer id is required" }, { status: 400 });

  const updates: {
    title?: string;
    discountPercent?: number;
    scope?: OfferScope;
    selectedServiceSlugs?: string[];
    startAtMs?: number;
    endAtMs?: number;
    isActive?: boolean;
  } = {};

  if (typeof body.title === "string") updates.title = body.title;
  if (body.discountPercent !== undefined) {
    const discount = Number(body.discountPercent);
    if (!Number.isFinite(discount) || discount < 1 || discount > 90) {
      return NextResponse.json({ error: "Discount must be between 1 and 90" }, { status: 400 });
    }
    updates.discountPercent = discount;
  }

  if (body.scope !== undefined) {
    updates.scope = body.scope === "selected" ? "selected" : "all";
  }

  if (body.selectedServiceSlugs !== undefined) {
    updates.selectedServiceSlugs = Array.isArray(body.selectedServiceSlugs)
      ? body.selectedServiceSlugs.filter((item): item is string => typeof item === "string")
      : [];
  }

  if (body.startAt !== undefined) {
    const startAtMs = parseDateInput(body.startAt);
    if (!startAtMs) return NextResponse.json({ error: "Invalid start date" }, { status: 400 });
    updates.startAtMs = startAtMs;
  }

  if (body.endAt !== undefined) {
    const endAtMs = parseDateInput(body.endAt);
    if (!endAtMs) return NextResponse.json({ error: "Invalid end date" }, { status: 400 });
    updates.endAtMs = endAtMs;
  }

  if (body.isActive !== undefined) {
    updates.isActive = Boolean(body.isActive);
  }

  const offer = await updateSeasonalOffer(id, updates);
  if (!offer) return NextResponse.json({ error: "Offer not found" }, { status: 404 });

  return NextResponse.json({ ok: true, offer });
}

export async function DELETE(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Offer id is required" }, { status: 400 });

  const deleted = await deleteSeasonalOffer(id);
  if (!deleted) return NextResponse.json({ error: "Offer not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
