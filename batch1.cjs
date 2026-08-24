const fs = require('fs');

function write(name, code, algo) {
  const codeLines = code.split('\n').map(l => "  '" + l.replace(/'/g, "\\'") + "',").join('\n');
  fs.writeFileSync('src/data/' + name + 'Code.ts', "export const " + name + "Code = [\n" + codeLines + "\n]\n");
  fs.writeFileSync('src/algorithms/' + name + '.ts', algo);
}

write('moveZeroes',
`class Solution {
    public void moveZeroes(int[] nums) {
        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != 0) {
                swap(nums, read, write);
                write++;
            }
        }
    }
}`,
`import type { VisualizationStep, ArrayItem } from './types'
export function moveZeroes(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  let write = 0
  for (let read = 0; read < arr.length; read++) {
    steps.push({ codeLine: 3, message: 'Scan index ' + read, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [read, write], pointers: [{label:'read',index:read,position:'top'},{label:'write',index:write,position:'bottom'}] } }] })
    if (arr[read].value !== 0) {
      if (read !== write) {
        let temp = arr[write]; arr[write] = arr[read]; arr[read] = temp;
        steps.push({ codeLine: 5, message: 'Swap non-zero to write pointer', audioEvent: 'swap', elements: [{ type: 'array', data: { values: [...arr], highlights: [read, write], pointers: [{label:'read',index:read,position:'top'},{label:'write',index:write,position:'bottom'}] } }] })
      }
      write++;
      steps.push({ codeLine: 6, message: 'Increment write pointer', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [read, write], pointers: [{label:'read',index:read,position:'top'},{label:'write',index:write,position:'bottom'}] } }] })
    }
  }
  steps.push({ codeLine: 8, message: 'Done', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}`);

write('twoSum',
`class Solution {
    public int[] twoSum(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) return new int[]{left, right};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{};
    }
}`,
`import type { VisualizationStep, ArrayItem } from './types'
export function twoSum(nums: number[], target: number): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  let left = 0, right = arr.length - 1
  steps.push({ codeLine: 2, message: 'Initialize two pointers', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
  while (left < right) {
    const sum = arr[left].value + arr[right].value
    steps.push({ codeLine: 4, message: \`Check sum: \${arr[left].value} + \${arr[right].value} = \${sum}\`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [left, right], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
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
}`);

write('binarySearch',
`class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
`import type { VisualizationStep } from './types'
export function binarySearch(nums: number[], target: number): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  let left = 0, right = arr.length - 1
  steps.push({ codeLine: 2, message: 'Initialize bounds', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'}] } }] })
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    steps.push({ codeLine: 4, message: \`Check middle element at index \${mid}\`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [mid], pointers: [{label:'left',index:left,position:'top'},{label:'right',index:right,position:'bottom'},{label:'mid',index:mid,position:'top'}] } }] })
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
}`);

write('maxProfit',
`class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int i = 0; i < prices.length; i++) {
            if (prices[i] < minPrice) minPrice = prices[i];
            else if (prices[i] - minPrice > maxProfit) {
                maxProfit = prices[i] - minPrice;
            }
        }
        return maxProfit;
    }
}`,
`import type { VisualizationStep } from './types'
export function maxProfit(prices: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = prices.map((v, i) => ({ id: i, value: v }))
  if(arr.length === 0) return []
  let minPrice = Infinity
  let maxProfit = 0
  let minIdx = -1
  for (let i = 0; i < arr.length; i++) {
    steps.push({ codeLine: 4, message: \`Check price \${arr[i].value} on day \${i}\`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    if (arr[i].value < minPrice) {
      minPrice = arr[i].value
      minIdx = i
      steps.push({ codeLine: 5, message: \`New minimum price found: \${minPrice}\`, audioEvent: 'match', elements: [{ type: 'array', data: { values: [...arr], highlights: [minIdx, i], pointers: [{label:'min',index:minIdx,position:'bottom'}, {label:'i',index:i,position:'top'}] } }] })
    } else {
      let profit = arr[i].value - minPrice
      steps.push({ codeLine: 6, message: \`Calculate profit: \${arr[i].value} - \${minPrice} = \${profit}\`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [minIdx, i], pointers: [{label:'min',index:minIdx,position:'bottom'}, {label:'i',index:i,position:'top'}] } }] })
      if (profit > maxProfit) {
        maxProfit = profit
        steps.push({ codeLine: 7, message: \`New max profit: \${maxProfit}\`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [minIdx, i], pointers: [{label:'min',index:minIdx,position:'bottom'}, {label:'i',index:i,position:'top'}] } }] })
      }
    }
  }
  steps.push({ codeLine: 10, message: \`Final max profit: \${maxProfit}\`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}`);

