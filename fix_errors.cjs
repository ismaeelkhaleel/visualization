const fs = require('fs');

// Matrix.tsx
let matrix = fs.readFileSync('src/components/Matrix/Matrix.tsx', 'utf8');
matrix = matrix.replace(/import \{ MatrixVisualizationData \} from '\.\.\/\.\.\/algorithms\/types'/, "import type { MatrixVisualizationData } from '../../algorithms/types'");
matrix = matrix.replace(/const startX = .*/, "");
matrix = matrix.replace(/const startY = .*/, "");
matrix = matrix.replace(/<g transform=\{`translate\(\$\{startX\}, \$\{startY\}\)`\}>/, "<g transform={`translate(${ (viewportWidth - totalGridWidth) / 2 }, ${ (viewportHeight - totalGridHeight) / 2 })`}>");
matrix = matrix.replace(/const cx = c \* cellSize\n\s*const cy = r \* cellSize/, "");
matrix = matrix.replace(/const yOffset = isElevated \? -2 : 0/, "");
matrix = matrix.replace(/<g key=\{`cell-\$\{r\}-\$\{c\}`\} transform=\{`translate\(\$\{cx\}, \$\{cy \+ yOffset\}\)`\}>/, "<g key={`cell-${r}-${c}`} transform={`translate(${c * cellSize}, ${r * cellSize + (isElevated ? -2 : 0)})`}>");
matrix = matrix.replace(/const px = c \* cellSize \+ cellSize \/ 2\n\s*const py = r \* cellSize \+ cellSize \+ 5/, "");
matrix = matrix.replace(/<g key=\{`pointers-\$\{key\}`\} transform=\{`translate\(\$\{px\}, \$\{py\}\)`\}>/, "<g key={`pointers-${key}`} transform={`translate(${c * cellSize + cellSize / 2}, ${r * cellSize + cellSize + 5})`}>");
matrix = matrix.replace(/<g key=\{pointer\.label\} transform=\{`translate\(0, \$\{idx \* 12\}\)`\}>/, "<g key={pointer.label} transform={`translate(0, ${idx * 12})`}>");
matrix = matrix.replace(/theme\.colors\.active\.text/g, 'theme.colors.textPrimary');
matrix = matrix.replace(/theme\.colors\.success\.text/g, 'theme.colors.textPrimary');
matrix = matrix.replace(/theme\.colors\.compare\.text/g, 'theme.colors.textPrimary');
fs.writeFileSync('src/components/Matrix/Matrix.tsx', matrix);

// VisualizationRenderer.tsx
let vr = fs.readFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', 'utf8');
vr = vr.replace(/const _exhaustiveCheck: never = element/, "const _exhaustiveCheck = element");
fs.writeFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', vr);

// problems.ts
let prob = fs.readFileSync('src/data/problems.ts', 'utf8');
prob = prob.replace(/validate: \(values\) => null/g, "validate: () => null");
fs.writeFileSync('src/data/problems.ts', prob);

// Algorithms (prefix unused with _)
const dir = 'src/algorithms/';
fs.readdirSync(dir).forEach(f => {
  if (f.endsWith('.ts')) {
    let c = fs.readFileSync(dir + f, 'utf8');
    c = c.replace(/export function (.*)\((.*)\):/g, (match, p1, p2) => {
      const newP2 = p2.split(', ').map(p => p.trim() ? (p.startsWith('_') ? p : '_' + p) : '').join(', ');
      return `export function ${p1}(${newP2}):`;
    });
    fs.writeFileSync(dir + f, c);
  }
});
