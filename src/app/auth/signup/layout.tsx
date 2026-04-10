import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Create Account",
  description: "Create an account to place and manage orders.",
  path: "/auth/signup",
});

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
