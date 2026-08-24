const fs = require('fs');
let content = fs.readFileSync('src/components/LinkedList/LinkedList.tsx', 'utf8');

content = content.replace(
  /type LinkedListProps = LinkedListVisualizationData & \{\n  visualizationKey\?: string\n\}/g,
  `type LinkedListProps = LinkedListVisualizationData & {
  visualizationKey?: string
  viewportWidth?: number
  viewportHeight?: number
}`
);

content = content.replace(
  /function LinkedList\(\{ nodes, headId, pointers = \[\], highlights = \[\], visualizationKey \}: LinkedListProps\) \{/g,
  `function LinkedList({ nodes, headId, pointers = [], highlights = [], visualizationKey, viewportWidth = 312, viewportHeight = 192 }: LinkedListProps) {`
);

content = content.replace(
  /  return \(\n    <div\n      ref=\{containerRef\}\n      style=\{\{\n        display: 'flex',\n        flexWrap: 'wrap',\n        gap: '24px 12px',\n        alignItems: 'flex-start',\n        justifyContent: 'center',\n        width: '100%',\n      \}\}\n    >/g,
  `
  // Nodes approx width = 50px + 12px + 50px (arrow). 5 nodes wrap tightly.
  // We'll scale down if it exceeds the viewport height (approx 2 rows = ~220px natural height)
  const estimatedRows = Math.ceil(nodes.length / 3);
  const naturalHeight = estimatedRows * 110 + 40;
  const scale = Math.min(viewportHeight / (naturalHeight || 1), 1);

  return (
    <div
      ref={containerRef}
      style={{
        width: \`\${viewportWidth}px\`,
        height: \`\${viewportHeight}px\`,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px 12px',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          transform: \`scale(\${scale})\`,
          transformOrigin: 'center center',
        }}
      >`
);

content = content.replace(
  /      \{\/\* Null pointers floating at the end \*\/\}.+?<\/div>\n      \)\}\n    <\/div>\n  \)\n\}\n\nexport default LinkedList/gs,
  match => match.replace(/    <\/div>\n  \)\n\}\n\nexport default LinkedList/g, '    </div>\n  </div>\n  )\n}\n\nexport default LinkedList')
);

fs.writeFileSync('src/components/LinkedList/LinkedList.tsx', content);
