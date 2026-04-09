import Link from "next/link";

export default function HelpPage() {
  return (
    <section className="w-full py-[120px] bg-zinc-50">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 text-center">
        <span className="text-brand-main font-semibold tracking-wider uppercase mb-3 block">Help Center</span>
        <h1 className="font-plus-jakarta text-[30px] sm:text-[40px] md:text-[56px] font-bold text-foreground leading-[1.1] mb-6">
          Need Career Guidance?
        </h1>
        <p className="text-text-body text-lg leading-relaxed mb-8">
          For CV writing, LinkedIn profile, coaching, or roadmap-related questions, reach out and I will guide you with the best next step.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/faq"
            className="px-[28px] py-[14px] border border-foreground text-foreground hover:bg-foreground hover:text-white rounded-[10px] font-medium transition-colors"
          >
            Browse FAQ
          </Link>
          <Link
            href="/contact"
            className="px-[28px] py-[14px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] font-medium transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
