# Package pricing

The website prices are maintained in src/lib/packages-catalog.ts. The price cards supplied on 2026-08-31 define five services, three experience levels, and two tiers (30 prices).

| Service | Essential: Student / Professional / Executive | Signature: Student / Professional / Executive |
| --- | --- | --- |
| Professional CV | 3,950 / 5,950 / 9,950 | 7,500 / 13,500 / 19,500 |
| LinkedIn Optimization | 3,950 / 5,950 / 9,950 | 7,500 / 13,500 / 19,500 |
| Cover Letter | 2,950 / 3,950 / 5,950 | 5,500 / 8,500 / 13,500 |
| Foreign Job CV | 4,950 / 7,450 / 10,950 | 12,500 / 17,500 / 28,500 |
| CV Review | 1,490 / 1,990 / 2,490 | 2,500 / 3,500 / 4,500 |

All amounts are LKR. Student/Fresh Graduate: less than one year; Professional: 1–9 years; Executive: more than nine years.

Service combinations use the sum of the current individual prices, with no automatic discount: Starter 10,850; Career 53,000; Executive 108,500. The Executive combination retains the existing one-hour consultation price of 27,500. Graphical CV, consultation, ebook, and resource prices were not supplied in these cards and remain unchanged. Existing fast delivery remains 20% above the standard service price.

The retired Fiverr celebration banner, artwork, and percentage-off claims were removed. Fiverr is retained as an ordering channel; its own prices and fees must be confirmed on Fiverr. Unrelated seasonal offers and coupon infrastructure were not changed. Historical completed order totals were not modified.

Pricing tables, package/service pages, booking, country pages, package-guide articles, cart, checkout and structured metadata share the catalogue data. Older package-guide article URLs were retained.

Verification:

- node node_modules/vitest/vitest.mjs run src/lib/packages-catalog.test.ts src/lib/catalogue-questionnaire.test.ts src/lib/country-job-markets.test.ts src/lib/pricing-contract.test.tsx --maxWorkers 1
- node scripts/verify-package-pricing.cjs http://localhost:3100
- node scripts/verify-package-pricing.cjs https://chanukajeewantha.lk

The HTTP check validates all 30 prices against the supplied cards, public pages, service combinations, older articles, sitemap entries and retired banner removal. Browser checks additionally cover responsive layout and catalogue interaction. No real orders need to be placed for verification.
