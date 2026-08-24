const fs = require('fs');

let types = fs.readFileSync('src/algorithms/types.ts', 'utf8');

const matrixType = `
export type MatrixCell = {
  row: number
  col: number
  value: string | number
}

export type MatrixPointer = {
  label: string
  row: number
  col: number
}

export type MatrixVisualizationData = {
  rows: number
  cols: number
  cells: MatrixCell[]
  pointers?: MatrixPointer[]
  highlights?: { row: number; col: number }[]
  visited?: { row: number; col: number }[]
}
`;

types = types.replace(
  /export type VisualizationElement =/,
  matrixType + '\nexport type VisualizationElement ='
);

types = types.replace(
  /  \| \{ type: 'graph'; data: GraphVisualizationData \}/,
  "  | { type: 'graph'; data: GraphVisualizationData }\n  | { type: 'matrix'; data: MatrixVisualizationData }"
);

fs.writeFileSync('src/algorithms/types.ts', types);
