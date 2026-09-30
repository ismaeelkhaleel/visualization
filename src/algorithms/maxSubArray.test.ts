import { describe, it, expect } from 'vitest'
import { maxSubArray } from './maxSubArray'

describe('maxSubArray algorithm', () => {
  it('should handle normal input correctly', () => {
    const input = { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }
    const steps = maxSubArray(input.array)
    expect(steps.length).toBeGreaterThan(0)
    const finalStep = steps[steps.length - 1]
    expect(finalStep.message).toContain('6') // max sum is 6
  })

  it('should handle all negative numbers', () => {
    const input = { array: [-3, -5, -2, -9] }
    const steps = maxSubArray(input.array)
    const finalStep = steps[steps.length - 1]
    expect(finalStep.message).toContain('-2')
  })

  it('should handle single element', () => {
    const input = { array: [5] }
    const steps = maxSubArray(input.array)
    const finalStep = steps[steps.length - 1]
    expect(finalStep.message).toContain('5')
  })

  it('should handle empty array gracefully', () => {
    const input = { array: [] }
    const steps = maxSubArray(input.array)
    expect(steps.length).toBe(0)
  })
})
