const fs = require('fs');

let code = fs.readFileSync('src/components/Stack/Stack.tsx', 'utf8');

if (!code.includes("import { Platform3D }")) {
  code = code.replace(
    "import { Block3D } from '../Block3D'",
    "import { Block3D } from '../Block3D'\nimport { Platform3D } from '../Platform3D'"
  );
}

// Modify Stack container to include Platform3D
const replacement = `      <div ref={containerRef} style={{
        position: 'absolute',
        transformStyle: 'preserve-3d',
        width: '100%', height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50px'
      }}>
        <Platform3D width={120} depth={80} thickness={12}>
          {action && (
            <div style={{
              position: 'absolute',
              transform: \`translate3d(60px, -60px, 25px) translateX(-50%)\`,
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
`;

code = code.replace(
  /      <div ref=\{containerRef\} style=\{\{[\s\S]*?\{/\* Token indicator hovering above \*\//,
  replacement + "\n          {/* Token indicator hovering above */"
);

// We need to add `}` for the Platform3D at the end of the return
code = code.replace(
  /      <\/div>\n    <\/Scene3D>/,
  `        </Platform3D>\n      </div>\n    </Scene3D>`
);

// We need to adjust stack blocks X position inside Platform3D since the center is 60px.
// Wait, the blocks are positioned with width: 50. so x: 60 - 25 = 35px.
// Stack blocks stack upward from the bottom.
code = code.replace(
  /              position: 'absolute',\n              bottom: 0,\n              transformStyle: 'preserve-3d',\n              transform: \`translateY\(\-\\\$\{yPos\}px\)\`/,
  `              position: 'absolute',
              bottom: '0px',
              transformStyle: 'preserve-3d',
              transform: \`translate3d(35px, 0px, \${yPos}px) rotateX(-90deg)\``
);
// Wait, in Stack.tsx, they were stacking via `translateY(-yPos)` on screen. But now they are inside Platform3D which rotates its children? NO, Platform3D does NOT rotate its children wrapper. The children wrapper is just `preserve-3d`. 
// So `translate3d(35px, -yPos, 0px)` should be used!
code = code.replace(
  /transform: \`translate3d\(35px, 0px, \\\$\{yPos\}px\) rotateX\(-90deg\)\`/,
  `transform: \`translate3d(35px, -\${yPos}px, 0px)\``
);

// TOP Pointer adjustment
code = code.replace(
  /x: blockW \/ 2,/,
  `x: 35 + blockW / 2,`
);
code = code.replace(
  /          <div style=\{\{ position: 'absolute', bottom: 0, transformStyle: 'preserve-3d' \}\}>/,
  `          <div style={{ position: 'absolute', bottom: '0px', transformStyle: 'preserve-3d' }}>`
);


// For currentToken hovering:
code = code.replace(
  /transform: \`translateY\(\-\\\$\{stackHeight \+ 50\}px\)\`,/,
  `transform: \`translate3d(60px, -\${stackHeight + 50}px, 0px) translateX(-50%)\`,`
);


fs.writeFileSync('src/components/Stack/Stack.tsx', code);
