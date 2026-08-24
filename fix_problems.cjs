const fs = require('fs');

let content = fs.readFileSync('src/data/problems.ts', 'utf8');

const imports = `
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
`;

const additions = `
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
      validate: (values) => null
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
      validate: (values) => null
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
      validate: (values) => null
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
      validate: (values) => null
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
      validate: (values) => null
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
      validate: (values) => null
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
      validate: (values) => null
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
      validate: (values) => null
    },
    getSteps: ({ input } = {}) => dfs(input ?? 'A-B, B-C, A-C, C-D')
  }
];
`;

content = imports + "\n" + content;
content = content.replace(/\]\s*$/, additions + "\n]");

fs.writeFileSync('src/data/problems.ts', content);
