const fs = require('fs');

let code = fs.readFileSync('src/components/Matrix/Matrix.tsx', 'utf8');

if (!code.includes("import { Platform3D }")) {
  code = code.replace(
    "import { Block3D } from '../Block3D'",
    "import { Block3D } from '../Block3D'\nimport { Platform3D } from '../Platform3D'"
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
        <Platform3D width={Math.max(200, totalGridWidth + 40)} depth={Math.max(200, totalGridHeight + 40)} thickness={12}>
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
  /const offsetX = -totalGridWidth \/ 2 \+ cellSize \/ 2/,
  `const pWidth = Math.max(200, totalGridWidth + 40);
  const offsetX = pWidth / 2 - totalGridWidth / 2 + cellSize / 2;`
);
code = code.replace(
  /const offsetY = -totalGridHeight \/ 2 \+ cellSize \/ 2/,
  `const pDepth = Math.max(200, totalGridHeight + 40);
  const offsetY = pDepth / 2 - totalGridHeight / 2 + cellSize / 2;`
);

fs.writeFileSync('src/components/Matrix/Matrix.tsx', code);
