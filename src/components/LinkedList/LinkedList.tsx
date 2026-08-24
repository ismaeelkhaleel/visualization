import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import type { LinkedListVisualizationData } from '../../algorithms/types'
import { surfaces, type SurfaceState } from '../../theme'
import Pointers from '../Pointers/Pointers'
import { Block3D } from '../Block3D'
import { Scene3D } from '../Scene3D'

type LinkedListProps = LinkedListVisualizationData & {
  visualizationKey?: string
  viewportWidth?: number
  viewportHeight?: number
  isComplete?: boolean
}

function LinkedList({ nodes, headId, pointers = [], highlights = [], visualizationKey, viewportWidth = 312, viewportHeight = 192, isComplete }: LinkedListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  }, [visualizationKey])

  const blockW = 32
  const blockH = 32
  const blockDepth = 8
  const xSpacing = 65
  const ySpacing = 55

  // Calculate layout coordinates
  const layout = new Map<string, { x: number, y: number }>()
  let currX = 0
  let currY = 0
  const maxPerRow = 3

  nodes.forEach((node, i) => {
    layout.set(node.id, { x: currX, y: currY })
    currX += xSpacing
    if ((i + 1) % maxPerRow === 0) {
      currX = 0
      currY += ySpacing
    }
  })
  
  // Center the layout
  const rows = Math.ceil(nodes.length / maxPerRow)
  const cols = Math.min(nodes.length, maxPerRow)
  const totalW = (cols - 1) * xSpacing
  const totalH = (rows - 1) * ySpacing
  const offsetX = -totalW / 2
  const offsetY = -totalH / 2

  return (
    <Scene3D width={viewportWidth} height={viewportHeight}>
      <div ref={containerRef} style={{
        position: 'absolute',
        transformStyle: 'preserve-3d',
        width: '100%', height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Edges Layer (drawn physically behind nodes Z=-2) */}
        <div style={{
          position: 'absolute',
          transformStyle: 'preserve-3d',
        }}>
          {nodes.map((node) => {
            if (!node.nextId) {
              const pos = layout.get(node.id)!
              const startX = offsetX + pos.x + blockW / 2
              const startY = offsetY + pos.y
              return (
                <div key={`null-${node.id}`} style={{
                  position: 'absolute',
                  transform: `translate3d(${startX}px, ${startY}px, -2px)`,
                  width: '30px', height: '2px',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
                  transformOrigin: 'left center',
                }}>
                  <span style={{
                    position: 'absolute', right: '-25px', top: '-6px',
                    color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontStyle: 'italic',
                  }}>null</span>
                </div>
              )
            }
            
            const from = layout.get(node.id)!
            const to = layout.get(node.nextId)!
            if (!to) return null
            
            const dx = to.x - from.x
            const dy = to.y - from.y
            const dist = Math.sqrt(dx*dx + dy*dy)
            const angle = Math.atan2(dy, dx) * 180 / Math.PI
            
            const startX = offsetX + from.x + (dx > 0 ? blockW / 2 : 0)
            const startY = offsetY + from.y + (dy > 0 ? blockH / 2 : 0)
            
            const isHighlighted = highlights.includes(node.id) || highlights.includes(node.nextId)
            const color = isHighlighted ? surfaces.active.border : 'rgba(255,255,255,0.3)'

            return (
              <div key={`edge-${node.id}`} style={{
                position: 'absolute',
                transform: `translate3d(${startX}px, ${startY}px, -2px) rotateZ(${angle}deg)`,
                width: `${dist - blockW}px`,
                height: '3px',
                background: `linear-gradient(90deg, ${color} 0%, ${color} 80%, transparent 100%)`,
                transformOrigin: 'left center',
                boxShadow: isHighlighted ? `0 0 10px ${surfaces.active.glow}` : '0 2px 4px rgba(0,0,0,0.5)',
                borderRadius: '1.5px'
              }}>
                {/* Arrowhead */}
                <div style={{
                  position: 'absolute', right: '0', top: '-3px',
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                  borderLeft: `7px solid ${color}`,
                }} />
              </div>
            )
          })}
        </div>

        {/* Nodes Layer */}
        {nodes.map(node => {
          const pos = layout.get(node.id)!
          const isHighlighted = highlights.includes(node.id)
          const state: SurfaceState = isComplete ? 'success' : isHighlighted ? 'active' : 'neutral'
          const isElevated = state !== 'neutral'
          const elevZ = isElevated ? 12 : 0
          
          return (
            <div key={node.id} style={{
              position: 'absolute',
              transformStyle: 'preserve-3d',
              transform: `translate3d(${offsetX + pos.x - blockW/2}px, ${offsetY + pos.y - blockH/2}px, 0)`
            }}>
              <Block3D
                width={blockW}
                height={blockH}
                depth={blockDepth}
                state={state}
                elevation={elevZ}
                text={node.value}
              />
              {headId === node.id && (
                <div style={{
                  position: 'absolute',
                  top: '-20px', left: '50%', transform: 'translateX(-50%)',
                  color: surfaces.success.border, fontSize: '10px', fontWeight: 800, letterSpacing: '1px'
                }}>HEAD</div>
              )}
            </div>
          )
        })}

        {/* Pointers Layer */}
        <div style={{ position: 'absolute', transformStyle: 'preserve-3d' }}>
          <Pointers
            pointers={pointers.map(p => {
              if (p.nodeId === null) {
                const lastNode = nodes[nodes.length - 1]
                if (lastNode) {
                  const pos = layout.get(lastNode.id)!
                  return {
                    label: p.label,
                    // null pointer points to the space after the last node
                    x: offsetX + pos.x + xSpacing,
                    y: offsetY + pos.y, // center Y
                    z: 0,
                    position: 'bottom' as const
                  }
                }
                return { label: p.label, x: 0, y: 0, z: 0, position: 'bottom' as const }
              }
              
              const pos = layout.get(p.nodeId)!
              const isHighlighted = highlights.includes(p.nodeId)
              const state = isComplete ? 'success' : isHighlighted ? 'active' : 'neutral'
              const elevZ = state !== 'neutral' ? 12 : 0

              return {
                label: p.label,
                // exact center X
                x: offsetX + pos.x,
                // exact bottom edge Y
                y: offsetY + pos.y + blockH / 2,
                z: elevZ,
                position: 'bottom' as const
              }
            })}
          />
        </div>
      </div>
    </Scene3D>
  )
}

export default LinkedList
