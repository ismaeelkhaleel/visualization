const fs = require('fs');

let c = fs.readFileSync('src/algorithms/dfs.ts', 'utf8');
c = c.replace(/value:'curr'/g, "label:'curr'").replace(/value:'neighbor'/g, "label:'neighbor'").replace(/value:'q'/g, "label:'q'");
fs.writeFileSync('src/algorithms/dfs.ts', c);

c = fs.readFileSync('src/algorithms/graphBFS.ts', 'utf8');
c = c.replace(/value:'curr'/g, "label:'curr'").replace(/value:'neighbor'/g, "label:'neighbor'").replace(/value:'q'/g, "label:'q'");
fs.writeFileSync('src/algorithms/graphBFS.ts', c);

c = fs.readFileSync('src/algorithms/linkedListCycle.ts', 'utf8');
c = c.replace(/nodes\[nodes\.length - 1\]\.next/g, 'nodes[nodes.length - 1].nextId');
c = c.replace(/nodes\[0\]\.next/g, 'nodes[0].nextId');
c = c.replace(/fastNode\.next/g, 'fastNode.nextId');
c = c.replace(/slowNode\.next/g, 'slowNode.nextId');
fs.writeFileSync('src/algorithms/linkedListCycle.ts', c);

c = fs.readFileSync('src/algorithms/reverseLinkedList.ts', 'utf8');
c = c.replace(/let prev = null/g, 'let prev: string | null = null');
fs.writeFileSync('src/algorithms/reverseLinkedList.ts', c);
