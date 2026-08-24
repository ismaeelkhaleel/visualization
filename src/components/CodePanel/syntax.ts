const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'break', 'continue', 'new', 'true', 'false', 'null', 'undefined', 'in', 'of', 'class', 'extends', 'super',
  // Java keywords & types
  'int', 'boolean', 'String', 'char', 'long', 'double', 'public', 'private', 'static', 'void'
])

export type TokenType = 'comment' | 'string' | 'number' | 'operator' | 'punctuation' | 'keyword' | 'identifier' | 'function' | 'whitespace' | 'text'

export interface Token {
  type: TokenType
  value: string
}

export function tokenize(line: string): Token[] {
  const regex = /(\/\/.*)|("[^"]*"|'[^']*'|`[^`]*`)|(\b\d+\b)|(===|!==|==|!=|<=|>=|\+\+|--|=>|[=+\-*/<>!&|])|([(){}\[\],.;:])|([a-zA-Z_$][a-zA-Z0-9_$]*)|(\s+)/g
  
  const tokens: Token[] = []
  let match
  let lastIndex = 0
  
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: line.slice(lastIndex, match.index) })
    }
    
    let type: TokenType = 'text'
    if (match[1]) type = 'comment'
    else if (match[2]) type = 'string'
    else if (match[3]) type = 'number'
    else if (match[4]) type = 'operator'
    else if (match[5]) type = 'punctuation'
    else if (match[6]) {
      if (KEYWORDS.has(match[6])) {
        type = 'keyword'
      } else {
        type = 'identifier'
      }
    } else if (match[7]) {
      type = 'whitespace'
    }
    
    tokens.push({ type, value: match[0] })
    lastIndex = regex.lastIndex
  }
  
  if (lastIndex < line.length) {
    tokens.push({ type: 'text', value: line.slice(lastIndex) })
  }
  
  // Second pass: identify functions (identifiers followed by '(' ignoring whitespace)
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'identifier') {
      let j = i + 1;
      while (j < tokens.length && tokens[j].type === 'whitespace') {
        j++;
      }
      if (j < tokens.length && tokens[j].value === '(') {
        tokens[i].type = 'function'
      }
    }
  }

  return tokens
}
