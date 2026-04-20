"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpNumberProps {
  /** The final numeric value to count up to */
  end: number;
  /** Display suffix shown after the number, e.g. "+" or "K+" */
  suffix?: string;
  /** Display prefix shown before the number, e.g. "$" */
  prefix?: string;
  /** Duration of count-up animation in ms (default 1800) */
  duration?: number;
  /** Tailwind/custom className for the outer span */
  className?: string;
}

/**
 * Animates a number counting up from 0 to `end` when the element enters the viewport.
 * Respects `prefers-reduced-motion` — shows the final value immediately if motion is reduced.
 */
export default function CountUpNumber({
  end,
  suffix = "",
  prefix = "",
  duration = 1800,
  className = "",
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startValue + eased * (end - startValue)));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };

    requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${end}${suffix}`}>
      {prefix}{count}{suffix}
    </span>
  );
}
