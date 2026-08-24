const fs = require('fs');
let vr = fs.readFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', 'utf8');
vr = vr.replace(/const _exhaustiveCheck: never = element as unknown as never/, "const _exhaustiveCheck: never = element as any");
vr = vr.replace(/const _exhaustiveCheck = element/, "const _exhaustiveCheck: never = element as any");
fs.writeFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', vr);

let m = fs.readFileSync('src/components/Matrix/Matrix.tsx', 'utf8');
m = m.replace(/const key = cellPointers\[0\] \? cellPointers\[0\]\.row \+ '-' \+ cellPointers\[0\]\.col : '';/, "");
fs.writeFileSync('src/components/Matrix/Matrix.tsx', m);
