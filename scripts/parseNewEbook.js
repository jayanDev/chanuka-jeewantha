const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const path = require('path');

const ebookPath = path.join(__dirname, '../Paid Ebooks/FastlaneNew.html');
const outDir = path.join(__dirname, '../src/content/ebooks/kotipathiyek-vime-vegawath-maga');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

console.log('Loading New HTML file...');
const html = fs.readFileSync(ebookPath, 'utf-8');

console.log('Parsing HTML with JSDOM...');
const dom = new JSDOM(html);
const document = dom.window.document;

let currentChapterId = 0;
let currentChapterTitle = "ඉදිරිපත් කිරීම";
let currentChapterContent = [];
let chapters = [];

const finalizeChapter = () => {
    if (currentChapterContent.length > 0) {
        const existingIdx = chapters.findIndex(c => c.id === currentChapterId);
        if (existingIdx !== -1) {
            // Overwrite if this one has more content, indicating it's the real chapter body and not just an index item.
            if (currentChapterContent.join('').length > chapters[existingIdx].content.length) {
                chapters[existingIdx] = {
                    id: currentChapterId,
                    title: currentChapterTitle,
                    content: currentChapterContent.join('')
                };
            }
        } else {
            chapters.push({
                id: currentChapterId,
                title: currentChapterTitle,
                content: currentChapterContent.join('')
            });
        }
        currentChapterContent = [];
    }
};

const elements = Array.from(document.body.children);

const isHeading = (el) => {
    const text = el.textContent.trim();
    if (!text) return false;
    
    // Check for chapter numbers "1 වැනි පරිච්ඡේදය:" or "1 වෙනි"
    if (text.match(/^\d+\s*(වැනි|වෙනි)\s*පරිච්ඡේදය/)) return true;
    
    return false;
};

for (const el of elements) {
    const text = el.textContent.trim();
    if (!text && !el.querySelector('img')) continue;
    
    const chapterMatch = text.match(/^(\d+)\s*(වැනි|වෙනි)\s*පරිච්ඡේදය/);
    if (chapterMatch) {
        let matchedChapId = parseInt(chapterMatch[1], 10);
        finalizeChapter();
        currentChapterId = matchedChapId;
        currentChapterTitle = text;
        continue;
    }
    
    // Process Element
    let cleaned = '';
    
    if (el.tagName === 'P') {
        const hasStrong = !!(el.querySelector('strong') || el.querySelector('b') || el.outerHTML.includes('font-weight:700') || el.outerHTML.includes('font-weight: 700'));
        const isBigP = hasStrong && text.length < 150 && !text.includes('.');
        
        let innerHtml = text; // Just taking raw text instead of span soup
        
        // Re-inject strong tags if they existed as emphasis within paragraphs (not the whole paragraph)
        if (hasStrong && !isBigP) {
            // Very naive strong replacement, just keeping it simple by pulling text out of strong/b tags
            // Actually, let's keep innerHTML but strip all classes and spans
            innerHtml = el.innerHTML
              .replace(/<span[^>]*>/gi, '')
              .replace(/<\/span>/gi, '')
              .replace(/class="[^"]*"/gi, '')
              .replace(/style="[^"]*"/gi, '');
        }

        if (isBigP && currentChapterId > 0 && text !== currentChapterTitle) {
            cleaned = `<h3 class="ebook-subtopic">${text}</h3>`;
        } else {
            cleaned = `<p class="text-justify">${innerHtml}</p>`;
        }
    } else if (/^H[1-6]$/.test(el.tagName)) {
        // Many times H1-H6 are used as subtopics
        if (currentChapterId > 0 && text !== currentChapterTitle && text.length < 150) {
            cleaned = `<h3 class="ebook-subtopic">${text}</h3>`;
        } else {
            cleaned = `<h3 class="ebook-subtopic">${text}</h3>`;
        }
    } else if (el.tagName === 'UL' || el.tagName === 'OL') {
        let cleanList = `<${el.tagName.toLowerCase()}>`;
        Array.from(el.querySelectorAll('li')).forEach(li => {
             let liText = li.innerHTML
                 .replace(/<span[^>]*>/gi, '')
                 .replace(/<\/span>/gi, '')
                 .replace(/class="[^"]*"/gi, '')
                 .replace(/style="[^"]*"/gi, '')
                 .replace(/<p[^>]*>/gi, '')
                 .replace(/<\/p>/gi, '');
             cleanList += `<li>${liText}</li>`;
        });
        cleanList += `</${el.tagName.toLowerCase()}>`;
        cleaned = cleanList;
    } else {
        // Safe fallback
        cleaned = el.outerHTML;
    }
    
    currentChapterContent.push(cleaned);
}
finalizeChapter();

console.log(`Found ${chapters.length} chapters.`);

const indexData = chapters.map(c => ({ id: c.id, title: c.title }));
fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(indexData, null, 2));

chapters.forEach(c => {
    fs.writeFileSync(path.join(outDir, `chapter-${c.id}.json`), JSON.stringify(c, null, 2));
});

console.log('Finished restructuring ebook!');
