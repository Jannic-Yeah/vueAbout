<template lang="pug">
transition(:name="transitionName")
  .toast(v-if="show", :class="toastClass") {{content}}
</template>

<script>
export default {
  name: 'toast',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    content: {
      type: String,
      required: false,
      default: '服务器加载失败'
    },
    toastClass: {
      type: Object,
      required: false,
      default: () => ({ 'toast--default': true })
    },
    transitionName: {
      type: String,
      required: false,
      default: 'toast-fade'
    }
  }
}
</script>

<style lang="stylus">
@import '../stylus/base'
.toast
  left 20%
  width 60%
  bottom 10%
  z-index 10000
  position fixed
  padding 20spx 0
  text-align center
  fontDpr(12)
  &--default
    color #fff
    border-radius 6px
    background rgba(0, 0, 0, 0.8)

.toast-fade
  &-enter-active,
  &-leave-active
    transition opacity 0.5s, transform 0.3s
  &-enter,
  &-leave-to
    opacity 0
    transform translateY(100%)
</style>
