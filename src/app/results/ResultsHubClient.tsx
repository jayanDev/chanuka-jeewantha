"use client";

import Link from "next/link";
import { useState } from "react";
import type { ResultsHubItem } from "@/lib/results-hub";

type ResultsHubClientProps = {
  items: ResultsHubItem[];
  focusAreas: string[];
};

export default function ResultsHubClient({ items, focusAreas }: ResultsHubClientProps) {
  const [kindFilter, setKindFilter] = useState<"All" | "Case Study" | "Testimonial">("All");
  const [focusFilter, setFocusFilter] = useState<string>("All");

  const filteredItems = items.filter((item) => {
    const matchesKind = kindFilter === "All" || item.kind === kindFilter;
    const matchesFocus = focusFilter === "All" || item.focusAreas.includes(focusFilter);
    return matchesKind && matchesFocus;
  });

  return (
    <div className="space-y-8">
      <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">Filters</p>
            <h2 className="mt-2 text-[28px] font-bold font-plus-jakarta text-foreground">Browse proof by type and focus area</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {(["All", "Case Study", "Testimonial"] as const).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setKindFilter(kind)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    kindFilter === kind
                      ? "border-brand-main bg-brand-main text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-brand-main hover:text-brand-main"
                  }`}
                >
                  {kind}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFocusFilter("All")}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  focusFilter === "All"
                    ? "border-brand-main bg-brand-main text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-brand-main hover:text-brand-main"
                }`}
              >
                All Focus Areas
              </button>
              {focusAreas.map((focusArea) => (
                <button
                  key={focusArea}
                  type="button"
                  onClick={() => setFocusFilter(focusArea)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    focusFilter === focusArea
                      ? "border-brand-main bg-brand-main text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-brand-main hover:text-brand-main"
                  }`}
                >
                  {focusArea}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-[20px] border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <h3 className="text-[26px] font-bold font-plus-jakarta text-foreground">No matching proof stories yet</h3>
          <p className="mt-3 text-text-body">
            Try a different filter or browse all results to see case studies and client feedback.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <article key={item.id} className="rounded-[22px] border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.1)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full bg-brand-main/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark">
                  {item.kind}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">{item.yearLabel}</span>
              </div>

              <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.focusAreas.map((focusArea) => (
                  <span key={`${item.id}-${focusArea}`} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
                    {focusArea}
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-[14px] border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Proof Highlight</p>
                <p className="mt-2 text-sm font-semibold text-zinc-900">{item.proofLabel}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.audience}</p>
              </div>

              <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
                {item.kind === "Case Study" ? "Read Case Study" : "See Testimonials"}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
