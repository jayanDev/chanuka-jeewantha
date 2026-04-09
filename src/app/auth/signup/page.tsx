"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const params = useSearchParams();
  const returnTo = params.get("returnTo") ?? "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
          <h1 className="text-3xl font-bold font-plus-jakarta text-foreground mb-2">Create Account</h1>
          <p className="text-text-body mb-8">Sign up to place orders through the website.</p>

          {error && (
            <p className="mb-6 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

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
