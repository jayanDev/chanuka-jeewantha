import { NextResponse } from "next/server";
import { packageProducts } from "@/lib/packages-catalog";

export async function GET() {
  try {
    const products = packageProducts
      .map((item) => ({
        id: item.slug,
        slug: item.slug,
        name: item.name,
        category: item.category,
        audience: item.audience,
        priceLkr: item.priceLkr,
        delivery: item.delivery,
        features: item.features.join(" | "),
      }))
      .sort((a, b) => {
        if (a.category === b.category) {
          return a.priceLkr - b.priceLkr;
        }
        return a.category.localeCompare(b.category);
      });

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: "Server error while loading products" }, { status: 500 });
  }
}
