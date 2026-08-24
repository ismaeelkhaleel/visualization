const fs = require('fs');

// Tree.tsx
let tree = fs.readFileSync('src/components/Tree/Tree.tsx', 'utf8');
tree = tree.replace(
  /filter: isComplete[\s\S]*?`drop-shadow\(\$\{theme\.shadows\.element.*?`,\n/g,
  "filter: isComplete ? theme.shadows.svg.success : isHighlighted ? theme.shadows.svg.active : theme.shadows.svg.element,\n"
);
fs.writeFileSync('src/components/Tree/Tree.tsx', tree);

// Graph.tsx
let graph = fs.readFileSync('src/components/Graph/Graph.tsx', 'utf8');
graph = graph.replace(
  /filter: isComplete[\s\S]*?`drop-shadow\(\$\{theme\.shadows\.element.*?`,\n/g,
  "filter: isComplete ? theme.shadows.svg.success : isHighlighted || isVisited ? theme.shadows.svg.active : theme.shadows.svg.element,\n"
);
graph = graph.replace(
  /y=\{pos\.y\}/g,
  "y={pos.y - (isComplete || isHighlighted || isVisited ? 1 : 0)}"
);
fs.writeFileSync('src/components/Graph/Graph.tsx', graph);
