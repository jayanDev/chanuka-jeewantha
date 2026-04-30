import { NextRequest, NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getEbookPurchase } from "@/lib/ebook-firestore";
import { getEbookBySlug } from "@/lib/ebooks";
import fs from "fs/promises";
import path from "path";

// Map ebook slug to filename in "Paid Ebooks/" folder
const slugToFile: Record<string, string> = {
  "kotipathiyek-vime-vegawath-maga": "FastlaneNew.html",
  "gaburu-karyaya": "ගැඹුරු කාර්යය.html",
  "sarthaka-wurthiya-jeewithayaka-neethi-saha-mooladharma":
    "සාර්ථක වෘත්තීය ජීවිතයක නීති සහ මූලධර්ම.html",
  "linkedin-profile-optimization": "LinkedIn Profile Optimization System.pdf",
};

type EbookIndexItem = {
  kind?: string;
  id?: unknown;
  title?: unknown;
};

type EbookChapterIndexItem = {
  kind?: string;
  id: number;
  title: string;
};

async function getDownloadTier(
  userId: string | undefined,
  userEmail: string | undefined,
  userRole: string | undefined,
  slug: string
): Promise<"download" | null> {
  if (!userId) return null;

  // Admin always has download access
  if (userRole === "admin") return "download";

  // Check Firestore for admin-granted download access
  if (userEmail) {
    try {
      const purchase = await getEbookPurchase(userEmail, slug);
      if (purchase?.tier === "download") return "download";
    } catch (error) {
      console.error("[getDownloadTier] Firestore lookup failed:", error);
    }
  }

  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const ebook = getEbookBySlug(slug);
  if (!ebook) {
    return NextResponse.json({ error: "Ebook not found" }, { status: 404 });
  }

  const user = await getRequestUser(request);
  const tier = await getDownloadTier(user?.id, user?.email, user?.role, slug);

  if (!tier) {
    return NextResponse.json({ error: "Access denied. Purchase download access to download this ebook." }, { status: 403 });
  }

  // --- Dynamic JSON-based PDF Rendering ---
  try {
    const contentDir = path.join(process.cwd(), `src/content/ebooks/${slug}`);
    const indexRaw = await fs.readFile(path.join(contentDir, "index.json"), "utf-8");
    const indexData = JSON.parse(indexRaw) as EbookIndexItem[];
    
    const chapters = indexData.filter(
      (item): item is EbookChapterIndexItem =>
        (item.kind ?? "chapter") === "chapter" &&
        typeof item.id === "number" &&
        typeof item.title === "string"
    );
    
    let combinedHtml = `
      <div class="book-cover">
        <h1 class="book-title">${ebook.title}</h1>
        ${ebook.subtitle ? `<h2 class="book-subtitle">${ebook.subtitle}</h2>` : ''}
        <p class="book-author">Chanuka Jeewantha</p>
      </div>
      <div class="toc-page">
        <h2 class="toc-heading">Table of Contents</h2>
        <ul class="toc-list">
    `;
    
    // Add TOC entries
    for (const chapter of chapters) {
        combinedHtml += `<li>${chapter.title}</li>`;
    }
    combinedHtml += `</ul></div>`;
    
    // Read and append each chapter content
    for (const chapter of chapters) {
      const chapterRaw = await fs.readFile(path.join(contentDir, `chapter-${chapter.id}.json`), "utf-8");
      const chapterData = JSON.parse(chapterRaw);
      
      const displayTitle = chapterData.title.replace(/^පරිච්[ඡජ]ේදය \d+:\s*/, "");
      let displayContent = chapterData.content;
      
      // Apply the same heuristic cleanup as read page
      if (slug === "gaburu-karyaya") {
        displayContent = displayContent.replace(/<p[^>]*>.*?<span[^>]*>(?:<b>.*?<\/b>|<strong>.*?<\/strong>|[^<]*?)\d+\.\s+(.*?)<\/span>.*?<\/p>/gi, '<h3 class="ebook-subtopic">$1</h3>');
        displayContent = displayContent.replace(/<p[^>]*>\s*<span[^>]*>\s*\d+\.\s+(.*?)\s*<\/span>\s*<\/p>/gi, '<h3 class="ebook-subtopic">$1</h3>');
      }
      
      displayContent = displayContent.replace(/<p[^>]*>\s*<b>(.*?)<\/b>\s*<\/p>/gi, function(match: string, p1: string) {
        if (p1.length < 150 && !p1.includes('? ') && p1.length > 5) {
            return `<h3 class="ebook-subtopic">${p1.replace(/^\d+\.\s*/, '')}</h3>`;
        }
        return match;
      });

      combinedHtml += `
        <div class="chapter-container">
            <h2 class="chapter-title">${displayTitle}</h2>
            <div class="chapter-content">${displayContent}</div>
        </div>
      `;
    }

    // Inject print-ready CSS matching website styling
    const printInjection = `
    <!DOCTYPE html>
    <html lang="en-LK">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${ebook.title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Poppins:wght@400;500;600&family=Noto+Sans+Sinhala:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        :root { --brand: #8ac826; }
        html, body {
          font-family: 'Poppins', 'Noto Sans Sinhala', sans-serif;
          font-size: 16px;
          line-height: 2;
          color: #3f3f46;
          background: #fafafa;
          margin: 0;
          padding: 0;
        }
        body { max-width: 820px; margin: 0 auto; padding: 48px 56px; background: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); min-height: 100vh;}
        
        .book-cover { height: 100vh; display: flex; flex-direction: column; justify-content: center; text-align: center; page-break-after: always; }
        .book-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3.5rem; font-weight: 800; color: #09090b; margin-bottom: 1rem; line-height: 1.2; }
        .book-subtitle { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.8rem; font-weight: 700; color: #52525b; margin-bottom: 3rem; }
        .book-author { font-size: 1.2rem; font-weight: 600; color: var(--brand); letter-spacing: 0.1em; text-transform: uppercase; }
        
        .toc-page { page-break-after: always; padding-top: 2rem; }
        .toc-heading { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.5rem; font-weight: 800; color: #09090b; border-bottom: 2px solid #e4e4e7; padding-bottom: 1rem; margin-bottom: 2rem; }
        .toc-list { list-style: none; padding: 0; }
        .toc-list li { padding: 0.75rem 0; border-bottom: 1px dashed #e4e4e7; font-size: 1.15rem; color: #3f3f46; }
        
        .chapter-container { page-break-before: always; padding-top: 2rem; }
        .chapter-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.25rem; font-weight: 800; color: #09090b; margin-bottom: 2rem; line-height: 1.3;}
        
        .chapter-content p { margin-bottom: 2rem; line-height: 2; font-size: 1.15rem; text-align: justify; }
        
        .ebook-subtopic {
            background: linear-gradient(to right, rgb(240 253 244), transparent);
            border-left: 4px solid var(--brand);
            padding: 1.5rem 1.75rem;
            border-radius: 0 0.75rem 0.75rem 0;
            margin: 3.5rem 0 2rem !important;
            font-size: 1.35rem !important;
            font-weight: 700;
            color: #18181b; 
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .chapter-content h1, .chapter-content h2, .chapter-content h3 { margin-top: 3.5rem; margin-bottom: 1.5rem; font-weight: 800; color: #09090b; line-height: 1.3; font-family: 'Plus Jakarta Sans', sans-serif;}
        
        .chapter-content ul { list-style-type: none; margin-bottom: 2.5rem; padding-left: 1.75rem; }
        .chapter-content li { margin-bottom: 1rem; font-size: 1.15rem; line-height: 1.8; position: relative; }
        .chapter-content li::before { content: "•"; color: var(--brand); font-weight: bold; font-size: 1.5rem; position: absolute; left: -1.75rem; top: -0.25rem; }
        
        .chapter-content strong, .chapter-content b { color: #18181b; font-weight: 700; background-color: rgb(240 253 244 / 0.5); padding: 0 0.1em; border-radius: 0.125rem; }

        /* Print styles */
        @media print {
          html, body { font-size: 12pt; background: #fff; box-shadow: none; max-width: 100%; padding: 0;}
          @page { margin: 2.5cm 2cm; }
          .book-cover { height: auto; padding-top: 30vh; }
          .chapter-title { page-break-after: avoid; }
          h1, h2, h3, h4, .ebook-subtopic { page-break-after: avoid; }
          p, li { orphans: 3; widows: 3; }
          blockquote, pre, table { page-break-inside: avoid; }
          
          /* Simplify background for printers to save ink */
          .ebook-subtopic { background: none; border-left: 3px solid #333; padding: 0.5rem 1rem;}
          .chapter-content strong, .chapter-content b { background-color: transparent }
          .chapter-content li::before { color: #111; }
        }
      </style>
      <script>
        document.fonts.ready.then(function() {
          setTimeout(function() { window.print(); }, 600);
        });
      </script>
    </head>
    <body>
      ${combinedHtml}
    </body>
    </html>`;

    return new NextResponse(printInjection, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": "inline",
        "Cache-Control": "no-store",
      },
    });

  } catch (error) {
    console.error("PDF Generation Fallback Error:", error);
    // Legacy fallback logic for anything still using old html files
    const fileName = slugToFile[slug];
    if (!fileName) {
        return NextResponse.json({ error: "Download not available for this ebook yet." }, { status: 404 });
    }
    const filePath = path.join(process.cwd(), "Paid Ebooks", fileName);
    let rawHtml: string;
    try {
        rawHtml = await fs.readFile(filePath, "utf-8");
    } catch {
        return NextResponse.json({ error: "Download file not found. Contact admin." }, { status: 404 });
    }
    
    const legacyPrintInjection = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
      :root { --brand: #e8562a; }
      html, body { font-family: 'Noto Sans Sinhala', 'Iskoola Pota', sans-serif; font-size: 15px; line-height: 1.85; color: #1a1a1a; background: #fff; margin: 0; padding: 0; }
      body { max-width: 820px; margin: 0 auto; padding: 48px 56px; }
      @media print { html, body { font-size: 13px; padding: 0; max-width: 100%; } @page { margin: 2cm 2.5cm; } }
    </style>
    <script>document.fonts.ready.then(function() { setTimeout(function() { window.print(); }, 600); });</script>`;
    
    const printReadyHtml = rawHtml.includes("</head>")
        ? rawHtml.replace("</head>", legacyPrintInjection + "\n</head>")
        : legacyPrintInjection + rawHtml;
        
    return new NextResponse(printReadyHtml, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8", "Content-Disposition": "inline", "Cache-Control": "no-store" }
    });
  }
}
