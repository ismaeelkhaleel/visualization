import React from 'react'

type Platform3DProps = {
  width: number
  depth: number
  thickness?: number
  elevation?: number
  children?: React.ReactNode
}

export const Platform3D: React.FC<Platform3DProps> = ({ width, depth, thickness = 10, elevation = 0, children }) => {
  return (
    <div style={{
      position: 'absolute',
      width: `${width}px`,
      height: '0px',
      transformStyle: 'preserve-3d',
      transform: `translateZ(${elevation}px)`,
    }}>
      {/* Contact Shadow on the ground layer */}
      <div style={{
        position: 'absolute',
        width: `${width}px`,
        height: `${depth}px`,
        background: 'rgba(0,0,0,0.8)',
        transformOrigin: 'top',
        transform: `translateY(${-depth/2}px) translateZ(${-thickness - 4}px)`,
        filter: `blur(${Math.max(8, elevation * 0.5 + 8)}px)`,
        borderRadius: '8px'
      }} />

      {/* Top Face */}
      <div style={{
        position: 'absolute',
        width: `${width}px`,
        height: `${depth}px`,
        background: `linear-gradient(to bottom, #232328 0%, #1a1a1f 100%)`,
        border: `1px solid #333338`,
        transformOrigin: 'top',
        transform: `translateY(${-depth/2}px) rotateX(90deg)`,
        boxSizing: 'border-box',
        borderRadius: '4px'
      }}>
        {/* Top edge highlight */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
          background: 'rgba(255,255,255,0.1)'
        }} />
      </div>

      {/* Front Face */}
      <div style={{
        position: 'absolute',
        width: `${width}px`,
        height: `${thickness}px`,
        background: `linear-gradient(135deg, #18181b 0%, #111113 150%)`,
        border: `1px solid #2a2a2e`,
        borderTop: 'none',
        transformOrigin: 'top',
        transform: `translateY(${depth/2}px) translateZ(0px)`,
        boxSizing: 'border-box',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px'
      }} />

      {/* Left Face */}
      <div style={{
        position: 'absolute',
        width: `${depth}px`,
        height: `${thickness}px`,
        background: '#111113',
        transformOrigin: 'left top',
        transform: `translateY(${-depth/2}px) rotateY(-90deg)`,
        border: `1px solid rgba(0,0,0,0.5)`,
        boxSizing: 'border-box',
      }} />

      {/* Right Face */}
      <div style={{
        position: 'absolute',
        width: `${depth}px`,
        height: `${thickness}px`,
        background: '#111113',
        transformOrigin: 'right top',
        transform: `translateX(${width - depth}px) translateY(${-depth/2}px) rotateY(90deg)`,
        border: `1px solid rgba(0,0,0,0.5)`,
        boxSizing: 'border-box',
      }} />

      {/* Content wrapper */}
      <div style={{
        position: 'absolute',
        width: `${width}px`,
        height: '0px',
        transformStyle: 'preserve-3d',
      }}>
        {children}
      </div>
    </div>
  )
}
