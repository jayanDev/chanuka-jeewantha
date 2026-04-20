"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/blog/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-black/40 animate-in fade-in duration-200">
      {/* Overlay to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      
 <div className="relative w-full max-w-2xl bg-white rounded-[20px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-zinc-200 overflow-hidden transform transition-all">
        <form onSubmit={handleSearch} className="flex flex-col">
 <div className="relative flex items-center p-2 border-b border-zinc-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-6 text-brand-main">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent pl-[52px] pr-12 py-4 text-[17px] font-medium text-foreground outline-none placeholder-zinc-400"
              placeholder="Search CV tips, guides, and tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") onClose();
              }}
            />
            <button
              type="button"
              onClick={onClose}
 className="absolute right-4 p-2 text-zinc-400 hover:text-foreground transition-colors rounded-full hover:bg-zinc-100"
              aria-label="Close search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
 <div className="px-6 py-3 bg-zinc-50 flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-semibold tracking-wider uppercase flex items-center gap-2">
 <span className="bg-white border border-zinc-200 rounded px-1.5 py-0.5 text-[10px]">⏎</span>
              Enter to search
            </span>
            <span className="text-xs text-zinc-500 font-semibold tracking-wider uppercase flex items-center gap-2">
 <span className="bg-white border border-zinc-200 rounded px-1.5 py-0.5 text-[10px]">ESC</span>
              to close
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
