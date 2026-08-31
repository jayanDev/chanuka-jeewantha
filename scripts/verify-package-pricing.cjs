const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");
const origin = new URL(process.argv[2] || "http://localhost:3100");
// Independent transcription of the two price cards supplied on 2026-08-31.
const priceCards = {
  supervised: { "ats-cv": [3950, 5950, 9950], linkedin: [3950, 5950, 9950], "cover-letter": [2950, 3950, 5950], "foreign-cv": [4950, 7450, 10950], "cv-review": [1490, 1990, 2490] },
  "founder-led": { "ats-cv": [7500, 13500, 19500], linkedin: [7500, 13500, 19500], "cover-letter": [5500, 8500, 13500], "foreign-cv": [12500, 17500, 28500], "cv-review": [2500, 3500, 4500] },
};
const expected = Object.entries(priceCards).flatMap(([tier, services]) => Object.entries(services).flatMap(([service, prices]) => prices.map((price, index) => ({ slug: `${service}-${["student", "professional", "executive"][index]}-${tier}`, service, tier, price }))));
const format = (price) => `LKR ${price.toLocaleString("en-LK")}`;
const countries = [...fs.readFileSync(path.join(__dirname, "../src/lib/country-job-markets.ts"), "utf8").matchAll(/\bslug: "([^"]+)"/g)].map((match) => match[1]);
let verified = 0;

async function get(route) {
  const response = await fetch(new URL(route, origin), { signal: AbortSignal.timeout(90000), headers: { "User-Agent": "PackagePricingVerification/1.0" } });
  assert.equal(response.status, 200, `${route}: HTTP status`);
  return response;
}
async function page(route, inspect = () => {}) {
  const dom = new JSDOM(await (await get(route)).text());
  try {
    const document = dom.window.document;
    const text = document.body.textContent;
    assert.doesNotMatch(text, /Claim your discount on Fiverr|Fiverr Orders.{0,6}50%|Fiverr Price \(50% OFF\)|Up to 80% OFF|40,000 followers celebration/);
    assert.ok(!document.querySelector('img[src*="signature-discount-40k"]'), `${route}: retired artwork`);
    inspect(document);
    verified++;
  } finally { dom.window.close(); }
}
function hasPrices(document, packages) {
  for (const pkg of packages) assert.ok(document.body.textContent.includes(format(pkg.price)), `Missing ${format(pkg.price)} (${pkg.slug})`);
}
function hasCombinations(document) {
  for (const [key, price] of [["starter", 10850], ["career", 53000], ["executive", 108500]]) {
    const card = document.querySelector(`[data-combination="${key}"]`);
    assert.ok(card?.textContent.includes(format(price)), `Incorrect ${key} total`);
    // Next streams some children into separate HTML fragments before hydration.
    // Inspect real anchor elements across the document, not serialized script data.
    const links = [...document.querySelectorAll('a[href^="https://wa.me/"]')];
    assert.ok(links.some((link) => {
      const message = new URL(link.href).searchParams.get("text") || "";
      return message.includes(`Combined service total: ${format(price)}`) && message.toLowerCase().includes(`${key} pack`);
    }), `${key}: WhatsApp amount`);
  }
}

async function main() {
  const payload = await (await get("/api/products")).json();
  assert.equal(payload.products.length, 30);
  for (const pkg of expected) {
    const actual = payload.products.find((product) => product.slug === pkg.slug);
    assert.ok(actual, `Missing API product: ${pkg.slug}`);
    assert.equal(actual.originalPriceLkr, pkg.price, pkg.slug);
    assert.equal(actual.priceLkr, Math.round(pkg.price * (100 - actual.discountPercent) / 100), pkg.slug);
  }
  const sitemap = new JSDOM(await (await get("/sitemap.xml")).text(), { contentType: "text/xml" });
  const locations = [...sitemap.window.document.querySelectorAll("url > loc")].map((node) => new URL(node.textContent).pathname);
  expected.forEach((pkg) => assert.equal(locations.filter((route) => route === `/packages/${pkg.slug}`).length, 1));
  sitemap.window.close();

  await page("/pricing", (document) => {
    hasCombinations(document);
    for (const pkg of expected) {
      const links = [...document.querySelectorAll(`a[href="/packages/${pkg.slug}"]`)];
      assert.equal(links.filter((link) => link.textContent === format(pkg.price)).length, 2, pkg.slug);
    }
  });
  await page("/", hasCombinations);
  await page("/bundles", hasCombinations);
  await page("/booking", (document) => hasPrices(document, expected));
  await page("/services", (document) => hasPrices(document, expected));
  await page("/catalogue");
  await page("/offers");
  await page("/fiverr-orders", (document) => hasPrices(document, expected.filter((pkg) => pkg.service === "ats-cv")));

  for (let start = 0; start < expected.length; start += 3) {
    await Promise.all(expected.slice(start, start + 3).map((pkg) => page(`/packages/${pkg.slug}`, (document) => {
      hasPrices(document, [pkg]);
      const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => JSON.parse(node.textContent));
      const product = schemas.find((schema) => schema["@type"] === "Product");
      assert.equal(product.offers.price, pkg.price, `${pkg.slug}: structured price`);
      assert.ok(document.querySelector('meta[name="description"]').content.includes(format(pkg.price)), `${pkg.slug}: metadata price`);
    })));
  }
  for (const service of Object.keys(priceCards.supervised)) {
    await page(`/services/packages/${service}`, (document) => hasPrices(document, expected.filter((pkg) => pkg.service === service)));
  }
  for (const country of countries) {
    await page(`/${country}`, (document) => hasPrices(document, expected.filter((pkg) => ["foreign-cv", "linkedin", "cover-letter"].includes(pkg.service))));
  }
  for (const pkg of expected.filter((pkg) => pkg.tier === "founder-led" && ["ats-cv", "linkedin", "cover-letter"].includes(pkg.service))) {
    await page(`/blog/package-guide-${pkg.slug}`, (document) => {
      assert.ok([...document.querySelectorAll("p")].some((paragraph) => paragraph.textContent.startsWith(`Price: ${format(pkg.price)}.`)), `${pkg.slug}: legacy article price`);
    });
  }
  for (const level of ["student", "professional", "executive"]) await page(`/blog/package-guide-ats-cv-${level}-supervised`);
  console.log(`PASS: ${verified} pages; all 30 API, visible and structured package prices; combination totals; booking, service and country pages; older articles; sitemap entries; retired banner removal.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
