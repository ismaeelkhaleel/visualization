import type { VisualizationStep } from './types'

export function maxSubArray(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  if (nums.length === 0) return []
  
  const arr = nums.map((v, i) => ({ id: i, value: v }))
  let currentSum = arr[0].value
  let maxSum = arr[0].value
  
  let currentStart = 0
  let bestStart = 0
  let bestEnd = 0

  const buildHighlights = (start: number, end: number) => {
    const hl = []
    for (let j = start; j <= end; j++) hl.push(j)
    return hl
  }

  const getMetrics = () => [
    { label: 'current_sum', value: currentSum },
    { label: 'max_sum', value: maxSum }
  ]

  steps.push({ 
    codeLine: 2, 
    message: `Init sum to ${arr[0].value}`, 
    audioEvent: 'pointer', 
    elements: [{ 
      type: 'array', 
      data: { 
        values: [...arr], 
        highlights: [0],
        metrics: getMetrics(),
        pointers: [{label:'num',index:0,position:'bottom'}] 
      } 
    }] 
  })

  for (let i = 1; i < arr.length; i++) {
    steps.push({ 
      codeLine: 4, 
      message: `Check element ${arr[i].value}`, 
      audioEvent: 'pointer', 
      elements: [{ 
        type: 'array', 
        data: { 
          values: [...arr], 
          highlights: buildHighlights(currentStart, i - 1),
          metrics: getMetrics(),
          pointers: [{label:'num',index:i,position:'bottom'}] 
        } 
      }] 
    })

    if (currentSum + arr[i].value < arr[i].value) {
      currentSum = arr[i].value
      currentStart = i
      steps.push({ 
        codeLine: 5, 
        message: `Restart subarray at index ${i} (${arr[i].value})`, 
        audioEvent: 'compare', 
        elements: [{ 
          type: 'array', 
          data: { 
            values: [...arr], 
            highlights: [i], 
            metrics: getMetrics(),
            pointers: [{label:'num',index:i,position:'bottom'}] 
          } 
        }] 
      })
    } else {
      currentSum += arr[i].value
      steps.push({ 
        codeLine: 5, 
        message: `Extend subarray: sum becomes ${currentSum}`, 
        audioEvent: 'compare', 
        elements: [{ 
          type: 'array', 
          data: { 
            values: [...arr], 
            highlights: buildHighlights(currentStart, i), 
            metrics: getMetrics(),
            pointers: [{label:'num',index:i,position:'bottom'}] 
          } 
        }] 
      })
    }

    if (currentSum > maxSum) {
      maxSum = currentSum
      bestStart = currentStart
      bestEnd = i
      steps.push({ 
        codeLine: 6, 
        message: `New max sum: ${maxSum}!`, 
        audioEvent: 'match', 
        elements: [{ 
          type: 'array', 
          data: { 
            values: [...arr], 
            highlights: buildHighlights(bestStart, bestEnd), 
            metrics: getMetrics(),
            action: 'NEW BEST',
            pointers: [{label:'num',index:i,position:'bottom'}] 
          } 
        }] 
      })
    }
  }

  steps.push({ 
    codeLine: 8, 
    message: `Final max sum: ${maxSum}`, 
    audioEvent: 'success', 
    elements: [{ 
      type: 'array', 
      data: { 
        values: [...arr],
        highlights: buildHighlights(bestStart, bestEnd),
        metrics: getMetrics(),
        action: 'MAX SUM'
      } 
    }] 
  })

  return steps
}