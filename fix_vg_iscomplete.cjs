const fs = require('fs');
let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');

vg = vg.replace(
  /algorithm: problem\.id/g,
  "algorithm: problem.id,\n            isComplete: i === steps.length - 1"
);

fs.writeFileSync('src/video/videoGenerator.ts', vg);
