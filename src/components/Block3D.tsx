import React from 'react'
import { surfaces, type SurfaceState } from '../theme'

type Block3DProps = {
  width: number
  height: number
  depth: number
  state: SurfaceState
  text?: React.ReactNode
  elevation?: number
  className?: string
  style?: React.CSSProperties
  isNegative?: boolean
}

// Reference-faithful neutral materials (solid opaque cubes)
// Positive: slate-blue (matching reference 42196.jpg, 44876.png)
const positiveNeutral = {
  top:    '#475569',
  front:  '#334155',
  side:   '#1e293b',
  border: '#64748b',
  glow:   'transparent',
  text:   '#f1f5f9',
}

// Negative: muted red/coral (matching reference 44876.png)
const negativeNeutral = {
  top:    '#9f1239',
  front:  '#881337',
  side:   '#4c0519',
  border: '#e11d48',
  glow:   'transparent',
  text:   '#fecdd3',
}

export const Block3D = React.forwardRef<HTMLDivElement, Block3DProps>(({ width, height, depth, state, text, elevation = 0, className, style, isNegative = false }, ref) => {
  // Neutral: sign-based solid coloring (reference-faithful)
  // Semantic states: use theme surfaces (opaque, visually dominant)
  const s = state === 'neutral'
    ? (isNegative ? negativeNeutral : positiveNeutral)
    : surfaces[state]

  const isSemanticActive = state !== 'neutral' && state !== 'visited'

  return (
    <div ref={ref} className={className} style={{
      ...style,
      position: 'relative',
      width: `${width}px`,
      height: `${height}px`,
      transformStyle: 'preserve-3d',
      transform: `translateY(${-elevation}px) translateZ(${elevation * 0.5}px)`,
      transition: 'transform 0.35s cubic-bezier(0.25,1,0.5,1)',
    }}>
      {/* Contact Shadow */}
      <div style={{
        position: 'absolute',
        bottom: '-2px',
        left: '2px',
        width: `${width}px`,
        height: `${depth}px`,
        background: 'rgba(0,0,0,0.6)',
        transformOrigin: 'bottom',
        transform: `translateZ(${-depth * 0.5}px) rotateX(90deg)`,
        filter: `blur(${Math.max(6, elevation * 0.3 + 6)}px)`,
        transition: 'filter 0.5s ease',
      }}></div>

      {/* TOP FACE */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${width}px`,
        height: `${depth}px`,
        background: s.top,
        border: `1px solid ${s.border}`,
        borderBottom: 'none',
        transformOrigin: 'top',
        transform: `rotateX(90deg)`,
        boxSizing: 'border-box',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px',
          background: 'rgba(255,255,255,0.2)'
        }} />
      </div>

      {/* FRONT FACE */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${width}px`,
        height: `${height}px`,
        background: s.front,
        border: `1px solid ${s.border}`,
        borderRight: 'none',
        transform: `translateZ(0px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: s.text,
        fontSize: `${Math.max(12, Math.min(width * 0.45, height * 0.45))}px`,
        fontWeight: 900,
        boxSizing: 'border-box',
        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
      }}>
        {/* Subtle vertical gradient for physical lighting */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.12) 100%)',
          pointerEvents: 'none'
        }} />
        {/* Glow overlay for semantic active states */}
        {isSemanticActive && s.glow !== 'transparent' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            boxShadow: `inset 0 0 ${width * 0.4}px ${s.glow}`,
            pointerEvents: 'none'
          }} />
        )}
        <span style={{ position: 'relative', zIndex: 1 }}>{text}</span>
      </div>

      {/* RIGHT FACE */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: `${width}px`,
        width: `${depth}px`,
        height: `${height}px`,
        background: s.side,
        transformOrigin: 'left',
        transform: `rotateY(90deg)`,
        border: `1px solid rgba(0,0,0,0.5)`,
        borderLeft: `1px solid ${s.border}`,
        boxSizing: 'border-box',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

    </div>
  )
})
