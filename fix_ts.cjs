const fs = require('fs');

// audioEngine.ts
let ae = fs.readFileSync('src/audio/audioEngine.ts', 'utf8');
ae = ae.replace(/import \{ AudioEventType \}/, "import type { AudioEventType }");
ae = ae.replace(/import \{ VisualizationStep \}/, "import type { VisualizationStep }");
ae = ae.replace(/if \(!step\.action\) \{/, "if (!(step as any).action) {");
ae = ae.replace(/if \(step\.highlights && step\.highlights\.length > 0\)/, "if ((step as any).highlights && (step as any).highlights.length > 0)");
ae = ae.replace(/const action = step\.action\.toLowerCase\(\)/, "const action = (step as any).action.toLowerCase()");
fs.writeFileSync('src/audio/audioEngine.ts', ae);

// videoGenerator.ts
let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');
vg = vg.replace(
  /const buffer = muxer\.target\.buffer/g,
  "const buffer = (muxer.target as ArrayBufferTarget).buffer"
);
fs.writeFileSync('src/video/videoGenerator.ts', vg);
