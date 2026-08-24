const fs = require('fs');

// CodePanel
let cp = fs.readFileSync('src/components/CodePanel/CodePanel.tsx', 'utf8');
cp = cp.replace(
  /boxSizing: 'border-box',/g,
  `boxSizing: 'border-box',\n      boxShadow: \`\${theme.shadows.panel}, \${theme.shadows.panelInner}\`,`
);
fs.writeFileSync('src/components/CodePanel/CodePanel.tsx', cp);

// Array
let arr = fs.readFileSync('src/components/Array/Array.tsx', 'utf8');
arr = arr.replace(
  /transition: `background \$\{theme\.animation\.durationShort\}s \$\{theme\.animation\.ease\}, border \$\{theme\.animation\.durationShort\}s \$\{theme\.animation\.ease\}\`,/,
  `transition: \`background \${theme.animation.durationShort}s \${theme.animation.ease}, border \${theme.animation.durationShort}s \${theme.animation.ease}, box-shadow \${theme.animation.durationShort}s \${theme.animation.ease}\`,
                            boxShadow: isComplete
                                ? theme.shadows.success
                                : action === 'swap' && swap && (index === swap.from || index === swap.to)
                                    ? theme.shadows.active
                                    : highlights.includes(index)
                                        ? theme.shadows.active
                                        : theme.shadows.element,`
);
fs.writeFileSync('src/components/Array/Array.tsx', arr);

// Stack
let stack = fs.readFileSync('src/components/Stack/Stack.tsx', 'utf8');
stack = stack.replace(
  /borderBottom: index !== 0 && !isHighlighted \? 'none' : undefined,\n\s*color: theme\.colors\.textPrimary,/g,
  `borderBottom: index !== 0 && !isHighlighted ? 'none' : undefined,
                    color: theme.colors.textPrimary,
                    boxShadow: isComplete ? theme.shadows.success : isHighlighted ? theme.shadows.active : theme.shadows.element,
                    transition: \`background \${theme.animation.durationShort}s \${theme.animation.ease}, border \${theme.animation.durationShort}s \${theme.animation.ease}, box-shadow \${theme.animation.durationShort}s \${theme.animation.ease}\`,`
);
fs.writeFileSync('src/components/Stack/Stack.tsx', stack);

// LinkedList
let ll = fs.readFileSync('src/components/LinkedList/LinkedList.tsx', 'utf8');
ll = ll.replace(
  /borderRadius: '8px',\n\s*boxShadow: '0 4px 10px rgba\(0, 0, 0, 0\.2\)',\n\s*transition: `background \$\{theme\.animation\.durationShort\}s \$\{theme\.animation\.ease\}, border \$\{theme\.animation\.durationShort\}s \$\{theme\.animation\.ease\}\`,/g,
  `borderRadius: '8px',
                    boxShadow: isComplete ? theme.shadows.success : isHighlighted ? theme.shadows.active : theme.shadows.element,
                    transition: \`background \${theme.animation.durationShort}s \${theme.animation.ease}, border \${theme.animation.durationShort}s \${theme.animation.ease}, box-shadow \${theme.animation.durationShort}s \${theme.animation.ease}\`,`
);
fs.writeFileSync('src/components/LinkedList/LinkedList.tsx', ll);

// Tree
let tree = fs.readFileSync('src/components/Tree/Tree.tsx', 'utf8');
tree = tree.replace(
  /filter: isHighlighted \? 'drop-shadow\(0px 4px 6px rgba\(0, 0, 0, 0\.4\)\)' : 'none',\n\s*transition: `fill \$\{theme\.animation\.durationShort\}s \$\{theme\.animation\.ease\}, stroke \$\{theme\.animation\.durationShort\}s \$\{theme\.animation\.ease\}\`/g,
  `filter: isComplete ? \`drop-shadow(\${theme.shadows.success.replace(/0 2px 14px /, '0 2px 8px ')})\` : isHighlighted ? \`drop-shadow(\${theme.shadows.active.replace(/0 2px 10px /, '0 2px 6px ')})\` : \`drop-shadow(\${theme.shadows.element.replace(/0 2px 5px /, '0 2px 3px ')})\`,
                    transition: \`fill \${theme.animation.durationShort}s \${theme.animation.ease}, stroke \${theme.animation.durationShort}s \${theme.animation.ease}, filter \${theme.animation.durationShort}s \${theme.animation.ease}\``
);
fs.writeFileSync('src/components/Tree/Tree.tsx', tree);

// Graph
let graph = fs.readFileSync('src/components/Graph/Graph.tsx', 'utf8');
graph = graph.replace(
  /filter: isHighlighted \? 'drop-shadow\(0px 0px 8px rgba\(168, 85, 247, 0\.4\)\)' : 'none',\n\s*transition: `fill \$\{theme\.animation\.durationShort\}s \$\{theme\.animation\.ease\}, stroke \$\{theme\.animation\.durationShort\}s \$\{theme\.animation\.ease\}\`/g,
  `filter: isComplete ? \`drop-shadow(\${theme.shadows.success.replace(/0 2px 14px /, '0 2px 8px ')})\` : state === 'active' || isHighlighted ? \`drop-shadow(\${theme.shadows.active.replace(/0 2px 10px /, '0 2px 6px ')})\` : \`drop-shadow(\${theme.shadows.element.replace(/0 2px 5px /, '0 2px 3px ')})\`,
                    transition: \`fill \${theme.animation.durationShort}s \${theme.animation.ease}, stroke \${theme.animation.durationShort}s \${theme.animation.ease}, filter \${theme.animation.durationShort}s \${theme.animation.ease}\``
);
fs.writeFileSync('src/components/Graph/Graph.tsx', graph);

// Pointer
let ptr = fs.readFileSync('src/components/Pointers/Pointer.tsx', 'utf8');
ptr = ptr.replace(
  /alignItems: 'center',\n\s*justifyContent: 'center',\n\s*borderRadius: '4px',\n\s*whiteSpace: 'nowrap',/g,
  `alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        boxShadow: theme.shadows.pointer,`
);
fs.writeFileSync('src/components/Pointers/Pointer.tsx', ptr);

