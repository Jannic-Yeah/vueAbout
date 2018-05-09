<template lang="pug">
.b__bottom-layer(v-show="maskShow", :class="bottomLayerClass" @click.self.stop.prevent="bindClickMask($event)")
  transition(name="translate-bottom" @before-enter="syncMaskShow" @after-leave="syncMaskShow")
    .__box(v-show="show")
      slot
</template>

<script>
export default {
  name: 'bottomLayer',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    onClickMask: {
      type: Function,
      required: false
    },
    hideOnClickMask: {
      type: Boolean,
      required: false,
      default: true
    },
    hideBottomLayer: {
      type: Function,
      required: false
    },
    bottomLayerClass: {
      type: Object,
      required: false,
      default: () => ({ 'bottom-layer--default': true })
    }
  },
  data() {
    return {
      maskShow: this.show
    }
  },
  methods: {
    syncMaskShow() {
      this.maskShow = this.show
    },
    bindClickMask(e) {
      this.onClickMask && this.onClickMask(e)
      this.hideOnClickMask && this.hideBottomLayer && this.hideBottomLayer(e)
    }
  }
}
</script>

<style lang="stylus">
@import '../stylus/base'
.bottom-layer
  fontDpr(14)
  z-index 9799
  fullPageMask()
  color color-main
  text-align center
  &__box
    z-index 9800
    bottomPageLayer()

.bottom-layer--default
  .bottom-layer
    &__box
      background #fff

.translate-bottom
  &-enter-active,
  &-leave-active 
    transition transform 0.3s
  &-enter, 
  &-leave-to 
    transform translateY(100%)
</style>
