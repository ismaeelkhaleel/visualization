const fs = require('fs');
const files = ['src/App.tsx', 'src/video/VideoRenderer.tsx'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Visualization Zone wrapper - wait, it already centers its children vertically if we use justifyContent: center on it? 
  // Actually, Visualization Viewport takes `flex: 1` (so it takes the full remaining height).
  // The status is at the bottom with a margin.
  // Code Zone wrapper:
  // We just need to center the CodePanel vertically!
  content = content.replace(
    /justifyContent: 'center',\n\s*alignItems: 'flex-start',\n\s*flexShrink: 0,\n\s*marginTop: \`\$\{layout\.gap2\}px\`,/g,
    `justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
                marginTop: \`\${layout.gap2}px\`,`
  );

  // Vis renderer wrapper:
  // Let's add justifyContent: 'center' just in case
  content = content.replace(
    /flexDirection: 'column', alignItems: 'center', overflow: 'hidden' \}\}>\n\s*<VisualizationRenderer/g,
    `flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <VisualizationRenderer`
  );

  fs.writeFileSync(file, content);
}
