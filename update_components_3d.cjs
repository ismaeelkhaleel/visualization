const fs = require('fs');

// Array.tsx
let arr = fs.readFileSync('src/components/Array/Array.tsx', 'utf8');
arr = arr.replace(
  /                            boxShadow: isComplete[\s\S]*?: theme\.shadows\.element,/g,
  `                            boxShadow: isComplete
                                ? theme.shadows.success
                                : action === 'swap' && swap && (index === swap.from || index === swap.to)
                                    ? theme.shadows.active
                                    : highlights.includes(index)
                                        ? theme.shadows.active
                                        : theme.shadows.element,
                            top: isComplete || highlights.includes(index) || (action === 'swap' && swap && (index === swap.from || index === swap.to)) ? '-1px' : '0',`
);
arr = arr.replace(/transition: \`background/g, 'transition: `top ${theme.animation.durationShort}s ${theme.animation.ease}, background');
fs.writeFileSync('src/components/Array/Array.tsx', arr);

// Stack.tsx
let stack = fs.readFileSync('src/components/Stack/Stack.tsx', 'utf8');
stack = stack.replace(
  /                    boxShadow: isComplete \? theme\.shadows\.success : isHighlighted \? theme\.shadows\.active : theme\.shadows\.element,/g,
  `                    boxShadow: isComplete ? theme.shadows.success : isHighlighted ? theme.shadows.active : theme.shadows.element,
                    top: isComplete || isHighlighted ? '-1px' : '0',`
);
stack = stack.replace(/transition: \`background/g, 'transition: `top ${theme.animation.durationShort}s ${theme.animation.ease}, background');
fs.writeFileSync('src/components/Stack/Stack.tsx', stack);

// LinkedList.tsx
let ll = fs.readFileSync('src/components/LinkedList/LinkedList.tsx', 'utf8');
ll = ll.replace(
  /                    boxShadow: isComplete \? theme\.shadows\.success : isHighlighted \? theme\.shadows\.active : theme\.shadows\.element,/g,
  `                    boxShadow: isComplete ? theme.shadows.success : isHighlighted ? theme.shadows.active : theme.shadows.linkedList,
                    top: isComplete || isHighlighted ? '-1px' : '0',`
);
ll = ll.replace(/transition: \`background/g, 'transition: `top ${theme.animation.durationShort}s ${theme.animation.ease}, background');
fs.writeFileSync('src/components/LinkedList/LinkedList.tsx', ll);

// Tree.tsx
let tree = fs.readFileSync('src/components/Tree/Tree.tsx', 'utf8');
tree = tree.replace(
  /filter: isComplete \? \`drop-shadow\(\$\{theme\.shadows\.success.*?\) : \`drop-shadow\(\$\{theme\.shadows\.element.*?\)/g,
  "filter: isComplete ? theme.shadows.svg.success : isHighlighted ? theme.shadows.svg.active : theme.shadows.svg.element"
);
tree = tree.replace(
  /cy=\{node\.y\}/g,
  "cy={node.y - (isComplete || isHighlighted ? 1 : 0)}"
);
tree = tree.replace(
  /y=\{node\.y \+ 5\}/g,
  "y={node.y + 5 - (isComplete || isHighlighted ? 1 : 0)}"
);
fs.writeFileSync('src/components/Tree/Tree.tsx', tree);

// Graph.tsx
let graph = fs.readFileSync('src/components/Graph/Graph.tsx', 'utf8');
graph = graph.replace(
  /filter: isComplete \? \`drop-shadow\(\$\{theme\.shadows\.success.*?\) : \`drop-shadow\(\$\{theme\.shadows\.element.*?\)/g,
  "filter: isComplete ? theme.shadows.svg.success : state === 'active' || isHighlighted ? theme.shadows.svg.active : theme.shadows.svg.element"
);
graph = graph.replace(
  /cy=\{pos\.y\}/g,
  "cy={pos.y - (isComplete || isHighlighted || isVisited ? 1 : 0)}"
);
graph = graph.replace(
  /y=\{pos\.y \+ 5\}/g,
  "y={pos.y + 5 - (isComplete || isHighlighted || isVisited ? 1 : 0)}"
);
fs.writeFileSync('src/components/Graph/Graph.tsx', graph);

