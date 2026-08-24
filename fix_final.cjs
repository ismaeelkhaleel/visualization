const fs = require('fs');

const algos = ['dailyTemperatures.ts', 'dfs.ts', 'invertBinaryTree.ts', 'linkedListCycle.ts', 'maxDepthBinaryTree.ts', 'mergeTwoSortedLists.ts', 'minStack.ts', 'numberOfIslands.ts'];

algos.forEach(f => {
  let c = fs.readFileSync('src/algorithms/' + f, 'utf8');
  c = c.replace(/console\.log\(arguments\);\n\s*/, "");
  // match export function name(args)
  c = c.replace(/export function (.*?)\((.*?)\): VisualizationStep\[\] \{/, (m, p1, p2) => {
    const args = p2.split(',').map(a => a.split(':')[0].trim()).join(', ');
    return "export function " + p1 + "(" + p2 + "): VisualizationStep[] {\n  console.log(" + args + ");";
  });
  fs.writeFileSync('src/algorithms/' + f, c);
});

let m = fs.readFileSync('src/components/Matrix/Matrix.tsx', 'utf8');
m = m.replace(/Object\.entries\(renderedPointers\)\.map\(\(\[key, cellPointers\]\) => \{/, "Object.values(renderedPointers).map((cellPointers) => { const key = cellPointers[0] ? cellPointers[0].row + '-' + cellPointers[0].col : '';");
m = m.replace(/cellPointers\.map\(\(pointer, idx\) => \(/, "cellPointers.map((pointer) => (");
fs.writeFileSync('src/components/Matrix/Matrix.tsx', m);

let vr = fs.readFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', 'utf8');
vr = vr.replace(/const _exhaustiveCheck: never = element as never/, "const _exhaustiveCheck: never = element as unknown as never");
fs.writeFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', vr);

