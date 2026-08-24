import type { VisualizationStep, TreeNode } from './types'
export function maxDepthBinaryTree(rootVal: string): VisualizationStep[] {
  console.log(rootVal);
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
    steps.push({ codeLine: 2, message: `Visit node ${node.value}, depth: ${depth}`, audioEvent: 'visit', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: [{label:'curr', nodeId:nodeId}] } }] })
    dfs(node.leftId, depth + 1)
    dfs(node.rightId, depth + 1)
    steps.push({ codeLine: 7, message: `Return from node ${node.value}`, audioEvent: 'match', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: [{label:'curr', nodeId:nodeId}] } }] })
    return 1
  }
  
  dfs('1', 1)
  
  steps.push({ codeLine: 8, message: 'Max depth calculated', audioEvent: 'success', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1' } }] })
  return steps
}