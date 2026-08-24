import { forwardRef } from 'react'
import { theme } from '../theme'
import VisualizationRenderer from '../components/VisualizationRenderer/VisualizationRenderer'
import StatusMessage from '../components/StatusMessage/StatusMessage'
import CodePanel from '../components/CodePanel/CodePanel'
import type { VisualizationStep } from '../algorithms/types'

type VideoRendererProps = {
  step: VisualizationStep
  code: string[]
  algorithm: string
  isComplete?: boolean
}

const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>(({ step, code, algorithm, isComplete }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: '360px',
        height: '640px',
        position: 'relative',
        background: theme.colors.videoBackground,
        border: `1px solid ${theme.colors.panelBorder}`,
        borderRadius: '14px',
        boxSizing: 'border-box',
        padding: '32px 24px 28px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        
            {/* 1. VISUALIZATION ZONE - 45% */}
            <div
              style={{
                height: '45%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <VisualizationRenderer step={step} visualizationKey={algorithm} viewportWidth={312} viewportHeight={261} isComplete={isComplete} />
            </div>

            {/* 2. STATUS ZONE - 10% */}
            <div
              style={{
                height: '10%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <StatusMessage message={step.message} />
            </div>

            {/* 3. CODEPANEL ZONE - 45% */}
            <div
              style={{
                height: '45%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <CodePanel code={code} activeLine={step.codeLine} />
            </div>
      </div>
    </div>
  )
})

VideoRenderer.displayName = 'VideoRenderer'
export default VideoRenderer
