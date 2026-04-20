"use client";

import { useMemo, useState } from "react";

type Story = {
  id: number;
  skill: string;
  answer: string;
};

export default function InterviewStoryBankClient() {
  const [skill, setSkill] = useState("Leadership");
  const [situation, setSituation] = useState("");
  const [task, setTask] = useState("");
  const [action, setAction] = useState("");
  const [result, setResult] = useState("");
  const [stories, setStories] = useState<Story[]>([]);
  const [copied, setCopied] = useState(false);

  const compiledAnswer = useMemo(() => {
    if (!situation.trim() && !task.trim() && !action.trim() && !result.trim()) {
      return "";
    }

    return [
      `One example that shows my ${skill.toLowerCase()} was when ${situation.trim() || "I was handling a difficult work situation"}.`,
      task.trim() ? `My responsibility was to ${task.trim()}.` : "",
      action.trim() ? `I approached it by ${action.trim()}.` : "",
      result.trim() ? `As a result, ${result.trim()}.` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }, [skill, situation, task, action, result]);

  const addStory = () => {
    if (!compiledAnswer) return;
    setStories((previous) => [
      { id: Date.now(), skill, answer: compiledAnswer },
      ...previous,
    ]);
  };

  const copyAnswer = async () => {
    if (!compiledAnswer) return;
    try {
      await navigator.clipboard.writeText(compiledAnswer);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">Skill or Theme</span>
            <input
              value={skill}
              onChange={(event) => setSkill(event.target.value)}
              className="w-full rounded-[14px] border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-main"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">Situation</span>
            <textarea
              value={situation}
              onChange={(event) => setSituation(event.target.value)}
              rows={3}
              placeholder="What was happening?"
              className="w-full rounded-[14px] border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-main"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">Task</span>
            <textarea
              value={task}
              onChange={(event) => setTask(event.target.value)}
              rows={3}
              placeholder="What did you need to achieve?"
              className="w-full rounded-[14px] border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-main"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">Action</span>
            <textarea
              value={action}
              onChange={(event) => setAction(event.target.value)}
              rows={4}
              placeholder="What exactly did you do?"
              className="w-full rounded-[14px] border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-main"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">Result</span>
            <textarea
              value={result}
              onChange={(event) => setResult(event.target.value)}
              rows={3}
              placeholder="What changed? Include numbers when possible."
              className="w-full rounded-[14px] border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-main"
            />
          </label>
        </div>

        <div className="mt-8 rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Generated Answer</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
            {compiledAnswer || "Fill the fields above to generate a STAR-style interview story."}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void copyAnswer()}
              className="rounded-[10px] border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors hover:border-brand-main hover:text-brand-main"
            >
              {copied ? "Copied" : "Copy Answer"}
            </button>
            <button
              type="button"
              onClick={addStory}
              className="rounded-[10px] bg-foreground px-4 py-2 text-xs font-semibold text-background transition-colors hover:bg-brand-main"
            >
              Add to Story Bank
            </button>
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
          <h3 className="text-[22px] font-bold font-plus-jakarta text-foreground">STAR Reminders</h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Keep the story specific enough to sound real and memorable.</li>
            <li>Spend most of your time on the action you personally took.</li>
            <li>Show the result clearly with outcomes, numbers, or visible change.</li>
            <li>Reuse one story across multiple interview questions by changing emphasis.</li>
          </ul>
        </div>

        <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h3 className="text-[22px] font-bold font-plus-jakarta text-foreground">Your Story Bank</h3>
          <div className="mt-4 space-y-4">
            {stories.length > 0 ? stories.map((story) => (
              <div key={story.id} className="rounded-[14px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-main">{story.skill}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{story.answer}</p>
              </div>
            )) : (
              <p className="text-sm text-zinc-500">Your saved stories will appear here in this session.</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
