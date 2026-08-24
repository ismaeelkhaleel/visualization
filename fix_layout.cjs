const fs = require('fs');
const files = ['src/App.tsx', 'src/video/VideoRenderer.tsx'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace Title style
  content = content.replace(
    /color: '#f5f5f5',\s*fontSize: '20px',\s*fontWeight: 700,\s*letterSpacing: '1.5px',\s*textAlign: 'center',\s*lineHeight: 1.2,\s*marginBottom: '16px',\s*flexShrink: 0,/g,
    "color: '#f5f5f5', fontSize: '20px', fontWeight: 700, letterSpacing: '1.5px', textAlign: 'center', lineHeight: 1.2, height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', flexShrink: 0,"
  );

  // Replace Vis + Status Top Half style
  content = content.replace(
    /{\/\* Top Half \(Vis \+ Status\) \*\/}\s*<div\s*style={{\s*flex: 1,\s*width: '100%',\s*display: 'flex',\s*flexDirection: 'column',\s*justifyContent: 'center',\s*alignItems: 'center',\s*minHeight: 0,\s*}}\s*>/g,
    `{/* Top Half (Vis + Status) */}
            <div
              style={{
                height: '240px',
                width: '312px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >`
  );

  // Replace internal Vis div
  content = content.replace(
    /<div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>\s*<VisualizationRenderer step={step} visualizationKey={algorithm} \/>\s*<\/div>/g,
    `<div style={{ position: 'relative', flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
                <VisualizationRenderer step={step} visualizationKey={algorithm} viewportWidth={312} viewportHeight={192} />
              </div>`
  );

  // Replace internal Status div
  content = content.replace(
    /<div style={{ marginTop: '16px', flexShrink: 0 }}>\s*<StatusMessage message={step\.message} \/>\s*<\/div>/g,
    `<div style={{ height: '32px', marginTop: '16px', flexShrink: 0 }}>
                <StatusMessage message={step.message} />
              </div>`
  );

  // Replace CodePanel Bottom Half style
  content = content.replace(
    /{\/\* Bottom Half \(CodePanel\) \*\/}\s*<div\s*style={{\s*flex: 1,\s*width: '100%',\s*display: 'flex',\s*justifyContent: 'center',\s*alignItems: 'flex-start',\s*minHeight: 0,\s*marginTop: '16px',\s*}}\s*>/g,
    `{/* Bottom Half (CodePanel) */}
            <div
              style={{
                height: '260px',
                width: '312px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexShrink: 0,
                marginTop: '16px',
              }}
            >`
  );

  fs.writeFileSync(file, content);
}
