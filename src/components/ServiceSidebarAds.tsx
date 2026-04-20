import Link from "next/link";
import { serviceAds } from "@/lib/service-ads";

type Props = {
  title?: string;
};

export default function ServiceSidebarAds({ title = "Our Services" }: Props) {
  return (
    <section className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 md:p-8">
      <h3 className="text-[22px] font-bold font-plus-jakarta text-foreground mb-5">{title}</h3>
      <div className="space-y-4">
        {serviceAds.map((service) => (
          <article key={service.href} className="rounded-[14px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
            <h4 className="text-base font-semibold text-foreground mb-1">{service.title}</h4>
            <p className="text-sm text-text-body mb-3">{service.description}</p>
            <Link
              href={service.href}
              className="inline-flex items-center gap-2 rounded-[10px] bg-brand-main px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              See Details
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
