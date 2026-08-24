const fs = require('fs');

let content = fs.readFileSync('src/algorithms/visualization.ts', 'utf8');

const additions = `
import { validAnagramCode } from '../data/validAnagramCode'
export const validAnagramVisualization: VisualizationConfig = { title: 'VALID ANAGRAM', code: validAnagramCode }

import { validPalindromeCode } from '../data/validPalindromeCode'
export const validPalindromeVisualization: VisualizationConfig = { title: 'VALID PALINDROME', code: validPalindromeCode }

import { mergeTwoSortedListsCode } from '../data/mergeTwoSortedListsCode'
export const mergeTwoSortedListsVisualization: VisualizationConfig = { title: 'MERGE TWO SORTED LISTS', code: mergeTwoSortedListsCode }

import { maxDepthBinaryTreeCode } from '../data/maxDepthBinaryTreeCode'
export const maxDepthBinaryTreeVisualization: VisualizationConfig = { title: 'MAX DEPTH OF BINARY TREE', code: maxDepthBinaryTreeCode }

import { invertBinaryTreeCode } from '../data/invertBinaryTreeCode'
export const invertBinaryTreeVisualization: VisualizationConfig = { title: 'INVERT BINARY TREE', code: invertBinaryTreeCode }

import { linkedListCycleCode } from '../data/linkedListCycleCode'
export const linkedListCycleVisualization: VisualizationConfig = { title: 'LINKED LIST CYCLE', code: linkedListCycleCode }

import { minStackCode } from '../data/minStackCode'
export const minStackVisualization: VisualizationConfig = { title: 'MIN STACK', code: minStackCode }

import { dailyTemperaturesCode } from '../data/dailyTemperaturesCode'
export const dailyTemperaturesVisualization: VisualizationConfig = { title: 'DAILY TEMPERATURES', code: dailyTemperaturesCode }

import { numberOfIslandsCode } from '../data/numberOfIslandsCode'
export const numberOfIslandsVisualization: VisualizationConfig = { title: 'NUMBER OF ISLANDS', code: numberOfIslandsCode }

import { dfsCode } from '../data/dfsCode'
export const dfsVisualization: VisualizationConfig = { title: 'DFS', code: dfsCode }
`;

fs.writeFileSync('src/algorithms/visualization.ts', content + '\n' + additions);
