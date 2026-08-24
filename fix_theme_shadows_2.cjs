const fs = require('fs');

let theme = fs.readFileSync('src/theme.ts', 'utf8');

// Update shadows object in theme
theme = theme.replace(
  /  shadows: \{[\s\S]*?\},/g,
  `  shadows: {
    panel: '0 6px 0 rgba(0,0,0,0.45), 0 12px 24px rgba(0,0,0,0.35)',
    panelInner: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    element: '0 4px 0 rgba(0,0,0,0.45), 0 7px 14px rgba(0,0,0,0.30)',
    active: '0 5px 0 rgba(0,0,0,0.45), 0 8px 16px rgba(0,0,0,0.35)',
    compare: '0 5px 0 rgba(0,0,0,0.45), 0 8px 16px rgba(0,0,0,0.35)',
    success: '0 5px 0 rgba(16, 185, 129, 0.25), 0 8px 16px rgba(16, 185, 129, 0.20)',
    pointer: '0 3px 0 rgba(0,0,0,0.45), 0 5px 10px rgba(0,0,0,0.35)',
    linkedList: '3px 4px 0 rgba(0,0,0,0.40), 0 8px 14px rgba(0,0,0,0.25)',
    svg: {
      element: 'drop-shadow(0px 3px 3px rgba(0,0,0,0.45)) drop-shadow(0px 3px 0px rgba(0,0,0,0.4))',
      active: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.45)) drop-shadow(0px 4px 0px rgba(0,0,0,0.4))',
      success: 'drop-shadow(0px 4px 4px rgba(16, 185, 129, 0.35)) drop-shadow(0px 4px 0px rgba(16, 185, 129, 0.25))',
    }
  },`
);

fs.writeFileSync('src/theme.ts', theme);
