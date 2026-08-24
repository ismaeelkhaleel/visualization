import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { theme } from '../../theme'

type PointerProps = {
  label: string
  targetX: number
  targetY: number
  targetZ?: number
  position: 'top' | 'bottom' | 'left' | 'right'
  offset?: number
}

function Pointer({ label, targetX, targetY, targetZ = 10, position, offset = 0 }: PointerProps) {
  const pointerRef = useRef<HTMLDivElement | null>(null)
  const firstRender = useRef(true)

  useLayoutEffect(() => {
    if (!pointerRef.current) return
    if (firstRender.current) {
      gsap.set(pointerRef.current, { x: targetX, y: targetY, z: targetZ })
      firstRender.current = false
      return
    }
    gsap.to(pointerRef.current, {
      x: targetX, 
      y: targetY, 
      z: targetZ,
      duration: theme.animation.durationMedium,
      ease: 'back.out(1.2)',
    })
  }, [targetX, targetY, targetZ])

  

  return (
    <div
      ref={pointerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Floor Shadow for the pointer tip */}
      <div style={{
        position: 'absolute',
        width: '16px', height: '16px',
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '50%',
        transform: `translate(-50%, -50%) translateZ(-${targetZ}px)`,
        filter: 'blur(3px)'
      }} />

      {/* Label and Arrow anchored exactly to (0,0) */}
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        
        {position === 'top' && (
          <>
            <svg width="12" height={16 + offset} style={{ position: 'absolute', bottom: '0px', left: '-6px' }}>
              <defs><linearGradient id={`g-${label}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient></defs>
              <path d={`M5,0 L7,0 L7,${10 + offset} L12,${10 + offset} L6,${16 + offset} L0,${10 + offset} L5,${10 + offset} Z`} fill={`url(#g-${label})`} />
            </svg>
            <div style={getLabelStyle('bottom', 16 + offset + 2, '-50%', 0)}>{label}</div>
          </>
        )}

        {position === 'bottom' && (
          <>
            <svg width="12" height={16 + offset} style={{ position: 'absolute', top: '0px', left: '-6px' }}>
              <defs><linearGradient id={`g-${label}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient></defs>
              <path d={`M6,0 L12,6 L7,6 L7,${16 + offset} L5,${16 + offset} L5,6 L0,6 Z`} fill={`url(#g-${label})`} />
            </svg>
            <div style={getLabelStyle('top', 16 + offset + 2, '-50%', 0)}>{label}</div>
          </>
        )}

        {position === 'left' && (
          <>
            <svg width={16 + offset} height="12" style={{ position: 'absolute', right: '0px', top: '-6px' }}>
              <defs><linearGradient id={`g-${label}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient></defs>
              <path d={`M0,5 L${10 + offset},5 L${10 + offset},0 L${16 + offset},6 L${10 + offset},12 L${10 + offset},7 L0,7 Z`} fill={`url(#g-${label})`} />
            </svg>
            <div style={getLabelStyle('right', 16 + offset + 2, 0, '-50%')}>{label}</div>
          </>
        )}

        {position === 'right' && (
          <>
            <svg width={16 + offset} height="12" style={{ position: 'absolute', left: '0px', top: '-6px' }}>
              <defs><linearGradient id={`g-${label}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient></defs>
              <path d={`M${16 + offset},5 L6,5 L6,0 L0,6 L6,12 L6,7 L${16 + offset},7 Z`} fill={`url(#g-${label})`} />
            </svg>
            <div style={getLabelStyle('left', 16 + offset + 2, 0, '-50%')}>{label}</div>
          </>
        )}

      </div>
    </div>
  )
}

function getLabelStyle(anchor: string, dist: number, tx: string | number, ty: string | number): React.CSSProperties {
  return {
    position: 'absolute',
    [anchor]: `${dist}px`,
    transform: `translate(${tx}, ${ty})`,
    fontSize: '11px',
    color: '#ffffff',
    whiteSpace: 'nowrap',
    fontWeight: 800,
    lineHeight: '1',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: '3px 6px',
    background: 'rgba(37,99,235,0.85)',
    borderRadius: '4px',
    border: `1px solid #60a5fa`,
    boxShadow: `0 2px 10px rgba(37,99,235,0.5)`,
  }
}

export default Pointer
