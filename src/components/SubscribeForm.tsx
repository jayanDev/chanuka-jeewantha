"use client";

import React, { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorText("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error ?? "Could not subscribe right now.");
      }

      setStatus("success");
      setEmail("");
      setWebsite("");
    } catch (error: unknown) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Could not subscribe.");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="w-full py-[96px] bg-brand-main text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-dark opacity-30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-[1512px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <span className="text-foreground font-bold tracking-wider uppercase mb-4 block">Newsletter</span>
        <h2 className="text-[40px] md:text-[56px] font-bold font-plus-jakarta text-foreground mb-6 leading-[1.1] max-w-2xl">
          Subscribe to get latest updates.
        </h2>
        <p className="text-text-body text-lg mb-10 max-w-xl text-zinc-800">
          Join my newsletter to get the latest articles, resources, and design inspiration directly in your inbox.
        </p>

        {status === "success" && (
          <div className="mb-6 p-4 w-full max-w-2xl bg-white/20 border border-white/50 rounded-[10px] text-foreground font-medium text-center">
            Thanks for subscribing! Keep an eye on your inbox.
          </div>
        )}

        {status === "error" && (
          <div className="mb-6 p-4 w-full max-w-2xl bg-red-500/20 border border-red-500/50 rounded-[10px] text-white font-medium text-center">
            {errorText || "Oops, something went wrong. Please try again."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
          />
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              placeholder="Your email address" 
              className="w-full pl-14 pr-6 py-[20px] bg-white border border-transparent rounded-[10px] text-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all placeholder:text-zinc-500 font-medium disabled:opacity-70"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full md:w-auto px-[40px] py-[20px] bg-foreground hover:bg-zinc-800 text-white rounded-[10px] font-bold transition-all shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </>
            ) : (
              "Subscribe Now"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}