import type { VisualizationStep } from './types'
export function validAnagram(s: string, t: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const sArr = s.split('').map((v, i) => ({ id: i, value: v }))
  const tArr = t.split('').map((v, i) => ({ id: i + 100, value: v }))
  steps.push({ codeLine: 2, message: 'Compare string lengths', audioEvent: 'compare', elements: [{ type: 'array', data: { values: sArr } }, { type: 'array', data: { values: tArr } }] })
  if (s.length !== t.length) {
    steps.push({ codeLine: 3, message: 'Lengths differ, not an anagram', audioEvent: 'success', elements: [{ type: 'array', data: { values: sArr } }, { type: 'array', data: { values: tArr } }] })
    return steps
  }
  let counts: Record<string, number> = {}
  for (let i = 0; i < s.length; i++) {
    steps.push({ codeLine: 5, message: `Check chars at index ${i}: ${s[i]} & ${t[i]}`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: sArr, highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'array', data: { values: tArr, highlights: [i], pointers: [{label:'i',index:i,position:'bottom'}] } }] })
    counts[s[i]] = (counts[s[i]] || 0) + 1
    counts[t[i]] = (counts[t[i]] || 0) - 1
    steps.push({ codeLine: 6, message: 'Update frequency map', audioEvent: 'push', elements: [{ type: 'array', data: { values: sArr, highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'array', data: { values: tArr, highlights: [i], pointers: [{label:'i',index:i,position:'bottom'}] } }] })
  }
  steps.push({ codeLine: 9, message: 'Verify all frequencies are zero', audioEvent: 'compare', elements: [{ type: 'array', data: { values: sArr } }] })
  for (const c in counts) {
    if (counts[c] !== 0) {
      steps.push({ codeLine: 10, message: `Frequency mismatch for '${c}'`, audioEvent: 'success', elements: [{ type: 'array', data: { values: sArr } }] })
      return steps
    }
  }
  steps.push({ codeLine: 12, message: 'Valid Anagram!', audioEvent: 'success', elements: [{ type: 'array', data: { values: sArr } }] })
  return steps
}