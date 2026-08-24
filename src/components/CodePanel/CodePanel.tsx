import { useEffect, useRef } from 'react'
import { theme, surfaces } from '../../theme'
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
        background: `linear-gradient(180deg, #222226 0%, ${theme.colors.panelBackground} 20px, ${theme.colors.panelBackground} 100%)`,
        border: `1px solid ${theme.colors.panelBorder}`,
        borderTop: `1px solid rgba(255,255,255,0.12)`,
        borderBottom: `1px solid rgba(0,0,0,0.8)`,
        borderRadius: '12px',
        boxShadow: [
          `inset 0 1px 1px rgba(255,255,255,0.08)`,
          `0 8px 0 #0a0a0c`, // thick extrusion
          `0 8px 1px rgba(255,255,255,0.05)`, // bottom edge highlight of extrusion
          `0 16px 30px rgba(0,0,0,0.7)`, // deep ambient shadow
        ].join(', '),
        padding: '12px',
        color: theme.colors.textPrimary,
        fontFamily: 'monospace',
        fontSize: '10px',
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
      <div style={{ minWidth: 'max-content', display: 'flex', flexDirection: 'column' }}>
        {code.map((line, index) => {
          const lineNumber = index + 1
          const isActive = activeLine === lineNumber

          return (
            <div
              key={lineNumber}
              ref={isActive ? activeLineRef : null}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2px 8px',
                lineHeight: 1.4,
                background: isActive
                  ? `linear-gradient(90deg, ${surfaces.active.front} 0%, rgba(30,58,138,0.3) 100%)`
                  : 'transparent',
                borderRadius: '4px',
                borderLeft: isActive ? `2px solid ${surfaces.active.border}` : '2px solid transparent',
                transition: `background ${theme.animation.durationShort}s ease, border ${theme.animation.durationShort}s ease`,
              }}
            >
              <div style={{
                width: '20px',
                flexShrink: 0,
                textAlign: 'right',
                color: isActive ? surfaces.active.border : theme.colors.textMuted,
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