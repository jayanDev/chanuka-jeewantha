"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type UserNotification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "order_created" | "order_status" | "handover_ready" | "revision_requested" | "revision_resolved" | "system";
  orderId: string | null;
  isRead: boolean;
  createdAtMs: number;
  readAtMs: number | null;
};

async function readJsonSafely(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text();
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/notifications", { cache: "no-store" });
      const payload = await readJsonSafely(response);

      if (response.status === 401) {
        window.location.assign(`/auth/signin?returnTo=${encodeURIComponent("/notifications")}`);
        return;
      }

      if (!response.ok) {
        const message = typeof payload.error === "string" ? payload.error : "Failed to load notifications";
        throw new Error(message);
      }

      setNotifications(Array.isArray(payload.notifications) ? (payload.notifications as UserNotification[]) : []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadNotifications();
  }, []);

  const unreadCount = useMemo(
    () => notifications.reduce((count, notification) => count + (notification.isRead ? 0 : 1), 0),
    [notifications]
  );

  const markNotificationRead = async (notificationId: string) => {
    setUpdatingId(notificationId);
    setError("");

    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId }),
      });
      const payload = await readJsonSafely(response);

      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to mark notification as read");
        return;
      }

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true, readAtMs: Date.now() }
            : notification
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark notification as read");
    } finally {
      setUpdatingId("");
    }
  };

  const markAllRead = async () => {
    setUpdatingId("all");
    setError("");

    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true }),
      });
      const payload = await readJsonSafely(response);

      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to mark all notifications as read");
        return;
      }

      setNotifications((previous) => previous.map((notification) => ({ ...notification, isRead: true, readAtMs: Date.now() })));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark all notifications as read");
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <section className="w-full bg-zinc-50 py-16 min-h-[70vh]">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold font-plus-jakarta text-foreground">Notifications</h1>
            <p className="text-sm text-zinc-600">Updates about order progress, handover files, and revisions.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700">
              Unread: {unreadCount}
            </span>
            <button
              type="button"
              onClick={() => void markAllRead()}
              disabled={updatingId === "all" || unreadCount === 0}
              className="rounded bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-zinc-800 disabled:opacity-60"
            >
              {updatingId === "all" ? "Updating..." : "Mark All Read"}
            </button>
          </div>
        </div>

        {error && <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {isLoading ? (
          <p className="text-sm text-zinc-600">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <div className="rounded-[16px] border border-zinc-200 bg-white p-8 text-center">
            <p className="text-zinc-600">No notifications yet.</p>
            <Link href="/orders" className="mt-3 inline-block text-sm font-medium text-brand-main">
              View your orders
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`rounded-[14px] border p-4 ${notification.isRead ? "border-zinc-200 bg-white" : "border-emerald-200 bg-emerald-50"}`}
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{notification.title}</p>
                    <p className="text-sm text-zinc-700 mt-1">{notification.message}</p>
                    <p className="text-xs text-zinc-500 mt-2">
                      {new Date(notification.createdAtMs).toLocaleString("en-LK")}
                    </p>
                    {notification.orderId && (
                      <Link href="/orders" className="mt-2 inline-block text-xs font-medium text-brand-main">
                        Open order timeline
                      </Link>
                    )}
                  </div>

                  {!notification.isRead && (
                    <button
                      type="button"
                      onClick={() => void markNotificationRead(notification.id)}
                      disabled={updatingId === notification.id}
                      className="rounded border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-brand-main hover:text-brand-main disabled:opacity-60"
                    >
                      {updatingId === notification.id ? "Saving..." : "Mark Read"}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
