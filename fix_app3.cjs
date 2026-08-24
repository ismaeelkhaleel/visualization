const fs = require('fs');

function doReplace(file, isApp) {
  let content = fs.readFileSync(file, 'utf8');

  // Strip layout from App.tsx
  if (isApp) {
    content = content.replace(/import \{ useAdaptiveLayout \} from '\.\/components\/VisualizationRenderer\/useAdaptiveLayout'\n?/g, '');
    content = content.replace(/const layout = useAdaptiveLayout\(currentSteps, currentProblem\.visualization\.code\)\n?/g, '');
  } else {
    content = content.replace(/layout: \{ visHeight: number; codeHeight: number; gap1: number; gap2: number \}/g, '');
    content = content.replace(/const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>\(\(\{ step, code, algorithm, layout \}, ref\) => \{/g, 
    'const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>(({ step, code, algorithm }, ref) => {');
  }

  const startStr = "{/* Top Half (Vis + Status) */}";
  const startIndex = content.indexOf(startStr);
  
  if (startIndex === -1) {
    console.log('Start not found in ' + file);
    return;
  }
  
  // In App.tsx:
  //            </div>
  //          </div>
  //        </div>
  
  const codePanelTag = isApp ? "/>\n            </div>" : "/>\n        </div>";
  let codeEndIndex = content.indexOf(codePanelTag, startIndex);
  
  if (codeEndIndex === -1) {
     console.log('CodePanel end not found in ' + file);
     return;
  }
  codeEndIndex += codePanelTag.length;

  const codeAttr = isApp ? "currentProblem.visualization.code" : "code";
  
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
              <CodePanel code={${codeAttr}} activeLine={step.codeLine} />
            </div>`;

  const newContent = content.substring(0, startIndex) + replacement + content.substring(codeEndIndex);
  fs.writeFileSync(file, newContent);
}

doReplace('src/video/VideoRenderer.tsx', false);
