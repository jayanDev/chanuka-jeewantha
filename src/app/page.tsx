import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/site-url";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Professional CV Writing Services & ATS Friendly CV Maker | Chanuka Jeewantha",
  description:
    "Need a Professional CV? I am an expert CV maker offering ATS Friendly CV writing, Cover Letter Writing, and complete LinkedIn Optimization services.",
  path: "/",
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

  const testimonialHighlights = [
    {
      quote: "My ATS score improved and I got interviews within two weeks.",
      name: "Kasun R.",
      role: "Operations Executive",
      outcome: "2x more interview callbacks",
    },
    {
      quote: "LinkedIn profile optimization gave me inbound recruiter messages.",
      name: "Sanduni M.",
      role: "Marketing Specialist",
      outcome: "Weekly recruiter inquiries",
    },
    {
      quote: "Clear strategy, fast delivery, and practical career guidance.",
      name: "Dilan P.",
      role: "Software Engineer",
      outcome: "Shortlisted for overseas roles",
    },
  ];

  const ebookHighlights = [
    {
      title: "කෝටිපතියෙක් වීමේ වේගවත් මඟ",
      image: "/images/millionaire-fastlane-cover.jpg",
      badge: "Bestseller",
    },
    {
      title: "ගැඹුරු කාර්යය (Deep Work)",
      image: "/images/Deep Work.jpg",
      badge: "Productivity",
    },
    {
      title: "සාර්ථක වෘත්තීය ජීවිතයක නීති සහ මූලධර්ම",
      image: "/images/So Good They Can't Ignore You.jpg",
      badge: "Career Growth",
    },
  ];

  const resourceHighlights = [
    {
      title: "ATS CV Keyword Checklist",
      desc: "A practical one-page checklist to improve ATS matching before every application.",
      href: "/blog",
      type: "Guide",
    },
    {
      title: "Interview Preparation Blueprint",
      desc: "A structured plan to prepare stories, outcomes, and confidence for interview day.",
      href: "/blog",
      type: "Blueprint",
    },
    {
      title: "LinkedIn Profile Optimization Guide",
      desc: "Improve headline clarity, keyword coverage, and recruiter-facing profile positioning.",
      href: "/services/linkedin-optimization",
      type: "Template",
    },
  ];

  const fastMovingPackages = [
    {
      title: "Professional CV Package",
      note: "ATS-friendly with role-focused achievement writing",
      href: "/pricing",
      tag: "Popular",
    },
    {
      title: "Career Brand Trinity Bundle",
      note: "CV + Cover Letter + LinkedIn complete bundle",
      href: "/offers/career-brand-trinity-bundle",
      tag: "Bundle",
    },
    {
      title: "Bulk CV 5-Pack",
      note: "Best value for teams, agencies, and frequent applicants",
      href: "/offers/bulk-cv-5-pack",
      tag: "Bulk",
    },
  ];

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

      <section className="w-full border-t border-zinc-200 bg-zinc-50 py-[72px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">Digital Store</span>
              <h3 className="text-[30px] font-bold font-plus-jakarta text-foreground">Ebooks</h3>
            </div>
            <Link href="/ebooks" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
              See More
            </Link>
          </div>
          <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-3 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {ebookHighlights.map((item) => (
              <article key={item.title} className="group min-w-[84%] snap-start overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.12)] sm:min-w-[58%] md:min-w-0">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-brand-main px-3 py-1 text-xs font-semibold text-white">{item.badge}</span>
                </div>
                <div className="p-5">
                  <p className="line-clamp-2 text-[16px] font-bold leading-snug text-zinc-900">{item.title}</p>
                  <Link href="/ebooks" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
                    Explore Ebook
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full border-t border-zinc-200 bg-white py-[72px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">Tools & Guides</span>
              <h3 className="text-[30px] font-bold font-plus-jakarta text-foreground">Resources</h3>
            </div>
            <Link href="/blog" className="rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
              See More
            </Link>
          </div>
          <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-3 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {resourceHighlights.map((item) => (
              <article key={item.title} className="min-w-[84%] snap-start rounded-[20px] border border-zinc-200 bg-zinc-50/70 p-6 transition-all hover:-translate-y-1 hover:border-brand-main/40 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] sm:min-w-[58%] md:min-w-0">
                <span className="mb-3 inline-flex rounded-full border border-brand-main/30 bg-brand-main/10 px-3 py-1 text-xs font-semibold text-brand-dark">{item.type}</span>
                <h4 className="mb-2 text-[20px] font-bold font-plus-jakarta text-zinc-900">{item.title}</h4>
                <p className="mb-5 text-sm leading-relaxed text-zinc-600">{item.desc}</p>
                <Link href={item.href} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
                  Open Resource
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full border-t border-zinc-200 bg-zinc-50 py-[72px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">High Demand</span>
              <h3 className="text-[30px] font-bold font-plus-jakarta text-foreground">Fast Moving Packages</h3>
            </div>
            <Link href="/pricing" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
              See More
            </Link>
          </div>
          <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-3 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {fastMovingPackages.map((item) => (
              <article key={item.title} className="group min-w-[84%] snap-start rounded-[20px] border border-zinc-200 bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.1)] sm:min-w-[58%] md:min-w-0">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-brand-main px-3 py-1 text-xs font-semibold text-white">{item.tag}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-main"><path d="M20 12v10H4V12" /><path d="M2 7h20v5H2z" /><path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
                </div>
                <h4 className="mb-2 text-[20px] font-bold font-plus-jakarta text-zinc-900">{item.title}</h4>
                <p className="mb-5 text-sm leading-relaxed text-zinc-600">{item.note}</p>
                <Link href={item.href} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
                  View Package
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full border-t border-zinc-200 bg-white py-[72px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">Client Voice</span>
              <h3 className="text-[30px] font-bold font-plus-jakarta text-foreground">Testimonials</h3>
            </div>
            <Link href="/testimonials" className="rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
              See More
            </Link>
          </div>
          <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-3 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {testimonialHighlights.map((item) => (
              <article key={item.name} className="group min-w-[84%] snap-start rounded-[20px] border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-6 shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] sm:min-w-[58%] md:min-w-0">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#f59e0b]" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    ))}
                  </div>
                  <span className="rounded-full bg-brand-main/10 px-3 py-1 text-xs font-semibold text-brand-dark">Verified Review</span>
                </div>
                <p className="mb-5 text-[15px] leading-relaxed text-zinc-700">"{item.quote}"</p>
                <div className="rounded-[12px] border border-zinc-200 bg-white px-4 py-3">
                  <p className="text-sm font-bold text-zinc-900">{item.name}</p>
                  <p className="text-xs text-zinc-500">{item.role}</p>
                  <p className="mt-1 text-xs font-semibold text-brand-main">{item.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
