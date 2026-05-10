"use client";

import { useEffect, useState } from "react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isClosed = localStorage.getItem("announcementClosed") === "true";
    setIsVisible(!isClosed);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("announcementClosed", "true");
  };

  if (!isVisible) return null;

  return (
    <div
      className="announcement-bar w-full bg-gradient-to-r from-[#C9A961] to-[#B8985A] sticky top-0 z-[9999]"
      id="announcement-bar"
    >
      <div className="announcement-content max-w-[1512px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="announcement-icon text-xl">🎉</span>
          <span className="announcement-text text-sm sm:text-base font-medium text-[#0A2540]">
            <strong>New Bundle Pricing Available!</strong>
            <span className="hidden sm:inline"> Save up to 25% with our Career & Executive Packs.</span>
            <a href="/bundles" className="announcement-link ml-2 font-semibold underline hover:no-underline">
              See Bundles →
            </a>
          </span>
        </div>
        <button
          className="announcement-close flex-shrink-0 text-[#0A2540] hover:opacity-70 transition-opacity text-2xl leading-none"
          onClick={handleClose}
          aria-label="Close announcement"
        >
          ×
        </button>
      </div>
    </div>
  );
}
