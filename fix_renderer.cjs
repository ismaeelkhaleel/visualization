const fs = require('fs');

let content = fs.readFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', 'utf8');

// Add import
content = content.replace(
  /import \{ Graph \} from '\.\.\/Graph\/Graph'/,
  "import { Graph } from '../Graph/Graph'\nimport { Matrix } from '../Matrix/Matrix'"
);

// Add switch case
content = content.replace(
  /        default:\n          const _exhaustiveCheck: never = element/,
  `        case 'matrix':
          return <Matrix key={\`\${visualizationKey}-\${i}\`} data={element.data} isComplete={isComplete} viewportWidth={viewportWidth} viewportHeight={viewportHeight} />
        default:
          const _exhaustiveCheck: never = element`
);

fs.writeFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', content);
