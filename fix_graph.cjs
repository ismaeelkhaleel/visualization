const fs = require('fs');
let graph = fs.readFileSync('src/components/Graph/Graph.tsx', 'utf8');

graph = graph.replace(
  /            if \(isHighlighted\) \{\n              fill = theme\.colors\.compare\.bg\n              stroke = theme\.colors\.compare\.border\n            \} else if \(isVisited\) \{\n              fill = theme\.colors\.active\.bg\n              stroke = theme\.colors\.active\.border\n            \}/g,
  `            if (isComplete) {
              fill = theme.colors.success.bg
              stroke = theme.colors.success.border
            } else if (isHighlighted) {
              fill = theme.colors.compare.bg
              stroke = theme.colors.compare.border
            } else if (isVisited) {
              fill = theme.colors.active.bg
              stroke = theme.colors.active.border
            }`
);

fs.writeFileSync('src/components/Graph/Graph.tsx', graph);
