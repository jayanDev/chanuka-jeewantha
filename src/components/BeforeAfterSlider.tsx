"use client";

import { useCallback, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  /** Image shown on the left (before) half */
  beforeSrc: string;
  beforeAlt: string;
  /** Image shown on the right (after) half */
  afterSrc: string;
  afterAlt: string;
  /** Initial divider position as percentage 0–100 (default 50) */
  initialPosition?: number;
  className?: string;
}

/**
 * Drag-handle before/after image comparison slider.
 * Fully keyboard accessible (arrow keys move the divider by 5%).
 * Works with touch and mouse.
 */
export default function BeforeAfterSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  initialPosition = 50,
  className = "",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const { left, width } = container.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
    else if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
  }, []);

  return (
    <div
      ref={containerRef}
 className={`relative select-none overflow-hidden rounded-[20px] border border-zinc-200 shadow-lg ${className}`}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ cursor: isDragging ? "col-resize" : "default" }}
      role="img"
      aria-label={`Before and after comparison: ${beforeAlt} vs ${afterAlt}`}
    >
      {/* AFTER image (full width, underneath) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="block w-full h-full object-cover"
        draggable={false}
      />

      {/* BEFORE image (clipped to left of divider) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 rounded-full bg-zinc-900/70 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-sm pointer-events-none">
        Before
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-brand-main/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-sm pointer-events-none">
        After
      </span>

      {/* Divider line */}
      <div
 className="absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      />

      {/* Drag handle */}
      <button
        type="button"
 className="absolute top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl ring-2 ring-brand-main focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-main transition-transform hover:scale-110 active:scale-95"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={() => { setIsDragging(true); }}
        onTouchMove={onTouchMove}
        onTouchEnd={() => { setIsDragging(false); }}
        onKeyDown={onKeyDown}
        aria-label={`Slide to compare before and after. Current position: ${Math.round(position)}%`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        role="slider"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-dark"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
    </div>
  );
}
