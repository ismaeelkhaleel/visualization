import { problems } from './src/data/problems'
import { getDailyProblem } from './src/data/dailyProblem'

for (let i = 16; i <= 25; i++) {
  const date = new Date(2026, 7, i)
  const p = getDailyProblem(problems, date)
  console.log(`2026-08-${i}: ${p.title} (${p.category} - ${p.difficulty})`)
}
