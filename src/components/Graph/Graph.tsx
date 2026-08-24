import { useLayoutEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import type { GraphVisualizationData } from '../../algorithms/types'
import { surfaces, type SurfaceState } from '../../theme'
import Pointers from '../Pointers/Pointers'
import { Scene3D } from '../Scene3D'

type GraphProps = GraphVisualizationData & {
  visualizationKey?: string
  viewportWidth?: number
  viewportHeight?: number
  isComplete?: boolean
}

function Graph({ nodes, edges, pointers = [], highlights = [], visited = [], visualizationKey, viewportWidth = 312, viewportHeight = 192, isComplete }: GraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.8, z: -50 },
      { opacity: 1, scale: 1, z: 0, duration: 0.6, ease: 'power3.out' }
    )
  }, [visualizationKey])

  const { layoutMap } = useMemo(() => {
    const radius = 95
    const layoutMap = new Map<string, { x: number; y: number }>()
    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2
      layoutMap.set(node.id, {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      })
    })
    return { layoutMap }
  }, [nodes])

  if (nodes.length === 0) {
    return <div style={{ color: '#555', padding: '20px', textAlign: 'center' }}>Empty Graph</div>
  }

  const R = 18

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
        {/* Edges */}
        {edges.map((edge, i) => {
          const fromPos = layoutMap.get(edge.from)
          const toPos = layoutMap.get(edge.to)
          if (!fromPos || !toPos) return null
          
          const dx = toPos.x - fromPos.x
          const dy = toPos.y - fromPos.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          const angle = Math.atan2(dy, dx) * 180 / Math.PI
          
          const isHighlighted = highlights.includes(edge.from) && highlights.includes(edge.to)
          const color = isHighlighted ? surfaces.active.border : 'rgba(255,255,255,0.2)'
          const zDepth = isHighlighted ? 5 : -10
          
          return (
            <div key={`edge-${i}`} style={{
              position: 'absolute',
              width: `${dist}px`,
              height: '3px',
              background: color,
              transformOrigin: 'left center',
              transform: `translate3d(${fromPos.x}px, ${fromPos.y}px, ${zDepth}px) rotateZ(${angle}deg)`,
              borderRadius: '2px',
              boxShadow: isHighlighted ? `0 0 10px ${surfaces.active.glow}` : '0 2px 4px rgba(0,0,0,0.5)',
              transition: 'transform 0.4s ease, background 0.4s ease',
            }}>
              {edge.directed && (
                <div style={{
                  position: 'absolute', right: `${R}px`, top: '-4px',
                  borderTop: '5.5px solid transparent',
                  borderBottom: '5.5px solid transparent',
                  borderLeft: `10px solid ${color}`,
                }} />
              )}
            </div>
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = layoutMap.get(node.id)!
          const isHighlighted = highlights.includes(node.id)
          const isVisited = visited.includes(node.id)

          let state: SurfaceState = 'neutral'
          if (isComplete) state = 'success'
          else if (isHighlighted) state = 'compare' // Using compare for highlighted node in Graph
          else if (isVisited) state = 'visited'

          const isElevated = state !== 'neutral' && state !== 'visited'
          const elevZ = state === 'success' ? 10 : isElevated ? 25 : state === 'visited' ? 5 : 0
          const s = surfaces[state]

          return (
            <div key={node.id} style={{
              position: 'absolute',
              transformStyle: 'preserve-3d',
              transform: `translate3d(${pos.x}px, ${pos.y}px, ${elevZ}px)`,
              transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
            }}>
              {/* Floor Shadow */}
              <div style={{
                position: 'absolute',
                width: `${R*2}px`, height: `${R*2}px`,
                background: 'rgba(0,0,0,0.8)',
                borderRadius: '50%',
                transform: `translate(-50%, -50%) translateZ(-${elevZ + 10}px)`,
                filter: `blur(${Math.max(4, elevZ * 0.5)}px)`,
                transition: 'filter 0.5s ease',
              }} />

              {/* 3D Sphere */}
              <div style={{
                position: 'absolute',
                width: `${R*2}px`, height: `${R*2}px`,
                background: `radial-gradient(circle at 35% 30%, ${s.top} 0%, ${s.side} 100%)`,
                border: `2px solid ${s.border}`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: `inset -2px -2px 6px rgba(0,0,0,0.5), inset 2px 2px 6px rgba(255,255,255,0.3)${s.glow !== 'transparent' ? `, 0 0 15px ${s.glow}` : ''}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: s.text, fontWeight: 'bold', fontSize: '13px',
              }}>
                {/* Specular highlight */}
                <div style={{
                  position: 'absolute', top: '15%', left: '20%',
                  width: '30%', height: '15%',
                  background: 'rgba(255,255,255,0.4)',
                  borderRadius: '50%',
                  transform: 'rotate(-45deg)',
                  filter: 'blur(1px)'
                }} />
                <span style={{ position: 'relative', zIndex: 1 }}>{node.value}</span>
              </div>
            </div>
          )
        })}

        {/* Pointers */}
        <div style={{ position: 'absolute', transformStyle: 'preserve-3d' }}>
          <Pointers
            pointers={pointers.map(p => {
              const pos = layoutMap.get(p.nodeId || '')
              const cx = pos ? pos.x : 0
              const cy = pos ? pos.y : 0

              const isHighlighted = p.nodeId ? highlights.includes(p.nodeId) : false
              const isVisited = p.nodeId ? visited.includes(p.nodeId) : false
              let state: SurfaceState = 'neutral'
              if (isComplete) state = 'success'
              else if (isHighlighted) state = 'compare'
              else if (isVisited) state = 'visited'

              const isElevated = state !== 'neutral' && state !== 'visited'
              const elevZ = state === 'success' ? 10 : isElevated ? 25 : state === 'visited' ? 5 : 0

              return {
                label: p.label,
                x: cx,
                y: ('position' in p ? p.position : 'bottom') === 'top' ? cy - R : cy + R,
                z: elevZ,
                position: ('position' in p ? p.position : 'bottom') as 'top' | 'bottom' | 'left' | 'right'
              }
            }).filter(p => p.x !== 0 || p.y !== 0)}
          />
        </div>
      </div>
    </Scene3D>
  )
}

export default Graph
