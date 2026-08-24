const fs = require('fs')
const path = require('path')

const dir = 'src/algorithms'
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && !['types.ts', 'visualization.ts', 'mergeSortedArray.ts'].includes(f))

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8')
  
  content = content.replace(/steps\.push\(\{([\s\S]*?)\}\)/g, (match, inner) => {
    const codeLineMatch = inner.match(/codeLine:\s*(\d+)/)
    let messageMatch = inner.match(/message:\s*(`[\s\S]*?`|'.*?'|".*?")/)
    
    // If it didn't match quotes, maybe it's an expression like `isValid ? ... : ...`
    if (!messageMatch) {
       messageMatch = inner.match(/message:\s*(.*?)(?=\n\s*[a-zA-Z]+:)/)
    }

    const codeLine = codeLineMatch ? codeLineMatch[1] : '0'
    const message = messageMatch ? messageMatch[1] : "''"
    
    // strip out codeLine and message from data
    let dataStr = inner
      .replace(new RegExp(`codeLine:\\s*${codeLine},?\\s*\\n?`), '')
      .replace(new RegExp(`message:\\s*${message.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')},?\\s*\\n?`), '')

    return `steps.push({\n      codeLine: ${codeLine},\n      message: ${message},\n      elements: [\n        {\n          type: 'array',\n          data: {${dataStr}          }\n        }\n      ]\n    })`
  })
  
  fs.writeFileSync(path.join(dir, file), content)
})
