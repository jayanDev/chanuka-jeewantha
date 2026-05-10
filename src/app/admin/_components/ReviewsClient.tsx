"use client";

import { useEffect, useMemo, useState } from "react";
import { readJsonSafely } from "@/app/admin/_components/admin-utils";
import type { AdminReview } from "@/app/admin/_components/admin-types";

export default function ReviewsClient() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadReviews = async () => {
    const response = await fetch("/api/admin/reviews", { cache: "no-store" });
    const payload = await readJsonSafely(response);

    if (!response.ok) {
      setError(typeof payload.error === "string" ? payload.error : "Failed to load reviews");
      setReviews([]);
      return;
    }

    setError("");
    setReviews(Array.isArray(payload.reviews) ? (payload.reviews as AdminReview[]) : []);
  };

  useEffect(() => {
    let isActive = true;

    void (async () => {
      const response = await fetch("/api/admin/reviews", { cache: "no-store" });
      const payload = await readJsonSafely(response);
      if (!isActive) return;

      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to load reviews");
        setReviews([]);
        return;
      }

      setError("");
      setReviews(Array.isArray(payload.reviews) ? (payload.reviews as AdminReview[]) : []);
    })();

    return () => {
      isActive = false;
    };
  }, []);

  const pendingReviews = useMemo(() => reviews.filter((review) => !review.isApproved).length, [reviews]);

  const updateReviewApproval = async (id: string, isApproved: boolean) => {
    const response = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isApproved }),
    });

    if (response.ok) {
      setReviews((previous) => previous.map((review) => (review.id === id ? { ...review, isApproved } : review)));
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Permanently delete this review? This cannot be undone.")) return;
    setDeleting(id);
    const response = await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setReviews((previous) => previous.filter((r) => r.id !== id));
    }
    setDeleting(null);
  };

  const setAllPendingReviews = async (isApproved: boolean) => {
    const pending = reviews.filter((review) => review.isApproved !== isApproved);
    for (const review of pending) {
      await updateReviewApproval(review.id, isApproved);
    }
  };

  return (
    <section className="space-y-4">
      <div className="rounded-[16px] border border-zinc-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold font-heading">Review Approval</h2>
            <p className="text-sm text-zinc-500 mt-1">Pending: {pendingReviews} · Total: {reviews.length}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => void setAllPendingReviews(true)} className="rounded-[8px] bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">Approve All</button>
            <button type="button" onClick={() => void setAllPendingReviews(false)} className="rounded-[8px] bg-zinc-700 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors">Hide All</button>
            <button type="button" onClick={() => void loadReviews()} className="rounded-[8px] bg-foreground px-4 py-2 text-sm text-background">Refresh</button>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>

      {reviews.length === 0 && !error && (
        <div className="rounded-[16px] border border-zinc-200 bg-white p-10 text-center">
          <p className="text-zinc-400 text-sm">No reviews yet.</p>
        </div>
      )}

      {reviews.map((review) => (
        <article key={review.id} className={`rounded-[16px] border bg-white p-6 transition-colors ${review.isApproved ? "border-zinc-200" : "border-amber-200 bg-amber-50/30"}`}>
          <div className="mb-3 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-bold text-foreground">{review.name}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{new Date(review.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${review.isApproved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              {review.isApproved ? "✓ Approved" : "⏳ Pending"}
            </span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-3" aria-label={`Rating: ${review.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={i < review.rating ? "#f59e0b" : "#e4e4e7"} aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            ))}
            <span className="ml-1.5 text-xs text-zinc-500">{review.rating}/5</span>
          </div>

          <p className="mb-5 text-sm text-zinc-700 leading-relaxed">{review.message}</p>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-100">
            <button
              type="button"
              onClick={() => void updateReviewApproval(review.id, true)}
              disabled={review.isApproved}
              className="rounded-[8px] bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40 transition-colors"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => void updateReviewApproval(review.id, false)}
              disabled={!review.isApproved}
              className="rounded-[8px] bg-zinc-700 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-40 transition-colors"
            >
              Hide
            </button>
            <button
              type="button"
              onClick={() => void deleteReview(review.id)}
              disabled={deleting === review.id}
              className="ml-auto rounded-[8px] border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-40 transition-colors"
            >
              {deleting === review.id ? "Deleting…" : "Delete"}
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
