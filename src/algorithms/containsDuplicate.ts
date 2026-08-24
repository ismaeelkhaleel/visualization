import type { VisualizationStep } from './types'
export function containsDuplicate(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  const set = new Set<number>()
  steps.push({ codeLine: 2, message: 'Initialize hash set', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr] } }] })
  for (let i = 0; i < arr.length; i++) {
    steps.push({ codeLine: 3, message: `Check number ${arr[i].value}`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    if (set.has(arr[i].value)) {
      steps.push({ codeLine: 4, message: `Duplicate found: ${arr[i].value}`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
      return steps
    }
    set.add(arr[i].value)
    steps.push({ codeLine: 5, message: `Add ${arr[i].value} to set`, audioEvent: 'push', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'i',index:i,position:'top'}] } }] })
  }
  steps.push({ codeLine: 7, message: 'No duplicates found', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}