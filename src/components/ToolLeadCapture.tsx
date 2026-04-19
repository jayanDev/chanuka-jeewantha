"use client";

import { useState } from "react";

type ToolLeadCaptureProps = {
  title: string;
  description: string;
  buttonLabel?: string;
  successText?: string;
};

export default function ToolLeadCapture({
  title,
  description,
  buttonLabel = "Get Updates",
  successText = "Thanks. You are now subscribed for future career resources and updates.",
}: ToolLeadCaptureProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorText("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload?.error ?? "Could not subscribe right now.");
      }

      setStatus("success");
      setEmail("");
      setWebsite("");
    } catch (error: unknown) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Could not subscribe.");
    } finally {
      window.setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <aside className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">Free Career Updates</p>
      <h3 className="mt-3 text-[24px] font-bold font-plus-jakarta text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">{description}</p>

      {status === "success" ? (
        <div className="mt-5 rounded-[12px] border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
          {successText}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <input
            type="text"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === "loading"}
            placeholder="Your email address"
            className="w-full rounded-[12px] border border-zinc-300 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand-main disabled:opacity-70"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-[12px] bg-foreground px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-main disabled:opacity-70"
          >
            {status === "loading" ? "Subscribing..." : buttonLabel}
          </button>
        </form>
      )}

      {status === "error" ? (
        <p className="mt-3 text-sm font-medium text-red-600">{errorText || "Could not subscribe right now."}</p>
      ) : null}
    </aside>
  );
}
