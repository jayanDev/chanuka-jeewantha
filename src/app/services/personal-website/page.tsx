import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import SubscribeForm from "@/components/SubscribeForm";
import { buildPageMetadata } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";
import { buildBreadcrumbList } from "@/lib/structured-data";

const baseUrl = getBaseUrl();

export const metadata: Metadata = buildPageMetadata({
  title: "Personal Website Service | Career Portfolio Website for Job Seekers",
  description:
    "Build a personal career website that turns your CV claims into visible proof with a portfolio-style profile, contact links, and stronger digital presence.",
  path: "/services/personal-website",
  keywords: [
    "personal career website",
    "portfolio website for job seekers",
    "professional personal website sri lanka",
    "career portfolio service",
  ],
});

export default function PersonalWebsiteServicePage() {
  const websiteDirections = [
    {
      title: "Clean Executive Profile",
      summary: "A polished personal site for managers, specialists, and leaders who need a strong public profile and contact-ready digital presence.",
    },
    {
      title: "Portfolio-Led Career Site",
      summary: "A proof-focused layout for marketers, creatives, consultants, and specialists who need featured work and visible authority.",
    },
    {
      title: "Application Support Profile",
      summary: "A practical public link you can share with recruiters to support your CV, LinkedIn profile, and interview conversations.",
    },
  ];

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Personal Website", path: "/services/personal-website" },
  ]);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Personal Career Website Service",
    description:
      "A portfolio-style personal website service that helps professionals present career proof, experience, and positioning more clearly online.",
    serviceType: "Career Portfolio Website",
    provider: {
      "@type": "ProfessionalService",
      name: "Chanuka Jeewantha",
      url: `${baseUrl}/about`,
    },
    url: `${baseUrl}/services/personal-website`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />

      <section className="w-full bg-foreground text-white pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/services" className="hover:text-brand-main transition-colors">Services</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Personal Website</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] max-w-5xl !text-white">
            Turn your career claims into <span className="text-brand-main">visible proof online</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">
            A personal website helps recruiters, hiring managers, and clients understand your story faster than a CV alone. It gives your career brand a visible home.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <article className="rounded-[22px] border border-zinc-200 bg-white p-7 md:p-10 shadow-sm">
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[18px] border border-zinc-200">
                <Image
                  src="/images/hero-chanuka.jpg"
                  alt="Personal website and portfolio service"
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none prose-headings:font-plus-jakarta prose-headings:text-foreground prose-p:text-text-body">
                <h2>Why this service matters</h2>
                <p>
                  A good CV helps you get shortlisted. A personal website helps people verify your story, understand your direction, and remember you more easily. It creates stronger digital presence and better proof for modern hiring behavior.
                </p>

                <h3>Ideal for</h3>
                <ul>
                  <li>Professionals applying to competitive or international roles</li>
                  <li>People building a stronger LinkedIn and personal brand together</li>
                  <li>Candidates who want a portfolio-style proof layer beyond their CV</li>
                  <li>Freelancers, specialists, and leaders who need more visible authority</li>
                </ul>

                <h3>What the website can include</h3>
                <ul>
                  <li>About summary and professional positioning</li>
                  <li>Experience timeline and career highlights</li>
                  <li>Skills, certifications, and proof-based achievements</li>
                  <li>Email, WhatsApp, LinkedIn, and direct contact options</li>
                  <li>A branded public profile link you can share with recruiters</li>
                </ul>

                <h3>How it supports SEO and digital presence</h3>
                <p>
                  A personal website gives you a searchable home for your professional identity. Instead of depending only on a CV attachment or one social profile, you get a more stable digital asset that supports visibility, trust, and long-term positioning.
                </p>

                <h3>What this looks like in practice</h3>
                <p>
                  The final direction depends on your audience. Some professionals need a cleaner executive profile, some need a visible portfolio layer, and others need a recruiter-friendly proof page that supports applications directly.
                </p>
              </div>

              <div className="mt-10 rounded-[18px] border border-zinc-200 bg-zinc-50 p-6">
                <h3 className="text-[26px] font-bold font-plus-jakarta text-foreground">Template Directions</h3>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {websiteDirections.map((item) => (
                    <div key={item.title} className="rounded-[16px] border border-zinc-200 bg-white p-5">
                      <p className="text-[20px] font-bold font-plus-jakarta text-foreground">{item.title}</p>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-[18px] border border-zinc-200 bg-white p-6">
                <h3 className="text-[26px] font-bold font-plus-jakarta text-foreground">Proof Example</h3>
                <p className="mt-3 text-text-body">
                  See how a personal website can support public proof, stronger digital presence, and a cleaner professional story across CV, LinkedIn, and outreach.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/case-studies/personal-website-career-portfolio-launch" className="rounded-[10px] bg-brand-main px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                    View Personal Website Case Study
                  </Link>
                  <Link href="/results" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
                    Browse Results Hub
                  </Link>
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6">
                <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground">Explore Examples</h3>
                <div className="mt-5 flex flex-col gap-3">
                  <Link href="/p/nimal-perera" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
                    View Sample Career Website
                  </Link>
                  <Link href="/case-studies/personal-website-career-portfolio-launch" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
                    Personal Website Case Study
                  </Link>
                  <Link href="/portfolio" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
                    Browse Portfolio
                  </Link>
                </div>
              </div>

              <div className="rounded-[20px] border border-zinc-200 bg-white p-6">
                <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground">Plan Your Stack</h3>
                <div className="mt-5 flex flex-col gap-3">
                  <Link href="/services/packages/linkedin-optimization" className="rounded-[10px] border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
                    Add LinkedIn Optimization
                  </Link>
                  <Link href="/services/packages/cv-writing" className="rounded-[10px] border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
                    Add CV Writing
                  </Link>
                  <Link href="/contact" className="rounded-[10px] bg-brand-main px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                    Contact for Personal Website Service
                  </Link>
                </div>
              </div>

              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6">
                <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground">Need direction first?</h3>
                <div className="mt-5 flex flex-col gap-3">
                  <Link href="/career-quiz" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
                    Take Career Quiz
                  </Link>
                  <Link href="/services/industries" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
                    Browse Industry Pages
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SubscribeForm />
    </>
  );
}
