import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getEbookBySlug } from "@/lib/ebooks";
import { getServerUser } from "@/lib/auth-server";
import { getEbookPurchase } from "@/lib/ebook-firestore";
import fs from "fs/promises";
import path from "path";
import type { Metadata } from "next";
import {
  EBOOK_ANONYMOUS_FREE_CHAPTER_COUNT,
  EBOOK_SIGNED_IN_FREE_CHAPTER_COUNT,
} from "@/lib/ebook-preview-access";
import { EBOOK_DOWNLOAD_PRICE_LKR, EBOOK_READ_PRICE_LKR } from "@/lib/ebook-pricing";
import { buildNoIndexMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "linkedin-profile-optimization") {
    redirect("/resources/checklists/linkedin-profile-optimization/read");
  }

  const ebook = getEbookBySlug(slug);
  if (!ebook) return buildNoIndexMetadata({ title: "Not Found", description: "", path: "/" });
  return buildNoIndexMetadata({
    title: `Table of Contents — ${ebook.title}`,
    description: ebook.description,
    path: `/ebooks/${slug}/read`,
  });
}

type TocItem = {
  kind?: "chapter" | "section";
  id?: number;
  title: string;
};

export default async function EbookReadIndexPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) notFound();

  const user = await getServerUser();

  // Check access
  let accessTier: "none" | "read" | "download" = "none";
  if (user) {
    if (user.role === "admin") {
      accessTier = "download";
    } else if (user.email) {
      try {
        const purchase = await getEbookPurchase(user.email, slug);
        if (purchase) accessTier = purchase.tier === "download" ? "download" : "read";
      } catch {
        // ignore
      }
    }
  }
  const hasPremiumAccess = accessTier !== "none";

  // Load TOC
  const contentDir = path.join(process.cwd(), `src/content/ebooks/${slug}`);
  let toc: TocItem[] = [];
  try {
    const raw = await fs.readFile(path.join(contentDir, "index.json"), "utf-8");
    const parsed = JSON.parse(raw) as TocItem[];
    toc = Array.isArray(parsed) ? parsed : [];
  } catch {
    // empty
  }

  const chapterItems = toc.filter(
    (item): item is { id: number; title: string; kind?: "chapter" | "section" } =>
      (item.kind ?? "chapter") === "chapter" && typeof item.id === "number"
  );

  const freeChapterIds = new Set(
    chapterItems.slice(0, EBOOK_SIGNED_IN_FREE_CHAPTER_COUNT).map((c) => c.id)
  );
  const anonymousFreeChapterIds = new Set(
    chapterItems.slice(0, EBOOK_ANONYMOUS_FREE_CHAPTER_COUNT).map((c) => c.id)
  );
  const firstChapterId = chapterItems[0]?.id ?? 0;
  const totalChapters = chapterItems.length;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero */}
      <div className="bg-white border-b border-zinc-100">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 pt-12 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-main mb-2">
                {ebook.kind === "resource" ? "Resource" : "Ebook"}
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-3">
                {ebook.title}
              </h1>
              <p className="text-zinc-500 text-base leading-relaxed mb-4">{ebook.subtitle}</p>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  {totalChapters} chapters
                </span>
                {!hasPremiumAccess && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                    First 2 chapters free
                  </span>
                )}
                {!user && !hasPremiumAccess && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    Sign in from chapter 2
                  </span>
                )}
                {hasPremiumAccess && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-main bg-brand-main/10 px-3 py-1.5 rounded-full">
                    ✓ {accessTier === "download" ? "Full Access" : "Read Access"}
                  </span>
                )}
              </div>
            </div>

            <Link
              href={`/ebooks/${slug}/read/${firstChapterId}`}
              className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-brand-main px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-dark transition-colors shadow-sm"
            >
              Start Reading
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* TOC */}
      <div className="mx-auto max-w-3xl px-5 sm:px-6 py-10">
        <h2 className="font-heading text-xl font-bold text-foreground mb-6">Table of Contents</h2>

        <div className="bg-white rounded-2xl border border-zinc-200 divide-y divide-zinc-100 overflow-hidden shadow-sm">
          {toc.map((item, idx) => {
            // Section header
            if ((item.kind ?? "chapter") === "section") {
              return (
                <div
                  key={`section-${idx}`}
                  className="px-6 py-3 bg-zinc-50 border-l-4 border-brand-main/40"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500">
                    {item.title}
                  </span>
                </div>
              );
            }

            if (typeof item.id !== "number") return null;

            const isFree = freeChapterIds.has(item.id);
            const requiresSignIn = !user && !hasPremiumAccess && isFree && !anonymousFreeChapterIds.has(item.id);
            const isLocked = !isFree && !hasPremiumAccess;
            const chapterIdx = chapterItems.findIndex((c) => c.id === item.id);
            const chapterNum = chapterIdx === 0 ? null : chapterIdx;

            return (
              <Link
                key={item.id}
                href={`/ebooks/${slug}/read/${item.id}`}
                className={`group flex items-center gap-4 px-6 py-4 transition-colors ${
                  isLocked
                    ? "hover:bg-zinc-50 cursor-pointer"
                    : "hover:bg-brand-main/5"
                }`}
              >
                {/* Chapter number bubble */}
                <div
                  className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isLocked
                      ? "bg-zinc-100 text-zinc-400"
                      : requiresSignIn
                      ? "bg-amber-50 text-amber-700 group-hover:bg-amber-100"
                      : "bg-brand-main/10 text-brand-dark group-hover:bg-brand-main group-hover:text-white"
                  }`}
                >
                  {isLocked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  ) : requiresSignIn ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                  ) : chapterNum === null ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  ) : (
                    chapterNum
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-base font-medium leading-snug truncate ${
                      isLocked ? "text-zinc-400" : "text-foreground group-hover:text-brand-dark"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>

                {/* Badge */}
                {requiresSignIn ? (
                  <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                    SIGN IN
                  </span>
                ) : isFree && !hasPremiumAccess ? (
                  <span className="shrink-0 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    FREE
                  </span>
                ) : null}
                {!isLocked && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-zinc-300 group-hover:text-brand-main transition-colors" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                )}
              </Link>
            );
          })}
        </div>

        {/* Purchase prompt for preview users */}
        {!hasPremiumAccess && (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-brand-main/30 bg-brand-main/5 p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-main/10 text-brand-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">
              Unlock Full Access
            </h3>
            <p className="text-zinc-500 text-sm mb-6">
              Read all chapters after the 2-chapter free preview. Choose your plan below.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/94773902230?text=${encodeURIComponent(`Hello Chanuka, I want to purchase READ access for:\n${ebook.title}\nPrice: LKR ${(ebook.readPriceLkr ?? EBOOK_READ_PRICE_LKR).toLocaleString("en-LK")}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:bg-[#1fb85a] transition-colors"
              >
                Read Only — LKR {(ebook.readPriceLkr ?? EBOOK_READ_PRICE_LKR).toLocaleString("en-LK")}
              </a>
              <a
                href={`https://wa.me/94773902230?text=${encodeURIComponent(`Hello Chanuka, I want to purchase DOWNLOAD access for:\n${ebook.title}\nPrice: LKR ${(ebook.downloadPriceLkr ?? EBOOK_DOWNLOAD_PRICE_LKR).toLocaleString("en-LK")}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-main px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark transition-colors"
              >
                Download + Read — LKR {(ebook.downloadPriceLkr ?? EBOOK_DOWNLOAD_PRICE_LKR).toLocaleString("en-LK")}
              </a>
            </div>
            {!user && (
              <p className="mt-4 text-sm text-zinc-500">
                Already purchased?{" "}
                <Link href={`/auth/signin?returnTo=/ebooks/${slug}/read`} className="font-semibold text-brand-dark hover:text-brand-main underline-offset-2 hover:underline">
                  Sign in for access
                </Link>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
