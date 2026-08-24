const fs = require('fs');

let types = fs.readFileSync('src/algorithms/types.ts', 'utf8');

types = "import type { AudioEventType } from '../audio/audioTypes'\n\n" + types;

types = types.replace(
  /export type VisualizationStep = \{\n  elements: VisualizationElement\[\]\n  codeLine: number\n  message: string\n\}/,
  "export type VisualizationStep = {\n  elements: VisualizationElement[]\n  codeLine: number\n  message: string\n  audioEvent?: AudioEventType\n}"
);

fs.writeFileSync('src/algorithms/types.ts', types);
