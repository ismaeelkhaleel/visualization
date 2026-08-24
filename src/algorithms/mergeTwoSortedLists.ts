import type { VisualizationStep, LinkedListNode } from './types'
export function mergeTwoSortedLists(l1: number[], l2: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  
    const nodes: LinkedListNode[] = [
    { id: 'dummy', value: -1, nextId: null }
  ]
  const list1Nodes: string[] = []
  for (let i = 0; i < l1.length; i++) {
    const nid = 'l1_' + i; list1Nodes.push(nid)
    nodes.push({ id: nid, value: l1[i], nextId: (i < l1.length - 1) ? 'l1_' + (i + 1) : null })
  }
  const list2Nodes: string[] = []
  for (let i = 0; i < l2.length; i++) {
    const nid = 'l2_' + i; list2Nodes.push(nid)
    nodes.push({ id: nid, value: l2[i], nextId: (i < l2.length - 1) ? 'l2_' + (i + 1) : null })
  }
  
  let p1 = list1Nodes[0] || null
  let p2 = list2Nodes[0] || null
  let curr = 'dummy'
  
  steps.push({ codeLine: 2, message: 'Initialize dummy node and pointers', audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, ...(p1 ? [{label:'l1', nodeId:p1}] : []), ...(p2 ? [{label:'l2', nodeId:p2}] : [])] } }] })
  
  while (p1 && p2) {
    const n1 = nodes.find(n => n.id === p1)!
    const n2 = nodes.find(n => n.id === p2)!
    steps.push({ codeLine: 5, message: `Compare ${n1.value} and ${n2.value}`, audioEvent: 'compare', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, {label:'l1', nodeId:p1}, {label:'l2', nodeId:p2}] } }] })
    
    const currNode = nodes.find(n => n.id === curr)!
    if (n1.value as number <= (n2.value as number)) {
      currNode.nextId = p1
      steps.push({ codeLine: 6, message: `Link current to ${n1.value}`, audioEvent: 'swap', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, {label:'l1', nodeId:p1}, {label:'l2', nodeId:p2}] } }] })
      p1 = n1.nextId
      steps.push({ codeLine: 7, message: 'Advance l1', audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, ...(p1 ? [{label:'l1', nodeId:p1}] : []), {label:'l2', nodeId:p2}] } }] })
    } else {
      currNode.nextId = p2
      steps.push({ codeLine: 9, message: `Link current to ${n2.value}`, audioEvent: 'swap', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, {label:'l1', nodeId:p1}, {label:'l2', nodeId:p2}] } }] })
      p2 = n2.nextId
      steps.push({ codeLine: 10, message: 'Advance l2', audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, {label:'l1', nodeId:p1}, ...(p2 ? [{label:'l2', nodeId:p2}] : [])] } }] })
    }
    curr = currNode.nextId!
  }
  
  const currNode = nodes.find(n => n.id === curr)!
  currNode.nextId = p1 || p2
  steps.push({ codeLine: 14, message: 'Link remaining list', audioEvent: 'success', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy' } }] })
  return steps
}