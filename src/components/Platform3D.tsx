import React from 'react'

type Platform3DProps = {
  width: number
  depth: number
  thickness?: number
  elevation?: number
  children?: React.ReactNode
}

export const Platform3D: React.FC<Platform3DProps> = ({ width, depth, thickness = 32, elevation = 0, children }) => {
  return (
    <div style={{
      position: 'absolute',
      width: `${width}px`,
      height: '0px',
      transformStyle: 'preserve-3d',
      transform: `translateZ(${elevation}px) translateX(-50%)`,
      left: '50%',
      bottom: '0px',
    }}>
      {/* Ground shadow */}
      <div style={{
        position: 'absolute',
        bottom: '0px',
        left: '5%',
        width: '90%',
        height: `${depth * 0.8}px`,
        background: 'rgba(0,0,0,0.5)',
        transformOrigin: 'bottom',
        transform: `translateZ(${-thickness - 8}px) rotateX(90deg)`,
        filter: `blur(20px)`,
        borderRadius: '50%'
      }} />

      {/* TOP FACE — solid gray stage surface (reference-faithful) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: `${width}px`,
        height: `${depth}px`,
        background: 'linear-gradient(180deg, #4b5563 0%, #3f4b5c 100%)',
        border: '1px solid #6b7280',
        borderBottom: 'none',
        transformOrigin: 'bottom',
        transform: `rotateX(90deg)`,
        boxSizing: 'border-box',
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px',
          background: 'rgba(255,255,255,0.15)'
        }} />
      </div>

      {/* FRONT FACE */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${width}px`,
        height: `${thickness}px`,
        background: 'linear-gradient(180deg, #374151 0%, #1f2937 100%)',
        border: '1px solid #4b5563',
        borderTop: 'none',
        transformOrigin: 'top',
        transform: `translateZ(0px)`,
        boxSizing: 'border-box',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'rgba(255,255,255,0.08)',
        }} />
      </div>

      {/* RIGHT FACE */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: `${width}px`,
        width: `${depth}px`,
        height: `${thickness}px`,
        background: '#1f2937',
        transformOrigin: 'left',
        transform: `rotateY(90deg)`,
        border: '1px solid rgba(0,0,0,0.5)',
        borderLeft: '1px solid #4b5563',
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
