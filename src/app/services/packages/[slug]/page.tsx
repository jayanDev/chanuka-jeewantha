import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesPackageFilter from "@/app/services/ServicesPackageFilter";
import { packageCategories, type ServiceKey } from "@/lib/packages-catalog";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";

const slugToCategoryTitle: Record<string, string> = {
  "ats-cv": "ATS Friendly Professional CV Writing Packages",
  linkedin: "LinkedIn Account Optimization Packages",
  "cover-letter": "Professional Cover Letter Writing Packages",
  "foreign-cv": "Foreign Job CV Writing Packages",
  "graphical-cv": "Graphical CV Writing / Resume Writing Packages",
  consultation: "Career Consultation Packages",
};

export function generateStaticParams() {
  return Object.keys(slugToCategoryTitle).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoryTitle = slugToCategoryTitle[slug];

  if (!categoryTitle) {
    return buildNoIndexMetadata({
      title: "Service Packages Not Found",
      description: "The requested package category is unavailable.",
      path: `/services/packages/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${categoryTitle} | Chanuka Jeewantha`,
    description: `Explore ${categoryTitle.toLowerCase()} designed for ATS performance, recruiter readability, and practical career outcomes.`,
    path: `/services/packages/${slug}`,
    keywords: [categoryTitle, "career package", "job seeker services", "Chanuka Jeewantha"],
  });
}

export default async function ServicePackagesBySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryTitle = slugToCategoryTitle[slug];

  if (!categoryTitle) {
    notFound();
  }

  const category = packageCategories.find((item) => item.title === categoryTitle);
  if (!category) {
    notFound();
  }

  return (
    <>
      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                SERVICES
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">
              Home
            </Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/services" className="hover:text-brand-main transition-colors">
              Services
            </Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{category.title.replace(" Packages", "")}</span>
          </div>
          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            {category.title.replace(" Packages", "")} <span className="text-brand-main">Packages</span>
          </h1>
        </div>
      </section>

      <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="mx-auto max-w-[1512px] px-4 sm:px-6">
          <div className="mx-auto mb-8 max-w-5xl rounded-[24px] border border-zinc-200 bg-white p-8 text-center md:p-10">
            <h2 className="font-plus-jakarta text-[34px] font-bold text-foreground md:text-[42px]">{category.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-text-body">{category.description}</p>
          </div>
          <ServicesPackageFilter lockedServiceKey={category.key as ServiceKey} />
        </div>
      </section>
    </>
  );
}
