import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";
import Link from "next/link";
import { requireAdminPage } from "@/lib/admin-server";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Admin Dashboard",
  description: "Internal admin area for order and content management.",
  path: "/admin",
});

const adminLinks = [
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/contacts", label: "Contact Inbox" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/comments", label: "Comments" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/offers", label: "Offers & Coupons" },
  { href: "/admin/ebooks", label: "Ebooks" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminPage("/admin");

  return (
 <section className="w-full min-h-screen bg-zinc-50 py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 space-y-6">
 <header className="rounded-[20px] border border-zinc-200 bg-white p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold font-plus-jakarta text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-text-body">Manage statistics, offers, approvals, orders, and system settings.</p>
        </header>

 <nav className="rounded-[16px] border border-zinc-200 bg-white p-3">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-10">
            {adminLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
 className="block rounded-[10px] border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-brand-main hover:text-brand-main"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {children}
      </div>
    </section>
  );
}
