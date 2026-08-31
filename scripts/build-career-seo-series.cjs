const fs = require("node:fs");
const path = require("node:path");

const directory = path.join(__dirname, "../src/content/career-seo-series");
const topics = JSON.parse(fs.readFileSync(path.join(directory, "topics.json"), "utf8"));
const publishedAt = "2026-08-31";
const clusters = [
  [1, 10, "CV Writing Services"],
  [11, 30, "ATS CV Writing"],
  [31, 40, "CV Improvement"],
  [41, 50, "Student and Graduate CVs"],
  [51, 60, "Executive CV Writing"],
  [61, 70, "Industry CV Writing"],
  [71, 80, "International CV Writing"],
  [81, 95, "Cover Letter Writing"],
  [96, 100, "LinkedIn Optimization"],
];

function plain(text) {
  return text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\*\*/g, "");
}

function parseMarkdown(markdown) {
  const blocks = [];
  for (const chunk of markdown.replace(/\r\n/g, "\n").trim().split(/\n\s*\n/)) {
    if (/^# /.test(chunk)) continue;
    const heading = chunk.match(/^(#{2,3}) (.+)$/);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2] });
    } else if (/^---+$/.test(chunk)) {
      blocks.push({ type: "divider" });
    } else if (/^(?:[-*] |\d+\. )/.test(chunk)) {
      const ordered = /^\d+\. /.test(chunk);
      const items = chunk.split(/\n(?=(?:[-*] |\d+\. ))/).map((item) => item.replace(/^(?:[-*] |\d+\. )/, "").replace(/\n/g, " "));
      blocks.push({ type: "list", ordered, items });
    } else {
      const quoted = chunk.startsWith("> ");
      blocks.push({ type: quoted ? "quote" : "paragraph", text: chunk.replace(/^> /gm, "").replace(/\n/g, " ") });
    }
  }
  return blocks;
}

const posts = topics.map((topic) => {
  const filename = `${String(topic.id).padStart(3, "0")}.md`;
  let markdown = fs.readFileSync(path.join(directory, filename), "utf8");
  const sourceTitle = markdown.match(/^# (.+)/)?.[1];
  if (sourceTitle !== topic.title) throw new Error(`Title does not match topic ${topic.id}`);
  // Turn the supplied examples' plain website references into working links.
  markdown = markdown.replace(/\*\*(?:https:\/\/)?chanukajeewantha\.lk\*\*/g, "[chanukajeewantha.lk](/)");
  const body = parseMarkdown(markdown);
  const faqs = [];
  const faqStart = body.findIndex((block) => block.type === "heading" && /^(Frequently Asked Questions|FAQs)/i.test(block.text));
  if (faqStart !== -1) {
    let end = faqStart + 1;
    while (end < body.length && !(body[end].type === "heading" && body[end].level === 2) && body[end].type !== "divider") end++;
    const faqBlocks = body.splice(faqStart, end - faqStart).slice(1);
    for (const block of faqBlocks) {
      if (block.type === "heading") faqs.push({ question: plain(block.text), answer: "" });
      else if (block.type === "paragraph" && faqs.length) faqs[faqs.length - 1].answer += `${faqs[faqs.length - 1].answer ? " " : ""}${plain(block.text)}`;
      else throw new Error(`Unsupported FAQ structure in ${filename}`);
    }
  }
  const [start, end, category] = clusters.find(([start, end]) => topic.id >= start && topic.id <= end);
  const service = topic.id >= 96 ? "linkedin-optimization" : topic.id >= 81 ? "cover-letter-writing" : "cv-writing";
  const relatedIds = [...new Set([start, topic.id > start ? topic.id - 1 : end, topic.id < end ? topic.id + 1 : start, 3, 100])].filter((id) => id !== topic.id);
  const firstParagraphs = body.filter((block) => block.type === "paragraph").slice(0, 3).map((block) => plain(block.text)).join(" ");
  const excerpt = firstParagraphs.length > 175 ? `${firstParagraphs.slice(0, 172).replace(/\s+\S*$/, "")}…` : firstParagraphs;
  return {
    slug: topic.slug,
    title: topic.title,
    excerpt,
    content: body.filter((block) => block.type === "paragraph").slice(0, 2).map((block) => plain(block.text)).join(" "),
    category,
    publishedAt,
    author: "Chanuka Jeewantha",
    keywords: [topic.keyword, category, "Sri Lanka career advice", "Chanuka Jeewantha"],
    body,
    faqs,
    internalLinks: [
      ...relatedIds.map((id) => ({ label: topics[id - 1].title, href: `/blog/${topics[id - 1].slug}` })),
      { label: "Browse all career articles", href: "/blog" },
    ],
    ctaButtons: [
      { label: topic.id >= 96 ? "View LinkedIn Services" : topic.id >= 81 ? "View Cover Letter Services" : "View CV Writing Services", href: `/services/packages/${service}` },
      { label: "Compare Pricing", href: "/pricing" },
      { label: "Discuss Your Application", href: "/contact" },
    ],
  };
});

if (posts.length !== 100 || new Set(posts.map((post) => post.slug)).size !== 100) throw new Error("Expected 100 unique articles");
const output = `${JSON.stringify(posts, null, 2)}\n`;
const target = path.join(directory, "articles.generated.json");
if (process.argv.includes("--check")) {
  if (fs.readFileSync(target, "utf8").replace(/\r\n/g, "\n") !== output) throw new Error("Generated articles are stale. Run npm run content:build.");
  console.log("All 100 compiled articles match their Markdown sources.");
} else {
  fs.writeFileSync(target, output);
  console.log(`Compiled ${posts.length} articles across ${clusters.length} topic clusters.`);
}
