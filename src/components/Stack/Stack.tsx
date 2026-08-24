import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import type { StackVisualizationData } from '../../algorithms/types'
import { surfaces, type SurfaceState } from '../../theme'
import Pointers from '../Pointers/Pointers'
import { Block3D } from '../Block3D'
import { Scene3D } from '../Scene3D'

type StackProps = StackVisualizationData & {
  visualizationKey?: string
  viewportWidth?: number
  viewportHeight?: number
  isComplete?: boolean
}

function Stack({
  items,
  topLabel = true,
  highlights = [],
  currentToken,
  visualizationKey,
  viewportWidth = 312,
  viewportHeight = 192,
  isComplete,
}: StackProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  }, [visualizationKey])

  const blockW = 50
  const blockH = 24
  const blockDepth = 12
  
  // Center alignment offset
  const stackHeight = items.length * blockH
  const bottomOffset = 40

  return (
    <Scene3D width={viewportWidth} height={viewportHeight}>
      <div ref={containerRef} style={{
        position: 'absolute',
        transformStyle: 'preserve-3d',
        width: '100%', height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: `${bottomOffset}px`
      }}>
        {/* Token indicator hovering above */}
        {currentToken !== undefined && currentToken !== null && (
          <div style={{
            position: 'absolute',
            transformStyle: 'preserve-3d',
            transform: `translateY(-${stackHeight + 50}px)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <div style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '10px',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 700,
            }}>Current</div>
            <div style={{
              background: `linear-gradient(135deg, ${surfaces.active.top} 0%, ${surfaces.active.front} 100%)`,
              border: `1.5px solid ${surfaces.active.border}`,
              color: surfaces.active.text,
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 800,
              boxShadow: `0 8px 15px rgba(0,0,0,0.5), 0 0 10px ${surfaces.active.glow}`,
            }}>
              {currentToken}
            </div>
            <div style={{ color: surfaces.active.border, fontSize: '18px', marginTop: '2px' }}>↓</div>
          </div>
        )}

        {/* The Stack Blocks */}
        {items.map((item, index) => {
          const isHighlighted = highlights.includes(index)
          const state: SurfaceState = isComplete ? 'success' : isHighlighted ? 'active' : 'neutral'
          const isElevated = state !== 'neutral'
          const elevZ = isElevated ? 12 : 0
          
          // Blocks stack upward from the bottom
          const yPos = index * blockH

          return (
            <div key={item.id} style={{
              position: 'absolute',
              bottom: 0,
              transformStyle: 'preserve-3d',
              transform: `translateY(-${yPos}px)`
            }}>
              <Block3D
                width={blockW}
                height={blockH}
                depth={blockDepth}
                state={state}
                elevation={elevZ}
                text={item.value}
              />
            </div>
          )
        })}

        {/* TOP Pointer */}
        {items.length > 0 && topLabel && (
          <div style={{ position: 'absolute', bottom: 0, transformStyle: 'preserve-3d' }}>
            {(() => {
              const topIndex = items.length - 1
              const isHighlighted = highlights.includes(topIndex)
              const state = isComplete ? 'success' : isHighlighted ? 'active' : 'neutral'
              const elevZ = state !== 'neutral' ? 12 : 0

              return (
                <Pointers
                  pointers={[{
                    label: 'TOP',
                    x: blockW / 2,
                    y: -(topIndex * blockH + blockH / 2),
                    z: elevZ,
                    position: 'right'
                  }]}
                />
              )
            })()}
          </div>
        )}
      </div>
    </Scene3D>
  )
}

export default Stack
