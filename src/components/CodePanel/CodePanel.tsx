import { useEffect, useRef } from 'react'
import { theme } from '../../theme'
import { tokenize } from './syntax'

type CodePanelProps = {
  code: string[]
  activeLine?: number
}

function CodePanel({ code, activeLine }: CodePanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const activeLineRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [activeLine])

  return (
    <div
      ref={containerRef}
      className="hide-scrollbar"
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        // 3D panel with visible extrusion
        background: 'linear-gradient(180deg, #1a1a1e 0%, #131316 20px, #131316 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderTop: `1px solid rgba(255,255,255,0.12)`,
        borderBottom: `1px solid rgba(0,0,0,0.8)`,
        borderRadius: '12px',
        boxShadow: [
          `inset 0 1px 1px rgba(255,255,255,0.08)`,
          `0 6px 0 rgba(0,0,0,0.6)`, // glass compatible extrusion
          `0 8px 1px rgba(255,255,255,0.05)`, // bottom edge highlight of extrusion
          `0 16px 30px rgba(0,0,0,0.7)`, // deep ambient shadow
        ].join(', '),
        padding: '12px',
        color: theme.colors.textPrimary,
        fontFamily: 'var(--mono)',
        fontSize: '12px',
        overflowY: 'auto',
        overflowX: 'auto',
      }}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div style={{ minWidth: 'max-content', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Floating Active Highlight Background */}
        {activeLine !== undefined && activeLine > 0 && activeLine <= code.length && (
          <div
            style={{
              position: 'absolute',
              top: `${(activeLine - 1) * 22}px`,
              left: 0,
              right: 0,
              height: '22px',
              background: 'linear-gradient(90deg, rgba(14, 165, 233, 0.2) 0%, rgba(14, 165, 233, 0.05) 100%)',
              borderLeft: '3px solid #38bdf8',
              borderRadius: '4px',
              transition: 'top 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
        )}
        
        {code.map((line, index) => {
          const lineNumber = index + 1
          const isActive = activeLine === lineNumber

          return (
            <div
              key={lineNumber}
              ref={isActive ? activeLineRef : null}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '22px',
                padding: '0 8px',
                borderLeft: '3px solid transparent', // reserve space to match absolute border
                position: 'relative',
                zIndex: 1
              }}
            >
              <div style={{
                width: '20px',
                flexShrink: 0,
                textAlign: 'right',
                color: isActive ? '#38bdf8' : '#505068',
                marginRight: '12px',
                userSelect: 'none',
                fontWeight: isActive ? 700 : 400,
                transition: `color ${theme.animation.durationShort}s ease`,
              }}>
                {lineNumber}
              </div>
              <div style={{ whiteSpace: 'pre' }}>
                {tokenize(line).map((token, i) => {
                  let color = 'inherit'
                  if (token.type !== 'text' && token.type !== 'whitespace') {
                    if (token.type === 'identifier') {
                      color = theme.colors.textPrimary
                    } else {
                      color = theme.colors.syntax[token.type as keyof typeof theme.colors.syntax]
                    }
                  }
                  return (
                    <span key={i} style={{ color }}>{token.value}</span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CodePanel