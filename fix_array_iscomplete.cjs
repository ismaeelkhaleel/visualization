const fs = require('fs');
let arr = fs.readFileSync('src/components/Array/Array.tsx', 'utf8');

arr = arr.replace(
  /viewportHeight\?: number\n\}/,
  'viewportHeight?: number\n  isComplete?: boolean\n}'
);
arr = arr.replace(
  /function Array\(\{ values, pointers, highlights = \[\], action, swap, visualizationKey, viewportWidth = 312, \}: ArrayProps\) \{/,
  'function Array({ values, pointers, highlights = [], action, swap, visualizationKey, viewportWidth = 312, isComplete }: ArrayProps) {'
);
fs.writeFileSync('src/components/Array/Array.tsx', arr);
