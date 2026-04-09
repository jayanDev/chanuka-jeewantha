import Link from "next/link";
import React from "react";

export default function PortfolioPage() {
  return (
    <>
      {/* 1. Hero Section */}
      <section className="w-full bg-foreground text-white pt-[100px] pb-[96px] relative overflow-hidden">
        {/* Background Marquee Text */}
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} className="text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                PORTFOLIO
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Portfolio</span>
          </div>
          <h1 className="font-plus-jakarta text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Turning your career claims into <span className="text-brand-main">visible proof</span>
          </h1>
        </div>
      </section>

      {/* 2. Portfolio Grid Section */}
      <section className="w-full py-[96px] bg-zinc-50">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">Works</span>
              <h2 className="text-[40px] md:text-[56px] font-bold font-plus-jakarta text-foreground leading-[1.1]">
                Career Proof <span className="text-brand-light pl-2">Portfolio.</span>
              </h2>
            </div>
            <Link href="/contact" className="px-[25px] py-[15px] border border-foreground hover:bg-foreground hover:text-white rounded-[10px] text-foreground font-medium transition-colors">
              Let's Talk
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative w-full h-[400px] md:h-[500px] bg-zinc-200 rounded-[20px] overflow-hidden mb-6">
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-zinc-200 shadow-sm text-foreground">
                    {item % 2 === 0 ? "CV + LinkedIn Results" : "Career Coaching Outcomes"}
                  </div>
                  {/* Project Image */}
                  <div className="w-full h-full bg-zinc-300 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105">
                    <span className="font-mono text-zinc-500">Project Image {item}</span>
                  </div>
                </div>
                <h3 className="text-[32px] font-bold font-plus-jakarta mb-2 group-hover:text-brand-main transition-colors text-foreground">
                  Career Case Portfolio {item}
                </h3>
                <p className="text-text-body text-lg">Structured examples showing how strategy, messaging, and proof improved interview readiness.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}