import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PDF_CONTENT_TYPE = "application/pdf";

// User-facing file name for the saved download.
const DOWNLOAD_FILE_NAME = "ATS Friendly CV Checklist - Chanuka Jeewantha.pdf";

// Source file kept outside /public so the funnel page (not the raw file) is what gets shared.
const SOURCE_RELATIVE_PATH = [
  "Resources",
  "Checklists",
  "Free",
  "ATS Friendly CV Checklist.pdf",
];

function buildContentDisposition(fileName: string) {
  const safeFileName = fileName.replace(/"/g, "");
  return `attachment; filename="${safeFileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

export async function GET() {
  const filePath = path.join(process.cwd(), ...SOURCE_RELATIVE_PATH);

  try {
    const file = await fs.readFile(filePath);

    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": PDF_CONTENT_TYPE,
        "Content-Disposition": buildContentDisposition(DOWNLOAD_FILE_NAME),
        "Content-Length": String(file.byteLength),
        // Public lead magnet — allow CDN/browser caching.
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[free-cv-checklist] Failed to read checklist file:", error);
    return NextResponse.json(
      { error: "The checklist is temporarily unavailable. Please try again shortly." },
      { status: 404 }
    );
  }
}
