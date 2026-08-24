import type { VisualizationStep, StackItem } from './types'
export function evaluateRPN(tokens: string[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = tokens.map((v, i) => ({ id: i, value: v }))
  const stack: StackItem[] = []
  let nextId = 0
  steps.push({ codeLine: 2, message: 'Initialize stack', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }] })
  for (let i = 0; i < arr.length; i++) {
    const t = arr[i].value
    steps.push({ codeLine: 4, message: `Process token '${t}'`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
    if (['+', '-', '*', '/'].includes(t)) {
      const b = parseInt(stack.pop()!.value as string)
      steps.push({ codeLine: 6, message: `Pop b = ${b}`, audioEvent: 'pop', elements: [{ type: 'array', data: { values: [...arr], highlights: [i] } }, { type: 'stack', data: { items: [...stack], action: 'pop' } }] })
      const a = parseInt(stack.pop()!.value as string)
      steps.push({ codeLine: 7, message: `Pop a = ${a}`, audioEvent: 'pop', elements: [{ type: 'array', data: { values: [...arr], highlights: [i] } }, { type: 'stack', data: { items: [...stack], action: 'pop' } }] })
      
      let res = 0
      if (t === '+') res = a + b
      else if (t === '-') res = a - b
      else if (t === '*') res = a * b
      else res = Math.trunc(a / b)
      
      stack.push({ id: nextId++, value: res.toString() })
      steps.push({ codeLine: 8, message: `Push result ${a} ${t} ${b} = ${res}`, audioEvent: 'push', elements: [{ type: 'array', data: { values: [...arr], highlights: [i] } }, { type: 'stack', data: { items: [...stack] } }] })
    } else {
      stack.push({ id: nextId++, value: t })
      steps.push({ codeLine: 13, message: `Push number ${t}`, audioEvent: 'push', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
    }
  }
  steps.push({ codeLine: 16, message: `Final result: ${stack[0].value}`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }] })
  return steps
}