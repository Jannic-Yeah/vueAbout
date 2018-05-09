<template lang="pug">
bottom-layer(:show="show", :hideBottomLayer="hideBottomLayer", :bottomLayerClass="bottomLayerClass", :onClickMask="onClickMask", :hideOnClickMask="hideOnClickMask")
  .b__bottom-select(v-bind:class="bottomSelectClass")
    slot
    ul.__box
      li.__item(v-for="(item, index) in selectItems", @click.stop.prevent="bindClickItem(index, $event)", :class="{active: index === activeIndex}") {{ item | getDisplayValue }}
    .__cancel(v-if="showCancle",  @click.stop.prevent="bindClickCancel($event)") {{ cancelText }}
</template>

<script>
import bottomLayer from 'yyvip-vue/bottomLayer'

export default {
  name: 'bottomSelect',
  components: {
    bottomLayer
  },
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
      required: false
    },
    showCancle: {
      type: Boolean,
      required: false,
      default: true
    },
    cancelText: {
      type: String,
      required: false,
      default: '取消'
    },
    activeIndex: {
      type: Number,
      required: false
    },
    selectItems: {
      type: Array,
      required: true
    },
    onClickItem: {
      type: Function,
      required: false
    },
    hideOnClickItem: {
      type: Boolean,
      required: false,
      default: true
    },
    onClickCancel: {
      type: Function,
      required: false
    },
    hideOnClickCancel: {
      type: Boolean,
      required: false,
      default: true
    },
    bottomSelectClass: {
      type: Object,
      required: false,
      default: () => ({ 'bottom-select--default': true })
    }
  },
  filters: {
    getDisplayValue(input) {
      return typeof input !== 'object' ? input : (input.displayValue || input.text || input.value || input.val)
    }
  },
  methods: {
    bindClickItem(index, e) {
      this.onClickItem && this.onClickItem(index, e)
      this.hideOnClickItem && this.hideBottomLayer && this.hideBottomLayer(e)
    },
    bindClickCancel(e) {
      this.onClickCancel && this.onClickCancel(e)
      this.hideOnClickCancel && this.hideBottomLayer && this.hideBottomLayer(e)
    }
  }
}
</script>

<style lang="stylus">
@import '../stylus/base'
 
.bottom-select--default
  .bottom-select
    &__cancel
      preHeight(90spx)
      color color-grey
    &__box
      &__item
        preHeight(90spx)
        border-bottom 1PX solid border-grey
        &.active
          color color-blue
</style>
