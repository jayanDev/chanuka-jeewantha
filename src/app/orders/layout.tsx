import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "My Orders",
  description: "Track order status, handover files, and updates.",
  path: "/orders",
});

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
