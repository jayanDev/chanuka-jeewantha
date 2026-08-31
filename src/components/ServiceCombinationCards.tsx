import { formatLkr } from "@/lib/packages-catalog";
import { serviceCombinations } from "@/lib/service-combinations";

export default function ServiceCombinationCards() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {serviceCombinations.map((combination) => (
        <article key={combination.key} data-combination={combination.key} className="flex flex-col rounded-[20px] border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-dark">{combination.tier}</p>
          <h3 className="mt-3 font-heading text-[28px] font-bold text-foreground">{combination.name}</h3>
          <p className="mt-2 text-sm text-zinc-600">{combination.audience}</p>
          <p className="mt-5 font-heading text-[32px] font-bold text-foreground">{formatLkr(combination.totalLkr)}</p>
          <p className="mt-1 text-sm text-zinc-500">Combined service total · No automatic discount</p>
          <ul className="my-6 flex-1 space-y-3">
            {combination.components.map((component) => (
              <li key={component.name} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-zinc-100 pb-2 text-sm">
                <span className="text-zinc-700">{component.name}</span>
                <span className="font-semibold text-foreground">{formatLkr(component.priceLkr)}</span>
              </li>
            ))}
          </ul>
          <a href={combination.whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-[10px] bg-brand-main px-5 py-3 text-center text-sm font-semibold text-foreground hover:bg-brand-light">
            Discuss This Package
          </a>
        </article>
      ))}
    </div>
  );
}
