// Parser for Psychology of Money ebook — reads from the Markdown source
const fs = require('fs');
const path = require('path');

const ebookPath = path.join(__dirname, '../Paid Ebooks/\u0db8\u0dd4\u0daf\u0dbd\u0dda \u0db8\u0db1\u0ddd\u0dc0\u0dd2\u0daf\u0dca_\u0dba\u0dcf\u0dc0 The Psychology of Money.md');
const outDir = path.join(__dirname, '../src/content/ebooks/mudale-manowithyawa-psychology-of-money');

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

const ebookStr = fs.readFileSync(ebookPath, 'utf-8');
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

function applyInline(str) {
  str = str.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  str = str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  str = str.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>');
  str = str.replace(/\\([.!?,;:\-\\/\[\](){}#*_`~|>])/g, '$1');
  return str;
}

let reachedContent = false;

for (let i = 0; i < lines.length; i++) {
  const raw = lines[i];
  const line = raw.trim();

  // Skip TOC at the top — start only when first ## heading is found
  if (!reachedContent) {
    if (line.match(/^##\s+\*\*/)) {
      reachedContent = true;
    } else {
      continue;
    }
  }

  // Chapter heading: ## **title**
  const chapterMatch = line.match(/^##\s+\*\*(.*?)\*\*\s*$/);
  if (chapterMatch) {
    pushChapter();
    currentChapterId++;
    currentTitle = chapterMatch[1]
      .replace(/\\([.!?,;:\-\\/\[\](){}#*_`~|>])/g, '$1')
      .trim();
    indexData.push({ kind: 'chapter', id: currentChapterId, title: currentTitle });
    currentContent = [];
    inList = false;
    continue;
  }

  if (currentChapterId < 0) continue;

  // Subtopic with bullet prefix: * ### **title**
  const bulletSubMatch = line.match(/^\*\s+###\s+\*\*(.*?)\*\*\.?\s*$/);
  if (bulletSubMatch) {
    closeList();
    const text = bulletSubMatch[1]
      .replace(/\\([.!?,;:\-\\/\[\](){}#*_`~|>])/g, '$1')
      .trim();
    currentContent.push(`<h3 class="ebook-subtopic">${text}</h3>`);
    continue;
  }

  // Plain subtopic: ### **title**
  const subMatch = line.match(/^###\s+\*\*(.*?)\*\*\.?\s*$/);
  if (subMatch) {
    closeList();
    const text = subMatch[1]
      .replace(/\\([.!?,;:\-\\/\[\](){}#*_`~|>])/g, '$1')
      .trim();
    currentContent.push(`<h3 class="ebook-subtopic">${text}</h3>`);
    continue;
  }

  // Empty line
  if (line === '') {
    closeList();
    continue;
  }

  // Bullet list item: * text (not * ### which is handled above)
  if (line.match(/^\*\s+/) && !line.match(/^\*\s+###/)) {
    if (!inList) {
      currentContent.push('<ul>');
      inList = true;
    }
    currentContent.push(`<li>${applyInline(line.replace(/^\*\s+/, ''))}</li>`);
    continue;
  }

  // Dash list item
  if (line.match(/^-\s+/)) {
    if (!inList) {
      currentContent.push('<ul>');
      inList = true;
    }
    currentContent.push(`<li>${applyInline(line.replace(/^-\s+/, ''))}</li>`);
    continue;
  }

  // Numbered bold sub-section: **1\. title:**
  const numberedBoldMatch = line.match(/^\*\*(\d+[.\)]\s+.*?)\*\*:?\s*$/);
  if (numberedBoldMatch) {
    closeList();
    const text = numberedBoldMatch[1]
      .replace(/\\([.!?,;:\-\\/\[\](){}#*_`~|>])/g, '$1')
      .trim();
    currentContent.push(`<h3 class="ebook-subtopic">${text}</h3>`);
    continue;
  }

  // Standalone bold-only line → sub-heading
  const boldOnlyMatch = line.match(/^\*\*((?!\*).+?)\*\*:?\s*$/);
  if (boldOnlyMatch && line.length < 300) {
    closeList();
    const text = boldOnlyMatch[1]
      .replace(/\\([.!?,;:\-\\/\[\](){}#*_`~|>])/g, '$1')
      .trim();
    currentContent.push(`<h3 class="ebook-subtopic">${text}</h3>`);
    continue;
  }

  // Regular paragraph
  closeList();
  if (line.length > 0) {
    currentContent.push(`<p class="text-justify">${applyInline(line)}</p>`);
  }
}

pushChapter();

console.log(`Parsed ${chapters.length} chapters.`);
chapters.forEach(c => console.log(`  [${c.id}] ${c.title.slice(0, 70)}`));

fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(indexData, null, 2), 'utf-8');
chapters.forEach(c => {
  fs.writeFileSync(
    path.join(outDir, `chapter-${c.id}.json`),
    JSON.stringify({ id: c.id, title: c.title, content: c.content }, null, 2),
    'utf-8'
  );
});

console.log('\nDone! Written to:', outDir);
