const fs = require('fs');

// Array.tsx
let arr = fs.readFileSync('src/components/Array/Array.tsx', 'utf8');
arr = arr.replace(
  /                            boxShadow:\n                                '0 8px 20px rgba\(0, 0, 0, 0\.25\), inset 0 1px 0 rgba\(255, 255, 255, 0\.04\)',\n/g,
  ''
);
fs.writeFileSync('src/components/Array/Array.tsx', arr);

// Stack.tsx
let stack = fs.readFileSync('src/components/Stack/Stack.tsx', 'utf8');
stack = stack.replace(
  /                    boxShadow: isTop \? '0 -4px 10px rgba\(0, 0, 0, 0\.1\)' : 'none',\n/g,
  ''
);
stack = stack.replace(
  /                    transition: `background \$\{theme\.animation\.durationShort\}s \$\{theme\.animation\.ease\}, border \$\{theme\.animation\.durationShort\}s \$\{theme\.animation\.ease\}\`,\n/g,
  ''
);
fs.writeFileSync('src/components/Stack/Stack.tsx', stack);
