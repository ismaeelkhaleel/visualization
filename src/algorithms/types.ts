import type { AudioEventType } from '../audio/audioTypes'

export type ArrayItem = {
  id: number
  value: number | string
}

export type Pointer = {
  label: string
  index: number
  position: 'top' | 'bottom'
}

export type ArrayVisualizationData = {
  values: ArrayItem[]
  pointers?: Pointer[]
  highlights?: number[]
  secondaryHighlights?: number[]
  disabledIndices?: number[]
  metrics?: { label: string; value: string | number; tone?: 'neutral' | 'active' | 'compare' | 'success' | 'warning' }[]
  layout?: 'bars' | 'cells' | 'intervals'
  action?: string
  swap?: {
    from: number
    to: number
  }
}

export type VisualizationElement =
  | { type: 'array'; data: ArrayVisualizationData }

export type VisualizationStep = {
  elements: VisualizationElement[]
  codeLine: number
  message: string
  audioEvent?: AudioEventType
}
