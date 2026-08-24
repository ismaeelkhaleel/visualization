const fs = require('fs');

// Update theme.ts
let themeContent = fs.readFileSync('src/theme.ts', 'utf8');
themeContent = themeContent.replace(
  /background: '#111111',/,
  "background: '#111111',\n    videoBackground: '#050505',"
);
fs.writeFileSync('src/theme.ts', themeContent);

// Update App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  /width: '360px',\n\s*height: '640px',\n\s*flexShrink: 0,\n\s*position: 'relative',\n\s*background: theme.colors.background,/g,
  `width: '360px',
            height: '640px',
            flexShrink: 0,
            position: 'relative',
            background: theme.colors.videoBackground,`
);
fs.writeFileSync('src/App.tsx', appContent);

// Update VideoRenderer.tsx
let videoContent = fs.readFileSync('src/video/VideoRenderer.tsx', 'utf8');
videoContent = videoContent.replace(
  /width: '360px',\n\s*height: '640px',\n\s*position: 'relative',\n\s*background: theme\.colors\.background,/g,
  `width: '360px',
        height: '640px',
        position: 'relative',
        background: theme.colors.videoBackground,`
);
fs.writeFileSync('src/video/VideoRenderer.tsx', videoContent);

