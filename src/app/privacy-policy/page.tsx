import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | Chanuka Jeewantha",
  description:
    "Read how Chanuka Jeewantha collects, uses, protects, and stores your personal information when you use this website and services.",
  path: "/privacy-policy",
  keywords: ["privacy policy", "data protection", "customer data"],
});

export default function PrivacyPolicyPage() {
  return (
 <section className="w-full bg-zinc-50 py-[90px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">Legal</p>
        <h1 className="text-[34px] md:text-[48px] font-bold font-plus-jakarta text-foreground">Privacy Policy</h1>
        <p className="mt-4 text-text-body leading-relaxed">
          This Privacy Policy explains how your information is collected and used when you access this website or order services.
        </p>

 <div className="mt-8 space-y-6 rounded-[18px] border border-zinc-200 bg-white p-6 md:p-8">
          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">1. Information We Collect</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              We may collect your name, email address, phone number, LinkedIn profile URL, uploaded documents, and order-related notes.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">2. How We Use Information</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Your information is used to process orders, deliver career services, communicate updates, provide support, and improve service quality.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">3. Document Security</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Uploaded documents are stored securely and used only for service delivery. We do not sell your personal documents to third parties.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">4. Third-Party Services</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              We may use third-party systems for analytics, communication, and payment evidence handling. These services may process your data under their own policies.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">5. Cookies and Analytics</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              This website may use cookies or similar technologies to understand site usage and improve user experience.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">6. Your Rights</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              You may request updates or removal of your personal information where legally applicable by contacting support.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">7. Contact</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              For any privacy-related request, use the contact page or WhatsApp support.
            </p>
          </article>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-[10px] bg-brand-main px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">Contact Support</Link>
 <Link href="/terms-and-conditions" className="rounded-[10px] border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:border-brand-main hover:text-brand-main transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </section>
  );
}
