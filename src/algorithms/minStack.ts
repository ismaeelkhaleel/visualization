import type { VisualizationStep, StackItem } from './types'
export function minStack(ops: string[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const main: StackItem[] = []
  const min: StackItem[] = []
  let nextId = 0
  steps.push({ codeLine: 2, message: 'Initialize MinStack', audioEvent: 'pointer', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
  
  for (const op of ops) {
    if (op.startsWith('push')) {
      const val = parseInt(op.split(' ')[1])
      steps.push({ codeLine: 5, message: `Push ${val}`, audioEvent: 'push', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
      main.push({ id: nextId, value: val.toString() })
      const minVal = min.length === 0 ? val : Math.min(val, parseInt(min[min.length - 1].value as string))
      min.push({ id: nextId++, value: minVal.toString() })
      steps.push({ codeLine: 8, message: `Pushed ${val} to main, ${minVal} to minStack`, audioEvent: 'push', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
    } else if (op === 'pop') {
      steps.push({ codeLine: 11, message: 'Pop', audioEvent: 'pop', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
      main.pop()
      min.pop()
      steps.push({ codeLine: 13, message: 'Popped from both stacks', audioEvent: 'pop', elements: [{ type: 'stack', data: { items: [...main], action: 'pop' } }, { type: 'stack', data: { items: [...min], action: 'pop' } }] })
    } else if (op === 'getMin') {
      const minVal = min[min.length - 1].value
      steps.push({ codeLine: 16, message: `getMin returns ${minVal}`, audioEvent: 'match', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
    }
  }
  steps.push({ codeLine: 19, message: 'All operations complete', audioEvent: 'success', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
  return steps
}