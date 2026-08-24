import type { VisualizationStep, LinkedListNode } from './types'
export function linkedListCycle(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  if (nums.length === 0) return []
  
  const nodes: LinkedListNode[] = nums.map((v, i) => ({ id: i.toString(), value: v, nextId: (i < nums.length - 1) ? (i + 1).toString() : null }))
  // create cycle to last node if not empty for visualization purposes since input is an array, we'll link last node to index 1 if possible
  if (nodes.length > 2) {
    nodes[nodes.length - 1].nextId = '1'
  }
  
  let slow: string | null = '0'
  let fast: string | null = nodes[0].nextId
  
  steps.push({ codeLine: 3, message: 'Initialize slow and fast pointers', audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0', pointers: [{label:'slow', nodeId:slow}, ...(fast ? [{label:'fast', nodeId:fast}] : [])] } }] })
  
  while (slow !== fast) {
    if (!fast) {
      steps.push({ codeLine: 7, message: 'Fast reached end, no cycle', audioEvent: 'success', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0' } }] })
      return steps
    }
    const fastNode = nodes.find(n => n.id === fast)!
    if (!fastNode.nextId) {
      steps.push({ codeLine: 7, message: 'Fast reached end, no cycle', audioEvent: 'success', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0' } }] })
      return steps
    }
    
    steps.push({ codeLine: 6, message: `Check slow != fast`, audioEvent: 'compare', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0', pointers: [{label:'slow', nodeId:slow}, {label:'fast', nodeId:fast}] } }] })
    
    const slowNode = nodes.find(n => n.id === slow)!
    slow = slowNode.nextId
    fast = nodes.find(n => n.id === fastNode.nextId)!.nextId
    
    steps.push({ codeLine: 10, message: `Advance slow by 1, fast by 2`, audioEvent: 'move', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0', pointers: [{label:'slow', nodeId:slow}, ...(fast ? [{label:'fast', nodeId:fast}] : [])] } }] })
  }
  
  steps.push({ codeLine: 12, message: 'Slow met Fast! Cycle detected!', audioEvent: 'match', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0', pointers: [{label:'slow/fast', nodeId:slow}] } }] })
  return steps
}