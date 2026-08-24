const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

// We want to remove the external title and the "360x640 Preview" label.
app = app.replace(
  /\{\/\* Title moved outside \*\/\}[\s\S]*?360 × 640 Preview\n\s*<\/div>/,
  ""
);

// Add the title, explanation and badges inside the 360x640 preview box
const replacement = `
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            {/* Title, Explanation, Complexity Overlay */}
            <div style={{
               position: 'absolute',
               top: '0px',
               left: '0px',
               width: '100%',
               zIndex: 10,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               pointerEvents: 'none'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '1px' }}>{visualization.title}</div>
              {visualization.explanation && <div style={{ fontSize: '11px', color: '#aaa', marginTop: '4px', textAlign: 'center', padding: '0 10px', lineHeight: '1.4' }}>{visualization.explanation}</div>}
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                {visualization.timeComplexity && <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', color: '#ddd', fontWeight: 600 }}>TIME {visualization.timeComplexity}</span>}
                {visualization.spaceComplexity && <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', color: '#ddd', fontWeight: 600 }}>SPACE {visualization.spaceComplexity}</span>}
              </div>
            </div>
`;

app = app.replace(
  /<\div\n\s*style=\{\{\n\s*width: '100%',\n\s*height: '100%',\n\s*display: 'flex',\n\s*flexDirection: 'column',\n\s*alignItems: 'center',\n\s*\}\}\n\s*>/,
  replacement
);

fs.writeFileSync('src/App.tsx', app);
