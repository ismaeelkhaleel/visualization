import { moveZeroesCode } from '../data/moveZeroesCode'
import { twoSumCode } from '../data/twoSumCode'
import { binarySearchCode } from '../data/binarySearchCode'
import { maxProfitCode } from '../data/maxProfitCode'
import { validParenthesesCode } from '../data/validParenthesesCode'
import { containsDuplicateCode } from '../data/containsDuplicateCode'
import { maxSubArrayCode } from '../data/maxSubArrayCode'
import { mergeSortedArrayCode } from '../data/mergeSortedArrayCode'
import { reverseStringCode } from '../data/reverseStringCode'
import { evaluateRPNCode } from '../data/evaluateRPNCode'

export type VisualizationConfig = {
    explanation?: string;
    timeComplexity?: string;
    spaceComplexity?: string;
    title: string
    code: string[]
}

export const moveZeroesVisualization: VisualizationConfig = {
    explanation: 'Shift all zeroes to the end while maintaining the order of non-zero elements.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'MOVE ZEROES',
    code: moveZeroesCode,
}

export const twoSumVisualization: VisualizationConfig = {
    explanation: 'Use two pointers to find two numbers that add up to the target.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'TWO SUM',
    code: twoSumCode,
}

export const binarySearchVisualization: VisualizationConfig = {
    explanation: 'Repeatedly halve the search interval to find the target.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    title: 'BINARY SEARCH',
    code: binarySearchCode,
}

export const maxProfitVisualization: VisualizationConfig = {
    explanation: 'Track the minimum price to find the maximum profit.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'BEST TIME TO BUY & SELL',
    code: maxProfitCode,
}

export const validParenthesesVisualization: VisualizationConfig = {
    explanation: 'Use a stack to ensure brackets are closed in the correct order.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    title: 'VALID PARENTHESES',
    code: validParenthesesCode,
}

export const containsDuplicateVisualization: VisualizationConfig = {
    explanation: 'Use a set to detect if any element appears more than once.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    title: 'CONTAINS DUPLICATE',
    code: containsDuplicateCode,
}

export const maxSubArrayVisualization: VisualizationConfig = {
    explanation: 'Maintain the current running sum to find the contiguous subarray with the largest sum.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'MAXIMUM SUBARRAY',
    code: maxSubArrayCode,
}

export const mergeSortedArrayVisualization: VisualizationConfig = {
    explanation: 'Merge two sorted arrays from the back to avoid overwriting.',
    timeComplexity: 'O(m+n)',
    spaceComplexity: 'O(1)',
    title: 'MERGE SORTED ARRAY',
    code: mergeSortedArrayCode,
}

export const reverseStringVisualization: VisualizationConfig = {
    explanation: 'Swap characters from both ends until the middle is reached.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'REVERSE STRING',
    code: reverseStringCode,
}

export const evaluateRPNVisualization: VisualizationConfig = {
    explanation: 'Use a stack to evaluate the postfix expression.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    title: 'EVALUATE RPN',
    code: evaluateRPNCode,
}

import { reverseLinkedListCode } from '../data/reverseLinkedListCode'

export const reverseLinkedListVisualization: VisualizationConfig = {
    explanation: 'Walk the list and flip every next pointer backward.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'REVERSE LINKED LIST',
    code: reverseLinkedListCode,
}

import { binaryTreeLevelOrderCode } from '../data/binaryTreeLevelOrderCode'

export const binaryTreeLevelOrderVisualization: VisualizationConfig = {
    explanation: 'Traverse the tree level by level using a queue.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    title: 'BINARY TREE LEVEL ORDER TRAVERSAL',
    code: binaryTreeLevelOrderCode,
}

import { graphBFSCode } from '../data/graphBFSCode'

export const graphBFSVisualization: VisualizationConfig = {
    explanation: 'Explore the graph level by level from the source node.',
    timeComplexity: 'O(V+E)',
    spaceComplexity: 'O(V)',
    title: 'GRAPH BFS',
    code: graphBFSCode,
}

import { validAnagramCode } from '../data/validAnagramCode'
export const validAnagramVisualization: VisualizationConfig = {
    explanation: 'Count character frequencies to check if strings are anagrams.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)', title: 'VALID ANAGRAM', code: validAnagramCode }

import { validPalindromeCode } from '../data/validPalindromeCode'
export const validPalindromeVisualization: VisualizationConfig = {
    explanation: 'Check if the string reads the same forwards and backwards.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)', title: 'VALID PALINDROME', code: validPalindromeCode }

import { mergeTwoSortedListsCode } from '../data/mergeTwoSortedListsCode'
export const mergeTwoSortedListsVisualization: VisualizationConfig = {
    explanation: 'Iterate through both lists and attach the smaller node to the merged list.',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(1)', title: 'MERGE TWO SORTED LISTS', code: mergeTwoSortedListsCode }

import { maxDepthBinaryTreeCode } from '../data/maxDepthBinaryTreeCode'
export const maxDepthBinaryTreeVisualization: VisualizationConfig = {
    explanation: 'Find the longest path from the root node down to the farthest leaf node.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)', title: 'MAX DEPTH OF BINARY TREE', code: maxDepthBinaryTreeCode }

import { invertBinaryTreeCode } from '../data/invertBinaryTreeCode'
export const invertBinaryTreeVisualization: VisualizationConfig = {
    explanation: 'Swap the left and right children of all nodes in the tree.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)', title: 'INVERT BINARY TREE', code: invertBinaryTreeCode }

import { linkedListCycleCode } from '../data/linkedListCycleCode'
export const linkedListCycleVisualization: VisualizationConfig = {
    explanation: 'Use a slow and fast pointer to detect if the list has a cycle.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)', title: 'LINKED LIST CYCLE', code: linkedListCycleCode }

import { minStackCode } from '../data/minStackCode'
export const minStackVisualization: VisualizationConfig = {
    explanation: 'Maintain a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)', title: 'MIN STACK', code: minStackCode }

import { dailyTemperaturesCode } from '../data/dailyTemperaturesCode'
export const dailyTemperaturesVisualization: VisualizationConfig = {
    explanation: 'Use a monotonic stack to find the next warmer day.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)', title: 'DAILY TEMPERATURES', code: dailyTemperaturesCode }

import { numberOfIslandsCode } from '../data/numberOfIslandsCode'
export const numberOfIslandsVisualization: VisualizationConfig = {
    explanation: 'Use DFS/BFS to traverse and mark connected lands.',
    timeComplexity: 'O(m*n)',
    spaceComplexity: 'O(m*n)', title: 'NUMBER OF ISLANDS', code: numberOfIslandsCode }

import { dfsCode } from '../data/dfsCode'
export const dfsVisualization: VisualizationConfig = {
    explanation: 'Explore as far as possible along each branch before backtracking.',
    timeComplexity: 'O(V+E)',
    spaceComplexity: 'O(V)', title: 'DFS', code: dfsCode }
