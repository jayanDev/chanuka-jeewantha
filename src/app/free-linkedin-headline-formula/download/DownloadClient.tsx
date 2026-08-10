"use client";

import Link from "next/link";
import { useState } from "react";

const DOWNLOAD_HREF = "/api/free-linkedin-headline-formula/download";
const FILE_NAME = "LinkedIn Headline Formula - Chanuka Jeewantha.pdf";

type DownloadState = "idle" | "downloading" | "done" | "error";

const tips = [
  "Use role-specific keywords recruiters in your field are likely to search for.",
  "Replace broad audiences with a clear group, industry, or type of organization.",
  "Read the finished headline as a stranger: its value should be clear in about three seconds.",
];

export default function DownloadClient() {
  const [state, setState] = useState<DownloadState>("idle");

  const startDownload = async () => {
    setState("downloading");

    try {
      const response = await fetch(DOWNLOAD_HREF, { cache: "no-store" });
      const contentType = response.headers.get("content-type") ?? "";

      if (!response.ok || !contentType.includes("application/pdf")) {
        throw new Error("download-failed");
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = FILE_NAME;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(objectUrl);

      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="rounded-[16px] border-2 border-brand-main/40 bg-white p-6 shadow-lg sm:p-8">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-main/15 text-brand-dark" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="M7 10l5 5 5-5" />
            <path d="M12 15V3" />
          </svg>
        </span>

        <h1 className="mt-5 font-heading text-[26px] font-bold text-foreground sm:text-[30px]">
          {state === "done" ? "Your download has started 🎉" : "Your LinkedIn Headline Formula is ready"}
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-text-body">
          {state === "done"
            ? "If the file did not save automatically, use the button again to retry."
            : "2-page PDF · Formula, examples, worksheet, and five final checks · No signup required."}
        </p>

        <button
          type="button"
          onClick={startDownload}
          disabled={state === "downloading"}
          className="btn btn-primary btn-lg mt-6 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "downloading"
            ? "Preparing your file…"
            : state === "done"
              ? "Download Again"
              : "Download Now (.pdf)"}
        </button>

        {state === "error" ? (
          <p className="mt-4 w-full rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Something went wrong. Please refresh and try again, or{" "}
            <a
              href="https://wa.me/94773902230"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              message us on WhatsApp
            </a>
            .
          </p>
        ) : null}
      </div>

      <div className="mt-8 rounded-[12px] border border-zinc-200 bg-bg-cream p-5">
        <h2 className="font-heading text-[18px] font-semibold text-foreground">
          Quick tips before you write
        </h2>
        <ul className="mt-3 space-y-2.5">
          {tips.map((tip) => (
            <li key={tip} className="flex items-start gap-2.5 text-sm text-text-body">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-main" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Reviewing your full profile?{" "}
        <Link href="/services/linkedin-optimization" className="font-semibold text-brand-dark hover:text-brand-main">
          See LinkedIn Optimization
        </Link>
      </p>
    </div>
  );
}
