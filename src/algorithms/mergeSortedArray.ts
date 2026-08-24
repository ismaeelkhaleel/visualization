import type { VisualizationStep } from './types'
export function mergeSortedArray(nums1: number[], m: number, nums2: number[], n: number): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr1 = nums1.map((v, i) => ({ id: i, value: v }))
  const arr2 = nums2.map((v, i) => ({ id: i + 100, value: v }))
  let i = m - 1, j = n - 1, k = m + n - 1
  steps.push({ codeLine: 2, message: 'Initialize pointers at ends', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr1] } }, { type: 'array', data: { values: [...arr2] } }] })
  while (j >= 0) {
    if (i >= 0 && arr1[i].value > arr2[j].value) {
      steps.push({ codeLine: 6, message: `Compare ${arr1[i].value} > ${arr2[j].value}`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr1], highlights: [i, k] } }, { type: 'array', data: { values: [...arr2], highlights: [j] } }] })
      arr1[k] = { ...arr1[i], id: k }
      steps.push({ codeLine: 7, message: `Move ${arr1[i].value} to end`, audioEvent: 'swap', elements: [{ type: 'array', data: { values: [...arr1], highlights: [k] } }] })
      i--; k--;
    } else {
      steps.push({ codeLine: 6, message: `Compare ${i>=0?arr1[i].value:'none'} <= ${arr2[j].value}`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr1], highlights: [i, k] } }, { type: 'array', data: { values: [...arr2], highlights: [j] } }] })
      arr1[k] = { ...arr2[j], id: k }
      steps.push({ codeLine: 9, message: `Move ${arr2[j].value} to end`, audioEvent: 'swap', elements: [{ type: 'array', data: { values: [...arr1], highlights: [k] } }] })
      j--; k--;
    }
  }
  steps.push({ codeLine: 12, message: 'Merge complete', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr1] } }] })
  return steps
}