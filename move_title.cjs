const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// The title block to extract:
const titleRegex = /\s*\{\/\* Title \*\/\}\n\s*<div\n\s*ref=\{titleRef\}\n\s*style=\{\{\n\s*color: '#f5f5f5', fontSize: '20px', fontWeight: 700, letterSpacing: '1\.5px', textAlign: 'center', lineHeight: 1\.2, height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', flexShrink: 0,\n\s*\}\}\n\s*>\n\s*\{visualization\.title\}\n\s*<\/div>/;

const match = app.match(titleRegex);
if (match) {
    app = app.replace(match[0], ''); // Remove from inner card
    
    // Insert before the preview label:
    const insertPoint = /<div\n\s*style=\{\{\n\s*color: '#666',\n\s*fontSize: '10px',\n\s*letterSpacing: '0\.8px',/g;
    
    const replacement = `{/* Title moved outside */}
        <div
          ref={titleRef}
          style={{
            color: '#f5f5f5',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          {visualization.title}
        </div>\n\n        <div
          style={{
            color: '#666',
            fontSize: '10px',
            letterSpacing: '0.8px',`;
            
    app = app.replace(insertPoint, replacement);
}

// Adjust top half and bottom half inside App.tsx
app = app.replace(
  /height: '200px',\s*width: '312px',\s*display: 'flex',\s*flexDirection: 'column',\s*justifyContent: 'space-between',\s*alignItems: 'center',\s*flexShrink: 0,/g,
  `height: '240px',
                width: '312px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,`
);

app = app.replace(
  /viewportWidth=\{312\} viewportHeight=\{160\}/g,
  "viewportWidth={312} viewportHeight={200}"
);

app = app.replace(
  /height: '312px',\s*width: '312px',\s*display: 'flex',\s*justifyContent: 'center',\s*alignItems: 'flex-start',\s*flexShrink: 0,\s*marginTop: '12px',/g,
  `height: '324px',
                width: '312px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexShrink: 0,
                marginTop: '16px',`
);

fs.writeFileSync('src/App.tsx', app);
