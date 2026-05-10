"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console in development; in production wire to your error reporter
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-main mb-4">500</p>
      <h1 className="font-heading text-[40px] sm:text-[56px] md:text-[72px] font-extrabold text-foreground leading-[1.05] mb-4">
        Something went wrong
      </h1>
      <p className="text-text-body text-[16px] sm:text-[18px] max-w-xl mb-8">
        An unexpected error occurred. It&apos;s been noted and we&apos;re looking into it. You can
        try again or head back to the homepage.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          type="button"
          onClick={reset}
          className="px-[25px] py-[15px] bg-brand-main hover:bg-brand-dark rounded-[10px] text-white font-medium transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-[25px] py-[15px] border border-border hover:border-brand-main text-text-body hover:text-brand-main rounded-[10px] font-medium transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
      {error.digest && (
        <p className="mt-6 text-xs text-zinc-400">Error ID: {error.digest}</p>
      )}
    </div>
  );
}
