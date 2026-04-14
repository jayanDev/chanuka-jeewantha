import { notFound } from "next/navigation";
import Link from "next/link";
import { getPortfolioByUsername } from "@/lib/portfolios";

export async function generateMetadata(props: { params: Promise<{ username: string }> }) {
  const params = await props.params;
  const portfolio = getPortfolioByUsername(params.username);
  if (!portfolio) return null;

  return {
    title: `${portfolio.fullName} | ${portfolio.tagline}`,
    description: portfolio.aboutSummary.substring(0, 160),
    robots: { index: true, follow: true },
  };
}

export default async function PortfolioPage(props: { params: Promise<{ username: string }> }) {
  const params = await props.params;
  const portfolio = getPortfolioByUsername(params.username);

  if (!portfolio) {
    notFound();
  }

  // Determine theme base
  const isDark = portfolio.theme === "dark";
  const bgMain = isDark ? "bg-[#0a0a0a]" : "bg-white";
  const textMain = isDark ? "text-white" : "text-black";
  const textSub = isDark ? "text-zinc-400" : "text-zinc-600";
  const cardBg = isDark ? "bg-[#141414] border-zinc-800" : "bg-zinc-50 border-zinc-200";

  return (
    <div className={`w-full min-h-screen ${bgMain} ${textMain}`}>
      {/* Dynamic Watermark Header for Marketing */}
      <div className="w-full bg-brand-main text-white py-2 text-center text-xs font-semibold px-4 cursor-default">
        Created by Chanuka Jeewantha Career Services • <Link href="/" className="underline hover:text-zinc-200">Build Yours Now</Link>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-16 md:py-24">
        
        {/* 1. Hero Section */}
        <section className="mb-20 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${portfolio.availabilityStatus === 'Open to Work' ? 'bg-green-400' : 'bg-brand-main'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${portfolio.availabilityStatus === 'Open to Work' ? 'bg-green-500' : 'bg-brand-main'}`}></span>
                </span>
                <span className={`text-sm font-semibold uppercase tracking-widest ${textSub}`}>
                  {portfolio.availabilityStatus}
                </span>
              </div>
              <h1 className="text-[48px] md:text-[80px] font-extrabold font-plus-jakarta leading-[1] mb-6 tracking-tight">
                {portfolio.fullName}.
              </h1>
              <p className="text-[20px] md:text-[28px] font-semibold text-brand-main max-w-2xl">
                {portfolio.tagline}
              </p>
            </div>

            {/* Sticky Action Buttons (Desktop) */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              <a href={`mailto:${portfolio.email}`} className="w-full text-center px-6 py-4 bg-brand-main text-white font-bold rounded-[12px] hover:bg-brand-dark transition-all hover:scale-105 shadow-lg shadow-brand-main/20">
                Email Me
              </a>
              {portfolio.whatsappNumber && (
                <a href={`https://wa.me/${portfolio.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className={`w-full text-center px-6 py-4 border-2 font-bold rounded-[12px] transition-colors ${isDark ? 'border-zinc-800 hover:bg-zinc-800' : 'border-zinc-200 hover:bg-zinc-100'}`}>
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>

        {/* 2. About Section */}
        <section className="mb-24">
          <h2 className={`text-sm font-bold uppercase tracking-widest mb-6 border-l-4 border-brand-main pl-4 ${textSub}`}>
            About Profile
          </h2>
          <p className={`text-[18px] md:text-[22px] leading-[1.8] font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-800'} max-w-4xl`}>
            {portfolio.aboutSummary}
          </p>
        </section>

        {/* 3. Core Skills Grid */}
        <section className="mb-24">
          <h2 className={`text-sm font-bold uppercase tracking-widest mb-8 border-l-4 border-brand-main pl-4 ${textSub}`}>
            Core Competencies
          </h2>
          <div className="flex flex-wrap gap-4">
            {portfolio.skills.map((skill, idx) => (
              <div key={idx} className={`px-6 py-4 rounded-[12px] border ${cardBg} flex items-center justify-between gap-6`}>
                <span className="font-bold text-lg">{skill.name}</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isDark ? 'bg-zinc-800 text-brand-main' : 'bg-brand-main/10 text-brand-main'}`}>
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Experience Timeline */}
        <section className="mb-24">
          <h2 className={`text-sm font-bold uppercase tracking-widest mb-12 border-l-4 border-brand-main pl-4 ${textSub}`}>
            Professional Experience
          </h2>
          <div className="space-y-12 pl-6 md:pl-0">
            {portfolio.experience.map((exp) => (
              <div key={exp.id} className="relative md:flex gap-12 group">
                <div className="hidden md:block w-48 flex-shrink-0 pt-1">
                  <span className={`font-mono font-bold text-sm ${textSub}`}>{exp.duration}</span>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute -left-[35px] md:left-[192px] top-1.5 w-4 h-4 rounded-full border-4 border-brand-main bg-[#0a0a0a] group-hover:bg-brand-main transition-colors z-10"></div>
                {/* Timeline Line */}
                <div className="absolute -left-[28px] md:left-[199px] top-6 bottom-[-3rem] w-[2px] bg-zinc-800 last-of-type:hidden"></div>

                <div className="flex-grow">
                  <span className={`md:hidden block font-mono font-bold text-xs mb-2 ${textSub}`}>{exp.duration}</span>
                  <h3 className="text-[24px] font-bold mb-1 leading-tight">{exp.role}</h3>
                  <a className={`text-[18px] font-semibold text-brand-main mb-4 block`}>{exp.organization}</a>
                  <p className={`mb-6 leading-relaxed ${textSub}`}>
                    {exp.description}
                  </p>
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-3">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          <span className={isDark ? 'text-zinc-300' : 'text-zinc-800'}>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Education Timeline */}
        <section>
          <h2 className={`text-sm font-bold uppercase tracking-widest mb-12 border-l-4 border-brand-main pl-4 ${textSub}`}>
            Education & Certifications
          </h2>
          <div className="space-y-12 pl-6 md:pl-0">
            {portfolio.education.map((edu) => (
              <div key={edu.id} className="relative md:flex gap-12 group">
                <div className="hidden md:block w-48 flex-shrink-0 pt-1">
                  <span className={`font-mono font-bold text-sm ${textSub}`}>{edu.duration}</span>
                </div>
                
                <div className="absolute -left-[35px] md:left-[192px] top-1.5 w-4 h-4 rounded-full border-4 border-zinc-600 bg-[#0a0a0a] group-hover:border-white transition-colors z-10"></div>
                <div className="absolute -left-[28px] md:left-[199px] top-6 bottom-[-3rem] w-[2px] bg-zinc-800 last-of-type:hidden"></div>

                <div className="flex-grow">
                  <span className={`md:hidden block font-mono font-bold text-xs mb-2 ${textSub}`}>{edu.duration}</span>
                  <h3 className="text-[20px] font-bold mb-1 leading-tight">{edu.role}</h3>
                  <p className={`text-[16px] font-semibold mb-3 ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>{edu.organization}</p>
                  <p className={`leading-relaxed ${textSub}`}>
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
