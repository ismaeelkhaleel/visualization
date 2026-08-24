const fs = require('fs');
let vr = fs.readFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', 'utf8');

vr = vr.replace(
  /import GraphComponent from '\.\.\/Graph\/Graph'/,
  "import GraphComponent from '../Graph/Graph'\nimport { Matrix } from '../Matrix/Matrix'"
);

vr = vr.replace(
  /    case 'graph':\n      return <GraphComponent \{\.\.\.element\.data\} visualizationKey=\{key\} viewportWidth=\{width\} viewportHeight=\{height\} isComplete=\{isComplete\} \/>/,
  "    case 'graph':\n      return <GraphComponent {...element.data} visualizationKey={key} viewportWidth={width} viewportHeight={height} isComplete={isComplete} />\n    case 'matrix':\n      return <Matrix data={element.data} isComplete={isComplete} viewportWidth={width} viewportHeight={height} />"
);

fs.writeFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', vr);
