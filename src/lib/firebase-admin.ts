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

function getFirebaseApp(): App {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0]!;
  }

  const projectId = requireEnv("FIREBASE_PROJECT_ID");
  const clientEmail = requireEnv("FIREBASE_CLIENT_EMAIL");
  const privateKey = requireEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
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
  const configuredBucket = process.env.FIREBASE_STORAGE_BUCKET?.trim();

  if (configuredBucket) {
    return getStorage(app).bucket(configuredBucket);
  }

  const projectId = typeof app.options.projectId === "string" ? app.options.projectId : "";
  if (!projectId) {
    throw new Error("Firebase project ID is not configured for storage uploads");
  }

  return getStorage(app).bucket(`${projectId}.appspot.com`);
}
