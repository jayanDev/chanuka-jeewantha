"use client";

import { useEffect, useMemo, useState } from "react";
import { readJsonSafely } from "@/app/admin/_components/admin-utils";
import type { AdminReview } from "@/app/admin/_components/admin-types";

export default function ReviewsClient() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [error, setError] = useState("");

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
            <h2 className="text-2xl font-bold font-plus-jakarta">Review Approval</h2>
 <p className="text-sm text-zinc-600">Pending reviews: {pendingReviews}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => void setAllPendingReviews(true)} className="rounded bg-green-600 px-4 py-2 text-sm text-white">Approve All</button>
            <button type="button" onClick={() => void setAllPendingReviews(false)} className="rounded bg-zinc-700 px-4 py-2 text-sm text-white">Hide All</button>
            <button type="button" onClick={() => void loadReviews()} className="rounded bg-foreground px-4 py-2 text-sm text-background">Refresh</button>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>

      {reviews.map((review) => (
 <article key={review.id} className="rounded-[16px] border border-zinc-200 bg-white p-6">
          <div className="mb-2 flex items-center justify-between gap-4">
            <h3 className="font-bold text-foreground">{review.name}</h3>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${review.isApproved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
              {review.isApproved ? "Approved" : "Pending"}
            </span>
          </div>
 <p className="mb-2 text-sm text-zinc-700">Rating: {review.rating}/5</p>
 <p className="mb-4 text-sm text-zinc-700">{review.message}</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => void updateReviewApproval(review.id, true)} className="rounded bg-green-600 px-4 py-2 text-sm text-white">Approve</button>
            <button type="button" onClick={() => void updateReviewApproval(review.id, false)} className="rounded bg-zinc-700 px-4 py-2 text-sm text-white">Hide</button>
          </div>
        </article>
      ))}

      {reviews.length === 0 && <p className="text-sm text-zinc-500">No reviews available.</p>}
    </section>
  );
}
