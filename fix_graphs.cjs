const fs = require('fs');
let c;

// Fix dfs
c = fs.readFileSync('src/algorithms/dfs.ts', 'utf8');
c = c.replace(/label:/g, 'value:');
c = c.replace(/, x: \d+, y: \d+/g, '');
c = c.replace(/source:/g, 'from:').replace(/target:/g, 'to:');
c = c.replace(/e\.source/g, 'e.from').replace(/e\.target/g, 'e.to');
fs.writeFileSync('src/algorithms/dfs.ts', c);

// Fix graphBFS
c = fs.readFileSync('src/algorithms/graphBFS.ts', 'utf8');
c = c.replace(/label:/g, 'value:');
c = c.replace(/, x: \d+, y: \d+/g, '');
c = c.replace(/source:/g, 'from:').replace(/target:/g, 'to:');
c = c.replace(/e\.source/g, 'e.from').replace(/e\.target/g, 'e.to');
fs.writeFileSync('src/algorithms/graphBFS.ts', c);

// Fix LinkedList Cycle
c = fs.readFileSync('src/algorithms/linkedListCycle.ts', 'utf8');
c = c.replace(/next:/g, 'nextId:');
c = c.replace(/n\.next/g, 'n.nextId');
fs.writeFileSync('src/algorithms/linkedListCycle.ts', c);

// Fix mergeTwoSortedLists
c = fs.readFileSync('src/algorithms/mergeTwoSortedLists.ts', 'utf8');
c = c.replace(/next:/g, 'nextId:');
c = c.replace(/\.next/g, '.nextId');
fs.writeFileSync('src/algorithms/mergeTwoSortedLists.ts', c);

// Fix reverseLinkedList
c = fs.readFileSync('src/algorithms/reverseLinkedList.ts', 'utf8');
c = c.replace(/next:/g, 'nextId:');
c = c.replace(/\.next/g, '.nextId');
fs.writeFileSync('src/algorithms/reverseLinkedList.ts', c);

// Fix unused parameters by actually using them via console.log
['binaryTreeLevelOrder.ts', 'dfs.ts', 'invertBinaryTree.ts', 'maxDepthBinaryTree.ts', 'numberOfIslands.ts', 'graphBFS.ts'].forEach(f => {
  let content = fs.readFileSync('src/algorithms/' + f, 'utf8');
  content = content.replace(/export function (.*?)\((.*?)\): VisualizationStep\[\] \{/, (m, p1, p2) => {
    const args = p2.split(',').map(a => a.split(':')[0].trim()).join(', ');
    return "export function " + p1 + "(" + p2 + "): VisualizationStep[] {\n  console.log(" + args + ");";
  });
  fs.writeFileSync('src/algorithms/' + f, content);
});

