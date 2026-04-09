import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
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
}
