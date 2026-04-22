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

  // Inject print-ready CSS + Sinhala font + auto-print script for clean PDF export.
  // User opens this in browser → print dialog fires → Save as PDF.
  const printInjection = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root { --brand: #e8562a; }
  html, body {
    font-family: 'Noto Sans Sinhala', 'Iskoola Pota', sans-serif;
    font-size: 15px;
    line-height: 1.85;
    color: #1a1a1a;
    background: #fff;
    margin: 0;
    padding: 0;
  }
  body { max-width: 820px; margin: 0 auto; padding: 48px 56px; }
  h1 { font-size: 2rem; font-weight: 700; color: #111; border-bottom: 3px solid var(--brand); padding-bottom: 12px; margin-bottom: 8px; }
  h2 { font-size: 1.45rem; font-weight: 700; color: #111; margin-top: 2.5em; margin-bottom: 0.5em; }
  h3 { font-size: 1.2rem; font-weight: 600; color: #333; margin-top: 1.8em; margin-bottom: 0.4em; }
  p  { margin: 0.7em 0; }
  ul, ol { padding-left: 1.6em; margin: 0.7em 0; }
  li { margin-bottom: 0.3em; }
  blockquote { border-left: 4px solid var(--brand); margin: 1.2em 0; padding: 0.6em 1.2em; background: #fef6f3; color: #444; font-style: italic; }
  strong, b { font-weight: 700; color: #111; }
  /* Print styles */
  @media print {
    html, body { font-size: 13px; padding: 0; max-width: 100%; }
    body { padding: 0; margin: 0; }
    h1, h2, h3, h4 { page-break-after: avoid; }
    p, li { orphans: 3; widows: 3; }
    blockquote, pre, table { page-break-inside: avoid; }
    a { color: #1a1a1a; text-decoration: none; }
    @page { margin: 2cm 2.5cm; }
  }
</style>
<script>
  // Auto-open print dialog after fonts are loaded so the PDF includes Sinhala text correctly
  document.fonts.ready.then(function() {
    setTimeout(function() { window.print(); }, 600);
  });
</script>`;

  // Inject before </head>. Fall back to prepending if no <head>.
  const printReadyHtml = rawHtml.includes("</head>")
    ? rawHtml.replace("</head>", printInjection + "\n</head>")
    : printInjection + rawHtml;

  return new NextResponse(printReadyHtml, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Open inline so the browser tab fires auto-print → user saves as PDF
      "Content-Disposition": "inline",
      "Cache-Control": "no-store",
    },
  });
}
