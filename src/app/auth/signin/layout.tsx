import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Sign In",
  description: "Sign in to access your orders and checkout.",
  path: "/auth/signin",
});

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
