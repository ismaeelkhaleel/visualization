const fs = require('fs');

let vr = fs.readFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', 'utf8');

const svgFilters = `
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="shadow-element" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="3" dy="4" stdDeviation="2" floodColor="#000000" floodOpacity="0.85" />
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
          </filter>
          <filter id="shadow-active" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="4" dy="6" stdDeviation="2" floodColor="#000000" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#3b82f6" floodOpacity="0.4" />
          </filter>
          <filter id="shadow-success" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="3" dy="4" stdDeviation="2" floodColor="#10b981" floodOpacity="0.5" />
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#10b981" floodOpacity="0.4" />
          </filter>
        </defs>
      </svg>
`;

vr = vr.replace(
  /function VisualizationRenderer\(\{ step, visualizationKey, viewportWidth, viewportHeight, isComplete \}: VisualizationRendererProps\) \{\n  return \(\n    <>/g,
  `function VisualizationRenderer({ step, visualizationKey, viewportWidth, viewportHeight, isComplete }: VisualizationRendererProps) {\n  return (\n    <>\n${svgFilters}`
);
fs.writeFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', vr);

let tree = fs.readFileSync('src/components/Tree/Tree.tsx', 'utf8');
tree = tree.replace(
  /cy=\{node\.y - \(isComplete \|\| isHighlighted \? 1 : 0\)\}/g,
  "cy={node.y - (isHighlighted ? 2 : isComplete ? 1 : 0)}"
);
tree = tree.replace(
  /y=\{node\.y \+ 5 - \(isComplete \|\| isHighlighted \? 1 : 0\)\}/g,
  "y={node.y + 5 - (isHighlighted ? 2 : isComplete ? 1 : 0)}"
);
fs.writeFileSync('src/components/Tree/Tree.tsx', tree);

let graph = fs.readFileSync('src/components/Graph/Graph.tsx', 'utf8');
graph = graph.replace(
  /cy=\{pos\.y - \(isComplete \|\| isHighlighted \|\| isVisited \? 1 : 0\)\}/g,
  "cy={pos.y - (isHighlighted ? 2 : isComplete ? 1 : 0)}"
);
graph = graph.replace(
  /y=\{pos\.y \+ 5 - \(isComplete \|\| isHighlighted \|\| isVisited \? 1 : 0\)\}/g,
  "y={pos.y + 5 - (isHighlighted ? 2 : isComplete ? 1 : 0)}"
);
fs.writeFileSync('src/components/Graph/Graph.tsx', graph);

