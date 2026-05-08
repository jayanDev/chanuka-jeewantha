import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { checklists, getChecklistBySlug } from "@/lib/checklists";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";

type ChecklistPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return checklists.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ChecklistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const checklist = getChecklistBySlug(slug);
  if (!checklist) {
    return buildNoIndexMetadata({
      title: "Checklist Not Found",
      description: "The requested checklist is unavailable.",
      path: `/resources/checklists/${slug}`,
    });
  }
  return buildPageMetadata({
    title: `${checklist.title} | Free Checklist`,
    description: checklist.description,
    path: `/resources/checklists/${slug}`,
    keywords: [checklist.title, "free checklist", "career resources", "LinkedIn checklist"],
  });
}

export default async function ChecklistDetailPage({ params }: ChecklistPageProps) {
  const { slug } = await params;
  const checklist = getChecklistBySlug(slug);
  if (!checklist) notFound();

  const totalItems = checklist.steps.reduce((total, step) => total + step.items.length, 0);
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Checklists", path: "/resources/checklists" },
    { name: checklist.title, path: `/resources/checklists/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[116px] md:pt-[170px] pb-[72px] md:pb-[90px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-text-light font-medium mb-8 flex-wrap">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/resources" className="hover:text-brand-main transition-colors">Resources</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/resources/checklists" className="hover:text-brand-main transition-colors">Checklists</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{checklist.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 items-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-white/15 bg-zinc-800">
              <Image
                src={checklist.coverImage}
                alt={checklist.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 380px"
                priority
              />
            </div>

            <div>
              <span className="mb-4 inline-flex rounded-full bg-brand-main/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-main">
                Free Checklist
              </span>
              <h1 className="text-[22px] sm:text-[28px] md:text-[36px] font-bold font-plus-jakarta leading-[1.15] mb-3 text-white">
                {checklist.title}
              </h1>
              <p className="text-[20px] font-semibold text-brand-light mb-5">{checklist.subtitle}</p>
              <p className="text-text-light text-lg leading-relaxed mb-8">{checklist.description}</p>

              <ul className="space-y-3 mb-10">
                {checklist.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-text-light">
                    <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-8 rounded-[14px] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400 mb-1">Sections</p>
                    <p className="text-2xl font-bold font-plus-jakarta text-white">{checklist.steps.length}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400 mb-1">Checklist Items</p>
                    <p className="text-2xl font-bold font-plus-jakarta text-white">{totalItems}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400 mb-1">Open Preview</p>
                    <p className="text-2xl font-bold font-plus-jakarta text-brand-main">{checklist.freeSteps}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400 mb-1">Price</p>
                    <p className="text-2xl font-bold font-plus-jakarta text-white">100% Free</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/resources/checklists/${checklist.slug}/read`}
                  className="inline-flex items-center gap-2 rounded-[10px] bg-brand-main px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  Start Checklist
                </Link>
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-white/25 px-6 py-3 font-semibold text-white transition-colors hover:border-brand-main hover:text-brand-main"
                >
                  Unlock All Sections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-[64px] sm:py-[80px] bg-zinc-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="text-[26px] sm:text-[32px] font-bold font-plus-jakarta text-foreground mb-8">
            What Is Inside
          </h2>
          <ol className="space-y-3">
            {checklist.steps.map((step) => (
              <li key={step.id} className="flex items-center gap-4 rounded-[14px] border border-zinc-200 bg-white p-4">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  step.free ? "bg-brand-main text-white" : "bg-zinc-100 text-zinc-500"
                }`}>
                  {step.id}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-[15px]">{step.title}</p>
                  <p className="text-sm text-text-body mt-0.5 line-clamp-1">
                    {step.items.length} items · {step.description}
                  </p>
                </div>
                <div className="shrink-0">
                  {step.free ? (
                    <span className="rounded-full bg-brand-main/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-brand-dark">
                      Free
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      Sign in
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/resources/checklists/${checklist.slug}/read`}
              className="inline-flex items-center gap-2 rounded-[10px] bg-foreground px-6 py-3 font-semibold text-background transition-colors hover:bg-brand-dark"
            >
              Start Checklist
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
