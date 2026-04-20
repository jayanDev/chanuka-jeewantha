"use client";

import { useState } from "react";

type Props = {
  postSlug: string;
};

export default function BlogCommentForm({ postSlug }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorText("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postSlug,
          name: form.name,
          email: form.email,
          message: form.message,
          website: form.website,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error ?? "Failed to send comment");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "", website: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Failed to send comment");
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <input
        type="text"
        value={form.website}
        onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />

      {status === "success" && (
        <p className="rounded-[10px] border border-brand-main/30 bg-brand-main/10 px-4 py-3 text-brand-dark">
          Comment submitted. It will appear after moderation.
        </p>
      )}

      {status === "error" && (
        <p className="rounded-[10px] border border-red-300 bg-red-50 px-4 py-3 text-red-700">
          {errorText}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="comment" className="text-sm font-medium text-foreground">Comment *</label>
        <textarea
          id="comment"
          rows={6}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          placeholder="Write your thoughts here..."
          required
 className="w-full resize-none rounded-[10px] border border-zinc-200 bg-white px-4 py-4 transition-colors focus:border-brand-main focus:outline-none focus:ring-1 focus:ring-brand-main"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Name *</label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="John Doe"
            required
 className="w-full rounded-[10px] border border-zinc-200 bg-white px-4 py-4 transition-colors focus:border-brand-main focus:outline-none focus:ring-1 focus:ring-brand-main"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email *</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="john@example.com"
            required
 className="w-full rounded-[10px] border border-zinc-200 bg-white px-4 py-4 transition-colors focus:border-brand-main focus:outline-none focus:ring-1 focus:ring-brand-main"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-fit rounded-[10px] bg-brand-main px-[32px] py-[16px] text-[16px] font-medium text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Posting..." : "Post a Comment"}
      </button>
    </form>
  );
}
