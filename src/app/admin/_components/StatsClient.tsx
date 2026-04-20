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

  const cards = useMemo(() => {
    if (!stats) return [];
    return [
      { label: "Live Users (30 min)", value: String(stats.liveUsersLast30Min) },
      { label: "Total Users", value: String(stats.totalUsers) },
      { label: "Avg Stay Time", value: formatStay(stats.averageStaySeconds) },
      { label: "Total Revenue", value: formatLkr(stats.current.totalRevenueLkr) },
    ];
  }, [stats]);

  return (
    <section className="space-y-5">
      <div className="rounded-[16px] border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold font-plus-jakarta">Stats</h2>
            <p className="text-sm text-zinc-600">Live activity and current business performance.</p>
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">{card.label}</p>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
          </article>
        ))}
      </div>

      {stats && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Orders</p>
            <p className="text-2xl font-bold text-foreground">{stats.current.totalOrders}</p>
            <p className="text-sm text-zinc-600 mt-1">Completed: {stats.current.completedOrders}</p>
            <p className="text-sm text-zinc-600">Payment Submitted: {stats.current.paymentSubmittedOrders}</p>
          </article>

          <article className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Engagement</p>
            <p className="text-2xl font-bold text-foreground">{stats.current.conversionRatePercent}%</p>
            <p className="text-sm text-zinc-600 mt-1">Order Conversion Rate</p>
          </article>

          <article className="rounded-[14px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Moderation & Campaigns</p>
            <p className="text-sm text-zinc-700 mt-2">Pending Reviews: {stats.current.pendingReviews}</p>
            <p className="text-sm text-zinc-700">Active Offers: {stats.current.activeOffers}</p>
            <p className="text-sm text-zinc-700">Active Coupons: {stats.current.activeCoupons}</p>
          </article>
        </div>
      )}
    </section>
  );
}
