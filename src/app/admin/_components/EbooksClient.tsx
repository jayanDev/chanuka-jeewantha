"use client";

import { useEffect, useState } from "react";
import { readJsonSafely, formatLkr } from "@/app/admin/_components/admin-utils";
import { ebooks } from "@/lib/ebooks";

type EbookPurchase = {
  id: string;
  email: string;
  ebookSlug: string;
  tier: "read" | "download";
  grantedAt: string;
  grantedBy: string;
  note: string | null;
};

const ebookTitles: Record<string, string> = Object.fromEntries(
  ebooks.map((e) => [e.slug, e.title])
);

export default function EbooksClient() {
  const [purchases, setPurchases] = useState<EbookPurchase[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formEmail, setFormEmail] = useState("");
  const [formSlug, setFormSlug] = useState(ebooks[0]?.slug ?? "");
  const [formTier, setFormTier] = useState<"read" | "download">("read");
  const [formNote, setFormNote] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const [search, setSearch] = useState("");

  const loadPurchases = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/ebooks", { cache: "no-store" });
      const payload = await readJsonSafely(res);
      if (!res.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to load");
        return;
      }
      setPurchases(Array.isArray(payload.purchases) ? (payload.purchases as EbookPurchase[]) : []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPurchases();
  }, []);

  const grantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.trim()) {
      setError("Email is required");
      return;
    }
    setFormLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/ebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formEmail.trim(), ebookSlug: formSlug, tier: formTier, note: formNote.trim() || undefined }),
      });
      const payload = await readJsonSafely(res);
      if (!res.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to grant access");
        return;
      }
      setFormEmail("");
      setFormNote("");
      await loadPurchases();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to grant access");
    } finally {
      setFormLoading(false);
    }
  };

  const revokeAccess = async (id: string) => {
    if (!confirm("Revoke ebook access for this email?")) return;
    setError("");
    try {
      const res = await fetch(`/api/admin/ebooks?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) {
        const payload = await readJsonSafely(res);
        setError(typeof payload.error === "string" ? payload.error : "Failed to revoke");
        return;
      }
      await loadPurchases();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to revoke");
    }
  };

  const filtered = purchases.filter(
    (p) =>
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      (ebookTitles[p.ebookSlug] ?? p.ebookSlug).toLowerCase().includes(search.toLowerCase())
  );

  const readCount = purchases.filter((p) => p.tier === "read").length;
  const downloadCount = purchases.filter((p) => p.tier === "download").length;
  const totalRevenue = readCount * 500 + downloadCount * 1500;

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[16px] border border-zinc-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">Read Access</p>
          <p className="text-3xl font-bold font-plus-jakarta text-foreground">{readCount}</p>
          <p className="text-xs text-zinc-400 mt-1">@ LKR 500 each</p>
        </div>
        <div className="rounded-[16px] border border-zinc-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">Download Access</p>
          <p className="text-3xl font-bold font-plus-jakarta text-foreground">{downloadCount}</p>
          <p className="text-xs text-zinc-400 mt-1">@ LKR 1,500 each</p>
        </div>
        <div className="rounded-[16px] border border-brand-main/20 bg-brand-main/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-main mb-1">Est. Revenue</p>
          <p className="text-3xl font-bold font-plus-jakarta text-foreground">{formatLkr(totalRevenue)}</p>
          <p className="text-xs text-zinc-400 mt-1">Total ebook sales</p>
        </div>
      </div>

      {/* Grant Access Form */}
      <div className="rounded-[20px] border border-zinc-200 bg-white p-6 md:p-8">
        <h2 className="text-xl font-bold font-plus-jakarta text-foreground mb-5">Grant Ebook Access</h2>
        <form onSubmit={(e) => void grantAccess(e)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Customer Email *</label>
            <input
              type="email"
              required
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              placeholder="customer@example.com"
              className="w-full rounded-[10px] border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-brand-main focus:ring-2 focus:ring-brand-main/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Ebook</label>
            <select
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              className="w-full rounded-[10px] border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-brand-main focus:ring-2 focus:ring-brand-main/10 bg-white"
            >
              {ebooks.filter((e) => e.category === "paid").map((e) => (
                <option key={e.slug} value={e.slug}>{e.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Access Tier</label>
            <select
              value={formTier}
              onChange={(e) => setFormTier(e.target.value as "read" | "download")}
              className="w-full rounded-[10px] border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-brand-main focus:ring-2 focus:ring-brand-main/10 bg-white"
            >
              <option value="read">Read Online — LKR 500</option>
              <option value="download">Download + Read — LKR 1,500</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Note (optional)</label>
            <input
              type="text"
              value={formNote}
              onChange={(e) => setFormNote(e.target.value)}
              placeholder="e.g. Payment ref #12345"
              className="w-full rounded-[10px] border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-brand-main focus:ring-2 focus:ring-brand-main/10"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={formLoading}
              className="rounded-[10px] bg-brand-main px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
            >
              {formLoading ? "Granting..." : "Grant Access"}
            </button>
          </div>
        </form>
      </div>

      {/* Access List */}
      <div className="rounded-[20px] border border-zinc-200 bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-xl font-bold font-plus-jakarta text-foreground">Access Records ({purchases.length})</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email or ebook..."
            className="rounded-[10px] border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-brand-main w-full sm:w-64"
          />
        </div>

        {loading ? (
          <p className="text-sm text-zinc-400 py-8 text-center">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-zinc-400 py-8 text-center">No records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left py-3 px-2 font-semibold text-zinc-500">Email</th>
                  <th className="text-left py-3 px-2 font-semibold text-zinc-500">Ebook</th>
                  <th className="text-left py-3 px-2 font-semibold text-zinc-500">Tier</th>
                  <th className="text-left py-3 px-2 font-semibold text-zinc-500">Granted</th>
                  <th className="text-left py-3 px-2 font-semibold text-zinc-500">Note</th>
                  <th className="py-3 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                    <td className="py-3 px-2 font-medium text-foreground">{p.email}</td>
                    <td className="py-3 px-2 text-zinc-600 max-w-[200px] truncate">{ebookTitles[p.ebookSlug] ?? p.ebookSlug}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        p.tier === "download"
                          ? "bg-brand-main/10 text-brand-dark"
                          : "bg-zinc-100 text-zinc-600"
                      }`}>
                        {p.tier === "download" ? "Download + Read" : "Read Only"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-zinc-400 whitespace-nowrap">
                      {new Date(p.grantedAt).toLocaleDateString("en-LK")}
                    </td>
                    <td className="py-3 px-2 text-zinc-400 max-w-[150px] truncate">{p.note ?? "—"}</td>
                    <td className="py-3 px-2">
                      <button
                        onClick={() => void revokeAccess(p.id)}
                        className="rounded-[8px] border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
