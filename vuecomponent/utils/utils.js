import map from 'lodash/map'
import find from 'lodash/find'
import fill from 'lodash/fill'
import assign from 'lodash/assign'
import forEach from 'lodash/forEach'

function randomAZ(length) {
  let result = ''
  const aCode = 'a'.charCodeAt(0)
  for (let i = 0; i < length; i++) {
    result += String.fromCharCode(Math.floor(Math.random() * 26) + aCode)
  }
  return result
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
export const type = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()

export function assert(condition, msg) {
  if (!condition) throw new Error(`[yyvip] ${msg}`)
}

export function serialize(params, obj, scope) {
  forEach(obj, (value, key) => {
    if (scope) key = scope
    if (!scope && type(obj) === 'array') {
      params.add(value.name, value.value)
    } else if (type(value) === 'array') {
      serialize(params, value, key)
    } else {
      params.add(key, value)
    }
  })
}

export function randomString() {
  return randomAZ(5) + new Date().getTime()
}

function splitString2Object(str) {
  const params = {}
  if (str) {
    forEach(str.split('&'), (item) => {
      const [key, value] = item.split('=')
      if (key !== '') {
        params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : ''
      }
    })
  }
  return params
}

const getParams = (getType, startTag, endTag) => (str) => {
  let paramString
  if (str === undefined) {
    paramString = window.location[getType].substring(1)
  } else {
    const url = type(str) === 'string' ? str : str.toString()
    paramString = getChildString(url, startTag, endTag, true)
  }
  return splitString2Object(paramString)
}

export function getChildString(str, startTag, endTag, strictStart, strictEnd) {
  if (type(str) !== 'string') return ''
  const startIndex = str.indexOf(startTag) + 1
  const endIndex = endTag === false || str.indexOf(endTag) === -1 ? str.length : str.indexOf(endTag)
  if (strictStart && !startIndex) return ''
  if (strictEnd && str.indexOf(endTag) === -1) return ''
  return str.slice(startIndex, endIndex)
}

export const getUrlParams = getParams('search', '?', '#')
export const getHashParams = getParams('hash', '#', false)

/*
  You may not set title after webview loaded,
  if you want to do this, you may need to add a iframe to let page onload
*/
export function setWebviewTitle(title) {
  function onload() {
    setTimeout(function() {
      $iframe.removeEventListener('load', onload)
      document.body.removeChild($iframe)
    }, 0)
  }

  document.title = title
  const $iframe = document.createElement('iframe')
  $iframe.style.display = 'none'
  $iframe.addEventListener('load', onload)
  $iframe.src = '//hd.vip.yy.com/favicon.ico'
  document.body.appendChild($iframe)
}

export function changeOneElementInArray(target, query, params) {
  const item = find(target, query)
  item && assign(item, params)
  return target
}

function resolveFunction(type) {
  return function(func, ...rest) {
    arguments[type] && func(...rest)
  }
}

export const checkParams = resolveFunction(1)
export const checkFunction = resolveFunction(0)

export function getContentFromError(error) {
  if (typeof error === 'object') {
    return error.message || error.msg || error.statusMsg || error.statusText || error.desc || '服务器加载失败'
  }
  return error
}

export function updateFunctionFromObject(options, key, updatedFunc) {
  let func = options[key]
  options[key] = function() {
    updatedFunc(...arguments)
    func && func.apply(null, arguments)
  }
}

export function replaceFunctionFromObject(options, key, replacedFunc) {
  let func = options[key]
  options[key] = replacedFunc(func)
}

export function asyncLoadScript(url, cb, onError) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  if (cb) {
    if (script.readyState) {
      script.onreadystatechange = () => {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null
          cb()
        }
      }
    } else {
      script.onload = () => cb()
    }
  }
  if (onError) {
    script.onerror = () => onError()
  }
  script.src = url
  document.body.appendChild(script)
}

// (1, 7, 8) => 2
// (7, 1, 8) => -2
// (3, 1, 8) => 2
// (1, 3, 8) => -2
export function calCircleSub(n1, n2, total) {
  const diff = n1 - n2
  if (!total || !diff) return diff
  const absDiff = Math.abs(diff)
  if (absDiff * 2 === total) return absDiff
  if (absDiff * 2 > total) return diff > 0 ? (diff - total) : (diff + total)
  return diff
}

// (3, 7, 12) => 8
// (7, 3, 12) => 4
export function calCircleSub2(n1, n2, total) {
  return (n1 - n2) > 0 ? (n1 - n2) : (n1 - n2 + total)
}

// (1, 7, 12) => 8
// (9, 7, 12) => 4
export function calCircleAdd(n1, n2, total) {
  return (n1 + n2) > total ? (n1 + n2 - total) : (n1 + n2)
}

export function functionOnce(fn) {
  let hasDone = false
  return (...args) => {
    if (!hasDone) {
      hasDone = true
      return fn(...args)
    }
  }
}

export function delayExec(fn, time) {
  let timer
  return function() {
    timer && clearTimeout(timer)
    timer = setTimeout(fn, time)
  }
}

export function firstUpperCase(str) {
  if (type(str) !== 'string') return str
  return str.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => ($1.toUpperCase() + $2))
}

export function fillArray(array, length, value) {
  return type(array) === 'array' && array.length < length ? array.concat(fill(Array(length - array.length), value)) : array
}

export function forEachOrder(map, list, cb) {
  if (list) {
    forEach(list, item => cb(map[item], item))
  } else {
    forEach(map, cb)
  }
}

export function mapOrder(obj, list, cb) {
  if (list) {
    return map(list, item => cb(obj[item], item))
  }
  return map(obj, cb)
}

export function compose() {
  const _len = arguments.length
  const funcs = Array(_len)
  for (let _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key]
  }

  if (funcs.length === 0) {
    return function(arg) {
      return arg
    }
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce(function(a, b) {
    return function() {
      return a(b.apply(undefined, arguments))
    }
  })
}

export function getIn(obj, keys) {
  if (type(obj) !== 'object' || type(keys) !== 'array' || !keys.length) return obj
  let result = obj
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let value = result[key]
    if (value === undefined) return result
    if (typeof value !== 'object' || value === null) return value
    result = value
  }
  return result
}
