import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const progressSchema = z.object({
  ebookSlug: z.string().min(1),
  chapterId: z.number().int().min(1),
  isFinalChapter: z.boolean().default(false),
});

export async function GET(request: Request) {
  const user = await getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
  }

  const progress = await prisma.ebookProgress.findUnique({
    where: {
      userId_ebookSlug: {
        userId: user.id,
        ebookSlug: slug,
      },
    },
  });

  if (!progress) {
    return NextResponse.json({ completedChapters: [], isCompleted: false });
  }

  let completedChapters: number[] = [];
  try {
    completedChapters = JSON.parse(progress.completedChapters);
  } catch {
    completedChapters = [];
  }

  return NextResponse.json({
    completedChapters,
    isCompleted: progress.isCompleted,
  });
}

export async function POST(request: Request) {
  const user = await getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = progressSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { ebookSlug, chapterId, isFinalChapter } = parsed.data;

  const existing = await prisma.ebookProgress.findUnique({
    where: {
      userId_ebookSlug: {
        userId: user.id,
        ebookSlug,
      },
    },
  });

  let newCompletedChapters = [chapterId];
  let isCurrentlyCompleted = false;

  if (existing) {
    try {
      const currentArr: number[] = JSON.parse(existing.completedChapters);
      const set = new Set(currentArr);
      set.add(chapterId);
      newCompletedChapters = Array.from(set);
    } catch {
      newCompletedChapters = [chapterId];
    }
    isCurrentlyCompleted = existing.isCompleted;
  }

  const shouldMarkCompleted = isCurrentlyCompleted || isFinalChapter;

  const progress = await prisma.ebookProgress.upsert({
    where: {
      userId_ebookSlug: {
        userId: user.id,
        ebookSlug,
      },
    },
    update: {
      completedChapters: JSON.stringify(newCompletedChapters),
      isCompleted: shouldMarkCompleted,
    },
    create: {
      userId: user.id,
      ebookSlug,
      completedChapters: JSON.stringify(newCompletedChapters),
      isCompleted: shouldMarkCompleted,
    },
  });

  return NextResponse.json({ ok: true });
}
