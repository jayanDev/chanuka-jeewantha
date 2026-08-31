import Link from "next/link";
import { Fragment } from "react";
import type { BlogBlock } from "@/content/blog-posts";

// A deliberately small inline format for trusted, repository-authored copy.
// React escapes all text; raw HTML and non-web URL schemes are never rendered.
export function BlogInlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^\s)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (link && /^\/(?!\/)/.test(link[2])) {
      return <Link key={index} href={link[2]}>{link[1]}</Link>;
    }
    if (link && /^https:\/\//.test(link[2])) {
      return <a key={index} href={link[2]} rel="noopener noreferrer">{link[1]}</a>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export default function BlogArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === "divider") return <hr key={index} className="my-10 border-zinc-200" />;
    if (block.type === "heading") {
      const Heading = block.level === 2 ? "h2" : "h3";
      return <Heading key={index} className={`${block.level === 2 ? "text-[28px]" : "text-[23px]"} font-bold font-heading text-foreground mt-10 mb-4`}><BlogInlineText text={block.text} /></Heading>;
    }
    if (block.type === "list") {
      const List = block.ordered ? "ol" : "ul";
      return <List key={index} className={`${block.ordered ? "list-decimal" : "list-disc"} pl-6 space-y-2 mb-6`}>{block.items.map((item, itemIndex) => <li key={itemIndex}><BlogInlineText text={item} /></li>)}</List>;
    }
    if (block.type === "quote") {
      return <blockquote key={index} className="border-l-4 border-brand-main bg-zinc-50 p-6 my-8 rounded-r-[20px]"><BlogInlineText text={block.text} /></blockquote>;
    }
    return <p key={index} className="leading-relaxed mb-6"><BlogInlineText text={block.text} /></p>;
  });
}
