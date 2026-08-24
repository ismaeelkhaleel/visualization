const fs = require('fs');
let content = fs.readFileSync('src/components/Tree/Tree.tsx', 'utf8');

// Add viewportWidth and viewportHeight to TreeProps
content = content.replace(
  /type TreeProps = TreeVisualizationData & \{\n  visualizationKey\?: string\n\}/g,
  `type TreeProps = TreeVisualizationData & {
  visualizationKey?: string
  viewportWidth?: number
  viewportHeight?: number
}`
);

content = content.replace(
  /function Tree\(\{ nodes, rootId, pointers = \[\], highlights = \[\], visualizationKey \}: TreeProps\) \{/g,
  `function Tree({ nodes, rootId, pointers = [], highlights = [], visualizationKey, viewportWidth = 312, viewportHeight = 192 }: TreeProps) {`
);

// Update layout return
content = content.replace(
  /return \{\n      layout,\n      edges,\n      width: xCounter \* X_SPACING \+ 80,\n      height: maxDepth \* Y_SPACING \+ 140,\n    \}/g,
  `return {
      layout,
      edges,
      naturalWidth: xCounter * X_SPACING + 80,
      naturalHeight: maxDepth * Y_SPACING + 140,
    }`
);

// Extract naturalWidth and naturalHeight
content = content.replace(
  /const \{ layout, edges, width, height \} = useMemo/g,
  `const { layout, edges, naturalWidth, naturalHeight } = useMemo`
);

// Change container return
content = content.replace(
  /return \(\n    <div\n      ref=\{containerRef\}\n      style=\{\{\n        width: '100%',\n        display: 'flex',\n        justifyContent: 'center',\n        overflowX: 'auto',\n        padding: '20px 0',\n      \}\}\n    >\n      <div style=\{\{ position: 'relative', width, height \}\}>\n        <svg width=\{width\} height=\{height\} style=\{\{ minWidth: width, minHeight: height, display: 'block' \}\}>/g,
  `
  const scale = Math.min(
    viewportWidth / (naturalWidth || 1),
    viewportHeight / (naturalHeight || 1),
    1
  )

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
      <div style={{ position: 'absolute', width: naturalWidth, height: naturalHeight, transform: \`scale(\${scale})\`, transformOrigin: 'center center' }}>
        <svg width={naturalWidth} height={naturalHeight} style={{ minWidth: naturalWidth, minHeight: naturalHeight, display: 'block' }}>`
);

fs.writeFileSync('src/components/Tree/Tree.tsx', content);
