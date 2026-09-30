import type { VisualizationStep, VisualizationElement } from '../../algorithms/types'
import ArrayComponent from '../Array/Array'

type VisualizationRendererProps = {
  step: VisualizationStep
  visualizationKey?: string
  viewportWidth?: number
  viewportHeight?: number
  isComplete?: boolean
  speed?: number
  isJump?: boolean
}

function renderElement(element: VisualizationElement, key: string, width?: number, height?: number, isComplete?: boolean, speed?: number, isJump?: boolean) {
  if (element.type === 'array') {
    return <ArrayComponent {...element.data} visualizationKey={key} viewportWidth={width} viewportHeight={height} isComplete={isComplete} speed={speed} isJump={isJump} />
  }
  return null
}

function VisualizationRenderer({ step, visualizationKey, viewportWidth, viewportHeight, isComplete, speed, isJump }: VisualizationRendererProps) {
  const elements = step.elements
  const count = elements.length
  const heightPerElement = count > 0 && viewportHeight ? viewportHeight / count : viewportHeight

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }}>
      {elements.map((element, index) => (
        <div key={index} style={{
          width: '100%',
          height: `${100 / count}%`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {renderElement(element, `${visualizationKey}-element-${index}`, viewportWidth, heightPerElement, isComplete, speed, isJump)}
        </div>
      ))}
    </div>
  )
}

export default VisualizationRenderer
