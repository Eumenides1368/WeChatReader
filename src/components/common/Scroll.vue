<!-- 滚动条插件 -->
<template>
  <div class="scroll-wrapper" :class="{'noScroll': ifNoScroll}" @scroll.passive="handleScroll()" ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import { realPx } from '../../utils/utils'
export default {
  props: {
    top: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    },
    ifNoScroll: {
      type: Boolean,
      default: false
    }
    // initPosition: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       x: 0,
    //       y: 0
    //     }
    //   }
    // }
  },
  methods: {
    handleScroll (e) {
      const offsetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop
      this.$emit('onScroll', offsetY)
    },
    scrollTo (x, y) {
      this.$refs.scrollWrapper.scrollTo(x, y)
    },
    refresh () {
      if (this.$refs.scrollWrapper) {
        this.$refs.scrollWrapper.style.height = window.innerHeight - realPx(this.top) - realPx(this.bottom) + 'px'
        this.$refs.scrollWrapper.addEventListener('scroll', this.handleScroll)
      }
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
<style lang='scss' scoped>
@import '../../assets/styles/global';
.scroll-wrapper {
  position: relative;
  z-index: 100;
  width: 100%;
  overflow-x: scroll;
  overflow-y: scroll;
  // 解决移动端卡顿
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  &.no-scroll {
    overflow: hidden;
  }
}
</style>
