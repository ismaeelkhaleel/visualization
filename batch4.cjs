const fs = require('fs');

function write(name, code, algo) {
  const codeLines = code.split('\n').map(l => "  '" + l.replace(/'/g, "\\'") + "',").join('\n');
  fs.writeFileSync('src/data/' + name + 'Code.ts', "export const " + name + "Code = [\n" + codeLines + "\n]\n");
  fs.writeFileSync('src/algorithms/' + name + '.ts', algo);
}

write('binaryTreeLevelOrder',
`class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
            res.add(level);
        }
        return res;
    }
}`,
`import type { VisualizationStep, TreeNode } from './types'
export function binaryTreeLevelOrder(rootVal: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const nodes: TreeNode[] = [
    { id: '1', value: 3, leftId: '2', rightId: '3' },
    { id: '2', value: 9, leftId: null, rightId: null },
    { id: '3', value: 20, leftId: '4', rightId: '5' },
    { id: '4', value: 15, leftId: null, rightId: null },
    { id: '5', value: 7, leftId: null, rightId: null }
  ]
  const q: string[] = ['1']
  steps.push({ codeLine: 5, message: 'Initialize queue with root', audioEvent: 'pointer', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: [{label:'q', nodeId:'1'}] } }] })
  
  while (q.length > 0) {
    const size = q.length
    steps.push({ codeLine: 7, message: \`Level size: \${size}\`, audioEvent: 'compare', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: q.map(id => ({label:'in-q', nodeId:id})) } }] })
    for (let i = 0; i < size; i++) {
      const curr = q.shift()!
      const node = nodes.find(n => n.id === curr)!
      steps.push({ codeLine: 10, message: \`Poll node \${node.value}\`, audioEvent: 'visit', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: [{label:'curr', nodeId:curr}] } }] })
      
      if (node.leftId) {
        q.push(node.leftId)
        steps.push({ codeLine: 12, message: \`Enqueue left child \${nodes.find(n=>n.id===node.leftId)!.value}\`, audioEvent: 'enqueue', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: [{label:'curr', nodeId:curr}, {label:'q', nodeId:node.leftId}] } }] })
      }
      if (node.rightId) {
        q.push(node.rightId)
        steps.push({ codeLine: 13, message: \`Enqueue right child \${nodes.find(n=>n.id===node.rightId)!.value}\`, audioEvent: 'enqueue', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: [{label:'curr', nodeId:curr}, {label:'q', nodeId:node.rightId}] } }] })
      }
    }
  }
  
  steps.push({ codeLine: 17, message: 'Traversal complete', audioEvent: 'success', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1' } }] })
  return steps
}`);

write('maxDepthBinaryTree',
`class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        return Math.max(left, right) + 1;
    }
}`,
`import type { VisualizationStep, TreeNode } from './types'
export function maxDepthBinaryTree(rootVal: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const nodes: TreeNode[] = [
    { id: '1', value: 3, leftId: '2', rightId: '3' },
    { id: '2', value: 9, leftId: null, rightId: null },
    { id: '3', value: 20, leftId: '4', rightId: '5' },
    { id: '4', value: 15, leftId: null, rightId: null },
    { id: '5', value: 7, leftId: null, rightId: null }
  ]
  steps.push({ codeLine: 2, message: 'Start DFS', audioEvent: 'pointer', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1' } }] })
  
  function dfs(nodeId: string | null, depth: number) {
    if (!nodeId) return 0
    const node = nodes.find(n => n.id === nodeId)!
    steps.push({ codeLine: 2, message: \`Visit node \${node.value}, depth: \${depth}\`, audioEvent: 'visit', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: [{label:'curr', nodeId:nodeId}] } }] })
    dfs(node.leftId, depth + 1)
    dfs(node.rightId, depth + 1)
    steps.push({ codeLine: 7, message: \`Return from node \${node.value}\`, audioEvent: 'match', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: [{label:'curr', nodeId:nodeId}] } }] })
    return 1
  }
  
  dfs('1', 1)
  
  steps.push({ codeLine: 8, message: 'Max depth calculated', audioEvent: 'success', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1' } }] })
  return steps
}`);

write('invertBinaryTree',
`class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);
        root.left = right;
        root.right = left;
        return root;
    }
}`,
`import type { VisualizationStep, TreeNode } from './types'
export function invertBinaryTree(rootVal: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  let nodes: TreeNode[] = [
    { id: '1', value: 4, leftId: '2', rightId: '3' },
    { id: '2', value: 2, leftId: '4', rightId: '5' },
    { id: '3', value: 7, leftId: '6', rightId: '7' },
    { id: '4', value: 1, leftId: null, rightId: null },
    { id: '5', value: 3, leftId: null, rightId: null },
    { id: '6', value: 6, leftId: null, rightId: null },
    { id: '7', value: 9, leftId: null, rightId: null }
  ]
  steps.push({ codeLine: 2, message: 'Start DFS for inversion', audioEvent: 'pointer', elements: [{ type: 'tree', data: { nodes: JSON.parse(JSON.stringify(nodes)), rootId: '1' } }] })
  
  function dfs(nodeId: string | null) {
    if (!nodeId) return
    const node = nodes.find(n => n.id === nodeId)!
    steps.push({ codeLine: 2, message: \`Visit node \${node.value}\`, audioEvent: 'visit', elements: [{ type: 'tree', data: { nodes: JSON.parse(JSON.stringify(nodes)), rootId: '1', pointers: [{label:'curr', nodeId:nodeId}] } }] })
    
    dfs(node.leftId)
    dfs(node.rightId)
    
    steps.push({ codeLine: 7, message: \`Swapping children of \${node.value}\`, audioEvent: 'compare', elements: [{ type: 'tree', data: { nodes: JSON.parse(JSON.stringify(nodes)), rootId: '1', pointers: [{label:'curr', nodeId:nodeId}] } }] })
    
    const temp = node.leftId
    node.leftId = node.rightId
    node.rightId = temp
    
    steps.push({ codeLine: 8, message: \`Children of \${node.value} swapped\`, audioEvent: 'swap', elements: [{ type: 'tree', data: { nodes: JSON.parse(JSON.stringify(nodes)), rootId: '1', pointers: [{label:'curr', nodeId:nodeId}] } }] })
  }
  
  dfs('1')
  
  steps.push({ codeLine: 10, message: 'Inversion complete', audioEvent: 'success', elements: [{ type: 'tree', data: { nodes: JSON.parse(JSON.stringify(nodes)), rootId: '1' } }] })
  return steps
}`);

write('graphBFS',
`class Solution {
    public void bfs(Node node) {
        Queue<Node> queue = new LinkedList<>();
        HashSet<Node> visited = new HashSet<>();
        queue.add(node);
        visited.add(node);
        while (!queue.isEmpty()) {
            Node curr = queue.poll();
            for (Node neighbor : curr.neighbors) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
    }
}`,
`import type { VisualizationStep, GraphNode, GraphEdge } from './types'
export function graphBFS(inputStr: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const nodes: GraphNode[] = [
    { id: 'A', label: 'A', x: 50, y: 50 },
    { id: 'B', label: 'B', x: 150, y: 50 },
    { id: 'C', label: 'C', x: 50, y: 150 },
    { id: 'D', label: 'D', x: 150, y: 150 }
  ]
  const edges: GraphEdge[] = [
    { source: 'A', target: 'B' },
    { source: 'A', target: 'C' },
    { source: 'B', target: 'D' },
    { source: 'C', target: 'D' }
  ]
  
  const visited = new Set<string>()
  const q: string[] = ['A']
  visited.add('A')
  
  steps.push({ codeLine: 4, message: 'Initialize queue and visited set', audioEvent: 'pointer', elements: [{ type: 'graph', data: { nodes, edges, highlights: ['A'] } }] })
  
  while(q.length > 0) {
    const curr = q.shift()!
    steps.push({ codeLine: 7, message: \`Dequeue \${curr}\`, audioEvent: 'visit', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}] } }] })
    
    const neighbors = edges.filter(e => e.source === curr).map(e => e.target).concat(edges.filter(e => e.target === curr).map(e => e.source))
    for (const neighbor of neighbors) {
      steps.push({ codeLine: 8, message: \`Check neighbor \${neighbor}\`, audioEvent: 'compare', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}, {label:'neighbor', nodeId:neighbor}] } }] })
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        q.push(neighbor)
        steps.push({ codeLine: 10, message: \`Enqueue and mark \${neighbor} visited\`, audioEvent: 'enqueue', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}, {label:'q', nodeId:neighbor}] } }] })
      } else {
        steps.push({ codeLine: 10, message: \`\${neighbor} is already visited\`, audioEvent: 'skip', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}] } }] })
      }
    }
  }
  
  steps.push({ codeLine: 15, message: 'BFS complete', audioEvent: 'success', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited) } }] })
  return steps
}`);

write('dfs',
`class Solution {
    public void dfs(Node node, HashSet<Node> visited) {
        if (node == null || visited.contains(node)) return;
        visited.add(node);
        for (Node neighbor : node.neighbors) {
            dfs(neighbor, visited);
        }
    }
}`,
`import type { VisualizationStep, GraphNode, GraphEdge } from './types'
export function dfs(inputStr: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const nodes: GraphNode[] = [
    { id: 'A', label: 'A', x: 50, y: 50 },
    { id: 'B', label: 'B', x: 150, y: 50 },
    { id: 'C', label: 'C', x: 50, y: 150 },
    { id: 'D', label: 'D', x: 150, y: 150 }
  ]
  const edges: GraphEdge[] = [
    { source: 'A', target: 'B' },
    { source: 'A', target: 'C' },
    { source: 'B', target: 'D' },
    { source: 'C', target: 'D' }
  ]
  const visited = new Set<string>()
  
  steps.push({ codeLine: 2, message: 'Start DFS from A', audioEvent: 'pointer', elements: [{ type: 'graph', data: { nodes, edges, highlights: [] } }] })
  
  function recurse(curr: string) {
    steps.push({ codeLine: 3, message: \`Visit \${curr}\`, audioEvent: 'visit', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}] } }] })
    if (visited.has(curr)) {
      steps.push({ codeLine: 3, message: \`\${curr} already visited\`, audioEvent: 'skip', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}] } }] })
      return
    }
    visited.add(curr)
    steps.push({ codeLine: 4, message: \`Mark \${curr} visited\`, audioEvent: 'match', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}] } }] })
    
    const neighbors = edges.filter(e => e.source === curr).map(e => e.target).concat(edges.filter(e => e.target === curr).map(e => e.source))
    for (const neighbor of neighbors) {
      recurse(neighbor)
    }
  }
  
  recurse('A')
  
  steps.push({ codeLine: 8, message: 'DFS complete', audioEvent: 'success', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited) } }] })
  return steps
}`);

write('numberOfIslands',
`class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    dfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }
    private void dfs(char[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == '0') return;
        grid[i][j] = '0';
        dfs(grid, i + 1, j);
        dfs(grid, i - 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i, j - 1);
    }
}`,
`import type { VisualizationStep, MatrixCell } from './types'
export function numberOfIslands(gridStrs: string[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const grid = ["11110", "11010", "11000", "00000"].map(row => row.split(''))
  const rows = grid.length, cols = grid[0].length
  const cells: MatrixCell[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ row: r, col: c, value: grid[r][c] })
    }
  }
  const visited: {row: number, col: number}[] = []
  
  steps.push({ codeLine: 3, message: 'Start scanning grid', audioEvent: 'pointer', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited] } }] })
  let count = 0
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      steps.push({ codeLine: 6, message: \`Check cell (\${i},\${j})\`, audioEvent: 'compare', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited], pointers: [{label:'curr', row:i, col:j}] } }] })
      if (grid[i][j] === '1') {
        steps.push({ codeLine: 7, message: 'Found land! Start DFS', audioEvent: 'match', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited], pointers: [{label:'curr', row:i, col:j}] } }] })
        
        const dfsQueue = [{r: i, c: j}]
        while (dfsQueue.length > 0) {
          const {r, c} = dfsQueue.pop()!
          if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') continue;
          
          grid[r][c] = '0'
          const cell = cells.find(cl => cl.row === r && cl.col === c)!
          cell.value = '0'
          visited.push({row: r, col: c})
          
          steps.push({ codeLine: 16, message: \`Visit (\${r},\${c}) and mark as water\`, audioEvent: 'visit', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited], pointers: [{label:'dfs', row:r, col:c}] } }] })
          
          dfsQueue.push({r: r + 1, c: c})
          dfsQueue.push({r: r - 1, c: c})
          dfsQueue.push({r: r, c: c + 1})
          dfsQueue.push({r: r, c: c - 1})
        }
        
        count++
        steps.push({ codeLine: 8, message: \`Island \${count} fully explored\`, audioEvent: 'success', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited] } }] })
      }
    }
  }
  
  steps.push({ codeLine: 11, message: \`Total islands: \${count}\`, audioEvent: 'success', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited] } }] })
  return steps
}`);

