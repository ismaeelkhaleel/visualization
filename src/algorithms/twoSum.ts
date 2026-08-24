import type { VisualizationStep } from './types'
export function twoSum(nums: number[], target: number): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  let left = 0, right = arr.length - 1
  steps.push({ codeLine: 2, message: 'Initialize two pointers', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
  while (left < right) {
    const sum = arr[left].value + arr[right].value
    steps.push({ codeLine: 4, message: `Check sum: ${arr[left].value} + ${arr[right].value} = ${sum}`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    if (sum === target) {
      steps.push({ codeLine: 5, message: 'Found target sum!', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
      return steps
    } else if (sum < target) {
      left++
      steps.push({ codeLine: 6, message: 'Sum too small, move left pointer', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    } else {
      right--
      steps.push({ codeLine: 7, message: 'Sum too large, move right pointer', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    }
  }
  steps.push({ codeLine: 9, message: 'No pair found', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}