import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'


type PointerProps = {
  label: string
  targetX: number
  targetY: number
  targetZ?: number
  position: 'top' | 'bottom' | 'left' | 'right'
}

function Pointer({ label, targetX, targetY, targetZ = 10, position }: PointerProps) {
  const pointerRef = useRef<HTMLDivElement | null>(null)
  const firstRender = useRef(true)

  useLayoutEffect(() => {
    if (!pointerRef.current) return
    if (firstRender.current) {
      gsap.set(pointerRef.current, { x: targetX, y: targetY, z: targetZ })
      firstRender.current = false
      return
    }
    // Physical motion: lifts slightly, moves, then drops to target
    const tl = gsap.timeline()
    tl.to(pointerRef.current, {
      z: targetZ + 30, // lift up
      duration: 0.2,
      ease: 'power2.out'
    }).to(pointerRef.current, {
      x: targetX,
      y: targetY,
      duration: 0.4,
      ease: 'power2.inOut'
    }, "-=0.1").to(pointerRef.current, {
      z: targetZ, // settle down
      duration: 0.2,
      ease: 'back.out(1.5)'
    })
  }, [targetX, targetY, targetZ])

  // Semantic color mapping
  const getPalette = (text: string) => {
    const t = text.toLowerCase()
    if (t.includes('curr') || t.includes('mid') || t === 'm') return { core: '#facc15' } // yellow
    if (t.includes('prev') || t.includes('left') || t === 'l') return { core: '#38bdf8' } // cyan
    if (t.includes('next') || t.includes('right') || t === 'r') return { core: '#c084fc' } // purple
    return { core: '#f87171' } // red
  }

  const { core } = getPalette(label)
  
  // Floating animation removed for rigid physical attachment

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
        {position === 'top' && (
          <div style={{ position: 'absolute', bottom: '0px', left: 0, transformStyle: 'preserve-3d' }}>
            
            {/* The Dimensional Stem Pointer */}
            <svg width="20" height="32" viewBox="0 0 20 32" style={{ 
              position: 'absolute', bottom: `0px`, left: '-10px',
              filter: `drop-shadow(0 6px 4px rgba(0,0,0,0.5))`
            }}>
              <defs>
                <linearGradient id={`grad-stem-${label}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.7"/>
                  <stop offset="50%" stopColor={core} />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.4"/>
                </linearGradient>
              </defs>
              {/* Stem */}
              <rect x="8" y="4" width="4" height="20" fill={`url(#grad-stem-${label})`} />
              {/* Arrow Head */}
              <polygon points="10,32 4,22 16,22" fill={core} />
              <polygon points="10,32 4,22 10,22" fill="#fff" fillOpacity="0.3" />
              <polygon points="10,32 10,22 16,22" fill="#000" fillOpacity="0.2" />
            </svg>

            {/* Label */}
            <div style={{
              position: 'absolute',
              bottom: `34px`,
              left: 0,
              transform: 'translateX(-50%)',
              color: core,
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '0.5px',
              background: '#111',
              padding: '2px 6px',
              borderRadius: '4px',
              border: `1px solid ${core}`,
              boxShadow: '0 4px 6px rgba(0,0,0,0.6)'
            }}>
              {label}
            </div>
          </div>
        )}

        {position === 'bottom' && (
          <div style={{ position: 'absolute', top: '0px', left: 0, transformStyle: 'preserve-3d' }}>
            <svg width="20" height="32" viewBox="0 0 20 32" style={{ 
              position: 'absolute', top: `0px`, left: '-10px',
              filter: `drop-shadow(0 -6px 4px rgba(0,0,0,0.5))`
            }}>
              <defs>
                <linearGradient id={`grad-stem-b-${label}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.7"/>
                  <stop offset="50%" stopColor={core} />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.4"/>
                </linearGradient>
              </defs>
              {/* Stem */}
              <rect x="8" y="8" width="4" height="20" fill={`url(#grad-stem-b-${label})`} />
              {/* Arrow Head */}
              <polygon points="10,0 4,10 16,10" fill={core} />
              <polygon points="10,0 4,10 10,10" fill="#fff" fillOpacity="0.3" />
              <polygon points="10,0 10,10 16,10" fill="#000" fillOpacity="0.2" />
            </svg>
            <div style={{
              position: 'absolute',
              top: `34px`,
              left: 0,
              transform: 'translateX(-50%)',
              color: core,
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '0.5px',
              background: '#111',
              padding: '2px 6px',
              borderRadius: '4px',
              border: `1px solid ${core}`,
              boxShadow: '0 4px 6px rgba(0,0,0,0.6)'
            }}>
              {label}
            </div>
          </div>
        )}

    </div>
  )
}

export default Pointer
