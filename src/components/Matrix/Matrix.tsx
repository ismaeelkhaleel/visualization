import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import type { MatrixVisualizationData } from '../../algorithms/types'
import { type SurfaceState } from '../../theme'
import Pointers from '../Pointers/Pointers'
import { Block3D } from '../Block3D'
import { Scene3D } from '../Scene3D'

interface MatrixProps {
  data: MatrixVisualizationData
  isComplete?: boolean
  viewportWidth?: number
  viewportHeight?: number
  visualizationKey?: string
}

export const Matrix: React.FC<MatrixProps> = ({ data, isComplete, viewportWidth = 312, viewportHeight = 261, visualizationKey }) => {
  const { rows, cols, cells, pointers = [], highlights = [], visited = [] } = data
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  }, [visualizationKey])

  const PADDING = 16
  const availableWidth = viewportWidth - PADDING * 2
  const availableHeight = viewportHeight - PADDING * 2

  const maxCellSize = 40
  const minCellSize = 16
  
  // Calculate gap dynamically
  const gap = cols > 10 ? 2 : 4
  
  const cellWidth = Math.max(minCellSize, Math.min(maxCellSize, (availableWidth - (cols - 1) * gap) / cols))
  const cellHeight = Math.max(minCellSize, Math.min(maxCellSize, (availableHeight - (rows - 1) * gap) / rows))
  const cellSize = Math.floor(Math.min(cellWidth, cellHeight))
  
  const blockDepth = Math.max(4, cellSize * 0.25)

  const totalGridWidth = cols * cellSize + (cols - 1) * gap
  const totalGridHeight = rows * cellSize + (rows - 1) * gap
  const offsetX = -totalGridWidth / 2 + cellSize / 2
  const offsetY = -totalGridHeight / 2 + cellSize / 2

  const getCellState = (r: number, c: number): SurfaceState => {
    if (isComplete) return 'success'
    const isHighlighted = highlights.some(h => h.row === r && h.col === c)
    if (isHighlighted) return 'active'
    const isVisited = visited.some(v => v.row === r && v.col === c)
    if (isVisited) return 'visited'
    return 'neutral'
  }

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
        {Array.from({ length: rows }).map((_, r) => (
          Array.from({ length: cols }).map((_, c) => {
            const cellData = cells.find(cell => cell.row === r && cell.col === c)
            const state = getCellState(r, c)
            const isElevated = state === 'active' || state === 'success'
            const elevZ = isElevated ? 12 : 0
            
            const cx = offsetX + c * (cellSize + gap)
            const cy = offsetY + r * (cellSize + gap)

            return (
              <div key={`cell-${r}-${c}`} style={{
                position: 'absolute',
                transformStyle: 'preserve-3d',
                transform: `translate3d(${cx}px, ${cy}px, 0)`
              }}>
                <Block3D
                  width={cellSize}
                  height={cellSize}
                  depth={blockDepth}
                  state={state}
                  elevation={elevZ}
                  text={cellData?.value}
                />
              </div>
            )
          })
        ))}

        {/* Pointers */}
        <div style={{ position: 'absolute', transformStyle: 'preserve-3d' }}>
          <Pointers
            pointers={pointers.map((pointer) => {
              const cx = offsetX + pointer.col * (cellSize + gap)
              const cy = offsetY + pointer.row * (cellSize + gap)
              
              const isHighlighted = highlights.some(h => h.row === pointer.row && h.col === pointer.col)
              const isVisited = visited.some(v => v.row === pointer.row && v.col === pointer.col)
              const state = isComplete ? 'success' : isHighlighted ? 'active' : isVisited ? 'visited' : 'neutral'
              const elevZ = state === 'active' ? 12 : state === 'success' ? 8 : 0

              return {
                label: pointer.label,
                x: cx + cellSize / 2, // center X
                y: ('position' in pointer ? pointer.position : 'bottom') === 'top' ? cy : cy + cellSize, // top or bottom edge Y
                z: elevZ,
                position: ('position' in pointer ? pointer.position : 'bottom') as 'top' | 'bottom' | 'left' | 'right'
              }
            })}
          />
        </div>
      </div>
    </Scene3D>
  )
}
