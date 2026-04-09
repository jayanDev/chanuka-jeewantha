"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HEARTBEAT_MS = 30_000;

function sendHeartbeat(path: string, activeMs: number) {
  void fetch("/api/analytics/ping", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, activeMs }),
    keepalive: true,
  }).catch(() => {});
}

export default function AnalyticsHeartbeat() {
  const pathname = usePathname();

  useEffect(() => {
    sendHeartbeat(pathname, 0);

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        sendHeartbeat(pathname, HEARTBEAT_MS);
      }
    }, HEARTBEAT_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [pathname]);

  return null;
}
