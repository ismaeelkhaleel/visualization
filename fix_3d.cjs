const fs = require('fs');

let theme = fs.readFileSync('src/theme.ts', 'utf8');
theme = theme.replace(
  /  shadows: \{[\s\S]*?\},/g,
  `  shadows: {
    panel: 'inset 1px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 0 rgba(0, 0, 0, 0.5), 4px 6px 0 rgba(0,0,0,0.8), 0 12px 24px rgba(0,0,0,0.6)',
    panelInner: 'none',
    element: 'inset 1px 1px 0 rgba(255, 255, 255, 0.15), inset -1px -1px 0 rgba(0, 0, 0, 0.5), 3px 4px 0 rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.6)',
    active: 'inset 1px 1px 0 rgba(255, 255, 255, 0.25), inset -1px -1px 0 rgba(0, 0, 0, 0.5), 5px 6px 0 rgba(0,0,0,0.9), 0 12px 20px rgba(59, 130, 246, 0.4)',
    compare: 'inset 1px 1px 0 rgba(255, 255, 255, 0.25), inset -1px -1px 0 rgba(0, 0, 0, 0.5), 5px 6px 0 rgba(0,0,0,0.9), 0 12px 20px rgba(168, 85, 247, 0.4)',
    success: 'inset 1px 1px 0 rgba(255, 255, 255, 0.25), inset -1px -1px 0 rgba(0, 0, 0, 0.5), 3px 4px 0 rgba(16, 185, 129, 0.5), 0 8px 16px rgba(16, 185, 129, 0.4)',
    pointer: 'inset 1px 1px 0 rgba(255, 255, 255, 0.2), 2px 3px 0 rgba(0,0,0,0.8), 0 5px 10px rgba(0,0,0,0.5)',
    linkedList: 'inset 1px 1px 0 rgba(255, 255, 255, 0.15), inset -1px -1px 0 rgba(0, 0, 0, 0.5), 3px 4px 0 rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.6)',
    svg: {
      element: 'url(#shadow-element)',
      active: 'url(#shadow-active)',
      success: 'url(#shadow-success)',
    }
  },`
);
fs.writeFileSync('src/theme.ts', theme);

// Apply top translation for active
// Array.tsx
let arr = fs.readFileSync('src/components/Array/Array.tsx', 'utf8');
arr = arr.replace(/top: isComplete[\s\S]*?\? '-1px' : '0',/g, "top: action === 'swap' && swap && (index === swap.from || index === swap.to) ? '-2px' : highlights.includes(index) ? '-2px' : isComplete ? '-1px' : '0',");
fs.writeFileSync('src/components/Array/Array.tsx', arr);

// Stack.tsx
let stack = fs.readFileSync('src/components/Stack/Stack.tsx', 'utf8');
stack = stack.replace(/top: isComplete[\s\S]*?\? '-1px' : '0',/g, "top: isHighlighted ? '-2px' : isComplete ? '-1px' : '0',");
fs.writeFileSync('src/components/Stack/Stack.tsx', stack);

// LinkedList.tsx
let ll = fs.readFileSync('src/components/LinkedList/LinkedList.tsx', 'utf8');
ll = ll.replace(/top: isComplete[\s\S]*?\? '-1px' : '0',/g, "top: isHighlighted ? '-2px' : isComplete ? '-1px' : '0',");
fs.writeFileSync('src/components/LinkedList/LinkedList.tsx', ll);

// CodePanel
let cp = fs.readFileSync('src/components/CodePanel/CodePanel.tsx', 'utf8');
cp = cp.replace(/boxShadow: \`\$\{theme\.shadows\.panel\}, \$\{theme\.shadows\.panelInner\}\`,/g, "boxShadow: theme.shadows.panel,");
fs.writeFileSync('src/components/CodePanel/CodePanel.tsx', cp);
