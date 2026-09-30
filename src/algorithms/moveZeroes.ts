import type { VisualizationStep } from './types'
export function moveZeroes(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  let write = 0
  for (let read = 0; read < arr.length; read++) {
    steps.push({ codeLine: 4, message: 'Scan index ' + read, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [read, write], secondaryHighlights: Array.from({ length: write }, (_, i) => i), pointers: [{label:'read',index:read,position:'top'},{label:'write',index:write,position:'bottom'}], metrics: [{ label: 'read', value: read, tone: 'active' }, { label: 'write', value: write, tone: 'success' }] } }] })
    if (arr[read].value !== 0) {
      if (read !== write) {
        let temp = arr[write]; arr[write] = arr[read]; arr[read] = temp;
        steps.push({ codeLine: 6, message: 'Lift and move non-zero to write slot', audioEvent: 'swap', elements: [{ type: 'array', data: { values: [...arr], highlights: [read, write], secondaryHighlights: Array.from({ length: write + 1 }, (_, i) => i), swap: { from: read, to: write }, pointers: [{label:'read',index:read,position:'top'},{label:'write',index:write,position:'bottom'}], metrics: [{ label: 'moved', value: arr[write].value, tone: 'success' }] } }] })
      }
      write++;
      steps.push({ codeLine: 7, message: 'Advance write pointer', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [Math.min(read, arr.length - 1), Math.min(write, arr.length - 1)], secondaryHighlights: Array.from({ length: write }, (_, i) => i), pointers: [{label:'read',index:read,position:'top'},{label:'write',index:Math.min(write, arr.length - 1),position:'bottom'}], metrics: [{ label: 'write', value: write, tone: 'success' }] } }] })
    }
  }
  steps.push({ codeLine: 10, message: 'Zeroes moved to the end', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: Array.from({ length: arr.length }, (_, i) => i), metrics: [{ label: 'non-zero', value: write, tone: 'success' }] } }] })
  return steps
}
