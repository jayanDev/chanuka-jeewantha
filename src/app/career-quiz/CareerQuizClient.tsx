"use client";

import Link from "next/link";
import { useState } from "react";

type QuizAnswers = {
  stage: "student" | "mid" | "senior" | "switcher";
  goal: "callbacks" | "visibility" | "interviews" | "digital-presence" | "complete-brand";
  gap: "cv-none" | "cv-review" | "linkedin" | "proof" | "interviews";
  target: "local" | "international" | "both";
  industry:
    | "software-it"
    | "finance-accounting"
    | "marketing-sales"
    | "hr-admin"
    | "engineering-operations"
    | "fresh-graduates"
    | "general";
  support: "done-for-you" | "hybrid" | "self-serve";
};

type Recommendation = {
  label: string;
  href: string;
  reason: string;
};

type QuizQuestion = {
  key: keyof QuizAnswers;
  title: string;
  options: Array<{
    value: string;
    label: string;
    description: string;
  }>;
};

const questions: QuizQuestion[] = [
  {
    key: "stage",
    title: "Where are you in your career right now?",
    options: [
      { value: "student", label: "Student / Fresher", description: "You need a clear starting point and entry-level positioning." },
      { value: "mid", label: "Mid-Level", description: "You have experience but need better proof and stronger positioning." },
      { value: "senior", label: "Senior / Leadership", description: "You need sharper credibility, authority, and executive-level proof." },
      { value: "switcher", label: "Career Switcher", description: "You are repositioning for a new role, function, or industry." },
    ],
  },
  {
    key: "goal",
    title: "What is your biggest goal right now?",
    options: [
      { value: "callbacks", label: "Get More Interviews", description: "Improve shortlist conversion with stronger application assets." },
      { value: "visibility", label: "Improve LinkedIn Visibility", description: "Increase recruiter discovery and profile credibility." },
      { value: "interviews", label: "Perform Better in Interviews", description: "Prepare stronger examples and answer structures." },
      { value: "digital-presence", label: "Build Digital Presence", description: "Add visible proof beyond the CV and LinkedIn profile." },
      { value: "complete-brand", label: "Build a Full Career Brand", description: "Align CV, LinkedIn, and proof assets together." },
    ],
  },
  {
    key: "gap",
    title: "What feels weakest right now?",
    options: [
      { value: "cv-none", label: "I need a stronger CV", description: "Your CV needs a rewrite, better structure, or stronger ATS fit." },
      { value: "cv-review", label: "I have a CV, but it needs feedback", description: "You already have a draft and want expert direction." },
      { value: "linkedin", label: "My LinkedIn is weak", description: "Your public profile is not helping recruiter visibility." },
      { value: "proof", label: "I need proof and portfolio presence", description: "You need a stronger digital layer and visible authority." },
      { value: "interviews", label: "I struggle to answer interview questions", description: "You need clearer stories and answer frameworks." },
    ],
  },
  {
    key: "target",
    title: "What hiring market are you targeting?",
    options: [
      { value: "local", label: "Sri Lanka", description: "Your immediate focus is local job applications." },
      { value: "international", label: "International", description: "You need stronger global-standard positioning." },
      { value: "both", label: "Both", description: "You want assets that work across local and overseas applications." },
    ],
  },
  {
    key: "industry",
    title: "Which audience fits you best?",
    options: [
      { value: "software-it", label: "Software & IT", description: "Engineering, product, QA, DevOps, and technical roles." },
      { value: "finance-accounting", label: "Finance & Accounting", description: "Accounting, audit, finance, and analytical roles." },
      { value: "marketing-sales", label: "Marketing & Sales", description: "Growth, brand, business development, and commercial roles." },
      { value: "hr-admin", label: "HR & Administration", description: "People operations, HR, admin, and coordination roles." },
      { value: "engineering-operations", label: "Engineering & Operations", description: "Operations, manufacturing, logistics, and project roles." },
      { value: "fresh-graduates", label: "Fresh Graduate", description: "Internship, trainee, and entry-level positioning." },
      { value: "general", label: "General / Mixed", description: "You want the best overall recommendation first." },
    ],
  },
  {
    key: "support",
    title: "What type of help do you want?",
    options: [
      { value: "done-for-you", label: "Done-For-You", description: "You want professional support and faster execution." },
      { value: "hybrid", label: "Hybrid", description: "You want tools plus expert support where it matters most." },
      { value: "self-serve", label: "Self-Serve", description: "You want practical tools and templates first." },
    ],
  },
];

function getPrimaryRecommendation(answers: QuizAnswers): Recommendation {
  const scores = {
    cvWriting: 0,
    cvReview: 0,
    linkedin: 0,
    personalWebsite: 0,
    bundle: 0,
  };

  if (answers.goal === "callbacks") scores.cvWriting += 4;
  if (answers.goal === "visibility") scores.linkedin += 4;
  if (answers.goal === "interviews") scores.cvReview += 2;
  if (answers.goal === "digital-presence") scores.personalWebsite += 5;
  if (answers.goal === "complete-brand") scores.bundle += 5;

  if (answers.gap === "cv-none") scores.cvWriting += 5;
  if (answers.gap === "cv-review") scores.cvReview += 5;
  if (answers.gap === "linkedin") scores.linkedin += 5;
  if (answers.gap === "proof") scores.personalWebsite += 6;
  if (answers.gap === "interviews") scores.cvReview += 3;

  if (answers.target === "international") {
    scores.cvWriting += 2;
    scores.linkedin += 1;
    scores.personalWebsite += 1;
  }
  if (answers.target === "both") {
    scores.cvWriting += 1;
    scores.bundle += 2;
  }

  if (answers.stage === "senior") {
    scores.personalWebsite += 2;
    scores.linkedin += 1;
  }
  if (answers.stage === "switcher") {
    scores.cvWriting += 2;
    scores.cvReview += 2;
  }
  if (answers.stage === "student") {
    scores.cvWriting += 1;
    scores.linkedin += 1;
  }

  if (answers.support === "done-for-you") {
    scores.cvWriting += 1;
    scores.linkedin += 1;
    scores.personalWebsite += 1;
  }
  if (answers.support === "self-serve") {
    scores.cvReview += 1;
  }

  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "cvWriting";

  if (top === "bundle") {
    return {
      label: "Career Brand Trinity Bundle",
      href: "/offers/career-brand-trinity-bundle",
      reason: "Your answers point to a multi-asset upgrade, so the best next step is aligning CV, cover letter, and LinkedIn together.",
    };
  }
  if (top === "personalWebsite") {
    return {
      label: "Personal Website Service",
      href: "/services/personal-website",
      reason: "You need a stronger digital proof layer, not just a better document. A personal website makes your positioning easier to verify and remember.",
    };
  }
  if (top === "linkedin") {
    return {
      label: "LinkedIn Optimization Service",
      href: "/services/packages/linkedin-optimization",
      reason: "Your fastest win is stronger recruiter visibility and profile positioning, so LinkedIn optimization is the highest-impact move.",
    };
  }
  if (top === "cvReview") {
    return {
      label: "CV Review Service",
      href: "/services/packages/cv-review",
      reason: "You already have a base CV, so expert review and direction are the most efficient next step before a full rewrite.",
    };
  }

  return {
    label: "Professional CV Writing Service",
    href: "/services/packages/cv-writing",
    reason: "Your answers suggest the biggest leverage point is a stronger ATS-ready CV with clearer role targeting and proof-based writing.",
  };
}

function getToolRecommendation(answers: QuizAnswers): Recommendation {
  if (answers.goal === "visibility" || answers.gap === "linkedin") {
    return {
      label: "LinkedIn Headline Generator",
      href: "/tools/linkedin-headline-generator",
      reason: "Use this to sharpen your positioning language before you rewrite the rest of your profile.",
    };
  }

  if (answers.goal === "interviews" || answers.gap === "interviews") {
    return {
      label: "Interview Story Bank Builder",
      href: "/tools/interview-story-bank",
      reason: "This helps you turn raw experience into reusable STAR stories for interviews and panel questions.",
    };
  }

  return {
    label: "ATS CV Audit Tool",
    href: "/tools/ats-cv-audit",
    reason: "This gives you a quick readiness score and helps identify the highest-impact CV fixes before you apply.",
  };
}

function getResourceRecommendation(answers: QuizAnswers): Recommendation {
  if (answers.goal === "visibility" || answers.gap === "linkedin") {
    return {
      label: "LinkedIn Headline Formula Sheet",
      href: "/resources/linkedin-headline-formula-sheet",
      reason: "A quick framework for writing clearer, keyword-aware headlines that support recruiter visibility.",
    };
  }

  if (answers.goal === "interviews" || answers.gap === "interviews") {
    return {
      label: "Interview Story Bank Template",
      href: "/resources/interview-story-bank-template",
      reason: "A strong starting point for collecting proof-based examples you can reuse across common interview questions.",
    };
  }

  return {
    label: "ATS CV Quick Checklist",
    href: "/resources/ats-cv-quick-checklist",
    reason: "Use this as a final quality-control checklist before every application.",
  };
}

function getIndustryRecommendation(answers: QuizAnswers): Recommendation | null {
  if (answers.industry === "general") return null;

  const labelMap: Record<Exclude<QuizAnswers["industry"], "general">, string> = {
    "software-it": "Software & IT Career Page",
    "finance-accounting": "Finance & Accounting Career Page",
    "marketing-sales": "Marketing & Sales Career Page",
    "hr-admin": "HR & Administration Career Page",
    "engineering-operations": "Engineering & Operations Career Page",
    "fresh-graduates": "Fresh Graduates Career Page",
  };

  return {
    label: labelMap[answers.industry],
    href: `/services/industries/${answers.industry}`,
    reason: "This page is tailored to your audience with more relevant positioning angles, tools, and next-step links.",
  };
}

const initialAnswers: QuizAnswers = {
  stage: "student",
  goal: "callbacks",
  gap: "cv-none",
  target: "local",
  industry: "general",
  support: "hybrid",
};

export default function CareerQuizClient() {
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);

  const recommendations = {
    primary: getPrimaryRecommendation(answers),
    tool: getToolRecommendation(answers),
    resource: getResourceRecommendation(answers),
    industry: getIndustryRecommendation(answers),
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-6">
        {questions.map((question, index) => (
 <section key={question.key} className="rounded-[22px] border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-main/10 font-bold text-brand-dark">
                {index + 1}
              </span>
              <h2 className="text-[24px] font-bold font-plus-jakarta text-foreground">{question.title}</h2>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {question.options.map((option) => {
                const selected = answers[question.key] === option.value;

                return (
                  <button
                    key={`${question.key}-${String(option.value)}`}
                    type="button"
                    onClick={() =>
                      setAnswers((previous) => ({
                        ...previous,
                        [question.key]: option.value,
                      } as QuizAnswers))
                    }
                    className={`rounded-[16px] border p-4 text-left transition-colors ${
                      selected
                        ? "border-brand-main bg-brand-main/5"
 : "border-zinc-200 bg-zinc-50 hover:border-brand-main/40 hover:bg-white"
                    }`}
                  >
                    <p className="text-base font-semibold text-foreground">{option.label}</p>
 <p className="mt-2 text-sm leading-relaxed text-zinc-600">{option.description}</p>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24">
 <div className="rounded-[22px] border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">Your Best Next Step</p>
          <h2 className="mt-3 text-[28px] font-bold font-plus-jakarta text-foreground">{recommendations.primary.label}</h2>
 <p className="mt-4 text-sm leading-relaxed text-zinc-700">{recommendations.primary.reason}</p>
          <Link
            href={recommendations.primary.href}
            className="mt-5 inline-flex items-center gap-2 rounded-[12px] bg-brand-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Open Recommendation
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>

 <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Free Tool</p>
          <h3 className="mt-3 text-[22px] font-bold font-plus-jakarta text-foreground">{recommendations.tool.label}</h3>
 <p className="mt-3 text-sm leading-relaxed text-zinc-700">{recommendations.tool.reason}</p>
          <Link href={recommendations.tool.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
            Use Free Tool
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>

 <div className="rounded-[22px] border border-zinc-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Resource</p>
          <h3 className="mt-3 text-[22px] font-bold font-plus-jakarta text-foreground">{recommendations.resource.label}</h3>
 <p className="mt-3 text-sm leading-relaxed text-zinc-700">{recommendations.resource.reason}</p>
          <Link href={recommendations.resource.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
            Open Resource
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>

        {recommendations.industry ? (
 <div className="rounded-[22px] border border-zinc-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Relevant Career Page</p>
            <h3 className="mt-3 text-[22px] font-bold font-plus-jakarta text-foreground">{recommendations.industry.label}</h3>
 <p className="mt-3 text-sm leading-relaxed text-zinc-700">{recommendations.industry.reason}</p>
            <Link href={recommendations.industry.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
              View Industry Page
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>
        ) : null}

 <div className="rounded-[22px] border border-zinc-200 bg-foreground p-6 text-background">
          <h3 className="text-[22px] font-bold font-plus-jakarta !text-white">Use This Like a Decision Shortcut</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-light">
            If you prefer {answers.support === "self-serve" ? "self-serve support" : answers.support === "hybrid" ? "a hybrid path" : "done-for-you execution"}, start with the free tool and resource above, then move into the primary recommendation when you want stronger results.
          </p>
        </div>

 <div className="rounded-[22px] border border-brand-main/30 bg-brand-main/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark">Ready to Get Started?</p>
          <h3 className="mt-2 text-[20px] font-bold font-plus-jakarta text-foreground">Book a Free Consultation</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700">
            Not sure which package fits best? A quick call takes 15 minutes and gives you a clear path forward — no obligation.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-brand-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Book a Consultation
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
            >
              View All Packages &amp; Pricing
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
