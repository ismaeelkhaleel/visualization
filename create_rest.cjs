const fs = require('fs');

// 4. Max Depth
fs.writeFileSync('src/algorithms/maxDepthBinaryTree.ts', `
import type { VisualizationStep } from './types'

export function maxDepthBinaryTree(root: string): VisualizationStep[] {
  return [
    { codeLine: 2, message: 'Check root', audioEvent: 'visit', elements: [{ type: 'tree', data: { nodes: [], rootId: null } }] },
    { codeLine: 5, message: 'Max depth found', audioEvent: 'success', elements: [{ type: 'tree', data: { nodes: [], rootId: null } }] }
  ]
}
`);
fs.writeFileSync('src/data/maxDepthBinaryTreeCode.ts', `export const maxDepthBinaryTreeCode = \`class Solution { public int maxDepth(TreeNode root) { return 0; } }\`;`);

// 5. Invert Binary Tree
fs.writeFileSync('src/algorithms/invertBinaryTree.ts', `
import type { VisualizationStep } from './types'

export function invertBinaryTree(root: string): VisualizationStep[] {
  return [
    { codeLine: 2, message: 'Visit root', audioEvent: 'visit', elements: [{ type: 'tree', data: { nodes: [], rootId: null } }] },
    { codeLine: 5, message: 'Inverted!', audioEvent: 'success', elements: [{ type: 'tree', data: { nodes: [], rootId: null } }] }
  ]
}
`);
fs.writeFileSync('src/data/invertBinaryTreeCode.ts', `export const invertBinaryTreeCode = \`class Solution { public TreeNode invertTree(TreeNode root) { return null; } }\`;`);

// 6. Linked List Cycle
fs.writeFileSync('src/algorithms/linkedListCycle.ts', `
import type { VisualizationStep } from './types'

export function linkedListCycle(head: number[]): VisualizationStep[] {
  return [
    { codeLine: 2, message: 'Start pointers', audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: [], headId: null } }] },
    { codeLine: 5, message: 'Cycle check complete', audioEvent: 'success', elements: [{ type: 'linkedList', data: { nodes: [], headId: null } }] }
  ]
}
`);
fs.writeFileSync('src/data/linkedListCycleCode.ts', `export const linkedListCycleCode = \`class Solution { public boolean hasCycle(ListNode head) { return false; } }\`;`);

// 7. Min Stack
fs.writeFileSync('src/algorithms/minStack.ts', `
import type { VisualizationStep } from './types'

export function minStack(ops: string[]): VisualizationStep[] {
  return [
    { codeLine: 2, message: 'Push value', audioEvent: 'push', elements: [{ type: 'stack', data: { items: [] } }] },
    { codeLine: 5, message: 'Done', audioEvent: 'success', elements: [{ type: 'stack', data: { items: [] } }] }
  ]
}
`);
fs.writeFileSync('src/data/minStackCode.ts', `export const minStackCode = \`class MinStack { public MinStack() {} }\`;`);

// 8. Daily Temperatures
fs.writeFileSync('src/algorithms/dailyTemperatures.ts', `
import type { VisualizationStep } from './types'

export function dailyTemperatures(temps: number[]): VisualizationStep[] {
  return [
    { codeLine: 2, message: 'Start', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [] } }, { type: 'stack', data: { items: [] } }] },
    { codeLine: 5, message: 'Done', audioEvent: 'success', elements: [{ type: 'array', data: { values: [] } }] }
  ]
}
`);
fs.writeFileSync('src/data/dailyTemperaturesCode.ts', `export const dailyTemperaturesCode = \`class Solution { public int[] dailyTemperatures(int[] temps) { return new int[0]; } }\`;`);

// 9. Number of Islands
fs.writeFileSync('src/algorithms/numberOfIslands.ts', `
import type { VisualizationStep } from './types'

export function numberOfIslands(grid: string[]): VisualizationStep[] {
  return [
    { codeLine: 2, message: 'Scan matrix', audioEvent: 'visit', elements: [{ type: 'matrix', data: { rows: 1, cols: 1, cells: [] } }] },
    { codeLine: 5, message: 'Done', audioEvent: 'success', elements: [{ type: 'matrix', data: { rows: 1, cols: 1, cells: [] } }] }
  ]
}
`);
fs.writeFileSync('src/data/numberOfIslandsCode.ts', `export const numberOfIslandsCode = \`class Solution { public int numIslands(char[][] grid) { return 0; } }\`;`);

// 10. DFS
fs.writeFileSync('src/algorithms/dfs.ts', `
import type { VisualizationStep } from './types'

export function dfs(edges: string): VisualizationStep[] {
  return [
    { codeLine: 2, message: 'Start DFS', audioEvent: 'visit', elements: [{ type: 'graph', data: { nodes: [], edges: [] } }] },
    { codeLine: 5, message: 'Done', audioEvent: 'success', elements: [{ type: 'graph', data: { nodes: [], edges: [] } }] }
  ]
}
`);
fs.writeFileSync('src/data/dfsCode.ts', `export const dfsCode = \`class Solution { public void dfs() {} }\`;`);

