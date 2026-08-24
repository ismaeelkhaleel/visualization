const fs = require('fs');

const files = fs.readdirSync('src/algorithms').filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'visualization.ts');

files.forEach(file => {
  let content = fs.readFileSync(`src/algorithms/${file}`, 'utf8');

  // Remove existing audioEvent lines added incorrectly to data object
  content = content.replace(/^\s*audioEvent: '.*',\n/gm, '');

  // Now, we need to map the step messages to audioEvents safely.
  // The structure is usually:
  // steps.push({
  //   codeLine: ...,
  //   message: `...`,
  //   elements: [ ... ]
  // })

  // We can just add audioEvent before 'elements:'
  const rules = [
    [/message: `Swap '.*\n\s*elements:/g, "message: `Swap '${s[left]}' and '${s[right]}'`,\n      audioEvent: 'pointer',\n      elements:"],
    [/message: `Swapped!`,\n\s*elements:/g, "message: `Swapped!`,\n      audioEvent: 'swap',\n      elements:"],
    [/message: `String reversed!`,\n\s*elements:/g, "message: `String reversed!`,\n      audioEvent: 'success',\n      elements:"],

    [/message: `Checking if \$\{complement\} exists in map`,\n\s*elements:/g, "message: `Checking if \${complement} exists in map`,\n      audioEvent: 'compare',\n      elements:"],
    [/message: `Found! \$\{complement\} is at index \$\{map\.get\(complement\)\}`,\n\s*elements:/g, "message: `Found! \${complement} is at index \${map.get(complement)}`,\n      audioEvent: 'match',\n      elements:"],
    [/message: `Add \$\{nums\[i\]\} to map at index \$\{i\}`,\n\s*elements:/g, "message: `Add \${nums[i]} to map at index \${i}`,\n      audioEvent: 'pointer',\n      elements:"],
    [/message: `No solution found`,\n\s*elements:/g, "message: `No solution found`,\n      audioEvent: 'success',\n      elements:"],

    [/message: `Push ` \+ token \+ ` to stack`,\n\s*elements:/g, "message: `Push ` + token + ` to stack`,\n      audioEvent: 'push',\n      elements:"],
    [/message: `Pop ` \+ b \+ ` and ` \+ a,\n\s*elements:/g, "message: `Pop ` + b + ` and ` + a,\n      audioEvent: 'pop',\n      elements:"],
    [/message: `Push result ` \+ res \+ ` back to stack`,\n\s*elements:/g, "message: `Push result ` + res + ` back to stack`,\n      audioEvent: 'push',\n      elements:"],
    [/message: `Result is ` \+ stack\[0\]\.value,\n\s*elements:/g, "message: `Result is ` + stack[0].value,\n      audioEvent: 'success',\n      elements:"],

    [/message: `Save next node: \$\{nextValue\}`,\n\s*elements:/g, "message: `Save next node: \${nextValue}`,\n      audioEvent: 'pointer',\n      elements:"],
    [/message: `Reverse pointer`,\n\s*elements:/g, "message: `Reverse pointer`,\n      audioEvent: 'move',\n      elements:"],
    [/message: `Move prev and curr forward`,\n\s*elements:/g, "message: `Move prev and curr forward`,\n      audioEvent: 'pointer',\n      elements:"],
    [/message: `List reversed!`,\n\s*elements:/g, "message: `List reversed!`,\n      audioEvent: 'success',\n      elements:"],

    [/message: `Enqueue root ` \+ root\.value,\n\s*elements:/g, "message: `Enqueue root ` + root.value,\n      audioEvent: 'enqueue',\n      elements:"],
    [/message: `Dequeue ` \+ node\.value,\n\s*elements:/g, "message: `Dequeue ` + node.value,\n      audioEvent: 'dequeue',\n      elements:"],
    [/message: `Visit node ` \+ node\.value,\n\s*elements:/g, "message: `Visit node ` + node.value,\n      audioEvent: 'visit',\n      elements:"],
    [/message: `Enqueue left child ` \+ node\.leftId,\n\s*elements:/g, "message: `Enqueue left child ` + node.leftId,\n      audioEvent: 'enqueue',\n      elements:"],
    [/message: `Enqueue right child ` \+ node\.rightId,\n\s*elements:/g, "message: `Enqueue right child ` + node.rightId,\n      audioEvent: 'enqueue',\n      elements:"],
    [/message: `Traversal complete!`,\n\s*elements:/g, "message: `Traversal complete!`,\n      audioEvent: 'success',\n      elements:"],

    [/message: `Start at ` \+ startNodeId,\n\s*elements:/g, "message: `Start at ` + startNodeId,\n      audioEvent: 'enqueue',\n      elements:"],
    [/message: `Dequeue ` \+ currId,\n\s*elements:/g, "message: `Dequeue ` + currId,\n      audioEvent: 'dequeue',\n      elements:"],
    [/message: `Visit ` \+ currId,\n\s*elements:/g, "message: `Visit ` + currId,\n      audioEvent: 'visit',\n      elements:"],
    [/message: `Already visited ` \+ neighborId \+ `, skip`,\n\s*elements:/g, "message: `Already visited ` + neighborId + `, skip`,\n      audioEvent: 'skip',\n      elements:"],
    [/message: `Enqueue neighbor ` \+ neighborId,\n\s*elements:/g, "message: `Enqueue neighbor ` + neighborId,\n      audioEvent: 'enqueue',\n      elements:"],
    [/message: `BFS complete!`,\n\s*elements:/g, "message: `BFS complete!`,\n      audioEvent: 'success',\n      elements:"],

    [/message: `Compare nums1\[\$\{p1\}\] \(\$\{nums1\[p1\]\}\) and nums2\[\$\{p2\}\] \(\$\{nums2\[p2\]\}\)`,\n\s*elements:/g, "message: `Compare nums1[${p1}] (${nums1[p1]}) and nums2[${p2}] (${nums2[p2]})`,\n      audioEvent: 'compare',\n      elements:"],
    [/message: `Place \$\{nums1\[p1\]\} at end`,\n\s*elements:/g, "message: `Place \${nums1[p1]} at end`,\n      audioEvent: 'move',\n      elements:"],
    [/message: `Place \$\{nums2\[p2\]\} at end`,\n\s*elements:/g, "message: `Place \${nums2[p2]} at end`,\n      audioEvent: 'move',\n      elements:"],
    [/message: `Copy remaining \$\{nums2\[p2\]\}`,\n\s*elements:/g, "message: `Copy remaining \${nums2[p2]}`,\n      audioEvent: 'move',\n      elements:"],
    [/message: `Array is merged!`,\n\s*elements:/g, "message: `Array is merged!`,\n      audioEvent: 'success',\n      elements:"]
  ];

  rules.forEach(([regex, rep]) => {
    content = content.replace(regex, rep);
  });

  fs.writeFileSync(`src/algorithms/${file}`, content);
});

