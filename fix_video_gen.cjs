const fs = require('fs');
let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');

// import calculateAdaptiveLayout
vg = vg.replace(
  /import React from 'react'/g,
  `import React from 'react'\nimport { calculateAdaptiveLayout } from '../components/VisualizationRenderer/calculateLayout'`
);

// calculate layout
const genFuncStart = /export async function generateVideo\(\n\s*problem: ProblemDefinition,\n\s*inputValues: Record<string, any>,\n\s*onProgress: \(progress: number, status: string\) => void\n\) \{/;
vg = vg.replace(genFuncStart, `export async function generateVideo(
  problem: ProblemDefinition,
  inputValues: Record<string, any>,
  onProgress: (progress: number, status: string) => void
) {
  const steps = problem.getSteps(inputValues)
  const layout = calculateAdaptiveLayout(steps, problem.code)`);

// pass layout to VideoRenderer
vg = vg.replace(
  /<VideoRenderer\n\s*ref=\{containerRef\}\n\s*step=\{steps\[i\]\}\n\s*code=\{problem\.code\}\n\s*algorithm=\{problem\.id\}\n\s*\/>/g,
  `<VideoRenderer
          ref={containerRef}
          step={steps[i]}
          code={problem.code}
          algorithm={problem.id}
          layout={layout}
        />`
);

fs.writeFileSync('src/video/videoGenerator.ts', vg);
