import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Refund Policy | Chanuka Jeewantha",
  description:
    "Read the refund policy for services, digital products, ebooks, and paid resources purchased through this website.",
  path: "/refund-policy",
  keywords: ["refund policy", "refunds", "cancellation policy", "digital product refunds"],
});

export default function RefundPolicyPage() {
  return (
    <section className="w-full bg-zinc-50 py-[90px]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">Legal</p>
        <h1 className="text-[34px] font-bold font-plus-jakarta text-foreground md:text-[48px]">Refund Policy</h1>
        <p className="mt-4 leading-relaxed text-text-body">
          This Refund Policy explains how refund requests are handled for services, ebooks, and paid digital resources purchased through this website.
        </p>

        <div className="mt-8 space-y-6 rounded-[18px] border border-zinc-200 bg-white p-6 md:p-8">
          <article>
            <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">1. Service Refunds</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Refunds for services such as CV writing, LinkedIn optimization, cover letters, and coaching support are reviewed case by case based on work completed, delivery stage, and communication history.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">2. Digital Product Refunds</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Paid ebooks, downloadable files, and digital resources are generally non-refundable once access has been granted or the file has been delivered, unless a clear technical issue prevents access and cannot be resolved.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">3. Duplicate or Wrong Payments</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              If you accidentally pay twice or purchase the wrong item, contact support with your payment evidence as soon as possible so the issue can be reviewed.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">4. Incomplete Orders</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              If a paid service cannot be delivered due to missing information, long inactivity, or failure to provide the required details, refund eligibility may be reduced or denied depending on the amount of work already completed.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">5. Refund Timing</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              When a refund is approved, the timing depends on the original payment method and the steps required to confirm the reversal.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">6. How to Request a Review</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Send your name, order details, and payment reference through the contact page or WhatsApp support so the request can be reviewed quickly.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">7. Final Decision</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              All refund decisions are made fairly and based on the service status, delivered work, and the evidence available at the time of review.
            </p>
          </article>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-[10px] bg-brand-main px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">Contact Support</Link>
          <Link href="/terms-and-conditions" className="rounded-[10px] border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">Terms & Conditions</Link>
          <Link href="/privacy-policy" className="rounded-[10px] border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">Privacy Policy</Link>
        </div>
      </div>
    </section>
  );
}
