const fs = require('fs');
let content = fs.readFileSync('src/components/Stack/Stack.tsx', 'utf8');

content = content.replace(
  /type StackProps = StackVisualizationData & \{\n  visualizationKey\?: string\n\}/g,
  `type StackProps = StackVisualizationData & {
  visualizationKey?: string
  viewportWidth?: number
  viewportHeight?: number
}`
);

content = content.replace(
  /function Stack\(\{\n  items,\n  topLabel = true,\n  highlights = \[\],\n  currentToken,\n  visualizationKey,\n\}: StackProps\) \{/g,
  `function Stack({
  items,
  topLabel = true,
  highlights = [],
  currentToken,
  visualizationKey,
  viewportWidth = 312,
  viewportHeight = 192,
}: StackProps) {`
);

content = content.replace(
  /  return \(\n    <div\n      ref=\{containerRef\}\n      style=\{\{\n        display: 'flex',\n        flexDirection: 'column',\n        alignItems: 'center',\n        gap: '16px',\n        width: '100%',\n      \}\}\n    >/g,
  `  const naturalHeight = items.length * 40 + (currentToken !== undefined && currentToken !== null ? 90 : 0) + 20;
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
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          transform: \`scale(\${scale})\`,
          transformOrigin: 'center center',
        }}
      >`
);

// close the div at the very end
content = content.replace(
  /      <\/div>\n    <\/div>\n  \)\n\}\n\nexport default Stack/g,
  `      </div>\n    </div>\n    </div>\n  )\n}\n\nexport default Stack`
);

fs.writeFileSync('src/components/Stack/Stack.tsx', content);
