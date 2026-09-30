import type { VisualizationStep } from './types'
export function twoSum(nums: number[], target: number): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  let left = 0, right = arr.length - 1
  steps.push({ codeLine: 3, message: 'Initialize left and right pointers', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'L',index:left,position:'top'},{label:'R',index:right,position:'bottom'}], metrics: [{ label: 'target', value: target, tone: 'active' }] } }] })
  while (left < right) {
    const sum = arr[left].value + arr[right].value
    steps.push({ codeLine: 5, message: `Check ${arr[left].value} + ${arr[right].value} = ${sum}`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'L',index:left,position:'top'},{label:'R',index:right,position:'bottom'}], metrics: [{ label: 'sum', value: sum, tone: sum === target ? 'success' : 'compare' }, { label: 'target', value: target, tone: 'active' }] } }] })
    if (sum === target) {
      steps.push({ codeLine: 6, message: 'Found the target pair', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'L',index:left,position:'top'},{label:'R',index:right,position:'bottom'}], metrics: [{ label: 'answer', value: `${left}, ${right}`, tone: 'success' }] } }] })
      return steps
    } else if (sum < target) {
      left++
      steps.push({ codeLine: 7, message: 'Sum too small, move left inward', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], disabledIndices: Array.from({ length: left }, (_, i) => i), pointers: [{label:'L',index:left,position:'top'},{label:'R',index:right,position:'bottom'}], metrics: [{ label: 'sum', value: sum, tone: 'warning' }, { label: 'target', value: target, tone: 'active' }] } }] })
    } else {
      right--
      steps.push({ codeLine: 8, message: 'Sum too large, move right inward', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], disabledIndices: Array.from({ length: arr.length - right - 1 }, (_, i) => right + 1 + i), pointers: [{label:'L',index:left,position:'top'},{label:'R',index:right,position:'bottom'}], metrics: [{ label: 'sum', value: sum, tone: 'warning' }, { label: 'target', value: target, tone: 'active' }] } }] })
    }
  }
  steps.push({ codeLine: 10, message: 'No pair found', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], metrics: [{ label: 'answer', value: 'none', tone: 'warning' }] } }] })
  return steps
}
