import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import ServiceCombinationCards from "@/components/ServiceCombinationCards";

export const metadata = buildPageMetadata({
  title: "Career Service Combinations | Essential & Signature Packages",
  description: "Compare Starter, Career, and Executive service combinations using current Essential and Signature prices. See each service price and the combined total.",
  path: "/bundles",
});

export default function BundlesPage() {
  return <>
    <section className="bg-foreground px-4 py-16 text-center text-white sm:px-6 md:py-24">
      <p className="mb-5 text-sm text-brand-main"><Link href="/">Home</Link> / Service Combinations</p>
      <h1 className="font-heading text-[36px] font-bold leading-tight !text-white sm:text-[52px]">Build Your Career Service Package</h1>
      <p className="mx-auto mt-5 max-w-3xl text-lg text-white/80">Choose the services you need, with each price shown clearly. Totals use the current Essential and Signature package rates.</p>
    </section>
    <section className="bg-zinc-50 px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <ServiceCombinationCards />
        <p className="mt-8 text-sm leading-relaxed text-zinc-600">These are combined standard service prices, not discounted offers. Fast delivery is separate. The Executive combination retains the existing one-hour consultation price. Confirm the required services and delivery timeline before ordering.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/pricing" className="rounded-[10px] bg-brand-main px-6 py-3 font-semibold text-foreground">View All Prices</Link>
          <Link href="/catalogue" className="rounded-[10px] border border-zinc-300 bg-white px-6 py-3 font-semibold text-foreground">Choose Individual Services</Link>
        </div>
      </div>
    </section>
  </>;
}
