import type { VisualizationStep, MatrixCell } from './types'
export function numberOfIslands(gridStrs: string[]): VisualizationStep[] {
  console.log(gridStrs);
  const steps: VisualizationStep[] = []
  const grid = ["11110", "11010", "11000", "00000"].map(row => row.split(''))
  const rows = grid.length, cols = grid[0].length
  const cells: MatrixCell[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ row: r, col: c, value: grid[r][c] })
    }
  }
  const visited: {row: number, col: number}[] = []
  
  steps.push({ codeLine: 3, message: 'Start scanning grid', audioEvent: 'pointer', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited] } }] })
  let count = 0
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      steps.push({ codeLine: 6, message: `Check cell (${i},${j})`, audioEvent: 'compare', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited], pointers: [{label:'curr', row:i, col:j}] } }] })
      if (grid[i][j] === '1') {
        steps.push({ codeLine: 7, message: 'Found land! Start DFS', audioEvent: 'match', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited], pointers: [{label:'curr', row:i, col:j}] } }] })
        
        const dfsQueue = [{r: i, c: j}]
        while (dfsQueue.length > 0) {
          const {r, c} = dfsQueue.pop()!
          if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') continue;
          
          grid[r][c] = '0'
          const cell = cells.find(cl => cl.row === r && cl.col === c)!
          cell.value = '0'
          visited.push({row: r, col: c})
          
          steps.push({ codeLine: 16, message: `Visit (${r},${c}) and mark as water`, audioEvent: 'visit', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited], pointers: [{label:'dfs', row:r, col:c}] } }] })
          
          dfsQueue.push({r: r + 1, c: c})
          dfsQueue.push({r: r - 1, c: c})
          dfsQueue.push({r: r, c: c + 1})
          dfsQueue.push({r: r, c: c - 1})
        }
        
        count++
        steps.push({ codeLine: 8, message: `Island ${count} fully explored`, audioEvent: 'success', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited] } }] })
      }
    }
  }
  
  steps.push({ codeLine: 11, message: `Total islands: ${count}`, audioEvent: 'success', elements: [{ type: 'matrix', data: { rows, cols, cells: [...cells], visited: [...visited] } }] })
  return steps
}