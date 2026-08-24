const fs = require('fs');
let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');

vg = vg.replace(
  /React\.createElement\(VideoRenderer, \{/g,
  `React.createElement(VideoRenderer, {\n            layout,`
);

fs.writeFileSync('src/video/videoGenerator.ts', vg);
