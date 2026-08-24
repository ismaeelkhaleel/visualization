import type { VisualizationStep } from './types'
export function validPalindrome(s: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = s.split('').map((v, i) => ({ id: i, value: v }))
  let left = 0, right = arr.length - 1
  steps.push({ codeLine: 2, message: 'Initialize two pointers', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
  while (left < right) {
    steps.push({ codeLine: 5, message: `Compare ${arr[left].value} with ${arr[right].value}`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    if (arr[left].value.toLowerCase() !== arr[right].value.toLowerCase()) {
      steps.push({ codeLine: 6, message: 'Mismatch found, not a palindrome', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
      return steps
    }
    steps.push({ codeLine: 8, message: 'Characters match, move inwards', audioEvent: 'match', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    left++; right--;
  }
  steps.push({ codeLine: 11, message: 'Valid Palindrome!', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}