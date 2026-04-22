import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Order Details",
  description: "Track your order progress and download final documents.",
  path: "/orders",
});

export default function OrderDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
