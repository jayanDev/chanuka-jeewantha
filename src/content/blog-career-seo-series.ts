import type { BlogPost } from "./blog-posts";
import articles from "./career-seo-series/articles.generated.json";

// Compiled from the 100 individually authored Markdown files. Keep these
// articles out of the legacy automatic content-enrichment pipeline.
export const careerSeoSeries = articles as BlogPost[];
