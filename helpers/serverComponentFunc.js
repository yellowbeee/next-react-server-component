export function serverComponentEncodeFunc(func) {
  if (typeof func === 'function') {
    return func.toString()
  }
  return func
}

export function serverComponentDecodeFunc(func) {
  try {
    return new Function('return ' + func)()
  } catch (e) {
    return func
  }
}
