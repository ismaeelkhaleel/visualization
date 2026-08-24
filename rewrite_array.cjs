const fs = require('fs');

let code = fs.readFileSync('src/components/Array/Array.tsx', 'utf8');

if (!code.includes("import { Platform3D }")) {
  code = code.replace(
    "import { Block3D } from '../Block3D'",
    "import { Block3D } from '../Block3D'\nimport { Platform3D } from '../Platform3D'"
  );
}

// Modify startX
code = code.replace(
  /const startX = -totalWidth \/ 2 \+ blockW \/ 2/,
  `const platformWidth = Math.max(200, totalWidth + 60);
  const startX = platformWidth / 2 - totalWidth / 2 + blockW / 2;`
);

// Modify the Array container to include the Platform3D
const replacement = `      <div ref={containerRef} style={{
        position: 'absolute',
        transformStyle: 'preserve-3d',
        width: '100%', height: '100%',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '20px',
      }}>
        <Platform3D width={platformWidth} depth={blockDepth * 3.5} thickness={12}>
          {action && (
            <div style={{
              position: 'absolute',
              transform: \`translate3d(\${platformWidth/2}px, \${-blockDepth * 1.5}px, 25px) translateX(-50%)\`,
              background: 'rgba(255,255,255,0.1)',
              padding: '4px 12px',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
              transformOrigin: 'center'
            }}>
              {action}
            </div>
          )}
          {values.map((item, index) => {
`;

code = code.replace(
  /      <div ref=\{containerRef\} style=\{\{[\s\S]*?\{values\.map\(\(item, index\) => \{/,
  replacement
);

code = code.replace(
  /            <div key=\{item\.id\} style=\{\{ \n\s*position: 'absolute', \n\s*bottom: 0,\n\s*transformStyle: 'preserve-3d', \n\s*transform: `translateX\(\$\{xPos\}px\)`\n\s*\}\}>/,
  `            <div key={item.id} style={{ 
              position: 'absolute', 
              transformStyle: 'preserve-3d', 
              transform: \`translate3d(\${xPos}px, 0px, 0px)\`,
              bottom: '0px',
            }}>`
);

// Fix Pointers position wrapper
code = code.replace(
  /          <div style=\{\{ position: 'absolute', bottom: 0, transformStyle: 'preserve-3d' \}\}>/,
  `          <div style={{ position: 'absolute', bottom: '0px', transformStyle: 'preserve-3d' }}>`
);

// Close Platform3D
const closeRegex = /        \}\)\}\n        \n        \{pointers && \([\s\S]*?        \)\}\n      <\/div>\n    <\/Scene3D>/;

let closeMatch = code.match(closeRegex);
if(closeMatch) {
    code = code.replace(closeRegex, closeMatch[0].replace('      </div>\n    </Scene3D>', '        </Platform3D>\n      </div>\n    </Scene3D>'));
} else {
    // If it doesn't match the whole pointers block, just replace the end
    code = code.replace(
      /      <\/div>\n    <\/Scene3D>/,
      `        </Platform3D>\n      </div>\n    </Scene3D>`
    );
}

fs.writeFileSync('src/components/Array/Array.tsx', code);
