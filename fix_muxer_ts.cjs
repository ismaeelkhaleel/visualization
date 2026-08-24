const fs = require('fs');
let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');

vg = vg.replace(
  /const muxer = new MuxerClass\(muxerOptions\)/,
  "const muxer = new (MuxerClass as any)(muxerOptions)"
);

fs.writeFileSync('src/video/videoGenerator.ts', vg);
