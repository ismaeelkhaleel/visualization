const fs = require('fs');
let content = fs.readFileSync('src/components/Array/Array.tsx', 'utf8');

// We'll just use it in the style
content = content.replace(
  /        style=\{\{\n            position: 'relative',\n            display: 'flex',\n            flexDirection: 'column',\n            gap: \`\$\{gap\}px\`,\n            alignItems: 'center',\n            justifyContent: 'center',\n        \}\}/g,
  `        style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: \`\${gap}px\`,
            alignItems: 'center',
            justifyContent: 'center',
            width: \`\${viewportWidth}px\`,
            height: viewportHeight ? \`\${viewportHeight}px\` : 'auto',
            overflow: 'hidden'
        }}`
);
fs.writeFileSync('src/components/Array/Array.tsx', content);
