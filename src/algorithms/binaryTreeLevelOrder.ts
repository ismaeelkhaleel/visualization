import type { VisualizationStep, TreeNode } from './types'
export function binaryTreeLevelOrder(rootVal: string): VisualizationStep[] {
  console.log(rootVal);
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
    steps.push({ codeLine: 7, message: `Level size: ${size}`, audioEvent: 'compare', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: q.map(id => ({label:'in-q', nodeId:id})) } }] })
    for (let i = 0; i < size; i++) {
      const curr = q.shift()!
      const node = nodes.find(n => n.id === curr)!
      steps.push({ codeLine: 10, message: `Poll node ${node.value}`, audioEvent: 'visit', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: [{label:'curr', nodeId:curr}] } }] })
      
      if (node.leftId) {
        q.push(node.leftId)
        steps.push({ codeLine: 12, message: `Enqueue left child ${nodes.find(n=>n.id===node.leftId)!.value}`, audioEvent: 'enqueue', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: [{label:'curr', nodeId:curr}, {label:'q', nodeId:node.leftId}] } }] })
      }
      if (node.rightId) {
        q.push(node.rightId)
        steps.push({ codeLine: 13, message: `Enqueue right child ${nodes.find(n=>n.id===node.rightId)!.value}`, audioEvent: 'enqueue', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1', pointers: [{label:'curr', nodeId:curr}, {label:'q', nodeId:node.rightId}] } }] })
      }
    }
  }
  
  steps.push({ codeLine: 17, message: 'Traversal complete', audioEvent: 'success', elements: [{ type: 'tree', data: { nodes: [...nodes], rootId: '1' } }] })
  return steps
}