import { NextResponse } from "next/server";
import { packageProducts } from "@/lib/packages-catalog";
import { applyOfferToPrice, getActiveSeasonalOffer } from "@/lib/seasonal-offers";

export async function GET() {
  try {
    const activeOffer = await getActiveSeasonalOffer();
    const products = packageProducts
      .map((item) => {
        const pricing = applyOfferToPrice(item.priceLkr, item.slug, activeOffer);
        return {
          id: item.slug,
          slug: item.slug,
          name: item.name,
          category: item.category,
          audience: item.audience,
          priceLkr: pricing.priceLkr,
          originalPriceLkr: pricing.originalPriceLkr,
          discountPercent: pricing.discountPercent,
          delivery: item.delivery,
          features: item.features.join(" | "),
        };
      })
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
