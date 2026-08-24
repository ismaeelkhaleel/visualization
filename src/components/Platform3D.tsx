import React from 'react'

type Platform3DProps = {
  width: number
  depth: number
  thickness?: number
  elevation?: number
  children?: React.ReactNode
}

export const Platform3D: React.FC<Platform3DProps> = ({ width, depth, thickness = 20, elevation = 0, children }) => {
  return (
    <div style={{
      position: 'absolute',
      width: `${width}px`,
      height: '0px',
      transformStyle: 'preserve-3d',
      transform: `translateZ(${elevation}px) translateX(-50%)`, // Centered horizontally
      left: '50%',
      bottom: '0px', // Anchored at bottom
    }}>
      {/* Contact Shadow on the ground layer */}
      <div style={{
        position: 'absolute',
        bottom: '0px',
        left: 0,
        width: `${width}px`,
        height: `${depth}px`,
        background: 'rgba(0,0,0,0.8)',
        transformOrigin: 'bottom',
        transform: `translateZ(${-thickness - 4}px) rotateX(90deg)`,
        filter: `blur(${Math.max(8, elevation * 0.5 + 12)}px)`,
        borderRadius: '8px'
      }} />

      {/* Top Face (The Floor) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: `${width}px`,
        height: `${depth}px`,
        background: `linear-gradient(to bottom, #2a2a30 0%, #1e1e24 100%)`,
        border: `1px solid #3d3d45`,
        borderBottom: 'none',
        transformOrigin: 'bottom',
        transform: `rotateX(90deg)`,
        boxSizing: 'border-box',
      }}>
        {/* Top edge highlight */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px',
          background: 'rgba(255,255,255,0.15)'
        }} />
      </div>

      {/* Front Face */}
      <div style={{
        position: 'absolute',
        top: 0, // Starts at the bottom edge (Y=0 relative to parent height:0)
        left: 0,
        width: `${width}px`,
        height: `${thickness}px`,
        background: `linear-gradient(135deg, #1f1f25 0%, #111114 150%)`,
        border: `1px solid #2a2a2e`,
        borderTop: 'none',
        transformOrigin: 'top',
        transform: `translateZ(0px)`,
        boxSizing: 'border-box',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px'
      }} />

      {/* Left Face */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${depth}px`,
        height: `${thickness}px`,
        background: '#151518',
        transformOrigin: 'left top',
        transform: `rotateY(-90deg)`,
        border: `1px solid rgba(0,0,0,0.6)`,
        borderRight: 'none',
        boxSizing: 'border-box',
      }} />

      {/* Right Face */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '100%',
        width: `${depth}px`,
        height: `${thickness}px`,
        background: '#111113',
        transformOrigin: 'left top',
        transform: `rotateY(-90deg)`,
        border: `1px solid rgba(0,0,0,0.8)`,
        borderLeft: 'none',
        boxSizing: 'border-box',
      }} />

      {/* Content wrapper */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '0px',
        transformStyle: 'preserve-3d',
      }}>
        {children}
      </div>
    </div>
  )
}
