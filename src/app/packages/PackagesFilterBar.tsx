"use client";

import { useState, useCallback } from "react";
import { packageCategories } from "@/lib/packages-catalog";

const SERVICE_PILLS = [
  { key: "all", label: "All Services" },
  ...packageCategories.map((cat) => ({
    key: cat.key,
    label: cat.title.replace(" Packages", "").replace(" Writing", "").replace(" Optimization", ""),
  })),
];

const TIER_PILLS = [
  { key: "all", label: "All Tiers" },
  { key: "founder-led", label: "✨ Signature" },
  { key: "supervised", label: "📋 Essentials" },
];

type Props = {
  activeTier: string;
  onTierChange: (tier: string) => void;
};

export default function PackagesFilterBar({ activeTier, onTierChange }: Props) {
  const [activeService, setActiveService] = useState("all");

  const scrollToSection = useCallback((key: string) => {
    setActiveService(key);
    if (key === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(`section-${key}`);
    if (el) {
      const offset = 80; // account for sticky bar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-zinc-200 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 space-y-2">
        {/* Service category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {SERVICE_PILLS.map((pill) => (
            <button
              key={pill.key}
              onClick={() => scrollToSection(pill.key)}
              className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                activeService === pill.key
                  ? "bg-foreground text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Tier filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
          {TIER_PILLS.map((pill) => (
            <button
              key={pill.key}
              onClick={() => onTierChange(pill.key)}
              className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                activeTier === pill.key
                  ? pill.key === "founder-led"
                    ? "bg-[#C9A961] text-white"
                    : pill.key === "supervised"
                    ? "bg-zinc-700 text-white"
                    : "bg-foreground text-white"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
