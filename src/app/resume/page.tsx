import Link from "next/link";

export default function ResumePage() {
  return (
    <section className="w-full py-[120px] bg-white">
      <div className="max-w-[960px] mx-auto px-4 md:px-6 text-center">
        <span className="text-brand-main font-semibold tracking-wider uppercase mb-3 block">Resume</span>
        <h1 className="font-plus-jakarta text-[42px] md:text-[56px] font-bold text-foreground leading-[1.1] mb-6">
          Chanuka Jeewantha Profile
        </h1>
        <p className="text-text-body text-lg leading-relaxed mb-8">
          This page will include my detailed professional profile, service background, and selected career development results.
        </p>
        <Link
          href="/contact"
          className="inline-block px-[28px] py-[14px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] font-medium transition-colors"
        >
          Request Full Profile
        </Link>
      </div>
    </section>
  );
}
