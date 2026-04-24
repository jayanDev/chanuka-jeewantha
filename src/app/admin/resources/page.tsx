import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";
import ResourcesClient from "@/app/admin/_components/ResourcesClient";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Resources Access — Admin",
  description: "Manage paid resource access.",
  path: "/admin/resources",
});

export default function AdminResourcesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-plus-jakarta text-foreground">Resources Access</h1>
        <p className="text-text-body text-sm mt-1">Grant or revoke access to paid resources (guides, systems, toolkits).</p>
      </div>
      <ResourcesClient />
    </div>
  );
}
