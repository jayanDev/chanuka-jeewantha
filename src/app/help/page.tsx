import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList, buildFaqPageSchema } from "@/lib/structured-data";
import { formatLkr, packageCategories, paymentInstructions } from "@/lib/packages-catalog";

export const metadata: Metadata = buildPageMetadata({
  title: "Help Center | Support, Instructions, Packages & Customer FAQs",
  description:
    "Find complete customer help: order instructions, payment details, package information, delivery timelines, revisions, and support contacts.",
  path: "/help",
  keywords: ["career help center", "CV support", "LinkedIn help", "package instructions", "order support"],
});

export default function HelpPage() {
  const quickHelpTopics = [
    {
      title: "How to place an order",
      answer:
        "Go to Pricing, choose your package, click Add to Cart or Buy Now, complete your details, and submit your bank transfer slip during checkout.",
    },
    {
      title: "How payment works",
      answer:
        "Orders are confirmed after your transfer slip is submitted and verified. Use your name or phone number as the payment reference.",
    },
    {
      title: "Delivery timeline",
      answer:
        "Each package has its own delivery window. Most individual services are delivered within 2-5 days, while bulk packages may take longer.",
    },
    {
      title: "Revisions and edits",
      answer:
        "Revision limits vary by package. Premium packages include extended revisions. Contact support if you need adjustments after delivery.",
    },
    {
      title: "Best package for me",
      answer:
        "If you are unsure, start from CV Writing or Bundle packages. If you already have a draft, CV Review can be the fastest and most affordable option.",
    },
    {
      title: "How to get urgent help",
      answer:
        "Use WhatsApp for faster responses, especially for order confirmations, delivery updates, and urgent deadlines.",
    },
  ];

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Help", path: "/help" },
  ]);
  const faqLd = buildFaqPageSchema(
    quickHelpTopics.map((topic) => ({
      question: topic.title,
      answer: topic.answer,
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 py-[90px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 text-center">
          <span className="mb-3 block font-semibold uppercase tracking-wider text-brand-main">Help Center</span>
          <h1 className="font-plus-jakarta text-[30px] sm:text-[42px] md:text-[56px] font-bold text-foreground leading-[1.1] mb-5">
            Customer Help, Instructions, and Package Guidance
          </h1>
          <p className="mx-auto max-w-4xl text-text-body text-lg leading-relaxed mb-8">
            Find everything you need before ordering: package details, payment steps, delivery expectations, revision information, and support channels.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing" className="px-[28px] py-[14px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] font-medium transition-colors">
              View All Packages
            </Link>
            <Link href="/faq" className="px-[28px] py-[14px] border border-foreground text-foreground hover:bg-foreground hover:text-background rounded-[10px] font-medium transition-colors">
              Browse FAQ
            </Link>
            <Link href="/contact" className="px-[28px] py-[14px] border border-zinc-300 dark:border-zinc-700 text-foreground hover:border-brand-main hover:text-brand-main rounded-[10px] font-medium transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-[72px] bg-white dark:bg-zinc-900">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-[30px] md:text-[40px] font-bold font-plus-jakarta text-foreground">Quick Help Topics</h2>
            <Link href="/faq" className="text-sm font-semibold text-brand-dark hover:text-brand-main transition-colors">See full FAQ</Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {quickHelpTopics.map((topic) => (
              <article key={topic.title} className="rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 p-5 hover:border-brand-main/40 hover:bg-white dark:bg-zinc-900 transition-colors">
                <h3 className="text-[18px] font-bold font-plus-jakarta text-zinc-900 dark:text-zinc-100 mb-2">{topic.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{topic.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 py-[72px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <h2 className="text-[30px] md:text-[40px] font-bold font-plus-jakarta text-foreground mb-8">Payment Instructions</h2>
          <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="text-sm text-zinc-600 dark:text-zinc-400"><span className="font-semibold text-zinc-900 dark:text-zinc-100">Bank:</span> {paymentInstructions.bank}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400"><span className="font-semibold text-zinc-900 dark:text-zinc-100">Account Name:</span> {paymentInstructions.accountName}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400"><span className="font-semibold text-zinc-900 dark:text-zinc-100">Account Number:</span> {paymentInstructions.accountNumber}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400"><span className="font-semibold text-zinc-900 dark:text-zinc-100">Branch:</span> {paymentInstructions.branch}</p>
            </div>
            <p className="mt-4 rounded-[12px] bg-zinc-50 dark:bg-zinc-900 p-4 text-sm text-zinc-700 dark:text-zinc-300">{paymentInstructions.methodNote}</p>
          </div>
        </div>
      </section>

      <section className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-[72px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <h2 className="text-[30px] md:text-[40px] font-bold font-plus-jakarta text-foreground mb-8">All Packages and Delivery Details</h2>
          <div className="space-y-8">
            {packageCategories.map((category) => (
              <article key={category.key} className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-5 md:p-7">
                <h3 className="text-[24px] font-bold font-plus-jakarta text-zinc-900 dark:text-zinc-100 mb-2">{category.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-5">{category.description}</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {category.packages.map((pkg) => (
                    <div key={pkg.slug} className="rounded-[14px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-[18px] font-bold font-plus-jakarta text-zinc-900 dark:text-zinc-100">{pkg.name}</h4>
                        <span className="rounded-full bg-brand-main/10 px-3 py-1 text-xs font-semibold text-brand-dark">{formatLkr(pkg.priceLkr)}</span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{pkg.audience}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Delivery: {pkg.delivery}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 py-[72px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <h2 className="text-[30px] md:text-[40px] font-bold font-plus-jakarta text-foreground mb-6">Need More Help?</h2>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/94773902230?text=Hello%20Chanuka%2C%20I%20need%20help%20with%20my%20order." target="_blank" rel="noopener noreferrer" className="rounded-[10px] bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1fb85a] transition-colors">
              WhatsApp Support
            </a>
            <Link href="/contact" className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:border-brand-main hover:text-brand-main transition-colors">
              Contact Form
            </Link>
            <Link href="/pricing" className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:border-brand-main hover:text-brand-main transition-colors">
              View Pricing
            </Link>
            <Link href="/faq" className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:border-brand-main hover:text-brand-main transition-colors">
              Frequently Asked Questions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
