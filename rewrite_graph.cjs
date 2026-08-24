const fs = require('fs');

let code = fs.readFileSync('src/components/Graph/Graph.tsx', 'utf8');

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
        <Platform3D width={260} depth={260} thickness={12}>
`;

code = code.replace(
  /      <div ref=\{containerRef\} style=\{\{[\s\S]*?justifyContent: 'center',\n\s*\}\}>/,
  replacement
);

code = code.replace(
  /      <\/div>\n    <\/Scene3D>/,
  `        </Platform3D>\n      </div>\n    </Scene3D>`
);

// We need to shift layoutMap pos.x and pos.y by 130
code = code.replace(
  /x: radius \* Math\.cos\(angle\),/,
  `x: radius * Math.cos(angle) + 130,`
);
code = code.replace(
  /y: radius \* Math\.sin\(angle\)/,
  `y: radius * Math.sin(angle) + 130`
);

fs.writeFileSync('src/components/Graph/Graph.tsx', code);
