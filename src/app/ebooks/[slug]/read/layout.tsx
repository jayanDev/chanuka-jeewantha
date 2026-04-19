import { ReactNode } from "react";
import Link from "next/link";
import { getEbookBySlug } from "@/lib/ebooks";
import { notFound } from "next/navigation";
import { getServerUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

type Props = {
  params: Promise<{ slug: string }>;
  children: ReactNode;
};

type TocItem = {
  kind?: "chapter" | "section";
  id?: number;
  title: string;
};

// Check if user has access to premium chapters (has completed order for this slug)
async function checkEbookAccess(userId: string | undefined, slug: string): Promise<boolean> {
  if (!userId) return false;
  
  const userWithOrders = await prisma.appUser.findUnique({
    where: { id: userId },
    include: {
      orders: {
        where: {
          status: "completed",
          items: {
            some: {
              product: {
                slug: slug
              }
            }
          }
        },
        take: 1
      }
    }
  });

  // Admin users have full access
  if (userWithOrders?.role === "admin") return true;

  // Regular user stringently checks if there is any completed order with this item
  return !!userWithOrders?.orders?.length;
}

export default async function EbookReaderLayout({ params, children }: Props) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);

  if (!ebook) {
    notFound();
  }

  // Load the index of chapters
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

  const user = await getServerUser();
  const hasPremiumAccess = await checkEbookAccess(user?.id, slug);

  return (
    <div className="flex h-screen w-full bg-zinc-50 overflow-hidden font-poppins selection:bg-transparent">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-80 flex-col border-r border-zinc-200 bg-white">
        <div className="p-6 border-b border-zinc-100 shrink-0">
          <Link
             href={`/ebooks/${slug}`}
             className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-brand-main mb-4 transition-colors"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
             Back to Details
          </Link>
          <h2 className="font-plus-jakarta font-bold text-xl text-foreground mt-2 leading-tight">
            {ebook.title}
          </h2>
          <span className="inline-block mt-2 text-xs font-semibold uppercase tracking-wider text-brand-main bg-brand-main/10 px-2 py-1 rounded">
            {/* Show badge based on access */}
            {hasPremiumAccess ? "Full Access" : "Preview Mode"}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
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

            if (typeof item.id !== "number") {
              return null;
            }

            const isFree = freeChapterIds.has(item.id);
            const isLocked = !isFree && !hasPremiumAccess;

            return (
              <Link
                key={item.id}
                href={`/ebooks/${slug}/read/${item.id}`}
                className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isLocked ? "opacity-60 hover:bg-zinc-50 cursor-pointer" : "hover:bg-brand-main/5 text-zinc-700 hover:text-brand-dark"
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

      {/* Main Reading Area */}
      <main className="flex-1 h-full overflow-hidden relative disable-selection">
         <div className="lg:hidden border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70 sticky top-0 z-20">
           <details>
             <summary className="list-none cursor-pointer px-4 py-3 flex items-center justify-between text-sm font-semibold text-zinc-700">
               <span>Contents</span>
               <span className="text-xs text-zinc-400">Tap to expand</span>
             </summary>
             <div className="max-h-[48vh] overflow-y-auto px-3 pb-3">
               <div className="space-y-1">
                 {toc.map((item, idx) => {
                   if ((item.kind ?? "chapter") === "section") {
                     return (
                       <div
                         key={`mobile-section-${idx}`}
                         className="mt-3 border-l-2 border-brand-main/40 bg-gradient-to-r from-brand-main/5 to-transparent px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500 rounded-r-md"
                       >
                         {item.title}
                       </div>
                     );
                   }

                   if (typeof item.id !== "number") {
                     return null;
                   }

                   const isFree = freeChapterIds.has(item.id);
                   const isLocked = !isFree && !hasPremiumAccess;

                   return (
                     <Link
                       key={`mobile-${item.id}`}
                       href={`/ebooks/${slug}/read/${item.id}`}
                       className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                         isLocked ? "opacity-60 text-zinc-500" : "text-zinc-700 hover:bg-brand-main/5 hover:text-brand-dark"
                       }`}
                     >
                       <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-main shrink-0" />
                       <span className="flex-1 leading-snug">{item.title}</span>
                       {isFree && !hasPremiumAccess && (
                         <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded ml-1 shrink-0">FREE</span>
                       )}
                     </Link>
                   );
                 })}
               </div>
             </div>
           </details>
         </div>

         {/* Simple watermark overlay */}
         <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center opacity-[0.03] rotate-[-25deg] select-none">
           <div className="flex gap-20">
             {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-20">
                   {Array.from({ length: 15 }).map((_, j) => (
                     <span key={j} className="text-3xl font-black text-black whitespace-nowrap">
                       {user?.email || "chanuka jeewantha"}
                     </span>
                   ))}
                </div>
             ))}
           </div>
         </div>
         
         <div className="h-full overflow-y-auto" id="reading-scroll-area">
             {children}
         </div>
      </main>
    </div>
  );
}
