import { randomUUID } from "node:crypto";
import { getFirebaseDb } from "@/lib/firebase-admin";

const USER_NOTIFICATIONS_COLLECTION = "user_notifications";

export type UserNotificationType =
  | "order_created"
  | "order_status"
  | "handover_ready"
  | "revision_requested"
  | "revision_resolved"
  | "system";

export type UserNotification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: UserNotificationType;
  orderId: string | null;
  isRead: boolean;
  createdAtMs: number;
  readAtMs: number | null;
};

type StoredUserNotification = {
  userId?: unknown;
  title?: unknown;
  message?: unknown;
  type?: unknown;
  orderId?: unknown;
  isRead?: unknown;
  createdAtMs?: unknown;
  readAtMs?: unknown;
};

function parseNotificationType(value: unknown): UserNotificationType {
  return value === "order_created" ||
    value === "order_status" ||
    value === "handover_ready" ||
    value === "revision_requested" ||
    value === "revision_resolved"
    ? value
    : "system";
}

function mapStoredNotification(id: string, value: StoredUserNotification | undefined): UserNotification | null {
  if (!value) return null;
  if (typeof value.userId !== "string") return null;
  if (typeof value.title !== "string") return null;
  if (typeof value.message !== "string") return null;
  if (typeof value.createdAtMs !== "number") return null;

  return {
    id,
    userId: value.userId,
    title: value.title,
    message: value.message,
    type: parseNotificationType(value.type),
    orderId: typeof value.orderId === "string" ? value.orderId : null,
    isRead: value.isRead === true,
    createdAtMs: value.createdAtMs,
    readAtMs: typeof value.readAtMs === "number" ? value.readAtMs : null,
  };
}

export async function createUserNotification(input: {
  userId: string;
  title: string;
  message: string;
  type: UserNotificationType;
  orderId?: string | null;
}): Promise<UserNotification> {
  const db = getFirebaseDb();
  const id = randomUUID();
  const now = Date.now();

  const notification: UserNotification = {
    id,
    userId: input.userId,
    title: input.title,
    message: input.message,
    type: input.type,
    orderId: input.orderId ?? null,
    isRead: false,
    createdAtMs: now,
    readAtMs: null,
  };

  await db.collection(USER_NOTIFICATIONS_COLLECTION).doc(id).set(notification);

  return notification;
}

export async function listUserNotifications(input: {
  userId: string;
  limit?: number;
}): Promise<UserNotification[]> {
  const db = getFirebaseDb();
  const snapshot = await db.collection(USER_NOTIFICATIONS_COLLECTION).where("userId", "==", input.userId).get();

  const notifications = snapshot.docs
    .map((doc) => mapStoredNotification(doc.id, doc.data() as StoredUserNotification | undefined))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => b.createdAtMs - a.createdAtMs);

  const safeLimit = Math.min(Math.max(input.limit ?? 100, 1), 200);
  return notifications.slice(0, safeLimit);
}

export async function markUserNotificationRead(userId: string, notificationId: string): Promise<boolean> {
  const db = getFirebaseDb();
  const ref = db.collection(USER_NOTIFICATIONS_COLLECTION).doc(notificationId);
  const snapshot = await ref.get();

  if (!snapshot.exists) return false;

  const notification = mapStoredNotification(
    snapshot.id,
    snapshot.data() as StoredUserNotification | undefined
  );
  if (!notification || notification.userId !== userId) return false;
  if (notification.isRead) return true;

  await ref.set(
    {
      isRead: true,
      readAtMs: Date.now(),
    },
    { merge: true }
  );

  return true;
}

export async function markAllUserNotificationsRead(userId: string): Promise<number> {
  const db = getFirebaseDb();
  const snapshot = await db.collection(USER_NOTIFICATIONS_COLLECTION).where("userId", "==", userId).get();

  const unreadRefs = snapshot.docs
    .map((doc) => {
      const notification = mapStoredNotification(doc.id, doc.data() as StoredUserNotification | undefined);
      if (!notification || notification.isRead) return null;
      return doc.ref;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (unreadRefs.length === 0) return 0;

  const readAtMs = Date.now();
  await Promise.all(unreadRefs.map((ref) => ref.set({ isRead: true, readAtMs }, { merge: true })));

  return unreadRefs.length;
}
