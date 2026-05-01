"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TocItem {
  kind?: "chapter" | "section";
  id?: number;
  title: string;
}

interface Props {
  slug: string;
  ebookTitle: string;
  accessLabel: string;
  toc: TocItem[];
  hasPremiumAccess: boolean;
  freeChapterIds: number[];
  anonymousFreeChapterIds: number[];
  isSignedIn: boolean;
}

export default function MobileChapterMenu({
  slug,
  ebookTitle,
  accessLabel,
  toc,
  hasPremiumAccess,
  freeChapterIds,
  anonymousFreeChapterIds,
  isSignedIn,
}: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Derive current chapter id from URL: /ebooks/[slug]/read/[chapterId]
  const currentChapterId = (() => {
    const parts = pathname?.split("/") ?? [];
    const last = parts[parts.length - 1];
    const num = parseInt(last, 10);
    return isNaN(num) ? null : num;
  })();

  return (
    <>
      {/* Top bar */}
      <div className="px-4 py-3 flex items-center gap-3">
        <Link
          href={`/ebooks/${slug}`}
          className="inline-flex items-center gap-1.5 rounded-[8px] bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 text-sm font-semibold text-zinc-700 transition-colors shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          Back
        </Link>
        <p className="flex-1 min-w-0 text-sm font-semibold text-foreground truncate">{ebookTitle}</p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chapter list" : "Open chapter list"}
          className="inline-flex items-center gap-1.5 rounded-[8px] border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-600 transition-colors hover:bg-zinc-50 shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          Chapters
          {currentChapterId !== null && (
            <span className="ml-0.5 text-brand-dark">
              {(() => {
                const chapterItems = toc.filter(
                  (t) => (t.kind ?? "chapter") === "chapter" && typeof t.id === "number"
                );
                const idx = chapterItems.findIndex((t) => t.id === currentChapterId);
                return idx !== -1 ? `${idx + 1}/${chapterItems.length}` : null;
              })()}
            </span>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <span className="hidden sm:inline shrink-0 text-[11px] font-bold uppercase tracking-wider text-brand-main bg-brand-main/10 px-2 py-0.5 rounded">
          {accessLabel}
        </span>
      </div>

      {/* Collapsible chapter list */}
      {open && (
        <div className="border-t border-zinc-200 bg-white max-h-[60vh] overflow-y-auto px-3 py-3 space-y-0.5">
          {toc.map((item, idx) => {
            if ((item.kind ?? "chapter") === "section") {
              return (
                <div
                  key={`section-${idx}`}
                  className="mt-3 mb-1 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-400 border-l-2 border-brand-main/30"
                >
                  {item.title}
                </div>
              );
            }

            if (typeof item.id !== "number") return null;

            const isFree = freeChapterIds.includes(item.id);
            const requiresSignIn =
              !isSignedIn &&
              !hasPremiumAccess &&
              isFree &&
              !anonymousFreeChapterIds.includes(item.id);
            const isLocked = !isFree && !hasPremiumAccess;
            const isActive = currentChapterId === item.id;

            return (
              <Link
                key={item.id}
                href={`/ebooks/${slug}/read/${item.id}`}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded-[8px] px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-brand-main/10 text-brand-dark font-semibold border border-brand-main/20"
                    : isLocked
                    ? "opacity-50 text-zinc-500 hover:bg-zinc-50"
                    : "text-zinc-700 hover:bg-brand-main/5 hover:text-brand-dark"
                }`}
              >
                <span className="shrink-0">
                  {isActive ? (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-dark mt-px" />
                  ) : isLocked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  ) : requiresSignIn ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                  ) : (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-main mt-px" />
                  )}
                </span>
                <span className="text-[14px] font-medium flex-1">{item.title}</span>
                {requiresSignIn ? (
                  <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded shrink-0">SIGN IN</span>
                ) : isFree && !hasPremiumAccess ? (
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">FREE</span>
                ) : null}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
