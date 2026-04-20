"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  currentIndex: number;
  totalChapters: number;
  chapterTitle: string;
  ebookTitle: string;
  slug: string;
};

export default function ReaderProgressTracker({
  currentIndex,
  totalChapters,
  chapterTitle,
  ebookTitle,
  slug,
}: Props) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      if (documentHeight > 0) {
        const scrolled = (window.scrollY / documentHeight) * 100;
        setScrollProgress(scrolled);
      } else {
        setScrollProgress(100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const overallProgress = ((currentIndex) / totalChapters) * 100;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm transition-all">
      <div className="h-1 w-full bg-zinc-100 flex">
        {/* Book progress (light green) */}
        <div
          className="h-full bg-brand-main/30 origin-left transition-all duration-500 ease-out"
          style={{ width: `${overallProgress}%` }}
        />
        {/* Chapter progress (dark green overlaid on book progress or just part of it?) */}
        {/* We can just have a thin scroll progress bar for the current page */}
      </div>
      <div 
        className="absolute top-0 left-0 h-1 bg-brand-main origin-left transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href={`/ebooks/${slug}`} className="flex items-center gap-2 text-zinc-600 hover:text-brand-dark transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span className="text-sm font-medium hidden sm:inline">{ebookTitle}</span>
        </Link>
        <div className="text-xs sm:text-sm font-medium text-zinc-500 flex items-center gap-3">
          <span className="truncate max-w-[150px] sm:max-w-xs">{chapterTitle}</span>
          <span className="bg-zinc-100 px-2 py-1 rounded text-zinc-700">
            {currentIndex} / {totalChapters}
          </span>
        </div>
      </div>
    </div>
  );
}
