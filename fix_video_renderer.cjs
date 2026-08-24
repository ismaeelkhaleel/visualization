const fs = require('fs');
let video = fs.readFileSync('src/video/VideoRenderer.tsx', 'utf8');

// The title block to extract:
const titleRegex = /\s*\{\/\* Title \*\/\}\n\s*<div\n\s*style=\{\{\n\s*color: '#f5f5f5', fontSize: '20px', fontWeight: 700, letterSpacing: '1\.5px', textAlign: 'center', lineHeight: 1\.2, height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', flexShrink: 0,\n\s*\}\}\n\s*>\n\s*\{title\}\n\s*<\/div>/;

video = video.replace(titleRegex, '');

// Adjust top half and bottom half inside VideoRenderer.tsx
video = video.replace(
  /height: '200px',\s*width: '312px',\s*display: 'flex',\s*flexDirection: 'column',\s*justifyContent: 'space-between',\s*alignItems: 'center',\s*flexShrink: 0,/g,
  `height: '240px',
                width: '312px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,`
);

video = video.replace(
  /viewportWidth=\{312\} viewportHeight=\{160\}/g,
  "viewportWidth={312} viewportHeight={200}"
);

video = video.replace(
  /height: '312px',\s*width: '312px',\s*display: 'flex',\s*justifyContent: 'center',\s*alignItems: 'flex-start',\s*flexShrink: 0,\s*marginTop: '12px',/g,
  `height: '324px',
                width: '312px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexShrink: 0,
                marginTop: '16px',`
);

fs.writeFileSync('src/video/VideoRenderer.tsx', video);
