import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";
import { buildBreadcrumbList, buildFaqPageSchema } from "@/lib/structured-data";

const baseUrl = getBaseUrl();

export const metadata: Metadata = buildPageMetadata({
  title: "Career Workshops for Universities and Institutes",
  description:
    "Book career workshops by Chanuka Jeewantha for universities, campuses, institutes, and student communities focused on CVs, LinkedIn, interviews, and career strategy.",
  path: "/workshops",
  keywords: [
    "career workshops sri lanka",
    "university cv workshop",
    "linkedin workshop students",
    "interview workshop",
  ],
});

const workshopTracks = [
  {
    title: "ATS CV Writing Workshop",
    summary: "Teach students and job seekers how to build recruiter-ready CVs that pass ATS screening and communicate results clearly.",
  },
  {
    title: "LinkedIn Positioning Workshop",
    summary: "Improve headline, About section, visibility, and profile authority for students, freshers, and professionals.",
  },
  {
    title: "Interview Readiness Workshop",
    summary: "Prepare stronger STAR stories, answer frameworks, and confidence systems for HR and panel interviews.",
  },
];

const faqs = [
  {
    question: "Who are these workshops for?",
    answer: "These workshops are ideal for universities, private institutes, student communities, and professional groups that want practical career-development training.",
  },
  {
    question: "Can the workshop be customized?",
    answer: "Yes. The session can be adjusted for fresh graduates, internship seekers, campus clubs, professional audiences, or specific departments and industries.",
  },
  {
    question: "Are online sessions available?",
    answer: "Yes. Workshops can be delivered online or in person depending on location, format, and audience needs.",
  },
];

export default function WorkshopsPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Workshops", path: "/workshops" },
  ]);
  const faqLd = buildFaqPageSchema(faqs);

  const coursesLd = workshopTracks.map((track) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: track.title,
    description: track.summary,
    provider: {
      "@type": "Person",
      name: "Chanuka Jeewantha",
      url: `${baseUrl}/about`,
    },
    url: `${baseUrl}/workshops`,
    inLanguage: "en",
    educationalLevel: "Beginner",
    teaches: track.summary,
    courseMode: ["online", "onsite"],
  }));

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Career Workshops and Campus Sessions",
    serviceType: "Career Development Workshop",
    provider: {
      "@type": "ProfessionalService",
      name: "Chanuka Jeewantha",
      url: `${baseUrl}/about`,
    },
    areaServed: "Sri Lanka",
    url: `${baseUrl}/workshops`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      {coursesLd.map((courseLd, index) => (
        <script
          key={`course-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                WORKSHOPS
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Workshops</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] max-w-5xl !text-white">
            Career workshops for <span className="text-brand-main">universities, institutes, and communities</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">
            Practical sessions on ATS CV writing, LinkedIn positioning, interviews, and career strategy for students, graduates, and professional communities.
          </p>
        </div>
      </section>

 <section className="w-full bg-white py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-14 max-w-4xl">
            <span className="text-brand-main font-semibold tracking-wider uppercase mb-2 block">Workshop Tracks</span>
            <h2 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-plus-jakarta text-foreground leading-[1.1] mb-4">
              Built for real student and professional outcomes.
            </h2>
            <p className="text-text-body text-lg">
              Each workshop is designed to move participants from passive advice to concrete next steps they can apply immediately after the session.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {workshopTracks.map((track) => (
 <article key={track.title} className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-8">
                <h3 className="text-[26px] font-bold font-plus-jakarta text-foreground">{track.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-text-body">{track.summary}</p>
              </article>
            ))}
          </div>

 <div className="mt-10 rounded-[20px] border border-zinc-200 bg-white p-8 shadow-sm">
            <h3 className="text-[30px] font-bold font-plus-jakarta text-foreground">Ideal For</h3>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                "Universities and campus career units",
                "Private institutes and training academies",
                "Student clubs and alumni groups",
                "Employability and graduate-readiness programs",
              ].map((item) => (
 <div key={item} className="rounded-[16px] border border-zinc-200 bg-zinc-50 p-5 text-sm font-medium text-zinc-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

 <div className="mt-10 rounded-[20px] border border-zinc-200 bg-zinc-50 p-8">
            <h3 className="text-[30px] font-bold font-plus-jakarta text-foreground">Frequently Asked Questions</h3>
            <div className="mt-6 space-y-5">
              {faqs.map((faq) => (
 <div key={faq.question} className="rounded-[16px] border border-zinc-200 bg-white p-5">
                  <p className="text-lg font-semibold text-foreground">{faq.question}</p>
                  <p className="mt-2 text-text-body">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

 <aside className="mt-10 rounded-[20px] border border-zinc-200 bg-foreground p-8 text-background">
            <h3 className="text-[30px] font-bold font-plus-jakarta !text-white">Book a Workshop</h3>
            <p className="mt-4 max-w-3xl text-text-light">
              If you want a workshop for your campus, institute, or community, the fastest next step is to reach out with audience size, session goals, and preferred format.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-[10px] bg-brand-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                Contact for Workshop Booking
              </Link>
 <Link href="/businesses" className="rounded-[10px] border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-foreground">
                Explore Business Lines
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
