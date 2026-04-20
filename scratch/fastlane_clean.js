const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/content/ebooks/kotipathiyek-vime-vegawath-maga/chapter-0.json');

const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const content = data.content;
const badTarget = '<p class="text-justify">පිදුම</p>';
const idx = content.indexOf(badTarget);

if (idx !== -1) {
    data.content = content.slice(0, idx);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log('Cleaned Fastlane 0');
} else {
    console.log('Target not found in Fastlane 0');
}