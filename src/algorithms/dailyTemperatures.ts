import type { VisualizationStep, StackItem } from './types'
export function dailyTemperatures(temps: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = temps.map((v, i) => ({ id: i, value: v }))
  const res = new Array(temps.length).fill(0).map((v, i) => ({ id: i + 100, value: v }))
  const stack: StackItem[] = []
  let nextId = 0
  
  steps.push({ codeLine: 2, message: 'Initialize result array & monotonic stack', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }, { type: 'array', data: { values: [...res] } }] })
  
  for (let i = 0; i < temps.length; i++) {
    steps.push({ codeLine: 4, message: `Process day ${i} with temp ${temps[i]}`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }, { type: 'array', data: { values: [...res] } }] })
    
    while (stack.length > 0 && temps[i] > temps[parseInt(stack[stack.length - 1].value as string)]) {
      const idx = parseInt(stack.pop()!.value as string)
      steps.push({ codeLine: 7, message: `Temp ${temps[i]} > ${temps[idx]}. Pop day ${idx}`, audioEvent: 'pop', elements: [{ type: 'array', data: { values: [...arr], highlights: [i, idx], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack], action: 'pop' } }, { type: 'array', data: { values: [...res] } }] })
      
      res[idx].value = i - idx
      steps.push({ codeLine: 8, message: `Wait time for day ${idx} is ${i - idx} days`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }, { type: 'array', data: { values: [...res], highlights: [idx] } }] })
    }
    stack.push({ id: nextId++, value: i.toString() })
    steps.push({ codeLine: 10, message: `Push day ${i} to stack`, audioEvent: 'push', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }, { type: 'array', data: { values: [...res] } }] })
  }
  
  steps.push({ codeLine: 12, message: 'Done processing', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }, { type: 'array', data: { values: [...res] } }] })
  return steps
}