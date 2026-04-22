import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { getFirebaseStorageBucketNames, getFirebaseStorageService } from "@/lib/firebase-admin";

type SaveUploadedFileInput = {
  file: File;
  folder: string;
};

async function withRetry<T>(work: () => Promise<T>, attempts = 2): Promise<T> {
  let lastError: unknown;

  for (let index = 0; index < attempts; index += 1) {
    try {
      return await work();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Upload failed after retries");
}

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
  const objectPath = `uploads/${safeFolder}/${filename}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await withRetry(
      async () =>
        put(objectPath, input.file, {
          access: "private",
        }),
      2
    );

    // Private blobs require an Authorization header — browsers can't add that on
    // plain <a href> clicks. Store a proxy URL so the file is still viewable.
    return `/api/files/view?url=${encodeURIComponent(blob.url)}`;
  }

  const hasFirebaseAdminConfig = Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  );

  if (hasFirebaseAdminConfig) {
    try {
      const bytes = Buffer.from(await input.file.arrayBuffer());
      const downloadToken = randomUUID();
      const storage = getFirebaseStorageService();
      const bucketNames = getFirebaseStorageBucketNames();

      let uploadedBucketName = "";
      let lastUploadError: unknown = null;

      for (const bucketName of bucketNames) {
        try {
          const bucket = storage.bucket(bucketName);
          const fileRef = bucket.file(objectPath);

          await withRetry(
            async () =>
              fileRef.save(bytes, {
                resumable: false,
                contentType: input.file.type || "application/octet-stream",
                metadata: {
                  metadata: {
                    firebaseStorageDownloadTokens: downloadToken,
                  },
                },
              }),
            2
          );

          uploadedBucketName = bucket.name;
          break;
        } catch (error) {
          console.error(`Firebase Storage upload failed for bucket "${bucketName}":`, error instanceof Error ? error.message : error);
          lastUploadError = error;
        }
      }

      if (!uploadedBucketName) {
        const tried = bucketNames.join(", ");
        console.error(`Firebase Storage: all buckets failed. Tried: [${tried}]`);
        throw lastUploadError instanceof Error
          ? lastUploadError
          : new Error(`No writable Firebase storage bucket was found. Tried: [${tried}]`);
      }

      return `https://firebasestorage.googleapis.com/v0/b/${uploadedBucketName}/o/${encodeURIComponent(
        objectPath
      )}?alt=media&token=${downloadToken}`;
    } catch (error) {
      console.error("Firebase Storage upload failed:", error);
      if (process.env.NODE_ENV === "production") {
        throw new Error(
          "Upload storage failed. Verify FIREBASE_STORAGE_BUCKET permissions or set BLOB_READ_WRITE_TOKEN."
        );
      }
    }
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Upload storage is not configured. Set BLOB_READ_WRITE_TOKEN or Firebase Storage env vars."
    );
  }

  const relativePath = `/uploads/${safeFolder}/${filename}`;
  const absoluteDir = path.join(process.cwd(), "public", "uploads", safeFolder);
  const absolutePath = path.join(absoluteDir, filename);

  await mkdir(absoluteDir, { recursive: true });
  const bytes = await input.file.arrayBuffer();
  await writeFile(absolutePath, Buffer.from(bytes));

  return relativePath;
}
