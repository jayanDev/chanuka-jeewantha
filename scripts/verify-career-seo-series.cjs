const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");
const topics = require("../src/content/career-seo-series/topics.json");
const articles = require("../src/content/career-seo-series/articles.generated.json");
const origin = new URL(process.argv[2] || "http://localhost:3100");

async function getDocument(path, contentType = "text/html") {
  const response = await fetch(new URL(path, origin), {
    headers: { "User-Agent": "CareerSeriesVerification/1.0" },
    signal: AbortSignal.timeout(60000),
  });
  assert.equal(response.status, 200, `${path}: expected HTTP 200`);
  return new JSDOM(await response.text(), { contentType });
}

async function main() {
  const sitemap = await getDocument("/sitemap.xml", "text/xml");
  const locations = [...sitemap.window.document.querySelectorAll("url > loc")].map((node) => node.textContent);
  assert.equal(new Set(locations).size, locations.length, "Sitemap contains duplicate URLs");
  for (const topic of topics) {
    assert.equal(locations.filter((url) => new URL(url).pathname === `/blog/${topic.slug}`).length, 1, `Missing sitemap entry for ${topic.slug}`);
  }
  sitemap.window.close();

  let verified = 0;
  // Small batches keep the production preview and database load modest.
  for (let offset = 0; offset < topics.length; offset += 3) {
    await Promise.all(topics.slice(offset, offset + 3).map(async (topic) => {
      const dom = await getDocument(`/blog/${topic.slug}`);
      try {
        const document = dom.window.document;
        assert.equal(document.querySelector("h1")?.textContent, topic.title);
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");
        assert.equal(new URL(canonical).pathname, `/blog/${topic.slug}`);
        assert.ok(!document.querySelector('meta[name="robots"]')?.content.includes("noindex"), topic.slug);
        assert.ok(document.querySelectorAll("article h2").length >= 4, `Missing article body: ${topic.slug}`);
        const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => JSON.parse(node.textContent));
        const posting = schema.find((item) => item["@type"] === "BlogPosting");
        const faq = schema.find((item) => item["@type"] === "FAQPage");
        assert.equal(posting.headline, topic.title);
        assert.ok(posting.wordCount > 300, `Incorrect word count: ${topic.slug}`);
        assert.equal(faq.mainEntity.length, articles[topic.id - 1].faqs.length);
        const articleText = document.querySelector("article").textContent;
        for (const block of articles[topic.id - 1].body) {
          if (block.type === "heading") assert.ok(articleText.includes(block.text.replace(/\*\*/g, "")), `Missing heading: ${topic.slug}`);
        }
        verified++;
      } finally {
        dom.window.close();
      }
    }));
    if (verified % 15 === 0 || verified === topics.length) console.log(`Verified ${verified}/100 article pages.`);
  }
  const listing = await getDocument("/blog");
  assert.ok(listing.window.document.querySelector(`a[href="/blog/${topics[0].slug}"]`), "New articles missing from blog listing");
  listing.window.close();
  console.log("PASS: 100 HTTP pages, full article bodies, canonical URLs, indexability, article/FAQ metadata, blog listing and sitemap coverage.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
