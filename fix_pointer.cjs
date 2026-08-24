const fs = require('fs');
let ptr = fs.readFileSync('src/components/Pointers/Pointers.tsx', 'utf8');
ptr = ptr.replace(
  /alignItems: 'center',\n\s*justifyContent: 'center',\n\s*borderRadius: '4px',\n\s*whiteSpace: 'nowrap',/g,
  `alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                boxShadow: theme.shadows.pointer,`
);
fs.writeFileSync('src/components/Pointers/Pointers.tsx', ptr);
