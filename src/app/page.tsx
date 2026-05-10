import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/site-url";
import { buildPageMetadata } from "@/lib/seo";
import { ebooks } from "@/lib/ebooks";
import { getCachedPublicReviews } from "@/lib/reviews";
import { getCachedBlogListing } from "@/lib/blog-listing";
import { digitalResources } from "@/lib/resources";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export const metadata: Metadata = buildPageMetadata({
  title: "Premium CV Writing & LinkedIn Optimization Sri Lanka | CPRW & CPCC Certified | Chanuka Jeewantha",
  description:
    "Sri Lanka's trusted CPRW & CPCC certified CV writer. 60+ Google reviews, 5000+ CVs completed, 167K+ followers. Premium ATS CV, LinkedIn, Cover Letter & Foreign Job CV services starting from LKR 1,950.",
  path: "/",
});

function getBlogCoverImage(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("linkedin")) return "/images/linkedin-optimization-30k-followers-proof.jpg";
  if (normalized.includes("coach") || normalized.includes("roadmap") || normalized.includes("career")) return "/images/about-page-chanuka.jpg";
  if (normalized.includes("cv") || normalized.includes("ats")) return "/images/chanuka-jeewantha-career-development-specialist.jpg";
  return "/images/hero-chanuka.jpg";
}

export default async function Home() {
  const [blogPosts, publicReviews] = await Promise.all([
    getCachedBlogListing(),
    getCachedPublicReviews(),
  ]);

  const services = [
    {
      title: "CV Writing Services",
      desc: "Student, Professional, and Executive CV packages built for ATS parsing, recruiter readability, and clear career-stage positioning.",
      href: "/services/packages/cv-writing",
      isMostPopular: true,
    },
    {
      title: "Cover Letter Writing",
      desc: "Student, Professional, and Executive cover letters tailored to the role, your career stage, and the first impression you need.",
      href: "/services/packages/cover-letter-writing",
    },
    {
      title: "LinkedIn Account Optimization",
      desc: "Student, Professional, and Executive LinkedIn optimisation packages for stronger profile clarity, keywords, and recruiter visibility.",
      href: "/services/packages/linkedin-optimization",
    },
    {
      title: "CV Review Service",
      desc: "Expert CV reviews with clear ATS, structure, and impact improvements so you can implement high-value changes confidently.",
      href: "/services/packages/cv-review",
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

  const latestPosts = blogPosts.slice(0, 3);
  const testimonialHighlights = publicReviews.slice(0, 3);
  const ebookHighlights = ebooks.map((ebook, index) => ({
    slug: ebook.slug,
    title: ebook.title,
    image: ebook.coverImage,
    badge: index === 0 ? "Bestseller" : index === 1 ? "Productivity" : "Career Growth",
  }));

  const resourceHighlights = digitalResources
    .filter((resource) => resource.category === "free")
    .slice(0, 3)
    .map((resource) => ({
      title: resource.title,
      desc: resource.description,
      href: `/resources/${resource.slug}`,
      type: resource.resourceType,
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <section className="reveal-section w-full relative pt-[50px] md:pt-[73px] pb-[100px] md:pb-[146px] flex flex-col items-center justify-center overflow-hidden">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 w-full flex flex-col md:flex-row items-center gap-12 z-10">
          <div className="flex-1 flex flex-col items-start px-[24px]">
            <h1 className="font-heading text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.05em] tracking-tight mb-6 text-primary">
              Hi, I am <br /> <span className="text-brand-main">Chanuka Jeewantha</span>
            </h1>
            <p className="text-text-body text-[16px] md:text-[20px] font-normal leading-relaxed max-w-2xl mb-8">
              Professional CV Writer and Career Development Specialist with 8+ years of experience helping job seekers build ATS-friendly, recruiter-ready career profiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pricing"
                className="btn btn-primary"
              >
                View CV Writing Packages
              </Link>
              <Link
                href="/services"
                className="btn btn-secondary"
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

      <section className="trust-strip w-full bg-[#FAF8F3] py-[40px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="trust-container grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="trust-item text-center">
              <span className="trust-icon text-brand-main mb-3 flex justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </span>
              <strong className="block text-sm font-bold text-foreground">60+ Google Reviews</strong>
              <small className="block text-xs text-zinc-600">4.9/5 Average Rating</small>
            </div>
            <div className="trust-item text-center">
              <span className="trust-icon text-brand-main mb-3 flex justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
              </span>
              <strong className="block text-sm font-bold text-foreground">CPRW & CPCC Certified</strong>
              <small className="block text-xs text-zinc-600">International Standards</small>
            </div>
            <div className="trust-item text-center">
              <span className="trust-icon text-brand-main mb-3 flex justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              </span>
              <strong className="block text-sm font-bold text-foreground">167,000+ Followers</strong>
              <small className="block text-xs text-zinc-600">Trusted Community</small>
            </div>
            <div className="trust-item text-center">
              <span className="trust-icon text-brand-main mb-3 flex justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </span>
              <strong className="block text-sm font-bold text-foreground">5000+ CVs Completed</strong>
              <small className="block text-xs text-zinc-600">Across Industries</small>
            </div>
          </div>
        </div>
      </section>

      <div className="reveal-section w-full overflow-x-clip my-12">
        <section className="w-full bg-foreground py-6 overflow-hidden transform -rotate-2 scale-105">
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
                <span key={index} className="text-text-light text-[22px] md:text-[30px] font-heading font-bold uppercase whitespace-nowrap">
                  {skill} <span className="text-brand-main ml-[50px] md:ml-[90px]">*</span>
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="bundles-showcase w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white">
        <div className="container max-w-[1512px] mx-auto px-4 sm:px-6">
          <h2 className="section-title text-center text-[30px] sm:text-[40px] md:text-[56px] font-bold font-heading text-foreground leading-[1.1] mb-4">Most Clients Choose One of These 3 Packages</h2>
          <p className="section-subtitle text-center text-text-body max-w-2xl mx-auto mb-12">Bundled services. Better outcomes. Better value.</p>
          
          <div className="bundles-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bundle-card starter bg-white rounded-[20px] border border-zinc-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
              <span className="bundle-tag inline-block rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 mb-4">For Students & Graduates</span>
              <h3 className="text-[24px] font-bold font-heading text-foreground mb-4">🎓 Starter Pack</h3>
              <div className="bundle-price mb-6">
                <span className="price-amount text-[28px] font-bold text-foreground">LKR 9,500</span>
                <span className="price-original line-through block text-sm text-zinc-400">LKR 11,850</span>
                <span className="price-note block text-sm text-zinc-600">Essentials Tier • Save 20%</span>
              </div>
              <ul className="bundle-includes space-y-2 text-sm text-zinc-700 mb-6">
                <li>✓ Essentials ATS CV</li>
                <li>✓ Cover Letter</li>
                <li>✓ LinkedIn Optimization</li>
                <li>✓ 7-day delivery</li>
              </ul>
              <a href="/catalogue?bundle=starter" className="bundle-cta inline-block w-full text-center px-6 py-3 border border-zinc-300 rounded-[10px] text-zinc-700 font-semibold hover:border-brand-main hover:text-brand-main transition-colors">
                Get Started →
              </a>
            </div>
            
            <div className="bundle-card career featured bg-white rounded-[20px] border-2 border-[#C9A961] p-6 shadow-lg hover:shadow-xl transition-shadow transform scale-105">
              <span className="bundle-tag-popular inline-block rounded-full bg-[#C9A961] text-white px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4">⭐ MOST POPULAR</span>
              <span className="bundle-tag block rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 mb-4">For Working Professionals</span>
              <h3 className="text-[24px] font-bold font-heading text-foreground mb-4">🚀 Career Pack</h3>
              <div className="bundle-price mb-6">
                <span className="price-amount text-[28px] font-bold text-foreground">LKR 22,500</span>
                <span className="price-original line-through block text-sm text-zinc-400">LKR 30,000</span>
                <span className="price-savings block text-sm font-bold text-[#10B981]">Save LKR 7,500</span>
                <span className="price-note block text-sm text-zinc-600">Signature Tier</span>
              </div>
              <ul className="bundle-includes space-y-2 text-sm text-zinc-700 mb-6">
                <li>✓ Signature ATS CV</li>
                <li>✓ Cover Letter</li>
                <li>✓ LinkedIn Optimization</li>
                <li>✓ Foreign Job CV</li>
                <li>✓ 30-day premium support</li>
                <li>✓ Direct WhatsApp access to Chanuka</li>
              </ul>
              <a href="/catalogue?bundle=career" className="bundle-cta primary inline-block w-full text-center px-6 py-3 bg-[#C9A961] rounded-[10px] text-white font-semibold hover:bg-[#C9A961]/90 transition-colors">
                Choose Career Pack →
              </a>
            </div>
            
            <div className="bundle-card executive bg-white rounded-[20px] border border-zinc-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
              <span className="bundle-tag inline-block rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 mb-4">For Senior Professionals</span>
              <h3 className="text-[24px] font-bold font-heading text-foreground mb-4">👑 Executive Pack</h3>
              <div className="bundle-price mb-6">
                <span className="price-amount text-[28px] font-bold text-foreground">LKR 45,000</span>
                <span className="price-original line-through block text-sm text-zinc-400">LKR 60,000</span>
                <span className="price-savings block text-sm font-bold text-[#10B981]">Save LKR 15,000</span>
                <span className="price-note block text-sm text-zinc-600">Signature Tier</span>
              </div>
              <ul className="bundle-includes space-y-2 text-sm text-zinc-700 mb-6">
                <li>✓ Executive Signature CV</li>
                <li>✓ Foreign Job CV</li>
                <li>✓ Executive LinkedIn Optimization</li>
                <li>✓ Executive Cover Letter</li>
                <li>✓ 1-Hour Strategy Consultation</li>
                <li>✓ 60-day premium support</li>
              </ul>
              <a href="/catalogue?bundle=executive" className="bundle-cta inline-block w-full text-center px-6 py-3 border border-zinc-300 rounded-[10px] text-zinc-700 font-semibold hover:border-brand-main hover:text-brand-main transition-colors">
                View Executive Pack →
              </a>
            </div>
            
          </div>
          
          <div className="bundles-footer text-center mt-12 space-y-3">
            <p className="text-zinc-600">Need something specific? <a href="/catalogue" className="text-brand-main font-semibold hover:text-brand-dark transition-colors">View all individual services →</a></p>
            <p className="text-zinc-500">
              Need help choosing?{" "}
              <a
                href="https://wa.me/94773902230?text=Hi%20Chanuka%2C%20I%20need%20help%20choosing%20a%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#25D366] font-semibold hover:text-[#1fb85a] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.596-.798-6.36-2.144l-.444-.34-3.262 1.093 1.093-3.262-.34-.444A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                Order on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="reveal-section w-full py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-brand-dark font-semibold tracking-wider uppercase mb-2 block">What I Do</span>
              <h2 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-heading text-foreground leading-[1.1]">
                Career Services <span className="text-brand-dark">That Deliver Results</span>
              </h2>
            </div>
            <Link href="/services" className="px-[25px] py-[15px] border border-foreground hover:bg-foreground hover:text-background rounded-[10px] text-foreground font-medium transition-colors">
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
                <h3 className="text-[28px] font-bold font-heading mb-4">{service.title}</h3>
                <p className="text-text-body mb-8 flex-grow">{service.desc}</p>
                <Link href={service.href} aria-label={`Learn more about ${service.title}`} className="text-brand-dark hover:text-brand-main font-semibold flex items-center gap-2 transition-transform hover:translate-x-2">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

 <section className="reveal-section w-full border-t border-zinc-200 bg-[#F4F7F6] py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark">Digital Store</span>
              <h3 className="text-[30px] font-bold font-heading text-foreground">Ebooks</h3>
            </div>
 <Link href="/ebooks" className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
              See All Ebooks
            </Link>
          </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ebookHighlights.map((item) => (
 <article key={item.slug} className="group flex flex-col justify-between overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.12)] w-full">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-brand-main px-3 py-1 text-xs font-semibold text-foreground">{item.badge}</span>
                </div>
                <div className="p-5">
 <p className="line-clamp-2 text-[13px] font-bold leading-snug text-zinc-900">{item.title}</p>
                  <Link href={`/ebooks/${item.slug}`} aria-label={`Explore ebook: ${item.title}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
                    Explore Ebook
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

 <section className="reveal-section w-full border-t border-zinc-200 bg-zinc-900 py-[96px] text-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">Guides & Templates</span>
              <h3 className="text-[30px] font-bold font-heading text-white">Resources</h3>
            </div>
 <Link href="/resources" className="rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black">
              See All Resources
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceHighlights.map((item) => (
 <article key={item.title} className="group h-full flex flex-col rounded-[20px] border border-zinc-700 bg-zinc-800 p-8 transition-all hover:-translate-y-1 hover:border-brand-main/40 hover:shadow-[0_16px_36px_rgba(255,255,255,0.05)]">
 <span className="mb-3 self-start inline-flex rounded-full border border-brand-main/30 bg-brand-main/10 px-3 py-1 text-xs font-semibold text-white">{item.type}</span>
 <h4 className="mb-2 text-[20px] font-bold font-heading text-white transition-colors">{item.title}</h4>
 <p className="mb-5 text-sm leading-relaxed text-white transition-colors">{item.desc}</p>
 <Link href={item.href} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand-main">
                  Open Resource
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

 <section className="reveal-section w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white">
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
              <span className="text-brand-dark font-semibold tracking-wider uppercase mb-4 block">About Me</span>
              <h2 className="text-[36px] md:text-[52px] font-bold font-heading text-foreground leading-[1.2] mb-6">
                Strategy, proof, and clear communication to help professionals win in modern hiring systems.
              </h2>
              <p className="text-text-body text-[18px] mb-10 leading-relaxed">
                I support fresh graduates, mid-level professionals, career switchers, and international applicants with practical, market-aligned career development services.
              </p>

              <div className="grid grid-cols-2 gap-6 w-full">
 <div className="border border-zinc-200 rounded-[15px] p-6 flex flex-col hover:border-brand-main transition-colors text-center md:text-left">
                  <span className="text-[40px] font-bold font-heading text-brand-dark mb-2">8+</span>
                  <span className="text-text-body font-medium">Years Experience</span>
                </div>
 <div className="border border-zinc-200 rounded-[15px] p-6 flex flex-col hover:border-brand-main transition-colors text-center md:text-left">
                  <span className="text-[40px] font-bold font-heading text-brand-dark mb-2">30K+</span>
                  <span className="text-text-body font-medium">LinkedIn Growth Proof</span>
                </div>
 <div className="border border-zinc-200 rounded-[15px] p-6 flex flex-col hover:border-brand-main transition-colors text-center md:text-left">
                  <span className="text-[40px] font-bold font-heading text-brand-dark mb-2">5000+</span>
                  <span className="text-text-body font-medium">CVs Completed Across Industries</span>
                </div>
 <div className="border border-zinc-200 rounded-[15px] p-6 flex flex-col hover:border-brand-main transition-colors text-center md:text-left">
                  <span className="text-[40px] font-bold font-heading text-brand-dark mb-2">8</span>
                  <span className="text-text-body font-medium">Core Career Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

 <section className="reveal-section w-full border-t border-zinc-200 bg-brand-dark/[0.02] py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark">Client Voice</span>
              <h3 className="text-[30px] font-bold font-heading text-foreground">Testimonials</h3>
            </div>
 <Link href="/testimonials" className="rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
              See All Testimonials
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialHighlights.map((item) => (
 <article key={item.id} className="group flex flex-col w-full rounded-[20px] border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-6 shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#f59e0b]" aria-hidden="true">
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    ))}
                  </div>
                  <span className="rounded-full bg-brand-main/10 px-3 py-1 text-xs font-semibold text-brand-dark">Verified Review</span>
                </div>
 <p className="mb-5 text-[15px] leading-relaxed text-zinc-700">"{item.message}"</p>
 <div className="mt-auto rounded-[12px] border border-zinc-200 bg-white px-4 py-3">
 <p className="text-sm font-bold text-zinc-900">{item.name}</p>
                  <p className="text-xs text-zinc-500">
                    {item.role ?? new Date(item.createdAt).toLocaleDateString("en-LK")}
                  </p>
                  {item.outcome ? <p className="mt-1 text-xs font-semibold text-brand-dark">{item.outcome}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After CV Comparison */}
      <section className="reveal-section w-full py-[64px] sm:py-[80px] md:py-[96px] bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-brand-dark font-semibold tracking-wider uppercase mb-2 block">Real Transformation</span>
            <h2 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-heading text-foreground leading-[1.1]">
              See the <span className="text-brand-dark">CV Difference</span>
            </h2>
            <p className="mt-4 text-text-body max-w-2xl mx-auto">
              Drag the slider to compare a typical before CV against the ATS-optimised, recruiter-ready version produced with my process.
            </p>
          </div>
          <div className="max-w-[680px] mx-auto aspect-[3/4]">
            <BeforeAfterSlider
              beforeSrc="/images/cv-before-graphic.svg"
              beforeAlt="Before CV sample: colorful graphical CV with decorative layout"
              afterSrc="/images/cv-after-ats-template.svg"
              afterAlt="After CV sample: clean ATS-friendly CV template"
              className="w-full h-full"
            />
          </div>
          <p className="text-center mt-6 text-sm text-zinc-500">
            Sample only - real client CVs are kept strictly confidential.
          </p>
        </div>
      </section>

      <section className="reveal-section w-full py-[64px] sm:py-[80px] md:py-[96px] bg-foreground text-background">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-3xl">
              <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">Latest Insights</span>
              <h2 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-heading leading-[1.1] !text-white">
                Career guidance for ATS-ready applications, LinkedIn visibility, and strategic growth.
              </h2>
            </div>
 <Link href="/blog" className="px-[25px] py-[15px] border border-white/80 hover:bg-white hover:text-foreground rounded-[10px] text-white font-semibold transition-colors whitespace-nowrap">
              Read Blog
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <article key={post.slug} className="overflow-hidden rounded-[20px] border border-white/20 bg-zinc-900/40 transition-colors hover:bg-zinc-800/60">
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image
                    src={getBlogCoverImage(post.category)}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-subtle">
                    {post.category}
                  </p>
                  <h3 className="text-[24px] font-bold font-heading mb-3 !text-white">{post.title}</h3>
                  <p className="!text-white text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} aria-label={`Read more: ${post.title}`} className="text-white font-semibold transition-colors">
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section w-full py-[64px] sm:py-[80px] md:py-[96px] bg-white">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-brand-dark font-semibold tracking-wider uppercase mb-2 block">Frequently Asked Questions</span>
            <h2 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-heading text-foreground leading-[1.1]">
              Your Questions <span className="text-brand-dark">Answered</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            <details className="faq-item bg-zinc-50 rounded-[12px] p-6 border border-zinc-200">
              <summary className="font-semibold text-lg text-foreground cursor-pointer">What's the difference between Signature Series and Essentials?</summary>
              <p className="mt-4 text-zinc-600">Signature Series CVs are personally crafted by Chanuka Jeewantha (CPRW, CPCC) with deep industry research, country-specific optimization, and 30-day post-delivery support. Essentials are created by our trained team and supervised by Chanuka — same quality framework at a more accessible price point. Both are professional, ATS-friendly, and result-driven.</p>
            </details>
            <details className="faq-item bg-zinc-50 rounded-[12px] p-6 border border-zinc-200">
              <summary className="font-semibold text-lg text-foreground cursor-pointer">How long does delivery take?</summary>
              <p className="mt-4 text-zinc-600">Signature Series: 5 business days (premium turnaround). Essentials: 7 business days. Rush delivery available for both tiers (+LKR 1,500).</p>
            </details>
            <details className="faq-item bg-zinc-50 rounded-[12px] p-6 border border-zinc-200">
              <summary className="font-semibold text-lg text-foreground cursor-pointer">Do you offer revisions?</summary>
              <p className="mt-4 text-zinc-600">Yes. Both tiers include 2 free revisions within 14 days of initial delivery. Additional revisions available at LKR 500 per round.</p>
            </details>
            <details className="faq-item bg-zinc-50 rounded-[12px] p-6 border border-zinc-200">
              <summary className="font-semibold text-lg text-foreground cursor-pointer">What payment methods are accepted?</summary>
              <p className="mt-4 text-zinc-600">Bank transfer, PayHere (cards/online), and direct deposit. International clients can pay via Wise, PayPal, or USD bank transfer.</p>
            </details>
            <details className="faq-item bg-zinc-50 rounded-[12px] p-6 border border-zinc-200">
              <summary className="font-semibold text-lg text-foreground cursor-pointer">Do you offer a money-back guarantee?</summary>
              <p className="mt-4 text-zinc-600">Yes. If you're not satisfied with the first draft, we'll refund 100% within 7 days — no questions asked. Our reputation depends on client success.</p>
            </details>
            <details className="faq-item bg-zinc-50 rounded-[12px] p-6 border border-zinc-200">
              <summary className="font-semibold text-lg text-foreground cursor-pointer">Can I get a sample before paying?</summary>
              <p className="mt-4 text-zinc-600">We offer a free 5-point CV audit (review of your existing CV with improvement recommendations). For our work samples, view our portfolio section. Custom samples are part of paid services to ensure quality.</p>
            </details>
            <details className="faq-item bg-zinc-50 rounded-[12px] p-6 border border-zinc-200">
              <summary className="font-semibold text-lg text-foreground cursor-pointer">Why are your prices higher than some other services?</summary>
              <p className="mt-4 text-zinc-600">Three reasons: (1) CPRW & CPCC certified expertise vs unqualified writers, (2) personalized service vs templates, (3) outcome-focused approach with 30-day post-delivery support. Compare results, not just prices.</p>
            </details>
            <details className="faq-item bg-zinc-50 rounded-[12px] p-6 border border-zinc-200">
              <summary className="font-semibold text-lg text-foreground cursor-pointer">Do you serve international clients?</summary>
              <p className="mt-4 text-zinc-600">Yes. We serve Sri Lankan diaspora in UAE, Australia, Canada, UK, EU, and beyond. We accept USD payments and understand multi-country job market requirements.</p>
            </details>
          </div>
        </div>
      </section>

    </>
  );
}
