import { notFound } from "next/navigation";
import { getServerUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { formatLkr } from "@/lib/packages-catalog";
import { getEbookBySlug } from "@/lib/ebooks";
import ChapterNavigator from "../_components/ChapterNavigator";
import ReaderProtection from "../_components/ReaderProtection";
import ReaderProgressTracker from "../_components/ReaderProgressTracker";

type Props = {
  params: Promise<{ slug: string; chapterId: string }>;
};

type TocItem = {
  kind?: "chapter" | "section";
  id?: number;
  title: string;
};

// Check if user has access to premium chapters
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
                slug: slug,
              },
            },
          },
        },
        take: 1,
      },
    },
  });

  if (userWithOrders?.role === "admin") return true;
  return !!userWithOrders?.orders?.length;
}

export default async function ChapterPage({ params }: Props) {
  const { slug, chapterId } = await params;
  const parsedChapterId = parseInt(chapterId, 10);

  if (isNaN(parsedChapterId)) {
    notFound();
  }

  const ebook = getEbookBySlug(slug);
  if (!ebook) {
    notFound();
  }

  const user = await getServerUser();
  const hasPremiumAccess = await checkEbookAccess(user?.id, slug);

  // Load the actual chapter content JSON
  let chapterData = null;
  let chapterItems: Array<{ id: number; title: string }> = [];
  try {
    const rawIndex = await fs.readFile(
      path.join(process.cwd(), `src/content/ebooks/${slug}/index.json`),
      "utf-8"
    );
    const parsedIndex = JSON.parse(rawIndex) as TocItem[];
    chapterItems = parsedIndex
      .filter((item) => (item.kind ?? "chapter") === "chapter" && typeof item.id === "number")
      .map((item) => ({ id: item.id as number, title: item.title }))
      .sort((a, b) => a.id - b.id);

    const currentChapterPosition = chapterItems.findIndex((item) => item.id === parsedChapterId);
    if (currentChapterPosition === -1) {
      notFound();
    }

    const rawChapter = await fs.readFile(
      path.join(process.cwd(), `src/content/ebooks/${slug}/chapter-${parsedChapterId}.json`),
      "utf-8"
    );
    chapterData = JSON.parse(rawChapter);
  } catch {
    notFound(); // 404 if chapter doesn't exist
  }

  const chapterIds = chapterItems.map((item) => item.id);
  const currentIndex = chapterIds.findIndex((id) => id === parsedChapterId);
  if (currentIndex === -1) {
    notFound();
  }

  const isFree = currentIndex <= 2;
  const isLocked = !isFree && !hasPremiumAccess;
  const totalChapters = chapterItems.length;

  const prevChapterId = currentIndex > 0 ? chapterIds[currentIndex - 1] : null;
  const nextChapterId = currentIndex < chapterIds.length - 1 ? chapterIds[currentIndex + 1] : null;
  const nextChapterTitle = nextChapterId !== null
    ? chapterItems.find((item) => item.id === nextChapterId)?.title ?? null
    : null;
  const isFinalChapter = currentIndex === chapterIds.length - 1;

  if (isLocked) {
    return (
 <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-24 text-center selection:bg-transparent">
 <div className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-white p-10 md:p-14 shadow-xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-main/10 text-brand-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="font-plus-jakarta text-3xl font-bold text-foreground mb-4">
            Unlock Full Access to Keep Reading
          </h1>
 <p className="text-zinc-600 mb-10 text-lg leading-relaxed">
            You've reached the end of the free preview for{" "}
            <strong>{ebook.title}</strong>. Purchasing this ebook gives you instant access to all {totalChapters} chapters, lifetime updates, and actionable insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/ebooks/${slug}`}
              className="rounded-xl border-2 border-brand-main bg-brand-main px-8 py-4 font-bold text-white transition-colors hover:bg-brand-dark hover:border-brand-dark w-full sm:w-auto"
            >
              Purchase for {formatLkr(ebook.priceLkr ?? 0)}
            </Link>
            {!user && (
              <Link
                href={`/auth/signin?returnTo=/ebooks/${slug}/read/${chapterId}`}
 className="rounded-xl border-2 border-zinc-200 bg-white px-8 py-4 font-bold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main w-full sm:w-auto"
              >
                I already bought this
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-24 md:py-28 lg:px-8 selection:bg-brand-main/20 selection:text-foreground">
      <ReaderProtection />
      <ReaderProgressTracker 
        currentIndex={currentIndex} 
        totalChapters={totalChapters} 
        chapterTitle={chapterData.title} 
        ebookTitle={ebook.title} 
        slug={slug} 
      />
      <style dangerouslySetInnerHTML={{ __html: `
         @media print {
            body { display: none !important; }
         }
         .disable-selection {
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
         }
         /* Make text beautifully readable for long content */
         .ebook-content p {
            margin-bottom: 2rem;
            line-height: 2;
            font-size: 1.15rem;
            color: #3f3f46; /* zinc-700 */
            text-align: justify;
         }
         @media (max-width: 640px) {
            .ebook-content p {
               font-size: 1.05rem;
               margin-bottom: 1.5rem;
               line-height: 1.8;
            }
         }
         /* Highlighted subtopics */
         .ebook-subtopic {
            background: linear-gradient(to right, rgb(240 253 244), transparent);
            border-left: 4px solid rgb(34 197 94);
            padding: 1.5rem 1.75rem;
            border-radius: 0 0.75rem 0.75rem 0;
            margin: 3.5rem 0 2rem !important;
            font-size: 1.35rem !important;
            font-weight: 700;
            color: #18181b; /* zinc-900 */
         }
         .ebook-content h1, .ebook-content h2, .ebook-content h3 {
            margin-top: 3.5rem;
            margin-bottom: 1.5rem;
            font-weight: 800;
            color: #09090b; /* zinc-950 */
            line-height: 1.3;
         }
         .ebook-content h2 { font-size: 2.25rem; }
         .ebook-content h3 { font-size: 1.75rem; }
         .ebook-content ul {
            list-style-type: none;
            margin-bottom: 2.5rem;
         }
         .ebook-content li {
            margin-bottom: 1rem;
            font-size: 1.15rem;
            color: #3f3f46;
            line-height: 1.8;
            position: relative;
            padding-left: 1.75rem;
         }
         /* Custom bullet points */
         .ebook-content li::before {
            content: "•";
            color: rgb(34 197 94); /* brand-main */
            font-weight: bold;
            font-size: 1.5rem;
            position: absolute;
            left: 0;
            top: -0.25rem;
         }
         @media (max-width: 640px) {
            .ebook-content li {
               font-size: 1.05rem;
            }
         }
         .ebook-content span {
            font-family: inherit !important;
            color: inherit !important;
            font-weight: inherit !important;
            font-style: inherit !important;
         }
         /* Highlighting important facts or strong text */
         .ebook-content strong, .ebook-content b {
            color: #18181b;
            font-weight: 700;
            background-color: rgb(240 253 244 / 0.5); /* subtle highlight */
            padding: 0 0.1em;
            border-radius: 0.125rem;
         }
      `}} />

 <header className="mb-14 border-b border-zinc-200 pb-10">
        <span className="text-brand-dark font-medium tracking-widest uppercase text-sm mb-3 block">
          {currentIndex === 0 ? "Introduction" : `Chapter ${currentIndex}`}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-plus-jakarta text-foreground leading-[1.2]">
          {chapterData.title}
        </h1>
      </header>

      <article 
         className="ebook-content text-lg md:text-xl font-poppins 
                    prose-p:leading-relaxed prose-headings:font-plus-jakarta
                    tracking-[0.01em]"
         dangerouslySetInnerHTML={{ __html: chapterData.content }}
      />
      
      {/* Gamified Navigation / Victory Screen */}
      {isFinalChapter ? (
 <div className="mt-20 border-t border-zinc-100 pt-16 pb-20">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-10 md:p-14 text-white shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-main via-yellow-400 to-brand-main"></div>
            <div className="w-28 h-28 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping"></div>
              <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center ring-8 ring-yellow-500/30 text-5xl relative z-10 shadow-lg">
                🏆
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-plus-jakarta mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              You Did It!
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed max-w-lg mx-auto">
              You've officially completed the Fastlane journey. You are now equipped with the mindset to accelerate your wealth creation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/ebooks/${slug}/read/${prevChapterId ?? parsedChapterId}`}
                className="px-6 py-4 rounded-xl text-zinc-400 hover:text-white transition-colors w-full sm:w-auto order-2 sm:order-1"
              >
                &larr; Review Previous
              </Link>
              <a
                href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
                  `I just completed the exclusive "${ebook.title}" journey on Chanuka Jeewantha's Career Platform! 🚀 Ready to shift gears and accelerate my wealth strategy. \n\n#CareerGrowth #WealthBuilding #Fastlane`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#0A66C2] text-white font-medium rounded-xl hover:bg-[#004182] transition-colors flex items-center justify-center gap-3 w-full sm:w-auto order-1 sm:order-2 shadow-lg shadow-blue-900/20"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Share Victory on LinkedIn
              </a>
            </div>
          </div>
        </div>
      ) : (
        <ChapterNavigator 
          slug={slug} 
          currentChapterId={parsedChapterId} 
          prevChapterId={prevChapterId}
          nextChapterId={nextChapterId}
          nextChapterTitle={nextChapterTitle}
          isFinalChapter={isFinalChapter}
        />
      )}
    </div>
  );
}
