const fs = require('fs');
const path = require('path');

const htmlPattern = /&#(\d+);/g;
function decodeEntities(str) {
  return str.replace(htmlPattern, (match, dec) => String.fromCharCode(dec));
}

// Ensure dir exists
const outDir = path.join(process.cwd(), 'src/content/ebooks/kotipathiyek-vime-vegawath-maga');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
} else {
    // Delete old jsons
    const oldFiles = fs.readdirSync(outDir);
    for (const file of oldFiles) {
        if (file.endsWith('.json')) fs.unlinkSync(path.join(outDir, file));
    }
}

const content = fs.readFileSync('Paid Ebooks/index.html', 'utf8');
const decoded = decodeEntities(content);

const paragraphs = decoded.match(/<p[^>]*>.*?<\/p>/gi) || [];

let currentChapter = null;
const allChaptersArray = [];

for (let p of paragraphs) {
   let text = p.replace(/<[^>]+>/g, '').trim();
   if (!text) continue;

   if (text.includes("වෙනි පරිච්ඡේදය") || text === "ඉදිරිපත් කිරීම" || text === "පෙරවදන" || text === "පිදුම" || text === "කෘතඥතාව" || text.includes("ප්‍රකාශන අයිතිය")) {
       currentChapter = {
           rawTitle: text,
           content: ""
       };
       allChaptersArray.push(currentChapter);
   } else if (currentChapter) {
       let cleanP = p.replace(/style="[^"]*"/g, '').replace(/class="[^"]*"/g, '').trim();
       if (cleanP !== "<p><span></span></p>") {
           currentChapter.content += cleanP + "\n";
       }
   }
}

// Filter the real chapters
let finalChapters = [];
let nextId = 0;

for (const c of allChaptersArray) {
    if (c.content.length < 500 && !c.rawTitle.includes('පෙරවදන')) {
        continue; // Skip TOC entries
    }
    
    // Skip Omits
    if (c.rawTitle === 'පිදුම' || c.rawTitle === 'කෘතඥතාව' || c.rawTitle.includes('ප්‍රකාශන අයිතිය')) {
        continue; 
    }

    // Rename
    let title = c.rawTitle;
    if (title === 'පෙරවදන' || title === 'ඉදිරිපත් කිරීම') {
        title = 'හැඳින්වීම';
    }

    finalChapters.push({
        id: nextId,
        title: title,
        content: c.content
    });
    nextId++;
}

// Write the chapters
const indexData = [];
for (const chap of finalChapters) {
    indexData.push({ id: chap.id, title: chap.title });
    fs.writeFileSync(
        path.join(outDir, `chapter-${chap.id}.json`),
        JSON.stringify(chap, null, 2),
        'utf8'
    );
}

// Write index
fs.writeFileSync(
    path.join(outDir, `index.json`),
    JSON.stringify(indexData, null, 2),
    'utf8'
);

console.log(`Extraction complete. Wrote ${finalChapters.length} actual content chapters, omitted Dedication, Acknowledgements, Copyright, and TOC.`);
