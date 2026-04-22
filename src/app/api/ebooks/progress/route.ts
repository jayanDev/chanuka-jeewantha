import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getEbookProgress, upsertEbookProgress } from "@/lib/ebook-firestore";
import { z } from "zod";

const progressSchema = z.object({
  ebookSlug: z.string().min(1),
  chapterId: z.number().int().min(1),
  isFinalChapter: z.boolean().default(false),
});

export async function GET(request: Request) {
  try {
    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
    }

    const progress = await getEbookProgress(user.id, slug);
    if (!progress) {
      return NextResponse.json({ completedChapters: [], isCompleted: false });
    }

    return NextResponse.json({
      completedChapters: progress.completedChapters,
      isCompleted: progress.isCompleted,
    });
  } catch (error) {
    console.error("[ebooks/progress GET] Failed:", error);
    return NextResponse.json({ completedChapters: [], isCompleted: false });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getRequestUser(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const parsed = progressSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { ebookSlug, chapterId, isFinalChapter } = parsed.data;

    const existing = await getEbookProgress(user.id, ebookSlug);

    const currentSet = new Set(existing?.completedChapters ?? []);
    currentSet.add(chapterId);
    const newCompletedChapters = Array.from(currentSet);
    const isCompleted = (existing?.isCompleted ?? false) || isFinalChapter;

    await upsertEbookProgress({
      userId: user.id,
      ebookSlug,
      completedChapters: newCompletedChapters,
      isCompleted,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[ebooks/progress POST] Failed:", error);
    // Don't fail reader UX if progress tracking fails
    return NextResponse.json({ ok: true });
  }
}
