import { ReactNode } from "react";
import Link from "next/link";
import { getEbookBySlug } from "@/lib/ebooks";
import { notFound } from "next/navigation";
import { getServerUser } from "@/lib/auth-server";
import { getEbookPurchase } from "@/lib/ebook-firestore";

type Props = {
  params: Promise<{ slug: string }>;
  children: ReactNode;
};

type EbookAccessTier = "none" | "read" | "download";

async function checkEbookAccess(
  userId: string | undefined,
  userEmail: string | undefined,
  userRole: string | undefined,
  slug: string
): Promise<EbookAccessTier> {
  if (!userId) return "none";
  if (userRole === "admin") return "download";
  if (userEmail) {
    try {
      const purchase = await getEbookPurchase(userEmail, slug);
      if (purchase) {
        return purchase.tier === "download" ? "download" : "read";
      }
    } catch (error) {
      console.error("[checkEbookAccess] Firestore lookup failed:", error);
    }
  }
  return "none";
}

export default async function EbookReaderLayout({ params, children }: Props) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);

  if (!ebook) {
    notFound();
  }

  const user = await getServerUser();
  const accessTier = await checkEbookAccess(user?.id, user?.email, user?.role, slug);
  const hasPremiumAccess = accessTier !== "none";
  const hasDownloadAccess = accessTier === "download";

  const accessLabel =
    accessTier === "download" ? "Full Access" :
    hasPremiumAccess ? "Read Access" : "Preview";

  return (
    <>
      <style>{`#site-nav { display: none !important; }`}</style>

      {/* Watermark overlay */}
      <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center opacity-[0.03] rotate-[-25deg] select-none">
        <div className="flex gap-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-20">
              {Array.from({ length: 15 }).map((_, j) => (
                <span key={j} className="text-3xl font-black text-black whitespace-nowrap">
                  {user?.email ?? "chanuka jeewantha"}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-14 flex items-center gap-3">
          {/* Back link */}
          <Link
            href={`/ebooks/${slug}`}
            className="shrink-0 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-brand-main transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            <span className="hidden sm:inline">Back</span>
          </Link>

          <div className="h-4 w-px bg-zinc-200 shrink-0" />

          {/* TOC link (ebook title) */}
          <Link
            href={`/ebooks/${slug}/read`}
            className="flex-1 font-plus-jakarta font-bold text-foreground text-sm truncate hover:text-brand-main transition-colors min-w-0"
          >
            {ebook.title}
          </Link>

          {/* Access badge */}
          <span className="shrink-0 hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-brand-main bg-brand-main/10 px-2.5 py-1 rounded-full">
            {accessLabel}
          </span>

          {/* TOC icon button */}
          <Link
            href={`/ebooks/${slug}/read`}
            title="Table of Contents"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-600 hover:border-brand-main hover:text-brand-main transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            <span className="hidden sm:inline">Contents</span>
          </Link>

          {/* Download button */}
          {hasDownloadAccess && (
            <a
              href={`/api/ebooks/${slug}/download`}
              download
              title="Download"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-brand-main/30 bg-brand-main/5 px-2.5 py-1.5 text-xs font-semibold text-brand-dark hover:bg-brand-main/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span className="hidden sm:inline">Download</span>
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-zinc-50 disable-selection font-poppins selection:bg-transparent">
        {children}
      </main>
    </>
  );
}

