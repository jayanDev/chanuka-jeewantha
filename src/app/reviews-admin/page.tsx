"use client";

import { useMemo, useState } from "react";

type AdminReview = {
  id: string;
  name: string;
  message: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
};

export default function ReviewsAdminPage() {
  const [token, setToken] = useState("");
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const approvedCount = useMemo(
    () => reviews.filter((review) => review.isApproved).length,
    [reviews]
  );

  const pendingCount = reviews.length - approvedCount;

  const loadReviews = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/reviews/manage", {
        headers: {
          "x-review-admin-token": token,
        },
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error ?? "Failed to load reviews");
      }

      setReviews(payload.reviews ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  };

  const updateReviewStatus = async (id: string, isApproved: boolean) => {
    try {
      const response = await fetch("/api/reviews/manage", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-review-admin-token": token,
        },
        body: JSON.stringify({ id, isApproved }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error ?? "Failed to update review");
      }

      setReviews((previous) =>
        previous.map((review) =>
          review.id === id
            ? { ...review, isApproved: payload.review.isApproved }
            : review
        )
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update review");
    }
  };

  return (
 <section className="w-full min-h-screen bg-zinc-50 py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
 <div className="mb-8 rounded-[20px] border border-zinc-200 bg-white p-8">
          <h1 className="mb-2 text-[34px] font-bold font-heading text-foreground">Review Moderation</h1>
          <p className="mb-6 text-text-body">
            Enter your admin token to approve or hide client reviews. Only approved reviews appear on the testimonials page.
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="w-full">
              <label htmlFor="token" className="mb-2 block text-sm font-medium text-foreground">
                Review Admin Token
              </label>
              <input
                id="token"
                type="password"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                placeholder="Enter REVIEW_ADMIN_TOKEN"
 className="w-full rounded-[10px] border border-zinc-300 bg-white px-4 py-3 focus:border-brand-main focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={loadReviews}
              disabled={!token || isLoading}
              className="rounded-[10px] bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Loading..." : "Load Reviews"}
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}
        </div>

        {reviews.length > 0 && (
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
 <div className="rounded-[14px] border border-zinc-200 bg-white p-5">
              <p className="text-sm text-zinc-500">Total</p>
              <p className="text-2xl font-bold text-foreground">{reviews.length}</p>
            </div>
 <div className="rounded-[14px] border border-zinc-200 bg-white p-5">
              <p className="text-sm text-zinc-500">Approved</p>
              <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
            </div>
 <div className="rounded-[14px] border border-zinc-200 bg-white p-5">
              <p className="text-sm text-zinc-500">Pending</p>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
 <article key={review.id} className="rounded-[16px] border border-zinc-200 bg-white p-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold font-heading text-foreground">{review.name}</h2>
                  <p className="text-sm text-zinc-500">
                    Rating: {review.rating}/5 | {new Date(review.createdAt).toLocaleDateString("en-LK")}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    review.isApproved
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {review.isApproved ? "Approved" : "Pending"}
                </span>
              </div>

              <p className="mb-4 text-text-body">{review.message}</p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => updateReviewStatus(review.id, true)}
                  className="rounded-[10px] bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => updateReviewStatus(review.id, false)}
                  className="rounded-[10px] bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                >
                  Hide
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
