"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Checklist } from "@/lib/checklists";

type Props = {
  checklist: Checklist;
  isSignedIn: boolean;
};

export default function ChecklistReader({ checklist, isSignedIn }: Props) {
  const storageKey = `checklist-progress-${checklist.slug}`;

  // Load saved progress from localStorage
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

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

  // Total items across visible steps
  const visibleSteps = checklist.steps.filter(
    (s) => s.free || isSignedIn
  );
  const totalItems = visibleSteps.reduce((sum, s) => sum + s.items.length, 0);
  const checkedCount = visibleSteps.reduce(
    (sum, s) => sum + s.items.filter((item) => checked[item.id]).length,
    0
  );
  const progressPct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">

      {/* Progress bar */}
      {mounted && (
        <div className="mb-10 rounded-[14px] border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Your Progress</p>
            <span className="text-sm font-bold text-brand-dark">{checkedCount}/{totalItems} completed</span>
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
              All steps completed — great work!
            </p>
          )}
        </div>
      )}

      {/* Steps */}
      <ol className="space-y-8">
        {checklist.steps.map((step) => {
          const isLocked = !step.free && !isSignedIn;
          const stepCheckedCount = step.items.filter((item) => checked[item.id]).length;
          const stepComplete = mounted && stepCheckedCount === step.items.length;

          return (
            <li key={step.id} className="relative">
              {/* Step header */}
              <div className={`flex items-start gap-4 mb-4 ${isLocked ? "opacity-50" : ""}`}>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  stepComplete ? "bg-brand-main text-white" : "bg-zinc-100 text-zinc-600"
                }`}>
                  {stepComplete
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    : step.id
                  }
                </span>
                <div>
                  <h2 className="text-[18px] font-bold font-plus-jakarta text-foreground leading-tight">
                    Step {step.id}: {step.title}
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
                  <p className="font-semibold text-foreground mb-1">Sign in to unlock this step</p>
                  <p className="text-sm text-text-body mb-5">
                    Create a free account — this checklist is 100% free.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link
                      href="/auth/sign-in"
                      className="inline-flex items-center gap-2 rounded-[10px] bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-brand-dark transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/sign-up"
                      className="inline-flex items-center gap-2 rounded-[10px] border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-brand-main hover:text-brand-main transition-colors"
                    >
                      Create Free Account
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
                        <label className={`flex items-start gap-4 rounded-[12px] border p-4 cursor-pointer transition-all ${
                          isChecked
                            ? "border-brand-main/30 bg-brand-main/5"
                            : "border-zinc-200 bg-white hover:border-brand-main/40 hover:bg-zinc-50"
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
                          <div className="flex-1 min-w-0" onClick={() => toggle(item.id)}>
                            <p className={`text-[15px] font-semibold leading-snug ${isChecked ? "line-through text-zinc-400" : "text-foreground"}`}>
                              {item.text}
                            </p>
                            {item.detail && (
                              <p className="text-sm text-text-body mt-1 leading-relaxed">{item.detail}</p>
                            )}
                          </div>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      {/* Bottom CTA */}
      {!isSignedIn && (
        <div className="mt-16 rounded-[20px] border border-zinc-200 bg-zinc-50 p-8 text-center">
          <h3 className="text-[20px] font-bold font-plus-jakarta text-foreground mb-2">
            Unlock all {checklist.steps.length} steps for free
          </h3>
          <p className="text-text-body mb-6">
            Sign in with your existing account or create a free account to access every step.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center gap-2 rounded-[10px] bg-foreground px-6 py-3 font-semibold text-background hover:bg-brand-dark transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 rounded-[10px] border border-zinc-300 px-6 py-3 font-semibold text-foreground hover:border-brand-main hover:text-brand-main transition-colors"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
