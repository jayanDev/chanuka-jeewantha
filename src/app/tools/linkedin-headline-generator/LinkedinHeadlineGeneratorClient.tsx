"use client";

import { useMemo, useState } from "react";

function buildHeadlines(input: {
  role: string;
  specialty: string;
  industry: string;
  value: string;
  keyword: string;
}) {
  const role = input.role.trim() || "Professional";
  const specialty = input.specialty.trim() || "Career Growth";
  const industry = input.industry.trim() || "Modern Hiring";
  const value = input.value.trim() || "Clear Positioning";
  const keyword = input.keyword.trim() || specialty;

  return [
    `${role} | ${specialty} | ${value}`,
    `${role} helping teams deliver ${value.toLowerCase()} in ${industry}`,
    `${role} | ${keyword} | ${industry}`,
    `${role} focused on ${specialty.toLowerCase()} and ${value.toLowerCase()}`,
    `${role} driving ${value.toLowerCase()} across ${industry}`,
    `${role} | ${industry} | ${specialty} | ${value}`,
  ];
}

export default function LinkedinHeadlineGeneratorClient() {
  const [role, setRole] = useState("LinkedIn Optimization Specialist");
  const [specialty, setSpecialty] = useState("Personal Branding");
  const [industry, setIndustry] = useState("Career Development");
  const [value, setValue] = useState("Recruiter Visibility");
  const [keyword, setKeyword] = useState("LinkedIn SEO");
  const [copiedHeadline, setCopiedHeadline] = useState("");

  const headlines = useMemo(
    () => buildHeadlines({ role, specialty, industry, value, keyword }),
    [role, specialty, industry, value, keyword]
  );

  const copyHeadline = async (headline: string) => {
    try {
      await navigator.clipboard.writeText(headline);
      setCopiedHeadline(headline);
      window.setTimeout(() => setCopiedHeadline(""), 1500);
    } catch {
      setCopiedHeadline("");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">Target Role</span>
            <input
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="w-full rounded-[14px] border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-main"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">Specialization</span>
            <input
              value={specialty}
              onChange={(event) => setSpecialty(event.target.value)}
              className="w-full rounded-[14px] border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-main"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">Industry or Niche</span>
            <input
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
              className="w-full rounded-[14px] border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-main"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">Value Signal</span>
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="w-full rounded-[14px] border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-main"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-foreground">Important Keyword</span>
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="w-full rounded-[14px] border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-main"
            />
          </label>
        </div>

        <div className="mt-8 space-y-4">
          {headlines.map((headline) => (
            <div key={headline} className="flex flex-col gap-3 rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{headline}</p>
              <button
                type="button"
                onClick={() => void copyHeadline(headline)}
                className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors hover:border-brand-main hover:text-brand-main"
              >
                {copiedHeadline === headline ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
          <h3 className="text-[22px] font-bold font-plus-jakarta text-foreground">Good Headline Rules</h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <li>State your role clearly before trying to sound clever.</li>
            <li>Use one strong specialization instead of listing everything.</li>
            <li>Add a value signal that helps recruiters understand relevance fast.</li>
            <li>Keep the language specific, credible, and easy to scan.</li>
          </ul>
        </div>

        <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h3 className="text-[22px] font-bold font-plus-jakarta text-foreground">Next Step</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            A better headline works best when your About section, experience entries, and featured content support the same positioning story.
          </p>
        </div>
      </aside>
    </div>
  );
}
