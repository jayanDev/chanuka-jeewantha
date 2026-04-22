const fs = require('fs');
const path = require('path');

const ebookPath = path.join(__dirname, '../Paid Ebooks/ධනවත් තාත්තා සහ දුප්පත් තාත්තා.md');
const ebookStr = fs.readFileSync(ebookPath, 'utf-8');
const outDir = path.join(__dirname, '../src/content/ebooks/dhanavath-thaththa-saha-duppoth-thaththa');

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

const lines = ebookStr.split('\n');

let chapters = [];
let indexData = [];
let currentChapterId = -1;
let currentContent = [];
let currentTitle = '';
let inList = false;

function closeList() {
  if (inList) {
    currentContent.push('</ul>');
    inList = false;
  }
}

function pushChapter() {
  if (currentChapterId >= 0 && currentContent.length > 0) {
    closeList();
    chapters.push({
      id: currentChapterId,
      title: currentTitle,
      content: currentContent.join('\n'),
    });
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applyInline(str) {
  // Bold: **text** → <strong>text</strong>
  str = str.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  str = str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Escape backslash sequences the MD exporter produces
  str = str.replace(/\\\-/g, '-');
  str = str.replace(/\\\./g, '.');
  str = str.replace(/\\\\/g, '\\');
  str = str.replace(/\\#/g, '#');
  return str;
}

let reachedContent = false;

for (let i = 0; i < lines.length; i++) {
  const raw = lines[i];
  const line = raw.trim();

  // Skip everything before the first ## heading (TOC summary block)
  if (!reachedContent) {
    if (line.match(/^##\s+\*\*/)) {
      reachedContent = true;
    } else {
      continue;
    }
  }

  // ## **Chapter / Intro heading**
  const chapterMatch = line.match(/^##\s+\*\*(.*?)\*\*\s*$/);
  if (chapterMatch) {
    pushChapter();
    currentChapterId++;
    currentTitle = chapterMatch[1]
      .replace(/\\\-/g, '-')
      .replace(/\\\./g, '.')
      .trim();
    indexData.push({ kind: 'chapter', id: currentChapterId, title: currentTitle });
    currentContent = [];
    inList = false;
    continue;
  }

  // Skip if we still haven't hit a chapter (shouldn't happen after reachedContent, safety net)
  if (currentChapterId < 0) continue;

  // ### **Sub-section heading** → ebook-subtopic
  const subSectionMatch = line.match(/^###\s+\*\*(.*?)\*\*\s*$/);
  if (subSectionMatch) {
    closeList();
    const text = subSectionMatch[1].replace(/\\\-/g, '-').replace(/\\\./g, '.').trim();
    currentContent.push(`<h3 class="ebook-subtopic">${text}</h3>`);
    continue;
  }

  // Empty line
  if (line === '') {
    closeList();
    continue;
  }

  // Bullet list item: starts with * or -
  if (line.match(/^\*\s+/) || line.match(/^-\s+/)) {
    if (!inList) {
      currentContent.push('<ul>');
      inList = true;
    }
    const itemText = line.replace(/^\*\s+/, '').replace(/^-\s+/, '');
    currentContent.push(`<li>${applyInline(itemText)}</li>`);
    continue;
  }

  // Numbered item like "1. text" or "**1. text**" on its own line
  const numberedBoldMatch = line.match(/^\*\*(\d+[.\)]\s+.*?)\*\*\s*$/);
  if (numberedBoldMatch) {
    closeList();
    const text = numberedBoldMatch[1].replace(/\\\-/g, '-').replace(/\\\./g, '.').trim();
    currentContent.push(`<h3 class="ebook-subtopic">${text}</h3>`);
    continue;
  }

  // Standalone bold line (whole line is **text**) shorter than 200 chars → sub-heading
  const boldOnlyMatch = line.match(/^\*\*((?!\*).+?)\*\*\s*$/);
  if (boldOnlyMatch && line.length < 250) {
    closeList();
    const text = boldOnlyMatch[1].replace(/\\\-/g, '-').replace(/\\\./g, '.').trim();
    currentContent.push(`<h3 class="ebook-subtopic">${text}</h3>`);
    continue;
  }

  // Regular paragraph
  closeList();
  if (line.length > 0) {
    currentContent.push(`<p class="text-justify">${applyInline(line)}</p>`);
  }
}

// Push last chapter
pushChapter();

console.log(`Parsed ${chapters.length} chapters.`);
console.log('TOC entries:', indexData.map(e => `[${e.kind || 'chapter'}] ${e.id !== undefined ? e.id + ': ' : ''}${e.title}`).join('\n'));

fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(indexData, null, 2), 'utf-8');
chapters.forEach(c => {
  fs.writeFileSync(path.join(outDir, `chapter-${c.id}.json`), JSON.stringify(c, null, 2), 'utf-8');
});

console.log('Done! Written to', outDir);
