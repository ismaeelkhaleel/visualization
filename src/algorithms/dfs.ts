import type { VisualizationStep, GraphNode, GraphEdge } from './types'
export function dfs(inputStr: string): VisualizationStep[] {
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
  
  steps.push({ codeLine: 2, message: 'Start DFS from A', audioEvent: 'pointer', elements: [{ type: 'graph', data: { nodes, edges, highlights: [] } }] })
  
  function recurse(curr: string) {
    steps.push({ codeLine: 3, message: `Visit ${curr}`, audioEvent: 'visit', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}] } }] })
    if (visited.has(curr)) {
      steps.push({ codeLine: 3, message: `${curr} already visited`, audioEvent: 'skip', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}] } }] })
      return
    }
    visited.add(curr)
    steps.push({ codeLine: 4, message: `Mark ${curr} visited`, audioEvent: 'match', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited), pointers: [{label:'curr', nodeId:curr}] } }] })
    
    const neighbors = edges.filter(e => e.from === curr).map(e => e.to).concat(edges.filter(e => e.to === curr).map(e => e.from))
    for (const neighbor of neighbors) {
      recurse(neighbor)
    }
  }
  
  recurse('A')
  
  steps.push({ codeLine: 8, message: 'DFS complete', audioEvent: 'success', elements: [{ type: 'graph', data: { nodes, edges, highlights: Array.from(visited) } }] })
  return steps
}