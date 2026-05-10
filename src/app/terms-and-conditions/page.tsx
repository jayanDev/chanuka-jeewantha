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
        <h1 className="text-[34px] md:text-[48px] font-bold font-heading text-foreground">Terms and Conditions</h1>
        <p className="mt-4 text-text-body leading-relaxed">
          Welcome to Chanuka Jeewantha. These Terms and Conditions govern your use of our website and the purchase and sale of products from our platform. By accessing and using our website, you agree to comply with these terms. Please read them carefully before proceeding with any transactions.
        </p>

 <div className="mt-8 space-y-6 rounded-[18px] border border-zinc-200 bg-zinc-50 p-6 md:p-8">
          <article>
 <h2 className="text-[22px] font-bold font-heading text-zinc-900">Use of the Website</h2>
            <ul className="mt-2 list-[lower-alpha] pl-5 text-sm leading-relaxed text-zinc-600 space-y-1">
              <li>You must be at least 18 years old to use our website or make purchases.</li>
              <li>You are responsible for maintaining the confidentiality of your account information, including your username and password.</li>
              <li>You agree to provide accurate and current information during the registration and checkout process.</li>
              <li>You may not use our website for any unlawful or unauthorized purposes.</li>
            </ul>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-heading text-zinc-900">Product Information and Pricing</h2>
            <ul className="mt-2 list-[lower-alpha] pl-5 text-sm leading-relaxed text-zinc-600 space-y-1">
              <li>We strive to provide accurate product descriptions, images, and pricing information. However, we do not guarantee the accuracy or completeness of such information.</li>
              <li>Prices are subject to change without notice. Any promotions or discounts are valid for a limited time and may be subject to additional terms and conditions.</li>
            </ul>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-heading text-zinc-900">Orders and Payments</h2>
            <ul className="mt-2 list-[lower-alpha] pl-5 text-sm leading-relaxed text-zinc-600 space-y-1">
              <li>By placing an order on our website, you are making an offer to purchase the selected products.</li>
              <li>We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraudulent activity.</li>
              <li>You agree to provide valid and up-to-date payment information and authorize us to charge the total order amount, including applicable taxes and shipping fees, to your chosen payment method.</li>
              <li>We use trusted third-party payment processors to handle your payment information securely. We do not store or have access to your full payment details.</li>
            </ul>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-heading text-zinc-900">Shipping and Delivery</h2>
            <ul className="mt-2 list-[lower-alpha] pl-5 text-sm leading-relaxed text-zinc-600 space-y-1">
              <li>We will make reasonable efforts to ensure timely shipping and delivery of your orders.</li>
              <li>Shipping and delivery times provided are estimates and may vary based on your location and other factors.</li>
            </ul>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-heading text-zinc-900">Returns and Refunds</h2>
            <ul className="mt-2 list-[lower-alpha] pl-5 text-sm leading-relaxed text-zinc-600 space-y-1">
              <li>Our Returns and Refund Policy governs the process and conditions for returning products and seeking refunds. Please refer to the policy provided on our website for more information.</li>
            </ul>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-heading text-zinc-900">Intellectual Property</h2>
            <ul className="mt-2 list-[lower-alpha] pl-5 text-sm leading-relaxed text-zinc-600 space-y-1">
              <li>All content and materials on our website, including but not limited to text, images, logos, and graphics, are protected by intellectual property rights and are the property of Chanuka Jeewantha or its licensors.</li>
              <li>You may not use, reproduce, distribute, or modify any content from our website without our prior written consent.</li>
            </ul>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-heading text-zinc-900">Limitation of Liability</h2>
            <ul className="mt-2 list-[lower-alpha] pl-5 text-sm leading-relaxed text-zinc-600 space-y-1">
              <li>In no event shall Chanuka Jeewantha, its directors, employees, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or the purchase and use of our products.</li>
              <li>We make no warranties or representations, express or implied, regarding the quality, accuracy, or suitability of the products offered on our website.</li>
            </ul>
          </article>

          <article>
 <h2 className="text-[22px] font-bold font-heading text-zinc-900">Amendments and Termination</h2>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              We reserve the right to modify, update, or terminate these Terms and Conditions at any time without prior notice. It is your responsibility to review these terms periodically for any changes.
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
