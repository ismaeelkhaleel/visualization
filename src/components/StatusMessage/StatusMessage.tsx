import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { theme } from '../../theme'

type StatusMessageProps = {
  message: string
}

function StatusMessage({ message }: StatusMessageProps) {
  const messageRef = useRef<HTMLDivElement | null>(null)
  const firstRender = useRef(true)

  useLayoutEffect(() => {
    if (!messageRef.current) return

    if (firstRender.current) {
      firstRender.current = false
      return
    }

    gsap.fromTo(
      messageRef.current,
      { opacity: 0, y: 6, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' },
    )
  }, [message])

  return (
    <div
      style={{
        width: '280px',
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        color: theme.colors.textSecondary,
        fontSize: '12px',
        textAlign: 'center',
        letterSpacing: '0.3px',
      }}
    >
      <div
        ref={messageRef}
        style={{
          width: '100%',
          fontSize: '12px',
          lineHeight: 1.5,
          fontWeight: 600,
          color: theme.colors.textPrimary,
        }}
      >
        {message}
      </div>
    </div>
  )
}

export default StatusMessage