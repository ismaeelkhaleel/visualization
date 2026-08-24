type ControlsProps = {
  isPlaying: boolean
  speed: number
  onPlay: () => void
  onReset: () => void
  onSpeedChange: (speed: number) => void
  disabled?: boolean
}

function Controls({
  isPlaying,
  speed,
  onPlay,
  onReset,
  onSpeedChange,
  disabled
}: ControlsProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <button
          onClick={onPlay}
          style={{
            flex: 1,
            height: '34px',
            background: '#252525',
            color: 'white',
            border: '1px solid #363636',
            borderRadius: '7px',
            cursor: 'pointer',
          }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={onReset}
          style={{
            flex: 1,
            height: '34px',
            background: '#252525',
            color: 'white',
            border: '1px solid #363636',
            borderRadius: '7px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '6px',
        }}
      >
        {[0.5, 1, 1.5, 2].map((value) => (
          <button
            key={value}
            onClick={() => onSpeedChange(value)}
            style={{
              flex: 1,
              height: '30px',
              background:
                speed === value ? '#3a3a3a' : '#202020',
              color:
                speed === value ? 'white' : '#777',
              border: '1px solid #303030',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px',
            }}
          >
            {value}×
          </button>
        ))}
      </div>
    </div>
  )
}

export default Controls