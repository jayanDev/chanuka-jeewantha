import { notFound, redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth-server";
import { getEbookPurchase } from "@/lib/ebook-firestore";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { formatLkr } from "@/lib/packages-catalog";
import { getEbookBySlug } from "@/lib/ebooks";
import { EBOOK_DOWNLOAD_PRICE_LKR, EBOOK_READ_PRICE_LKR } from "@/lib/ebook-pricing";
import { isSignedInPreviewChapter, requiresPreviewSignIn } from "@/lib/ebook-preview-access";
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
type EbookAccessTier = "none" | "read" | "download";

async function checkEbookAccess(
  userId: string | undefined,
  userEmail: string | undefined,
  userRole: string | undefined,
  slug: string
): Promise<EbookAccessTier> {
  if (!userId) return "none";

  // Admin always gets full access — no DB query needed
  if (userRole === "admin") return "download";

  // Check Firestore for admin-granted purchase access
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

export default async function ChapterPage({ params }: Props) {
  const { slug, chapterId } = await params;

  if (slug === "linkedin-profile-optimization") {
    redirect("/resources/checklists/linkedin-profile-optimization/read");
  }

  const parsedChapterId = parseInt(chapterId, 10);

  if (isNaN(parsedChapterId)) {
    notFound();
  }

  const ebook = getEbookBySlug(slug);
  if (!ebook) {
    notFound();
  }

  const user = await getServerUser();
  const accessTier = await checkEbookAccess(user?.id, user?.email, user?.role, slug);
  const hasPremiumAccess = accessTier !== "none";

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

  const isFreePreview = isSignedInPreviewChapter(currentIndex);
  const shouldRequireSignIn = requiresPreviewSignIn({
    chapterIndex: currentIndex,
    hasPremiumAccess,
    isSignedIn: Boolean(user),
  });
  const isLocked = !isFreePreview && !hasPremiumAccess;
  const totalChapters = chapterItems.length;

  const prevChapterId = currentIndex > 0 ? chapterIds[currentIndex - 1] : null;
  const nextChapterId = currentIndex < chapterIds.length - 1 ? chapterIds[currentIndex + 1] : null;
  const nextChapterTitle = nextChapterId !== null
    ? chapterItems.find((item) => item.id === nextChapterId)?.title ?? null
    : null;
  const isFinalChapter = currentIndex === chapterIds.length - 1;
  const returnTo = `/ebooks/${slug}/read/${chapterId}`;
  const signinHref = `/auth/signin?returnTo=${encodeURIComponent(returnTo)}`;
  const signupHref = `/auth/signup?returnTo=${encodeURIComponent(returnTo)}`;

  if (shouldRequireSignIn) {
    return (
      <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-zinc-950/65 px-5 py-12 backdrop-blur-sm selection:bg-transparent">
        <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-7 text-center shadow-2xl sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-main/10 text-brand-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-brand-main">
            Sign in required
          </p>
          <h1 className="mb-4 font-heading text-3xl font-extrabold leading-tight text-foreground">
            Create a free account to continue reading
          </h1>
          <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-zinc-600">
            Chapter 1 is open without signing in. Chapter 2 is also free, but you need to sign in or register first to continue the preview for{" "}
            <strong>{ebook.title}</strong>.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={signinHref}
              className="inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-3.5 text-sm font-bold text-background transition-colors hover:bg-brand-dark"
            >
              Sign in
            </Link>
            <Link
              href={signupHref}
              className="inline-flex items-center justify-center rounded-xl border border-brand-main bg-brand-main px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
            >
              Register
            </Link>
          </div>
          <Link
            href={`/ebooks/${slug}/read/${chapterIds[0] ?? parsedChapterId}`}
            className="mt-6 inline-flex text-sm font-semibold text-zinc-500 underline-offset-2 transition-colors hover:text-brand-main hover:underline"
          >
            Back to chapter 1
          </Link>
        </div>
      </div>
    );
  }

  if (isLocked) {
    const whatsappNumber = "94773902230";
    const readMsg = encodeURIComponent(`Hello Chanuka, I want to purchase READ access for:\nEbook: ${ebook.title}\nPrice: LKR ${(ebook.readPriceLkr ?? EBOOK_READ_PRICE_LKR).toLocaleString("en-LK")}`);
    const downloadMsg = encodeURIComponent(`Hello Chanuka, I want to purchase DOWNLOAD access for:\nEbook: ${ebook.title}\nPrice: LKR ${(ebook.downloadPriceLkr ?? EBOOK_DOWNLOAD_PRICE_LKR).toLocaleString("en-LK")}`);

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
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
            Unlock Full Access to Keep Reading
          </h1>
 <p className="text-zinc-600 mb-8 text-lg leading-relaxed">
            You&apos;ve reached the end of the free preview for{" "}
            <strong>{ebook.title}</strong>. Choose your access plan below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="rounded-2xl border-2 border-zinc-200 p-5 text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Read Online</p>
              <p className="text-2xl font-bold font-heading text-foreground mb-3">{formatLkr(ebook.readPriceLkr ?? EBOOK_READ_PRICE_LKR)}</p>
              <p className="text-sm text-zinc-500 mb-4">Access all chapters on our website anytime.</p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${readMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1fb85a] transition-colors w-full justify-center"
              >
                Order via WhatsApp
              </a>
            </div>
            <div className="rounded-2xl border-2 border-brand-main p-5 text-left relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-main text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Best Value</span>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-main mb-1">Download + Read</p>
              <p className="text-2xl font-bold font-heading text-foreground mb-3">{formatLkr(ebook.downloadPriceLkr ?? EBOOK_DOWNLOAD_PRICE_LKR)}</p>
              <p className="text-sm text-zinc-500 mb-4">Read online + download the full ebook file.</p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${downloadMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-main px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark transition-colors w-full justify-center"
              >
                Order via WhatsApp
              </a>
            </div>
          </div>

          {!user && (
            <Link
              href={signinHref}
 className="text-sm font-semibold text-brand-dark hover:text-brand-main underline-offset-2 hover:underline"
            >
              Already purchased? Sign in for access
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Clean chapter data for rendering if it has duplicate chapter names
  const displayTitle = chapterData.title.replace(/^පරිච්[ඡජ]ේදය \d+:\s*/, "");
  
  // Transform existing bold text into proper subtopics if it matches heuristics
  // Or if it starts with a number like "1. "
  let displayContent = chapterData.content;
  
  if (slug === "gaburu-karyaya") {
      // Clean intro
      displayContent = displayContent.replace(/<p[^>]*>.*?<span[^>]*>(?:<b>.*?<\/b>|<strong>.*?<\/strong>|[^<]*?)\d+\.\s+(.*?)<\/span>.*?<\/p>/gi, '<h3 class="ebook-subtopic">$1</h3>');
      displayContent = displayContent.replace(/<p[^>]*>\s*<span[^>]*>\s*\d+\.\s+(.*?)\s*<\/span>\s*<\/p>/gi, '<h3 class="ebook-subtopic">$1</h3>');
      
      // Look for exactly named topics
      const exactTopics = [
        "සාමාන්‍ය කාර්යය (Shallow Work) කියන්නේ මොකක්ද?",
        "ගැඹුරු කාර්යය (Deep Work) කියන්නේ මොකක්ද?",
        "ඇයි මේක අද කාලෙට මේ තරම් වැදගත් වෙන්නේ?",
        "Deep Work කියන්නේ ගොඩක් වටිනා දෙයක් (Deep Work Is Valuable)",
        "මේ විදිහට වැඩ කරන අය ගොඩක් අඩුයි (Deep Work Is Rare)",
        "මේක අර්ථවත් දෙයක් (Deep Work Is Meaningful)",
        "නීතිය 1: ගැඹුරින් වැඩ කරන්න (Rule #1: Work Deeply)",
        "පුරුද්දක් විදිහට කරන්නේ කොහොමද?",
        "සැමියා පුරුද්දක් කරගන්න ක‍්‍රම 4ක්",
        "දෙවෙනි ක්‍රමය: Bimodal Philosophy (බෙදාගන්නා පදනම)",
        "තුන්වෙනි ක්‍රමය: Rhythmic Philosophy (රිද්මයානුකූල පදනම)",
        "හතරවෙනි ක්‍රමය: Journalistic Philosophy (මාධ්‍යවේදී පදනම)",
        "දිනපතා පුරුද්ද පවත්වා ගැනීමට පියවර 4ක්",
        "නීතිය 2: කම්මැලිකමට ආදරය කරන්න",
        "Digital Detox එකක් නෙවේ, Focus Training එකක්",
        "අවධානය දියුණු කරගන්න ප්‍රායෝගික ක්‍රම",
        "නීතිය 3: සමාජ ජාල වලින් ඈත් වෙන්න",
        "නීතිය 4: සාමාන්‍ය වැඩ (Shallow Work)",
        "සාමාන්‍ය වැඩ අඩු කරගන්න Practical ක්‍රම"
      ];
      
      exactTopics.forEach(topic => {
          // Replace exactly matching lines
          const regex = new RegExp(`<p[^>]*>.*?<span[^>]*>.*?(?:\\d+\\.\\s*)?${topic.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g, '\\$&')}.*?<\\/span>.*?<\\/p>`, 'gi');
          displayContent = displayContent.replace(regex, `<h3 class="ebook-subtopic">${topic}</h3>`);
      });
  }

  // Generic cleanup just in case
  displayContent = displayContent.replace(/<p[^>]*>\s*<b>(.*?)<\/b>\s*<\/p>/gi, function(match: string, p1: string) {
      if (p1.length < 150 && !p1.includes('? ') && p1.length > 5) {
          return `<h3 class="ebook-subtopic">${p1.replace(/^\\d+\\.\\s*/, '')}</h3>`;
      }
      return match;
  });

  return (
    <div className="max-w-3xl mx-auto px-5 pt-10 pb-24 sm:px-6 lg:px-8 selection:bg-brand-main/20 selection:text-foreground">
      <ReaderProtection />
      <ReaderProgressTracker 
        currentIndex={currentIndex} 
        totalChapters={totalChapters} 
        chapterTitle={displayTitle} 
        ebookTitle={ebook.title} 
        slug={slug}
        chapterId={parsedChapterId}
        isFinalChapter={isFinalChapter}
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
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground leading-[1.2]">
          {displayTitle}
        </h1>
      </header>

      <article 
         className="ebook-content text-lg md:text-xl font-body 
                    prose-p:leading-relaxed prose-headings:font-heading
                    tracking-[0.01em]"
         dangerouslySetInnerHTML={{ __html: displayContent }}
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
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              You Did It!
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed max-w-lg mx-auto">
              You've officially completed the {ebook.title} journey. You are now equipped with the knowledge and mindset to advance your success!
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
