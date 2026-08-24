const fs = require('fs');

let code = fs.readFileSync('src/components/Array/Array.tsx', 'utf8');

// Fix startX
code = code.replace(
  /const startX = -totalWidth \/ 2 \+ blockW \/ 2/,
  `const platformWidth = Math.max(200, totalWidth + 60);
  const startX = platformWidth / 2 - totalWidth / 2 + blockW / 2;`
);

// We need to pass platformWidth to Platform3D
code = code.replace(
  /<Platform3D width=\{Math\.max\(200, totalWidth \+ 60\)\} depth=\{blockDepth \* 3\.5\} thickness=\{12\}>/,
  `<Platform3D width={platformWidth} depth={blockDepth * 3.5} thickness={12}>`
);

// Center the action label correctly
code = code.replace(
  /transform: \`translate3d\(\\\$\{totalWidth\/2\}px, \\\$\{-blockDepth \* 2\.5\}px, 25px\)\`/,
  `transform: \`translate3d(\${platformWidth/2}px, \${-blockDepth * 1.5}px, 25px) translateX(-50%)\``
);

fs.writeFileSync('src/components/Array/Array.tsx', code);
