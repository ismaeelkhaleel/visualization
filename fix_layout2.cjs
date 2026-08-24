const fs = require('fs');
const files = ['src/App.tsx', 'src/video/VideoRenderer.tsx'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Title margin
  content = content.replace(
    /marginBottom: '16px',\s*flexShrink: 0,/g,
    "marginBottom: '8px', flexShrink: 0,"
  );

  // Top Half height
  content = content.replace(
    /height: '240px',\s*width: '312px',\s*display: 'flex',\s*flexDirection: 'column',\s*justifyContent: 'space-between',\s*alignItems: 'center',\s*flexShrink: 0,/g,
    `height: '200px',
                width: '312px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,`
  );

  // Vis viewport
  content = content.replace(
    /viewportWidth=\{312\} viewportHeight=\{192\}/g,
    "viewportWidth={312} viewportHeight={160}"
  );

  // Status margin
  content = content.replace(
    /<div style=\{\{ height: '32px', marginTop: '16px', flexShrink: 0 \}\}>/g,
    "<div style={{ height: '32px', marginTop: '8px', flexShrink: 0 }}>"
  );

  // Bottom Half height & margin
  content = content.replace(
    /height: '260px',\s*width: '312px',\s*display: 'flex',\s*justifyContent: 'center',\s*alignItems: 'flex-start',\s*flexShrink: 0,\s*marginTop: '16px',/g,
    `height: '312px',
                width: '312px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexShrink: 0,
                marginTop: '12px',`
  );

  fs.writeFileSync(file, content);
}
