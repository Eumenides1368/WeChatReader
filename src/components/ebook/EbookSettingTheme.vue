<template>
  <transition name="slide-up">
    <div>
      <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
        <div class="setting-theme">
          <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index"
            @click="settingTheme(index)">
            <div
              class="preview"
              :class="{'selected': item.name == defaultTheme}"
              :style="{background: item.style.body.background}"
            ></div>
            <div class="text" :class="{'selected': item.name == defaultTheme}">{{item.alias}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { saveTheme } from '../../utils/localStorage'
export default {
  mixins: [ebookMixin],
  methods: {
    settingTheme (index) {
      const theme = this.themeList[index]
      // console.log(theme.name)
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme)
      })
      this.initGlobalTheme(this.defaultTheme)
      saveTheme(this.fileName, theme.name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.setting-wrapper {
  position: absolute;
  left: 0;
  bottom: px2rem(48);
  z-index: 190;
  width: 100%;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: px2rem(5);
      .preview {
        flex: 1;
        box-sizing: border-box;
        border: none;
        &.selected {
          border: px2rem(1) solid #ccc;
          box-shadow: 1 px2rem(4) px2rem(6) rgba(0, 0, 0, .1);
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        @include center;
        color: #ccc;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>
