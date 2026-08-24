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

  steps.push({ 
    codeLine: 2, 
    message: `Init sum to ${arr[0].value}`, 
    audioEvent: 'pointer', 
    elements: [{ 
      type: 'array', 
      data: { 
        values: [...arr], 
        highlights: [0], 
        action: `CURRENT SUM: ${currentSum} | BEST SUM: ${maxSum}`,
        pointers: [{label:'i',index:0,position:'top'}] 
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
          action: `CURRENT SUM: ${currentSum} | BEST SUM: ${maxSum}`,
          pointers: [{label:'i',index:i,position:'top'}] 
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
            action: `CURRENT SUM: ${currentSum} | BEST SUM: ${maxSum}`,
            pointers: [{label:'i',index:i,position:'top'}] 
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
            action: `CURRENT SUM: ${currentSum} | BEST SUM: ${maxSum}`,
            pointers: [{label:'i',index:i,position:'top'}] 
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
            action: `NEW BEST: ${maxSum}`,
            pointers: [{label:'i',index:i,position:'top'}] 
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
        action: `MAX SUM: ${maxSum}`
      } 
    }] 
  })

  return steps
}