import type { VisualizationStep, GraphNode, GraphEdge } from './types'
export function graphBFS(inputStr: string): VisualizationStep[] {
  console.log(inputStr);
  const steps: VisualizationStep[] = []
  const nodes: GraphNode[] = [
    { id: 'A', value: 'A' },
    { id: 'B', value: 'B' },
    { id: 'C', value: 'C' },
    { id: 'D', value: 'D' }
  ]
  const edges: GraphEdge[] = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'C', to: 'D' }
  ]
  
  const visited = new Set<string>()
  const q: string[] = ['A']
  visited.add('A')
  
  steps.push({ codeLine: 4, message: 'Initialize queue and visited set', audioEvent: 'pointer', elements: [{ type: 'graph', data: { nodes, edges, highlights: ['A'] } }] })
  
  while(q.length > 0) {
    const curr = q.shift()!
    steps.push({ codeLine: 7, message: `Dequeue ${curr}`, audioEvent: 'visit', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}] } }] })
    
    const neighbors = edges.filter(e => e.from === curr).map(e => e.to).concat(edges.filter(e => e.to === curr).map(e => e.from))
    for (const neighbor of neighbors) {
      steps.push({ codeLine: 8, message: `Check neighbor ${neighbor}`, audioEvent: 'compare', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}, {label:'neighbor', nodeId:neighbor}] } }] })
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        q.push(neighbor)
        steps.push({ codeLine: 10, message: `Enqueue and mark ${neighbor} visited`, audioEvent: 'enqueue', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}, {label:'q', nodeId:neighbor}] } }] })
      } else {
        steps.push({ codeLine: 10, message: `${neighbor} is already visited`, audioEvent: 'skip', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}] } }] })
      }
    }
  }
  
  steps.push({ codeLine: 15, message: 'BFS complete', audioEvent: 'success', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited) } }] })
  return steps
}