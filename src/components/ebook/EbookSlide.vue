<template>
  <transition name="fade">
    <div class="content-slide-wrapper" v-show="menuVisible && settingVisible === 3">
      <transition name="slide-right" v-show="settingVisible === 3">
        <div class="content">
          <div class="content-page">
            <ebook-slide-content></ebook-slide-content>
          </div>
          <div class="content-page-tab">
            <div class="content-page-tab-item"
              :class="{selected: selected === 0}"
              @click="handleSelect(0)"
            >
              {{$t('book.navigation')}}
            </div>
            <div class="content-page-tab-item"
              :class="{selected: selected === 1}"
              @click="handleSelect(1)"
            >
              {{$t('book.bookmark')}}
            </div>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTitleAndMenu()"></div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import EbookSlideContent from './EbookSlideContent'
export default {
  mixins: [ebookMixin],
  components: {
    EbookSlideContent
  },
  data () {
    return {
      selected: 0
    }
  },
  methods: {
    handleSelect (key) {
      this.selected = key
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/global.scss";
.content-slide-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  display: flex;
  .content {
    flex: 0, 0, 85%;
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .content-page {
      flex: 1;
      width: 100%;
      overflow: hidden;
    }
    .content-page-tab {
      flex: 0, 0, px2rem(48);
      height: px2rem(48);
      display: flex;
      .content-page-tab-item {
        @include center;
        flex: 1;
        font-size: px2rem(14);
        box-sizing: border-box;
        padding: px2rem(5) auto;
      }
    }
  }
  .content-bg {
    flex: 0, 0, 15%;
    width: 15%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
  }
}
</style>
