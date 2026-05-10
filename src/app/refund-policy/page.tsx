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
        <h1 className="text-[34px] font-bold font-heading text-foreground md:text-[48px]">Refund Policy</h1>
        <p className="mt-4 leading-relaxed text-text-body">
          Thank you for shopping at Chanuka Jeewantha. We value your satisfaction and strive to provide you with the best online shopping experience possible. If, for any reason, you are not completely satisfied with your purchase, we are here to help.
        </p>

        <div className="mt-8 space-y-6 rounded-[18px] border border-zinc-200 bg-white p-6 md:p-8">
          <article>
            <h2 className="text-[22px] font-bold font-heading text-zinc-900">Returns</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              We accept returns within 7 days from the date of purchase. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-heading text-zinc-900">Refunds</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Once we receive your return and inspect the item, we will notify you of the status of your refund. If your return is approved, we will initiate a refund to your original method of payment. Please note that the refund amount will exclude any shipping charges incurred during the initial purchase.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-heading text-zinc-900">Exchanges</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              If you would like to exchange your item for a different size, color, or style, please contact our customer support team within 7 days of receiving your order. We will provide you with further instructions on how to proceed with the exchange.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-heading text-zinc-900">Non-Returnable Items</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Certain items are non-returnable and non-refundable. These include:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed text-zinc-600 space-y-1">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Personalized or custom-made items</li>
              <li>Perishable goods</li>
            </ul>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-heading text-zinc-900">Damaged or Defective Items</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              In the unfortunate event that your item arrives damaged or defective, please contact us immediately. We will arrange for a replacement or issue a refund, depending on your preference and product availability.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-heading text-zinc-900">Return Shipping</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              You will be responsible for paying the shipping costs for returning your item unless the return is due to our error (e.g., wrong item shipped, defective product). In such cases, we will provide you with a prepaid shipping label.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-heading text-zinc-900">Processing Time</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Refunds and exchanges will be processed within 3–5 business days after we receive your returned item. Please note that it may take additional time for the refund to appear in your account, depending on your payment provider.
            </p>
          </article>

          <article>
            <h2 className="text-[22px] font-bold font-heading text-zinc-900">Contact Us</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              If you have any questions or concerns regarding our refund policy, please contact our customer support team. We are here to assist you and ensure your shopping experience with us is enjoyable and hassle-free.
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
