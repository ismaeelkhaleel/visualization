const fs = require('fs');

let c = fs.readFileSync('src/algorithms/linkedListCycle.ts', 'utf8');
c = c.replace(/nextIdId/g, 'nextId');
c = c.replace(/\!\.next/g, '!.nextId');
fs.writeFileSync('src/algorithms/linkedListCycle.ts', c);

let m = fs.readFileSync('src/algorithms/mergeTwoSortedLists.ts', 'utf8');
m = m.replace(/let id = 0\n/, '');
fs.writeFileSync('src/algorithms/mergeTwoSortedLists.ts', m);

let mz = fs.readFileSync('src/algorithms/moveZeroes.ts', 'utf8');
mz = mz.replace(/, ArrayItem /g, ' ');
fs.writeFileSync('src/algorithms/moveZeroes.ts', mz);

let ts = fs.readFileSync('src/algorithms/twoSum.ts', 'utf8');
ts = ts.replace(/, ArrayItem /g, ' ');
fs.writeFileSync('src/algorithms/twoSum.ts', ts);

