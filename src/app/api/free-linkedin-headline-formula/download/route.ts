import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DOWNLOAD_FILE_NAME = "LinkedIn Headline Formula - Chanuka Jeewantha.pdf";
const SOURCE_RELATIVE_PATH = [
  "Resources",
  "Guides",
  "Free",
  "LinkedIn Headline Formula.pdf",
];

function buildContentDisposition(fileName: string) {
  const safeFileName = fileName.replace(/"/g, "");
  return (
    'attachment; filename="' +
    safeFileName +
    "\"; filename*=UTF-8''" +
    encodeURIComponent(fileName)
  );
}

export async function GET() {
  const filePath = path.join(process.cwd(), ...SOURCE_RELATIVE_PATH);

  try {
    const file = await fs.readFile(filePath);

    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": buildContentDisposition(DOWNLOAD_FILE_NAME),
        "Content-Length": String(file.byteLength),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[free-linkedin-headline-formula] Failed to read PDF:", error);
    return NextResponse.json(
      { error: "The LinkedIn Headline Formula is temporarily unavailable. Please try again shortly." },
      { status: 404 }
    );
  }
}
