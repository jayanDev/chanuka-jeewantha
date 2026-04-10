import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { isTrustedOrigin } from "@/lib/security";
import { profileUpdateSchema } from "@/lib/validation";

const USERS_COLLECTION = "app_users";

function normalizeLinkedinUrl(raw: string): string | null {
  if (!raw) return null;

  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.toLowerCase();
    if (!host.includes("linkedin.com")) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const user = await getRequestUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getFirebaseDb();
    const snapshot = await db.collection(USERS_COLLECTION).doc(user.id).get();
    const data = snapshot.data() as {
      name?: unknown;
      whatsappNumber?: unknown;
      linkedinUrl?: unknown;
      timezone?: unknown;
      receiveOfferAlerts?: unknown;
      receiveOrderAlerts?: unknown;
    } | undefined;

    return NextResponse.json({
      profile: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: typeof data?.name === "string" ? data.name : user.name,
        whatsappNumber: typeof data?.whatsappNumber === "string" ? data.whatsappNumber : "",
        linkedinUrl: typeof data?.linkedinUrl === "string" ? data.linkedinUrl : "",
        timezone: typeof data?.timezone === "string" ? data.timezone : "Asia/Colombo",
        receiveOfferAlerts: data?.receiveOfferAlerts !== false,
        receiveOrderAlerts: data?.receiveOrderAlerts !== false,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const user = await getRequestUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = profileUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const normalizedWhatsApp = (parsed.data.whatsappNumber ?? "").replace(/\D/g, "");
    if (normalizedWhatsApp && !/^\d{10,15}$/.test(normalizedWhatsApp)) {
      return NextResponse.json({ error: "Enter a valid WhatsApp number (10-15 digits)" }, { status: 400 });
    }

    const linkedinRaw = (parsed.data.linkedinUrl ?? "").trim();
    const normalizedLinkedinUrl = linkedinRaw ? normalizeLinkedinUrl(linkedinRaw) : "";
    if (linkedinRaw && !normalizedLinkedinUrl) {
      return NextResponse.json({ error: "Enter a valid LinkedIn profile URL" }, { status: 400 });
    }

    const profile = {
      name: parsed.data.name.trim(),
      whatsappNumber: normalizedWhatsApp,
      linkedinUrl: normalizedLinkedinUrl,
      timezone: (parsed.data.timezone ?? "Asia/Colombo").trim() || "Asia/Colombo",
      receiveOfferAlerts: parsed.data.receiveOfferAlerts !== false,
      receiveOrderAlerts: parsed.data.receiveOrderAlerts !== false,
      updatedAtMs: Date.now(),
    };

    const db = getFirebaseDb();
    await db.collection(USERS_COLLECTION).doc(user.id).set(profile, { merge: true });

    return NextResponse.json({
      ok: true,
      profile: {
        id: user.id,
        email: user.email,
        role: user.role,
        ...profile,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
