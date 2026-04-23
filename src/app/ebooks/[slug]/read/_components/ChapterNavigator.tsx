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
      if (nextChapterId !== null) {
        router.push(`/ebooks/${slug}/read/${nextChapterId}`);
      } else if (isFinalChapter) {
        // Final chapter — go back to ebook overview page
        router.push(`/ebooks/${slug}`);
      }
    }
  };

  return (
    <>
      {/* Sticky mobile bottom nav — always visible on mobile so users don't have to scroll */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 px-4 py-3 flex items-center gap-3">
        {prevChapterId !== null ? (
          <Link
            href={`/ebooks/${slug}/read/${prevChapterId}`}
            className="flex-1 flex items-center justify-center gap-2 rounded-[10px] border border-zinc-200 px-3 py-3 text-sm font-semibold text-zinc-600 hover:border-brand-main hover:text-brand-dark transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            Prev
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        <button
          type="button"
          onClick={handleNext}
          disabled={isSaving}
          className="flex-[2] flex items-center justify-center gap-2 rounded-[10px] bg-foreground px-4 py-3 text-sm font-semibold text-background hover:bg-brand-dark transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            "Saving..."
          ) : isFinalChapter ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              Finish
            </>
          ) : (
            <>
              Next Chapter
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </>
          )}
        </button>
      </div>

      {/* Desktop / end-of-chapter navigation */}
 <div className="mt-20 pt-10 border-t border-zinc-100 pb-32 lg:pb-20">
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
            disabled={isSaving}
            className="px-6 py-4 bg-foreground text-background rounded-[12px] hover:bg-brand-main transition-colors flex items-center gap-3 w-full sm:w-auto justify-center disabled:opacity-50"
          >
            {isSaving
              ? "Saving..."
              : isFinalChapter
              ? "✓ Mark Complete & Finish Reading"
              : "Mark as Read & Continue →"}
          </button>
        </div>
      </div>
    </>
  );
}
