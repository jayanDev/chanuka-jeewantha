import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

async function requireAdmin(request: Request) {
  const user = await getRequestUser(request);
  if (!user || user.role !== "admin") return null;
  return user;
}

// GET /api/admin/contacts — list all contact messages
export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return NextResponse.json({ messages });
}

// PATCH /api/admin/contacts — update status of a message
export async function PATCH(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as { id?: string; status?: string };

  if (!body.id || !body.status) {
    return NextResponse.json({ error: "id and status are required" }, { status: 400 });
  }

  const validStatuses = ["new", "in_progress", "resolved", "spam"] as const;
  if (!validStatuses.includes(body.status as typeof validStatuses[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await prisma.contactMessage.update({
    where: { id: body.id },
    data: { status: body.status as "new" | "in_progress" | "resolved" | "spam" },
  });

  return NextResponse.json({ ok: true });
}

// DELETE /api/admin/contacts — delete a message
export async function DELETE(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as { id?: string };
  if (!body.id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  await prisma.contactMessage.delete({ where: { id: body.id } });

  return NextResponse.json({ ok: true });
}
