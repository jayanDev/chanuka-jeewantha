"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const params = useSearchParams();
  const returnTo = params.get("returnTo") ?? "/";
  const oauthError = params.get("oauthError") ?? "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const displayError = error || oauthError;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error ?? "Failed to sign up");
      }

      router.push(returnTo);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
 <section className="w-full py-20 bg-zinc-50 min-h-[70vh]">
      <div className="max-w-lg mx-auto px-4">
 <div className="rounded-[20px] border border-zinc-200 bg-white p-8 md:p-10">
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Create Account</h1>
          <p className="text-text-body mb-8">Sign up to place orders through the website.</p>

          {displayError && (
            <p className="mb-6 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {displayError}
            </p>
          )}

          <a
            href={`/api/auth/google/start?returnTo=${encodeURIComponent(returnTo)}`}
 className="mb-6 inline-flex w-full items-center justify-center gap-3 rounded-[10px] border border-zinc-300 bg-white px-5 py-3 font-medium text-foreground transition-colors hover:border-zinc-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.3-2 3l3.2 2.5c1.9-1.7 3-4.3 3-7.4 0-.7-.1-1.4-.2-2H12z" />
              <path fill="#34A853" d="M12 22c2.7 0 5-0.9 6.7-2.4l-3.2-2.5c-.9.6-2.1 1-3.5 1-2.7 0-4.9-1.8-5.7-4.2l-3.3 2.6C4.7 19.8 8.1 22 12 22z" />
              <path fill="#4A90E2" d="M6.3 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9L3 7.5C2.4 8.8 2 10.3 2 12s.4 3.2 1 4.5l3.3-2.6z" />
              <path fill="#FBBC05" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 3 14.7 2 12 2 8.1 2 4.7 4.2 3 7.5l3.3 2.6c.8-2.4 3-4.2 5.7-4.2z" />
            </svg>
            Continue with Google
          </a>

          <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-wide text-zinc-400">
            <span className="h-px flex-1 bg-zinc-200" />
            <span>or sign up with email</span>
            <span className="h-px flex-1 bg-zinc-200" />
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={2}
 className="w-full rounded-[10px] border border-zinc-300 px-4 py-3 focus:border-brand-main focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
 className="w-full rounded-[10px] border border-zinc-300 px-4 py-3 focus:border-brand-main focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
 className="w-full rounded-[10px] border border-zinc-300 px-4 py-3 focus:border-brand-main focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-[10px] bg-brand-main px-5 py-3 font-medium text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-text-body">
            Already have an account? <Link href={`/auth/signin?returnTo=${encodeURIComponent(returnTo)}`} className="text-brand-main font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
