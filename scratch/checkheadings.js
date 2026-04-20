const fs = require('fs');
const content = fs.readFileSync('Paid Ebooks/ගැඹුරු කාර්යය .md', 'utf8');

const regex = /#+ (.*?)|\*\*(.*?)\*\*/g;
let match;
while ((match = regex.exec(content)) !== null) {
    if (match[1]) console.log('H: ' + match[1]);
    if (match[2]) console.log('B: ' + match[2]);
}
