const fs = require('fs');
let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');

const targetStr = `export async function generateVideo(
  problem: ProblemDefinition,
  steps: VisualizationStep[],
  updateProgress: (msg: string) => void
): Promise<Blob> {`;

vg = vg.replace(targetStr, `${targetStr}\n  const layout = calculateAdaptiveLayout(steps, problem.code)`);

fs.writeFileSync('src/video/videoGenerator.ts', vg);
