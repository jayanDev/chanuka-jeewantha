"use client";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getServerSnapshot = () => true;
function getClosedSnapshot() {
  try { return localStorage.getItem("pricingAnnouncementClosed") === "true"; }
  catch { return false; }
}

export default function AnnouncementBar() {
  const closedOnDevice = useSyncExternalStore(subscribe, getClosedSnapshot, getServerSnapshot);
  const [closedNow, setClosedNow] = useState(false);
  if (closedOnDevice || closedNow) return null;
  const close = () => {
    setClosedNow(true);
    try { localStorage.setItem("pricingAnnouncementClosed", "true"); }
    catch { /* Keep dismissal working when browser storage is unavailable. */ }
  };
  return <div id="announcement-bar" className="announcement-bar sticky top-0 z-[9999] w-full bg-brand-main">
    <div className="mx-auto flex max-w-[1512px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <p className="text-sm font-medium text-foreground sm:text-base"><strong>Essential &amp; Signature package prices updated.</strong>{" "}<Link href="/pricing" className="!text-foreground font-semibold underline hover:no-underline">View Prices →</Link></p>
      <button onClick={close} aria-label="Close announcement" className="shrink-0 text-2xl text-foreground">×</button>
    </div>
  </div>;
}
