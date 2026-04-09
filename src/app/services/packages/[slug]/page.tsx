import Link from "next/link";
import { notFound } from "next/navigation";
import ServicePackageShowcase from "@/components/ServicePackageShowcase";
import { packageCategories } from "@/lib/packages-catalog";

const slugToCategoryTitle: Record<string, string> = {
  "cv-writing": "CV Writing Packages",
  "cover-letter-writing": "Cover Letter Writing Packages",
  "linkedin-optimization": "LinkedIn Optimization Packages",
  "cv-review": "CV Review Packages",
};

export function generateStaticParams() {
  return Object.keys(slugToCategoryTitle).map((slug) => ({ slug }));
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
      <section className="w-full bg-foreground text-white pt-[50px] pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                SERVICES
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
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
          <h1 className="font-plus-jakarta text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            {category.title.replace(" Packages", "")} <span className="text-brand-main">Packages</span>
          </h1>
        </div>
      </section>

      <ServicePackageShowcase
        title={category.title}
        description={category.description}
        packages={category.packages}
      />
    </>
  );
}
