const fs = require('fs');
let ll = fs.readFileSync('src/components/LinkedList/LinkedList.tsx', 'utf8');

ll = ll.replace(
  /background: isHighlighted \? theme\.colors\.active\.bg : theme\.colors\.neutral\.bg,/g,
  'background: isComplete ? theme.colors.success.bg : isHighlighted ? theme.colors.active.bg : theme.colors.neutral.bg,'
);
ll = ll.replace(
  /border: isHighlighted \? `2px solid \$\{theme\.colors\.active\.border\}` : `2px solid \$\{theme\.colors\.neutral\.border\}`,/g,
  'border: isComplete ? `2px solid ${theme.colors.success.border}` : isHighlighted ? `2px solid ${theme.colors.active.border}` : `2px solid ${theme.colors.neutral.border}`,'
);

fs.writeFileSync('src/components/LinkedList/LinkedList.tsx', ll);
