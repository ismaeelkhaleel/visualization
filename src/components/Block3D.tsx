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
      transform: `translateY(${-elevation}px) translateZ(${elevation * 0.5}px)`, // Lift up and slightly forward
      transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      {/* Contact Shadow on the Platform (Z = -depth) */}
      <div style={{
        position: 'absolute',
        bottom: '0px',
        width: `${width}px`,
        height: `${depth}px`,
        background: 'rgba(0,0,0,0.85)',
        transformOrigin: 'bottom',
        transform: `translateZ(${-depth}px) rotateX(90deg)`,
        filter: `blur(${Math.max(4, elevation * 0.5 + 4)}px)`,
        transition: 'filter 0.5s ease',
      }}></div>
      
      {/* Top Face */}
      <div style={{
        position: 'absolute',
        top: 0,
        width: `${width}px`,
        height: `${depth}px`,
        background: `linear-gradient(to bottom, ${s.top} 0%, ${s.side} 100%)`,
        border: `1px solid ${s.border}`,
        borderBottom: 'none',
        transformOrigin: 'top',
        transform: `rotateX(90deg)`,
        boxSizing: 'border-box'
      }}>
        {/* Top bevel highlight */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '3px',
          background: 'rgba(255,255,255,0.25)'
        }} />
      </div>
      
      {/* Front Face */}
      <div style={{
        position: 'absolute',
        top: 0,
        width: `${width}px`,
        height: `${height}px`,
        background: `linear-gradient(135deg, ${s.front} 0%, ${s.side} 150%)`,
        border: `1px solid ${s.border}`,
        boxShadow: `inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.4)`,
        transform: `translateZ(0px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: s.text,
        fontSize: Math.min(width, height) * 0.45 + 'px',
        fontWeight: 900,
        boxSizing: 'border-box',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }}>
        {/* Specular Glint */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(105deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0) 60%)',
          pointerEvents: 'none'
        }} />
        {text}
      </div>
      
      {/* Left Face */}
      <div style={{
        position: 'absolute',
        top: 0,
        width: `${depth}px`,
        height: `${height}px`,
        background: `linear-gradient(to bottom, ${s.side} 0%, #000 150%)`,
        transformOrigin: 'left',
        transform: `rotateY(-90deg)`,
        border: `1px solid rgba(0,0,0,0.6)`,
        borderRight: 'none',
        boxSizing: 'border-box'
      }}></div>
      
      {/* Right Face */}
      <div style={{
        position: 'absolute',
        top: 0,
        width: `${depth}px`,
        height: `${height}px`,
        background: `linear-gradient(to bottom, ${s.side} 0%, #000 150%)`,
        transformOrigin: 'right',
        transform: `translateX(${width - depth}px) rotateY(90deg)`,
        border: `1px solid rgba(0,0,0,0.6)`,
        borderLeft: 'none',
        boxSizing: 'border-box'
      }}></div>

    </div>
  )
})
