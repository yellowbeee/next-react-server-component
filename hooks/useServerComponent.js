import {useEffect, useState} from 'react'
import {createFromFetch} from 'react-server-dom-webpack'

function waitServerComponent(response) {
  return new Promise(resolve => {
    const action = () => {
      requestAnimationFrame(() => {
        if (!response._chunks.size) action()
        else resolve(response)
      })
    }
    action()
  })
}

export default function useServerComponent(url) {
  const [A, AAction] = useState(null)

  const fetchComponent = async () => {
    const R = createFromFetch(fetch(url))
    const D = await waitServerComponent(R)
    AAction(D.readRoot())
  }
  useEffect(() => {
    fetchComponent()
  }, [])

  return A
}
