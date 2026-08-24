import type { VisualizationStep, StackItem } from './types'
export function validParentheses(s: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = s.split('').map((v, i) => ({ id: i, value: v }))
  const stack: StackItem[] = []
  let nextId = 0
  steps.push({ codeLine: 2, message: 'Initialize empty stack', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }] })
  for (let i = 0; i < arr.length; i++) {
    const char = arr[i].value
    steps.push({ codeLine: 4, message: `Check character '${char}'`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
    if (char === '(' || char === '{' || char === '[') {
      stack.push({ id: nextId++, value: char })
      steps.push({ codeLine: 5, message: `Push '${char}' to stack`, audioEvent: 'push', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
    } else {
      if (stack.length === 0) {
        steps.push({ codeLine: 8, message: 'Stack is empty, invalid parentheses!', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
        return steps
      }
      const top = stack.pop()!
      steps.push({ codeLine: 9, message: `Pop top of stack: '${top.value}'`, audioEvent: 'pop', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack], action: 'pop' } }] })
      
      const isMatch = (char === ')' && top.value === '(') || (char === '}' && top.value === '{') || (char === ']' && top.value === '[')
      if (!isMatch) {
        steps.push({ codeLine: 10, message: `Mismatch! '${top.value}' does not match '${char}'`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
        return steps
      } else {
        steps.push({ codeLine: 10, message: 'Parentheses match', audioEvent: 'match', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
      }
    }
  }
  const isValid = stack.length === 0
  steps.push({ codeLine: 15, message: isValid ? 'All parentheses matched!' : 'Stack not empty, invalid!', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }] })
  return steps
}