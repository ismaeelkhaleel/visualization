import { forwardRef } from 'react'
import VisualizationRenderer from '../components/VisualizationRenderer/VisualizationRenderer'
import CodePanel from '../components/CodePanel/CodePanel'
import type { VisualizationStep } from '../algorithms/types'
import { problems } from '../data/problems'

type VideoRendererProps = {
  step: VisualizationStep
  code: string[]
  algorithm: string
  isComplete: boolean
}

const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>(({ step, code, algorithm, isComplete }, ref) => {
  const currentProblem = problems.find(p => p.id === algorithm)
  const title = currentProblem ? currentProblem.title : ''
  const visualization = currentProblem?.visualization
  
  return (
    <div
      ref={ref}
      style={{
        width: '360px',
        height: '640px',
        position: 'relative',
        background: '#000000',
        border: '1px solid rgba(255,255,255,0.06)',
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
          alignItems: 'flex-start',
          paddingTop: '8px',
          color: '#f5f5f5',
          fontSize: '18px',
          fontWeight: 800,
          letterSpacing: '1.5px',
          textAlign: 'center',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}>
          <span>{visualization?.title ?? title}</span>
        </div>

        {/* 2. VISUALIZATION ZONE - 50% */}
        <div style={{
          height: '50%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflow: 'hidden',
          flexShrink: 0,
          paddingTop: '4px',
        }}>
          <VisualizationRenderer step={step} visualizationKey={algorithm} viewportWidth={328} viewportHeight={250} isComplete={isComplete} speed={1} isJump={false} />
        </div>

        {/* 4. CODEPANEL ZONE - 40% */}
        <div style={{
          height: '40%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
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
