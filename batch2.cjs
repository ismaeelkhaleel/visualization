const fs = require('fs');

function write(name, code, algo) {
  const codeLines = code.split('\n').map(l => "  '" + l.replace(/'/g, "\\'") + "',").join('\n');
  fs.writeFileSync('src/data/' + name + 'Code.ts', "export const " + name + "Code = [\n" + codeLines + "\n]\n");
  fs.writeFileSync('src/algorithms/' + name + '.ts', algo);
}

write('containsDuplicate',
`class Solution {
    public boolean containsDuplicate(int[] nums) {
        HashSet<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (set.contains(num)) return true;
            set.add(num);
        }
        return false;
    }
}`,
`import type { VisualizationStep } from './types'
export function containsDuplicate(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  const set = new Set<number>()
  steps.push({ codeLine: 2, message: 'Initialize hash set', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr] } }] })
  for (let i = 0; i < arr.length; i++) {
    steps.push({ codeLine: 3, message: \`Check number \${arr[i].value}\`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    if (set.has(arr[i].value)) {
      steps.push({ codeLine: 4, message: \`Duplicate found: \${arr[i].value}\`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
      return steps
    }
    set.add(arr[i].value)
    steps.push({ codeLine: 5, message: \`Add \${arr[i].value} to set\`, audioEvent: 'push', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'i',index:i,position:'top'}] } }] })
  }
  steps.push({ codeLine: 7, message: 'No duplicates found', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}`);

write('maxSubArray',
`class Solution {
    public int maxSubArray(int[] nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
`import type { VisualizationStep } from './types'
export function maxSubArray(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  if (nums.length === 0) return []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  let currentSum = arr[0].value
  let maxSum = arr[0].value
  steps.push({ codeLine: 2, message: \`Init sums to \${arr[0].value}\`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [0], pointers: [{label:'i',index:0,position:'top'}] } }] })
  for (let i = 1; i < arr.length; i++) {
    steps.push({ codeLine: 4, message: \`Check element \${arr[i].value}\`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    if (currentSum + arr[i].value < arr[i].value) {
      currentSum = arr[i].value
      steps.push({ codeLine: 5, message: \`Restart sum at \${arr[i].value}\`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    } else {
      currentSum += arr[i].value
      steps.push({ codeLine: 5, message: \`Extend sum to \${currentSum}\`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    }
    if (currentSum > maxSum) {
      maxSum = currentSum
      steps.push({ codeLine: 6, message: \`New max sum: \${maxSum}\`, audioEvent: 'match', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    }
  }
  steps.push({ codeLine: 8, message: \`Final max sum: \${maxSum}\`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}`);

write('mergeSortedArray',
`class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m - 1;
        int j = n - 1;
        int k = m + n - 1;
        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) {
                nums1[k--] = nums1[i--];
            } else {
                nums1[k--] = nums2[j--];
            }
        }
    }
}`,
`import type { VisualizationStep } from './types'
export function mergeSortedArray(nums1: number[], m: number, nums2: number[], n: number): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr1 = nums1.map((v, i) => ({ id: i, value: v }))
  const arr2 = nums2.map((v, i) => ({ id: i + 100, value: v }))
  let i = m - 1, j = n - 1, k = m + n - 1
  steps.push({ codeLine: 2, message: 'Initialize pointers at ends', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr1] } }, { type: 'array', data: { values: [...arr2] } }] })
  while (j >= 0) {
    if (i >= 0 && arr1[i].value > arr2[j].value) {
      steps.push({ codeLine: 6, message: \`Compare \${arr1[i].value} > \${arr2[j].value}\`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr1], highlights: [i, k] } }, { type: 'array', data: { values: [...arr2], highlights: [j] } }] })
      arr1[k] = { ...arr1[i], id: k }
      steps.push({ codeLine: 7, message: \`Move \${arr1[i].value} to end\`, audioEvent: 'swap', elements: [{ type: 'array', data: { values: [...arr1], highlights: [k] } }] })
      i--; k--;
    } else {
      steps.push({ codeLine: 6, message: \`Compare \${i>=0?arr1[i].value:'none'} <= \${arr2[j].value}\`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr1], highlights: [i, k] } }, { type: 'array', data: { values: [...arr2], highlights: [j] } }] })
      arr1[k] = { ...arr2[j], id: k }
      steps.push({ codeLine: 9, message: \`Move \${arr2[j].value} to end\`, audioEvent: 'swap', elements: [{ type: 'array', data: { values: [...arr1], highlights: [k] } }] })
      j--; k--;
    }
  }
  steps.push({ codeLine: 12, message: 'Merge complete', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr1] } }] })
  return steps
}`);

write('reverseString',
`class Solution {
    public void reverseString(char[] s) {
        int left = 0;
        int right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
}`,
`import type { VisualizationStep } from './types'
export function reverseString(sArr: string[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = sArr.map((v, i) => ({ id: i, value: v }))
  let left = 0, right = arr.length - 1
  steps.push({ codeLine: 2, message: 'Initialize two pointers', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
  while (left < right) {
    steps.push({ codeLine: 5, message: \`Swap \${arr[left].value} and \${arr[right].value}\`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    let temp = arr[left]; arr[left] = arr[right]; arr[right] = temp;
    steps.push({ codeLine: 7, message: 'Swapped', audioEvent: 'swap', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    left++; right--;
    steps.push({ codeLine: 9, message: 'Move pointers inward', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
  }
  steps.push({ codeLine: 12, message: 'Reverse complete', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}`);

write('validAnagram',
`class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        for (int count : counts) {
            if (count != 0) return false;
        }
        return true;
    }
}`,
`import type { VisualizationStep } from './types'
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
    steps.push({ codeLine: 5, message: \`Check chars at index \${i}: \${s[i]} & \${t[i]}\`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: sArr, highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'array', data: { values: tArr, highlights: [i], pointers: [{label:'i',index:i,position:'bottom'}] } }] })
    counts[s[i]] = (counts[s[i]] || 0) + 1
    counts[t[i]] = (counts[t[i]] || 0) - 1
    steps.push({ codeLine: 6, message: 'Update frequency map', audioEvent: 'push', elements: [{ type: 'array', data: { values: sArr, highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'array', data: { values: tArr, highlights: [i], pointers: [{label:'i',index:i,position:'bottom'}] } }] })
  }
  steps.push({ codeLine: 9, message: 'Verify all frequencies are zero', audioEvent: 'compare', elements: [{ type: 'array', data: { values: sArr } }] })
  for (const c in counts) {
    if (counts[c] !== 0) {
      steps.push({ codeLine: 10, message: \`Frequency mismatch for '\${c}'\`, audioEvent: 'success', elements: [{ type: 'array', data: { values: sArr } }] })
      return steps
    }
  }
  steps.push({ codeLine: 12, message: 'Valid Anagram!', audioEvent: 'success', elements: [{ type: 'array', data: { values: sArr } }] })
  return steps
}`);

write('validPalindrome',
`class Solution {
    public boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,
`import type { VisualizationStep } from './types'
export function validPalindrome(s: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = s.split('').map((v, i) => ({ id: i, value: v }))
  let left = 0, right = arr.length - 1
  steps.push({ codeLine: 2, message: 'Initialize two pointers', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
  while (left < right) {
    steps.push({ codeLine: 5, message: \`Compare \${arr[left].value} with \${arr[right].value}\`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    if (arr[left].value.toLowerCase() !== arr[right].value.toLowerCase()) {
      steps.push({ codeLine: 6, message: 'Mismatch found, not a palindrome', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
      return steps
    }
    steps.push({ codeLine: 8, message: 'Characters match, move inwards', audioEvent: 'match', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
    left++; right--;
  }
  steps.push({ codeLine: 11, message: 'Valid Palindrome!', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}`);

