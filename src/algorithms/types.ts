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
  action?: string
  swap?: {
    from: number
    to: number
  }
}

export type StackItem = {
  id: number
  value: string | number
}

export type StackVisualizationData = {
  items: StackItem[]
  topLabel?: boolean
  highlights?: number[]
  action?: string
  currentToken?: string | number
}

export type LinkedListNode = {
  id: string
  value: string | number
  nextId: string | null
}

export type LinkedListPointer = {
  label: string
  nodeId: string | null
}

export type LinkedListVisualizationData = {
  nodes: LinkedListNode[]
  headId: string | null
  pointers?: LinkedListPointer[]
  highlights?: string[]
}

export type TreeNode = {
  id: string
  value: string | number
  leftId: string | null
  rightId: string | null
}

export type TreePointer = {
  label: string
  nodeId: string | null
}

export type TreeVisualizationData = {
  nodes: TreeNode[]
  rootId: string | null
  pointers?: TreePointer[]
  highlights?: string[]
}

export type GraphNode = {
  id: string
  value: string | number
}

export type GraphEdge = {
  from: string
  to: string
  directed?: boolean
}

export type GraphPointer = {
  label: string
  nodeId: string | null
}

export type GraphVisualizationData = {
  nodes: GraphNode[]
  edges: GraphEdge[]
  pointers?: GraphPointer[]
  highlights?: string[]
  visited?: string[]
}


export type MatrixCell = {
  row: number
  col: number
  value: string | number
}

export type MatrixPointer = {
  label: string
  row: number
  col: number
}

export type MatrixVisualizationData = {
  rows: number
  cols: number
  cells: MatrixCell[]
  pointers?: MatrixPointer[]
  highlights?: { row: number; col: number }[]
  visited?: { row: number; col: number }[]
}

export type VisualizationElement =
  | { type: 'array'; data: ArrayVisualizationData }
  | { type: 'stack'; data: StackVisualizationData }
  | { type: 'linkedList'; data: LinkedListVisualizationData }
  | { type: 'tree'; data: TreeVisualizationData }
  | { type: 'graph'; data: GraphVisualizationData }
  | { type: 'matrix'; data: MatrixVisualizationData }

export type VisualizationStep = {
  elements: VisualizationElement[]
  codeLine: number
  message: string
  audioEvent?: AudioEventType
}