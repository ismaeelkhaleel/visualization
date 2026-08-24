const fs = require('fs');
let arr = fs.readFileSync('src/components/Array/Array.tsx', 'utf8');

arr = arr.replace(
  /                            border: \`2px solid \$\{\n                                action === 'swap' && swap && \(index === swap\.from \|\| index === swap\.to\)\n                                    \? theme\.colors\.warning\.border\n                                    : highlights\.includes\(index\)\n                                        \? theme\.colors\.active\.border\n                                        : theme\.colors\.neutral\.border\n                            \}\`,/g,
  `                            border: \`2px solid \${
                                isComplete
                                    ? theme.colors.success.border
                                    : action === 'swap' && swap && (index === swap.from || index === swap.to)
                                        ? theme.colors.warning.border
                                        : highlights.includes(index)
                                            ? theme.colors.active.border
                                            : theme.colors.neutral.border
                            }\`,`
);

arr = arr.replace(
  /                            background:\n                                action === 'swap' && swap && \(index === swap\.from \|\| index === swap\.to\)\n                                    \? theme\.colors\.warning\.bg\n                                    : highlights\.includes\(index\)\n                                        \? theme\.colors\.active\.bg\n                                        : theme\.colors\.neutral\.bg,/g,
  `                            background:
                                isComplete
                                    ? theme.colors.success.bg
                                    : action === 'swap' && swap && (index === swap.from || index === swap.to)
                                        ? theme.colors.warning.bg
                                        : highlights.includes(index)
                                            ? theme.colors.active.bg
                                            : theme.colors.neutral.bg,`
);

fs.writeFileSync('src/components/Array/Array.tsx', arr);
