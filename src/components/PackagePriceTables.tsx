import Link from "next/link";
import { experienceOptions, formatLkr, publicPackageCategories, serviceOptionChoices } from "@/lib/packages-catalog";

export default function PackagePriceTables() {
  return (
    <div className="space-y-10">
      {[...serviceOptionChoices].reverse().map((tier) => (
        <section key={tier.key} aria-label={`${tier.shortTitle} package prices`} className="overflow-hidden rounded-[20px] border border-brand-main/30 bg-white shadow-sm">
          <div className={`px-5 py-7 sm:px-8 ${tier.key === "founder-led" ? "bg-foreground text-white" : "bg-bg-cream text-foreground"}`}>
            <h2 className={`font-heading text-[32px] font-bold sm:text-[42px] ${tier.key === "founder-led" ? "!text-white" : ""}`}>{tier.shortTitle} Packages</h2>
            <p className={`mt-2 max-w-3xl text-sm leading-relaxed ${tier.key === "founder-led" ? "!text-white/85" : "!text-foreground/85"}`}>{tier.description}</p>
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <caption className="sr-only">{tier.shortTitle} prices in Sri Lankan rupees by service and experience level</caption>
              <thead className="bg-zinc-50 text-sm text-zinc-700">
                <tr>
                  <th scope="col" className="px-6 py-5">Service</th>
                  {experienceOptions.map((experience) => <th scope="col" key={experience.key} className="px-6 py-5"><span className="block">{experience.shortTitle}</span><span className="mt-1 block text-xs font-normal">{experience.key === "student" ? "Less than 1 year" : experience.key === "professional" ? "1–9 years" : "More than 9 years"}</span></th>)}
                </tr>
              </thead>
              <tbody>
                {publicPackageCategories.map((category) => (
                  <tr key={category.key} className="border-t border-zinc-200">
                    <th scope="row" className="px-6 py-5 font-semibold text-foreground"><Link href={`/services/packages/${category.key}`} className="!text-foreground hover:!text-brand-dark">{category.title.replace(" Packages", "")}</Link></th>
                    {experienceOptions.map((experience) => {
                      const pkg = category.packages.find((item) => item.optionKey === tier.key && item.experienceKey === experience.key)!;
                      return <td key={experience.key} className="whitespace-nowrap px-6 py-5"><Link href={`/packages/${pkg.slug}`} className="font-semibold text-foreground hover:text-brand-dark">{formatLkr(pkg.priceLkr)}</Link></td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="divide-y divide-zinc-200 md:hidden">
            {publicPackageCategories.map((category) => (
              <div key={category.key} className="p-5">
                <h3 className="font-heading text-xl font-bold text-foreground"><Link href={`/services/packages/${category.key}`} className="!text-foreground">{category.title.replace(" Packages", "")}</Link></h3>
                <dl className="mt-4 space-y-3">
                  {experienceOptions.map((experience) => {
                    const pkg = category.packages.find((item) => item.optionKey === tier.key && item.experienceKey === experience.key)!;
                    return <div key={experience.key} className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm"><dt className="text-zinc-600">{experience.shortTitle}</dt><dd className="font-bold text-foreground"><Link href={`/packages/${pkg.slug}`}>{formatLkr(pkg.priceLkr)}</Link></dd></div>;
                  })}
                </dl>
              </div>
            ))}
          </div>
        </section>
      ))}
      <p className="text-sm leading-relaxed text-zinc-600">Student / Fresh Graduate: less than 1 year of experience. Professional: 1–9 years. Executive: more than 9 years. Prices above are standard package prices in LKR. Fast delivery is priced separately in the catalogue. CV Review includes feedback on an existing CV, not a CV rewrite.</p>
    </div>
  );
}
