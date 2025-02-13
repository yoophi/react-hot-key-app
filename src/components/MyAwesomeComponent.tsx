import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export function MyAwesomeComponent() {
  const [count, setCount] = useState(0)

  useHotkeys('up', () => setCount(prevCount =>
    prevCount + 1
  ))
  useHotkeys('down', () => setCount(prevCount =>
    prevCount - 1
  ))
  
  return (
    <span>{count}</span>
  )
}

