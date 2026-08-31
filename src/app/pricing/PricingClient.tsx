import Link from "next/link";
import PackagePriceTables from "@/components/PackagePriceTables";
import ServiceCombinationCards from "@/components/ServiceCombinationCards";

export default function PricingClient() {
  return <>
    <section className="bg-foreground px-4 py-16 text-center text-white sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-sm text-brand-main"><Link href="/">Home</Link> / Pricing</p>
        <h1 className="font-heading text-[36px] font-bold leading-tight !text-white sm:text-[52px] md:text-[64px]">Essential &amp; Signature <span className="text-brand-main">Packages</span></h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">Compare every service price for your experience level. Choose team-crafted Essential packages or founder-led Signature packages.</p>
        <Link href="/catalogue" className="mt-7 inline-flex rounded-[10px] bg-brand-main px-6 py-3 font-semibold text-foreground hover:bg-brand-light">Find My Package</Link>
      </div>
    </section>
    <section className="bg-zinc-50 px-4 py-14 sm:px-6 md:py-20"><div className="mx-auto max-w-[1200px]"><PackagePriceTables /></div></section>
    <section className="bg-white px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-center font-heading text-[32px] font-bold text-foreground sm:text-[42px]">Need More Than One Service?</h2>
        <p className="mx-auto mb-9 mt-3 max-w-2xl text-center text-zinc-600">These example combinations add the individual service prices above. No automatic bundle discount applies.</p>
        <ServiceCombinationCards />
      </div>
    </section>
  </>;
}
