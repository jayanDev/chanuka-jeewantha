import { NextRequest, NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";

// Only proxy Vercel Blob URLs — prevents the endpoint being used as an open proxy
const VERCEL_BLOB_HOST_PATTERN = /^https:\/\/[^/]+\.(?:vercel-storage\.com|public\.blob\.vercel-storage\.com)\//;

export async function GET(request: NextRequest) {
  const user = await getRequestUser(request);
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const blobUrl = searchParams.get("url");

  if (!blobUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  // Validate it's a Vercel Blob URL before proxying with the token
  if (!VERCEL_BLOB_HOST_PATTERN.test(blobUrl)) {
    return new NextResponse("Invalid url", { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return new NextResponse("Storage not configured", { status: 503 });
  }

  let blobResponse: Response;
  try {
    blobResponse = await fetch(blobUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    return new NextResponse("Failed to fetch file", { status: 502 });
  }

  if (!blobResponse.ok) {
    return new NextResponse("File not found", { status: blobResponse.status });
  }

  const contentType = blobResponse.headers.get("content-type") ?? "application/octet-stream";
  const contentLength = blobResponse.headers.get("content-length");

  const headers: Record<string, string> = {
    "Content-Type": contentType,
    // Serve inline for images/PDFs so they preview in the browser tab
    "Content-Disposition": "inline",
    "Cache-Control": "private, max-age=3600",
  };

  if (contentLength) {
    headers["Content-Length"] = contentLength;
  }

  return new NextResponse(blobResponse.body, { headers });
}
