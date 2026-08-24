import type { VisualizationStep } from './types'
export function binarySearch(nums: number[], target: number): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  let left = 0, right = arr.length - 1
  steps.push({ codeLine: 2, message: 'Initialize bounds', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    steps.push({ codeLine: 4, message: `Check middle element at index ${mid}`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [mid], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'},{label:'mid',index:mid,position:'top'}] } }] })
    if (arr[mid].value === target) {
      steps.push({ codeLine: 5, message: 'Found target at index ' + mid, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [mid], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'},{label:'mid',index:mid,position:'top'}] } }] })
      return steps
    } else if (arr[mid].value < target) {
      left = mid + 1
      steps.push({ codeLine: 6, message: 'Target is greater, move left bound', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    } else {
      right = mid - 1
      steps.push({ codeLine: 7, message: 'Target is smaller, move right bound', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    }
  }
  steps.push({ codeLine: 9, message: 'Target not found', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}