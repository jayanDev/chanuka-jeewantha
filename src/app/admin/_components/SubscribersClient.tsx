"use client";

import { useEffect, useMemo, useState } from "react";
import { readJsonSafely } from "@/app/admin/_components/admin-utils";

type Subscriber = {
  id: string;
  email: string;
  status: "active" | "unsubscribed" | "bounced";
  createdAt: string;
};

const statusColors: Record<Subscriber["status"], string> = {
  active:       "bg-emerald-100 text-emerald-800",
  unsubscribed: "bg-zinc-100 text-zinc-600",
  bounced:      "bg-red-100 text-red-700",
};

export default function SubscribersClient() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [search, setSearch]           = useState("");
  const [statusFilter, setFilter]     = useState<"all" | Subscriber["status"]>("all");
  const [working, setWorking]         = useState<string | null>(null);
  const [totalActive, setTotal]       = useState(0);
  const [totalUnsub, setTotalUnsub]   = useState(0);

  const load = async () => {
    const res = await fetch("/api/admin/subscribers", { cache: "no-store" });
    const payload = await readJsonSafely(res);
    if (!res.ok) {
      setError(typeof payload.error === "string" ? payload.error : "Failed to load");
    } else {
      setSubscribers(Array.isArray(payload.subscribers) ? (payload.subscribers as Subscriber[]) : []);
      setTotal(typeof payload.totalActive === "number" ? payload.totalActive : 0);
      setTotalUnsub(typeof payload.totalUnsubscribed === "number" ? payload.totalUnsubscribed : 0);
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

  const updateStatus = async (id: string, status: Subscriber["status"]) => {
    setWorking(id);
    await fetch("/api/admin/subscribers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setSubscribers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
    setWorking(null);
  };

  const exportCsv = () => {
    window.location.href = "/api/admin/subscribers?format=csv";
  };

  const displayed = useMemo(() => {
    const q = search.toLowerCase();
    return subscribers.filter((s) => {
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      return !q || s.email.toLowerCase().includes(q);
    });
  }, [subscribers, search, statusFilter]);

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="rounded-[16px] border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold font-plus-jakarta">Newsletter Subscribers</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Everyone who signed up for your newsletter.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={exportCsv}
              className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:border-brand-main hover:text-brand-main transition-colors"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="rounded-[10px] bg-foreground px-5 py-2.5 text-sm text-background disabled:opacity-60"
            >
              {loading ? "Loading…" : "Refresh"}
            </button>
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-5 grid grid-cols-3 gap-4">
          <div className="rounded-[12px] border border-zinc-200 p-4 text-center">
            <p className="text-2xl font-bold font-plus-jakarta text-foreground">{subscribers.length}</p>
            <p className="text-xs text-zinc-500 mt-1">Total</p>
          </div>
          <div className="rounded-[12px] border border-emerald-200 bg-emerald-50 p-4 text-center">
            <p className="text-2xl font-bold font-plus-jakarta text-emerald-700">{totalActive}</p>
            <p className="text-xs text-emerald-600 mt-1">Active</p>
          </div>
          <div className="rounded-[12px] border border-zinc-200 p-4 text-center">
            <p className="text-2xl font-bold font-plus-jakarta text-zinc-500">{totalUnsub}</p>
            <p className="text-xs text-zinc-400 mt-1">Unsubscribed</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email…"
            aria-label="Search subscribers"
            className="flex-1 rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-brand-main"
          />
          <select
            value={statusFilter}
            onChange={(e) => setFilter(e.target.value as typeof statusFilter)}
            aria-label="Filter by status"
            className="rounded-[10px] border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand-main"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
            <option value="bounced">Bounced</option>
          </select>
        </div>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-sm text-zinc-500">Loading subscribers…</p>
      ) : displayed.length === 0 ? (
        <div className="rounded-[16px] border border-zinc-200 bg-white p-10 text-center">
          <p className="text-zinc-400 text-sm">No subscribers found.</p>
        </div>
      ) : (
        <div className="rounded-[16px] border border-zinc-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Signed Up</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {displayed.map((sub) => (
                  <tr key={sub.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{sub.email}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[sub.status]}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-500">
                      {new Date(sub.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3 text-right">
                      {sub.status !== "unsubscribed" && (
                        <button
                          type="button"
                          disabled={working === sub.id}
                          onClick={() => void updateStatus(sub.id, "unsubscribed")}
                          className="rounded border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:border-red-300 hover:text-red-600 disabled:opacity-40 transition-colors"
                        >
                          Unsubscribe
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-zinc-100 text-xs text-zinc-400">
            Showing {displayed.length} of {subscribers.length} subscribers
          </div>
        </div>
      )}
    </section>
  );
}
