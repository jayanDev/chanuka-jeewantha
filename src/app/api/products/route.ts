import { NextResponse } from "next/server";
import { packageProducts } from "@/lib/packages-catalog";
import { applyOfferToPrice, getEffectiveSeasonalOffer } from "@/lib/seasonal-offers";

export async function GET(request: Request) {
  try {
    const activeOffer = await getEffectiveSeasonalOffer(request);
    const products = packageProducts
      .map((item) => {
        const pricing = applyOfferToPrice(item.priceLkr, item.slug, item.category, activeOffer);
        return {
          id: item.slug,
          slug: item.slug,
          name: item.name,
          category: item.category,
          audience: item.audience,
          description: item.description ?? item.audience,
          idealFor: item.idealFor ?? null,
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

    return NextResponse.json(
      { products },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "Server error while loading products" }, { status: 500 });
  }
}
