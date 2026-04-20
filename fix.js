const fs = require('fs');
function fixFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      fixFiles(dir + '/' + file.name);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      const path = dir + '/' + file.name;
      let content = fs.readFileSync(path, 'utf8');

      let modified = false;
      content = content.replace(/className\s*=\s*(?:\{?\s*)([\`\"'])([\s\S]*?)\1/g, (match, quote, classes) => {
        if (classes.includes('bg-foreground') && classes.includes('text-white')) {
          let newClasses = classes.replace(/\btext-white\b/g, 'text-background');
          modified = true;
          return match.replace(classes, newClasses);
        }
        return match;
      });

      if (modified) {
        console.log("Fixed:", path);
        fs.writeFileSync(path, content, 'utf8');
      }
    }
  }
}
fixFiles('./src/app');
fixFiles('./src/components');
console.log('Done!');