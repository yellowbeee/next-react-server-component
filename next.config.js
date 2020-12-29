const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin')

module.exports = {
  webpack: (config, {dev, isServer}) => {
    if (!isServer) {
      config.plugins.push(new ReactServerWebpackPlugin({isServer: false}))
    }
    config.resolve.extensions.push('.scss')
    return config
  },
  experimental: {
    reactMode: 'concurrent',
  },
}
