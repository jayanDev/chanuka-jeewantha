import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { getResourceBySlug, getResourceDownloadBySlug } from "@/lib/resources";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function buildContentDisposition(fileName: string) {
  const safeFileName = fileName.replace(/"/g, "");
  return `attachment; filename="${safeFileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

function resolveDownloadPath(slug: string, relativePath: string[]) {
  if (slug === "ats-friendly-cv-template-free") {
    return path.join(process.cwd(), "Resources", "Templates", "Free", "ATS Friendly CV Template Free.docx");
  }

  return path.join(process.cwd(), ...relativePath);
}

export async function GET(request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  const download = getResourceDownloadBySlug(slug);

  if (!resource || !download || resource.resourceType !== "Template") {
    return NextResponse.json({ error: "Template download not found" }, { status: 404 });
  }

  const user = await getRequestUser(request);
  if (!user) {
    return NextResponse.json({ error: "Create a free account or sign in to download this template." }, { status: 401 });
  }

  const filePath = resolveDownloadPath(slug, download.relativePath);

  try {
    const file = await fs.readFile(filePath);

    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": download.contentType,
        "Content-Disposition": buildContentDisposition(download.fileName),
        "Content-Length": String(file.byteLength),
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("[template-download] Failed to read template file:", error);
    return NextResponse.json({ error: "Template file is unavailable. Please contact support." }, { status: 404 });
  }
}
