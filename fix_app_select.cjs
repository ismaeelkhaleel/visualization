const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Add selectedCategory state
app = app.replace(
  /const dailyProblem = getDailyProblem\(problems\)/,
  "const dailyProblem = getDailyProblem(problems)\n  const [selectedCategory, setSelectedCategory] = useState<string>(() => dailyProblem.category)"
);

// Add handleProblemChange
app = app.replace(
  /  const \[isGenerating, setIsGenerating\] = useState\(false\)/,
  `  const [isGenerating, setIsGenerating] = useState(false)
  
  const handleProblemChange = (nextAlgorithm: AlgorithmName) => {
    const nextProblem = problems.find((p) => p.id === nextAlgorithm)!
    
    const nextDefaultTexts: Record<string, string> = {}
    if (nextProblem.input) {
      nextProblem.input.fields.forEach(field => {
        const val = nextProblem.input!.defaultValues[field.key]
        nextDefaultTexts[field.key] = globalThis.Array.isArray(val) ? val.join(', ') : String(val)
      })
    }
    
    setInputValuesText(nextDefaultTexts)
    setGeneratedValues(nextProblem.input ? nextProblem.input.defaultValues : {})
    setInputError('')

    setIsPlaying(false)
    setCurrentStep(0)
    setAlgorithm(nextAlgorithm)
  }`
);

// Compute categories
app = app.replace(
  /  return \(/,
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

  return (`
);

// Replace select JSX
const selectRegex = /<select\s+value=\{algorithm\}\s+disabled=\{isGenerating\}\s+onChange=\{\(e\) => \{[\s\S]*?<\/select>/;

const newSelect = `
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <select
            value={selectedCategory}
            disabled={isGenerating}
            onChange={(e) => {
              const newCategory = e.target.value
              setSelectedCategory(newCategory)
              const firstProblem = problems.find(p => p.category === newCategory)
              if (firstProblem) {
                handleProblemChange(firstProblem.id as AlgorithmName)
              }
            }}
            style={{
              width: '100%',
              height: '36px',
              padding: '0 10px',
              background: '#1a1a1a',
              color: 'white',
              border: '1px solid #303030',
              borderRadius: '7px',
              outline: 'none',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              opacity: isGenerating ? 0.5 : 1,
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23999999%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px top 50%',
              backgroundSize: '10px auto',
              fontWeight: 600,
            }}
          >
            {categories.map(cat => {
              const catCount = problems.filter(p => p.category === cat).length
              return (
                <option key={cat} value={cat}>
                  {cat} · {catCount} problem{catCount !== 1 ? 's' : ''}
                </option>
              )
            })}
          </select>

          <select
            value={algorithm}
            disabled={isGenerating}
            onChange={(e) => {
              handleProblemChange(e.target.value as AlgorithmName)
            }}
            style={{
              width: '100%',
              height: '36px',
              padding: '0 10px',
              background: '#111',
              color: 'white',
              border: '1px solid #303030',
              borderRadius: '7px',
              outline: 'none',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              opacity: isGenerating ? 0.5 : 1,
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px top 50%',
              backgroundSize: '10px auto',
              fontSize: '13px'
            }}
          >
            {filteredProblems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.title}
              </option>
            ))}
          </select>
        </div>
`;

app = app.replace(selectRegex, newSelect);

fs.writeFileSync('src/App.tsx', app);
