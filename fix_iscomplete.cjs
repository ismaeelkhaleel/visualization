const fs = require('fs');

// App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(
  /<VisualizationRenderer step=\{step\} visualizationKey=\{algorithm\} viewportWidth=\{312\} viewportHeight=\{261\} \/>/g,
  '<VisualizationRenderer step={step} visualizationKey={algorithm} viewportWidth={312} viewportHeight={261} isComplete={currentStep === currentSteps.length - 1} />'
);
fs.writeFileSync('src/App.tsx', app);

// VideoRenderer.tsx
let vr = fs.readFileSync('src/video/VideoRenderer.tsx', 'utf8');
vr = vr.replace(
  /type VideoRendererProps = \{[\s\S]*?algorithm: string\n\}/g,
  `type VideoRendererProps = {
  step: VisualizationStep
  code: string[]
  algorithm: string
  isComplete?: boolean
}`
);
vr = vr.replace(
  /const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>\(\(\{ step, code, algorithm \}, ref\) => \{/g,
  'const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>(({ step, code, algorithm, isComplete }, ref) => {'
);
vr = vr.replace(
  /<VisualizationRenderer step=\{step\} visualizationKey=\{algorithm\} viewportWidth=\{312\} viewportHeight=\{261\} \/>/g,
  '<VisualizationRenderer step={step} visualizationKey={algorithm} viewportWidth={312} viewportHeight={261} isComplete={isComplete} />'
);
fs.writeFileSync('src/video/VideoRenderer.tsx', vr);

// videoGenerator.ts
let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');
vg = vg.replace(
  /step=\{steps\[i\]\}\n\s*code=\{problem\.visualization\.code\}\n\s*algorithm=\{problem\.id\}\n\s*\/>/g,
  `step={steps[i]}
          code={problem.visualization.code}
          algorithm={problem.id}
          isComplete={i === steps.length - 1}
        />`
);
fs.writeFileSync('src/video/videoGenerator.ts', vg);
