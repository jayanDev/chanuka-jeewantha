"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: string;
  name: string;
  email: string;
  message: string;
  isApproved: boolean;
  createdAt: string;
  post: { slug: string; title: string };
};

type Tab = "pending" | "approved";

export default function CommentsClient() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("pending");
  const [working, setWorking] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/comments")
      .then((r) => r.json())
      .then((data) => setComments(Array.isArray(data.comments) ? data.comments : []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, []);

  async function approve(id: string) {
    setWorking(id);
    await fetch(`/api/admin/comments/${id}/approve`, { method: "POST" });
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isApproved: true } : c))
    );
    setWorking(null);
  }

  async function remove(id: string) {
    setWorking(id);
    await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    setComments((prev) => prev.filter((c) => c.id !== id));
    setWorking(null);
  }

  const pending = comments.filter((c) => !c.isApproved);
  const approved = comments.filter((c) => c.isApproved);
  const displayed = tab === "pending" ? pending : approved;

  return (
    <div className="rounded-[20px] border border-zinc-200 bg-white p-6 md:p-8">
      <h2 className="text-2xl font-bold font-plus-jakarta text-foreground mb-6">Blog Comments</h2>

      <div className="mb-6 flex gap-2">
        {(["pending", "approved"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-[8px] px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t
                ? "bg-brand-main text-white"
                : "border border-zinc-200 text-zinc-600 hover:border-brand-main hover:text-brand-main"
            }`}
          >
            {t === "pending" ? `Pending (${pending.length})` : `Approved (${approved.length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-text-body text-sm">Loading comments…</p>
      ) : displayed.length === 0 ? (
        <p className="text-text-body text-sm">No {tab} comments.</p>
      ) : (
        <div className="space-y-4">
          {displayed.map((comment) => (
            <div key={comment.id} className="rounded-[16px] border border-zinc-200 bg-zinc-50 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-foreground text-sm">{comment.name}</p>
                  <p className="text-xs text-zinc-500">{comment.email}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Post:{" "}
                    <a
                      href={`/blog/${comment.post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-main hover:underline"
                    >
                      {comment.post.title}
                    </a>
                    {" · "}
                    {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!comment.isApproved && (
                    <button
                      type="button"
                      disabled={working === comment.id}
                      onClick={() => approve(comment.id)}
                      className="rounded-[8px] bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={working === comment.id}
                    onClick={() => remove(comment.id)}
                    className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed">{comment.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
