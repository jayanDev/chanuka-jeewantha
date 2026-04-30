"use client";

import { useEffect, useMemo, useState } from "react";
import { formatLkr, readJsonSafely } from "@/app/admin/_components/admin-utils";

// ── Types ──────────────────────────────────────────────────────────────────────
type RevenueDay = { date: string; revenue: number };
type TopPackage  = { name: string; revenue: number; count: number };
type CouponRow   = {
  code: string; title: string; discountPercent: number;
  maxTotalUses: number; usedCount: number;
  orderCount: number; discountGivenLkr: number;
};
type OfferRow = {
  id: string; title: string; discountPercent: number;
  impressionCount: number; cartAddCount: number; conversionCount: number;
  clickThroughRate: number; conversionRate: number;
};
type Monthly = {
  thisMonthRevenue: number; lastMonthRevenue: number;
  thisMonthOrders: number; lastMonthOrders: number;
  monthOverMonthPct: number | null;
};
type ReportData = {
  revenueChart: RevenueDay[];
  topPackages: TopPackage[];
  couponEffectiveness: CouponRow[];
  offerPerformance: OfferRow[];
  monthly: Monthly;
};

// ── Pure SVG sparkline chart (no deps) ────────────────────────────────────────
function SparklineChart({ data }: { data: RevenueDay[] }) {
  const W = 680;
  const H = 120;
  const PAD = { top: 12, right: 8, bottom: 28, left: 60 };

  const values  = data.map((d) => d.revenue);
  const maxVal  = Math.max(...values, 1);
  const innerW  = W - PAD.left - PAD.right;
  const innerH  = H - PAD.top - PAD.bottom;

  const points = data.map((d, i) => {
    const x = PAD.left + (i / Math.max(data.length - 1, 1)) * innerW;
    const y = PAD.top  + innerH - (d.revenue / maxVal) * innerH;
    return [x, y] as [number, number];
  });

  const pathD = points.reduce(
    (acc, [x, y], i) => acc + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`),
    ""
  );

  const areaD =
    pathD +
    ` L ${points[points.length - 1][0]} ${PAD.top + innerH}` +
    ` L ${points[0][0]} ${PAD.top + innerH} Z`;

  // Y-axis labels (4 gridlines)
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
    y: PAD.top + innerH - pct * innerH,
    label: formatLkr(Math.round(maxVal * pct)),
  }));

  // X-axis: show every 5th date label
  const xLabels = data
    .map((d, i) => ({ d, i }))
    .filter(({ i }) => i % 5 === 0 || i === data.length - 1);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      aria-label="Revenue over last 30 days"
      role="img"
    >
      {/* Grid lines */}
      {gridLines.map(({ y, label }) => (
        <g key={label}>
          <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#e4e4e7" strokeWidth="1" />
          <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#a1a1aa">
            {label}
          </text>
        </g>
      ))}

      {/* Area fill */}
      <path d={areaD} fill="url(#revenueGrad)" opacity="0.35" />

      {/* Line */}
      <path d={pathD} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Data dots */}
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#22c55e" />
      ))}

      {/* X-axis labels */}
      {xLabels.map(({ d, i }) => (
        <text
          key={d.date}
          x={points[i][0]}
          y={H - 4}
          textAnchor="middle"
          fontSize="8"
          fill="#a1a1aa"
        >
          {d.date.slice(5)} {/* MM-DD */}
        </text>
      ))}

      {/* Gradient def */}
      <defs>
        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Metric card ────────────────────────────────────────────────────────────────
function KpiCard({
  label, value, sub, accent,
}: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-[14px] border p-5 ${accent ? "border-emerald-200 bg-emerald-50" : "border-zinc-200 bg-white"}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
      <p className={`text-2xl font-bold font-plus-jakarta mt-1 ${accent ? "text-emerald-700" : "text-foreground"}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-zinc-400 mt-1">{sub}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ReportsClient() {
  const [data, setData]       = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [tab, setTab]         = useState<"revenue" | "packages" | "offers" | "coupons">("revenue");

  const load = async () => {
    const res     = await fetch("/api/admin/reports", { cache: "no-store" });
    const payload = await readJsonSafely(res);
    if (!res.ok) {
      setError(typeof payload.error === "string" ? payload.error : "Failed to load reports");
    } else {
      setData(payload as unknown as ReportData);
      setError("");
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const refresh = () => {
    setLoading(true);
    void load();
  };

  const mom = data?.monthly;
  const momPositive = mom && mom.monthOverMonthPct !== null && mom.monthOverMonthPct >= 0;

  // Highest bar in packages for the relative bar chart
  const maxPackageRevenue = useMemo(() =>
    Math.max(...(data?.topPackages.map((p) => p.revenue) ?? [1]), 1),
  [data]);

  // ── Tabs ─────────────────────────────────────────────────────────────────
  const tabs = [
    { key: "revenue"  as const, label: "Revenue Chart" },
    { key: "packages" as const, label: "Top Packages" },
    { key: "offers"   as const, label: "Offer Performance" },
    { key: "coupons"  as const, label: "Coupon Effectiveness" },
  ];

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="rounded-[16px] border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold font-plus-jakarta">Business Reports</h2>
            <p className="text-sm text-zinc-500 mt-1">Revenue trends, top packages, offer performance, and coupon stats.</p>
          </div>
          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="rounded-[10px] bg-foreground px-5 py-2.5 text-sm text-background disabled:opacity-60"
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>

      {/* Monthly KPI cards */}
      {mom && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <KpiCard
            label="This Month Revenue"
            value={formatLkr(mom.thisMonthRevenue)}
            sub={
              mom.monthOverMonthPct !== null
                ? `${momPositive ? "+" : ""}${mom.monthOverMonthPct}% vs last month`
                : "First month of data"
            }
            accent={momPositive ?? false}
          />
          <KpiCard label="Last Month Revenue" value={formatLkr(mom.lastMonthRevenue)} />
          <KpiCard label="This Month Orders"  value={String(mom.thisMonthOrders)} />
          <KpiCard label="Last Month Orders"  value={String(mom.lastMonthOrders)} />
        </div>
      )}

      {/* Tab nav */}
      <div className="rounded-[16px] border border-zinc-200 bg-white overflow-hidden">
        <div className="flex border-b border-zinc-200 overflow-x-auto">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === key
                  ? "border-brand-main text-brand-main"
                  : "border-transparent text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {loading && <p className="text-sm text-zinc-500">Loading…</p>}

          {/* ── Revenue Chart ─────────────────────────────────────────────── */}
          {!loading && tab === "revenue" && data && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Revenue Last 30 Days</h3>
                <p className="text-xs text-zinc-400">Only counts confirmed / in-progress / completed orders.</p>
              </div>
              <div className="rounded-[12px] border border-zinc-100 bg-zinc-50 p-4 overflow-x-auto">
                <SparklineChart data={data.revenueChart} />
              </div>
              {/* Table below chart */}
              <div className="overflow-x-auto text-sm">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...data.revenueChart].reverse().map((row) => (
                      <tr key={row.date} className="border-b border-zinc-50 hover:bg-zinc-50">
                        <td className="py-1.5 pr-4 text-zinc-500">{row.date}</td>
                        <td className={`py-1.5 font-semibold ${row.revenue > 0 ? "text-emerald-700" : "text-zinc-300"}`}>
                          {row.revenue > 0 ? formatLkr(row.revenue) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Top Packages ──────────────────────────────────────────────── */}
          {!loading && tab === "packages" && data && (
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Top Selling Packages</h3>
              {data.topPackages.length === 0 ? (
                <p className="text-sm text-zinc-400">No order item data yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.topPackages.map((pkg, i) => (
                    <div key={pkg.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">
                          <span className="text-zinc-400 mr-2">#{i + 1}</span>
                          {pkg.name}
                        </span>
                        <span className="font-bold text-emerald-700">{formatLkr(pkg.revenue)}</span>
                      </div>
                      {/* Relative bar */}
                      <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                          style={{ width: `${(pkg.revenue / maxPackageRevenue) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-zinc-400">{pkg.count} unit{pkg.count !== 1 ? "s" : ""} sold</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Offer Performance ─────────────────────────────────────────── */}
          {!loading && tab === "offers" && data && (
            <div>
              <h3 className="font-semibold text-foreground mb-4">Offer Performance</h3>
              {data.offerPerformance.length === 0 ? (
                <p className="text-sm text-zinc-400">No offer data yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Offer</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Discount</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Impressions</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Cart Adds</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">CTR</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Conversions</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Conv Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {data.offerPerformance.map((offer) => (
                        <tr key={offer.id} className="hover:bg-zinc-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground max-w-[200px] truncate">{offer.title}</td>
                          <td className="px-4 py-3 text-right text-zinc-600">{offer.discountPercent}%</td>
                          <td className="px-4 py-3 text-right text-zinc-600">{offer.impressionCount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-zinc-600">{offer.cartAddCount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">
                            <span className={`font-semibold ${offer.clickThroughRate > 5 ? "text-emerald-700" : "text-zinc-500"}`}>
                              {offer.clickThroughRate}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-zinc-600">{offer.conversionCount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">
                            <span className={`font-semibold ${offer.conversionRate > 10 ? "text-emerald-700" : "text-zinc-500"}`}>
                              {offer.conversionRate}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Coupon Effectiveness ──────────────────────────────────────── */}
          {!loading && tab === "coupons" && data && (
            <div>
              <h3 className="font-semibold text-foreground mb-4">Coupon Effectiveness</h3>
              {data.couponEffectiveness.length === 0 ? (
                <p className="text-sm text-zinc-400">No coupons created yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Code</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Title</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Discount</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Uses</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Max Uses</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Orders Linked</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Discount Given</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {data.couponEffectiveness.map((coupon) => {
                        const usagePct = coupon.maxTotalUses > 0
                          ? Math.round((coupon.usedCount / coupon.maxTotalUses) * 100)
                          : 0;
                        return (
                          <tr key={coupon.code} className="hover:bg-zinc-50 transition-colors">
                            <td className="px-4 py-3">
                              <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono font-bold text-foreground">
                                {coupon.code}
                              </code>
                            </td>
                            <td className="px-4 py-3 text-zinc-600">{coupon.title}</td>
                            <td className="px-4 py-3 text-right font-semibold text-zinc-700">{coupon.discountPercent}%</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex flex-col items-end gap-1">
                                <span className={`font-semibold ${usagePct > 80 ? "text-amber-600" : "text-zinc-700"}`}>
                                  {coupon.usedCount}
                                </span>
                                <div className="h-1 w-16 rounded-full bg-zinc-100">
                                  <div
                                    className={`h-full rounded-full transition-all ${usagePct > 80 ? "bg-amber-400" : "bg-brand-main"}`}
                                    style={{ width: `${usagePct}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right text-zinc-500">{coupon.maxTotalUses}</td>
                            <td className="px-4 py-3 text-right font-semibold text-zinc-700">{coupon.orderCount}</td>
                            <td className="px-4 py-3 text-right font-semibold text-emerald-700">
                              {coupon.discountGivenLkr > 0 ? formatLkr(coupon.discountGivenLkr) : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
