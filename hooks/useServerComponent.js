import {Suspense, useEffect, useState, unstable_getCacheForType, unstable_useCacheRefresh} from 'react'
import {createFromFetch} from 'react-server-dom-webpack'
import {serverComponentDecodeFunc} from '../helpers/serverComponentFunc'

function waitServer(action) {
  return new Promise(resolve => {
    const handle = () => {
      requestAnimationFrame(() => {
        action(resolve, handle)
      })
    }
    handle()
  })
}

function waitServerComponent(response) {
  return waitServer(async (resolve, next) => {
    if (!response._chunks.size) {
      next()
    } else {
      const d = response.readRoot()

      if (typeof d.type === 'string') resolve(d)
      else {
        resolve(
          waitServer((resolve1, next1) => {
            if (response._chunks.get(0)._status === 3) {
              setTimeout(() => {
                const M = d.type._init(d.type._payload).default
                for (let prop in d.props) {
                  if (/^on[A-Z]/.test(prop)) {
                    d.props[prop] = serverComponentDecodeFunc(d.props[prop])
                  }
                }
                resolve1(props => {
                  return <M {...d.props} {...props} />
                })
              }, 50)
              // next1()
            } else {
              next1()
            }
          }),
        )
      }
    }
  })
}

export default function useServerComponent(url) {
  const [A, AAction] = useState(null)

  const fetchComponent = async () => {
    const R = createFromFetch(fetch(url))
    const D = await waitServerComponent(R)
    AAction(prev => D)
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchComponent()
    }
  }, [])

  const comp = A ? A : () => <></>

  return [comp, fetchComponent]
}
