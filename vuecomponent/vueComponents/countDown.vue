<template lang="pug">
.count-down(@click.stop.prevent="bindClick", :class="classObj") {{ showText }}
</template>

<script>
import assign from 'lodash/assign'

const noop = () => {}

export default {
  name: 'countDown',
  props: {
    clickable: {
      type: Boolean,
      required: true
    },
    onStart: {
      type: Function,
      required: false,
      default: noop
    },
    activeText: {
      type: String,
      required: false,
      default: '获取验证码'
    },
    disabledText: {
      type: String,
      required: false,
      default: '重新发送'
    },
    maxTime: {
      type: Number,
      required: false,
      default: 60
    },
    onNoneClickable: {
      type: Function,
      required: false,
      default: noop
    },
    onDisabled: {
      type: Function,
      required: false,
      default: noop
    },
    styleClass: {
      type: Object,
      required: false,
      default: () => ({ 'count-down--default': true })
    }
  },
  data() {
    return {
      time: 0,
      timer: null,
      disabled: false
    }
  },
  methods: {
    bindClick(e) {
      if (!this.clickable) {
        this.onNoneClickable(e)
      } else if (this.disabled) {
        this.onDisabled(e)
      } else {
        this.onStart(e)
        this.disabled = true
        this.timer = setInterval(() => {
          this.time++
          this.time >= this.maxTime && this.reset()
        }, 1000)
      }
    },
    reset() {
      this.time = 0
      this.disabled = false
      clearInterval(this.timer)
    }
  },
  computed: {
    showText() {
      return this.disabled ? (this.disabledText ? `${this.disabledText}(${this.maxTime - this.time}S)` : `${this.maxTime - this.time}S`) : this.activeText
    },
    classObj() {
      return assign({
        active: !this.disabled,
        disabled: this.disabled,
        unclickable: !this.clickable
      }, this.styleClass)
    }
  }
}
</script>

<style lang="stylus">
@import '../stylus/base'

.count-down
  fontDpr(14)
  &--default
    color #fff
    width 240px
    preHeight(80px)
    text-align center
    &.active
      background color-blue
    &.disabled
      background color-grey
</style>
