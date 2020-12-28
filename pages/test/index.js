import { Suspense, useEffect, createElement } from 'react'
import { createFromFetch } from 'react-server-dom-webpack'

export default function Test() {
  // const DynamicComponent = dynamic(R.readRoot(), { ssr: false })
  const R = createFromFetch(fetch('/api/react'))

  return (
    <div className="container">
      <Suspense fallback={<div>loading..</div>}>{R.readRoot()}</Suspense>
    </div>
  )
}
