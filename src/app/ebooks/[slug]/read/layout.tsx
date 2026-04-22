import { ReactNode } from "react";
import Link from "next/link";
import { getEbookBySlug } from "@/lib/ebooks";
import { notFound } from "next/navigation";
import { getServerUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
  children: ReactNode;
};

// Check if user has access to premium chapters and what tier
type EbookAccessTier = "none" | "read" | "download";

async function checkEbookAccess(userId: string | undefined, userEmail: string | undefined, slug: string): Promise<EbookAccessTier> {
  if (!userId) return "none";

  try {
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

    // Admin users have full download access
    if (userWithOrders?.role === "admin") return "download";

    // Check EbookPurchase table (admin-granted access by email)
    if (userEmail) {
      const purchase = await prisma.ebookPurchase.findUnique({
        where: { email_ebookSlug: { email: userEmail, ebookSlug: slug } },
      });
      if (purchase) {
        return purchase.tier === "download" ? "download" : "read";
      }
    }

    // Legacy: completed order via cart system grants download access
    if (userWithOrders?.orders?.length) return "download";

    return "none";
  } catch {
    // DB unavailable (e.g. Vercel cold start / missing migrations) — allow free preview
    return "none";
  }
}

export default async function EbookReaderLayout({ params, children }: Props) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);

  if (!ebook) {
    notFound();
  }

  const user = await getServerUser();
  const accessTier = await checkEbookAccess(user?.id, user?.email, slug);
  const hasPremiumAccess = accessTier !== "none";
  const hasDownloadAccess = accessTier === "download";

  return (
    <div className="min-h-screen w-full bg-zinc-50 font-poppins selection:bg-transparent">
      {/* Minimal sticky top bar — back button only */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 border-b border-zinc-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link
            href={`/ebooks/${slug}`}
            className="inline-flex items-center gap-1.5 rounded-[8px] bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:text-foreground transition-colors shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            Back
          </Link>
          <p className="flex-1 min-w-0 text-sm font-semibold text-foreground truncate">{ebook.title}</p>
          <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-brand-main bg-brand-main/10 px-2 py-0.5 rounded">
            {accessTier === "download" ? "Full Access" : hasPremiumAccess ? "Read Access" : "Preview"}
          </span>
          {hasDownloadAccess && (
            <a
              href={`/api/ebooks/${slug}/download`}
              download
              className="shrink-0 hidden sm:inline-flex items-center gap-1.5 rounded-[8px] border border-brand-main/30 bg-brand-main/5 px-2.5 py-1.5 text-[11px] font-semibold text-brand-dark transition-colors hover:bg-brand-main/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              PDF
            </a>
          )}
        </div>
      </header>

      {/* Watermark overlay */}
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

      {/* Reading area — full width, normal page scroll */}
      <div className="disable-selection" id="reading-scroll-area">
        {children}
      </div>
    </div>
  );
}
