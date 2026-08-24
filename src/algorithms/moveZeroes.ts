import type { VisualizationStep } from './types'
export function moveZeroes(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  let write = 0
  for (let read = 0; read < arr.length; read++) {
    steps.push({ codeLine: 3, message: 'Scan index ' + read, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [read, write], pointers: [{label:'read',index:read,position:'top'},{label:'write',index:write,position:'bottom'}] } }] })
    if (arr[read].value !== 0) {
      if (read !== write) {
        let temp = arr[write]; arr[write] = arr[read]; arr[read] = temp;
        steps.push({ codeLine: 5, message: 'Swap non-zero to write pointer', audioEvent: 'swap', elements: [{ type: 'array', data: { values: [...arr], highlights: [read, write], pointers: [{label:'read',index:read,position:'top'},{label:'write',index:write,position:'bottom'}] } }] })
      }
      write++;
      steps.push({ codeLine: 6, message: 'Increment write pointer', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [read, write], pointers: [{label:'read',index:read,position:'top'},{label:'write',index:write,position:'bottom'}] } }] })
    }
  }
  steps.push({ codeLine: 8, message: 'Done', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}