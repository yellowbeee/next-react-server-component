import {readFileSync} from 'fs'
import path from 'path'
import {pipeToNodeWritable} from 'react-server-dom-webpack/writer'

async function renderReactTree(res, component) {
  const manifest = readFileSync(path.resolve('./.next/react-client-manifest.json'), 'utf8')

  const moduleMap = JSON.parse(manifest)

  pipeToNodeWritable(component, res, moduleMap)
}

export function sendResponse(req, res, component) {
  renderReactTree(res, component)
}

export function HocComponentResponse(Component) {
  return (req, res) => sendResponse(req, res, <Component request={req} response={res} />)
}
