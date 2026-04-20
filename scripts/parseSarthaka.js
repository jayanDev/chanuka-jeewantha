const fs = require('fs');
const path = require('path');

const ebookPath = path.join(__dirname, '../Paid Ebooks/සාර්ථක වෘත්තීය ජීවිතයක නීති සහ මූලධර්ම.md');
const ebookStr = fs.readFileSync(ebookPath, 'utf-8');
const outDir = path.join(__dirname, '../src/content/ebooks/sarthaka-wurthiya-jeewithayaka-neethi-saha-mooladharma');

if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

const lines = ebookStr.split('\n');

let chapters = [];
let indexData = [];
let currentChapterId = -1; // -1 means we haven't reached Intro yet
let currentContent = [];
let currentTitle = "";
let pendingNiyamaya = null;

let reachedIntro = false;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!reachedIntro && line.includes('හැඳින්වීම (Introduction)')) {
        reachedIntro = true;
        currentChapterId = 0;
        currentTitle = "හැඳින්වීම";
        indexData.push({ id: 0, title: currentTitle });
        continue;
    }
    if (!reachedIntro) continue;

    // Rule heading / section
    const isRule = line.match(/^#\s*\*\*(.*?)\*\*/);
    if (isRule) {
        let hText = isRule[1].replace(/\\\-/g, '-').replace(/\\\./g, '.');
        indexData.push({
            kind: 'section',
            title: hText
        });
        pendingNiyamaya = hText;
        continue;
    }

    // Check if chapter heading
    const isChapter = line.match(/^##\s*\*\*(.*?)\*\*/);
    if(isChapter) {
        if (currentChapterId >= 0) {
            chapters.push({ id: currentChapterId, title: currentTitle, content: currentContent.join('\n') });
        }
        currentChapterId++;
        currentTitle = isChapter[1].trim().replace(/\\\-/g, '-').replace(/\\\./g, '.');
        
        indexData.push({ id: currentChapterId, title: currentTitle });
        
        currentContent = [];
        
        // Output the Niyamaya inside the first chapter of that section
        if (pendingNiyamaya) {
            currentContent.push(`<div class="mb-6 pb-2 border-b-2 border-brand-main/20"><h2 class="text-2xl font-bold font-plus-jakarta text-brand-main">${pendingNiyamaya}</h2></div>`);
            pendingNiyamaya = null;
        }
        continue;
    }

    if (line.startsWith('**') && line.endsWith('**') && line.length < 200 && !line.startsWith('**©')) {
        let subText = line.substring(2, line.length - 2).trim();
        subText = subText.replace(/\\\-/g, '-').replace(/\\\./g, '.');
        currentContent.push(`<h3 class="ebook-subtopic">${subText}</h3>`);
        continue;
    }
    
    if (line.length > 0) {
        let pText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        pText = pText.replace(/\\\-/g, '-').replace(/\\\./g, '.');
        currentContent.push(`<p class="text-justify">${pText}</p>`);
    }
}

if (currentChapterId >= 0 && currentContent.length > 0) {
    chapters.push({ id: currentChapterId, title: currentTitle, content: currentContent.join('\n') });
}

console.log(`Parsed ${chapters.length} chapters.`);

fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(indexData, null, 2));

chapters.forEach(c => {
    fs.writeFileSync(path.join(outDir, `chapter-${c.id}.json`), JSON.stringify(c, null, 2));
});

console.log('Done!');

