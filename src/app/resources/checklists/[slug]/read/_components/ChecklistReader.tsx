"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Checklist } from "@/lib/checklists";

type Props = {
  checklist: Checklist;
  isSignedIn: boolean;
};

function getChapterHref(ref: string, ebookSlug: string): string {
  const match = ref.match(/(\d+)/);
  if (!match) return `/ebooks/${ebookSlug}/read`;
  return `/ebooks/${ebookSlug}/read/chapter-${match[1]}`;
}

export default function ChecklistReader({ checklist, isSignedIn }: Props) {
  const storageKey = `checklist-progress-${checklist.slug}`;

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setChecked(JSON.parse(saved) as Record<string, boolean>);
    } catch {
      // ignore
    }
  }, [storageKey]);

  function toggle(itemId: string) {
    setChecked((prev) => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  const totalItems = checklist.steps.reduce((sum, s) => sum + s.items.length, 0);
  const checkedCount = checklist.steps.reduce(
    (sum, s) => sum + s.items.filter((item) => checked[item.id]).length,
    0
  );
  const progressPct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const step = checklist.steps[currentIdx];
  const isLocked = !step.free && !isSignedIn;
  const stepCheckedCount = step.items.filter((item) => checked[item.id]).length;
  const stepComplete = mounted && stepCheckedCount === step.items.length;

  const canGoPrev = currentIdx > 0;
  const canGoNext = currentIdx < checklist.steps.length - 1;

  function goTo(idx: number) {
    setCurrentIdx(Math.max(0, Math.min(checklist.steps.length - 1, idx)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">

      {/* Overall progress bar */}
      {mounted && (
        <div className="mb-8 rounded-[14px] border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">à¶”à¶¶à·š à¶´à·Šâ€à¶»à¶œà¶­à·’à¶º</p>
            <span className="text-sm font-bold text-brand-dark">{checkedCount}/{totalItems} à·ƒà¶¸à·Šà¶´à·–à¶»à·Šà¶«</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-main transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          {progressPct === 100 && (
            <p className="mt-3 text-sm font-semibold text-brand-dark flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              à·ƒà·’à¶ºà¶½à·” à¶´à·’à¶ºà·€à¶» à·ƒà¶¸à·Šà¶´à·–à¶»à·Šà¶« à¶šà·…à· â€” à¶±à·’à¶ºà¶¸à¶ºà·’!
            </p>
          )}
        </div>
      )}

      {/* Step navigation bar */}
      <div className="flex items-center gap-3 mb-8 rounded-[14px] border border-zinc-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => goTo(currentIdx - 1)}
          disabled={!canGoPrev}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-zinc-200 text-zinc-500 transition-colors hover:border-brand-main hover:text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="à¶šà¶½à·’à¶±à·Š à¶…à¶¯à·’à¶ºà¶»"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="flex-1 text-center">
          <p className="text-sm font-bold text-foreground">
            à¶…à¶¯à·’à¶ºà¶» {currentIdx + 1} / {checklist.steps.length}
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">
            {step.items.length} à¶´à·Šâ€à¶»à·à·Šà¶±
            {mounted && stepCheckedCount > 0 && ` Â· ${stepCheckedCount} à·ƒà¶¸à·Šà¶´à·–à¶»à·Šà¶«`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => goTo(currentIdx + 1)}
          disabled={!canGoNext}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-zinc-200 text-zinc-500 transition-colors hover:border-brand-main hover:text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="à¶Šà·…à¶Ÿ à¶…à¶¯à·’à¶ºà¶»"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Step header */}
      <div className={`flex items-start gap-4 mb-6 ${isLocked ? "opacity-50" : ""}`}>
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          stepComplete ? "bg-brand-main text-white" : "bg-zinc-100 text-zinc-600"
        }`}>
          {stepComplete
            ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            : step.id
          }
        </span>
        <div>
          <h2 className="text-[20px] font-bold font-plus-jakarta text-foreground leading-tight">
            {step.title}
          </h2>
          <p className="text-sm text-text-body mt-1">{step.description}</p>
        </div>
      </div>

      {/* Locked overlay */}
      {isLocked ? (
        <div className="rounded-[16px] border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
          <div className="flex justify-center mb-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
          </div>
          <p className="font-semibold text-foreground mb-1">à¶¸à·™à¶¸ à¶…à¶¯à·’à¶ºà¶» unlock à¶šà¶»à¶±à·Šà¶± sign in à¶šà¶»à¶±à·Šà¶±</p>
          <p className="text-sm text-text-body mb-5">
            à¶±à·œà¶¸à·’à¶½à·š account à¶‘à¶šà¶šà·Š à·„à¶¯à·à¶œà¶±à·Šà¶± â€” à¶¸à·™à¶¸ checklist à·ƒà¶¸à·Šà¶´à·–à¶»à·Šà¶«à¶ºà·™à¶±à·Šà¶¸ à¶±à·œà¶¸à·’à¶½à·š.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center gap-2 rounded-[10px] bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-brand-dark transition-colors"
            >
              à¶´à·Šâ€à¶»à·€à·šà· à·€à¶±à·Šà¶±
            </Link>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 rounded-[10px] border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-brand-main hover:text-brand-main transition-colors"
            >
              à¶±à·œà¶¸à·’à¶½à·š Account à·„à¶¯à¶±à·Šà¶±
            </Link>
          </div>
        </div>
      ) : (
        /* Checklist items */
        <ul className="space-y-3">
          {step.items.map((item) => {
            const isChecked = mounted && !!checked[item.id];
            return (
              <li key={item.id}>
                <div className={`flex items-start gap-3 rounded-[12px] border p-4 transition-all ${
                  isChecked
                    ? "border-brand-main/30 bg-brand-main/5"
                    : "border-zinc-200 bg-white hover:border-brand-main/40"
                }`}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={isChecked}
                    onClick={() => toggle(item.id)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isChecked
                        ? "border-brand-main bg-brand-main"
                        : "border-zinc-300 bg-white hover:border-brand-main"
                    }`}
                  >
                    {isChecked && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    )}
                  </button>
                  <p
                    className={`flex-1 min-w-0 text-[15px] font-medium leading-snug cursor-pointer ${
                      isChecked ? "line-through text-zinc-400" : "text-foreground"
                    }`}
                    onClick={() => toggle(item.id)}
                  >
                    {item.text}
                  </p>
                  {item.ref && checklist.ebookSlug && (
                    <Link
                      href={getChapterHref(item.ref, checklist.ebookSlug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-500 hover:bg-brand-main/10 hover:text-brand-dark transition-colors whitespace-nowrap"
                      title={`${item.ref} à¶šà·’à¶ºà·€à¶±à·Šà¶±`}
                    >
                      {item.ref}
                      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Bottom navigation */}
      <div className="mt-10 flex items-center gap-3">
        {canGoPrev ? (
          <button
            type="button"
            onClick={() => goTo(currentIdx - 1)}
            className="flex-1 flex items-center justify-center gap-2 rounded-[10px] border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-600 hover:border-brand-main hover:text-brand-dark transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
            à¶šà¶½à·’à¶±à·Š à¶…à¶¯à·’à¶ºà¶»
          </button>
        ) : <div className="flex-1" />}

        {canGoNext ? (
          <button
            type="button"
            onClick={() => goTo(currentIdx + 1)}
            className="flex-1 flex items-center justify-center gap-2 rounded-[10px] bg-foreground px-4 py-3 text-sm font-semibold text-background hover:bg-brand-dark transition-colors"
          >
            à¶Šà·…à¶Ÿ à¶…à¶¯à·’à¶ºà¶»
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ) : (
          <Link
            href={`/resources/checklists/${checklist.slug}`}
            className="flex-1 flex items-center justify-center gap-2 rounded-[10px] bg-brand-main px-4 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            à·ƒà¶¸à·Šà¶´à·–à¶»à·Šà¶« à¶šà·…à·!
          </Link>
        )}
      </div>

      {/* Unlock CTA for non-signed-in users */}
      {!isSignedIn && (
        <div className="mt-16 rounded-[20px] border border-zinc-200 bg-zinc-50 p-8 text-center">
          <h3 className="text-[20px] font-bold font-plus-jakarta text-foreground mb-2">
            à·ƒà·’à¶ºà¶½à·” {checklist.steps.length} à¶…à¶¯à·’à¶ºà¶» à¶±à·œà¶¸à·’à¶½à·š unlock à¶šà¶»à¶±à·Šà¶±
          </h3>
          <p className="text-text-body mb-6">
            à¶”à¶¶à·š account à¶‘à¶šà·™à¶±à·Š sign in à¶šà¶»à¶±à·Šà¶±, à¶±à·à¶­à·Šà¶±à¶¸à·Š à¶±à·œà¶¸à·’à¶½à·š account à·„à¶¯à·à¶œà¶±à·Šà¶± â€” checklist à·ƒà¶¸à·Šà¶´à·–à¶»à·Šà¶«à¶ºà·™à¶±à·Šà¶¸ à¶±à·œà¶¸à·’à¶½à·š.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center gap-2 rounded-[10px] bg-foreground px-6 py-3 font-semibold text-background hover:bg-brand-dark transition-colors"
            >
              à¶´à·Šâ€à¶»à·€à·šà· à·€à¶±à·Šà¶±
            </Link>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 rounded-[10px] border border-zinc-300 px-6 py-3 font-semibold text-foreground hover:border-brand-main hover:text-brand-main transition-colors"
            >
              à¶±à·œà¶¸à·’à¶½à·š Account à·„à¶¯à¶±à·Šà¶±
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
