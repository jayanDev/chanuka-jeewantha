"use client";

import { useState } from "react";

export default function SettingsClient() {
  const [previewStatus, setPreviewStatus] = useState("");

  const clearPreview = async () => {
    const response = await fetch("/api/offers/preview", { method: "DELETE" });
    setPreviewStatus(response.ok ? "Preview mode cleared." : "Failed to clear preview mode.");
  };

  return (
    <section className="space-y-4">
      <article className="rounded-[16px] border border-zinc-200 bg-white p-6">
        <h2 className="text-2xl font-bold font-plus-jakarta">Settings</h2>
        <p className="mt-2 text-sm text-zinc-600">General admin-level controls.</p>

        <div className="mt-5 rounded border border-zinc-200 p-4">
          <h3 className="font-semibold text-foreground">Offer Preview Controls</h3>
          <p className="mt-1 text-sm text-zinc-600">Clear any active offer preview cookie for this browser session.</p>
          <button type="button" onClick={() => void clearPreview()} className="mt-3 rounded bg-zinc-900 px-4 py-2 text-sm text-white">
            Clear Preview Mode
          </button>
          {previewStatus && <p className="mt-2 text-sm text-zinc-700">{previewStatus}</p>}
        </div>
      </article>
    </section>
  );
}
