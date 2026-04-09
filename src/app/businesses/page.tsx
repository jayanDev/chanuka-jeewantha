import Link from "next/link";

const businesses = [
  {
    name: "Chanuka Career Studio",
    type: "Flagship Service Brand",
    summary:
      "High-impact CV writing, LinkedIn optimization, and career strategy support for job seekers locally and globally.",
    focus: ["ATS CV Writing", "LinkedIn Optimization", "Career Coaching"],
  },
  {
    name: "Career Growth Workshops",
    type: "Training Programs",
    summary:
      "Live and cohort-style sessions for universities, private institutes, and professional communities.",
    focus: ["Interview Readiness", "Personal Branding", "Job Search Strategy"],
  },
  {
    name: "Digital Career Products",
    type: "Product Line",
    summary:
      "Templates, checklists, and guided ebook systems to help candidates execute faster with clear frameworks.",
    focus: ["Ebooks", "Application Templates", "Action Trackers"],
  },
];

export default function BusinessesPage() {
  return (
    <>
      <section className="w-full bg-foreground text-white pt-[100px] pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                BUSINESSES
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Businesses</span>
          </div>
          <h1 className="font-plus-jakarta text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.1] max-w-5xl !text-white">
            Explore the ventures behind <span className="text-brand-main">my career ecosystem</span>.
          </h1>
        </div>
      </section>

      <section className="w-full py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6">
          <div className="mb-14 max-w-4xl">
            <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">Business Showcase</span>
            <h2 className="text-[40px] md:text-[56px] font-bold font-plus-jakarta text-foreground leading-[1.1] mb-4">
              Built to support careers from awareness to outcomes.
            </h2>
            <p className="text-text-body text-lg">
              Each business line is designed to solve a different stage of the client journey: profile building, market visibility, and long-term growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {businesses.map((business, index) => (
              <article
                key={business.name}
                className="group relative overflow-hidden rounded-[22px] border border-zinc-200 bg-zinc-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-[10px] border border-brand-main/35 bg-white px-3 py-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-dark">Venture {index + 1}</span>
                </div>

                <h3 className="text-[30px] font-bold font-plus-jakarta text-foreground mb-2">{business.name}</h3>
                <p className="text-brand-dark font-semibold mb-4">{business.type}</p>
                <p className="text-text-body leading-relaxed mb-6">{business.summary}</p>

                <ul className="space-y-2 mb-8">
                  {business.focus.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-text-body">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-main/15 text-brand-dark font-bold text-xs">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-brand-dark transition-colors hover:text-brand-main">
                  Collaborate on this
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
