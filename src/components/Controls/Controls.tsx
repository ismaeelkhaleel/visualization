
type ControlsProps = {
  isPlaying: boolean
  speed: number
  currentStep: number
  totalSteps: number
  onPlay: () => void
  onReset: () => void
  onStepForward: () => void
  onStepBackward: () => void
  onSpeedChange: (speed: number) => void
  disabled?: boolean
}

const btnBase: React.CSSProperties = {
  height: '36px',
  background: 'rgba(255,255,255,0.04)',
  color: '#ccc',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.1s ease',
}

function Controls({
  isPlaying,
  speed,
  currentStep,
  totalSteps,
  onPlay,
  onReset,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  disabled
}: ControlsProps) {
  const isFirst = currentStep <= 0
  const isLast = currentStep >= totalSteps - 1

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto'
      }}
    >
      {/* Playback Controls Row */}
      <div style={{ display: 'flex', gap: '6px' }}>
        <button
          onClick={onReset}
          title="Reset" aria-label="Reset"
          style={{
            ...btnBase,
            width: '36px',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
        >
          ⏮
        </button>
        <button
          onClick={onStepBackward}
          disabled={isFirst}
          title="Previous Step" aria-label="Previous Step"
          style={{
            ...btnBase,
            width: '36px',
            flexShrink: 0,
            opacity: isFirst ? 0.3 : 1,
            cursor: isFirst ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={e => { if (!isFirst) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
        >
          ◀
        </button>
        <button
          onClick={onPlay}
          title={isPlaying ? 'Pause' : 'Play'}
          style={{
            ...btnBase,
            flex: 1,
            background: isPlaying ? 'rgba(239, 68, 68, 0.15)' : 'rgba(14, 165, 233, 0.15)',
            borderColor: isPlaying ? 'rgba(239, 68, 68, 0.4)' : 'rgba(14, 165, 233, 0.4)',
            color: isPlaying ? '#f87171' : '#38bdf8',
            fontWeight: 700,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = isPlaying ? 'rgba(239, 68, 68, 0.25)' : 'rgba(14, 165, 233, 0.25)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = isPlaying ? 'rgba(239, 68, 68, 0.15)' : 'rgba(14, 165, 233, 0.15)'
          }}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          onClick={onStepForward}
          disabled={isLast}
          title="Next Step" aria-label="Next Step"
          style={{
            ...btnBase,
            width: '36px',
            flexShrink: 0,
            opacity: isLast ? 0.3 : 1,
            cursor: isLast ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={e => { if (!isLast) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
        >
          ▶
        </button>
      </div>

      {/* Speed Controls Row */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {[0.5, 1, 1.5, 2].map((value) => {
          const isActive = speed === value
          return (
            <button
              key={value}
              onClick={() => onSpeedChange(value)}
              style={{
                ...btnBase,
                flex: 1,
                height: '30px',
                fontSize: '11px',
                background: isActive ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.03)',
                borderColor: isActive ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255,255,255,0.08)',
                color: isActive ? '#38bdf8' : '#666',
                fontWeight: isActive ? 700 : 500,
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              {value}×
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Controls
