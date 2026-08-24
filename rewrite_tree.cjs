const fs = require('fs');

let code = fs.readFileSync('src/components/Tree/Tree.tsx', 'utf8');

if (!code.includes("import { Platform3D }")) {
  code = code.replace(
    "import { Scene3D } from '../Scene3D'",
    "import { Scene3D } from '../Scene3D'\nimport { Platform3D } from '../Platform3D'"
  );
}

// Wrap inside Platform3D
const replacement = `      <div ref={containerRef} style={{
        position: 'absolute',
        transformStyle: 'preserve-3d',
        width: '100%', height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Platform3D width={Math.max(250, totalW + 80)} depth={Math.max(120, totalH + 80)} thickness={12}>
`;

code = code.replace(
  /      <div ref=\{containerRef\} style=\{\{[\s\S]*?justifyContent: 'center',\n\s*\}\}>/,
  replacement
);

code = code.replace(
  /      <\/div>\n    <\/Scene3D>/,
  `        </Platform3D>\n      </div>\n    </Scene3D>`
);

code = code.replace(
  /const offsetX = -totalW \/ 2 \+ R/,
  `const pWidth = Math.max(250, totalW + 80);
  const offsetX = pWidth / 2 - totalW / 2 + R;`
);
code = code.replace(
  /const offsetY = -totalH \/ 2 \+ R/,
  `const pDepth = Math.max(120, totalH + 80);
  const offsetY = pDepth / 2 - totalH / 2 + R;`
);

fs.writeFileSync('src/components/Tree/Tree.tsx', code);
