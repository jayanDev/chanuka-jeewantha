"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { readJsonSafely } from "@/app/admin/_components/admin-utils";

type BlogPost = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string | null;
  totalComments: number;
  pendingComments: number;
};

export default function BlogClient() {
  const [posts, setPosts]     = useState<BlogPost[]>([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [search, setSearch]   = useState("");
  const [catFilter, setCat]   = useState("all");

  const load = async () => {
    const res     = await fetch("/api/admin/blog", { cache: "no-store" });
    const payload = await readJsonSafely(res);
    if (!res.ok) {
      setError(typeof payload.error === "string" ? payload.error : "Failed to load blog posts");
    } else {
      setPosts(Array.isArray(payload.posts) ? (payload.posts as BlogPost[]) : []);
      setTotal(typeof payload.total === "number" ? payload.total : 0);
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

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(posts.map((p) => p.category))).sort()],
    [posts]
  );

  const displayed = useMemo(() => {
    const q = search.toLowerCase();
    return posts.filter((p) => {
      if (catFilter !== "all" && p.category !== catFilter) return false;
      return !q || p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
    });
  }, [posts, search, catFilter]);

  const totalPending = useMemo(
    () => posts.reduce((s, p) => s + p.pendingComments, 0),
    [posts]
  );

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="rounded-[16px] border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold font-plus-jakarta">Blog Manager</h2>
            <p className="text-sm text-zinc-500 mt-1">
              {total} published posts
              {totalPending > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                  {totalPending} pending comment{totalPending !== 1 ? "s" : ""}
                </span>
              )}
            </p>
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

        {/* Filters */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or slug…"
            aria-label="Search blog posts"
            className="flex-1 rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-brand-main"
          />
          <select
            value={catFilter}
            onChange={(e) => setCat(e.target.value)}
            aria-label="Filter by category"
            className="rounded-[10px] border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand-main"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === "all" ? "All categories" : c}</option>
            ))}
          </select>
        </div>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>

      {/* Posts table */}
      {loading ? (
        <p className="text-sm text-zinc-500">Loading posts…</p>
      ) : displayed.length === 0 ? (
        <div className="rounded-[16px] border border-zinc-200 bg-white p-10 text-center">
          <p className="text-zinc-400 text-sm">No posts found.</p>
        </div>
      ) : (
        <div className="rounded-[16px] border border-zinc-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Title</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 hidden md:table-cell">Category</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 hidden lg:table-cell">Published</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Comments</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {displayed.map((post) => (
                  <tr key={post.slug} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">{post.slug}</p>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-500 text-xs hidden lg:table-cell">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <span className="text-xs font-semibold text-zinc-700">{post.totalComments}</span>
                        {post.pendingComments > 0 && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                            {post.pendingComments} pending
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-[8px] border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:border-brand-main hover:text-brand-main transition-colors"
                        >
                          View Post ↗
                        </a>
                        <Link
                          href="/admin/comments"
                          className="rounded-[8px] border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:border-brand-main hover:text-brand-main transition-colors"
                        >
                          Comments
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-zinc-100 text-xs text-zinc-400">
            Showing {displayed.length} of {total} posts
          </div>
        </div>
      )}
    </section>
  );
}
