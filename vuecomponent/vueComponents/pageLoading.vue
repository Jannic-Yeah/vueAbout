<template lang="pug">
.page-loading-mask(v-show="pageLoading")
  .page-loading-box
    .loading.before
    .loading
    .loading.after
</template>

<script>
export default {
  name: 'pageLoading',
  props: {
    pageLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="stylus">
@import '../stylus/base'

bubbleAnimation(size)
  width size
  height size
  border-radius 50%
  animation pageloadingplay 1.8s ease-in-out infinite

.page-loading-mask
  z-index 9999
  fullPageMask()

.page-loading-box
  z-index 10000
  centerBox(110spx, 32spx)
  webkitBoxCenter()
  .loading
    bubbleAnimation(32spx)
  .loading.before
    margin-right 8spx
    animation-delay -0.16s
  .loading.after
    margin-left 8spx
    animation-delay 0.16s

@keyframes pageloadingplay
  0%
  80%
  100%
    box-shadow 0 32spx 0 -32spx #fff
  40%
    box-shadow 0 32spx 0 0 #fff
</style>
