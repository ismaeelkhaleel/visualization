import type { VisualizationConfig } from '../algorithms/visualization'
import type { VisualizationStep } from '../algorithms/types'
import { containsDuplicate } from '../algorithms/containsDuplicate'
import { maxProfit } from '../algorithms/maxProfit'
import { maxSubArray } from '../algorithms/maxSubArray'
import { mergeSortedArray } from '../algorithms/mergeSortedArray'
import { moveZeroes } from '../algorithms/moveZeroes'
import { reverseString } from '../algorithms/reverseString'
import { twoSum } from '../algorithms/twoSum'
import { validAnagram } from '../algorithms/validAnagram'
import { validPalindrome } from '../algorithms/validPalindrome'
import {
  intersection,
  intersectionII,
  majorityElement,
  mergeIntervals,
  missingNumber,
  pivotIndex,
  productExceptSelf,
  removeDuplicatesSorted,
  rotateArray,
  runningSum,
  sortedSquares,
  sortColors,
  subarraySum,
  threeSum,
} from '../algorithms/arrayProblems'
import {
  containsDuplicateVisualization,
  intersectionIIVisualization,
  intersectionVisualization,
  majorityElementVisualization,
  maxProfitVisualization,
  maxSubArrayVisualization,
  mergeIntervalsVisualization,
  mergeSortedArrayVisualization,
  missingNumberVisualization,
  moveZeroesVisualization,
  pivotIndexVisualization,
  productExceptSelfVisualization,
  removeDuplicatesVisualization,
  reverseStringVisualization,
  rotateArrayVisualization,
  runningSumVisualization,
  sortedSquaresVisualization,
  sortColorsVisualization,
  subarraySumVisualization,
  threeSumVisualization,
  twoSumVisualization,
  validAnagramVisualization,
  validPalindromeVisualization,
} from '../algorithms/visualization'

export type ProblemId = string

export type ProblemInputField = {
  key: string
  label: string
  type: 'text' | 'number' | 'numberArray'
  placeholder?: string
}

export type ProblemInputConfig = {
  fields: ProblemInputField[]
  defaultValues: Record<string, unknown>
  validate?: (values: Record<string, unknown>) => string | null
}

export type ProblemCategory = 'Arrays' | 'Strings'

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard'

export type ProblemDefinition = {
  id: string
  title: string
  category: ProblemCategory
  difficulty: ProblemDifficulty
  tags: string[]
  visualization: VisualizationConfig
  getSteps: (context?: Record<string, unknown>) => VisualizationStep[]
  input?: ProblemInputConfig
}

function numberArrayValue(values: Record<string, unknown>, key: string, fallback: number[]): number[] {
  const value = values[key]
  return Array.isArray(value) ? value.filter((item): item is number => typeof item === 'number' && Number.isFinite(item)) : fallback
}

function numberValue(values: Record<string, unknown>, key: string, fallback: number): number {
  const value = values[key]
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function stringValue(values: Record<string, unknown>, key: string, fallback: string): string {
  const value = values[key]
  return typeof value === 'string' ? value : fallback
}

function validateMinArray(key: string, label: string, min: number) {
  return (values: Record<string, unknown>) => {
    const value = values[key]
    return !Array.isArray(value) || value.length < min ? `Enter at least ${min} ${label}` : null
  }
}

function validateSorted(key: string, label: string, min: number) {
  return (values: Record<string, unknown>) => {
    const value = values[key]
    if (!Array.isArray(value) || value.length < min) return `Enter at least ${min} ${label}`
    const sorted = value.every((entry, index) => typeof entry === 'number' && (index === 0 || Number(value[index - 1]) <= entry))
    return sorted ? null : `${label} must be sorted`
  }
}

export const problems: ProblemDefinition[] = [
  {
    id: 'twoSum',
    title: 'Two Sum',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['two-pointers', 'sorted-array', 'array'],
    visualization: twoSumVisualization,
    input: {
      fields: [
        { key: 'input', label: 'Sorted array', type: 'numberArray' },
        { key: 'target', label: 'Target', type: 'number' },
      ],
      defaultValues: { input: [1, 2, 4, 6, 8, 11], target: 10 },
      validate: validateSorted('input', 'Array', 2),
    },
    getSteps: (context = {}) => twoSum(numberArrayValue(context, 'input', [1, 2, 4, 6, 8, 11]), numberValue(context, 'target', 10)),
  },
  {
    id: 'maxSubArray',
    title: 'Maximum Subarray',
    category: 'Arrays',
    difficulty: 'Medium',
    tags: ['array', 'dynamic-programming', 'kadanes'],
    visualization: maxSubArrayVisualization,
    input: {
      fields: [{ key: 'input', label: 'Array', type: 'numberArray' }],
      defaultValues: { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
      validate: validateMinArray('input', 'value', 1),
    },
    getSteps: (context = {}) => maxSubArray(numberArrayValue(context, 'input', [-2, 1, -3, 4, -1, 2, 1, -5, 4])),
  },
  {
    id: 'maxProfit',
    title: 'Best Time to Buy and Sell Stock',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array', 'dynamic-programming', 'sliding-window'],
    visualization: maxProfitVisualization,
    input: {
      fields: [{ key: 'input', label: 'Prices', type: 'numberArray' }],
      defaultValues: { input: [7, 1, 5, 3, 6, 4] },
      validate: validateMinArray('input', 'price', 1),
    },
    getSteps: (context = {}) => maxProfit(numberArrayValue(context, 'input', [7, 1, 5, 3, 6, 4])),
  },
  {
    id: 'moveZeroes',
    title: 'Move Zeroes',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['two-pointers', 'in-place', 'array'],
    visualization: moveZeroesVisualization,
    input: {
      fields: [{ key: 'input', label: 'Array', type: 'numberArray' }],
      defaultValues: { input: [0, 1, 0, 3, 12] },
      validate: validateMinArray('input', 'value', 1),
    },
    getSteps: (context = {}) => moveZeroes(numberArrayValue(context, 'input', [0, 1, 0, 3, 12])),
  },
  {
    id: 'containsDuplicate',
    title: 'Contains Duplicate',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array', 'hash-table'],
    visualization: containsDuplicateVisualization,
    input: {
      fields: [{ key: 'input', label: 'Array', type: 'numberArray' }],
      defaultValues: { input: [1, 2, 3, 1] },
      validate: validateMinArray('input', 'value', 1),
    },
    getSteps: (context = {}) => containsDuplicate(numberArrayValue(context, 'input', [1, 2, 3, 1])),
  },
  {
    id: 'productExceptSelf',
    title: 'Product of Array Except Self',
    category: 'Arrays',
    difficulty: 'Medium',
    tags: ['array', 'prefix', 'suffix'],
    visualization: productExceptSelfVisualization,
    input: {
      fields: [{ key: 'input', label: 'Array', type: 'numberArray' }],
      defaultValues: { input: [1, 2, 3, 4] },
      validate: validateMinArray('input', 'value', 2),
    },
    getSteps: (context = {}) => productExceptSelf(numberArrayValue(context, 'input', [1, 2, 3, 4])),
  },
  {
    id: 'mergeSortedArray',
    title: 'Merge Sorted Array',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array', 'two-pointers', 'sorting'],
    visualization: mergeSortedArrayVisualization,
    input: {
      fields: [
        { key: 'nums1', label: 'Sorted array 1', type: 'numberArray' },
        { key: 'nums2', label: 'Sorted array 2', type: 'numberArray' },
      ],
      defaultValues: { nums1: [1, 2, 3], nums2: [2, 5, 6] },
      validate: (values) => validateSorted('nums1', 'Array 1', 1)(values) ?? validateSorted('nums2', 'Array 2', 1)(values),
    },
    getSteps: (context = {}) => {
      const nums1 = numberArrayValue(context, 'nums1', [1, 2, 3])
      const nums2 = numberArrayValue(context, 'nums2', [2, 5, 6])
      return mergeSortedArray([...nums1, ...Array(nums2.length).fill(0)], nums1.length, nums2, nums2.length)
    },
  },
  {
    id: 'removeDuplicates',
    title: 'Remove Duplicates from Sorted Array',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array', 'two-pointers'],
    visualization: removeDuplicatesVisualization,
    input: {
      fields: [{ key: 'input', label: 'Sorted array', type: 'numberArray' }],
      defaultValues: { input: [0, 0, 1, 1, 1, 2, 2, 3] },
      validate: validateSorted('input', 'Array', 1),
    },
    getSteps: (context = {}) => removeDuplicatesSorted(numberArrayValue(context, 'input', [0, 0, 1, 1, 1, 2, 2, 3])),
  },
  {
    id: 'rotateArray',
    title: 'Rotate Array',
    category: 'Arrays',
    difficulty: 'Medium',
    tags: ['array', 'two-pointers'],
    visualization: rotateArrayVisualization,
    input: {
      fields: [
        { key: 'input', label: 'Array', type: 'numberArray' },
        { key: 'k', label: 'k', type: 'number' },
      ],
      defaultValues: { input: [1, 2, 3, 4, 5, 6, 7], k: 3 },
      validate: validateMinArray('input', 'value', 1),
    },
    getSteps: (context = {}) => rotateArray(numberArrayValue(context, 'input', [1, 2, 3, 4, 5, 6, 7]), numberValue(context, 'k', 3)),
  },
  {
    id: 'sortColors',
    title: 'Sort Colors',
    category: 'Arrays',
    difficulty: 'Medium',
    tags: ['array', 'two-pointers', 'sorting'],
    visualization: sortColorsVisualization,
    input: {
      fields: [{ key: 'input', label: '0, 1, 2 array', type: 'numberArray' }],
      defaultValues: { input: [2, 0, 2, 1, 1, 0] },
      validate: (values) => {
        const value = values.input
        if (!Array.isArray(value) || value.length < 1) return 'Enter at least 1 value'
        return value.every((entry) => entry === 0 || entry === 1 || entry === 2) ? null : 'Only 0, 1, and 2 are valid'
      },
    },
    getSteps: (context = {}) => sortColors(numberArrayValue(context, 'input', [2, 0, 2, 1, 1, 0])),
  },
  {
    id: 'majorityElement',
    title: 'Majority Element',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array', 'voting'],
    visualization: majorityElementVisualization,
    input: {
      fields: [{ key: 'input', label: 'Array', type: 'numberArray' }],
      defaultValues: { input: [2, 2, 1, 1, 1, 2, 2] },
      validate: validateMinArray('input', 'value', 1),
    },
    getSteps: (context = {}) => majorityElement(numberArrayValue(context, 'input', [2, 2, 1, 1, 1, 2, 2])),
  },
  {
    id: 'missingNumber',
    title: 'Missing Number',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array', 'bit-manipulation'],
    visualization: missingNumberVisualization,
    input: {
      fields: [{ key: 'input', label: '0..n array', type: 'numberArray' }],
      defaultValues: { input: [3, 0, 1] },
      validate: validateMinArray('input', 'value', 1),
    },
    getSteps: (context = {}) => missingNumber(numberArrayValue(context, 'input', [3, 0, 1])),
  },
  {
    id: 'pivotIndex',
    title: 'Find Pivot Index',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array', 'prefix-sum'],
    visualization: pivotIndexVisualization,
    input: {
      fields: [{ key: 'input', label: 'Array', type: 'numberArray' }],
      defaultValues: { input: [1, 7, 3, 6, 5, 6] },
      validate: validateMinArray('input', 'value', 1),
    },
    getSteps: (context = {}) => pivotIndex(numberArrayValue(context, 'input', [1, 7, 3, 6, 5, 6])),
  },
  {
    id: 'runningSum',
    title: 'Running Sum of 1d Array',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array', 'prefix-sum'],
    visualization: runningSumVisualization,
    input: {
      fields: [{ key: 'input', label: 'Array', type: 'numberArray' }],
      defaultValues: { input: [1, 2, 3, 4] },
      validate: validateMinArray('input', 'value', 1),
    },
    getSteps: (context = {}) => runningSum(numberArrayValue(context, 'input', [1, 2, 3, 4])),
  },
  {
    id: 'sortedSquares',
    title: 'Squares of a Sorted Array',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array', 'two-pointers'],
    visualization: sortedSquaresVisualization,
    input: {
      fields: [{ key: 'input', label: 'Sorted array', type: 'numberArray' }],
      defaultValues: { input: [-4, -1, 0, 3, 10] },
      validate: validateSorted('input', 'Array', 1),
    },
    getSteps: (context = {}) => sortedSquares(numberArrayValue(context, 'input', [-4, -1, 0, 3, 10])),
  },
  {
    id: 'intersection',
    title: 'Intersection of Two Arrays',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array', 'hash-table'],
    visualization: intersectionVisualization,
    input: {
      fields: [
        { key: 'nums1', label: 'Array 1', type: 'numberArray' },
        { key: 'nums2', label: 'Array 2', type: 'numberArray' },
      ],
      defaultValues: { nums1: [1, 2, 2, 1], nums2: [2, 2] },
      validate: (values) => validateMinArray('nums1', 'value in Array 1', 1)(values) ?? validateMinArray('nums2', 'value in Array 2', 1)(values),
    },
    getSteps: (context = {}) => intersection(numberArrayValue(context, 'nums1', [1, 2, 2, 1]), numberArrayValue(context, 'nums2', [2, 2])),
  },
  {
    id: 'intersectionII',
    title: 'Intersection of Two Arrays II',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array', 'hash-table'],
    visualization: intersectionIIVisualization,
    input: {
      fields: [
        { key: 'nums1', label: 'Array 1', type: 'numberArray' },
        { key: 'nums2', label: 'Array 2', type: 'numberArray' },
      ],
      defaultValues: { nums1: [4, 9, 5], nums2: [9, 4, 9, 8, 4] },
      validate: (values) => validateMinArray('nums1', 'value in Array 1', 1)(values) ?? validateMinArray('nums2', 'value in Array 2', 1)(values),
    },
    getSteps: (context = {}) => intersectionII(numberArrayValue(context, 'nums1', [4, 9, 5]), numberArrayValue(context, 'nums2', [9, 4, 9, 8, 4])),
  },
  {
    id: 'mergeIntervals',
    title: 'Merge Intervals',
    category: 'Arrays',
    difficulty: 'Medium',
    tags: ['array', 'sorting', 'intervals'],
    visualization: mergeIntervalsVisualization,
    input: {
      fields: [{ key: 'input', label: 'Intervals as start,end pairs', type: 'numberArray' }],
      defaultValues: { input: [1, 3, 2, 6, 8, 10, 15, 18] },
      validate: (values) => {
        const value = values.input
        if (!Array.isArray(value) || value.length < 2) return 'Enter at least one interval pair'
        return value.length % 2 === 0 ? null : 'Intervals need start,end pairs'
      },
    },
    getSteps: (context = {}) => mergeIntervals(numberArrayValue(context, 'input', [1, 3, 2, 6, 8, 10, 15, 18])),
  },
  {
    id: 'subarraySum',
    title: 'Subarray Sum Equals K',
    category: 'Arrays',
    difficulty: 'Medium',
    tags: ['array', 'prefix-sum', 'hash-table'],
    visualization: subarraySumVisualization,
    input: {
      fields: [
        { key: 'input', label: 'Array', type: 'numberArray' },
        { key: 'k', label: 'k', type: 'number' },
      ],
      defaultValues: { input: [1, 2, 3, -2, 2], k: 3 },
      validate: validateMinArray('input', 'value', 1),
    },
    getSteps: (context = {}) => subarraySum(numberArrayValue(context, 'input', [1, 2, 3, -2, 2]), numberValue(context, 'k', 3)),
  },
  {
    id: 'threeSum',
    title: 'Three Sum',
    category: 'Arrays',
    difficulty: 'Medium',
    tags: ['array', 'two-pointers', 'sorting'],
    visualization: threeSumVisualization,
    input: {
      fields: [{ key: 'input', label: 'Array', type: 'numberArray' }],
      defaultValues: { input: [-1, 0, 1, 2, -1, -4] },
      validate: validateMinArray('input', 'value', 3),
    },
    getSteps: (context = {}) => threeSum(numberArrayValue(context, 'input', [-1, 0, 1, 2, -1, -4])),
  },
  {
    id: 'reverseString',
    title: 'Reverse String',
    category: 'Strings',
    difficulty: 'Easy',
    tags: ['string', 'two-pointers'],
    visualization: reverseStringVisualization,
    input: {
      fields: [{ key: 'input', label: 'String', type: 'text' }],
      defaultValues: { input: 'hello' },
      validate: (values) => typeof values.input === 'string' ? null : 'Enter a valid string',
    },
    getSteps: (context = {}) => reverseString(stringValue(context, 'input', 'hello').split('')),
  },
  {
    id: 'validAnagram',
    title: 'Valid Anagram',
    category: 'Strings',
    difficulty: 'Easy',
    tags: ['string', 'hash-table', 'frequency'],
    visualization: validAnagramVisualization,
    input: {
      fields: [
        { key: 's', label: 'String 1', type: 'text' },
        { key: 't', label: 'String 2', type: 'text' },
      ],
      defaultValues: { s: 'anagram', t: 'nagaram' },
      validate: (values) => typeof values.s === 'string' && typeof values.t === 'string' ? null : 'Enter two strings',
    },
    getSteps: (context = {}) => validAnagram(stringValue(context, 's', 'anagram'), stringValue(context, 't', 'nagaram')),
  },
  {
    id: 'validPalindrome',
    title: 'Valid Palindrome',
    category: 'Strings',
    difficulty: 'Easy',
    tags: ['string', 'two-pointers'],
    visualization: validPalindromeVisualization,
    input: {
      fields: [{ key: 'input', label: 'String', type: 'text' }],
      defaultValues: { input: 'racecar' },
      validate: (values) => typeof values.input === 'string' && values.input.length > 0 ? null : 'Enter a string',
    },
    getSteps: (context = {}) => validPalindrome(stringValue(context, 'input', 'racecar')),
  },
]
