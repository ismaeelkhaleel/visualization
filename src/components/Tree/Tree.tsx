import { useLayoutEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import type { TreeVisualizationData, TreeNode } from '../../algorithms/types'
import { surfaces, type SurfaceState } from '../../theme'
import Pointers from '../Pointers/Pointers'
import { Scene3D } from '../Scene3D'

type TreeProps = TreeVisualizationData & {
  visualizationKey?: string
  viewportWidth?: number
  viewportHeight?: number
  isComplete?: boolean
}

function Tree({ nodes, rootId, pointers = [], highlights = [], visualizationKey, viewportWidth = 312, viewportHeight = 192, isComplete }: TreeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.8, z: -50 },
      { opacity: 1, scale: 1, z: 0, duration: 0.6, ease: 'power3.out' }
    )
  }, [visualizationKey])

  const { layout, edges, totalW, totalH } = useMemo(() => {
    if (!rootId || nodes.length === 0) return { layout: [], edges: [], totalW: 0, totalH: 0 }

    const nodeMap = new Map<string, TreeNode>()
    nodes.forEach((n) => nodeMap.set(n.id, n))

    let xCounter = 0
    let maxDepth = 0
    const positions = new Map<string, { x: number; y: number }>()

    function inOrder(id: string | null, depth: number) {
      if (!id) return
      const node = nodeMap.get(id)
      if (!node) return
      inOrder(node.leftId, depth + 1)
      positions.set(id, { x: xCounter++, y: depth })
      if (depth > maxDepth) maxDepth = depth
      inOrder(node.rightId, depth + 1)
    }

    inOrder(rootId, 0)

    const X_SPACING = 55
    const Y_SPACING = 65

    const layoutItems: { node: TreeNode; x: number; y: number; isRoot: boolean }[] = []
    for (const [id, pos] of positions.entries()) {
      const node = nodeMap.get(id)!
      layoutItems.push({ node, x: pos.x * X_SPACING, y: pos.y * Y_SPACING, isRoot: id === rootId })
    }

    const edgesList: { x1: number; y1: number; x2: number; y2: number }[] = []
    for (const item of layoutItems) {
      if (item.node.leftId && positions.has(item.node.leftId)) {
        const child = layoutItems.find((l) => l.node.id === item.node.leftId)!
        edgesList.push({ x1: item.x, y1: item.y, x2: child.x, y2: child.y })
      }
      if (item.node.rightId && positions.has(item.node.rightId)) {
        const child = layoutItems.find((l) => l.node.id === item.node.rightId)!
        edgesList.push({ x1: item.x, y1: item.y, x2: child.x, y2: child.y })
      }
    }

    return {
      layout: layoutItems,
      edges: edgesList,
      totalW: xCounter * X_SPACING,
      totalH: maxDepth * Y_SPACING,
    }
  }, [nodes, rootId])

  if (!rootId || nodes.length === 0) {
    return <div style={{ color: '#555', padding: '20px', textAlign: 'center' }}>Empty Tree</div>
  }

  const R = 20
  const offsetX = -totalW / 2 + R
  const offsetY = -totalH / 2 + R

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
          const dx = edge.x2 - edge.x1
          const dy = edge.y2 - edge.y1
          const dist = Math.sqrt(dx*dx + dy*dy)
          const angle = Math.atan2(dy, dx) * 180 / Math.PI
          return (
            <div key={`edge-${i}`} style={{
              position: 'absolute',
              width: `${dist}px`,
              height: '3px',
              background: 'rgba(255,255,255,0.2)',
              transformOrigin: 'left center',
              transform: `translate3d(${offsetX + edge.x1}px, ${offsetY + edge.y1}px, -10px) rotateZ(${angle}deg)`,
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }} />
          )
        })}

        {/* Nodes */}
        {layout.map(({ node, x, y, isRoot }) => {
          const isHighlighted = highlights.includes(node.id)
          const state: SurfaceState = isComplete ? 'success' : isHighlighted ? 'active' : 'neutral'
          const isElevated = state !== 'neutral'
          const elevZ = isElevated ? 25 : 0
          const s = surfaces[state]

          return (
            <div key={node.id} style={{
              position: 'absolute',
              transformStyle: 'preserve-3d',
              transform: `translate3d(${offsetX + x}px, ${offsetY + y}px, ${elevZ}px)`,
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

              {/* 3D Sphere Element */}
              <div style={{
                position: 'absolute',
                width: `${R*2}px`, height: `${R*2}px`,
                background: `radial-gradient(circle at 35% 30%, ${s.top} 0%, ${s.side} 100%)`,
                border: `2px solid ${s.border}`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: `inset -2px -2px 6px rgba(0,0,0,0.5), inset 2px 2px 6px rgba(255,255,255,0.3)${s.glow !== 'transparent' ? `, 0 0 15px ${s.glow}` : ''}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: s.text, fontWeight: 'bold', fontSize: '14px',
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

              {isRoot && (
                <div style={{
                  position: 'absolute', top: '-35px', left: '0', transform: 'translateX(-50%)',
                  color: surfaces.success.border, fontSize: '10px', fontWeight: 800, letterSpacing: '1px'
                }}>ROOT</div>
              )}
            </div>
          )
        })}

        {/* Pointers */}
        <div style={{ position: 'absolute', transformStyle: 'preserve-3d' }}>
          <Pointers
            pointers={pointers.map(p => {
              const nodeData = layout.find(l => l.node.id === p.nodeId)
              const cx = nodeData ? offsetX + nodeData.x : 0
              const cy = nodeData ? offsetY + nodeData.y : 0
              
              const isHighlighted = p.nodeId ? highlights.includes(p.nodeId) : false
              const state = isComplete ? 'success' : isHighlighted ? 'active' : 'neutral'
              const elevZ = state !== 'neutral' ? 25 : 0

              return {
                label: p.label,
                x: cx,
                y: ('position' in p ? p.position : 'bottom') === 'top' ? cy - R : cy + R,
                z: elevZ,
                position: ('position' in p ? p.position : 'bottom') as 'top' | 'bottom' | 'left' | 'right'
              }
            })}
          />
        </div>
      </div>
    </Scene3D>
  )
}

export default Tree
