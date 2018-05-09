<template lang="pug">
.infinite-scroll(:is="tag", ref="scroll")
  slot
</template>

<script>
import { getDpr } from '../flexible/utils'
import { delayExec } from '../utils/utils'
import { getVisibleHeight, getScrollHeight, getScrollTop, getScrollEventTarget } from '../utils/checkBrowser'

export default {
  name: 'infiniteScroll',
  props: {
    distance: {
      type: Number,
      required: false,
      default: 20 * getDpr()
    },
    isScroll: {
      type: Boolean,
      required: false,
      default: true
    },
    onLoadMore: {
      type: Function,
      required: false
    },
    loading: {
      type: Boolean,
      required: false
    },
    tag: {
      type: String,
      required: false,
      default: 'div'
    }
  },
  data() {
    return {
      element: null,
      onScroll: null
    }
  },
  mounted() {
    this.element = getScrollEventTarget(this.$refs.scroll)
    this.onScroll = delayExec(() => {
      if (getScrollHeight(this.element) - getVisibleHeight(this.element) - getScrollTop(this.element) < this.distance && !this.loading && this.isScroll) {
        this.onLoadMore && this.onLoadMore(this.element)
      }
    }, 100)
    this.element.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    this.destroyScrollEvent()
  },
  methods: {
    // spa + keep-alive: must do this by yourself
    destroyScrollEvent() {
      if (this.element && this.onScroll) this.element.removeEventListener('scroll', this.onScroll)
    }
  }
}
</script>
