import type { AudioEventType } from './audioTypes'
import type { VisualizationStep } from '../algorithms/types'

export const SAMPLE_RATE = 48000
export const VOLUME = 0.38

export function getAudioEventTypeForStep(step: VisualizationStep, isComplete: boolean): AudioEventType {
  if (isComplete) return 'success'
  
  if (step.audioEvent) return step.audioEvent

  // Fallbacks if not explicitly provided by algorithm (to prevent errors while we transition them)
  if (!(step as any).action) {
    if ((step as any).highlights && (step as any).highlights.length > 0) return 'compare'
    if (step.message) return 'pointer'
    return 'none'
  }
  
  const action = (step as any).action.toLowerCase()
  if (action === 'swap') return 'swap'
  if (action === 'move' || action === 'set') return 'move'
  if (action === 'push') return 'push'
  if (action === 'pop') return 'pop'
  if (action === 'enqueue') return 'enqueue'
  if (action === 'dequeue') return 'dequeue'
  if (action === 'compare' || action === 'check') return 'compare'
  if (action === 'visit') return 'visit'
  
  return 'pointer'
}

export function scheduleAudioEvent(
  ctx: BaseAudioContext,
  type: AudioEventType,
  time: number,
  destination?: AudioNode
) {
  if (type === 'none') return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  
  osc.connect(gain)
  gain.connect(destination || ctx.destination)

  const t0 = time
  const t1 = time + 0.01

  // pointer -> quiet
  // skip -> quiet
  // compare -> low-medium
  // move -> medium
  // visit -> medium
  // push/pop -> medium
  // enqueue/dequeue -> medium
  // swap -> clearly noticeable
  // match -> clearly noticeable
  // success -> strongest

  if (type === 'pointer') {
    const t2 = time + 0.05
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.25, t0 + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, t0)
    osc.start(t0)
    osc.stop(t2)
  } else if (type === 'compare') {
    const t2 = time + 0.08
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.45, t1)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(600, t0)
    osc.frequency.setValueAtTime(800, t0 + 0.04)
    osc.start(t0)
    osc.stop(t2)
  } else if (type === 'swap') {
    const t2 = time + 0.15
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.8, t1)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'square'
    osc.frequency.setValueAtTime(300, t0)
    osc.frequency.exponentialRampToValueAtTime(500, t2)
    osc.start(t0)
    osc.stop(t2)
  } else if (type === 'move') {
    const t2 = time + 0.12
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.5, t1)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'sine' // Soft whoosh/pop
    osc.frequency.setValueAtTime(150, t0)
    osc.frequency.exponentialRampToValueAtTime(100, t2)
    osc.start(t0)
    osc.stop(t2)
  } else if (type === 'push') {
    const t2 = time + 0.15
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.5, t1)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(400, t0)
    osc.frequency.linearRampToValueAtTime(600, t0 + 0.05)
    osc.start(t0)
    osc.stop(t2)
  } else if (type === 'pop') {
    const t2 = time + 0.15
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.5, t1)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(600, t0)
    osc.frequency.linearRampToValueAtTime(400, t0 + 0.05)
    osc.start(t0)
    osc.stop(t2)
  } else if (type === 'enqueue') {
    const t2 = time + 0.15
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.5, t1)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(300, t0)
    osc.frequency.linearRampToValueAtTime(450, t0 + 0.05)
    osc.start(t0)
    osc.stop(t2)
  } else if (type === 'dequeue') {
    const t2 = time + 0.15
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.5, t1)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(450, t0)
    osc.frequency.linearRampToValueAtTime(300, t0 + 0.05)
    osc.start(t0)
    osc.stop(t2)
  } else if (type === 'visit') {
    const t2 = time + 0.1
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.5, t1)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(700, t0)
    osc.start(t0)
    osc.stop(t2)
  } else if (type === 'match') {
    const t2 = time + 0.2
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.7, t1)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(800, t0)
    osc.frequency.setValueAtTime(1200, t0 + 0.05)
    osc.start(t0)
    osc.stop(t2)
  } else if (type === 'skip') {
    const t2 = time + 0.08
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.25, t1)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(150, t0)
    osc.start(t0)
    osc.stop(t2)
  } else if (type === 'success') {
    const t2 = time + 0.6
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME, t0 + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, t0)
    osc.frequency.setValueAtTime(554.37, time + 0.1)
    osc.frequency.setValueAtTime(659.25, time + 0.2)
    osc.start(t0)
    osc.stop(t2)
  } else {
    // fallback generic
    const t2 = time + 0.1
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(VOLUME * 0.3, t1)
    gain.gain.exponentialRampToValueAtTime(0.001, t2)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(400, t0)
    osc.start(t0)
    osc.stop(t2)
  }
}
