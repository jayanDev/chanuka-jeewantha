import { NextRequest, NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
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
  slug: string
): Promise<"download" | null> {
  if (!userId) return null;

  const user = await prisma.appUser.findUnique({
    where: { id: userId },
    include: {
      orders: {
        where: {
          status: "completed",
          items: { some: { product: { slug } } },
        },
        take: 1,
      },
    },
  });

  if (user?.role === "admin") return "download";

  if (userEmail) {
    const purchase = await prisma.ebookPurchase.findUnique({
      where: { email_ebookSlug: { email: userEmail, ebookSlug: slug } },
    });
    if (purchase?.tier === "download") return "download";
  }

  // Legacy orders grant download access
  if (user?.orders?.length) return "download";

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
  const tier = await getDownloadTier(user?.id, user?.email, slug);

  if (!tier) {
    return NextResponse.json({ error: "Access denied. Purchase download access to download this ebook." }, { status: 403 });
  }

  const fileName = slugToFile[slug];
  if (!fileName) {
    return NextResponse.json({ error: "Download not available for this ebook yet." }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "Paid Ebooks", fileName);

  let fileBuffer: Buffer;
  try {
    fileBuffer = await fs.readFile(filePath);
  } catch {
    return NextResponse.json({ error: "Download file not found. Contact admin." }, { status: 404 });
  }

  const downloadName = `${ebook.title}.html`;

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(downloadName)}`,
      "Content-Length": String(fileBuffer.length),
      "Cache-Control": "no-store",
    },
  });
}
