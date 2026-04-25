import Link from "next/link";

type ExternalToolLaunchProps = {
  href: string;
  label?: string;
  note?: string;
};

export default function ExternalToolLaunch({
  href,
  label = "Open Tool",
  note = "This opens the tool on the other website in a new tab.",
}: ExternalToolLaunchProps) {
  return (
    <div className="mt-6 rounded-[20px] border border-brand-main/20 bg-brand-main/5 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">External Access</p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{note}</p>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-[12px] bg-brand-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        {label}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v7h-7"/><path d="M3 10v11h11"/></svg>
      </Link>
    </div>
  );
}