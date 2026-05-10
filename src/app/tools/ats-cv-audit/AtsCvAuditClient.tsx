"use client";

import { useMemo, useState } from "react";

const sampleCv = `Nimal Perera
Senior Operations Executive
Email: nimal@example.com
LinkedIn: linkedin.com/in/nimalperera

Professional Summary
Operations professional with 6+ years of experience improving service delivery, process efficiency, and team coordination across logistics environments.

Experience
- Improved on-time delivery rate by 18% by redesigning dispatch workflow.
- Reduced monthly reporting time by 35% through spreadsheet automation.
- Coordinated a team of 12 staff across inventory and customer support functions.

Skills
Operations management, Excel, reporting, team leadership, workflow improvement

Education
BSc in Management`;

const sampleJobDescription = `We are hiring a Senior Operations Executive to improve process efficiency, manage reporting, coordinate cross-functional teams, and support logistics performance. Strong Excel skills, stakeholder communication, KPI reporting, and continuous improvement experience are required.`;

const stopWords = new Set([
  "about", "after", "again", "against", "along", "also", "among", "because", "before", "being",
  "between", "could", "every", "first", "from", "have", "into", "itself", "other", "should",
  "their", "there", "these", "those", "through", "under", "using", "with", "would", "your",
  "you", "they", "them", "that", "this", "then", "than", "were", "when", "where", "while",
  "which", "what", "will", "been", "each", "more", "most", "such", "only", "very", "role",
  "required", "requirements", "experience", "skills",
]);

function extractKeywords(text: string) {
  const tokens = text
    .toLowerCase()
    .match(/[a-z][a-z0-9+-]{2,}/g) ?? [];

  const counts = new Map<string, number>();
  for (const token of tokens) {
    if (stopWords.has(token)) continue;
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word);
}

function getAnalysis(cvText: string, jobDescription: string) {
  const cvWords = cvText.trim().split(/\s+/).filter(Boolean).length;
  const jobKeywords = extractKeywords(jobDescription);
  const matchedKeywords = jobKeywords.filter((term) => cvText.toLowerCase().includes(term));
  const missingKeywords = jobKeywords.filter((term) => !cvText.toLowerCase().includes(term)).slice(0, 8);
  const headingChecks = [
    /summary|profile/i.test(cvText),
    /experience|employment/i.test(cvText),
    /skills|core competencies/i.test(cvText),
    /education|certification/i.test(cvText),
    /linkedin|email|phone|contact/i.test(cvText),
  ];
  const headingScore = headingChecks.filter(Boolean).length * 4;
  const bulletCount = (cvText.match(/^[\-\u2022*]/gm) ?? []).length;
  const metricCount = (cvText.match(/\b\d+(?:[.,]\d+)?%?\+?\b/g) ?? []).length;
  const keywordScore = Math.min(35, matchedKeywords.length * 4);
  const metricsScore = Math.min(20, metricCount * 4);
  const bulletsScore = bulletCount >= 4 ? 10 : bulletCount >= 2 ? 6 : bulletCount > 0 ? 3 : 0;
  const wordCountScore = cvWords >= 300 && cvWords <= 900 ? 15 : cvWords >= 220 && cvWords <= 1100 ? 10 : 5;
  const totalScore = Math.max(0, Math.min(100, headingScore + keywordScore + metricsScore + bulletsScore + wordCountScore));

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (matchedKeywords.length >= 6) strengths.push("Your CV already reflects several role-relevant keywords from the job description.");
  else improvements.push("Add more target-role keywords from the job description to improve ATS alignment.");

  if (metricCount >= 3) strengths.push("You are already using measurable proof, which improves recruiter trust.");
  else improvements.push("Add numbers, percentages, time savings, growth, or volume metrics to show impact.");

  if (headingChecks.filter(Boolean).length >= 4) strengths.push("The CV has strong core sections for ATS scanning and recruiter readability.");
  else improvements.push("Strengthen section labels so the CV clearly shows summary, experience, skills, and education.");

  if (bulletCount >= 4) strengths.push("Bullet structure is helping the CV scan faster.");
  else improvements.push("Use more bullet points instead of long paragraphs for responsibilities and outcomes.");

  if (cvWords < 300) improvements.push("The CV may be too short to communicate enough proof for competitive roles.");
  if (cvWords > 900) improvements.push("The CV may be too long. Tighten low-value content and keep the strongest evidence.");

  return {
    totalScore,
    cvWords,
    matchedKeywords,
    missingKeywords,
    metricCount,
    bulletCount,
    strengths,
    improvements,
  };
}

export default function AtsCvAuditClient() {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const analysis = useMemo(() => {
    if (!cvText.trim() || !jobDescription.trim()) return null;
    return getAnalysis(cvText, jobDescription);
  }, [cvText, jobDescription]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6">
 <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCvText(sampleCv)}
 className="rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main"
            >
              Load Sample CV
            </button>
            <button
              type="button"
              onClick={() => setJobDescription(sampleJobDescription)}
 className="rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main"
            >
              Load Sample Job Description
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-foreground">Paste Your CV</span>
              <textarea
                value={cvText}
                onChange={(event) => setCvText(event.target.value)}
                rows={12}
                placeholder="Paste your CV text here..."
 className="w-full rounded-[14px] border border-zinc-300 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand-main"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-foreground">Paste the Target Job Description</span>
              <textarea
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                rows={10}
                placeholder="Paste the job description here..."
 className="w-full rounded-[14px] border border-zinc-300 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand-main"
              />
            </label>
          </div>
        </div>
      </div>

      <aside className="space-y-6">
 <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">ATS Score</p>
          <div className="mt-4 flex items-end gap-3">
            <p className="text-[56px] font-bold font-heading text-foreground">{analysis?.totalScore ?? 0}</p>
            <p className="mb-2 text-sm font-medium text-zinc-500">/ 100</p>
          </div>
 <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            {analysis
              ? "Use this as a practical readiness signal, not a final hiring prediction. The goal is stronger alignment and clearer proof."
              : "Paste both your CV and the target job description to generate an audit."}
          </p>
        </div>

        {analysis ? (
          <>
 <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6">
              <h3 className="text-[22px] font-bold font-heading text-foreground">Quick Signals</h3>
 <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                <li>CV word count: {analysis.cvWords}</li>
                <li>Matched target keywords: {analysis.matchedKeywords.length}</li>
                <li>Missing important keywords: {analysis.missingKeywords.length}</li>
                <li>Metrics found: {analysis.metricCount}</li>
                <li>Bullet lines found: {analysis.bulletCount}</li>
              </ul>
            </div>

 <div className="rounded-[20px] border border-zinc-200 bg-white p-6">
              <h3 className="text-[22px] font-bold font-heading text-foreground">Matched Keywords</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.matchedKeywords.length > 0 ? analysis.matchedKeywords.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {keyword}
                  </span>
                )) : <p className="text-sm text-zinc-500">No strong overlap detected yet.</p>}
              </div>
            </div>

 <div className="rounded-[20px] border border-zinc-200 bg-white p-6">
              <h3 className="text-[22px] font-bold font-heading text-foreground">Missing Keywords</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.missingKeywords.length > 0 ? analysis.missingKeywords.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                    {keyword}
                  </span>
                )) : <p className="text-sm text-zinc-500">You already cover most top keywords.</p>}
              </div>
            </div>

 <div className="rounded-[20px] border border-zinc-200 bg-white p-6">
              <h3 className="text-[22px] font-bold font-heading text-foreground">What Is Working</h3>
              <ul className="mt-4 space-y-3">
                {analysis.strengths.map((item) => (
 <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

 <div className="rounded-[20px] border border-zinc-200 bg-white p-6">
              <h3 className="text-[22px] font-bold font-heading text-foreground">What To Improve</h3>
              <ul className="mt-4 space-y-3">
                {analysis.improvements.map((item) => (
 <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}
