"use client";

import { useEffect, useMemo, useState } from "react";
import { formatLkr, readJsonSafely } from "@/app/admin/_components/admin-utils";

type AdminStats = {
  generatedAtMs: number;
  liveUsersLast30Min: number;
  totalUsers: number;
  averageStaySeconds: number;
  current: {
    totalOrders: number;
    completedOrders: number;
    paymentSubmittedOrders: number;
    pendingReviews: number;
    activeOffers: number;
    activeCoupons: number;
    totalRevenueLkr: number;
    conversionRatePercent: number;
  };
};

function formatStay(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}m ${remaining}s`;
}

export default function StatsClient() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadStats = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/stats", { cache: "no-store" });
      const payload = await readJsonSafely(response);

      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to load stats");
        setStats(null);
        return;
      }

      setStats(payload as unknown as AdminStats);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load stats");
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadStats();

    const interval = window.setInterval(() => {
      void loadStats();
    }, 60_000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // Action items that need attention right now
  const urgentActions = useMemo(() => {
    if (!stats) return [];
    const actions: { label: string; count: number; href: string; color: string }[] = [];

    if (stats.current.paymentSubmittedOrders > 0) {
      actions.push({
        label: "Payment(s) to verify",
        count: stats.current.paymentSubmittedOrders,
        href: "/admin/orders",
        color: "border-amber-300 bg-amber-50 text-amber-800",
      });
    }
    if (stats.current.pendingReviews > 0) {
      actions.push({
        label: "Review(s) awaiting approval",
        count: stats.current.pendingReviews,
        href: "/admin/reviews",
        color: "border-blue-200 bg-blue-50 text-blue-800",
      });
    }
    return actions;
  }, [stats]);

  const summaryCards = useMemo(() => {
    if (!stats) return [];
    return [
      {
        label: "Live Users",
        sublabel: "Last 30 min",
        value: String(stats.liveUsersLast30Min),
        color: stats.liveUsersLast30Min > 0 ? "border-emerald-200 bg-emerald-50" : undefined,
      },
      {
        label: "Total Users",
        sublabel: "All time",
        value: String(stats.totalUsers),
      },
      {
        label: "Avg Stay",
        sublabel: "Active session",
        value: formatStay(stats.averageStaySeconds),
      },
      {
        label: "Total Revenue",
        sublabel: "All orders",
        value: formatLkr(stats.current.totalRevenueLkr),
        color: "border-brand-main/30 bg-brand-main/5",
      },
    ];
  }, [stats]);

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="rounded-[16px] border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold font-heading">Dashboard Overview</h2>
            <p className="text-sm text-zinc-500 mt-1">
              {stats
                ? `Last refreshed: ${new Date(stats.generatedAtMs).toLocaleTimeString("en-LK")}`
                : "Live activity and current business performance."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadStats()}
            disabled={isLoading}
            className="rounded-[10px] bg-foreground px-5 py-2.5 text-sm text-background disabled:opacity-60"
          >
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>

      {/* Urgent action panel */}
      {urgentActions.length > 0 && (
        <div className="rounded-[16px] border border-amber-200 bg-amber-50 p-5">
          <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            Action Required
          </h3>
          <div className="flex flex-wrap gap-3">
            {urgentActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={`flex items-center gap-3 rounded-[10px] border px-4 py-3 font-semibold text-sm transition-opacity hover:opacity-80 ${action.color}`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-current/10 text-base font-bold">
                  {action.count}
                </span>
                {action.label}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* No actions needed */}
      {stats && urgentActions.length === 0 && (
        <div className="rounded-[16px] border border-emerald-200 bg-emerald-50 px-5 py-4 flex items-center gap-3 text-sm text-emerald-800 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
          All clear — no pending payments or reviews.
        </div>
      )}

      {/* Summary KPI cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className={`rounded-[14px] border p-5 ${card.color ?? "border-zinc-200 bg-white"}`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{card.label}</p>
            <p className="text-3xl font-bold font-heading text-foreground mt-1">{card.value}</p>
            <p className="text-xs text-zinc-400 mt-1">{card.sublabel}</p>
          </article>
        ))}
      </div>

      {/* Order + Campaign stats */}
      {stats && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Orders</p>
            <p className="text-2xl font-bold font-heading text-foreground">{stats.current.totalOrders}</p>
            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Completed</span>
                <span className="font-semibold text-emerald-700">{stats.current.completedOrders}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Payment Submitted</span>
                <span className={`font-semibold ${stats.current.paymentSubmittedOrders > 0 ? "text-amber-700" : "text-zinc-400"}`}>
                  {stats.current.paymentSubmittedOrders}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Conversion Rate</span>
                <span className="font-semibold text-foreground">{stats.current.conversionRatePercent}%</span>
              </div>
            </div>
          </article>

          <article className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Moderation</p>
            <div className="space-y-3 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600">Pending Reviews</span>
                <span className={`text-sm font-bold rounded-full px-2.5 py-0.5 ${stats.current.pendingReviews > 0 ? "bg-amber-100 text-amber-800" : "bg-zinc-100 text-zinc-500"}`}>
                  {stats.current.pendingReviews}
                </span>
              </div>
            </div>
          </article>

          <article className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Campaigns</p>
            <div className="space-y-3 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600">Active Offers</span>
                <span className={`text-sm font-bold rounded-full px-2.5 py-0.5 ${stats.current.activeOffers > 0 ? "bg-brand-main/20 text-brand-dark" : "bg-zinc-100 text-zinc-500"}`}>
                  {stats.current.activeOffers}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600">Active Coupons</span>
                <span className={`text-sm font-bold rounded-full px-2.5 py-0.5 ${stats.current.activeCoupons > 0 ? "bg-brand-main/20 text-brand-dark" : "bg-zinc-100 text-zinc-500"}`}>
                  {stats.current.activeCoupons}
                </span>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
