import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";

type SaveUploadedFileInput = {
  file: File;
  folder: string;
};

function sanitizeSegment(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9/_-]/g, "");
}

function getSafeExtension(fileName: string): string {
  const raw = fileName.includes(".") ? fileName.split(".").pop() : "bin";
  return (raw ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
}

export function getFileExtension(fileName: string): string {
  const raw = fileName.includes(".") ? fileName.split(".").pop() : "";
  return (raw ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function isAllowedFileType(
  file: File,
  options: {
    mimeTypes: string[];
    extensions: string[];
  }
): boolean {
  const normalizedMime = file.type.toLowerCase();
  const normalizedExt = getFileExtension(file.name);

  return options.mimeTypes.includes(normalizedMime) || options.extensions.includes(normalizedExt);
}

export async function saveUploadedFile(input: SaveUploadedFileInput): Promise<string> {
  const safeFolder = sanitizeSegment(input.folder);
  const safeExt = getSafeExtension(input.file.name);
  const filename = `${Date.now()}-${randomUUID()}.${safeExt}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/${safeFolder}/${filename}`, input.file, {
      access: "public",
    });

    return blob.url;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Upload storage is not configured");
  }

  const relativePath = `/uploads/${safeFolder}/${filename}`;
  const absoluteDir = path.join(process.cwd(), "public", "uploads", safeFolder);
  const absolutePath = path.join(absoluteDir, filename);

  await mkdir(absoluteDir, { recursive: true });
  const bytes = await input.file.arrayBuffer();
  await writeFile(absolutePath, Buffer.from(bytes));

  return relativePath;
}
