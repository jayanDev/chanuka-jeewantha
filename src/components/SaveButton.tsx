"use client";

import { useEffect, useState } from "react";

interface SaveButtonProps {
  productSlug: string;
  className?: string;
}

export default function SaveButton({ productSlug, className = "" }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/saved")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.saved) && (data.saved as string[]).includes(productSlug)) {
          setSaved(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [productSlug]);

  async function toggle() {
    setLoading(true);
    try {
      if (saved) {
        await fetch(`/api/saved?slug=${encodeURIComponent(productSlug)}`, { method: "DELETE" });
        setSaved(false);
      } else {
        await fetch("/api/saved", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productSlug }),
        });
        setSaved(true);
      }
    } catch {
      // Non-critical
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      aria-label={saved ? "Remove from saved" : "Save for later"}
      title={saved ? "Remove from saved" : "Save for later"}
      className={`inline-flex items-center gap-1.5 rounded-[8px] border px-3 py-2 text-xs font-semibold transition-colors disabled:opacity-50 ${
        saved
          ? "border-brand-main bg-brand-main/10 text-brand-dark hover:bg-brand-main/20"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-brand-main hover:text-brand-main"
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
      {saved ? "Saved" : "Save"}
    </button>
  );
}
