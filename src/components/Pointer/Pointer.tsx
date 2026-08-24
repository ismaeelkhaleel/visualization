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
    if (t.includes('curr') || t.includes('mid') || t === 'm') return { core: '#facc15', shadow: 'rgba(250,204,21,0.5)' } // yellow
    if (t.includes('prev') || t.includes('left') || t === 'l') return { core: '#38bdf8', shadow: 'rgba(56,189,248,0.5)' } // cyan
    if (t.includes('next') || t.includes('right') || t === 'r') return { core: '#c084fc', shadow: 'rgba(192,132,252,0.5)' } // purple
    return { core: '#f87171', shadow: 'rgba(248,113,113,0.5)' } // red
  }

  const { core, shadow } = getPalette(label)
  
  // Floating animation
  useLayoutEffect(() => {
    if (!pointerRef.current) return
    const hoverEl = pointerRef.current.querySelector('.pointer-hover')
    if (hoverEl) {
      gsap.to(hoverEl, {
        y: -4,
        duration: 1.2,
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
            
            {/* The 3D Downward Cone/Pyramid */}
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ 
              position: 'absolute', bottom: `${4 + offset}px`, left: '-12px',
              filter: `drop-shadow(0 4px 6px ${shadow})`
            }}>
              <defs>
                <linearGradient id={`grad-left-${label}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor={core} />
                </linearGradient>
                <linearGradient id={`grad-right-${label}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={core} />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.6"/>
                </linearGradient>
              </defs>
              {/* Left face */}
              <polygon points="12,24 0,4 12,8" fill={`url(#grad-left-${label})`} />
              {/* Right face */}
              <polygon points="12,24 12,8 24,4" fill={`url(#grad-right-${label})`} />
              {/* Top Face */}
              <polygon points="0,4 12,0 24,4 12,8" fill={core} />
            </svg>

            {/* Label */}
            <div style={{
              position: 'absolute',
              bottom: `${30 + offset}px`,
              left: 0,
              transform: 'translateX(-50%)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '0.5px',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}>
              {label}
            </div>
          </div>
        )}

        {position === 'bottom' && (
          <div style={{ position: 'absolute', top: '0px', left: 0, transformStyle: 'preserve-3d' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ 
              position: 'absolute', top: `${4 + offset}px`, left: '-12px',
              filter: `drop-shadow(0 -4px 6px ${shadow})`
            }}>
              <defs>
                <linearGradient id={`grad-left-b-${label}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor={core} />
                </linearGradient>
                <linearGradient id={`grad-right-b-${label}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={core} />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.6"/>
                </linearGradient>
              </defs>
              {/* Left face */}
              <polygon points="12,0 0,20 12,16" fill={`url(#grad-left-b-${label})`} />
              {/* Right face */}
              <polygon points="12,0 12,16 24,20" fill={`url(#grad-right-b-${label})`} />
              {/* Bottom Face */}
              <polygon points="0,20 12,24 24,20 12,16" fill={core} />
            </svg>
            <div style={{
              position: 'absolute',
              top: `${30 + offset}px`,
              left: 0,
              transform: 'translateX(-50%)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '0.5px',
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
