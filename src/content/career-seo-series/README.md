# Career SEO series

This collection publishes the user's 100 English topics in their original order across nine clusters. `001.md`–`003.md` preserve the supplied complete articles; `004.md`–`100.md` contain individually written articles. The supplied title and primary keyword for each article are recorded in `topics.json`.

## Editing and publishing

1. Edit the numbered Markdown article. Keep its H1 identical to the manifest title.
2. Use paragraphs, `##`/`###` headings, bold text, links, lists and blockquotes. Raw HTML is not rendered.
3. Put FAQs under `## Frequently Asked Questions`, with each question as a `###` heading and plain paragraph answers. These are extracted into the existing visible FAQ section and structured data.
4. Run `npm run content:build` to regenerate `articles.generated.json`.
5. Run `npm run content:check` and the article tests. The production prebuild also checks that generated content is current.

After a production build, start a local preview on port 3100 and run `node scripts/verify-career-seo-series.cjs`. An optional base URL argument selects a different preview. This checks all 100 actual pages, their canonical URLs and metadata, and the generated sitemap. Topics 24, 86 and 91 use distinct `-sri-lanka-guide` URLs because the unsuffixed routes already belonged to existing articles.

The application imports the compiled JSON, so published routes do not depend on runtime filesystem access. The registry feeds article pages, blog listings, categories, search and the sitemap. Every article has its supplied primary keyword, publication date, author, related articles and appropriate service links. Existing articles remain in place.

All articles in this batch use the actual publication date, 31 August 2026. Future additions should use their own publication dates rather than changing this batch's date. For factual changes, review source links and update the publication model if separate modification dates are needed.

Examples in the newly written articles are illustrative, not client case studies. Articles avoid invented results, universal ATS pass guarantees, fixed market-wide prices and immigration eligibility claims. Current package prices are linked rather than duplicated in editorial content. Relevant primary sources are linked from the articles.
