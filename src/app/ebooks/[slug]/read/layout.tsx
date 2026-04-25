import { ReactNode } from "react";
import Link from "next/link";
import { getEbookBySlug } from "@/lib/ebooks";
import { notFound } from "next/navigation";
import { getServerUser } from "@/lib/auth-server";
import { getEbookPurchase } from "@/lib/ebook-firestore";
import fs from "fs/promises";
import path from "path";
import MobileChapterMenu from "./_components/MobileChapterMenu";

type Props = {
  params: Promise<{ slug: string }>;
  children: ReactNode;
};

type TocItem = {
  kind?: "chapter" | "section";
  id?: number;
  title: string;
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

  // Load chapter index for desktop/mobile chapter navigation
  const contentDir = path.join(process.cwd(), `src/content/ebooks/${slug}`);
  let toc: TocItem[] = [];
  try {
    const rawIndex = await fs.readFile(path.join(contentDir, "index.json"), "utf-8");
    const parsed = JSON.parse(rawIndex) as TocItem[];
    toc = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load ebook index:", error);
  }

  const chapterItems = toc.filter(
    (item): item is Required<Pick<TocItem, "id" | "title">> & TocItem =>
      (item.kind ?? "chapter") === "chapter" && typeof item.id === "number"
  );

  const freeChapterIds = new Set(chapterItems.slice(0, 3).map((item) => item.id));

  const accessLabel =
    accessTier === "download" ? "Full Access" :
    hasPremiumAccess ? "Read Access" : "Preview";

  return (
    <>
      <style>{`#site-nav { display: none !important; }`}</style>

      {/* Mobile chapter menu */}
      <div className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 border-b border-zinc-200">
        <MobileChapterMenu
          slug={slug}
          ebookTitle={ebook.title}
          accessLabel={accessLabel}
          toc={toc}
          hasPremiumAccess={hasPremiumAccess}
          freeChapterIds={Array.from(freeChapterIds)}
        />
      </div>

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

      <div className="lg:flex lg:h-screen lg:overflow-hidden bg-zinc-50 font-poppins selection:bg-transparent">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex w-80 flex-col border-r border-zinc-200 bg-white">
          <div className="p-6 border-b border-zinc-100 shrink-0">
            <Link
              href={`/ebooks/${slug}`}
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-brand-main mb-4 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              Back to Details
            </Link>
            <h2 className="font-plus-jakarta font-bold text-xl text-foreground mt-2 leading-tight">
              {ebook.title}
            </h2>
            <span className="inline-block mt-2 text-xs font-semibold uppercase tracking-wider text-brand-main bg-brand-main/10 px-2 py-1 rounded">
              {accessLabel}
            </span>
            {hasDownloadAccess && (
              <a
                href={`/api/ebooks/${slug}/download`}
                download
                className="mt-3 inline-flex items-center gap-2 rounded-[8px] border border-brand-main/30 bg-brand-main/5 px-3 py-2 text-xs font-semibold text-brand-dark transition-colors hover:bg-brand-main/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download PDF
              </a>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <Link
              href={`/ebooks/${slug}/read`}
              className="mb-3 flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              Table of Contents
            </Link>

            {toc.map((item, idx) => {
              if ((item.kind ?? "chapter") === "section") {
                return (
                  <div
                    key={`section-${idx}`}
                    className="mt-5 mb-2 border-l-2 border-brand-main/40 bg-gradient-to-r from-brand-main/5 to-transparent px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500 rounded-r-md"
                  >
                    {item.title}
                  </div>
                );
              }

              if (typeof item.id !== "number") return null;

              const isFree = freeChapterIds.has(item.id);
              const isLocked = !isFree && !hasPremiumAccess;

              return (
                <Link
                  key={item.id}
                  href={`/ebooks/${slug}/read/${item.id}`}
                  className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isLocked ? "opacity-60 hover:bg-zinc-50" : "hover:bg-brand-main/5 text-zinc-700 hover:text-brand-dark"
                  }`}
                >
                  <div className="mt-1 shrink-0">
                    {isLocked ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-main mt-[5px]" />
                    )}
                  </div>
                  <span className="text-[15px] font-medium leading-snug block flex-1">
                    {item.title}
                  </span>
                  {isFree && !hasPremiumAccess && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded ml-1 shrink-0">FREE</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Reading area */}
        <main className="flex-1 lg:h-full lg:overflow-hidden relative disable-selection">
          <div className="lg:h-full lg:overflow-y-auto" id="reading-scroll-area">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

