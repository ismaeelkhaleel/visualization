import type { VisualizationStep, TreeNode } from './types'
export function invertBinaryTree(rootVal: string): VisualizationStep[] {
  console.log(rootVal);
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
    steps.push({ codeLine: 2, message: `Visit node ${node.value}`, audioEvent: 'visit', elements: [{ type: 'tree', data: { nodes: JSON.parse(JSON.stringify(nodes)), rootId: '1', pointers: [{label:'curr', nodeId:nodeId}] } }] })
    
    dfs(node.leftId)
    dfs(node.rightId)
    
    steps.push({ codeLine: 7, message: `Swapping children of ${node.value}`, audioEvent: 'compare', elements: [{ type: 'tree', data: { nodes: JSON.parse(JSON.stringify(nodes)), rootId: '1', pointers: [{label:'curr', nodeId:nodeId}] } }] })
    
    const temp = node.leftId
    node.leftId = node.rightId
    node.rightId = temp
    
    steps.push({ codeLine: 8, message: `Children of ${node.value} swapped`, audioEvent: 'swap', elements: [{ type: 'tree', data: { nodes: JSON.parse(JSON.stringify(nodes)), rootId: '1', pointers: [{label:'curr', nodeId:nodeId}] } }] })
  }
  
  dfs('1')
  
  steps.push({ codeLine: 10, message: 'Inversion complete', audioEvent: 'success', elements: [{ type: 'tree', data: { nodes: JSON.parse(JSON.stringify(nodes)), rootId: '1' } }] })
  return steps
}