import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required Firebase env var: ${name}`);
  }

  return value;
}

function normalizeBucketName(value: string | undefined): string {
  if (!value) return "";
  return value
    .trim()
    .replace(/^gs:\/\//i, "")
    .replace(/^https?:\/\//i, "")
    .replace(/\/$/, "")
    .replace(/\/.*$/, "");
}

function getFirebaseApp(): App {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0]!;
  }

  const projectId = requireEnv("FIREBASE_PROJECT_ID");
  const clientEmail = requireEnv("FIREBASE_CLIENT_EMAIL");
  let privateKey = requireEnv("FIREBASE_PRIVATE_KEY").trim();

  // Some env providers store PEM values wrapped in quotes.
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1);
  }

  // Accept both literal "\\n" and real newlines in env values.
  privateKey = privateKey.replace(/\\n/g, "\n");
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET?.trim();

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    projectId,
    ...(storageBucket ? { storageBucket } : {}),
  });
}

export function getFirebaseDb() {
  const app = getFirebaseApp();
  return getFirestore(app);
}

export function getFirebaseStorageBucket() {
  const app = getFirebaseApp();
  const candidates = getFirebaseStorageBucketNames();

  if (candidates.length === 0) {
    throw new Error("Firebase project ID is not configured for storage uploads");
  }

  return getStorage(app).bucket(candidates[0]);
}

export function getFirebaseStorageService() {
  const app = getFirebaseApp();
  return getStorage(app);
}

export function getFirebaseStorageBucketNames(): string[] {
  const app = getFirebaseApp();
  const projectId = typeof app.options.projectId === "string" ? app.options.projectId.trim() : "";
  const configuredBucket = normalizeBucketName(process.env.FIREBASE_STORAGE_BUCKET);

  const candidates = [configuredBucket];
  if (projectId) {
    // Try the newer default bucket first (Firebase projects created 2022+)
    candidates.push(`${projectId}.firebasestorage.app`);
    // Legacy bucket format (older projects)
    candidates.push(`${projectId}.appspot.com`);
  }

  return candidates.filter((value, index, array) => Boolean(value) && array.indexOf(value) === index);
}
