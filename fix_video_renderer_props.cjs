const fs = require('fs');
let video = fs.readFileSync('src/video/VideoRenderer.tsx', 'utf8');

video = video.replace(
  /type VideoRendererProps = \{/g,
  `type VideoRendererProps = {\n  layout: { visHeight: number; codeHeight: number; gap1: number; gap2: number }`
);

video = video.replace(
  /const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>\(\(\{ step, code, algorithm \}, ref\) => \{/g,
  `const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>(({ step, code, algorithm, layout }, ref) => {`
);

// Top Half
video = video.replace(
  /height: '240px',\n\s*width: '312px',\n\s*display: 'flex',\n\s*flexDirection: 'column',\n\s*justifyContent: 'space-between',\n\s*alignItems: 'center',\n\s*flexShrink: 0,/g,
  `height: \`\${layout.visHeight + 32 + layout.gap1}px\`,
                width: '312px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexShrink: 0,`
);

// Vis Renderer
video = video.replace(
  /viewportWidth=\{312\} viewportHeight=\{200\}/g,
  "viewportWidth={312} viewportHeight={layout.visHeight}"
);

// Status
video = video.replace(
  /<div style=\{\{ height: '32px', marginTop: '8px', flexShrink: 0 \}\}>/g,
  `<div style={{ height: '32px', marginTop: \`\${layout.gap1}px\`, flexShrink: 0 }}>`
);

// Bottom Half
video = video.replace(
  /height: '324px',\n\s*width: '312px',\n\s*display: 'flex',\n\s*justifyContent: 'center',\n\s*alignItems: 'flex-start',\n\s*flexShrink: 0,\n\s*marginTop: '16px',/g,
  `height: \`\${layout.codeHeight}px\`,
                width: '312px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexShrink: 0,
                marginTop: \`\${layout.gap2}px\`,`
);

fs.writeFileSync('src/video/VideoRenderer.tsx', video);
