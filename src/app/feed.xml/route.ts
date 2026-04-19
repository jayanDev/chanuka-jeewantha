import { getCachedBlogListing } from "@/lib/blog-listing";
import { getBaseUrl } from "@/lib/site-url";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = getBaseUrl();
  const posts = (await getCachedBlogListing()).slice(0, 50);

  const items = posts
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug}`;
      const pubDate = (post.publishedAt ?? new Date()).toUTCString();

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid>${escapeXml(url)}</guid>
          <pubDate>${pubDate}</pubDate>
          <category>${escapeXml(post.category)}</category>
          <description>${escapeXml(post.excerpt)}</description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chanuka Jeewantha Career Blog</title>
    <link>${baseUrl}/blog</link>
    <description>ATS-friendly CV writing, LinkedIn optimization, interview preparation, and career strategy articles.</description>
    <language>en-lk</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
