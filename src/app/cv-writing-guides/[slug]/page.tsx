import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/content/blog-posts";
import { getIndexableFallbackBlogPosts } from "@/lib/blog-discovery";
import {
  cvGuidePages,
  getCvGuidePageBySlug,
  getRelatedBlogPostsForGuide,
} from "@/lib/cv-guide-pages";
import { getBaseUrl } from "@/lib/site-url";
import { buildNoIndexMetadata, buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { formatLkr, publicPackageProducts as packageProducts } from "@/lib/packages-catalog";

type CvGuidePageProps = {
  params: Promise<{ slug: string }>;
};

const indexableBlogPosts = getIndexableFallbackBlogPosts(blogPosts);
const guideLastModified = "2026-07-30";

export const dynamicParams = false;

export function generateStaticParams() {
  return cvGuidePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: CvGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getCvGuidePageBySlug(slug);

  if (!page) {
    return buildNoIndexMetadata({
      title: "CV Guide Not Found",
      description: "The requested CV writing guide is unavailable.",
      path: `/cv-writing-guides/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${page.title} | Chanuka Jeewantha`,
    description: page.metaDescription,
    path: `/cv-writing-guides/${page.slug}`,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords, "Chanuka Jeewantha"],
    type: "article",
  });
}

export default async function CvWritingGuidePage({ params }: CvGuidePageProps) {
  const { slug } = await params;
  const page = getCvGuidePageBySlug(slug);

  if (!page) notFound();

  const relatedArticles = getRelatedBlogPostsForGuide(page, indexableBlogPosts, 6);
  const relatedGuides = cvGuidePages
    .filter((guide) => guide.cluster === page.cluster && guide.slug !== page.slug)
    .slice(0, 6);
  const relatedPackages = packageProducts.filter((pkg) =>
    page.relatedPackageSlugs.includes(pkg.slug)
  );
  const pagePath = `/cv-writing-guides/${page.slug}`;
  const absoluteUrl = `${getBaseUrl()}${pagePath}`;
  const absoluteImage = `${getBaseUrl()}${page.heroImage}`;

  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "CV Writing Guides", path: "/cv-writing-guides" },
    { name: page.shortTitle, path: pagePath },
  ]);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.metaDescription,
    image: [absoluteImage],
    datePublished: guideLastModified,
    dateModified: guideLastModified,
    mainEntityOfPage: absoluteUrl,
    author: {
      "@type": "Person",
      name: "Chanuka Jeewantha",
      url: getBaseUrl(),
      jobTitle: "Professional CV Writer and Career Development Specialist",
    },
    publisher: {
      "@type": "Person",
      name: "Chanuka Jeewantha",
      url: getBaseUrl(),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <main>
        <section className="relative overflow-hidden bg-primary text-white">
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand-main blur-[110px]" />
            <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-500 blur-[130px]" />
          </div>
          <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
              <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-white/70" aria-label="Breadcrumb">
                <Link href="/" className="transition-colors hover:text-brand-main">Home</Link>
                <span>/</span>
                <Link href="/cv-writing-guides" className="transition-colors hover:text-brand-main">CV Writing Guides</Link>
                <span>/</span>
                <span className="text-brand-main">{page.shortTitle}</span>
              </nav>

              <p className="inline-flex rounded-full border border-brand-main/50 bg-brand-main/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-main">
                Sri Lanka&apos;s No. 1 Professional CV Writer
              </p>
              <h1 className="mt-6 max-w-4xl font-heading text-[38px] font-bold leading-[1.08] !text-white sm:text-[50px] lg:text-[64px]">
                {page.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80">{page.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/pricing" className="rounded-[10px] bg-brand-main px-6 py-3 font-semibold text-primary transition hover:bg-white">
                  View CV Packages
                </Link>
                <Link href="/contact" className="rounded-[10px] border border-white/35 px-6 py-3 font-semibold text-white transition hover:border-brand-main hover:text-brand-main">
                  Ask Chanuka
                </Link>
              </div>
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[28px] border border-white/15 shadow-2xl">
              <Image
                src={page.heroImage}
                alt={`Chanuka Jeewantha - ${page.title}`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-[16px] border border-white/15 bg-primary/90 p-4 backdrop-blur">
                <p className="font-heading text-xl font-bold text-white">Chanuka Jeewantha</p>
                <p className="mt-1 text-sm text-white/75">CPRW &amp; CPCC Certified Career Development Specialist</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-200 bg-[#FAF8F3]">
          <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-4 px-4 py-7 text-center sm:px-6 md:grid-cols-4">
            {["8+ Years Experience", "5,000+ CVs Completed", "60+ Google Reviews", "Sri Lanka & Worldwide"].map((item) => (
              <p key={item} className="font-semibold text-foreground">{item}</p>
            ))}
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <article className="min-w-0 space-y-12">
              <header>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-dark">{page.clusterLabel}</p>
                <h2 className="mt-3 font-heading text-[32px] font-bold text-foreground sm:text-[40px]">What makes this guide useful</h2>
                <div className="mt-6 space-y-4 text-[17px] leading-8 text-text-body">
                  {page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </header>

              <section className="rounded-[22px] border border-brand-main/25 bg-brand-main/5 p-6 md:p-8">
                <h2 className="font-heading text-[28px] font-bold text-foreground">Sri Lankan market insight</h2>
                <p className="mt-4 text-[17px] leading-8 text-text-body">{page.localInsight}</p>
              </section>

              <section>
                <h2 className="font-heading text-[30px] font-bold text-foreground">Who should use this guide?</h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                  {page.audience.map((item) => (
                    <li key={item} className="rounded-[16px] border border-zinc-200 bg-zinc-50 p-5 text-sm leading-6 text-zinc-700">
                      <span className="mb-3 block h-2.5 w-2.5 rounded-full bg-brand-main" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[20px] border border-zinc-200 p-6">
                  <h2 className="font-heading text-[26px] font-bold text-foreground">Common positioning challenges</h2>
                  <ul className="mt-5 space-y-4">
                    {page.challenges.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-700"><span className="mt-2 h-2 w-2 flex-none rounded-full bg-red-400" />{item}</li>)}
                  </ul>
                </div>
                <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-6">
                  <h2 className="font-heading text-[26px] font-bold text-foreground">Chanuka&apos;s recommended approach</h2>
                  <ol className="mt-5 space-y-4">
                    {page.recommendations.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-700"><span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{index + 1}</span>{item}</li>)}
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-[30px] font-bold text-foreground">Evidence that strengthens the page or document</h2>
                <div className="mt-5 space-y-3">
                  {page.evidenceExamples.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[14px] border border-zinc-200 px-5 py-4 text-zinc-700">
                      <span className="mt-0.5 text-lg font-bold text-brand-dark">&#10003;</span>
                      <p className="leading-7">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-dark">From Chanuka&apos;s career blog</p>
                    <h2 className="mt-2 font-heading text-[30px] font-bold text-foreground">Relevant articles to read next</h2>
                  </div>
                  <Link href="/blog" className="text-sm font-semibold text-brand-dark hover:text-brand-main">Browse all articles &rarr;</Link>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {relatedArticles.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-[18px] border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-main hover:shadow-lg">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-dark">{post.category}</p>
                      <h3 className="mt-2 font-heading text-xl font-bold text-foreground transition group-hover:text-brand-dark">{post.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-heading text-[30px] font-bold text-foreground">Frequently asked questions</h2>
                <div className="mt-5 space-y-4">
                  {page.faqs.map((faq) => (
                    <details key={faq.question} className="group rounded-[16px] border border-zinc-200 bg-zinc-50 p-5">
                      <summary className="cursor-pointer list-none font-semibold text-foreground">{faq.question}</summary>
                      <p className="mt-3 text-sm leading-6 text-zinc-600">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-heading text-[30px] font-bold text-foreground">More {page.clusterLabel.toLowerCase()}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {relatedGuides.map((guide) => (
                    <Link key={guide.slug} href={`/cv-writing-guides/${guide.slug}`} className="rounded-[14px] border border-zinc-200 px-4 py-3 font-semibold text-foreground transition hover:border-brand-main hover:text-brand-dark">
                      {guide.shortTitle} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </section>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-[22px] border border-zinc-200 bg-primary p-6 text-white shadow-xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-main">Work with Chanuka</p>
                <h2 className="mt-3 font-heading text-[26px] font-bold !text-white">Turn this guidance into a stronger application</h2>
                <p className="mt-3 text-sm leading-6 text-white/75">Get personal or quality-supervised support based on your experience level and target market.</p>
                <Link href="/catalogue" className="mt-5 block rounded-[10px] bg-brand-main px-4 py-3 text-center font-semibold text-primary transition hover:bg-white">Choose Your Package</Link>
              </div>

              <div className="rounded-[22px] border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="font-heading text-[24px] font-bold text-foreground">Related packages</h2>
                <div className="mt-4 space-y-4">
                  {relatedPackages.map((pkg) => (
                    <div key={pkg.slug} className="rounded-[14px] border border-zinc-200 bg-zinc-50 p-4">
                      <p className="font-semibold text-foreground">{pkg.name}</p>
                      <p className="mt-2 text-sm font-bold text-brand-dark">{formatLkr(pkg.priceLkr)}</p>
                      <Link href={`/packages/${pkg.slug}`} className="mt-3 inline-flex text-sm font-semibold text-brand-dark hover:text-brand-main">View package &rarr;</Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[22px] border border-zinc-200 bg-[#FAF8F3] p-6">
                <h2 className="font-heading text-[22px] font-bold text-foreground">Quality note</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">No CV writer can guarantee interviews. This guide focuses on honest evidence, stronger role alignment, ATS readability, and professional presentation.</p>
                <p className="mt-4 text-xs text-zinc-500">Reviewed: 30 July 2026</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
