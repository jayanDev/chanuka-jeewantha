"use client";

import { useEffect, useMemo, useState } from "react";
import { readJsonSafely } from "@/app/admin/_components/admin-utils";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "in_progress" | "resolved" | "spam";
  createdAt: string;
};

type Tab = "new" | "in_progress" | "resolved" | "spam" | "all";

const statusLabels: Record<ContactMessage["status"], string> = {
  new:         "New",
  in_progress: "In Progress",
  resolved:    "Resolved",
  spam:        "Spam",
};

const statusColors: Record<ContactMessage["status"], string> = {
  new:         "bg-blue-100 text-blue-800",
  in_progress: "bg-amber-100 text-amber-800",
  resolved:    "bg-emerald-100 text-emerald-800",
  spam:        "bg-red-100 text-red-700",
};

export default function ContactsClient() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]        = useState("");
  const [tab, setTab]            = useState<Tab>("new");
  const [working, setWorking]    = useState<string | null>(null);
  const [search, setSearch]      = useState("");
  const [expanded, setExpanded]  = useState<Set<string>>(new Set());

  const loadMessages = async () => {
    const res = await fetch("/api/admin/contacts", { cache: "no-store" });
    const payload = await readJsonSafely(res);
    if (!res.ok) {
      setError(typeof payload.error === "string" ? payload.error : "Failed to load");
      setMessages([]);
    } else {
      setMessages(Array.isArray(payload.messages) ? (payload.messages as ContactMessage[]) : []);
      setError("");
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadMessages();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const refreshMessages = () => {
    setLoading(true);
    void loadMessages();
  };

  const updateStatus = async (id: string, status: ContactMessage["status"]) => {
    setWorking(id);
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
    setWorking(null);
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Permanently delete this message?")) return;
    setWorking(id);
    await fetch("/api/admin/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setWorking(null);
  };

  const toggleExpand = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const tabs: { key: Tab; label: string }[] = [
    { key: "new",         label: `New (${messages.filter(m => m.status === "new").length})` },
    { key: "in_progress", label: `In Progress (${messages.filter(m => m.status === "in_progress").length})` },
    { key: "resolved",    label: `Resolved (${messages.filter(m => m.status === "resolved").length})` },
    { key: "spam",        label: `Spam (${messages.filter(m => m.status === "spam").length})` },
    { key: "all",         label: `All (${messages.length})` },
  ];

  const displayed = useMemo(() => {
    const q = search.toLowerCase();
    return messages.filter((m) => {
      if (tab !== "all" && m.status !== tab) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    });
  }, [messages, tab, search]);

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="rounded-[16px] border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold font-plus-jakarta">Contact Inbox</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Messages submitted through the contact form.
            </p>
          </div>
          <button
            type="button"
            onClick={refreshMessages}
            disabled={loading}
            className="rounded-[10px] bg-foreground px-5 py-2.5 text-sm text-background disabled:opacity-60"
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-5 flex flex-wrap gap-1 border-b border-zinc-200 pb-0">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === key
                  ? "border-brand-main text-brand-main"
                  : "border-transparent text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mt-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, subject or message…"
            aria-label="Search contact messages"
            className="w-full rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-brand-main"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>

      {/* Messages */}
      {loading ? (
        <p className="text-sm text-zinc-500">Loading messages…</p>
      ) : displayed.length === 0 ? (
        <div className="rounded-[16px] border border-zinc-200 bg-white p-10 text-center">
          <p className="text-zinc-400 text-sm">No messages in this category.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((msg) => {
            const isExpanded = expanded.has(msg.id);
            return (
              <article
                key={msg.id}
                className={`rounded-[16px] border bg-white overflow-hidden transition-colors ${
                  msg.status === "new" ? "border-blue-200" : "border-zinc-200"
                }`}
              >
                {/* Collapsed row */}
                <button
                  type="button"
                  onClick={() => toggleExpand(msg.id)}
                  className="w-full text-left px-5 py-4 hover:bg-zinc-50 transition-colors"
                >
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[msg.status]}`}>
                          {statusLabels[msg.status]}
                        </span>
                        <span className="text-xs text-zinc-400">
                          {new Date(msg.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="font-semibold text-foreground text-sm truncate">
                        {msg.name}
                        {msg.subject ? ` — ${msg.subject}` : ""}
                      </p>
                      <p className="text-xs text-zinc-500 truncate">{msg.email}</p>
                    </div>
                    <span className="text-xs text-zinc-400 shrink-0">
                      {isExpanded ? "▲ Collapse" : "▼ Expand"}
                    </span>
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-zinc-100 px-5 py-4 space-y-4">
                    {/* Message body */}
                    <div className="rounded-[10px] bg-zinc-50 border border-zinc-200 p-4 text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </div>

                    {/* Quick reply link */}
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Your enquiry")}`}
                      className="inline-flex items-center gap-1.5 rounded-[8px] bg-brand-main px-4 py-2 text-sm font-semibold text-foreground hover:bg-brand-dark hover:text-background transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      Reply via Email
                    </a>

                    {/* Status actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mr-1">
                        Mark as:
                      </span>
                      {(["new", "in_progress", "resolved", "spam"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          disabled={working === msg.id || msg.status === s}
                          onClick={() => void updateStatus(msg.id, s)}
                          className={`rounded-[8px] border px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-40 ${
                            msg.status === s
                              ? statusColors[s]
                              : "border-zinc-200 text-zinc-600 hover:border-brand-main hover:text-brand-main"
                          }`}
                        >
                          {statusLabels[s]}
                        </button>
                      ))}
                      <button
                        type="button"
                        disabled={working === msg.id}
                        onClick={() => void deleteMessage(msg.id)}
                        className="ml-auto rounded-[8px] border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-40 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
