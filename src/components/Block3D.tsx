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
}

export const Block3D = React.forwardRef<HTMLDivElement, Block3DProps>(({ width, height, depth, state, text, elevation = 0, className, style }, ref) => {
  const s = surfaces[state]
  
  return (
    <div ref={ref} className={className} style={{
      ...style,
      position: 'relative',
      width: `${width}px`,
      height: `${height}px`,
      transformStyle: 'preserve-3d',
      transform: `translateZ(${elevation}px)`,
      transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      {/* Contact Shadow on the back plane (Z = -depth) */}
      <div style={{
        position: 'absolute',
        width: `${width}px`,
        height: `${height}px`,
        background: 'rgba(0,0,0,0.6)',
        transform: `translateZ(${-depth - 2}px) translateY(4px)`,
        filter: `blur(${Math.max(4, elevation * 0.4)}px)`,
        transition: 'filter 0.5s ease',
      }}></div>
      
      {/* Top Face */}
      <div style={{
        position: 'absolute',
        width: `${width}px`,
        height: `${depth}px`,
        background: `linear-gradient(to bottom, ${s.top} 0%, ${s.side} 100%)`,
        border: `1px solid ${s.border}`,
        borderBottom: 'none',
        transformOrigin: 'top',
        transform: `rotateX(90deg)`,
        boxSizing: 'border-box'
      }}>
        {/* Top edge highlight */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '20%',
          background: 'rgba(255,255,255,0.2)'
        }} />
      </div>
      
      {/* Front Face (Y = height) */}
      <div style={{
        position: 'absolute',
        width: `${width}px`,
        height: `${height}px`,
        background: `linear-gradient(135deg, ${s.front} 0%, ${s.side} 150%)`,
        border: `1px solid ${s.border}`,
        boxShadow: `inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.3)${s.glow !== 'transparent' ? `, 0 0 15px ${s.glow}` : ''}`,
        transform: `translateZ(0px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: s.text,
        fontSize: Math.min(width, height) * 0.4 + 'px',
        fontWeight: 800,
        boxSizing: 'border-box'
      }}>
        {text}
      </div>
      
      {/* Left Face (X = 0) */}
      <div style={{
        position: 'absolute',
        width: `${depth}px`,
        height: `${height}px`,
        background: s.side,
        transformOrigin: 'left',
        transform: `rotateY(-90deg)`,
        border: `1px solid rgba(0,0,0,0.5)`,
        borderRight: 'none',
        boxSizing: 'border-box'
      }}></div>
      
      {/* Right Face (X = width) */}
      <div style={{
        position: 'absolute',
        width: `${depth}px`,
        height: `${height}px`,
        background: s.side,
        transformOrigin: 'right',
        transform: `translateX(${width - depth}px) rotateY(90deg)`,
        border: `1px solid rgba(0,0,0,0.5)`,
        borderLeft: 'none',
        boxSizing: 'border-box'
      }}></div>

      {/* Bottom Face */}
      <div style={{
        position: 'absolute',
        width: `${width}px`,
        height: `${depth}px`,
        background: '#000',
        transformOrigin: 'bottom',
        transform: `translateY(${height - depth}px) rotateX(-90deg)`,
        boxSizing: 'border-box'
      }}></div>
    </div>
  )
})
