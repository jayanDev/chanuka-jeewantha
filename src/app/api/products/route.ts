import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ category: "asc" }, { priceLkr: "asc" }],
      select: {
        id: true,
        slug: true,
        name: true,
        category: true,
        audience: true,
        priceLkr: true,
        delivery: true,
        features: true,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("DATABASE_URL")) {
      return NextResponse.json(
        { error: "Products database is not configured. Please set DATABASE_URL in Vercel." },
        { status: 500 },
      );
    }

    return NextResponse.json({ error: "Server error while loading products" }, { status: 500 });
  }
}
