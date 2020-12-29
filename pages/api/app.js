import React from 'react'
import {HocComponentResponse} from '../../server/render'

function App() {
  return (
    <div className="main">
      <img src="/img/logo.svg" style={{width: 200, margin: '60px auto 30px', display: 'block'}} />
      <div style={{textAlign: 'center', fontSize: '26px'}}>next-react-server-component</div>
    </div>
  )
}

export default HocComponentResponse(App)
