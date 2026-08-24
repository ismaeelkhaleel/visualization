import type { VisualizationStep, VisualizationElement } from '../../algorithms/types'
import ArrayComponent from '../Array/Array'
import StackComponent from '../Stack/Stack'
import LinkedListComponent from '../LinkedList/LinkedList'
import TreeComponent from '../Tree/Tree'
import GraphComponent from '../Graph/Graph'
import { Matrix } from '../Matrix/Matrix'

type VisualizationRendererProps = {
  step: VisualizationStep
  visualizationKey?: string
  viewportWidth?: number
  viewportHeight?: number
  isComplete?: boolean
}

function renderElement(element: VisualizationElement, key: string, width?: number, height?: number, isComplete?: boolean) {
  switch (element.type) {
    case 'array':
      return <ArrayComponent {...element.data} visualizationKey={key} viewportWidth={width} viewportHeight={height} isComplete={isComplete} />
    case 'stack':
      return <StackComponent {...element.data} visualizationKey={key} viewportWidth={width} viewportHeight={height} isComplete={isComplete} />
    case 'linkedList':
      return <LinkedListComponent {...element.data} visualizationKey={key} viewportWidth={width} viewportHeight={height} isComplete={isComplete} />
    case 'tree':
      return <TreeComponent {...element.data} visualizationKey={key} viewportWidth={width} viewportHeight={height} isComplete={isComplete} />
    case 'graph':
      return <GraphComponent {...element.data} visualizationKey={key} viewportWidth={width} viewportHeight={height} isComplete={isComplete} />
    case 'matrix':
      return <Matrix data={element.data} isComplete={isComplete} viewportWidth={width} viewportHeight={height} />
    default: {
      const _exhaustiveCheck: never = element
      console.warn(`No renderer registered for visualization type`, _exhaustiveCheck)
      return null
    }
  }
}

function VisualizationRenderer({ step, visualizationKey, viewportWidth, viewportHeight, isComplete }: VisualizationRendererProps) {
  return (
    <>
      {step.elements.map((element, index) => (
        <div key={index} style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {renderElement(element, `${visualizationKey}-element-${index}`, viewportWidth, viewportHeight, isComplete)}
        </div>
      ))}
    </>
  )
}

export default VisualizationRenderer
