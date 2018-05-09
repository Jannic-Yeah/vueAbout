const documentElement = document.documentElement

function getMetaElement() {
  return document.querySelector('meta[name="viewport"]')
}

export function getScale(defaultScale = 1) {
  const metaElement = getMetaElement()
  if (metaElement) {
    const match = metaElement.getAttribute('content').match(/initial-scale=([\d.]+)/)
    if (match) return parseFloat(match[1])
  }
  return defaultScale
}

export function getDpr(defaultDpr = 1) {
  const scale = getScale(0)
  return scale ? parseInt(1 / scale) : defaultDpr
}

export function getRem() {
  const dpr = getDpr()
  let width = documentElement.getBoundingClientRect().width
  width / dpr > 540 && (width = 540 * dpr)
  return width / 10
}

export function rem2px(num) {
  return parseFloat(num) * getRem()
}

export function px2rem(num) {
  return parseFloat(num) / getRem()
}
