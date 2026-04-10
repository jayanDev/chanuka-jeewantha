import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/site-url";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Chanuka Jeewantha | Professional CV Writer & Career Development Specialist",
  description:
    "I help job seekers win interviews through ATS-friendly CV writing, LinkedIn optimization, coaching, and clear career strategy.",
  path: "/",
  keywords: [
    "ATS-friendly CV writing",
    "career development specialist",
    "LinkedIn optimization",
    "career coaching",
    "professional CV writer Sri Lanka",
  ],
});

export default function Home() {
  const services = [
    {
      title: "Professional CV Writing (100% ATS-Friendly)",
      desc: "Role-targeted CVs built for ATS parsing and recruiter readability, focused on results and measurable achievements.",
      isMostPopular: true,
    },
    {
      title: "Cover Letter Writing",
      desc: "Customized cover letters that communicate your value clearly, match your target role, and strengthen each application.",
    },
    {
      title: "LinkedIn Account Optimization",
      desc: "Search-optimized LinkedIn profiles with clear positioning, keyword strategy, and profile branding improvements.",
    },
    {
      title: "CV Review Service",
      desc: "Expert CV reviews with clear ATS, structure, and impact improvements so you can implement high-value changes confidently.",
    },
  ];

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chanuka Jeewantha",
    jobTitle: "Professional CV Writer & Career Development Specialist",
    url: getBaseUrl(),
    sameAs: [
      "https://www.linkedin.com/in/chanuka-jeewantha/",
      "https://www.facebook.com/share/15vdmdB4oE/",
      "https://www.youtube.com/@chanukajeewantha",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <section className="w-full relative pt-[50px] md:pt-[73px] pb-[100px] md:pb-[146px] flex flex-col items-center justify-center overflow-hidden">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 w-full flex flex-col md:flex-row items-center gap-12 z-10">
          <div className="flex-1 flex flex-col items-start px-[24px]">
            <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-extrabold leading-[0.95em] mb-6 text-foreground">
              Hi, I am <br /> <span className="text-brand-main">Chanuka Jeewantha</span>
            </h1>
            <p className="text-text-body text-[16px] md:text-[24px] font-medium max-w-2xl mb-8">
              Professional CV Writer and Career Development Specialist with 8+ years of experience helping job seekers build ATS-friendly, recruiter-ready career profiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pricing"
                className="px-[25px] py-[15px] bg-foreground hover:bg-brand-dark rounded-[10px] text-white font-medium transition-colors text-center"
              >
                View CV Writing Packages
              </Link>
              <Link
                href="/services"
                className="px-[25px] py-[15px] bg-brand-main hover:bg-brand-dark rounded-[10px] text-white font-medium transition-colors text-center"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="px-[25px] py-[15px] border border-border hover:border-brand-main text-text-body hover:text-brand-main rounded-[10px] font-medium transition-colors text-center"
              >
                Book Consultation
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full mt-[40px] md:mt-0 max-w-[520px] aspect-[4/5]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[85%] bg-brand-light opacity-20 blur-[100px] rounded-full" />
            <div className="relative z-10 w-full h-full rounded-[20px] shadow-lg overflow-hidden group border border-zinc-200">
              <Image
                src="/images/hero-chanuka.jpg"
                alt="Chanuka Jeewantha"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-foreground py-6 overflow-hidden transform -rotate-2 scale-105 my-12">
        <div className="flex whitespace-nowrap">
          <div className="flex gap-[50px] md:gap-[90px] px-[25px] md:px-[45px] animate-[marquee_20s_linear_infinite]">
            {[
              "ATS-Friendly CV Writing",
              "LinkedIn Optimization",
              "Cover Letter Writing",
              "Career Coaching",
              "Career Roadmap",
              "Portfolio Design",
              "Personal Website Design",
              "LinkedIn Management",
              "30K+ Follower Growth Proof",
              "ATS-Friendly CV Writing",
            ].map((skill, index) => (
              <span key={index} className="text-text-light text-[22px] md:text-[30px] font-plus-jakarta font-bold uppercase whitespace-nowrap">
                {skill} <span className="text-brand-main ml-[50px] md:ml-[90px]">*</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">What I Do</span>
              <h2 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-plus-jakarta text-foreground leading-[1.1]">
                Career Services <span className="text-brand-light">That Deliver Results</span>
              </h2>
            </div>
            <Link href="/services" className="px-[25px] py-[15px] border border-foreground hover:bg-foreground hover:text-white rounded-[10px] text-foreground font-medium transition-colors">
              View All Services
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className={`bg-zinc-100 rounded-[20px] p-8 md:p-12 hover:shadow-xl transition-shadow flex flex-col border ${
                  service.isMostPopular ? "border-brand-main" : "border-zinc-200"
                }`}
              >
                {service.isMostPopular && (
                  <div className="mb-5 inline-flex items-center gap-2 rounded-[10px] border border-brand-main/40 bg-white px-3 py-1.5 shadow-sm">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-main text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">Client Favorite</span>
                  </div>
                )}
                <h3 className="text-[28px] font-bold font-plus-jakarta mb-4">{service.title}</h3>
                <p className="text-text-body mb-8 flex-grow">{service.desc}</p>
                <Link href="/services" className="text-brand-dark hover:text-brand-main font-semibold flex items-center gap-2 transition-transform hover:translate-x-2">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
            <div className="w-full lg:w-[49%] aspect-[4/5] rounded-[20px] relative overflow-hidden border border-zinc-200">
              <Image
                src="/images/about-chanuka.jpg"
                alt="Chanuka Jeewantha coaching a career client"
                fill
                sizes="(max-width: 1024px) 100vw, 49vw"
                className="object-cover"
              />
            </div>

            <div className="w-full lg:w-[51%] lg:pl-[72px] flex flex-col items-start">
              <span className="text-brand-main font-semibold tracking-wider uppercase mb-4 block">About Me</span>
              <h2 className="text-[36px] md:text-[52px] font-bold font-plus-jakarta text-foreground leading-[1.2] mb-6">
                Strategy, proof, and clear communication to help professionals win in modern hiring systems.
              </h2>
              <p className="text-text-body text-[18px] mb-10 leading-relaxed">
                I support fresh graduates, mid-level professionals, career switchers, and international applicants with practical, market-aligned career development services.
              </p>

              <div className="grid grid-cols-2 gap-6 w-full">
                <div className="border border-zinc-200 rounded-[15px] p-6 flex flex-col hover:border-brand-main transition-colors text-center md:text-left">
                  <span className="text-[40px] font-bold font-plus-jakarta text-brand-dark mb-2">8+</span>
                  <span className="text-text-body font-medium">Years Experience</span>
                </div>
                <div className="border border-zinc-200 rounded-[15px] p-6 flex flex-col hover:border-brand-main transition-colors text-center md:text-left">
                  <span className="text-[40px] font-bold font-plus-jakarta text-brand-dark mb-2">30K+</span>
                  <span className="text-text-body font-medium">LinkedIn Growth Proof</span>
                </div>
                <div className="border border-zinc-200 rounded-[15px] p-6 flex flex-col hover:border-brand-main transition-colors text-center md:text-left">
                  <span className="text-[40px] font-bold font-plus-jakarta text-brand-dark mb-2">5000+</span>
                  <span className="text-text-body font-medium">CVs Completed Across Industries</span>
                </div>
                <div className="border border-zinc-200 rounded-[15px] p-6 flex flex-col hover:border-brand-main transition-colors text-center md:text-left">
                  <span className="text-[40px] font-bold font-plus-jakarta text-brand-dark mb-2">8</span>
                  <span className="text-text-body font-medium">Core Career Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-[64px] sm:py-[80px] md:py-[96px] bg-foreground text-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-3xl">
              <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">Latest Insights</span>
              <h2 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-plus-jakarta leading-[1.1] !text-white">
                Career guidance for ATS-ready applications, LinkedIn visibility, and strategic growth.
              </h2>
            </div>
            <Link href="/blog" className="px-[25px] py-[15px] border border-white/80 hover:bg-white hover:text-foreground rounded-[10px] text-white font-semibold transition-colors whitespace-nowrap">
              Read Blog
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Why qualified candidates still get ignored",
              "How to turn responsibilities into achievement bullets",
              "LinkedIn profile mistakes that reduce recruiter reach",
            ].map((title) => (
              <div key={title} className="bg-zinc-900/40 border border-white/20 rounded-[20px] p-8 hover:bg-zinc-800/60 transition-colors">
                <h3 className="text-[24px] font-bold font-plus-jakarta mb-3 !text-white">{title}</h3>
                <p className="!text-white text-sm mb-6">
                  Practical guidance built for today&#39;s hiring behavior and competitive job market positioning.
                </p>
                <Link href="/blog" className="text-white font-semibold transition-colors">
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
