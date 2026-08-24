const fs = require('fs');

const data = {
  moveZeroesVisualization: { explanation: "Shift all zeroes to the end while maintaining the order of non-zero elements.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  twoSumVisualization: { explanation: "Use two pointers to find two numbers that add up to the target.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  binarySearchVisualization: { explanation: "Repeatedly halve the search interval to find the target.", timeComplexity: "O(log n)", spaceComplexity: "O(1)" },
  maxProfitVisualization: { explanation: "Track the minimum price to find the maximum profit.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  validParenthesesVisualization: { explanation: "Use a stack to ensure brackets are closed in the correct order.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  containsDuplicateVisualization: { explanation: "Use a set to detect if any element appears more than once.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  maxSubArrayVisualization: { explanation: "Maintain the current running sum to find the contiguous subarray with the largest sum.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  mergeSortedArrayVisualization: { explanation: "Merge two sorted arrays from the back to avoid overwriting.", timeComplexity: "O(m+n)", spaceComplexity: "O(1)" },
  reverseStringVisualization: { explanation: "Swap characters from both ends until the middle is reached.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  evaluateRPNVisualization: { explanation: "Use a stack to evaluate the postfix expression.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  reverseLinkedListVisualization: { explanation: "Walk the list and flip every next pointer backward.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  binaryTreeLevelOrderVisualization: { explanation: "Traverse the tree level by level using a queue.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  graphBFSVisualization: { explanation: "Explore the graph level by level from the source node.", timeComplexity: "O(V+E)", spaceComplexity: "O(V)" },
  validAnagramVisualization: { explanation: "Count character frequencies to check if strings are anagrams.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  validPalindromeVisualization: { explanation: "Check if the string reads the same forwards and backwards.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  mergeTwoSortedListsVisualization: { explanation: "Iterate through both lists and attach the smaller node to the merged list.", timeComplexity: "O(n+m)", spaceComplexity: "O(1)" },
  maxDepthBinaryTreeVisualization: { explanation: "Find the longest path from the root node down to the farthest leaf node.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  invertBinaryTreeVisualization: { explanation: "Swap the left and right children of all nodes in the tree.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  linkedListCycleVisualization: { explanation: "Use a slow and fast pointer to detect if the list has a cycle.", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
  minStackVisualization: { explanation: "Maintain a stack that supports push, pop, top, and retrieving the minimum element in constant time.", timeComplexity: "O(1)", spaceComplexity: "O(n)" },
  dailyTemperaturesVisualization: { explanation: "Use a monotonic stack to find the next warmer day.", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
  numberOfIslandsVisualization: { explanation: "Use DFS/BFS to traverse and mark connected lands.", timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)" },
  dfsVisualization: { explanation: "Explore as far as possible along each branch before backtracking.", timeComplexity: "O(V+E)", spaceComplexity: "O(V)" }
};

let content = fs.readFileSync('src/algorithms/visualization.ts', 'utf8');

if (!content.includes('explanation?: string')) {
  content = content.replace(
    'export type VisualizationConfig = {',
    'export type VisualizationConfig = {\\n    explanation?: string\\n    timeComplexity?: string\\n    spaceComplexity?: string'
  );
}

for (const [key, details] of Object.entries(data)) {
  const targetObjStart = content.indexOf(\`export const \${key}: VisualizationConfig = {\`);
  if (targetObjStart === -1) continue;
  
  if (content.indexOf(\`explanation:\`, targetObjStart) !== -1) continue;
  
  const insertIndex = content.indexOf('{', targetObjStart) + 1;
  content = content.substring(0, insertIndex) + 
    \`\\n    explanation: '\${details.explanation.replace(/'/g, "\\'")}',\\n    timeComplexity: '\${details.timeComplexity}',\\n    spaceComplexity: '\${details.spaceComplexity}',\` + 
    content.substring(insertIndex);
}

// Just in case we added backslashes to newlines above, let's fix it by parsing the file using standard tools... wait, the backslashes inside template strings are safe. 
fs.writeFileSync('src/algorithms/visualization.ts', content);
