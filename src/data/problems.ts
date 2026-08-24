
import { validAnagram } from '../algorithms/validAnagram'
import { validPalindrome } from '../algorithms/validPalindrome'
import { mergeTwoSortedLists } from '../algorithms/mergeTwoSortedLists'
import { maxDepthBinaryTree } from '../algorithms/maxDepthBinaryTree'
import { invertBinaryTree } from '../algorithms/invertBinaryTree'
import { linkedListCycle } from '../algorithms/linkedListCycle'
import { minStack } from '../algorithms/minStack'
import { dailyTemperatures } from '../algorithms/dailyTemperatures'
import { numberOfIslands } from '../algorithms/numberOfIslands'
import { dfs } from '../algorithms/dfs'

import {
  validAnagramVisualization,
  validPalindromeVisualization,
  mergeTwoSortedListsVisualization,
  maxDepthBinaryTreeVisualization,
  invertBinaryTreeVisualization,
  linkedListCycleVisualization,
  minStackVisualization,
  dailyTemperaturesVisualization,
  numberOfIslandsVisualization,
  dfsVisualization
} from '../algorithms/visualization'

import {
  moveZeroesVisualization,
  twoSumVisualization,
  binarySearchVisualization,
  maxProfitVisualization,
  validParenthesesVisualization,
  containsDuplicateVisualization,
  maxSubArrayVisualization,
  mergeSortedArrayVisualization,
  reverseStringVisualization,
  evaluateRPNVisualization,
  reverseLinkedListVisualization,
  binaryTreeLevelOrderVisualization,
  graphBFSVisualization,
} from '../algorithms/visualization'
import type { VisualizationConfig } from '../algorithms/visualization'
import type { VisualizationStep } from '../algorithms/types'
import { moveZeroes } from '../algorithms/moveZeroes'
import { twoSum } from '../algorithms/twoSum'
import { binarySearch } from '../algorithms/binarySearch'
import { maxProfit } from '../algorithms/maxProfit'
import { validParentheses } from '../algorithms/validParentheses'
import { containsDuplicate } from '../algorithms/containsDuplicate'
import { maxSubArray } from '../algorithms/maxSubArray'
import { mergeSortedArray } from '../algorithms/mergeSortedArray'
import { reverseString } from '../algorithms/reverseString'
import { evaluateRPN } from '../algorithms/evaluateRPN'
import { reverseLinkedList } from '../algorithms/reverseLinkedList'
import { binaryTreeLevelOrder } from '../algorithms/binaryTreeLevelOrder'
import { graphBFS } from '../algorithms/graphBFS'

export type ProblemId = string

export type ProblemInputField = {
  key: string
  label: string
  type: 'text' | 'number' | 'numberArray'
  placeholder?: string
}

export type ProblemInputConfig = {
  fields: ProblemInputField[]
  defaultValues: Record<string, any>
  validate?: (values: Record<string, any>) => string | null
}

export type ProblemCategory =
  | 'Arrays'
  | 'Binary Search'
  | 'Strings'
  | 'Stack'
  | 'Linked List'
  | 'Trees'
  | 'Graphs'

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard'

export type ProblemDefinition = {
  id: string
  title: string
  category: ProblemCategory
  difficulty: ProblemDifficulty
  tags: string[]
  visualization: VisualizationConfig
  getSteps: (context?: Record<string, any>) => VisualizationStep[]
  input?: ProblemInputConfig
}

export const problems: ProblemDefinition[] = [
  {
    id: 'moveZeroes',
    title: 'Move Zeroes',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['two-pointers','in-place','array'],
    visualization: moveZeroesVisualization,
    input: {
      fields: [{ key: 'input', label: 'Array', type: 'numberArray' }],
      defaultValues: { input: [0, 1, 0, 3, 12] },
      validate: (values) => !values.input || values.input.length < 1 ? 'Enter at least 1 value' : null
    },
    getSteps: ({ input } = {}) => moveZeroes(input ?? [0, 1, 0, 3, 12]),
  },
  {
    id: 'twoSum',
    title: 'Two Sum',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['two-pointers','sorted-array','array'],
    visualization: twoSumVisualization,
    input: {
      fields: [
        { key: 'input', label: 'Sorted array', type: 'numberArray' },
        { key: 'target', label: 'Target', type: 'number' }
      ],
      defaultValues: { input: [2, 7, 11, 15], target: 9 },
      validate: (values) => {
        if (!values.input || values.input.length < 2) return 'Enter at least 2 values'
        const sorted = values.input.every((v: number, i: number) => i === 0 || values.input[i - 1] <= v)
        if (!sorted) return 'Array must be sorted'
        return null
      }
    },
    getSteps: ({ input, target } = {}) =>
      twoSum(input ?? [2, 7, 11, 15], target ?? 9),
  },
  {
    id: 'binarySearch',
    title: 'Binary Search',
    category: 'Binary Search',
    difficulty: 'Easy',
    tags: ['binary-search','divide-and-conquer','array'],
    visualization: binarySearchVisualization,
    input: {
      fields: [
        { key: 'input', label: 'Sorted array', type: 'numberArray' },
        { key: 'target', label: 'Target', type: 'number' }
      ],
      defaultValues: { input: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target: 23 },
      validate: (values) => {
        if (!values.input || values.input.length < 1) return 'Enter at least 1 value'
        const sorted = values.input.every((v: number, i: number) => i === 0 || values.input[i - 1] <= v)
        if (!sorted) return 'Array must be sorted'
        return null
      }
    },
    getSteps: ({ input, target } = {}) =>
      binarySearch(input ?? [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target ?? 23),
  },
  {
    id: 'maxProfit',
    title: 'Best Time to Buy and Sell Stock',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array','dynamic-programming','sliding-window'],
    visualization: maxProfitVisualization,
    input: {
      fields: [{ key: 'input', label: 'Prices', type: 'numberArray' }],
      defaultValues: { input: [7, 1, 5, 3, 6, 4] },
      validate: (values) => !values.input || values.input.length < 1 ? 'Enter at least 1 price' : null
    },
    getSteps: ({ input } = {}) =>
      maxProfit(input ?? [7, 1, 5, 3, 6, 4]),
  },
  {
    id: 'validParentheses',
    title: 'Valid Parentheses',
    category: 'Stack',
    difficulty: 'Easy',
    tags: ['stack','string'],
    visualization: validParenthesesVisualization,
    input: {
      fields: [
        { key: 'input', label: 'String', type: 'text' }
      ],
      defaultValues: { input: '()[]{}' },
      validate: (values) => {
        if (typeof values.input !== 'string') return 'Enter a valid string'
        return null
      }
    },
    getSteps: ({ input } = {}) =>
      validParentheses(input ?? '()[]{}'),
  },
  {
    id: 'containsDuplicate',
    title: 'Contains Duplicate',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array','hash-table'],
    visualization: containsDuplicateVisualization,
    input: {
      fields: [{ key: 'input', label: 'Array', type: 'numberArray' }],
      defaultValues: { input: [1, 2, 3, 1] },
      validate: (values) => !values.input || values.input.length < 1 ? 'Enter at least 1 value' : null
    },
    getSteps: ({ input } = {}) =>
      containsDuplicate(input ?? [1, 2, 3, 1]),
  },
  {
    id: 'maxSubArray',
    title: 'Maximum Subarray',
    category: 'Arrays',
    difficulty: 'Medium',
    tags: ['array','dynamic-programming','kadanes'],
    visualization: maxSubArrayVisualization,
    input: {
      fields: [{ key: 'input', label: 'Array', type: 'numberArray' }],
      defaultValues: { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
      validate: (values) => !values.input || values.input.length < 1 ? 'Enter at least 1 value' : null
    },
    getSteps: ({ input } = {}) =>
      maxSubArray(input ?? [-2, 1, -3, 4, -1, 2, 1, -5, 4]),
  },
  {
    id: 'mergeSortedArray',
    title: 'Merge Sorted Array',
    category: 'Arrays',
    difficulty: 'Easy',
    tags: ['array','two-pointers','sorting'],
    visualization: mergeSortedArrayVisualization,
    input: {
      fields: [
        { key: 'nums1', label: 'Sorted Array 1', type: 'numberArray' },
        { key: 'nums2', label: 'Sorted Array 2', type: 'numberArray' }
      ],
      defaultValues: { nums1: [1, 2, 3], nums2: [2, 5, 6] },
      validate: (values) => {
        if (!values.nums1 || !values.nums2) return 'Enter arrays'
        return null
      }
    },
    getSteps: ({ nums1, nums2 } = {}) => {
      const n1 = nums1 ?? [1, 2, 3]
      const n2 = nums2 ?? [2, 5, 6]
      const m = n1.length
      const n = n2.length
      // Create the padded array nums1 of size m + n
      const paddedNums1 = [...n1, ...Array(n).fill(0)]
      return mergeSortedArray(paddedNums1, m, n2, n)
    },
  },
  {
    id: 'reverseString',
    title: 'Reverse String',
    category: 'Strings',
    difficulty: 'Easy',
    tags: ['string','two-pointers'],
    visualization: reverseStringVisualization,
    input: {
      fields: [{ key: 'input', label: 'String', type: 'text' }],
      defaultValues: { input: 'hello' },
      validate: (values) => typeof values.input !== 'string' ? 'Enter a valid string' : null
    },
    getSteps: ({ input } = {}) =>
      reverseString(typeof input === 'string' ? input.split('') : (input ?? ['h', 'e', 'l', 'l', 'o'])),
  },
  {
    id: 'evaluateRPN',
    title: 'Evaluate Reverse Polish Notation',
    category: 'Stack',
    difficulty: 'Medium',
    tags: ['stack','array','math'],
    visualization: evaluateRPNVisualization,
    input: {
      fields: [{ key: 'input', label: 'RPN Tokens (space separated)', type: 'text' }],
      defaultValues: { input: '2 1 + 3 *' },
      validate: (values) => typeof values.input !== 'string' || !values.input.trim() ? 'Enter a valid RPN string' : null
    },
    getSteps: ({ input } = {}) =>
      evaluateRPN((input ?? '2 1 + 3 *').trim().split(/\s+/)),
  },
  {
    id: 'reverseLinkedList',
    title: 'Reverse Linked List',
    category: 'Linked List',
    difficulty: 'Easy',
    tags: ['linked-list','pointers'],
    visualization: reverseLinkedListVisualization,
    input: {
      fields: [{ key: 'input', label: 'Nodes', type: 'numberArray' }],
      defaultValues: { input: [1, 2, 3, 4, 5] },
      validate: (values) => !values.input || values.input.length < 1 ? 'Enter at least 1 value' : null
    },
    getSteps: ({ input } = {}) =>
      reverseLinkedList(input ?? [1, 2, 3, 4, 5]),
  },
  {
    id: 'binaryTreeLevelOrder',
    title: 'Binary Tree Level Order Traversal',
    category: 'Trees',
    difficulty: 'Medium',
    tags: ['tree','bfs','queue'],
    visualization: binaryTreeLevelOrderVisualization,
    input: {
      fields: [{ key: 'input', label: 'BFS Array (comma-separated)', type: 'text' }],
      defaultValues: { input: '3, 9, 20, null, null, 15, 7' },
      validate: (values) => typeof values.input !== 'string' || !values.input.trim() ? 'Enter a valid BFS comma-separated tree' : null
    },
    getSteps: ({ input } = {}) =>
      binaryTreeLevelOrder(input ?? '3, 9, 20, null, null, 15, 7'),
  },
  {
    id: 'graphBFS',
    title: 'Graph BFS',
    category: 'Graphs',
    difficulty: 'Medium',
    tags: ['graph','bfs','queue'],
    visualization: graphBFSVisualization,
    input: {
      fields: [{ key: 'input', label: 'Edges (comma-separated)', type: 'text' }],
      defaultValues: { input: 'A-B, B-C, A-C, C-D, C-E, D-E' },
      validate: (values) => typeof values.input !== 'string' || !values.input.trim() ? 'Enter a valid edge list' : null
    },
    getSteps: ({ input } = {}) =>
      graphBFS(input ?? 'A-B, B-C, A-C, C-D, C-E, D-E'),
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
        { key: 't', label: 'String 2', type: 'text' }
      ],
      defaultValues: { s: 'anagram', t: 'nagaram' },
      validate: (values) => {
        if (!values.s || !values.t) return 'Enter two strings'
        return null
      }
    },
    getSteps: ({ s, t } = {}) => validAnagram(s ?? 'anagram', t ?? 'nagaram')
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
      validate: (values) => !values.input ? 'Enter a string' : null
    },
    getSteps: ({ input } = {}) => validPalindrome(input ?? 'racecar')
  },
  {
    id: 'mergeTwoSortedLists',
    title: 'Merge Two Sorted Lists',
    category: 'Linked List',
    difficulty: 'Easy',
    tags: ['linked-list', 'recursion', 'two-pointers'],
    visualization: mergeTwoSortedListsVisualization,
    input: {
      fields: [
        { key: 'l1', label: 'List 1', type: 'numberArray' },
        { key: 'l2', label: 'List 2', type: 'numberArray' }
      ],
      defaultValues: { l1: [1, 2, 4], l2: [1, 3, 4] },
      validate: () => null
    },
    getSteps: ({ l1, l2 } = {}) => mergeTwoSortedLists(l1 ?? [1, 2, 4], l2 ?? [1, 3, 4])
  },
  {
    id: 'maxDepthBinaryTree',
    title: 'Maximum Depth of Binary Tree',
    category: 'Trees',
    difficulty: 'Easy',
    tags: ['tree', 'dfs', 'recursion'],
    visualization: maxDepthBinaryTreeVisualization,
    input: {
      fields: [{ key: 'input', label: 'Tree Nodes', type: 'text' }],
      defaultValues: { input: '3, 9, 20, null, null, 15, 7' },
      validate: () => null
    },
    getSteps: ({ input } = {}) => maxDepthBinaryTree(input ?? '3, 9, 20, null, null, 15, 7')
  },
  {
    id: 'invertBinaryTree',
    title: 'Invert Binary Tree',
    category: 'Trees',
    difficulty: 'Easy',
    tags: ['tree', 'dfs', 'recursion'],
    visualization: invertBinaryTreeVisualization,
    input: {
      fields: [{ key: 'input', label: 'Tree Nodes', type: 'text' }],
      defaultValues: { input: '4, 2, 7, 1, 3, 6, 9' },
      validate: () => null
    },
    getSteps: ({ input } = {}) => invertBinaryTree(input ?? '4, 2, 7, 1, 3, 6, 9')
  },
  {
    id: 'linkedListCycle',
    title: 'Linked List Cycle',
    category: 'Linked List',
    difficulty: 'Easy',
    tags: ['linked-list', 'two-pointers', 'fast-slow'],
    visualization: linkedListCycleVisualization,
    input: {
      fields: [{ key: 'input', label: 'List Nodes', type: 'numberArray' }],
      defaultValues: { input: [3, 2, 0, -4] },
      validate: () => null
    },
    getSteps: ({ input } = {}) => linkedListCycle(input ?? [3, 2, 0, -4])
  },
  {
    id: 'minStack',
    title: 'Min Stack',
    category: 'Stack',
    difficulty: 'Medium',
    tags: ['stack', 'design'],
    visualization: minStackVisualization,
    input: {
      fields: [{ key: 'input', label: 'Operations', type: 'text' }],
      defaultValues: { input: 'push -2, push 0, push -3, getMin, pop, top, getMin' },
      validate: () => null
    },
    getSteps: ({ input } = {}) => minStack((input ?? 'push -2, push 0, push -3, getMin, pop, top, getMin').split(', '))
  },
  {
    id: 'dailyTemperatures',
    title: 'Daily Temperatures',
    category: 'Stack',
    difficulty: 'Medium',
    tags: ['stack', 'monotonic-stack', 'array'],
    visualization: dailyTemperaturesVisualization,
    input: {
      fields: [{ key: 'input', label: 'Temperatures', type: 'numberArray' }],
      defaultValues: { input: [73, 74, 75, 71, 69, 72, 76, 73] },
      validate: () => null
    },
    getSteps: ({ input } = {}) => dailyTemperatures(input ?? [73, 74, 75, 71, 69, 72, 76, 73])
  },
  {
    id: 'numberOfIslands',
    title: 'Number of Islands',
    category: 'Graphs',
    difficulty: 'Medium',
    tags: ['graph', 'matrix', 'dfs', 'bfs'],
    visualization: numberOfIslandsVisualization,
    input: {
      fields: [{ key: 'input', label: 'Grid Rows', type: 'text' }],
      defaultValues: { input: '11110, 11010, 11000, 00000' },
      validate: () => null
    },
    getSteps: ({ input } = {}) => numberOfIslands((input ?? '11110, 11010, 11000, 00000').split(', '))
  },
  {
    id: 'dfs',
    title: 'DFS',
    category: 'Graphs',
    difficulty: 'Easy',
    tags: ['graph', 'dfs', 'traversal'],
    visualization: dfsVisualization,
    input: {
      fields: [{ key: 'input', label: 'Edges', type: 'text' }],
      defaultValues: { input: 'A-B, B-C, A-C, C-D' },
      validate: () => null
    },
    getSteps: ({ input } = {}) => dfs(input ?? 'A-B, B-C, A-C, C-D')
  }
]