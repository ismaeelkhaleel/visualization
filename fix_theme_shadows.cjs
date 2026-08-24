const fs = require('fs');

let theme = fs.readFileSync('src/theme.ts', 'utf8');

// Add shadows object to theme
theme = theme.replace(
  /  animation: \{/g,
  `  shadows: {
    panel: '0 4px 14px rgba(0, 0, 0, 0.4)',
    panelInner: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    element: '0 2px 5px rgba(0, 0, 0, 0.3)',
    active: '0 2px 10px rgba(59, 130, 246, 0.35)',
    compare: '0 2px 10px rgba(168, 85, 247, 0.35)',
    success: '0 2px 14px rgba(16, 185, 129, 0.25)',
    pointer: '0 2px 6px rgba(0, 0, 0, 0.45)',
  },
  animation: {`
);

fs.writeFileSync('src/theme.ts', theme);
