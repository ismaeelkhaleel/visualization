import type { VisualizationStep } from './types'
export function reverseString(sArr: string[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = sArr.map((v, i) => ({ id: i, value: v }))
  let left = 0, right = arr.length - 1
  steps.push({ codeLine: 2, message: 'Initialize two pointers', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
  while (left < right) {
    steps.push({ codeLine: 5, message: `Swap ${arr[left].value} and ${arr[right].value}`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    let temp = arr[left]; arr[left] = arr[right]; arr[right] = temp;
    steps.push({ codeLine: 7, message: 'Swapped', audioEvent: 'swap', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    left++; right--;
    steps.push({ codeLine: 9, message: 'Move pointers inward', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
  }
  steps.push({ codeLine: 12, message: 'Reverse complete', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}