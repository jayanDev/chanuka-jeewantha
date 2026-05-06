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
          At Chanuka Jeewantha, we are committed to protecting the privacy and security of our customers&apos; personal information. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit or make a purchase on our website. By using our website, you consent to the practices described in this policy.
        </p>

 <div className="mt-8 space-y-6 rounded-[18px] border border-zinc-200 bg-white p-6 md:p-8">
          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">Information We Collect</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              When you visit our website, we may collect certain information about you, including:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed text-zinc-600 space-y-1">
              <li>Personal identification information (such as your name, email address, and phone number) provided voluntarily by you during the registration or checkout process.</li>
              <li>Payment and billing information necessary to process your orders, including credit card details, which are securely handled by trusted third-party payment processors.</li>
              <li>Browsing information, such as your IP address, browser type, and device information, collected automatically using cookies and similar technologies.</li>
            </ul>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">Use of Information</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              We may use the collected information for the following purposes:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed text-zinc-600 space-y-1">
              <li>To process and fulfill your orders, including shipping and delivery.</li>
              <li>To communicate with you regarding your purchases, provide customer support, and respond to inquiries or requests.</li>
              <li>To personalize your shopping experience and present relevant product recommendations and promotions.</li>
              <li>To improve our website, products, and services based on your feedback and browsing patterns.</li>
              <li>To detect and prevent fraud, unauthorized activities, and abuse of our website.</li>
            </ul>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">Information Sharing</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              We respect your privacy and do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed text-zinc-600 space-y-1">
              <li><strong>Trusted service providers:</strong> We may share your information with third-party service providers who assist us in operating our website, processing payments, and delivering products. These providers are contractually obligated to handle your data securely and confidentially.</li>
              <li><strong>Legal requirements:</strong> We may disclose your information if required to do so by law or in response to valid legal requests or orders.</li>
            </ul>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">Data Security</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">Cookies and Tracking Technologies</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and gather information about your preferences and interactions with our website. You have the option to disable cookies through your browser settings, but this may limit certain features and functionality of our website.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">Changes to the Privacy Policy</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with a revised &quot;last updated&quot; date. We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information.
            </p>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-plus-jakarta text-zinc-900">Contact Us</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              If you have any questions, concerns, or requests regarding our Privacy Policy or the handling of your personal information, please contact us using the information provided on our website.
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
