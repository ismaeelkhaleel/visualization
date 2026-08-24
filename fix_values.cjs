const fs = require('fs');

let p = fs.readFileSync('src/data/problems.ts', 'utf8');
p = p.replace(/validate: \(values\) => null/g, "validate: () => null");
fs.writeFileSync('src/data/problems.ts', p);

