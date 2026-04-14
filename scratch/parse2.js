const fs = require('fs');

const htmlPattern = /&#(\d+);/g;
function decodeEntities(str) {
  return str.replace(htmlPattern, (match, dec) => String.fromCharCode(dec));
}

const content = fs.readFileSync('Paid Ebooks/index.html', 'utf8');
const decoded = decodeEntities(content);

// We want to group paragraphs.
const paragraphs = decoded.match(/<p[^>]*>.*?<\/p>/gi) || [];

let currentChapter = null;
const chapters = [];
let currentIndex = -1;

for (let p of paragraphs) {
   let text = p.replace(/<[^>]+>/g, '').trim();
   if (!text) continue;

   // Detect Chapter breaks
   // Most chapters are like "1 වෙනි පරිච්ඡේදය: ලොකුම රැවටීම"
   // "XX වෙනි පරිච්ඡේදය"
   if (text.includes("වෙනි පරිච්ඡේදය") || text === "ඉදිරිපත් කිරීම" || text === "පෙරවදන" || text === "පිදුම" || text === "කෘතඥතාව" || text.includes("ප්‍රකාශන අයිතිය")) {
       currentIndex++;
       currentChapter = {
           id: currentIndex,
           title: text,
           content: ""
       };
       chapters.push(currentChapter);
   } else if (currentChapter) {
       // Append the raw HTML paragraph to the content block
       // First remove the docs styling to make it cleaner
       let cleanP = p.replace(/style="[^"]*"/g, '').replace(/class="[^"]*"/g, '').trim();
       if (cleanP !== "<p><span></span></p>") {
           currentChapter.content += cleanP + "\n";
       }
   }
}

fs.writeFileSync('scratch/report2.json', JSON.stringify(chapters.map(c => ({ id: c.id, title: c.title, length: c.content.length })), null, 2));
console.log(`Found ${chapters.length} chapters based on keywords`);
