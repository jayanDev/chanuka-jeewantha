import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Profile Settings",
  description: "Manage your account profile, preferences, and password.",
  path: "/profile",
});

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
