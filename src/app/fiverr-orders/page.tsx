import Link from "next/link";
import { formatLkr, publicPackageProducts } from "@/lib/packages-catalog";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Fiverr CV Orders | Chanuka Jeewantha",
  description: "Explore current website CV writing package prices or continue to Fiverr to confirm available services, prices, and delivery before ordering.",
  path: "/fiverr-orders",
  keywords: ["fiverr cv writing", "professional cv packages", "fiverr orders"],
});
const fiverrGigUrl = "https://www.fiverr.com/s/kLBDGAb";
const cvPackages = publicPackageProducts.filter((pkg) => pkg.serviceKey === "ats-cv");

export default function FiverrOrdersPage() {
  return <section className="bg-zinc-50 px-4 py-14 sm:px-6 md:py-20">
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-9 rounded-[20px] border border-zinc-200 bg-white p-6 md:p-9">
        <h1 className="font-heading text-[36px] font-bold text-foreground md:text-[52px]">Fiverr CV Orders</h1>
        <p className="mt-4 max-w-3xl text-zinc-600">You can also order through Fiverr. The prices below are our standard website prices in LKR. Confirm the current Fiverr gig price, currency, fees, and delivery details on Fiverr before purchasing.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={fiverrGigUrl} target="_blank" rel="noopener noreferrer" className="rounded-[10px] bg-brand-main px-5 py-3 font-semibold text-foreground">View Services on Fiverr</a>
          <Link href="/pricing" className="rounded-[10px] border border-zinc-300 px-5 py-3 font-semibold text-foreground">Compare Website Prices</Link>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cvPackages.map((pkg) => <article key={pkg.slug} className="rounded-[20px] border border-zinc-200 bg-white p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">{pkg.name}</h2>
          <p className="mt-3 text-sm text-zinc-600">{pkg.audience}</p>
          <p className="mt-5 text-xs uppercase tracking-wide text-zinc-500">Website price</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{formatLkr(pkg.priceLkr)}</p>
          <Link href={`/packages/${pkg.slug}`} className="mt-5 inline-block font-semibold text-brand-dark">View Package Details →</Link>
        </article>)}
      </div>
    </div>
  </section>;
}
