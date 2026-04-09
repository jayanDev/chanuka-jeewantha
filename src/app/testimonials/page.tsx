"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

type Review = {
  id: string;
  name: string;
  message: string;
  rating: number;
  createdAt: string;
};

const emptyForm = {
  name: "",
  review: "",
  rating: 5,
  website: "",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-brand-main">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [formData, setFormData] = useState(emptyForm);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoadingReviews(true);
        const response = await fetch("/api/reviews", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to load reviews");

        const data = await response.json();
        setReviews(data.reviews ?? []);
      } catch {
        setErrorText("Unable to load reviews right now.");
      } finally {
        setIsLoadingReviews(false);
      }
    };

    void loadReviews();
  }, []);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }, [reviews]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorText("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error ?? "Failed to submit review.");
      }

      setStatus("success");
      setFormData(emptyForm);
    } catch (error: unknown) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. Hero Section */}
      <section className="w-full bg-foreground text-white pt-[100px] pb-[96px] relative overflow-hidden">
        {/* Background Marquee Text */}
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                TESTIMONIALS
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Testimonials</span>
          </div>
          <h1 className="font-plus-jakarta text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            See what my clients have to <span className="text-brand-main">say about me.</span>
          </h1>
        </div>
      </section>

      {/* 2. Highlight Quote & Profile */}
      <section className="w-full py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-[48px]">
            {/* Left Image */}
            <div className="relative w-full lg:w-1/2 h-[488px] lg:h-[664px] rounded-[30px] overflow-hidden flex-shrink-0 border border-zinc-200">
              <Image
                src="/images/testimonial-chanuka.jpg"
                alt="Chanuka Jeewantha testimonial profile"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            
            {/* Right Quote Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="w-16 h-16 text-brand-light opacity-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path></svg>
              </div>
              <h2 className="text-[32px] md:text-[40px] font-bold font-plus-jakarta text-foreground leading-[1.2]">
                Hi, I am Chanuka Jeewantha
              </h2>
              <p className="text-[24px] md:text-[32px] font-medium text-text-body leading-relaxed italic">
                "A strong career is not built by guesswork. It is built by clarity, positioning, and proof."
              </p>
              <div className="rounded-[16px] border border-zinc-200 bg-zinc-50 p-5">
                <p className="text-sm uppercase tracking-wide text-zinc-500 mb-2">Public review summary</p>
                <div className="flex items-center gap-4">
                  <Stars rating={Math.round(averageRating)} />
                  <p className="font-semibold text-foreground">
                    {reviews.length > 0
                      ? `${averageRating.toFixed(1)} / 5 from ${reviews.length} reviews`
                      : "No reviews yet - be the first to share feedback"}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="px-[32px] py-[16px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] font-medium transition-colors inline-block">
                  Work With Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Review Form */}
      <section className="w-full py-[96px] bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-[920px] mx-auto px-4 md:px-6">
          <div className="bg-white rounded-[24px] border border-zinc-200 p-8 md:p-10 shadow-sm">
            <h2 className="text-[32px] md:text-[40px] font-bold font-plus-jakarta text-foreground mb-2">
              Leave Your Review
            </h2>
            <p className="text-text-body mb-8 text-lg">
              No sign in required. Share your name, rating, and feedback after using my services.
            </p>

            {status === "success" && (
              <div className="mb-6 rounded-[12px] border border-green-200 bg-green-50 p-4 text-green-700 font-medium">
                Thank you. Your review was submitted and is now pending approval.
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 rounded-[12px] border border-red-200 bg-red-50 p-4 text-red-700 font-medium">
                {errorText || "Unable to submit your review right now."}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={formData.website}
                onChange={(event) => setFormData((prev) => ({ ...prev, website: event.target.value }))}
                name="website"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">Your Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  required
                  minLength={2}
                  maxLength={80}
                  placeholder="Your name"
                  className="w-full rounded-[10px] border border-zinc-300 bg-white px-4 py-3 focus:border-brand-main focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Rating</label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, rating: value }))}
                      className="rounded-md p-1"
                      aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill={value <= formData.rating ? "currentColor" : "none"}
                        stroke="currentColor"
                        className={value <= formData.rating ? "text-brand-main" : "text-zinc-400"}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </button>
                  ))}
                  <span className="text-sm font-medium text-text-body">{formData.rating} / 5</span>
                </div>
              </div>

              <div>
                <label htmlFor="review" className="mb-2 block text-sm font-medium text-foreground">Your Review</label>
                <textarea
                  id="review"
                  value={formData.review}
                  onChange={(event) => setFormData((prev) => ({ ...prev, review: event.target.value }))}
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={5}
                  placeholder="Share your experience"
                  className="w-full rounded-[10px] border border-zinc-300 bg-white px-4 py-3 focus:border-brand-main focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-8 py-3 font-medium text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 4. Client Reviews Grid */}
      <section className="w-full py-[96px] bg-zinc-50">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6">
          {isLoadingReviews ? (
            <p className="text-center text-text-body text-lg">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="rounded-[20px] border border-zinc-200 bg-white p-10 text-center">
              <p className="text-lg text-text-body">
                No reviews submitted yet. Share this page with your clients and collect your first review.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <article key={review.id} className="bg-white border border-zinc-200 rounded-[20px] p-8 flex flex-col gap-6 hover:shadow-md transition-shadow">
                  <Stars rating={review.rating} />
                  <p className="text-[16px] italic text-text-body/90 flex-grow">
                    "{review.message}"
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-bold font-plus-jakarta text-[18px] text-foreground">{review.name}</h4>
                    <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                      {new Date(review.createdAt).toLocaleDateString("en-LK")}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}