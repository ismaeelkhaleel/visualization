const fs = require('fs');
const files = ['src/App.tsx', 'src/video/VideoRenderer.tsx'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  if (file === 'src/App.tsx') {
    // Remove useAdaptiveLayout import and usage
    content = content.replace(/import \{ useAdaptiveLayout \} from '\.\/components\/VisualizationRenderer\/useAdaptiveLayout'\n?/g, '');
    content = content.replace(/const layout = useAdaptiveLayout\(currentSteps, currentProblem\.visualization\.code\)\n?/g, '');
  }

  if (file === 'src/video/VideoRenderer.tsx') {
    // Remove layout prop from VideoRendererProps
    content = content.replace(/layout: \{ visHeight: number; codeHeight: number; gap1: number; gap2: number \}/g, '');
    content = content.replace(/const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>\(\(\{ step, code, algorithm, layout \}, ref\) => \{/g, 
    'const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>(({ step, code, algorithm }, ref) => {');
  }

  // The wrapper div for the two halves in App and VideoRenderer looks roughly like this:
  // <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  // Let's replace the whole inner structure.
  
  const structureRegex = /\s*\{\/\* Top Half \(Vis \+ Status\) \*\/\}[\s\S]*?\{\/\* Bottom Half \(CodePanel\) \*\/\}[\s\S]*?<\/CodePanel>\n\s*<\/div>/;
  
  const replacement = `
            {/* 1. VISUALIZATION ZONE - 45% */}
            <div
              style={{
                height: '45%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <VisualizationRenderer step={step} visualizationKey={algorithm} viewportWidth={312} viewportHeight={261} />
            </div>

            {/* 2. STATUS ZONE - 10% */}
            <div
              style={{
                height: '10%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <StatusMessage message={step.message} />
            </div>

            {/* 3. CODEPANEL ZONE - 45% */}
            <div
              style={{
                height: '45%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <CodePanel code={code} activeLine={step.codeLine} />
            </div>`;
            
  // Wait, in App.tsx `code` is not defined directly! It is `visualization.code` (or `currentProblem.visualization.code`).
  // Let's handle this per file.
  
  if (file === 'src/App.tsx') {
    content = content.replace(structureRegex, replacement.replace(/code=\{code\}/, 'code={currentProblem.visualization.code}'));
  } else {
    content = content.replace(structureRegex, replacement);
  }

  fs.writeFileSync(file, content);
}

// Clean up videoGenerator.ts to not compute or pass layout
let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');
vg = vg.replace(/import \{ calculateAdaptiveLayout \} from '\.\.\/components\/VisualizationRenderer\/calculateLayout'\n?/g, '');
vg = vg.replace(/const layout = calculateAdaptiveLayout\(steps, problem\.visualization\.code\)\n?/g, '');
vg = vg.replace(/layout,\n/g, '');
fs.writeFileSync('src/video/videoGenerator.ts', vg);

