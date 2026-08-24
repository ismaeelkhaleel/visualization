import type { ProblemDefinition } from './problems'

export function getDaysSinceEpoch(date: Date = new Date()): number {
  const epoch = new Date(2026, 7, 16) // August 16, 2026 (Month is 0-indexed)
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  
  const diffTime = target.getTime() - epoch.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

export function getDailyProblem(problems: ProblemDefinition[], date: Date = new Date()): ProblemDefinition {
  if (problems.length === 0) throw new Error('No problems available')
  if (problems.length === 1) return problems[0]

  const day = getDaysSinceEpoch(date)
  
  // Sort canonically for stability
  const sorted = [...problems].sort((a, b) => a.id.localeCompare(b.id))
  const N = sorted.length
  
  const blockIndex = Math.floor(day / N)
  let indexInBlock = day % N
  if (indexInBlock < 0) indexInBlock += N

  // Seed with blockIndex so each block has a different but deterministic order
  const prng = mulberry32(blockIndex + 1234567)

  // Shuffle the block
  const shuffled = [...sorted]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  // Greedily space out categories
  const block: ProblemDefinition[] = []
  const remaining = [...shuffled]

  while (remaining.length > 0) {
    let foundIdx = 0
    for (let i = 0; i < remaining.length; i++) {
      const cat = remaining[i].category
      const recent1 = block[block.length - 1]?.category
      const recent2 = block[block.length - 2]?.category
      
      // Try to avoid repeating the same category in the last 2 problems
      if (cat !== recent1 && cat !== recent2) {
        foundIdx = i
        break
      }
    }
    block.push(remaining.splice(foundIdx, 1)[0])
  }

  return block[indexInBlock]
}
