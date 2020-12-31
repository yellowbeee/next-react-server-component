import path from 'path'
import url from 'url'

var MODULE_REFERENCE = Symbol.for('react.module.reference')
var proxyHandlers = {
  get: function (target, name, receiver) {
    switch (name) {
      // These names are read by the Flight runtime if you end up using the exports object.
      case '$$typeof':
        // These names are a little too common. We should probably have a way to
        // have the Flight runtime extract the inner target instead.
        return target.$$typeof

      case 'filepath':
        return target.filepath

      case 'name':
        return target.name
      // We need to special case this because createElement reads it if we pass this
      // reference.

      case 'defaultProps':
        return undefined

      case '__esModule':
        // Something is conditionally checking which export to use. We'll pretend to be
        // an ESM compat module but then we'll check again on the client.
        target.default = {
          $$typeof: MODULE_REFERENCE,
          filepath: target.filepath,
          // This a placeholder value that tells the client to conditionally use the
          // whole object or just the default export.
          name: '',
        }
        return true
    }

    var cachedReference = target[name]

    if (!cachedReference) {
      cachedReference = target[name] = {
        $$typeof: MODULE_REFERENCE,
        filepath: target.filepath,
        name: name,
      }
    }

    return cachedReference
  },
  set: function () {
    throw new Error('Cannot assign to a client module from a server module.')
  },
}

function HocClient(Url) {
  const Path = path.join(process.cwd(), Url)
  var moduleId = url.pathToFileURL(Path).href
  var moduleReference = {
    $$typeof: MODULE_REFERENCE,
    filepath: moduleId,
    name: '*', // Represents the whole object instead of a particular import.
  }

  return new Proxy(moduleReference, proxyHandlers)
}

export default HocClient
