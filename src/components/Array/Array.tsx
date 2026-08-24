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
}

function getState(index: number, highlights: number[], action: string | undefined, swap: { from: number; to: number } | undefined, isComplete: boolean | undefined): SurfaceState {
  if (isComplete) return 'success'
  if (action === 'swap' && swap && (index === swap.from || index === swap.to)) return 'warning'
  if (highlights.includes(index)) {
    if (action?.includes('NEW BEST') || action?.includes('MAX SUM')) return 'success'
    if (action?.includes('CURRENT')) return 'compare' // amber
    return 'active' // cyan
  }
  return 'neutral'
}

function normalizeValueToHeight(values: (string | number)[], minHeight: number, maxHeight: number): number[] {
  const numericValues = values.map(v => typeof v === 'number' ? v : Number(v)).filter(v => !isNaN(v))
  if (numericValues.length === 0) return values.map(() => minHeight)
  
  const min = Math.min(...numericValues)
  const max = Math.max(...numericValues)
  
  if (min === max) return values.map(() => minHeight)
  
  return values.map(v => {
    const num = typeof v === 'number' ? v : Number(v)
    if (isNaN(num)) return minHeight
    const ratio = (num - min) / (max - min)
    return minHeight + ratio * (maxHeight - minHeight)
  })
}

function Array({ values, pointers, highlights = [], action, swap, visualizationKey, viewportWidth = 312, viewportHeight = 192, isComplete }: ArrayProps) {
  const cellRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const containerRef = useRef<HTMLDivElement | null>(null)

  const N = values.length
  const gap = N > 8 ? 4 : 8
  const blockW = Math.min(36, Math.max(16, Math.floor((viewportWidth - 40) / N) - gap))
  const blockDepth = Math.max(12, blockW * 0.8)
  
  const totalWidth = N * blockW + (N - 1) * gap
  const platformWidth = Math.max(220, totalWidth + 60);
  const startX = platformWidth / 2 - totalWidth / 2 + blockW / 2;

  const heights = normalizeValueToHeight(values.map(v => v.value), Math.max(16, blockW * 0.6), 150)

  useLayoutEffect(() => {
    if (!swap) return
    const movedItem = values[swap.to]
    const swappedItem = values[swap.from]
    if (!movedItem || !swappedItem) return
    const movedCell = cellRefs.current[movedItem.id]
    const swappedCell = cellRefs.current[swappedItem.id]
    if (!movedCell || !swappedCell) return
    
    const dist = (swap.to - swap.from) * (blockW + gap)
    
    // Upright 3D Swap Animation
    gsap.fromTo(swappedCell,
      { x: dist, z: 25 },
      { x: 0, z: 0, duration: 0.7, ease: 'back.out(1.2)' }
    )
    gsap.fromTo(movedCell,
      { x: -dist, z: 25 },
      { x: 0, z: 0, duration: 0.7, ease: 'back.out(1.2)' }
    )
  }, [swap, values, blockW, gap])

  useLayoutEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  }, [visualizationKey])

  return (
    <Scene3D width={viewportWidth} height={viewportHeight}>
      <div ref={containerRef} style={{
        position: 'absolute',
        transformStyle: 'preserve-3d',
        width: '100%', height: '100%',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '40px', // Push the array down to fill empty space
      }}>
        <Platform3D width={platformWidth} depth={blockDepth * 4.5} thickness={24}>
          {action && (
            <div style={{
              position: 'absolute',
              transform: `translate3d(${platformWidth/2}px, -110px, 0px) translateX(-50%)`,
              background: 'linear-gradient(135deg, rgba(30,30,35,0.95), rgba(15,15,20,0.95))',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '6px 16px',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
              transformOrigin: 'center'
            }}>
              {action}
            </div>
          )}
          
          {/* Subarray Grouping Zone */}
          {highlights.length > 1 && (() => {
            const isSuccess = action?.includes('NEW BEST') || action?.includes('MAX SUM') || isComplete;
            const rbg = isSuccess ? '16, 185, 129' : '245, 158, 11';
            return (
              <div style={{
                position: 'absolute',
                bottom: '0px',
                left: `${startX + Math.min(...highlights) * (blockW + gap) - gap/2}px`,
                width: `${(Math.max(...highlights) - Math.min(...highlights) + 1) * (blockW + gap)}px`,
                height: `${blockDepth * 1.5}px`,
                background: `rgba(${rbg}, 0.15)`,
                border: `1px solid rgba(${rbg}, 0.3)`,
                transformOrigin: 'bottom',
                transform: `translateZ(${-blockDepth * 0.2}px) rotateX(90deg)`,
                borderRadius: '4px',
                transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
              }} />
            );
          })()}

          {values.map((item, index) => {

          const state = getState(index, highlights, action, swap, isComplete)
          const isElevated = state !== 'neutral'
          const elevZ = isElevated ? 15 : 0
          
          const xPos = startX + index * (blockW + gap)
          const h = heights[index]
          
          return (
            <div key={item.id} style={{ 
              position: 'absolute', 
              bottom: '0px',
              transformStyle: 'preserve-3d', 
              transform: `translate3d(${xPos}px, 0px, 0px)`
            }}>
              <Block3D
                ref={(el) => { cellRefs.current[item.id] = el }}
                width={blockW}
                height={h}
                depth={blockDepth}
                state={state}
                elevation={elevZ}
                text={item.value}
              />
              {/* Index label */}
              <div style={{
                position: 'absolute',
                bottom: '-22px',
                left: `${blockW / 2}px`,
                transform: 'translate(-50%, 0)',
                color: 'rgba(255,255,255,0.4)',
                fontSize: `${Math.max(9, blockW * 0.3)}px`,
                fontWeight: 600,
              }}>
                {index}
              </div>
            </div>
          )
        })}
        
        {pointers && (
          <div style={{ position: 'absolute', bottom: '0px', transformStyle: 'preserve-3d' }}>
            <Pointers
              pointers={pointers.map(p => {
                const index = p.index ?? 0
                // Match the exact Z-elevation of the target block to prevent parallax drift
                const state = getState(index, highlights, action, swap, isComplete)
                const elevZ = state !== 'neutral' ? 15 : 0

                // targetX is the exact horizontal center of the block
                const x = startX + index * (blockW + gap) + blockW / 2
                // targetY is the exact top or bottom of the block
                const h = heights[index] || blockW
                const y = p.position === 'top' ? -h : 0
                
                return { ...p, x, y, z: elevZ, position: p.position as 'top' | 'bottom' | 'left' | 'right' }
              })}
            />
          </div>
        )}
        </Platform3D>
      </div>
    </Scene3D>
  )
}

export default Array