import type { VisualizationStep } from './types'
export function maxProfit(prices: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = prices.map((v, i) => ({ id: i, value: v }))
  if(arr.length === 0) return []
  let minPrice = Infinity
  let maxProfit = 0
  let minIdx = -1
  for (let i = 0; i < arr.length; i++) {
    steps.push({ codeLine: 5, message: `Check price ${arr[i].value} on day ${i}`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'sell',index:i,position:'top'}], metrics: [{ label: 'best', value: maxProfit, tone: 'success' }, { label: 'min', value: minPrice === Infinity ? '-' : minPrice, tone: 'active' }] } }] })
    if (arr[i].value < minPrice) {
      minPrice = arr[i].value
      minIdx = i
      steps.push({ codeLine: 6, message: `New buy price: ${minPrice}`, audioEvent: 'match', elements: [{ type: 'array', data: { values: [...arr], highlights: [minIdx], pointers: [{label:'buy',index:minIdx,position:'bottom'}, {label:'sell',index:i,position:'top'}], metrics: [{ label: 'buy', value: minPrice, tone: 'active' }, { label: 'best', value: maxProfit, tone: 'success' }] } }] })
    } else {
      let profit = arr[i].value - minPrice
      steps.push({ codeLine: 7, message: `Profit: ${arr[i].value} - ${minPrice} = ${profit}`, audioEvent: 'compare', elements: [{ type: 'array', data: { values: [...arr], highlights: [minIdx, i], secondaryHighlights: Array.from({ length: i + 1 }, (_, idx) => idx), pointers: [{label:'buy',index:minIdx,position:'bottom'}, {label:'sell',index:i,position:'top'}], metrics: [{ label: 'profit', value: profit, tone: 'compare' }, { label: 'best', value: maxProfit, tone: 'success' }] } }] })
      if (profit > maxProfit) {
        maxProfit = profit
        steps.push({ codeLine: 8, message: `New best profit: ${maxProfit}`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [minIdx, i], pointers: [{label:'buy',index:minIdx,position:'bottom'}, {label:'sell',index:i,position:'top'}], metrics: [{ label: 'best', value: maxProfit, tone: 'success' }] } }] })
      }
    }
  }
  steps.push({ codeLine: 12, message: `Final max profit: ${maxProfit}`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], metrics: [{ label: 'max profit', value: maxProfit, tone: 'success' }] } }] })
  return steps
}
