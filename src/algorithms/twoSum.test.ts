import { describe, it, expect } from 'vitest'
import { twoSum } from './twoSum'

describe('twoSum algorithm', () => {
  it('should find target correctly', () => {
    const input = { array: [2, 7, 11, 15], target: 9 }
    const steps = twoSum(input.array, input.target)
    const finalStep = steps[steps.length - 1]
    expect(finalStep.message).toContain('Found the target pair')
  })

  it('should handle duplicate values', () => {
    const input = { array: [3, 3], target: 6 }
    const steps = twoSum(input.array, input.target)
    const finalStep = steps[steps.length - 1]
    expect(finalStep.message).toContain('Found the target pair')
  })

  it('should report if target not found', () => {
    const input = { array: [1, 2, 3], target: 10 }
    const steps = twoSum(input.array, input.target)
    const finalStep = steps[steps.length - 1]
    expect(finalStep.message).toContain('No pair found')
  })
})
