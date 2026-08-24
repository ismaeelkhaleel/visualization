const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Remove from the useEffect
const badInsertion = `
  const allCategories = ['Arrays', 'Binary Search', 'Strings', 'Stack', 'Linked List', 'Trees', 'Graphs']
  const uniqueCategories = Array.from(new Set(problems.map(p => p.category)))
  const categories = uniqueCategories.sort((a, b) => {
    const indexA = allCategories.indexOf(a)
    const indexB = allCategories.indexOf(b)
    if (indexA === -1 && indexB === -1) return a.localeCompare(b)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })
  
  const filteredProblems = problems.filter(p => p.category === selectedCategory)

  return (`;

app = app.replace(badInsertion, "  return (");

// Insert before the main return statement.
// The main return is `return (\n    <div`
app = app.replace(
  /  return \(\n    <div/g,
  `
  const allCategories = ['Arrays', 'Binary Search', 'Strings', 'Stack', 'Linked List', 'Trees', 'Graphs']
  const uniqueCategories = Array.from(new Set(problems.map(p => p.category)))
  const categories = uniqueCategories.sort((a, b) => {
    const indexA = allCategories.indexOf(a)
    const indexB = allCategories.indexOf(b)
    if (indexA === -1 && indexB === -1) return a.localeCompare(b)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })
  
  const filteredProblems = problems.filter(p => p.category === selectedCategory)

  return (
    <div`
);

fs.writeFileSync('src/App.tsx', app);
