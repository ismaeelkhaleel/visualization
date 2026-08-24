const fs = require('fs');
let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');

vg = vg.replace(
  /      bitrate: 7_000_000,\n    \}\)/,
  "      bitrate: 7_000_000,\n      ...(isMp4 ? { avc: { format: 'avc' } } : {})\n    })"
);

fs.writeFileSync('src/video/videoGenerator.ts', vg);
