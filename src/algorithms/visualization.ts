import { moveZeroesCode } from '../data/moveZeroesCode'
import { twoSumCode } from '../data/twoSumCode'
import { maxProfitCode } from '../data/maxProfitCode'
import { containsDuplicateCode } from '../data/containsDuplicateCode'
import { maxSubArrayCode } from '../data/maxSubArrayCode'
import { mergeSortedArrayCode } from '../data/mergeSortedArrayCode'
import { reverseStringCode } from '../data/reverseStringCode'
import { validAnagramCode } from '../data/validAnagramCode'
import { validPalindromeCode } from '../data/validPalindromeCode'
import {
    intersectionCode,
    intersectionIICode,
    majorityElementCode,
    mergeIntervalsCode,
    missingNumberCode,
    pivotIndexCode,
    productExceptSelfCode,
    removeDuplicatesCode,
    rotateArrayCode,
    runningSumCode,
    sortedSquaresCode,
    sortColorsCode,
    subarraySumCode,
    threeSumCode,
} from '../data/arrayProblemCodes'

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

export const maxProfitVisualization: VisualizationConfig = {
    explanation: 'Track the minimum price to find the maximum profit.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'BEST TIME TO BUY & SELL',
    code: maxProfitCode,
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

export const productExceptSelfVisualization: VisualizationConfig = {
    explanation: 'Build the result from left prefix products and right suffix products.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'PRODUCT EXCEPT SELF',
    code: productExceptSelfCode,
}

export const removeDuplicatesVisualization: VisualizationConfig = {
    explanation: 'Compact unique values into the front of a sorted array.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'REMOVE DUPLICATES',
    code: removeDuplicatesCode,
}

export const rotateArrayVisualization: VisualizationConfig = {
    explanation: 'Rotate in place with three reversals.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'ROTATE ARRAY',
    code: rotateArrayCode,
}

export const sortColorsVisualization: VisualizationConfig = {
    explanation: 'Use low, mid, and high pointers to partition 0s, 1s, and 2s.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'SORT COLORS',
    code: sortColorsCode,
}

export const majorityElementVisualization: VisualizationConfig = {
    explanation: 'Cancel votes until the majority candidate remains.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'MAJORITY ELEMENT',
    code: majorityElementCode,
}

export const missingNumberVisualization: VisualizationConfig = {
    explanation: 'XOR every index and value; equal pairs cancel out.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'MISSING NUMBER',
    code: missingNumberCode,
}

export const pivotIndexVisualization: VisualizationConfig = {
    explanation: 'Find the index where left sum equals right sum.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'PIVOT INDEX',
    code: pivotIndexCode,
}

export const runningSumVisualization: VisualizationConfig = {
    explanation: 'Accumulate each value into the running total.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    title: 'RUNNING SUM',
    code: runningSumCode,
}

export const sortedSquaresVisualization: VisualizationConfig = {
    explanation: 'Compare absolute values at both ends and fill from the back.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    title: 'SORTED SQUARES',
    code: sortedSquaresCode,
}

export const intersectionVisualization: VisualizationConfig = {
    explanation: 'Use a set to keep only values present in both arrays.',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(n)',
    title: 'INTERSECTION',
    code: intersectionCode,
}

export const intersectionIIVisualization: VisualizationConfig = {
    explanation: 'Count values from one array and consume matches from the other.',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(n)',
    title: 'INTERSECTION II',
    code: intersectionIICode,
}

export const mergeIntervalsVisualization: VisualizationConfig = {
    explanation: 'Sort intervals, then merge overlapping ranges.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    title: 'MERGE INTERVALS',
    code: mergeIntervalsCode,
}

export const subarraySumVisualization: VisualizationConfig = {
    explanation: 'Track prefix sums and count earlier sums that complete the target.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    title: 'SUBARRAY SUM K',
    code: subarraySumCode,
}

export const threeSumVisualization: VisualizationConfig = {
    explanation: 'Fix one value, then use two pointers to find pairs that sum to zero.',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    title: 'THREE SUM',
    code: threeSumCode,
}

export const validAnagramVisualization: VisualizationConfig = {
    explanation: 'Count character frequencies to check if strings are anagrams.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)', title: 'VALID ANAGRAM', code: validAnagramCode 
}

export const validPalindromeVisualization: VisualizationConfig = {
    explanation: 'Check if the string reads the same forwards and backwards.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)', title: 'VALID PALINDROME', code: validPalindromeCode 
}
