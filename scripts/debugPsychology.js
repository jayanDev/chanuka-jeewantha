const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('d:/Old Folders/New Experiments/Chanuka Jeewantha/next-app/Paid Ebooks/The Psychology of Money.html', 'utf-8');
const dom = new JSDOM(html);
const doc = dom.window.document;

const all = doc.querySelectorAll('p');
let found = 0;
for (const p of all) {
  const t = p.textContent.trim();
  if (!t) continue;
  // Show real chapter and sub-item
  const isReal = t.startsWith('1. කවුරුවත්') || t.startsWith('2. වාසනාව') || t.startsWith('හැඳින්වීම:');
  const isSub = t.startsWith('1. ඔබටම') || t.startsWith('2. තනි') || t.startsWith('1. "ඇති"');
  if (isReal || isSub) {
    const spans = p.querySelectorAll('span');
    const spanCls = spans.length > 0 ? spans[0].className : '(no spans)';
    console.log(`p.class="${p.className}" span.class="${spanCls}" spans=${spans.length} | ${t.slice(0, 70)}`);
    found++;
    if (found >= 10) break;
  }
}
