import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/content/blog-posts";
import { getCachedBlogListing } from "@/lib/blog-listing";
import {
  getBlogCategoryDescription,
  getBlogCategoryPath,
  getBlogCategorySlug,
  getCategoryLabelFromSlug,
  getIndexableFallbackBlogPosts,
} from "@/lib/blog-discovery";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/structured-data";
import { getBlogCoverImage, isGeneratedBlogCoverImage } from "@/lib/blog-images";

type BlogCategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const fallbackCategories = Array.from(
  new Set(getIndexableFallbackBlogPosts(blogPosts).map((post) => post.category))
).sort();

export function generateStaticParams() {
  return fallbackCategories.map((category) => ({ slug: getBlogCategorySlug(category) }));
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryLabelFromSlug(fallbackCategories, slug);

  if (!category) {
    return buildPageMetadata({
      title: "Blog Category Not Found",
      description: "The requested blog category is not available.",
      path: `/blog/category/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${category} Articles | Chanuka Jeewantha Blog`,
    description: getBlogCategoryDescription(category),
    path: getBlogCategoryPath(category),
    keywords: [
      `${category.toLowerCase()} articles`,
      `${category.toLowerCase()} guide`,
      "career blog",
      "chanuka jeewantha blog",
    ],
  });
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { slug } = await params;
  const allPosts = await getCachedBlogListing();
  const categories = Array.from(new Set(allPosts.map((post) => post.category).filter(Boolean))).sort();
  const category = getCategoryLabelFromSlug(categories, slug);

  if (!category) {
    notFound();
  }

  const posts = allPosts.filter((post) => post.category === category);
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category, path: getBlogCategoryPath(category) },
  ]);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} Articles`,
    description: getBlogCategoryDescription(category, posts.length),
    url: getBlogCategoryPath(category),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-heading font-extrabold uppercase leading-none">
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <Link href="/blog" className="hover:text-brand-main transition-colors">Blog</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">{category}</span>
          </div>
          <h1 className="font-heading text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            {category} <span className="text-brand-main">Articles</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-light">
            {getBlogCategoryDescription(category, posts.length)}
          </p>
        </div>
      </section>

 <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-main">Topic Hub</p>
              <h2 className="mt-2 text-[30px] font-bold font-heading text-foreground">
                {posts.length} articles in this category
              </h2>
            </div>
            <Link
              href="/blog"
 className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main"
            >
              Browse All Articles
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => {
              const coverImage = getBlogCoverImage(post);

              return (
 <article key={post.slug} className="overflow-hidden rounded-[20px] border border-zinc-200 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image
                    src={coverImage}
                    alt={post.title}
                    fill
                    unoptimized={isGeneratedBlogCoverImage(coverImage)}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-main">
                    {post.category}
                  </p>
                  <h3 className="mb-3 text-[24px] font-bold font-heading text-foreground">
                    <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand-main">
                      {post.title}
                    </Link>
                  </h3>
 <p className="mb-6 text-sm leading-relaxed text-zinc-600">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-brand-dark transition-colors hover:text-brand-main">
                    Read Article
                  </Link>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
