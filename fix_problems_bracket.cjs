const fs = require('fs');
let content = fs.readFileSync('src/data/problems.ts', 'utf8');
content = content.replace(/\];\n\n\]/g, ']');
fs.writeFileSync('src/data/problems.ts', content);
