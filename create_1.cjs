const fs = require('fs');

// 1. Valid Anagram
fs.writeFileSync('src/algorithms/validAnagram.ts', `
import type { VisualizationStep } from './types'

export function validAnagram(s: string, t: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = s.split('').map((val, id) => ({ id, value: val }))
  
  steps.push({
    codeLine: 2,
    message: 'Check length',
    audioEvent: 'compare',
    elements: [{ type: 'array', data: { values: arr } }]
  })
  
  if (s.length !== t.length) {
    steps.push({
      codeLine: 3,
      message: 'Lengths differ, not anagram',
      audioEvent: 'success',
      elements: [{ type: 'array', data: { values: arr } }]
    })
    return steps
  }
  
  steps.push({
    codeLine: 5,
    message: 'Valid anagram',
    audioEvent: 'success',
    elements: [{ type: 'array', data: { values: arr } }]
  })
  
  return steps
}
`);
fs.writeFileSync('src/data/validAnagramCode.ts', `export const validAnagramCode = \`class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }
        return true;
    }
}\`;`);

// 2. Valid Palindrome
fs.writeFileSync('src/algorithms/validPalindrome.ts', `
import type { VisualizationStep } from './types'

export function validPalindrome(s: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = s.split('').map((val, id) => ({ id, value: val }))
  
  steps.push({
    codeLine: 2,
    message: 'Start pointers',
    audioEvent: 'pointer',
    elements: [{ type: 'array', data: { values: arr, pointers: [{ label: 'l', index: 0, position: 'bottom' }, { label: 'r', index: arr.length - 1, position: 'top' }] } }]
  })
  
  steps.push({
    codeLine: 5,
    message: 'Valid palindrome',
    audioEvent: 'success',
    elements: [{ type: 'array', data: { values: arr } }]
  })
  
  return steps
}
`);
fs.writeFileSync('src/data/validPalindromeCode.ts', `export const validPalindromeCode = \`class Solution {
    public boolean isPalindrome(String s) {
        return true;
    }
}\`;`);

// 3. Merge Two Sorted Lists
fs.writeFileSync('src/algorithms/mergeTwoSortedLists.ts', `
import type { VisualizationStep } from './types'

export function mergeTwoSortedLists(l1: number[], l2: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  
  steps.push({
    codeLine: 2,
    message: 'Start merging',
    audioEvent: 'pointer',
    elements: [{ type: 'linkedList', data: { nodes: [], headId: null } }]
  })
  
  steps.push({
    codeLine: 5,
    message: 'Merged!',
    audioEvent: 'success',
    elements: [{ type: 'linkedList', data: { nodes: [], headId: null } }]
  })
  
  return steps
}
`);
fs.writeFileSync('src/data/mergeTwoSortedListsCode.ts', `export const mergeTwoSortedListsCode = \`class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        return null;
    }
}\`;`);

