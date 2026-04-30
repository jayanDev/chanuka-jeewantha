import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

// GET /api/admin/subscribers — list all newsletter subscribers
export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
    take: 2000,
    select: {
      id: true,
      email: true,
      status: true,
      createdAt: true,
    },
  });

  // CSV export
  if (format === "csv") {
    const header = "id,email,status,createdAt\n";
    const rows = subscribers
      .map(
        (s) =>
          `${s.id},${s.email},${s.status},${s.createdAt.toISOString()}`
      )
      .join("\n");
    return new Response(header + rows, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="subscribers-${Date.now()}.csv"`,
      },
    });
  }

  const totalActive = subscribers.filter((s) => s.status === "active").length;
  const totalUnsubscribed = subscribers.filter((s) => s.status === "unsubscribed").length;

  return NextResponse.json({ subscribers, totalActive, totalUnsubscribed });
}

// PATCH /api/admin/subscribers — update subscriber status
export async function PATCH(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as { id?: string; status?: string };
  if (!body.id || !body.status) {
    return NextResponse.json({ error: "id and status are required" }, { status: 400 });
  }

  const validStatuses = ["active", "unsubscribed", "bounced"] as const;
  if (!validStatuses.includes(body.status as typeof validStatuses[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await prisma.newsletterSubscriber.update({
    where: { id: body.id },
    data: { status: body.status as "active" | "unsubscribed" | "bounced" },
  });

  return NextResponse.json({ ok: true });
}
