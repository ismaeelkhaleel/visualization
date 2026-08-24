const fs = require('fs');

let content = fs.readFileSync('src/data/problems.ts', 'utf8');

const metadataMap = {
  'moveZeroes': { category: 'Arrays', difficulty: 'Easy', tags: ['two-pointers', 'in-place', 'array'] },
  'twoSum': { category: 'Arrays', difficulty: 'Easy', tags: ['two-pointers', 'sorted-array', 'array'] },
  'binarySearch': { category: 'Binary Search', difficulty: 'Easy', tags: ['binary-search', 'divide-and-conquer', 'array'] },
  'maxProfit': { category: 'Arrays', difficulty: 'Easy', tags: ['array', 'dynamic-programming', 'sliding-window'] },
  'validParentheses': { category: 'Stack', difficulty: 'Easy', tags: ['stack', 'string'] },
  'containsDuplicate': { category: 'Arrays', difficulty: 'Easy', tags: ['array', 'hash-table'] },
  'maxSubArray': { category: 'Arrays', difficulty: 'Medium', tags: ['array', 'dynamic-programming', 'kadanes'] },
  'mergeSortedArray': { category: 'Arrays', difficulty: 'Easy', tags: ['array', 'two-pointers', 'sorting'] },
  'reverseString': { category: 'Strings', difficulty: 'Easy', tags: ['string', 'two-pointers'] },
  'evaluateRPN': { category: 'Stack', difficulty: 'Medium', tags: ['stack', 'array', 'math'] },
  'reverseLinkedList': { category: 'Linked List', difficulty: 'Easy', tags: ['linked-list', 'pointers'] },
  'binaryTreeLevelOrder': { category: 'Trees', difficulty: 'Medium', tags: ['tree', 'bfs', 'queue'] },
  'graphBFS': { category: 'Graphs', difficulty: 'Medium', tags: ['graph', 'bfs', 'queue'] },
};

for (const [id, meta] of Object.entries(metadataMap)) {
  const regex = new RegExp(`(id:\\s*'${id}',\\s*\\n\\s*title:\\s*'[^']+',)`);
  const replacement = `$1\n    category: '${meta.category}',\n    difficulty: '${meta.difficulty}',\n    tags: ${JSON.stringify(meta.tags).replace(/"/g, "'")},`;
  content = content.replace(regex, replacement);
}

fs.writeFileSync('src/data/problems.ts', content);
