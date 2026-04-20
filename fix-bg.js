const fs = require('fs');
const path = require('path');

function fixFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      fixFiles(path.join(dir, file.name));
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      const filePath = path.join(dir, file.name);
      let content = fs.readFileSync(filePath, 'utf8');

      let modified = false;

      // regex to find className="..."
      content = content.replace(/className\s*=\s*(?:\{?\s*)([\`\"'])([\s\S]*?)\1/g, (match, quote, classes) => {
        let newClasses = classes;

        // Fix background white to change in dark mode
        if (newClasses.match(/\bbg-white\b/) && !newClasses.match(/\bdark:bg-/)) {
           newClasses = newClasses.replace(/\bbg-white\b/g, 'bg-white dark:bg-zinc-900');
           modified = true;
        }
        
        // Fix background zinc-50
        if (newClasses.match(/\bbg-zinc-50\b/) && !newClasses.match(/\bdark:bg-/)) {
           newClasses = newClasses.replace(/\bbg-zinc-50\b/g, 'bg-zinc-50 dark:bg-zinc-900');
           modified = true;
        }

        // Fix borders
        if (newClasses.match(/\bborder-zinc-200\b/) && !newClasses.match(/\bdark:border-/)) {
           newClasses = newClasses.replace(/\bborder-zinc-200\b/g, 'border-zinc-200 dark:border-zinc-800');
           modified = true;
        }

        if (newClasses !== classes) {
            return match.replace(classes, newClasses);
        }
        return match;
      });

      if (modified) {
        console.log("Fixed backgrounds:", filePath);
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  }
}

fixFiles(path.join(__dirname, 'src', 'app'));
fixFiles(path.join(__dirname, 'src', 'components'));
console.log('Background fix done!');
