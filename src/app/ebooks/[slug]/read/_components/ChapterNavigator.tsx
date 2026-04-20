"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ChapterNavigatorProps {
  slug: string;
  currentChapterId: number;
  prevChapterId: number | null;
  nextChapterId: number | null;
  nextChapterTitle: string | null;
  isFinalChapter: boolean;
}

export default function ChapterNavigator({
  slug,
  currentChapterId,
  prevChapterId,
  nextChapterId,
  nextChapterTitle,
  isFinalChapter,
}: ChapterNavigatorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleNext = async () => {
    setIsSaving(true);
    try {
      await fetch(`/api/ebooks/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ebookSlug: slug,
          chapterId: currentChapterId,
          isFinalChapter,
        }),
      });
    } catch (e) {
      console.error("Failed to save progress", e);
    } finally {
      setIsSaving(false);
      // Proceed to next page even if save failed
      if (nextChapterId !== null) {
        router.push(`/ebooks/${slug}/read/${nextChapterId}`);
      }
    }
  };

  return (
 <div className="mt-20 pt-10 border-t border-zinc-100 pb-20">
      {nextChapterId !== null && nextChapterTitle && (
 <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500 mb-2">Up Next</p>
 <p className="text-base font-semibold text-zinc-800 leading-snug">{nextChapterTitle}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {prevChapterId !== null ? (
          <Link
            href={`/ebooks/${slug}/read/${prevChapterId}`}
 className="px-6 py-4 border border-zinc-200 rounded-[12px] hover:border-brand-main text-zinc-600 hover:text-brand-main transition-colors flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            &larr; Previous Chapter
          </Link>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={handleNext}
          disabled={isSaving || nextChapterId === null}
          className="px-6 py-4 bg-foreground text-background rounded-[12px] hover:bg-brand-main transition-colors flex items-center gap-3 w-full sm:w-auto justify-center disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Mark as Read & Continue \u2192"}
        </button>
      </div>
    </div>
  );
}
