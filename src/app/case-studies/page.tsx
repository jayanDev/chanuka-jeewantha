import React from "react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      id: 1,
      title: "ATS CV Rewrite for International Applications",
      category: "ATS CV Writing",
      year: "2024",
      desc: "Role-targeted CV transformation focused on keyword alignment, measurable achievements, and recruiter readability.",
    },
    {
      id: 2,
      title: "LinkedIn Profile Optimization Sprint",
      category: "LinkedIn Optimization",
      year: "2023",
      desc: "Complete profile positioning update with stronger headline, About narrative, and experience storytelling for better visibility.",
    },
    {
      id: 3,
      title: "Career Coaching + Roadmap Execution",
      category: "Career Coaching",
      year: "2022",
      desc: "Step-by-step roadmap and coaching support to transition from uncertainty to focused applications and interview readiness.",
    }
  ];

  return (
    <>
      <section className="w-full bg-foreground text-white pt-[200px] pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                CASE STUDIES
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Case Studies</span>
          </div>
          <h1 className="font-plus-jakarta text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl">
            Success stories & <span className="text-brand-main">Impact.</span>
          </h1>
        </div>
      </section>

      <section className="w-full py-[96px] bg-zinc-50">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-16">
            {caseStudies.map((study, index) => (
              <div 
                key={study.id} 
                className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image Placeholder */}
                <div className="w-full md:w-1/2 aspect-[4/3] bg-zinc-200 rounded-[24px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand-main/20 group-hover:bg-transparent transition-colors z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur text-foreground px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                    {study.category}
                  </div>
                  {/* <Image fill src="/study-img.jpg" className="object-cover" alt={study.title} /> */}
                  <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold text-xl uppercase tracking-widest bg-zinc-300">Image {study.id}</div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col">
                  <span className="text-brand-main font-bold mb-4">{study.year}</span>
                  <h2 className="text-[32px] md:text-[40px] font-bold font-plus-jakarta text-foreground leading-[1.2] mb-6">
                    {study.title}
                  </h2>
                  <p className="text-text-body text-lg leading-relaxed mb-8">
                    {study.desc}
                  </p>
                  
                  <Link href={`/portfolio`} className="group flex items-center gap-4 text-foreground font-bold hover:text-brand-main transition-colors w-max">
                    <span className="border-b-2 border-foreground group-hover:border-brand-main pb-1 transition-colors">Read Case Study</span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}