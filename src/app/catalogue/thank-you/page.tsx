import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Order Confirmed | Career Studio Catalogue",
  description: "Your catalogue order has been submitted successfully.",
  path: "/catalogue/thank-you",
});

export default async function CatalogueThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-16 sm:px-6">
      <section className="mx-auto max-w-2xl rounded-[20px] border border-emerald-200 bg-white p-8 text-center shadow-sm md:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-6 font-heading text-[34px] font-bold text-foreground">Order Submitted Successfully</h1>
        <p className="mt-3 text-zinc-600">
          Your order has been received. We will verify your payment and contact you through WhatsApp.
        </p>
        {orderId && (
          <p className="mt-5 rounded-[10px] border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm font-semibold text-zinc-800">
            Order ID: {orderId}
          </p>
        )}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/catalogue" className="rounded-[10px] border border-zinc-300 px-5 py-3 text-sm font-semibold text-foreground hover:border-brand-main hover:text-brand-main">
            Back to Catalogue
          </Link>
          <a href="https://wa.me/94773902230" target="_blank" rel="noopener noreferrer" className="rounded-[10px] bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1fb85a]">
            Contact WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
