const fs = require('fs');
const path = './src/content/ebooks/kotipathiyek-vime-vegawath-maga/chapter-0.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const badHeadings = ['පිදුම', 'කෘතඥතාව', 'ප්‍රකාශන අයිතිය'];

const originalLength = data.sections.length;
data.sections = data.sections.filter(sec => {
    if (sec.heading) {
        if (badHeadings.some(bh => sec.heading.includes(bh))) {
            console.log('Removed section:', sec.heading);
            return false;
        }
    }
    return true;
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Updated fastlane intro');
console.log(`Original sections: ${originalLength}, New sections: ${data.sections.length}`);
