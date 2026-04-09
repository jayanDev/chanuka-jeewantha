import { NextResponse } from "next/server";
import { getFirebaseDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const db = getFirebaseDb();
    const collections = await db.listCollections();

    return NextResponse.json({
      ok: true,
      message: "Firebase Admin is connected.",
      projectId: process.env.FIREBASE_PROJECT_ID ?? null,
      collections: collections.map((c) => c.id),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Firebase error";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 500 },
    );
  }
}
