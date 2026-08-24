const fs = require('fs');
const path = require('path');

function fix(file, mapping) {
  let content = fs.readFileSync(file, 'utf8');
  Object.keys(mapping).forEach(oldLine => {
    const newLine = mapping[oldLine];
    // use a regex to only match exactly codeLine: N,
    content = content.replace(new RegExp(`codeLine:\\s*${oldLine},`, 'g'), `codeLine: __TEMP__${newLine},`);
  });
  content = content.replace(/__TEMP__/g, '');
  fs.writeFileSync(file, content);
}

// binarySearch: old -> new
// 4 -> 5, 5 -> 6, 6 -> 7, 7 -> 8, 9 -> 11 (wait, old 9 was return -1. New is 11)
// Let's reset binarySearch first
