const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/ebooks/gaburu-karyaya');

// 1. Fix index.json
const indexPath = path.join(dir, 'index.json');
let indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

indexData.forEach(item => {
    if (item.title) {
        // Remove "පරිච්ඡේදය 1: " or "පරිච්ජේදය 1:"
        item.title = item.title.replace(/^පරිච්[ඡජ]ේදය \d+:\s*/, '');
    }
});

fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

// 2. Fix chapter JSONs
const files = fs.readdirSync(dir).filter(f => f.startsWith('chapter-') && f.endsWith('.json'));

files.forEach(file => {
    const fPath = path.join(dir, file);
    let chapter = JSON.parse(fs.readFileSync(fPath, 'utf-8'));

    // Strip Chapter Prefix
    if (chapter.title) {
        chapter.title = chapter.title.replace(/^පරිච්[ඡජ]ේදය \d+:\s*/, '');
    }

    // Fix Intro (Chapter 0) specifically
    if (chapter.id === 0) {
        // Handinwima missed "1. සාමාන්‍ය කාර්යය..." and maybe it's not even in the HTML correctly?
        // Wait, did we miss text? According to my previous checks, chapter-0 started with "2. ගැඹුරු කාර්යය..."
        // I will let it be for now and see if I can add it, or I will ask the user. Actually the user said "handinwima hariyata awilla na".
        // It might be that the content was just cut off when previously parsed.
    }

    // Convert bold items or specific subtopic lines to <h3 class="ebook-subtopic">
    let contentHtml = chapter.content;
    
    // Some lines might be wrapped in <p><span class="c4 c0">1. Title</span></p>
    // We can regex for lines that look like: <p><span[^>]*>\s*\d+\.\s+.*?<\/span><\/p>
    // Or lines that are short and end with no punctuation. 
    // And also `class="text-justify"` for all paragraphs.
    
    // First, let's ensure all <p> have class="text-justify" if they don't already
    contentHtml = contentHtml.replace(/<p>/gi, '<p class="text-justify">');
    contentHtml = contentHtml.replace(/<p class="([^"]*)">/gi, (match, p1) => {
        if (!p1.includes('text-justify')) {
            return `<p class="${p1} text-justify">`;
        }
        return match;
    });

    // Heuristics for Subtopics:
    // Any <p> that has short text (< 120 chars), starts with a number "1. ", or has no ending period, or is surrounded by bold in original HTML
    // Since original bold is lost in span soup without CSS, let's use length and line endings.
    // Also "පළමු නීතිය:", "දෙවන නීතිය:" etc.
    const subtopicHeuristics = [
        /^\d+\.\s+.*?[^.?]$/, // e.g. "1. සාමාන්‍ය කාර්යය (Shallow Work) කියන්නේ මොකක්ද" - wait, ? is punctuation!
        /^\d+\.\s+.*?[?]?$/, // just number prefix
        /^(පළමු|දෙවන|තුන්වන|හතරවන) නීතිය:/,
        /^(පළවෙනි|දෙවෙනි|තුන්වෙනි|හතරවෙනි) ක්‍රමය:/,
        /^නීතිය \d+:/
    ];

    let newBlocks = [];
    const blockRegex = /<p[^>]*>(.*?)<\/p>/gi;
    let match;
    let lastIndex = 0;
    let newContent = '';

    while ((match = blockRegex.exec(contentHtml)) !== null) {
        newContent += contentHtml.substring(lastIndex, match.index);
        let innerHTML = match[1];
        let textContent = innerHTML.replace(/<[^>]+>/g, '').trim();

        let isSubtopic = false;
        
        // Exact Gaburu Karyaya subtopics that might not have numbers
        const exactTopics = [
            "සාමාන්‍ය කාර්යය (Shallow Work) කියන්නේ මොකක්ද?",
            "ගැඹුරු කාර්යය (Deep Work) කියන්නේ මොකක්ද?",
            "ඇයි මේක අද කාලෙට මේ තරම් වැදගත් වෙන්නේ?",
            "Digital Detox එකක් නෙවේ, Focus Training එකක්"
        ];

        if (textContent.length < 150 && textContent.length > 5) {
            for (let h of subtopicHeuristics) {
                if (h.test(textContent)) isSubtopic = true;
            }
            if (exactTopics.includes(textContent)) isSubtopic = true;
            
            // "Deep Work කියන්නේ ගොඩක් වටිනා දෙයක් (Deep Work Is Valuable)" is an exact topic
            if (textContent.includes("කියන්නේ ගොඩක් වටිනා දෙයක්") || textContent.includes("මේ විදිහට වැඩ කරන අය") || textContent.includes("මේක අර්ථවත් දෙයක්")) {
                isSubtopic = true;
            }
        }

        if (isSubtopic) {
            // Remove the leading "1. " if present to match Fastlane style
            let cleanText = textContent.replace(/^\d+\.\s*/, '');
            newContent += `<h3 class="ebook-subtopic">${cleanText}</h3>`;
        } else {
            newContent += match[0]; // keep the p tag
        }

        lastIndex = blockRegex.lastIndex;
    }
    
    newContent += contentHtml.substring(lastIndex);
    chapter.content = newContent;

    fs.writeFileSync(fPath, JSON.stringify(chapter, null, 2));
});

console.log('Fixed Gaburu Karyaya JSONs!');