"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DownloadStage = "closed" | "service-ad" | "ebook-ad" | "ready";

type Props = {
  slug: string;
  title: string;
  fileName: string;
  isSignedIn: boolean;
  signupHref: string;
  signinHref: string;
};

const serviceAd = {
  eyebrow: "Before You Download",
  title: "Need the CV written professionally?",
  body: "Use the free template as your starting point, or let me build a fully ATS-friendly, recruiter-ready CV around your target role.",
  href: "/pricing",
  cta: "View CV Packages",
};

const ebookAd = {
  eyebrow: "Recommended Next",
  title: "Improve your LinkedIn profile too",
  body: "Pair your ATS CV with the LinkedIn Profile Optimization System so recruiters see a stronger, search-friendly career brand.",
  href: "/ebooks/linkedin-profile-optimization",
  cta: "Explore Ebook",
};

function formatSeconds(seconds: number) {
  return `${seconds}s`;
}

export default function ResourceDownloadGate({ slug, title, fileName, isSignedIn, signupHref, signinHref }: Props) {
  const [stage, setStage] = useState<DownloadStage>("closed");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const downloadHref = `/api/resources/templates/${slug}/download`;
  const activeAd = stage === "ebook-ad" || stage === "ready" ? ebookAd : serviceAd;
  const durationSeconds = stage === "service-ad" ? 5 : stage === "ebook-ad" ? 3 : 0;
  const remainingSeconds = Math.max(durationSeconds - elapsedSeconds, 0);
  const canSkipFirstAd = stage === "service-ad" && elapsedSeconds >= 3;
  const isDownloadReady = stage === "ready";

  const progressWidth = useMemo(() => {
    if (!durationSeconds) return "100%";
    return `${Math.min((elapsedSeconds / durationSeconds) * 100, 100)}%`;
  }, [durationSeconds, elapsedSeconds]);

  useEffect(() => {
    if (stage !== "service-ad" && stage !== "ebook-ad") return;

    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const nextElapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
      setElapsedSeconds(Math.min(nextElapsedSeconds, durationSeconds));

      if (nextElapsedSeconds >= durationSeconds) {
        setElapsedSeconds(0);
        if (stage === "service-ad") {
          setStage("ebook-ad");
        } else {
          setStage("ready");
        }
      }
    }, 250);

    return () => window.clearInterval(timer);
  }, [durationSeconds, stage]);

  const openDownloadFlow = () => {
    if (!isSignedIn) {
      window.location.assign(signupHref);
      return;
    }

    setIsDownloading(false);
    setDownloadError("");
    setElapsedSeconds(0);
    setStage("service-ad");
  };

  const startDownload = async () => {
    setIsDownloading(true);
    setDownloadError("");

    try {
      const response = await fetch(downloadHref, {
        credentials: "include",
        cache: "no-store",
      });

      if (response.status === 401) {
        window.location.assign(signinHref);
        return;
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (!response.ok || !contentType.includes("officedocument.wordprocessingml.document")) {
        throw new Error("The Word template could not be downloaded. Please refresh the page and try again.");
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(objectUrl);

      setIsDownloading(false);
      setStage("closed");
    } catch (error) {
      setDownloadError(error instanceof Error ? error.message : "The Word template could not be downloaded.");
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="rounded-[16px] border border-brand-main/30 bg-brand-main/10 p-6">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
          Free Template Download
        </p>
        <h3 className="mb-3 text-[24px] font-bold font-plus-jakarta text-foreground">{title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-text-body">
          Create a free website account first. After signup, you will see two short website recommendations before the DOCX download unlocks.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={openDownloadFlow}
            className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-foreground px-6 py-3 font-semibold text-background transition-colors hover:bg-brand-main"
          >
            {isSignedIn ? "Download Free Template" : "Create Account to Download"}
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
          </button>
          {!isSignedIn ? (
            <Link href={signinHref} className="text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
              Already have an account? Sign in
            </Link>
          ) : null}
        </div>
      </div>

      {stage !== "closed" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="resource-download-ad-title">
          <div className="relative w-full max-w-[560px] overflow-hidden rounded-[20px] border border-white/15 bg-white shadow-2xl">
            {isDownloadReady ? (
              <button
                type="button"
                onClick={() => setStage("closed")}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main"
                aria-label="Close download popup"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            ) : null}

            <div className="bg-foreground px-6 py-5 text-white">
              <div className="mb-3 flex items-center justify-between gap-4 pr-10">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-main">
                  {activeAd.eyebrow}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  {stage === "service-ad" ? "Ad 1 of 2" : "Ad 2 of 2"}
                </span>
              </div>
              <h2 id="resource-download-ad-title" className="text-[28px] font-bold font-plus-jakarta leading-tight text-white">
                {activeAd.title}
              </h2>
            </div>

            <div className="p-6">
              <p className="mb-6 text-[15px] leading-relaxed text-text-body">{activeAd.body}</p>

              <div className="mb-6 overflow-hidden rounded-[14px] border border-zinc-200 bg-zinc-50 p-5">
                <div className="mb-3 flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold text-foreground">
                    {isDownloadReady ? "Download unlocked" : `Please wait ${formatSeconds(remainingSeconds)}`}
                  </span>
                  <Link href={activeAd.href} className="font-semibold text-brand-dark transition-colors hover:text-brand-main">
                    {activeAd.cta}
                  </Link>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
                  <div className="h-full rounded-full bg-brand-main transition-all duration-300" style={{ width: progressWidth }} />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {stage === "service-ad" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setElapsedSeconds(0);
                      setStage("ebook-ad");
                    }}
                    disabled={!canSkipFirstAd}
                    className="rounded-[10px] border border-zinc-300 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {canSkipFirstAd ? "Skip to second ad" : `Skip available in ${formatSeconds(Math.max(3 - elapsedSeconds, 0))}`}
                  </button>
                ) : (
                  <span className="text-sm font-medium text-zinc-500">
                    {isDownloadReady ? "You can download the file now." : "Final ad unlocks in 3 seconds."}
                  </span>
                )}

                <button
                  type="button"
                  onClick={startDownload}
                  disabled={!isDownloadReady || isDownloading}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-foreground px-6 py-3 font-semibold text-background transition-colors hover:bg-brand-main disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {isDownloading ? "Starting..." : "Download Template"}
                </button>
              </div>

              {downloadError ? (
                <p className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {downloadError}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
