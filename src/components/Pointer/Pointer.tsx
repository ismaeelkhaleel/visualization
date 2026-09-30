import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

type PointerProps = {
  speed?: number
  isJump?: boolean
  label: string
  targetX: number
  targetY: number
  targetZ?: number
  position: 'top' | 'bottom' | 'left' | 'right'
}

function Pointer({ label, targetX, targetY, targetZ = 0, position, speed = 1, isJump = false }: PointerProps) {
  const pointerRef = useRef<HTMLDivElement | null>(null)
  const firstRender = useRef(true)

  useLayoutEffect(() => {
    if (!pointerRef.current) return
    if (firstRender.current) {
      gsap.set(pointerRef.current, { x: targetX, y: targetY, z: targetZ })
      firstRender.current = false
      return
    }

    const el = pointerRef.current
    gsap.killTweensOf(el)

    if (isJump) {
      gsap.set(el, { x: targetX, y: targetY, z: targetZ })
      return
    }
    
    const currentX = gsap.getProperty(el, 'x') as number
    const currentZ = gsap.getProperty(el, 'z') as number

    const d = 1 / speed

    if (Math.abs(targetX - currentX) < 10) {
      gsap.to(el, { x: targetX, y: targetY, z: targetZ, duration: 0.2 * d, ease: 'power2.out' })
      return
    }

    const tl = gsap.timeline()
    
    // Base peak exclusively on target to avoid cumulative jumps if interrupted
    const peakY = targetY - 15
    const peakZ = Math.max(currentZ, targetZ) + 10

    tl.to(el, {
      x: targetX,
      duration: 0.3 * d,
      ease: 'power2.inOut',
    }, 0)
    tl.to(el, {
      y: peakY,
      z: peakZ,
      duration: 0.15 * d,
      ease: 'power2.out',
    }, 0)
    tl.to(el, {
      y: targetY,
      z: targetZ,
      duration: 0.15 * d,
      ease: 'power2.in',
    }, 0.15 * d)
  }, [targetX, targetY, targetZ, speed, isJump])

  // Semantic color mapping
  const getPalette = (text: string) => {
    const t = text.toLowerCase()
    if (t.includes('num') || t.includes('curr') || t.includes('mid') || t === 'm' || t === 'i') return { bg: '#0ea5e9', border: '#38bdf8', dark: '#0369a1' }
    if (t.includes('prev') || t.includes('left') || t === 'l') return { bg: '#22c55e', border: '#4ade80', dark: '#15803d' }
    if (t.includes('next') || t.includes('right') || t === 'r' || t === 'j') return { bg: '#a855f7', border: '#c084fc', dark: '#7e22ce' }
    return { bg: '#ef4444', border: '#f87171', dark: '#b91c1c' }
  }

  const { bg, border, dark } = getPalette(label)

  // Compact 3D pointer badge — a small physical marker with depth
  const badge = (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* 3D badge body */}
      <div style={{
        position: 'relative',
        background: bg,
        color: '#fff',
        fontSize: '9px',
        fontWeight: 900,
        padding: '2px 6px',
        borderRadius: '3px',
        border: `1.5px solid ${border}`,
        letterSpacing: '0.5px',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
        // Physical depth shadow (simulates thickness)
        boxShadow: `0 3px 0 ${dark}, 0 5px 10px rgba(0,0,0,0.5)`,
      }}>
        {label}
      </div>
    </div>
  )

  return (
    <div
      ref={pointerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        transformStyle: 'preserve-3d',
        zIndex: 10,
      }}
    >
      {position === 'top' && (
        <div style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: 'translateX(-50%)',
        }}>
          {badge}
          {/* Connector — thin solid line touching the block */}
          <div style={{
            width: '2px',
            height: '5px',
            background: bg,
            borderRadius: '0 0 1px 1px',
          }} />
          {/* Tip — small downward-pointing triangle */}
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: `5px solid ${bg}`,
          }} />
        </div>
      )}

      {position === 'bottom' && (
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: 'translateX(-50%)',
        }}>
          {/* Tip — small upward-pointing triangle */}
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderBottom: `5px solid ${bg}`,
          }} />
          {/* Connector */}
          <div style={{
            width: '2px',
            height: '5px',
            background: bg,
            borderRadius: '1px 1px 0 0',
          }} />
          {badge}
        </div>
      )}
    </div>
  )
}

export default Pointer

