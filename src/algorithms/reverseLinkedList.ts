import type { VisualizationStep, LinkedListNode } from './types'
export function reverseLinkedList(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  if (nums.length === 0) return []
  
  const nodes: LinkedListNode[] = nums.map((v, i) => ({ id: i.toString(), value: v, nextId: (i < nums.length - 1) ? (i + 1).toString() : null }))
  let prev: string | null = null
  let curr: string | null = '0'
  
  steps.push({ codeLine: 2, message: 'Initialize prev = null, curr = head', audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: curr, pointers: [{label:'curr', nodeId:curr}] } }] })
  
  while (curr) {
    const currNode = nodes.find(n => n.id === curr)!
    const next = currNode.nextId
    steps.push({ codeLine: 5, message: `Save next node`, audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: curr, pointers: [{label:'curr', nodeId:curr}, ...(next ? [{label:'next', nodeId:next}] : []), ...(prev ? [{label:'prev', nodeId:prev}] : [])] } }] })
    
    currNode.nextId = prev
    steps.push({ codeLine: 6, message: `Reverse curr.nextId pointer to prev`, audioEvent: 'swap', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: prev || curr, pointers: [{label:'curr', nodeId:curr}, ...(next ? [{label:'next', nodeId:next}] : []), ...(prev ? [{label:'prev', nodeId:prev}] : [])] } }] })
    
    prev = curr
    curr = next
    steps.push({ codeLine: 8, message: `Advance prev and curr`, audioEvent: 'move', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: prev, pointers: [...(curr ? [{label:'curr', nodeId:curr}] : []), ...(prev ? [{label:'prev', nodeId:prev}] : [])] } }] })
  }
  
  steps.push({ codeLine: 11, message: 'Reversal complete', audioEvent: 'success', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: prev } }] })
  return steps
}