import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExternalToolLaunch from "@/components/ExternalToolLaunch";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { careerTools, getCareerToolBySlug } from "@/lib/tools";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return careerTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getCareerToolBySlug(slug);

  if (!tool) {
    return buildPageMetadata({
      title: "Tool Not Found",
      description: "The requested tool could not be found.",
      path: `/tools/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${tool.title} | Free Career Tool`,
    description: tool.description,
    path: `/tools/${slug}`,
    keywords: [tool.title, "career tool", "free tool", tool.category.toLowerCase()],
  });
}

export default async function ToolLandingPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getCareerToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: tool.title, path: `/tools/${tool.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/tools" className="hover:text-brand-main transition-colors">Tools</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{tool.title}</span>
          </div>
          <h1 className="font-heading text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.08] max-w-5xl !text-white">
            {tool.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">
            {tool.description}
          </p>
          <ExternalToolLaunch
            href={tool.externalUrl}
            label="Open Tool"
            note="This page is the local launch page. Click the button to use the matching external tool in a new tab."
          />
        </div>
      </section>

      <section className="w-full bg-white py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-[28px] font-bold font-heading text-foreground">Why this tool matters</h2>
            <p className="mt-3 text-text-body">
              {tool.summary}
            </p>
            <ul className="mt-5 space-y-3">
              {tool.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm text-zinc-700">
                  <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-main" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">Direct Access</p>
            <h3 className="mt-3 text-[24px] font-bold font-heading text-foreground">Open the matching tool</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              If you want the external version, use the launch button above. It opens Career Studio in a new tab.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
