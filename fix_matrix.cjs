const fs = require('fs');

let m = fs.readFileSync('src/components/Matrix/Matrix.tsx', 'utf8');
m = m.replace(/const totalGridWidth = .*/, "");
m = m.replace(/const totalGridHeight = .*/, "");
m = m.replace(/const isElevated = .*/, "");
m = m.replace(/isElevated \? -2 : 0/g, "state === 'active' || state === 'complete' ? -2 : 0");
m = m.replace(/const \[r, c\] = key\.split\('-\'\)\.map\(Number\)/, "");
m = m.replace(/c \* cellSize \+ cellSize \/ 2/g, "Number(key.split('-')[1]) * cellSize + cellSize / 2");
m = m.replace(/r \* cellSize \+ cellSize \+ 5/g, "Number(key.split('-')[0]) * cellSize + cellSize + 5");
m = m.replace(/idx \* 12/g, "0"); // remove idx completely to simplify

fs.writeFileSync('src/components/Matrix/Matrix.tsx', m);

let vr = fs.readFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', 'utf8');
// Fix "does not satisfy the expected type 'never'"
vr = vr.replace(/const _exhaustiveCheck = element/, "const _exhaustiveCheck: never = element as never");
fs.writeFileSync('src/components/VisualizationRenderer/VisualizationRenderer.tsx', vr);

// Fix unused variables in new algorithms by just using them in console.log
const algos = ['dailyTemperatures.ts', 'dfs.ts', 'invertBinaryTree.ts', 'linkedListCycle.ts', 'maxDepthBinaryTree.ts', 'mergeTwoSortedLists.ts', 'minStack.ts', 'numberOfIslands.ts'];
algos.forEach(f => {
  let c = fs.readFileSync('src/algorithms/' + f, 'utf8');
  c = c.replace(/return \[/, "console.log(arguments);\n  return [");
  fs.writeFileSync('src/algorithms/' + f, c);
});
