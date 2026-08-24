import type { VisualizationStep } from './types'
export function maxProfit(prices: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = prices.map((v, i) => ({ id: i, value: v }))
  if(arr.length === 0) return []
  let minPrice = Infinity
  let maxProfit = 0
  let minIdx = -1
  for (let i = 0; i < arr.length; i++) {
    steps.push({ codeLine: 4, message: `Check price ${arr[i].value} on day ${i}`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }] })
    if (arr[i].value < minPrice) {
      minPrice = arr[i].value
      minIdx = i
      steps.push({ codeLine: 5, message: `New minimum price found: ${minPrice}`, audioEvent: 'match', elements: [{ type: 'array', data: { values: [...arr], highlights: [minIdx, i], pointers: [{label:'min',index:minIdx,position:'bottom'}, {label:'i',index:i,position:'top'}] } }] })
    } else {
      let profit = arr[i].value - minPrice
      steps.push({ codeLine: 6, message: `Calculate profit: ${arr[i].value} - ${minPrice} = ${profit}`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [minIdx, i], pointers: [{label:'min',index:minIdx,position:'bottom'}, {label:'i',index:i,position:'top'}] } }] })
      if (profit > maxProfit) {
        maxProfit = profit
        steps.push({ codeLine: 7, message: `New max profit: ${maxProfit}`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [minIdx, i], pointers: [{label:'min',index:minIdx,position:'bottom'}, {label:'i',index:i,position:'top'}] } }] })
      }
    }
  }
  steps.push({ codeLine: 10, message: `Final max profit: ${maxProfit}`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }] })
  return steps
}