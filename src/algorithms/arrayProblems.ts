import type { ArrayItem, ArrayVisualizationData, VisualizationStep } from './types'

type MetricTone = NonNullable<ArrayVisualizationData['metrics']>[number]['tone']

function items(values: (number | string)[], idOffset = 0): ArrayItem[] {
  return values.map((value, index) => ({ id: idOffset + index, value }))
}

function range(start: number, end: number): number[] {
  if (end < start) return []
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

function metric(label: string, value: string | number, tone: MetricTone = 'neutral') {
  return { label, value, tone }
}

function arrayStep(
  values: ArrayItem[],
  codeLine: number,
  message: string,
  data: Omit<ArrayVisualizationData, 'values'> = {},
  audioEvent: VisualizationStep['audioEvent'] = 'pointer',
): VisualizationStep {
  return { codeLine, message, audioEvent, elements: [{ type: 'array', data: { values: [...values], ...data } }] }
}

export function productExceptSelf(nums: number[]): VisualizationStep[] {
  const result = Array(nums.length).fill(1)
  const arr = items(nums)
  const steps: VisualizationStep[] = [
    arrayStep(arr, 4, 'Initialize result cells with 1', { metrics: [metric('prefix', 1, 'active'), metric('suffix', 1)] }),
  ]
  let prefix = 1
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix
    steps.push(arrayStep(items(result), 6, `Store prefix ${prefix} at index ${i}`, {
      highlights: [i],
      pointers: [{ label: 'i', index: i, position: 'top' }],
      metrics: [metric('prefix', prefix, 'active'), metric('source', nums[i], 'compare')],
    }, 'move'))
    prefix *= nums[i]
    steps.push(arrayStep(items(result), 7, `Update prefix: ${prefix}`, {
      highlights: [i],
      metrics: [metric('prefix', prefix, 'active')],
    }, 'compare'))
  }
  let suffix = 1
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= suffix
    steps.push(arrayStep(items(result), 11, `Multiply by suffix ${suffix}`, {
      highlights: [i],
      pointers: [{ label: 'i', index: i, position: 'bottom' }],
      metrics: [metric('suffix', suffix, 'active'), metric('result[i]', result[i], 'success')],
    }, 'move'))
    suffix *= nums[i]
  }
  steps.push(arrayStep(items(result), 15, 'Products complete', { highlights: range(0, nums.length - 1), metrics: [metric('result', result.join(', '), 'success')] }, 'success'))
  return steps
}

export function removeDuplicatesSorted(nums: number[]): VisualizationStep[] {
  const arr = items(nums)
  const steps: VisualizationStep[] = []
  if (arr.length === 0) return []
  let write = 1
  steps.push(arrayStep(arr, 3, 'Keep the first value', { highlights: [0], metrics: [metric('write', write, 'active')] }))
  for (let read = 1; read < arr.length; read++) {
    steps.push(arrayStep(arr, 4, `Compare ${arr[read].value} with last kept ${arr[write - 1].value}`, {
      highlights: [read, write - 1],
      disabledIndices: range(write, read - 1),
      pointers: [{ label: 'read', index: read, position: 'top' }, { label: 'write', index: write, position: 'bottom' }],
      metrics: [metric('kept', write, 'success')],
    }, 'compare'))
    if (arr[read].value !== arr[write - 1].value) {
      arr[write] = { ...arr[read], id: write }
      steps.push(arrayStep(arr, 5, `Copy ${arr[read].value} into the kept zone`, {
        highlights: [write],
        secondaryHighlights: range(0, write),
        pointers: [{ label: 'write', index: write, position: 'bottom' }],
        metrics: [metric('kept', write + 1, 'success')],
      }, 'move'))
      write++
    }
  }
  steps.push(arrayStep(arr, 9, `Unique length is ${write}`, { highlights: range(0, write - 1), disabledIndices: range(write, arr.length - 1), metrics: [metric('length', write, 'success')] }, 'success'))
  return steps
}

export function rotateArray(nums: number[], k: number): VisualizationStep[] {
  const arr = [...nums]
  const steps: VisualizationStep[] = []
  if (arr.length === 0) return []
  const shift = ((k % arr.length) + arr.length) % arr.length
  steps.push(arrayStep(items(arr), 3, `Rotate right by ${shift}`, { metrics: [metric('k', shift, 'active')] }))
  const reverse = (left: number, right: number, line: number, label: string) => {
    steps.push(arrayStep(items(arr), line, label, { highlights: range(left, right), pointers: [{ label: 'L', index: left, position: 'top' }, { label: 'R', index: right, position: 'bottom' }] }, 'pointer'))
    while (left < right) {
      ;[arr[left], arr[right]] = [arr[right], arr[left]]
      steps.push(arrayStep(items(arr), line, `Swap index ${left} with ${right}`, { highlights: [left, right], swap: { from: left, to: right }, pointers: [{ label: 'L', index: left, position: 'top' }, { label: 'R', index: right, position: 'bottom' }] }, 'swap'))
      left++
      right--
    }
  }
  reverse(0, arr.length - 1, 4, 'Reverse the whole array')
  reverse(0, shift - 1, 5, 'Reverse the rotated prefix')
  reverse(shift, arr.length - 1, 6, 'Reverse the remaining suffix')
  steps.push(arrayStep(items(arr), 6, 'Rotation complete', { highlights: range(0, arr.length - 1), metrics: [metric('result', arr.join(', '), 'success')] }, 'success'))
  return steps
}

export function sortColors(nums: number[]): VisualizationStep[] {
  const arr = [...nums]
  const steps: VisualizationStep[] = []
  let low = 0
  let mid = 0
  let high = arr.length - 1
  steps.push(arrayStep(items(arr), 3, 'Create low, mid, and high zones', { pointers: [{ label: 'low', index: low, position: 'top' }, { label: 'mid', index: mid, position: 'top' }, { label: 'high', index: high, position: 'bottom' }] }))
  while (mid <= high) {
    steps.push(arrayStep(items(arr), 4, `Inspect color ${arr[mid]} at mid`, {
      highlights: [mid],
      secondaryHighlights: [...range(0, low - 1), ...range(high + 1, arr.length - 1)],
      pointers: [{ label: 'low', index: low, position: 'top' }, { label: 'mid', index: mid, position: 'top' }, { label: 'high', index: high, position: 'bottom' }],
      metrics: [metric('low', low), metric('mid', mid, 'active'), metric('high', high)],
    }, 'compare'))
    if (arr[mid] === 0) {
      ;[arr[low], arr[mid]] = [arr[mid], arr[low]]
      steps.push(arrayStep(items(arr), 5, 'Move 0 into the low zone', { highlights: [low, mid], swap: { from: low, to: mid }, metrics: [metric('zone', '0s left', 'success')] }, 'swap'))
      low++
      mid++
    } else if (arr[mid] === 1) {
      mid++
      steps.push(arrayStep(items(arr), 6, '1 belongs in the middle zone', { highlights: [mid - 1], metrics: [metric('mid', mid, 'active')] }, 'pointer'))
    } else {
      ;[arr[mid], arr[high]] = [arr[high], arr[mid]]
      steps.push(arrayStep(items(arr), 7, 'Move 2 into the high zone', { highlights: [mid, high], swap: { from: mid, to: high }, metrics: [metric('zone', '2s right', 'success')] }, 'swap'))
      high--
    }
  }
  steps.push(arrayStep(items(arr), 9, 'Colors sorted', { highlights: range(0, arr.length - 1) }, 'success'))
  return steps
}

export function majorityElement(nums: number[]): VisualizationStep[] {
  const arr = items(nums)
  const steps: VisualizationStep[] = []
  let candidate = 0
  let count = 0
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i]
      steps.push(arrayStep(arr, 5, `Choose ${candidate} as candidate`, { highlights: [i], pointers: [{ label: 'i', index: i, position: 'top' }], metrics: [metric('candidate', candidate, 'active'), metric('count', count)] }, 'match'))
    }
    count += nums[i] === candidate ? 1 : -1
    steps.push(arrayStep(arr, 6, nums[i] === candidate ? 'Vote with candidate' : 'Vote against candidate', { highlights: [i], metrics: [metric('candidate', candidate, 'active'), metric('count', count, count > 0 ? 'success' : 'warning')] }, 'compare'))
  }
  steps.push(arrayStep(arr, 8, `Majority element is ${candidate}`, { highlights: nums.map((v, i) => v === candidate ? i : -1).filter(i => i >= 0), metrics: [metric('winner', candidate, 'success')] }, 'success'))
  return steps
}

export function missingNumber(nums: number[]): VisualizationStep[] {
  const arr = items(nums)
  const steps: VisualizationStep[] = []
  let missing = nums.length
  steps.push(arrayStep(arr, 3, `Start from n = ${missing}`, { metrics: [metric('missing', missing, 'active')] }))
  for (let i = 0; i < nums.length; i++) {
    missing ^= i
    steps.push(arrayStep(arr, 4, `XOR index ${i}`, { highlights: [i], metrics: [metric('missing', missing, 'compare')] }, 'compare'))
    missing ^= nums[i]
    steps.push(arrayStep(arr, 5, `XOR value ${nums[i]}`, { highlights: [i], metrics: [metric('missing', missing, 'active')] }, 'move'))
  }
  steps.push(arrayStep(arr, 7, `Missing number is ${missing}`, { metrics: [metric('missing', missing, 'success')] }, 'success'))
  return steps
}

export function pivotIndex(nums: number[]): VisualizationStep[] {
  const arr = items(nums)
  const total = nums.reduce((sum, value) => sum + value, 0)
  const steps: VisualizationStep[] = [arrayStep(arr, 3, `Total sum is ${total}`, { metrics: [metric('total', total, 'active')] })]
  let left = 0
  for (let i = 0; i < nums.length; i++) {
    const right = total - left - nums[i]
    steps.push(arrayStep(arr, 5, `Left ${left}, right ${right}`, { highlights: [i], secondaryHighlights: range(0, i - 1), pointers: [{ label: 'i', index: i, position: 'top' }], metrics: [metric('left', left, 'active'), metric('right', right, 'compare')] }, 'compare'))
    if (left === right) {
      steps.push(arrayStep(arr, 5, `Pivot found at ${i}`, { highlights: [i], metrics: [metric('pivot', i, 'success')] }, 'success'))
      return steps
    }
    left += nums[i]
  }
  steps.push(arrayStep(arr, 9, 'No pivot index', { metrics: [metric('pivot', -1, 'warning')] }, 'success'))
  return steps
}

export function runningSum(nums: number[]): VisualizationStep[] {
  const arr = [...nums]
  const steps: VisualizationStep[] = [arrayStep(items(arr), 2, 'Start with the original values')]
  for (let i = 1; i < arr.length; i++) {
    steps.push(arrayStep(items(arr), 3, `Add previous sum ${arr[i - 1]} to ${arr[i]}`, { highlights: [i - 1, i], pointers: [{ label: 'i', index: i, position: 'top' }] }, 'compare'))
    arr[i] += arr[i - 1]
    steps.push(arrayStep(items(arr), 4, `Running sum at ${i} is ${arr[i]}`, { highlights: range(0, i), metrics: [metric('sum', arr[i], 'success')] }, 'move'))
  }
  steps.push(arrayStep(items(arr), 6, 'Running sums complete', { highlights: range(0, arr.length - 1) }, 'success'))
  return steps
}

export function sortedSquares(nums: number[]): VisualizationStep[] {
  const ans = Array(nums.length).fill(0)
  const steps: VisualizationStep[] = []
  let left = 0
  let right = nums.length - 1
  for (let pos = nums.length - 1; pos >= 0; pos--) {
    const leftSquare = nums[left] * nums[left]
    const rightSquare = nums[right] * nums[right]
    steps.push(arrayStep(items(nums), 6, `Compare ${leftSquare} and ${rightSquare}`, { highlights: [left, right], pointers: [{ label: 'L', index: left, position: 'top' }, { label: 'R', index: right, position: 'bottom' }], metrics: [metric('write', pos, 'active')] }, 'compare'))
    if (leftSquare > rightSquare) {
      ans[pos] = leftSquare
      left++
    } else {
      ans[pos] = rightSquare
      right--
    }
    steps.push(arrayStep(items(ans), 7, `Place ${ans[pos]} at result index ${pos}`, { highlights: [pos], disabledIndices: range(0, pos - 1), metrics: [metric('placed', ans[pos], 'success')] }, 'move'))
  }
  steps.push(arrayStep(items(ans), 11, 'Squared array is sorted', { highlights: range(0, ans.length - 1) }, 'success'))
  return steps
}

export function intersection(nums1: number[], nums2: number[]): VisualizationStep[] {
  const seen = new Set<number>()
  const out: number[] = []
  const steps: VisualizationStep[] = []
  nums1.forEach((value, index) => {
    seen.add(value)
    steps.push(arrayStep(items(nums1), 4, `Add ${value} to lookup set`, { highlights: [index], metrics: [metric('seen', seen.size, 'active')] }, 'push'))
  })
  nums2.forEach((value, index) => {
    const hit = seen.has(value)
    steps.push(arrayStep(items(nums2), 5, hit ? `${value} exists in both arrays` : `${value} is not shared`, { highlights: [index], metrics: [metric('result', out.join(', ') || '-', hit ? 'success' : 'neutral')] }, hit ? 'match' : 'compare'))
    if (hit && !out.includes(value)) out.push(value)
  })
  steps.push(arrayStep(items(out.length ? out : ['empty']), 7, 'Unique intersection complete', { highlights: out.map((_, i) => i), metrics: [metric('count', out.length, 'success')] }, 'success'))
  return steps
}

export function intersectionII(nums1: number[], nums2: number[]): VisualizationStep[] {
  const counts = new Map<number, number>()
  const out: number[] = []
  const steps: VisualizationStep[] = []
  nums1.forEach((value, index) => {
    counts.set(value, (counts.get(value) ?? 0) + 1)
    steps.push(arrayStep(items(nums1), 4, `Count ${value}`, { highlights: [index], metrics: [metric(`${value}`, counts.get(value) ?? 0, 'active')] }, 'push'))
  })
  nums2.forEach((value, index) => {
    const count = counts.get(value) ?? 0
    steps.push(arrayStep(items(nums2), 6, count > 0 ? `Use one ${value}` : `No remaining ${value}`, { highlights: [index], metrics: [metric('matches', out.length, count > 0 ? 'success' : 'neutral')] }, count > 0 ? 'match' : 'compare'))
    if (count > 0) {
      out.push(value)
      counts.set(value, count - 1)
    }
  })
  steps.push(arrayStep(items(out.length ? out : ['empty']), 12, 'Multiset intersection complete', { highlights: out.map((_, i) => i), metrics: [metric('count', out.length, 'success')] }, 'success'))
  return steps
}

export function mergeIntervals(flat: number[]): VisualizationStep[] {
  const pairs: [number, number][] = []
  for (let i = 0; i < flat.length - 1; i += 2) pairs.push([flat[i], flat[i + 1]])
  pairs.sort((a, b) => a[0] - b[0])
  const labels = pairs.map(([a, b]) => `${a}-${b}`)
  const steps: VisualizationStep[] = [arrayStep(items(labels), 3, 'Sort intervals by start', { layout: 'intervals' })]
  const merged: [number, number][] = []
  pairs.forEach(([start, end], index) => {
    steps.push(arrayStep(items(labels), 5, `Consider [${start}, ${end}]`, { highlights: [index], layout: 'intervals', metrics: [metric('merged', merged.map(([a, b]) => `${a}-${b}`).join(' | ') || '-', 'active')] }, 'compare'))
    const last = merged[merged.length - 1]
    if (!last || last[1] < start) {
      merged.push([start, end])
      steps.push(arrayStep(items(labels), 7, 'No overlap, start a new block', { highlights: [index], layout: 'intervals', metrics: [metric('blocks', merged.length, 'success')] }, 'move'))
    } else {
      last[1] = Math.max(last[1], end)
      steps.push(arrayStep(items(labels), 9, `Merge into [${last[0]}, ${last[1]}]`, { highlights: [index - 1, index].filter(i => i >= 0), layout: 'intervals', metrics: [metric('current', `${last[0]}-${last[1]}`, 'success')] }, 'match'))
    }
  })
  steps.push(arrayStep(items(merged.map(([a, b]) => `${a}-${b}`)), 11, 'Intervals merged', { layout: 'intervals', highlights: merged.map((_, i) => i), metrics: [metric('result', merged.length, 'success')] }, 'success'))
  return steps
}

export function subarraySum(nums: number[], k: number): VisualizationStep[] {
  const arr = items(nums)
  const prefix = new Map<number, number>([[0, 1]])
  const steps: VisualizationStep[] = [arrayStep(arr, 4, `Target sum is ${k}`, { metrics: [metric('k', k, 'active'), metric('prefix 0', 1)] })]
  let sum = 0
  let count = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    const needed = sum - k
    const matches = prefix.get(needed) ?? 0
    count += matches
    steps.push(arrayStep(arr, 7, `Need previous prefix ${needed}`, { highlights: [i], secondaryHighlights: range(0, i), pointers: [{ label: 'i', index: i, position: 'top' }], metrics: [metric('sum', sum, 'active'), metric('matches', matches, matches ? 'success' : 'neutral'), metric('count', count, 'success')] }, matches ? 'match' : 'compare'))
    prefix.set(sum, (prefix.get(sum) ?? 0) + 1)
    steps.push(arrayStep(arr, 8, `Store prefix ${sum}`, { highlights: [i], metrics: [metric('prefix count', prefix.get(sum) ?? 0, 'active'), metric('count', count, 'success')] }, 'push'))
  }
  steps.push(arrayStep(arr, 10, `Found ${count} subarrays`, { metrics: [metric('answer', count, 'success')] }, 'success'))
  return steps
}

export function threeSum(nums: number[]): VisualizationStep[] {
  const arr = [...nums].sort((a, b) => a - b)
  const steps: VisualizationStep[] = [arrayStep(items(arr), 2, 'Sort values for two-pointer search', { highlights: range(0, arr.length - 1) }, 'move')]
  let found = 0
  for (let i = 0; i < arr.length - 2; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) {
      steps.push(arrayStep(items(arr), 5, `Skip duplicate fixed value ${arr[i]}`, { highlights: [i], disabledIndices: [i] }, 'skip'))
      continue
    }
    let left = i + 1
    let right = arr.length - 1
    steps.push(arrayStep(items(arr), 6, `Fix ${arr[i]} and search pair`, { highlights: [i], pointers: [{ label: 'fix', index: i, position: 'top' }, { label: 'L', index: left, position: 'top' }, { label: 'R', index: right, position: 'bottom' }] }))
    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right]
      steps.push(arrayStep(items(arr), 8, `${arr[i]} + ${arr[left]} + ${arr[right]} = ${sum}`, { highlights: [i, left, right], pointers: [{ label: 'fix', index: i, position: 'top' }, { label: 'L', index: left, position: 'top' }, { label: 'R', index: right, position: 'bottom' }], metrics: [metric('sum', sum, sum === 0 ? 'success' : 'compare'), metric('triplets', found)] }, 'compare'))
      if (sum === 0) {
        found++
        steps.push(arrayStep(items(arr), 10, 'Triplet found', { highlights: [i, left, right], metrics: [metric('triplets', found, 'success')] }, 'match'))
        left++
        right--
      } else if (sum < 0) {
        left++
        steps.push(arrayStep(items(arr), 11, 'Sum too small, move left', { highlights: [i, left, right].filter(index => index < arr.length), pointers: [{ label: 'L', index: left, position: 'top' }, { label: 'R', index: right, position: 'bottom' }] }, 'pointer'))
      } else {
        right--
        steps.push(arrayStep(items(arr), 12, 'Sum too large, move right', { highlights: [i, left, right].filter(index => index >= 0), pointers: [{ label: 'L', index: left, position: 'top' }, { label: 'R', index: right, position: 'bottom' }] }, 'pointer'))
      }
    }
  }
  steps.push(arrayStep(items(arr), 15, `Found ${found} triplets`, { metrics: [metric('triplets', found, 'success')] }, 'success'))
  return steps
}
