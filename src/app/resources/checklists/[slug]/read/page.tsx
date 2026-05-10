import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { checklists, getChecklistBySlug } from "@/lib/checklists";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { getServerUser } from "@/lib/auth-server";
import ChecklistReader from "./_components/ChecklistReader";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return checklists.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const checklist = getChecklistBySlug(slug);
  if (!checklist) {
    return buildNoIndexMetadata({
      title: "Checklist Not Found",
      description: "The requested checklist is unavailable.",
      path: `/resources/checklists/${slug}/read`,
    });
  }
  return buildPageMetadata({
    title: `${checklist.title} — Interactive Checklist`,
    description: `Work through the ${checklist.title} step by step. Free for everyone after sign-in.`,
    path: `/resources/checklists/${slug}/read`,
    keywords: [checklist.title, "free checklist", "interactive checklist"],
  });
}

export default async function ChecklistReadPage({ params }: Props) {
  const { slug } = await params;
  const checklist = getChecklistBySlug(slug);
  if (!checklist) notFound();

  const user = await getServerUser();
  const isSignedIn = !!user;

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Checklists", path: "/resources/checklists" },
    { name: checklist.title, path: `/resources/checklists/${slug}` },
    { name: "Read", path: `/resources/checklists/${slug}/read` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/resources/checklists/${slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-brand-dark transition-colors shrink-0"
              aria-label="Back to checklist overview"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              Back
            </Link>
            <span className="text-zinc-300 select-none">|</span>
            <span className="text-sm font-semibold text-foreground truncate">{checklist.title}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {!isSignedIn && (
              <Link
                href="/auth/signin"
                className="rounded-[8px] bg-foreground px-4 py-1.5 text-xs font-semibold text-background hover:bg-brand-dark transition-colors"
              >
                Unlock all
              </Link>
            )}
            <span className="text-xs text-zinc-400 hidden sm:block">
              {checklist.steps.length} sections · free
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-zinc-100 bg-zinc-50">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8">
          <span className="mb-3 inline-flex rounded-full bg-brand-main/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-dark">
            Free Checklist
          </span>
          <h1 className="text-[22px] sm:text-[28px] font-bold font-heading text-foreground leading-snug">
            {checklist.title}
          </h1>
          <p className="text-text-body mt-2 text-[15px] leading-relaxed">{checklist.subtitle}</p>

          {!isSignedIn && (
            <div className="mt-4 flex items-center gap-2 rounded-[10px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>
                <strong>Sections 1-{checklist.freeSteps}</strong> are open without sign-in.{" "}
                <Link href="/auth/signin" className="font-semibold underline hover:no-underline">
                  Sign in free
                </Link>{" "}
                to unlock the remaining sections.
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white min-h-screen">
        <ChecklistReader checklist={checklist} isSignedIn={isSignedIn} />
      </div>
    </>
  );
}
