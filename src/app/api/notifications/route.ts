import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { isTrustedOrigin } from "@/lib/security";
import {
  listUserNotifications,
  markAllUserNotificationsRead,
  markUserNotificationRead,
} from "@/lib/user-notifications";

export async function GET(request: Request) {
  try {
    const user = await getRequestUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await listUserNotifications({ userId: user.id, limit: 100 });
    const unreadCount = notifications.reduce((count, notification) => count + (notification.isRead ? 0 : 1), 0);

    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    console.error("Loading notifications failed:", error);
    return NextResponse.json({ error: "Failed to load notifications" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const user = await getRequestUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      notificationId?: unknown;
      markAll?: unknown;
    };

    let updated = 0;

    if (body.markAll === true) {
      updated = await markAllUserNotificationsRead(user.id);
    } else if (typeof body.notificationId === "string" && body.notificationId.trim()) {
      const wasMarked = await markUserNotificationRead(user.id, body.notificationId.trim());
      updated = wasMarked ? 1 : 0;
    } else {
      return NextResponse.json({ error: "notificationId or markAll is required" }, { status: 400 });
    }

    const notifications = await listUserNotifications({ userId: user.id, limit: 100 });
    const unreadCount = notifications.reduce((count, notification) => count + (notification.isRead ? 0 : 1), 0);

    return NextResponse.json({ ok: true, updated, unreadCount });
  } catch (error) {
    console.error("Updating notifications failed:", error);
    return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 });
  }
}
