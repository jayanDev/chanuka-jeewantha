const fs = require('fs');
const path = require('path');

function fixTextColors(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      fixTextColors(path.join(dir, file.name));
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      const filePath = path.join(dir, file.name);
      let content = fs.readFileSync(filePath, 'utf8');

      let modified = false;

      // regex to find className="..."
      content = content.replace(/className\s*=\s*(?:\{?\s*)([\`\"'])([\s\S]*?)\1/g, (match, quote, classes) => {
        let newClasses = classes;

        // Fix text-zinc-900
        if (newClasses.match(/\btext-zinc-900\b/) && !newClasses.match(/\bdark:text-/)) {
           newClasses = newClasses.replace(/\btext-zinc-900\b/g, 'text-zinc-900 dark:text-zinc-100');
           modified = true;
        }
        
        if (newClasses.match(/\btext-zinc-800\b/) && !newClasses.match(/\bdark:text-/)) {
           newClasses = newClasses.replace(/\btext-zinc-800\b/g, 'text-zinc-800 dark:text-zinc-200');
           modified = true;
        }

        if (newClasses.match(/\btext-zinc-700\b/) && !newClasses.match(/\bdark:text-/)) {
           newClasses = newClasses.replace(/\btext-zinc-700\b/g, 'text-zinc-700 dark:text-zinc-300');
           modified = true;
        }

        if (newClasses.match(/\btext-zinc-600\b/) && !newClasses.match(/\bdark:text-/)) {
           newClasses = newClasses.replace(/\btext-zinc-600\b/g, 'text-zinc-600 dark:text-zinc-400');
           modified = true;
        }
        
        if (newClasses.match(/\btext-black\b/) && !newClasses.match(/\bdark:text-/)) {
           newClasses = newClasses.replace(/\btext-black\b/g, 'text-black dark:text-white');
           modified = true;
        }
        
        // Also check border-zinc colors just in case
        if (newClasses.match(/\bborder-zinc-100\b/) && !newClasses.match(/\bdark:border-/)) {
           newClasses = newClasses.replace(/\bborder-zinc-100\b/g, 'border-zinc-100 dark:border-zinc-800');
           modified = true;
        }
        if (newClasses.match(/\bborder-zinc-200\b/) && !newClasses.match(/\bdark:border-/)) {
           newClasses = newClasses.replace(/\bborder-zinc-200\b/g, 'border-zinc-200 dark:border-zinc-800');
           modified = true;
        }
        if (newClasses.match(/\bborder-zinc-300\b/) && !newClasses.match(/\bdark:border-/)) {
           newClasses = newClasses.replace(/\bborder-zinc-300\b/g, 'border-zinc-300 dark:border-zinc-700');
           modified = true;
        }

        if (newClasses !== classes) {
            return match.replace(classes, newClasses);
        }
        return match;
      });

      if (modified) {
        console.log("Fixed zinc colors:", filePath);
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  }
}

fixTextColors(path.join(__dirname, 'src', 'app'));
fixTextColors(path.join(__dirname, 'src', 'components'));
console.log('Text color fix done!');
