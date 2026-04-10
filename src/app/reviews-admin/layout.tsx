import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Reviews Admin",
  description: "Internal review moderation area.",
  path: "/reviews-admin",
});

export default function ReviewsAdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
