const fs = require('fs');

const htmlPattern = /&#(\d+);/g;
function decodeEntities(str) {
  return str.replace(htmlPattern, (match, dec) => String.fromCharCode(dec));
}

const rawContent = fs.readFileSync('Paid Ebooks/index.html', 'utf8');

// There are multiple ways chapters are separated. Let's just break it down by heading tags.
// Usually google docs has <h1>, <h2>, <h3>.
const parts = rawContent.split(/<h[123][^>]*>/i);

console.log("Total parts split by headings:", parts.length);

let index = 0;
const results = [];
for (let part of parts) {
    if(!part.trim()) continue;
    // Extract the title (everything until the closing </hX> tag)
    const titleMatch = part.match(/^(.*?)<\/h[123]>/i);
    let titleRaw = titleMatch ? titleMatch[1] : '';
    let titleDecoded = decodeEntities(titleRaw).replace(/<[^>]+>/g, '').trim();
    
    let contentRaw = titleMatch ? part.slice(titleMatch[0].length) : part;
    let textPreview = decodeEntities(contentRaw).replace(/<[^>]+>/g, '').trim().slice(0, 100);

    if (titleDecoded.length > 0) {
       results.push({ index, title: titleDecoded, preview: textPreview.replace(/\n/g, ' ') });
       index++;
    }
}

fs.writeFileSync('scratch/report.json', JSON.stringify(results, null, 2));
console.log("Wrote report.json");
