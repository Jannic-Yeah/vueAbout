const userAgent = window.navigator.userAgent.toLowerCase()

function getAori() {
  if (/android/i.test(userAgent)) {
    return 'android'
  }
  if (/iPhone|iPod|iPad/i.test(userAgent)) {
    return 'ios'
  }
  if (/Windows\sPhone/i.test(userAgent)) {
    return 'winphone'
  }
}

export const aori = getAori()
export const isQQ = (/qq\//i).test(userAgent)
export const isQZ = (/Qzone\//i).test(userAgent)
export const supportTouch = ('ontouchstart' in window)
export const isWeixin = (/MicroMessenger/i).test(userAgent)
export const getIosVersion = () => parseInt(userAgent.match(/os (\d+)_(\d+)_?(\d+)?/)[1], 10)
export const isMobile = !!userAgent.match(/iPhone|iPod|iPad|android|Windows\sPhone|windows ce|midp|rv:1.2.3.4|ucweb/i)

export function scrollTop(value) {
  if (value === undefined) {
    return window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body).srcollTop
  }
  if (document.documentElement.scrollTop) {
    document.documentElement.scrollTop = value
  } else {
    document.body.scrollTop = value
  }
}

export function getTouchData(e) {
  return e.touches ? e.touches[0] : e
}

export function getVisibleHeight(element) {
  if (element === window) {
    return document.documentElement.clientHeight
  }
  return element.clientHeight
}

export function getScrollHeight(element) {
  if (element === window) {
    return document.documentElement.scrollHeight
  }
  return element.scrollHeight
}

export function getScrollTop(element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
  }
  return element.scrollTop
}

export function getScrollEventTarget(element) {
  let currentNode = element
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}
