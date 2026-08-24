const fs = require('fs');

// 1. VisualizationRenderer.tsx
let vr = fs.readFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', 'utf8');
vr = vr.replace(
  /viewportHeight\?: number\n\}/,
  'viewportHeight?: number\n  isComplete?: boolean\n}'
);
vr = vr.replace(
  /function renderElement\(element: VisualizationElement, key: string, width\?: number, height\?: number\) \{/g,
  'function renderElement(element: VisualizationElement, key: string, width?: number, height?: number, isComplete?: boolean) {'
);
vr = vr.replace(
  /viewportHeight=\{height\} \/>/g,
  'viewportHeight={height} isComplete={isComplete} />'
);
vr = vr.replace(
  /function VisualizationRenderer\(\{ step, visualizationKey, viewportWidth, viewportHeight \}: VisualizationRendererProps\) \{/,
  'function VisualizationRenderer({ step, visualizationKey, viewportWidth, viewportHeight, isComplete }: VisualizationRendererProps) {'
);
vr = vr.replace(
  /renderElement\(element, \`\$\{visualizationKey\}-element-\$\{index\}\`, viewportWidth, viewportHeight\)/g,
  'renderElement(element, `${visualizationKey}-element-${index}`, viewportWidth, viewportHeight, isComplete)'
);
fs.writeFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', vr);

// 2. Array.tsx
let arr = fs.readFileSync('src/components/Array/Array.tsx', 'utf8');
arr = arr.replace(/viewportWidth\?: number\n\}/, 'viewportWidth?: number\n  isComplete?: boolean\n}');
arr = arr.replace(/function Array\(\{ values, pointers, highlights = \[\], action, swap, visualizationKey, viewportWidth = 312 \}: ArrayProps\) \{/, 'function Array({ values, pointers, highlights = [], action, swap, visualizationKey, viewportWidth = 312, isComplete }: ArrayProps) {');
arr = arr.replace(/const bg = isHighlighted \? theme\.colors\.active\.bg : theme\.colors\.neutral\.bg/, 'const bg = isComplete ? theme.colors.success.bg : isHighlighted ? theme.colors.active.bg : theme.colors.neutral.bg');
arr = arr.replace(/const border = isHighlighted \? `1px solid \$\{theme\.colors\.active\.border\}` : `1px solid \$\{theme\.colors\.neutral\.border\}`/, 'const border = isComplete ? `1px solid ${theme.colors.success.border}` : isHighlighted ? `1px solid ${theme.colors.active.border}` : `1px solid ${theme.colors.neutral.border}`');
fs.writeFileSync('src/components/Array/Array.tsx', arr);

// 3. Stack.tsx
let stack = fs.readFileSync('src/components/Stack/Stack.tsx', 'utf8');
stack = stack.replace(/viewportHeight\?: number\n\}/, 'viewportHeight?: number\n  isComplete?: boolean\n}');
stack = stack.replace(/viewportHeight = 192,\n\}: StackProps\) \{/, 'viewportHeight = 192,\n  isComplete,\n}: StackProps) {');
stack = stack.replace(/const bg = isHighlighted \? theme\.colors\.active\.bg : theme\.colors\.neutral\.bg/, 'const bg = isComplete ? theme.colors.success.bg : isHighlighted ? theme.colors.active.bg : theme.colors.neutral.bg');
stack = stack.replace(/const border = isHighlighted \? `1px solid \$\{theme\.colors\.active\.border\}` : `1px solid \$\{theme\.colors\.neutral\.border\}`/, 'const border = isComplete ? `1px solid ${theme.colors.success.border}` : isHighlighted ? `1px solid ${theme.colors.active.border}` : `1px solid ${theme.colors.neutral.border}`');
fs.writeFileSync('src/components/Stack/Stack.tsx', stack);

// 4. LinkedList.tsx
let ll = fs.readFileSync('src/components/LinkedList/LinkedList.tsx', 'utf8');
ll = ll.replace(/viewportHeight\?: number\n\}/, 'viewportHeight?: number\n  isComplete?: boolean\n}');
ll = ll.replace(/viewportHeight = 192 \}: LinkedListProps\) \{/, 'viewportHeight = 192, isComplete }: LinkedListProps) {');
ll = ll.replace(/const bg = isHighlighted \? theme\.colors\.active\.bg : theme\.colors\.neutral\.bg/, 'const bg = isComplete ? theme.colors.success.bg : isHighlighted ? theme.colors.active.bg : theme.colors.neutral.bg');
ll = ll.replace(/const border = isHighlighted \? `1px solid \$\{theme\.colors\.active\.border\}` : `1px solid \$\{theme\.colors\.neutral\.border\}`/, 'const border = isComplete ? `1px solid ${theme.colors.success.border}` : isHighlighted ? `1px solid ${theme.colors.active.border}` : `1px solid ${theme.colors.neutral.border}`');
fs.writeFileSync('src/components/LinkedList/LinkedList.tsx', ll);

// 5. Tree.tsx
let tree = fs.readFileSync('src/components/Tree/Tree.tsx', 'utf8');
tree = tree.replace(/viewportHeight\?: number\n\}/, 'viewportHeight?: number\n  isComplete?: boolean\n}');
tree = tree.replace(/viewportHeight = 192 \}: TreeProps\) \{/, 'viewportHeight = 192, isComplete }: TreeProps) {');
tree = tree.replace(/const isHighlighted = highlights\.includes\(node\.id\)/, 'const isHighlighted = highlights.includes(node.id)\n      const bg = isComplete ? theme.colors.success.bg : isHighlighted ? theme.colors.active.bg : theme.colors.neutral.bg\n      const border = isComplete ? theme.colors.success.border : isHighlighted ? theme.colors.active.border : theme.colors.neutral.border');
tree = tree.replace(/fill=\{isHighlighted \? theme\.colors\.active\.bg : theme\.colors\.neutral\.bg\}/, 'fill={bg}');
tree = tree.replace(/stroke=\{isHighlighted \? theme\.colors\.active\.border : theme\.colors\.neutral\.border\}/, 'stroke={border}');
fs.writeFileSync('src/components/Tree/Tree.tsx', tree);

// 6. Graph.tsx
let graph = fs.readFileSync('src/components/Graph/Graph.tsx', 'utf8');
graph = graph.replace(/viewportHeight\?: number\n\}/, 'viewportHeight?: number\n  isComplete?: boolean\n}');
graph = graph.replace(/viewportHeight = 192 \}: GraphProps\) \{/, 'viewportHeight = 192, isComplete }: GraphProps) {');
graph = graph.replace(
  /const bg = state === 'active' \? theme\.colors\.active\.bg : state === 'visited' \? theme\.colors\.success\.bg : theme\.colors\.neutral\.bg/,
  "const bg = isComplete ? theme.colors.success.bg : state === 'active' ? theme.colors.active.bg : state === 'visited' ? theme.colors.success.bg : theme.colors.neutral.bg"
);
graph = graph.replace(
  /const border = state === 'active' \? theme\.colors\.active\.border : state === 'visited' \? theme\.colors\.success\.border : theme\.colors\.neutral\.border/,
  "const border = isComplete ? theme.colors.success.border : state === 'active' ? theme.colors.active.border : state === 'visited' ? theme.colors.success.border : theme.colors.neutral.border"
);
fs.writeFileSync('src/components/Graph/Graph.tsx', graph);

