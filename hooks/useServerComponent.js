import { useEffect, useState } from 'react'
import { createFromFetch } from 'react-server-dom-webpack'

export default function useServerComponent(url) {
  const [A, AAction] = useState(null)

  useEffect(() => {
    const R = createFromFetch(fetch(url))
    setTimeout(() => {
      AAction(R.readRoot())
    }, 100)
  }, [])

  return A
}
