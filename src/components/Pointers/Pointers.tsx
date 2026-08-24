import Pointer from '../Pointer/Pointer'

export type PointerConfig = {
  label: string
  x: number
  y: number
  z?: number
  position: 'top' | 'bottom' | 'left' | 'right'
}

type PointersProps = {
  pointers: PointerConfig[]
}

function Pointers({ pointers }: PointersProps) {
  const grouped: Record<string, PointerConfig[]> = {}
  pointers.forEach(p => {
    const key = `${p.x}-${p.y}-${p.position}`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(p)
  })

  return (
    <>
      {Object.values(grouped).map((group) => {
        return group.map((pointer, i) => {
          return (
            <Pointer
              key={pointer.label}
              label={pointer.label}
              targetX={pointer.x}
              targetY={pointer.y}
              targetZ={pointer.z}
              position={pointer.position}
            />
          )
        })
      })}
    </>
  )
}

export default Pointers