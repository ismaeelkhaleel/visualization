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
      ease: 'power3.out',
    })
  }, [targetX, targetY, targetZ])

  // Map label to a specific color palette for variety (curr=yellow, prev=blue, etc.)
  const getPalette = (text: string) => {
    const t = text.toLowerCase()
    if (t.includes('curr') || t.includes('mid')) return { glow: 'rgba(234, 179, 8, 0.8)', core: '#eab308' } // yellow
    if (t.includes('prev') || t.includes('left') || t === 'l') return { glow: 'rgba(56, 189, 248, 0.8)', core: '#38bdf8' } // cyan
    if (t.includes('next') || t.includes('right') || t === 'r') return { glow: 'rgba(167, 139, 250, 0.8)', core: '#a78bfa' } // purple
    return { glow: 'rgba(248, 113, 113, 0.8)', core: '#f87171' } // red/default
  }

  const { glow, core } = getPalette(label)
  
  // Hover animation
  useLayoutEffect(() => {
    if (!pointerRef.current) return
    const hoverEl = pointerRef.current.querySelector('.pointer-hover')
    if (hoverEl) {
      gsap.to(hoverEl, {
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }
  }, [])

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
      <div className="pointer-hover" style={{ position: 'absolute', top: 0, left: 0, transformStyle: 'preserve-3d' }}>
        
        {position === 'top' && (
          <div style={{ position: 'absolute', bottom: '0px', left: 0, transformStyle: 'preserve-3d' }}>
            {/* The Light Beam */}
            <div style={{
              position: 'absolute',
              bottom: '0px',
              left: '-12px',
              width: '24px',
              height: `${25 + offset}px`,
              background: `linear-gradient(to bottom, transparent 0%, ${glow} 100%)`,
              clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
              opacity: 0.6,
              transformOrigin: 'bottom',
              transform: 'rotateX(-15deg)'
            }} />
            
            {/* The 3D Source Object (Sphere/Diamond) */}
            <div style={{
              position: 'absolute',
              bottom: `${20 + offset}px`,
              left: '-8px',
              width: '16px',
              height: '16px',
              background: `radial-gradient(circle at 30% 30%, #fff 0%, ${core} 40%, #000 100%)`,
              borderRadius: '50%',
              boxShadow: `0 0 15px ${glow}`,
              transform: 'translateZ(10px)'
            }} />

            {/* Label */}
            <div style={{
              position: 'absolute',
              bottom: `${42 + offset}px`,
              left: 0,
              transform: 'translateX(-50%)',
              color: core,
              fontSize: '12px',
              fontWeight: 900,
              letterSpacing: '1px',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}>
              {label}
            </div>
          </div>
        )}

        {position === 'bottom' && (
          <div style={{ position: 'absolute', top: '0px', left: 0, transformStyle: 'preserve-3d' }}>
            {/* Light Beam */}
            <div style={{
              position: 'absolute',
              top: '0px',
              left: '-12px',
              width: '24px',
              height: `${25 + offset}px`,
              background: `linear-gradient(to top, transparent 0%, ${glow} 100%)`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              opacity: 0.6,
              transformOrigin: 'top',
              transform: 'rotateX(15deg)'
            }} />
            
            <div style={{
              position: 'absolute',
              top: `${20 + offset}px`,
              left: '-8px',
              width: '16px',
              height: '16px',
              background: `radial-gradient(circle at 30% 30%, #fff 0%, ${core} 40%, #000 100%)`,
              borderRadius: '50%',
              boxShadow: `0 0 15px ${glow}`,
              transform: 'translateZ(10px)'
            }} />

            <div style={{
              position: 'absolute',
              top: `${42 + offset}px`,
              left: 0,
              transform: 'translateX(-50%)',
              color: core,
              fontSize: '12px',
              fontWeight: 900,
              letterSpacing: '1px',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}>
              {label}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Pointer
