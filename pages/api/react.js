import path from 'path'
import { readFileSync } from 'fs'
import React from 'react'
import { pipeToNodeWritable } from 'react-server-dom-webpack/writer'
import ReactApp from '../../server/components/App'

async function renderReactTree(res, props) {
  const manifest = readFileSync(
    path.resolve('./.next/react-client-manifest.json'),
    'utf8'
  )

  const moduleMap = JSON.parse(manifest)
  pipeToNodeWritable(React.createElement(ReactApp, props), res, moduleMap)
}

function sendResponse(req, res, redirectToId) {
  renderReactTree(res, {
    selectedId: 1,
  })
}

export default function handler(req, res) {
  sendResponse(req, res, null)
}
