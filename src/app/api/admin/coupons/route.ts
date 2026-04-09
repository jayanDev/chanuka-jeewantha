import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import { createCoupon, deleteCoupon, listCoupons, updateCoupon, type CouponScope } from "@/lib/coupons";

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

  const coupons = await listCoupons();
  return NextResponse.json({ coupons });
}

export async function POST(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    code?: unknown;
    title?: unknown;
    discountPercent?: unknown;
    scope?: unknown;
    selectedServiceSlugs?: unknown;
    selectedCategories?: unknown;
    minOrderLkr?: unknown;
    maxTotalUses?: unknown;
    maxUsesPerUser?: unknown;
    isActive?: unknown;
    isDraft?: unknown;
    startAt?: unknown;
    endAt?: unknown;
  };

  const code = typeof body.code === "string" ? body.code.trim() : "";
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!code) return NextResponse.json({ error: "Coupon code is required" }, { status: 400 });
  if (title.length < 3) return NextResponse.json({ error: "Coupon title is required" }, { status: 400 });

  const discountPercent = Number(body.discountPercent);
  if (!Number.isFinite(discountPercent) || discountPercent < 1 || discountPercent > 90) {
    return NextResponse.json({ error: "Discount must be between 1 and 90" }, { status: 400 });
  }

  const scope: CouponScope = body.scope === "selected" ? "selected" : body.scope === "category" ? "category" : "all";
  const selectedServiceSlugs = Array.isArray(body.selectedServiceSlugs)
    ? body.selectedServiceSlugs.filter((item): item is string => typeof item === "string")
    : [];
  const selectedCategories = Array.isArray(body.selectedCategories)
    ? body.selectedCategories.filter((item): item is string => typeof item === "string")
    : [];

  if (scope === "selected" && selectedServiceSlugs.length === 0) {
    return NextResponse.json({ error: "Select at least one service for selected-scope coupons" }, { status: 400 });
  }

  if (scope === "category" && selectedCategories.length === 0) {
    return NextResponse.json({ error: "Select at least one category for category-scope coupons" }, { status: 400 });
  }

  const startAtMs = parseDateInput(body.startAt);
  const endAtMs = parseDateInput(body.endAt);
  if (!startAtMs || !endAtMs) {
    return NextResponse.json({ error: "Start and end dates are required" }, { status: 400 });
  }
  if (endAtMs <= startAtMs) {
    return NextResponse.json({ error: "End date must be after start date" }, { status: 400 });
  }

  const coupon = await createCoupon({
    code,
    title,
    discountPercent,
    scope,
    selectedServiceSlugs,
    selectedCategories,
    minOrderLkr: Number(body.minOrderLkr ?? 0),
    maxTotalUses: Number(body.maxTotalUses ?? 100),
    maxUsesPerUser: Number(body.maxUsesPerUser ?? 1),
    isActive: body.isActive !== false,
    isDraft: body.isDraft === true,
    startAtMs,
    endAtMs,
  });

  return NextResponse.json({ ok: true, coupon });
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
    selectedCategories?: unknown;
    minOrderLkr?: unknown;
    maxTotalUses?: unknown;
    maxUsesPerUser?: unknown;
    isActive?: unknown;
    isDraft?: unknown;
    startAt?: unknown;
    endAt?: unknown;
  };

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "Coupon id is required" }, { status: 400 });

  const updates: Parameters<typeof updateCoupon>[1] = {};
  if (typeof body.title === "string") updates.title = body.title;
  if (body.discountPercent !== undefined) updates.discountPercent = Number(body.discountPercent);
  if (body.scope !== undefined) updates.scope = body.scope === "selected" ? "selected" : body.scope === "category" ? "category" : "all";
  if (body.selectedServiceSlugs !== undefined) {
    updates.selectedServiceSlugs = Array.isArray(body.selectedServiceSlugs)
      ? body.selectedServiceSlugs.filter((item): item is string => typeof item === "string")
      : [];
  }
  if (body.selectedCategories !== undefined) {
    updates.selectedCategories = Array.isArray(body.selectedCategories)
      ? body.selectedCategories.filter((item): item is string => typeof item === "string")
      : [];
  }
  if (body.minOrderLkr !== undefined) updates.minOrderLkr = Number(body.minOrderLkr);
  if (body.maxTotalUses !== undefined) updates.maxTotalUses = Number(body.maxTotalUses);
  if (body.maxUsesPerUser !== undefined) updates.maxUsesPerUser = Number(body.maxUsesPerUser);
  if (body.isActive !== undefined) updates.isActive = Boolean(body.isActive);
  if (body.isDraft !== undefined) updates.isDraft = Boolean(body.isDraft);
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

  const coupon = await updateCoupon(id, updates);
  if (!coupon) return NextResponse.json({ error: "Coupon not found" }, { status: 404 });

  return NextResponse.json({ ok: true, coupon });
}

export async function DELETE(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Coupon id is required" }, { status: 400 });

  const deleted = await deleteCoupon(id);
  if (!deleted) return NextResponse.json({ error: "Coupon not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
