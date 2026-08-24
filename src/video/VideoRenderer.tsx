import { forwardRef } from 'react'
import { theme } from '../theme'
import VisualizationRenderer from '../components/VisualizationRenderer/VisualizationRenderer'
import StatusMessage from '../components/StatusMessage/StatusMessage'
import CodePanel from '../components/CodePanel/CodePanel'
import type { VisualizationStep } from '../algorithms/types'
import { problems } from '../data/problems'

type VideoRendererProps = {
  step: VisualizationStep
  code: string[]
  algorithm: string
  isComplete?: boolean
}

const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>(({ step, code, algorithm, isComplete }, ref) => {
  const currentProblem = problems.find(p => p.id === algorithm)
  const title = currentProblem ? currentProblem.title : ''
  
  return (
    <div
      ref={ref}
      style={{
        width: '360px',
        height: '640px',
        position: 'relative',
        background: `radial-gradient(ellipse at 50% 40%, #0c0c10 0%, ${theme.colors.videoBackground} 70%)`,
        border: `1px solid ${theme.colors.panelBorder}`,
        borderRadius: '14px',
        boxSizing: 'border-box',
        padding: '16px',
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
        {/* 1. TITLE / EXPLANATION ZONE - 10% */}
        <div style={{
          height: '10%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start', // push up
          paddingTop: '8px',
          color: '#f5f5f5',
          fontSize: '18px',
          fontWeight: 800,
          letterSpacing: '1.5px',
          textAlign: 'center',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}>
          {title}
        </div>

        {/* 2. VISUALIZATION ZONE - 50% */}
        <div style={{
          height: '50%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <VisualizationRenderer step={step} visualizationKey={algorithm} viewportWidth={328} viewportHeight={304} isComplete={isComplete} />
        </div>

        {/* 3. STATUS ZONE - 10% */}
        <div style={{
          height: '10%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <StatusMessage message={step.message} />
        </div>

        {/* 4. CODEPANEL ZONE - 30% */}
        <div style={{
          height: '30%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <CodePanel code={code} activeLine={step.codeLine} />
        </div>
      </div>
    </div>
  )
})

VideoRenderer.displayName = 'VideoRenderer'
export default VideoRenderer
