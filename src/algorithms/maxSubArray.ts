import type { VisualizationStep } from './types'
export function maxSubArray(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  if (nums.length === 0) return []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  let currentSum = arr[0].value
  let maxSum = arr[0].value
  steps.push({ codeLine: 2, message: `Init sums to ${arr[0].value}`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [0], pointers: [{label:'i',index:0,position:'top'}] } }] })
  for (let i = 1; i < arr.length; i++) {
    steps.push({ codeLine: 4, message: `Check element ${arr[i].value}`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    if (currentSum + arr[i].value < arr[i].value) {
      currentSum = arr[i].value
      steps.push({ codeLine: 5, message: `Restart sum at ${arr[i].value}`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    } else {
      currentSum += arr[i].value
      steps.push({ codeLine: 5, message: `Extend sum to ${currentSum}`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    }
    if (currentSum > maxSum) {
      maxSum = currentSum
      steps.push({ codeLine: 6, message: `New max sum: ${maxSum}`, audioEvent: 'match', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    }
  }
  steps.push({ codeLine: 8, message: `Final max sum: ${maxSum}`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}