"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function WorkshopBookingForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const organization = String(fd.get("organization") ?? "").trim();
    const audienceSize = String(fd.get("audienceSize") ?? "").trim();
    const format = String(fd.get("format") ?? "").trim();
    const details = String(fd.get("details") ?? "").trim();

    const message = [
      `Organization: ${organization || "Not specified"}`,
      `Audience size: ${audienceSize || "Not specified"}`,
      `Preferred format: ${format || "Not specified"}`,
      "",
      details,
    ]
      .join("\n")
      .trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: "Workshop Booking Inquiry",
          message,
          website: "",
        }),
      });

      const json = await res.json();

      if (res.ok && json.ok) {
        setState("success");
      } else {
        setState("error");
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-[20px] border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-main/10 text-brand-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3 className="text-[24px] font-bold font-heading text-foreground mb-2">Inquiry Received</h3>
        <p className="text-text-body">
          Thank you for your interest. I&apos;ll get back to you within 1–2 business days to discuss your workshop requirements.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border border-zinc-200 bg-white p-8 shadow-sm">
      <h3 className="text-[28px] font-bold font-heading text-foreground mb-2">Book a Workshop</h3>
      <p className="text-text-body mb-8 text-sm">
        Fill in your details and I&apos;ll reach out to discuss session goals, format, and scheduling.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Honeypot */}
        <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="wb-name" className="mb-1.5 block text-sm font-semibold text-foreground">
              Your Name <span className="text-brand-main">*</span>
            </label>
            <input
              id="wb-name"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              placeholder="e.g. Kasun Perera"
              className="w-full rounded-[10px] border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-foreground placeholder:text-zinc-400 focus:border-brand-main focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="wb-email" className="mb-1.5 block text-sm font-semibold text-foreground">
              Email Address <span className="text-brand-main">*</span>
            </label>
            <input
              id="wb-email"
              name="email"
              type="email"
              required
              maxLength={200}
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-[10px] border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-foreground placeholder:text-zinc-400 focus:border-brand-main focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="wb-org" className="mb-1.5 block text-sm font-semibold text-foreground">
              Organization / University
            </label>
            <input
              id="wb-org"
              name="organization"
              type="text"
              maxLength={200}
              placeholder="e.g. University of Colombo"
              className="w-full rounded-[10px] border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-foreground placeholder:text-zinc-400 focus:border-brand-main focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="wb-audience" className="mb-1.5 block text-sm font-semibold text-foreground">
              Estimated Audience Size
            </label>
            <select
              id="wb-audience"
              name="audienceSize"
              className="w-full rounded-[10px] border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-foreground focus:border-brand-main focus:bg-white focus:outline-none transition-colors appearance-none"
            >
              <option value="">Select a range</option>
              <option value="Under 30">Under 30</option>
              <option value="30–100">30–100</option>
              <option value="100–300">100–300</option>
              <option value="300+">300+</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="wb-format" className="mb-1.5 block text-sm font-semibold text-foreground">
            Preferred Format
          </label>
          <select
            id="wb-format"
            name="format"
            className="w-full rounded-[10px] border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-foreground focus:border-brand-main focus:bg-white focus:outline-none transition-colors appearance-none"
          >
            <option value="">Select format</option>
            <option value="In-person (on-site)">In-person (on-site)</option>
            <option value="Online (Zoom / Teams)">Online (Zoom / Teams)</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label htmlFor="wb-details" className="mb-1.5 block text-sm font-semibold text-foreground">
            Workshop Goals & Additional Details <span className="text-brand-main">*</span>
          </label>
          <textarea
            id="wb-details"
            name="details"
            required
            minLength={20}
            maxLength={2000}
            rows={4}
            placeholder="e.g. We are organizing a CV workshop for final-year undergraduates preparing for graduate recruitment..."
            className="w-full rounded-[10px] border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-foreground placeholder:text-zinc-400 focus:border-brand-main focus:bg-white focus:outline-none transition-colors resize-y"
          />
        </div>

        {state === "error" && (
          <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full rounded-[10px] bg-brand-main px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === "loading" ? "Sending…" : "Send Workshop Inquiry"}
        </button>
      </form>
    </div>
  );
}
