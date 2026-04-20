import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms and Conditions | Chanuka Jeewantha",
  description:
    "Read the terms and conditions for using Chanuka Jeewantha's website, ordering services, payment confirmation, delivery, and revisions.",
  path: "/terms-and-conditions",
  keywords: ["terms and conditions", "service terms", "order policy"],
});

export default function TermsAndConditionsPage() {
  return (
 <section className="w-full bg-white py-[90px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">Legal</p>
        <h1 className="text-[34px] md:text-[48px] font-bold font-plus-jakarta text-foreground">Terms and Conditions</h1>
        <p className="mt-4 text-text-body leading-relaxed">
          These terms govern your access to this website and your use of all services offered.
        </p>

 <div className="mt-8 space-y-6 rounded-[18px] border border-zinc-200 bg-zinc-50 p-6 md:p-8">
          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">1. Service Scope</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Services include CV writing, CV review, cover letter writing, LinkedIn optimization, bundles, coaching-related support, and associated digital guidance.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">2. Order Confirmation</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Orders are considered confirmed after payment evidence is submitted and verified by the service provider.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">3. Delivery Timelines</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Delivery windows vary by package. Timelines may adjust based on workload, document completeness, and revision requests.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">4. Revisions</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Revision availability depends on the selected package. Revision requests must remain within the original service scope unless otherwise agreed.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">5. Customer Responsibilities</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Customers must provide accurate personal details, role targets, and truthful career information for best results and timely delivery.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">6. Refund and Cancellation</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Refund or cancellation decisions are handled case-by-case based on service stage, submitted work, and communication records.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">7. Intellectual Property</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Final delivered documents are provided for the customer's personal use. Website content and branded assets remain property of the site owner unless otherwise stated.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">8. Contact and Disputes</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              For clarifications or dispute resolution, contact support through the website contact page or official WhatsApp channel.
            </p>
          </article>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/help" className="rounded-[10px] bg-brand-main px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">Open Help Center</Link>
 <Link href="/privacy-policy" className="rounded-[10px] border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:border-brand-main hover:text-brand-main transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </section>
  );
}
