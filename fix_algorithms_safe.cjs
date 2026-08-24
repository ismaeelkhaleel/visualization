const fs = require('fs');

const update = (file, replacements) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    replacements.forEach(([regex, rep]) => {
      content = content.replace(regex, rep);
    });
    fs.writeFileSync(file, content);
  }
};

// reverseString
update('src/algorithms/reverseString.ts', [
  [/action: 'compare',/, "action: 'compare',\n      audioEvent: 'pointer',"], 
  [/action: 'swap',/g, "action: 'swap',\n      audioEvent: 'swap',"],
  [/action: 'done',/g, "action: 'done',\n      audioEvent: 'success',"]
]);

// twoSum
update('src/algorithms/twoSum.ts', [
  [/message: `Checking if.*\n\s*elements:/g, "message: `Checking if \${complement} exists in map`,\n      audioEvent: 'compare',\n      elements:"],
  [/message: `Found!.*\n\s*elements:/g, "message: `Found! \${complement} is at index \${map.get(complement)}`,\n      audioEvent: 'match',\n      elements:"],
  [/message: `Add.*\n\s*elements:/g, "message: `Add \${nums[i]} to map at index \${i}`,\n      audioEvent: 'pointer',\n      elements:"],
  [/message: `No solution found`,\n\s*elements:/g, "message: `No solution found`,\n      audioEvent: 'success',\n      elements:"]
]);

// evaluateRPN
update('src/algorithms/evaluateRPN.ts', [
  [/message: `Push ` \+ token.*\n\s*elements:/g, "message: `Push ` + token + ` to stack`,\n      audioEvent: 'push',\n      elements:"],
  [/message: `Pop ` \+ b.*\n\s*elements:/g, "message: `Pop ` + b + ` and ` + a,\n      audioEvent: 'pop',\n      elements:"],
  [/message: `Push result `.*\n\s*elements:/g, "message: `Push result ` + res + ` back to stack`,\n      audioEvent: 'push',\n      elements:"],
  [/message: `Result is `.*\n\s*elements:/g, "message: `Result is ` + stack[0].value,\n      audioEvent: 'success',\n      elements:"]
]);

// reverseLinkedList
update('src/algorithms/reverseLinkedList.ts', [
  [/message: `Save next node.*\n\s*elements:/g, "message: `Save next node: \${nextValue}`,\n      audioEvent: 'pointer',\n      elements:"],
  [/message: `Reverse pointer.*\n\s*elements:/g, "message: `Reverse pointer`,\n      audioEvent: 'move',\n      elements:"],
  [/message: `Move prev and curr.*\n\s*elements:/g, "message: `Move prev and curr forward`,\n      audioEvent: 'pointer',\n      elements:"],
  [/message: `List reversed!`,\n\s*elements:/g, "message: `List reversed!`,\n      audioEvent: 'success',\n      elements:"]
]);

// binaryTreeLevelOrder
update('src/algorithms/binaryTreeLevelOrder.ts', [
  [/message: `Enqueue root ` \+.*\n\s*elements:/g, "message: `Enqueue root ` + root.value,\n      audioEvent: 'enqueue',\n      elements:"],
  [/message: `Dequeue ` \+.*\n\s*elements:/g, "message: `Dequeue ` + node.value,\n      audioEvent: 'dequeue',\n      elements:"],
  [/message: `Visit node ` \+.*\n\s*elements:/g, "message: `Visit node ` + node.value,\n      audioEvent: 'visit',\n      elements:"],
  [/message: `Enqueue left child `.*\n\s*elements:/g, "message: `Enqueue left child ` + node.leftId,\n      audioEvent: 'enqueue',\n      elements:"],
  [/message: `Enqueue right child `.*\n\s*elements:/g, "message: `Enqueue right child ` + node.rightId,\n      audioEvent: 'enqueue',\n      elements:"],
  [/message: `Traversal complete!`,\n\s*elements:/g, "message: `Traversal complete!`,\n      audioEvent: 'success',\n      elements:"]
]);

// graphBFS
update('src/algorithms/graphBFS.ts', [
  [/message: `Start at `.*\n\s*elements:/g, "message: `Start at ` + startNodeId,\n      audioEvent: 'enqueue',\n      elements:"],
  [/message: `Dequeue `.*\n\s*elements:/g, "message: `Dequeue ` + currId,\n      audioEvent: 'dequeue',\n      elements:"],
  [/message: `Visit `.*\n\s*elements:/g, "message: `Visit ` + currId,\n      audioEvent: 'visit',\n      elements:"],
  [/message: `Already visited `.*\n\s*elements:/g, "message: `Already visited ` + neighborId + `, skip`,\n      audioEvent: 'skip',\n      elements:"],
  [/message: `Enqueue neighbor `.*\n\s*elements:/g, "message: `Enqueue neighbor ` + neighborId,\n      audioEvent: 'enqueue',\n      elements:"],
  [/message: `BFS complete!`,\n\s*elements:/g, "message: `BFS complete!`,\n      audioEvent: 'success',\n      elements:"]
]);

// mergeSortedArray
update('src/algorithms/mergeSortedArray.ts', [
  [/message: `Compare nums1\[\$\{p1\}\] \(\$\{nums1\[p1\]\}\) and.*\n\s*elements:/g, "message: `Compare nums1[${p1}] (${nums1[p1]}) and nums2[${p2}] (${nums2[p2]})`,\n      audioEvent: 'compare',\n      elements:"],
  [/message: `Place \$\{nums1\[p1\]\} at end`,\n\s*elements:/g, "message: `Place \${nums1[p1]} at end`,\n      audioEvent: 'move',\n      elements:"],
  [/message: `Place \$\{nums2\[p2\]\} at end`,\n\s*elements:/g, "message: `Place \${nums2[p2]} at end`,\n      audioEvent: 'move',\n      elements:"],
  [/message: `Copy remaining \$\{nums2\[p2\]\}`,\n\s*elements:/g, "message: `Copy remaining \${nums2[p2]}`,\n      audioEvent: 'move',\n      elements:"],
  [/message: `Array is merged!`,\n\s*elements:/g, "message: `Array is merged!`,\n      audioEvent: 'success',\n      elements:"]
]);

