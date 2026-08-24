const fs = require('fs');

let c = fs.readFileSync('src/algorithms/linkedListCycle.ts', 'utf8');
c = c.replace(/fastNode\.next/g, 'fastNode.nextId');
fs.writeFileSync('src/algorithms/linkedListCycle.ts', c);

let r = fs.readFileSync('src/algorithms/reverseLinkedList.ts', 'utf8');
r = r.replace(/let curr = '0'/g, "let curr: string | null = '0'");
fs.writeFileSync('src/algorithms/reverseLinkedList.ts', r);
