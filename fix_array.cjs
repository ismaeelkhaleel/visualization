const fs = require('fs');
let content = fs.readFileSync('src/components/Array/Array.tsx', 'utf8');

content = content.replace(
  /type ArrayProps = ArrayVisualizationData & \{\n    visualizationKey\?: string\n\}/g,
  `type ArrayProps = ArrayVisualizationData & {
  visualizationKey?: string
  viewportWidth?: number
  viewportHeight?: number
}`
);

content = content.replace(
  /function Array\(\{ values,\n    pointers,\n    highlights = \[\],\n    action,\n    swap, visualizationKey \}: ArrayProps\) \{/g,
  `function Array({ values, pointers, highlights = [], action, swap, visualizationKey, viewportWidth = 312, viewportHeight = 192 }: ArrayProps) {`
);

content = content.replace(
  /const containerWidth = 312 \/\/ 360 - 48/g,
  `const containerWidth = viewportWidth`
);

fs.writeFileSync('src/components/Array/Array.tsx', content);
