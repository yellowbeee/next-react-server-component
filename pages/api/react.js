const path = require('path')
const { readFileSync } = require('fs')
const React = require('react')
const { pipeToNodeWritable } = require('react-server-dom-webpack/writer');
const ReactApp = require('../server/App').default;


async function renderReactTree(res, props) {
  const manifest = readFileSync(
    path.resolve('./.next/react-client-manifest.json'),
    'utf8'
  );
  console.log(manifest)
  const moduleMap = JSON.parse(manifest);
  pipeToNodeWritable(React.createElement(ReactApp, props), res, moduleMap);
}

function sendResponse(req, res, redirectToId) {
  renderReactTree(res, {
    selectedId: 1,
  });
}

export default function handler(req, res) {
  sendResponse(req, res, null);
}