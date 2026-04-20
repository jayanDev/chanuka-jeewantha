const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const ebookPath = path.join(__dirname, '../Paid Ebooks/ගැඹුරු කාර්යය.html');
const outDir = path.join(__dirname, '../src/content/ebooks/gaburu-karyaya');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

console.log('Loading Deep Work HTML file...');
const html = fs.readFileSync(ebookPath, 'utf-8');

console.log('Parsing HTML with JSDOM...');
const dom = new JSDOM(html);
const document = dom.window.document;

// We know the structure:
// <p> or <h1>... with font weights.
// We need to group them.

let currentChapterId = 0;
let currentChapterTitle = "හැඳින්වීම";
let currentChapterContent = [];
let chapters = [];
let indexData = [];

const subtopicsRaw = `
සාමාන්‍ය කාර්යය (Shallow Work) කියන්නේ මොකක්ද?
ගැඹුරු කාර්යය (Deep Work) කියන්නේ මොකක්ද?
ඇයි මේක අද කාලෙට මේ තරම් වැදගත් වෙන්නේ?
Deep Work කියන්නේ ගොඩක් වටිනා දෙයක් (Deep Work Is Valuable)
මේ විදිහට වැඩ කරන අය ගොඩක් අඩුයි (Deep Work Is Rare)
මේක අර්ථවත් දෙයක් (Deep Work Is Meaningful)
නීතිය 1: ගැඹුරින් වැඩ කරන්න (Rule #1: Work Deeply)
පුරුද්දක් විදිහට කරන්නේ කොහොමද?
සැමියා පුරුද්දක් කරගන්න ක‍්‍රම 4ක්
දෙවෙනි ක්‍රමය: Bimodal Philosophy (බෙදාගන්නා පදනම)
තුන්වෙනි ක්‍රමය: Rhythmic Philosophy (රිද්මයානුකූල පදනම)
හතරවෙනි ක්‍රමය: Journalistic Philosophy (මාධ්‍යවේදී පදනම)
දිනපතා පුරුද්ද පවත්වා ගැනීමට පියවර 4ක් (The 4 Disciplines of Execution)
නීතිය 2: කම්මැලිකමට ආදරය කරන්න (Rule #2: Embrace Boredom)
Digital Detox එකක් නෙවේ, Focus Training එකක්
අවධානය දියුණු කරගන්න ප්‍රායෝගික ක්‍රම
නීතිය 3: සමාජ ජාල වලින් ඈත් වෙන්න (Rule #3: Quit Social Media)
නීතිය 4: සාමාන්‍ය වැඩ (Shallow Work) குறைക്കുക (Rule #4: Drain the Shallows)
සාමාන්‍ය වැඩ අඩු කරගන්න Practical ක්‍රම
`;

const subtopicsRawList = subtopicsRaw.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);

const finalizeChapter = () => {
    if (currentChapterContent.length > 0) {
        chapters.push({
            id: currentChapterId,
            title: currentChapterTitle,
            content: currentChapterContent.join(' ')
        });
        indexData.push({
            kind: 'chapter',
            id: currentChapterId,
            title: currentChapterTitle
        });
        currentChapterContent = [];
    }
};

const isSubtopic = (text, innerHtml) => {
    // Heuristics for Gaburu Karyaya
    if (text.length < 150 && !text.includes('? ') && !text.includes('! ') && text.length > 5) {
        if (text.match(/^[0-9]+\.\s/) || innerHtml.includes('font-weight:700') || innerHtml.includes('<b>') || innerHtml.includes('font-weight: 700')) {
            return true;
        }
        for (let t of subtopicsRawList) {
            if (text.includes(t)) return true;
        }
    }
    return false;
};

const elements = Array.from(document.body.children);
let pendingStructure = [];

for (const el of elements) {
    const text = el.textContent.trim();
    if (!text && !el.querySelector('img')) continue;

    // Detect parts:
    if (text.startsWith("පළමු කොටස:") || text.startsWith("දෙවන කොටස:")) {
        finalizeChapter();
        indexData.push({ kind: "section", title: text });
        continue;
    }

    const chapterMatch = text.match(/^පරිච්ඡේදය (\d+):\s*(.*)/) || text.match(/^පරිච්ජේදය (\d+):\s*(.*)/);
    if (chapterMatch) {
        finalizeChapter();
        currentChapterId = parseInt(chapterMatch[1], 10);
        currentChapterTitle = chapterMatch[2]; // Cleaned title without prefix!
        continue;
    }
    
    if (text === "හැඳින්වීම" && currentChapterId === 0) {
        // Just the title text of the current chapter
        continue;
    }

    let cleaned = '';
    if (el.tagName === 'P') {
        let innerHtml = el.innerHTML.replace(/<span[^>]*>/gi, '').replace(/<\/span>/gi, '');
        let isBold = isSubtopic(text, el.innerHTML);

        if (isBold) {
            // Further clean if there are weird numbers like "2. ගැඹුරු කාර්යය..." -> we can strip the number or keep it
            cleaned = `<h3 class="ebook-subtopic">${text.replace(/^[0-9]+\.\s*/, '')}</h3>`;
        } else {
            cleaned = `<p class="text-justify">${innerHtml}</p>`;
        }
    } else if (/^H[1-6]$/.test(el.tagName)) {
        cleaned = `<h3 class="ebook-subtopic">${text.replace(/^[0-9]+\.\s*/, '')}</h3>`;
    } else if (el.tagName === 'UL' || el.tagName === 'OL') {
        let cleanList = `<${el.tagName.toLowerCase()}>`;
        Array.from(el.querySelectorAll('li')).forEach(li => {
             let liText = li.innerHTML.replace(/<span[^>]*>/gi, '').replace(/<\/span>/gi, '');
             cleanList += `<li>${liText}</li>`;
        });
        cleanList += `</${el.tagName.toLowerCase()}>`;
        cleaned = cleanList;
    } else {
        cleaned = el.outerHTML;
    }

    currentChapterContent.push(cleaned);
}
finalizeChapter();

console.log(`Found ${chapters.length} chapters.`);

fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(indexData, null, 2));
chapters.forEach(c => {
    fs.writeFileSync(path.join(outDir, `chapter-${c.id}.json`), JSON.stringify(c, null, 2));
});
console.log('Finished parsing deep work ebook!');