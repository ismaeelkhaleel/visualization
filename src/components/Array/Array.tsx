import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import type { ArrayVisualizationData } from '../../algorithms/types'
import Pointers from '../Pointers/Pointers'
import { type SurfaceState } from '../../theme'
import { Block3D } from '../Block3D'
import { Platform3D } from '../Platform3D'
import { Scene3D } from '../Scene3D'

type ArrayProps = ArrayVisualizationData & {
  visualizationKey?: string
  viewportWidth?: number
  viewportHeight?: number
  isComplete?: boolean
  speed?: number
  isJump?: boolean
}

function getState(index: number, highlights: number[], secondaryHighlights: number[], action: string | undefined, swap: { from: number; to: number } | undefined, isComplete: boolean | undefined): SurfaceState {
  if (action === 'swap' && swap && (index === swap.from || index === swap.to)) return 'warning'
  if (highlights.includes(index)) {
    if (isComplete || action?.includes('NEW BEST') || action?.includes('MAX SUM') || action?.includes('FOUND')) return 'success'
    if (action?.includes('CURRENT') || action?.includes('COMPARE')) return 'compare'
    return 'active'
  }
  if (secondaryHighlights.includes(index)) return 'visited'
  if (isComplete && highlights.length === 0) return 'success'
  return 'neutral'
}

/**
 * Height normalization for bar-layout arrays.
 * 
 * Key insight from reference 44876.png: blocks should be CHUNKY CUBES
 * with moderate height variation, not extreme skyscrapers.
 * 
 * Height is based on absolute magnitude so negative values are still tall.
 * The range is compressed so the tallest block is only ~2x the shortest.
 */
function normalizeValueToHeight(values: (string | number)[], minHeight: number, maxHeight: number): number[] {
  const numericValues = values.map(v => typeof v === 'number' ? v : Number(v)).filter(v => !isNaN(v))
  if (numericValues.length === 0) return values.map(() => minHeight)
  
  const absValues = numericValues.map(v => Math.abs(v))
  // Always use 0 as the baseline so a value of 2 is exactly twice as tall as 1
  const max = Math.max(...absValues, 1) // avoid division by 0
  
  return values.map(v => {
    const num = typeof v === 'number' ? v : Number(v)
    if (isNaN(num)) return minHeight
    const ratio = Math.abs(num) / max
    return minHeight + ratio * (maxHeight - minHeight)
  })
}

function Array({ values, pointers, highlights = [], secondaryHighlights = [], disabledIndices = [], metrics = [], layout = 'bars', action, swap, visualizationKey, viewportWidth = 328, viewportHeight = 304, isComplete, speed = 1, isJump = false }: ArrayProps) {
  const cellRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const containerRef = useRef<HTMLDivElement | null>(null)

  const N = values.length

  // === LAYOUT MATH ===
  // Reference shows blocks close together, filling most of the width
  const gap = N > 9 ? 4 : 6
  const usableWidth = viewportWidth - 40 // margins
  const blockW = layout === 'intervals'
    ? Math.min(58, Math.max(34, Math.floor(usableWidth / Math.max(1, N)) - gap))
    : Math.min(34, Math.max(18, Math.floor(usableWidth / Math.max(1, N)) - gap))
  
  // Depth determines the 3D thickness — should be substantial
  const blockDepth = Math.max(14, Math.min(blockW * 0.7, 22))
  
  const totalWidth = N * blockW + (N - 1) * gap
  const platformWidth = totalWidth + 50
  const platformDepth = blockDepth * 3.5
  const startX = (platformWidth - totalWidth) / 2

  // === HEIGHT ===
  // Make heights truly dynamic and proportional to values
  const minH = Math.max(10, blockW * 0.3)
  const maxH = Math.max(120, blockW * 4.0)
  const heights = layout === 'cells'
    ? values.map(() => Math.max(28, blockW))
    : layout === 'intervals'
      ? values.map(() => 34)
      : normalizeValueToHeight(values.map(v => v.value), minH, maxH)

  // === SWAP ANIMATION ===
  const prevValuesRef = useRef(values)

  useLayoutEffect(() => {
    const prevValues = prevValuesRef.current
    prevValuesRef.current = values
    
    // Initial mount check (don't animate on first render)
    if (prevValues.length === 0) return

    values.forEach((item, newIndex) => {
      const oldIndex = prevValues.findIndex(v => v.id === item.id)
      if (oldIndex === -1 || oldIndex === newIndex) return

      const el = cellRefs.current[item.id]
      if (!el) return

      const currentX = (gsap.getProperty(el, 'x') as number) || 0
      const currentY = (gsap.getProperty(el, 'y') as number) || 0
      gsap.killTweensOf(el)

      if (isJump) {
        gsap.set(el, { x: 0, y: 0 })
        return
      }

      // Calculate the delta directly from index differences
      // Offset by currentX to resume seamlessly from interrupted states
      const dx = (oldIndex - newIndex) * (blockW + gap) + currentX
      
      const liftH = Math.min(25, Math.max(15, Math.abs(dx) * 0.08))

      const tl = gsap.timeline()
      const d = 1 / speed
      
      gsap.set(el, { x: dx, y: currentY })

      tl.to(el, { x: 0, duration: 0.3 * d, ease: 'power2.inOut' }, 0)
      tl.to(el, { y: -liftH, duration: 0.15 * d, ease: 'power2.out' }, 0)
      tl.to(el, { y: 0, duration: 0.15 * d, ease: 'power2.in' }, 0.15 * d)
    })
  }, [values, blockW, gap, speed, isJump])

  useLayoutEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: -67 },
      { opacity: 1, y: -75, duration: 0.4, ease: 'power2.out' }
    )
  }, [visualizationKey])

  return (
    <Scene3D width={viewportWidth} height={viewportHeight}>
      <div ref={containerRef} style={{
        position: 'absolute',
        transformStyle: 'preserve-3d',
        width: '100%', height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        // Shift entire scene up to reduce gap
        paddingTop: '0px',
        transform: 'translateY(-75px)',
      }}>
        <Platform3D width={platformWidth} depth={platformDepth} thickness={32}>
          
          {/* === SUBARRAY RANGE INDICATOR === */}
          {/* A subtle colored strip on the platform surface under the active range */}
          {highlights.length > 1 && (() => {
            const isSuccess = action?.includes('NEW BEST') || action?.includes('MAX SUM') || isComplete;
            const rgb = isSuccess ? '16, 185, 129' : '59, 130, 246';
            const minIdx = Math.min(...highlights)
            const maxIdx = Math.max(...highlights)
            const rangeLeft = startX + minIdx * (blockW + gap) - 2
            const rangeWidth = (maxIdx - minIdx) * (blockW + gap) + blockW + 4
            return (
              <div style={{
                position: 'absolute',
                bottom: '0px',
                left: `${rangeLeft}px`,
                width: `${rangeWidth}px`,
                height: `${platformDepth * 0.9}px`,
                background: `rgba(${rgb}, 0.12)`,
                border: `1px solid rgba(${rgb}, 0.35)`,
                transformOrigin: 'bottom',
                transform: `translateZ(${-blockDepth * 0.3}px) rotateX(90deg)`,
                borderRadius: '4px',
                transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              }} />
            );
          })()}

          {/* === BLOCKS === */}
          {values.map((item, index) => {
            const state = getState(index, highlights, secondaryHighlights, action, swap, isComplete)
            // Slight elevation for active blocks (physical lift)
            const elevZ = (state !== 'neutral' && state !== 'visited') ? 6 : 0
            const isDisabled = disabledIndices.includes(index)
            
            const xPos = startX + index * (blockW + gap)
            const h = heights[index]
            const numericVal = typeof item.value === 'number' ? item.value : Number(item.value)
            const isNeg = !isNaN(numericVal) && numericVal < 0
            
            return (
              <div key={item.id} style={{ 
                position: 'absolute', 
                bottom: '0px',
                transformStyle: 'preserve-3d', 
                transform: `translate3d(${xPos}px, 0px, 0px)`
              }}>
                <div ref={(el) => { cellRefs.current[item.id] = el }} style={{ transformStyle: 'preserve-3d' }}>
                  <Block3D
                    width={blockW}
                    height={h}
                  depth={blockDepth}
                  state={state}
                  elevation={elevZ}
                  text={item.value}
                  isNegative={isNeg}
                  style={{
                    opacity: isDisabled ? 0.35 : 1,
                    filter: isDisabled ? 'saturate(0.4)' : undefined,
                  }}
                />
                </div>
              </div>
            )
          })}
        
          {/* === POINTERS === */}
          {pointers && (
            <div style={{ position: 'absolute', bottom: '0px', transformStyle: 'preserve-3d' }}>
              <Pointers
                speed={speed}
                isJump={isJump}
                pointers={pointers.map(p => {
                  const index = Math.max(0, Math.min(N - 1, p.index ?? 0))
                  const state = getState(index, highlights, secondaryHighlights, action, swap, isComplete)
                  const elevZ = (state !== 'neutral' && state !== 'visited') ? 6 : 0

                  // Center of the block horizontally
                  const x = startX + index * (blockW + gap) + blockW / 2
                  
                  // Top: above the tallest block. Bottom: below the platform front face (32px thick + 4px gap)
                  const y = p.position === 'top' ? -(maxH + elevZ + 4) : 36
                  const z = p.position === 'top' ? (elevZ * 0.5 - blockDepth * 0.5) : (elevZ * 0.5 + 4)
                  
                  return { ...p, x, y, z, position: p.position as 'top' | 'bottom' | 'left' | 'right' }
                })}
              />
            </div>
          )}



          {/* === ACTION BADGE — small label below platform === */}
          {action && !action.includes('CURRENT SUM') && (
            <div style={{
              position: 'absolute',
              left: `${platformWidth / 2}px`,
              top: `${32 + 20}px`,
              transform: 'translateX(-50%)',
              background: 'rgba(15,23,42,0.9)',
              border: '1px solid #334155',
              padding: '4px 14px',
              borderRadius: '4px',
              color: '#94a3b8',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              {action}
            </div>
          )}

        </Platform3D>

        {/* === METRICS — Absolute relative to container to avoid jumping === */}
        {metrics.length > 0 && (
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '45px', // Fixed distance from top
            display: 'flex',
            gap: '24px',
            zIndex: 10,
          }}>
            {metrics.slice(0, 4).map((item) => {
              const toneColors: Record<string, string> = {
                success: '#34d399',
                warning: '#f87171',
                compare: '#fbbf24',
                active: '#38bdf8',
                neutral: '#94a3b8',
              }
              const color = toneColors[item.tone || 'neutral'] || '#94a3b8'
              return (
                <div key={`${item.label}-${item.value}`} style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '5px',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  <span style={{ fontSize: '10px', color: color, fontWeight: 800 }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: '14px', color: '#fff', fontWeight: 900 }}>
                    {item.value}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Scene3D>
  )
}

export default Array
// Trigger HMR to resolve EBUSY lock
// HMR trigger 2

