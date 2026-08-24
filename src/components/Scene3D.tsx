import React from 'react'

type Scene3DProps = {
  children: React.ReactNode
  width?: number
  height?: number
}

export const Scene3D: React.FC<Scene3DProps> = ({ children, width = 312, height = 192 }) => {
  return (
    <div style={{
      width: `${width}px`,
      height: `${height}px`,
      perspective: '1200px',
      perspectiveOrigin: '50% -20%', // Camera is centered, slightly above
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible'
    }}>
      <div style={{
        transformStyle: 'preserve-3d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'relative'
      }}>
        {children}
      </div>
    </div>
  )
}
