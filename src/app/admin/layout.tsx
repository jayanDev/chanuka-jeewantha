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
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/contacts", label: "Contact Inbox" },
  { href: "/admin/offers", label: "Offers & Coupons" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/ebooks", label: "Ebooks" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/comments", label: "Comments" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminPage("/admin");

  return (
 <section className="w-full min-h-screen bg-zinc-50 py-8">
      <div className="mx-auto w-full max-w-[1512px] px-4 sm:px-6 space-y-6">
 <header className="rounded-[18px] border border-zinc-200 bg-foreground p-6 text-background md:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-main">Chanuka Admin</p>
          <h1 className="text-3xl md:text-4xl font-bold font-heading !text-white mb-2">Order Command Center</h1>
          <p className="max-w-3xl text-white/75">Orders open first because fulfilment is the main workflow. Use the navigation for content, offers, reports, and settings.</p>
        </header>

 <nav className="rounded-[16px] border border-zinc-200 bg-white p-3 shadow-sm">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11">
            {adminLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
 className={`block rounded-[10px] border px-4 py-3 text-sm font-semibold transition ${
                    item.href === "/admin/orders"
                      ? "border-brand-main bg-brand-main text-white hover:bg-brand-dark"
                      : "border-zinc-200 text-zinc-700 hover:border-brand-main hover:text-brand-main"
                  }`}
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
