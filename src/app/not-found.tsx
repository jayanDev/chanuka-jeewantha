import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <section className="w-full min-h-[70vh] bg-foreground text-white flex flex-col items-center justify-center relative overflow-hidden py-[150px]">
      {/* Background Marquee Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap z-0">
        <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className="text-[200px] md:text-[300px] font-plus-jakarta font-extrabold uppercase leading-none">
              404 ERROR
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
        <h1 className="font-plus-jakarta text-[80px] md:text-[120px] font-bold leading-[1] mb-2 text-brand-main">
          404
        </h1>
        <h2 className="text-[32px] md:text-[48px] font-bold font-plus-jakarta mb-6">
          Page Not Found!
        </h2>
        <p className="text-text-light/80 text-[18px] mb-10 leading-relaxed">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
        </p>
        <Link 
          href="/" 
          className="px-[32px] py-[16px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] font-medium text-[16px] transition-colors flex items-center gap-2"
        >
          Back To Homepage
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </Link>
      </div>
    </section>
  );
}