const fs = require('fs');

const files = [
  'src/components/Array/Array.tsx',
  'src/components/Graph/Graph.tsx',
  'src/components/LinkedList/LinkedList.tsx',
  'src/components/Stack/Stack.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // 1. Add viewportWidth and viewportHeight to Props
  content = content.replace(
    /type \w+Props = [\w]+ & \{\n  visualizationKey\?: string\n\}/g,
    match => match.replace('}', '  viewportWidth?: number\n  viewportHeight?: number\n}')
  );

  // 2. Add destructured props
  const fnMatch = content.match(/function \w+\(\{[^}]+\}: \w+Props\) \{/);
  if (fnMatch) {
    const fnDef = fnMatch[0];
    const newFnDef = fnDef.replace('}:', ', viewportWidth = 312, viewportHeight = 192 }:');
    content = content.replace(fnDef, newFnDef);
  }

  // 3. Find useMemo return { ... width, height }
  // Wait, Graph, LinkedList, Stack, Array all have width/height calculations.
  // We need a specific script for each or a regex that replaces the return wrapper.
}

