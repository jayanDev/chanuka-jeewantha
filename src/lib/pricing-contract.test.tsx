import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { publicPackageProducts, formatLkr } from "./packages-catalog";
import { serviceCombinations } from "./service-combinations";
import PackagePriceTables from "@/components/PackagePriceTables";
import ServiceCombinationCards from "@/components/ServiceCombinationCards";
import { GET as productsGET } from "@/app/api/products/route";
import { GET as cartGET } from "@/app/api/cart/route";
import { POST as quotePOST } from "@/app/api/orders/quote/route";

vi.mock("@/lib/auth-server", () => ({ getRequestUser: async () => ({ id: "pricing-test-user" }) }));
vi.mock("@/lib/security", () => ({ isTrustedOrigin: () => true }));
vi.mock("@/lib/coupons", () => ({ validateCouponForItems: vi.fn() }));
vi.mock("@/lib/seasonal-offers", () => ({
  getEffectiveSeasonalOffer: async () => null,
  applyOfferToPrice: (price: number) => ({ priceLkr: price, originalPriceLkr: price, discountPercent: 0 }),
  incrementOfferAnalytics: vi.fn(),
  resolveOfferDiscountPercent: () => 0,
}));
vi.mock("@/lib/firebase-admin", () => ({
  getFirebaseDb: () => ({
    collection: () => ({ where: () => ({ get: async () => ({
      docs: [
        { id: "old-cv-cart", data: () => ({ productId: "ats-cv-student-supervised", quantity: 2, priceLkr: 2950 }) },
        { id: "review-cart", data: () => ({ productId: "cv-review-executive-founder-led", quantity: 1 }) },
      ],
    }) }) }),
  }),
}));

describe("published pricing contract", () => {
  it("serves every current price through the products API", async () => {
    const response = await productsGET(new Request("http://localhost/api/products"));
    expect(response.status).toBe(200);
    const { products } = await response.json();
    expect(products).toHaveLength(30);
    for (const pkg of publicPackageProducts) {
      expect(products.find((product: { slug: string }) => product.slug === pkg.slug)).toMatchObject({ priceLkr: pkg.priceLkr, originalPriceLkr: pkg.priceLkr, discountPercent: 0 });
    }
  });

  it("quotes all 30 current package prices on the server", async () => {
    for (const pkg of publicPackageProducts) {
      const response = await quotePOST(new Request("http://localhost/api/orders/quote", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "buy_now", productId: pkg.slug, quantity: 1, priceLkr: 1 }),
      }));
      expect(response.status, pkg.slug).toBe(200);
      const payload = await response.json();
      expect(payload.summary.totalLkr, pkg.slug).toBe(pkg.priceLkr);
    }
  });

  it("recalculates existing cart and checkout totals from current prices", async () => {
    const response = await cartGET(new Request("http://localhost/api/cart"));
    const { items } = await response.json();
    expect(items.find((item: { id: string }) => item.id === "old-cv-cart").product.priceLkr).toBe(3950);
    const quote = await quotePOST(new Request("http://localhost/api/orders/quote", { method: "POST", body: JSON.stringify({ mode: "cart" }) }));
    expect((await quote.json()).summary.totalLkr).toBe(12400);
  });

  it("renders package links and exact prices in both tier tables", () => {
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(<PackagePriceTables />);
    for (const pkg of publicPackageProducts) {
      const links = container.querySelectorAll(`a[href="/packages/${pkg.slug}"]`);
      expect(links).toHaveLength(2); // Desktop table and mobile list.
      links.forEach((link) => expect(link.textContent).toBe(formatLkr(pkg.priceLkr)));
    }
  });

  it("keeps combination displays and WhatsApp amounts consistent without discounts", () => {
    expect(serviceCombinations.map((combination) => combination.totalLkr)).toEqual([10850, 53000, 108500]);
    const html = renderToStaticMarkup(<ServiceCombinationCards />);
    for (const combination of serviceCombinations) {
      expect(html).toContain(formatLkr(combination.totalLkr));
      expect(new URL(combination.whatsappUrl).searchParams.get("text")).toContain(`Combined service total: ${formatLkr(combination.totalLkr)}`);
    }
    expect(html).not.toMatch(/line-through|%\s*OFF|Save LKR/);
  });
});
