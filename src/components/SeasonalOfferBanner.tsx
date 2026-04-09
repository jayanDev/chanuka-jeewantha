"use client";

import { useEffect, useMemo, useState } from "react";
import { buildOfferPreviewHeaders, withOfferPreviewUrl } from "@/lib/offer-preview-client";

type ActiveOffer = {
  id: string;
  title: string;
  discountPercent: number;
  scope: "all" | "selected" | "category";
  selectedServiceSlugs: string[];
  selectedCategories: string[];
  startAtMs: number;
  endAtMs: number;
};

function formatRemaining(ms: number): string {
  if (ms <= 0) return "00d 00h 00m 00s";

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

async function readJsonSafely(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text();
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export default function SeasonalOfferBanner() {
  const [offer, setOffer] = useState<ActiveOffer | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const load = async () => {
      const response = await fetch(withOfferPreviewUrl("/api/offers/active"), {
        cache: "no-store",
        headers: buildOfferPreviewHeaders(),
      });
      const payload = await readJsonSafely(response);
      if (!response.ok || !payload.offer || typeof payload.offer !== "object") {
        setOffer(null);
        return;
      }

      const next = payload.offer as {
        id?: unknown;
        title?: unknown;
        discountPercent?: unknown;
        scope?: unknown;
        selectedServiceSlugs?: unknown;
        selectedCategories?: unknown;
        startAtMs?: unknown;
        endAtMs?: unknown;
      };

      if (
        typeof next.id !== "string" ||
        typeof next.title !== "string" ||
        typeof next.discountPercent !== "number" ||
        typeof next.startAtMs !== "number" ||
        typeof next.endAtMs !== "number"
      ) {
        setOffer(null);
        return;
      }

      setOffer({
        id: next.id,
        title: next.title,
        discountPercent: next.discountPercent,
        scope: next.scope === "selected" ? "selected" : next.scope === "category" ? "category" : "all",
        selectedServiceSlugs: Array.isArray(next.selectedServiceSlugs)
          ? next.selectedServiceSlugs.filter((item): item is string => typeof item === "string")
          : [],
        selectedCategories: Array.isArray(next.selectedCategories)
          ? next.selectedCategories.filter((item): item is string => typeof item === "string")
          : [],
        startAtMs: next.startAtMs,
        endAtMs: next.endAtMs,
      });

      if (typeof next.id === "string") {
        void fetch("/api/offers/impression", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...Object.fromEntries(new Headers(buildOfferPreviewHeaders()).entries()) },
          body: JSON.stringify({ offerId: next.id }),
        });
      }
    };

    void load();
  }, []);

  useEffect(() => {
    if (!offer) return;
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [offer]);

  const remaining = useMemo(() => {
    if (!offer) return "";
    return formatRemaining(offer.endAtMs - now);
  }, [offer, now]);

  if (!offer) return null;

  if (offer.endAtMs <= now) {
    return null;
  }

  const offerScopeText =
    offer.scope === "all"
      ? "All services included"
      : offer.scope === "selected"
        ? `${offer.selectedServiceSlugs.length} selected services included`
        : `${offer.selectedCategories.length} categories included`;

  return (
    <section className="w-full bg-brand-main text-white border-b border-brand-dark/20">
      <div className="max-w-[1512px] mx-auto px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p className="font-semibold text-sm md:text-base">
          {offer.title}: {offer.discountPercent}% OFF
          <span className="font-normal opacity-90"> • {offerScopeText}</span>
        </p>
        <p className="font-plus-jakarta text-sm md:text-base font-bold tracking-wide">
          Ends in {remaining}
        </p>
      </div>
    </section>
  );
}
