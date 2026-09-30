import React from 'react'

type Scene3DProps = {
  children: React.ReactNode
  width?: number
  height?: number
}

export const Scene3D: React.FC<Scene3DProps> = ({ children, width = 328, height = 304 }) => {
  return (
    <div style={{
      width: `${width}px`,
      height: `${height}px`,
      // Perspective from slightly above and slightly to the LEFT
      // This reveals the RIGHT side face and TOP face of blocks (matching reference images)
      perspective: '600px',
      perspectiveOrigin: '45% 35%',
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
