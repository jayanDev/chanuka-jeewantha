import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { isTrustedOrigin } from "@/lib/security";
import { passwordChangeSchema } from "@/lib/validation";

const USERS_COLLECTION = "app_users";

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
    const parsed = passwordChangeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (parsed.data.currentPassword === parsed.data.newPassword) {
      return NextResponse.json({ error: "New password must be different from current password" }, { status: 400 });
    }

    const db = getFirebaseDb();
    const ref = db.collection(USERS_COLLECTION).doc(user.id);
    const snapshot = await ref.get();
    const data = snapshot.data() as { passwordHash?: unknown } | undefined;

    if (!data || typeof data.passwordHash !== "string") {
      return NextResponse.json({ error: "Password update is not available for this account" }, { status: 400 });
    }

    const isCurrentValid = verifyPassword(parsed.data.currentPassword, data.passwordHash);
    if (!isCurrentValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    await ref.set(
      {
        passwordHash: hashPassword(parsed.data.newPassword),
        updatedAtMs: Date.now(),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
